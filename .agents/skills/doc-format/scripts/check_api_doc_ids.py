#!/usr/bin/env python3
"""Validate Civ7 API doc tags against YAML scopes and method-list ownership."""

from __future__ import annotations

import re
import sys
from dataclasses import dataclass
from pathlib import Path


API_TEXT_RE = re.compile(r"<API>([^<]+)</API>")
API_ID_RE = re.compile(r'<API\s+id="([^"]+)"')
HEADING_RE = re.compile(r"^(#{2,6})\s+(.+?)\s*$")
INLINE_CODE_RE = re.compile(r"`([^`\n]+)`")


@dataclass(frozen=True)
class ApiTag:
    api_id: str
    line: int
    kind: str
    h2: str
    h3: str
    in_main_method_list: bool


def line_number(text: str, index: int) -> int:
    return text.count("\n", 0, index) + 1


def parse_frontmatter(text: str) -> tuple[dict[str, object], str]:
    if not text.startswith("---\n"):
        return {}, text

    end = text.find("\n---", 4)
    if end == -1:
        return {}, text

    raw = text[4:end].strip("\n")
    body = text[text.find("\n", end + 1) + 1 :]
    data: dict[str, object] = {}
    current_key: str | None = None

    for raw_line in raw.splitlines():
        line = raw_line.rstrip()
        stripped = line.strip()
        if not stripped:
            continue
        if stripped.startswith("- ") and current_key:
            data.setdefault(current_key, [])
            value = stripped[2:].strip()
            if isinstance(data[current_key], list):
                data[current_key].append(value)
            continue
        if ":" in stripped:
            key, value = stripped.split(":", 1)
            key = key.strip()
            value = value.strip()
            current_key = key
            if value:
                data[key] = value.strip('"')
            else:
                data[key] = []

    return data, body


def as_list(value: object) -> list[str]:
    if isinstance(value, list):
        return [str(item).strip() for item in value if str(item).strip()]
    if isinstance(value, str) and value.strip():
        return [value.strip()]
    return []


def in_scope(api_id: str, scopes: list[str]) -> bool:
    return any(api_id == scope or api_id.startswith(scope + ".") for scope in scopes)


def suffix_scope_match(api_id: str, scopes: list[str]) -> str | None:
    for scope in scopes:
        if "." not in scope:
            continue
        suffix_root = scope.split(".", 1)[1]
        if api_id == suffix_root or api_id.startswith(suffix_root + "."):
            return scope
    return None


def is_main_method_h2(heading: str) -> bool:
    if "方法列表" not in heading:
        return False
    related_words = ("相关", "GameInfo", "枚举", "常量", "源文件")
    return not any(word in heading for word in related_words)


def collect_api_tags(text: str) -> list[ApiTag]:
    line_state: dict[int, tuple[str, str, bool]] = {}
    current_h2 = ""
    current_h3 = ""
    in_main_method_list = False

    for lineno, line in enumerate(text.splitlines(), start=1):
        heading = HEADING_RE.match(line)
        if heading:
            level = len(heading.group(1))
            title = heading.group(2)
            if level == 2:
                current_h2 = title
                current_h3 = ""
                in_main_method_list = is_main_method_h2(title)
            elif level == 3:
                current_h3 = title
            elif level < 3:
                current_h3 = ""
        line_state[lineno] = (current_h2, current_h3, in_main_method_list)

    tags: list[ApiTag] = []
    for pattern, kind in ((API_TEXT_RE, "trigger"), (API_ID_RE, "block")):
        for match in pattern.finditer(text):
            api_id = match.group(1).strip()
            if "." not in api_id:
                continue
            line = line_number(text, match.start())
            h2, h3, in_method = line_state.get(line, ("", "", False))
            tags.append(ApiTag(api_id, line, kind, h2, h3, in_method))

    return sorted(tags, key=lambda tag: (tag.line, tag.kind, tag.api_id))


def strip_api_tags(text: str) -> str:
    text = API_TEXT_RE.sub("", text)
    return API_ID_RE.sub("", text)


def searchable_text(text: str) -> str:
    text = strip_api_tags(text)
    return INLINE_CODE_RE.sub(lambda match: match.group(1), text)


def find_longer_chains(text: str, api_id: str) -> list[tuple[str, int]]:
    pattern = re.compile(
        rf"\b([A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*)*\.{re.escape(api_id)})\s*\("
    )
    first_hits: dict[str, int] = {}
    for match in pattern.finditer(text):
        first_hits.setdefault(match.group(1), line_number(text, match.start()))
    return sorted(first_hits.items(), key=lambda item: (item[1], item[0]))


def warning(path: Path, line: int, message: str) -> str:
    return f"{path}:{line}: warning: {message}"


def validate_file(path: Path) -> list[str]:
    text = path.read_text(encoding="utf-8")
    frontmatter, _body = parse_frontmatter(text)
    doc_type = str(frontmatter.get("doc_type", "")).strip()
    primary = as_list(frontmatter.get("primary_scope"))
    related = as_list(frontmatter.get("related_scope"))
    allowed = primary + related
    tags = collect_api_tags(text)
    searchable = searchable_text(text)
    messages: list[str] = []

    for key in ("doc_type", "summary", "primary_scope", "related_scope", "source"):
        if key not in frontmatter:
            messages.append(warning(path, 1, f"missing YAML field '{key}'"))

    if not primary:
        return messages

    seen: set[tuple[int, str]] = set()
    for tag in tags:
        is_primary = in_scope(tag.api_id, primary)
        is_related = in_scope(tag.api_id, related)
        primary_suffix = suffix_scope_match(tag.api_id, primary)
        related_suffix = suffix_scope_match(tag.api_id, related)

        if tag.in_main_method_list:
            if is_related:
                msg = (
                    f"<API>{tag.api_id}</API> is related_scope but appears in the main method list; "
                    "move it to a related/GameInfo/subsystem section or promote the scope to primary_scope."
                )
                messages.append(warning(path, tag.line, msg))
            elif not is_primary:
                msg = (
                    f"<API>{tag.api_id}</API> is outside primary_scope "
                    f"{primary}; main method lists should only cover primary_scope."
                )
                messages.append(warning(path, tag.line, msg))

        if is_primary:
            pass
        elif primary_suffix:
            messages.append(
                warning(
                    path,
                    tag.line,
                    f"<API>{tag.api_id}</API> looks shortened from primary scope {primary_suffix}; use full receiver chain.",
                )
            )
        elif related_suffix and not is_related:
            messages.append(
                warning(
                    path,
                    tag.line,
                    f"<API>{tag.api_id}</API> looks shortened from related scope {related_suffix}; do not expose it as a primary API.",
                )
            )

        if is_primary:
            for longer_chain, hit_line in find_longer_chains(searchable, tag.api_id):
                if in_scope(longer_chain, related) or (allowed and not in_scope(longer_chain, primary)):
                    key = (tag.line, longer_chain)
                    if key in seen:
                        continue
                    seen.add(key)
                    messages.append(
                        warning(
                            path,
                            tag.line,
                            f"<API>{tag.api_id}</API> may be a shortened form of {longer_chain} found on line {hit_line}; verify receiver ownership.",
                        )
                    )

    return messages


def main(argv: list[str]) -> int:
    if len(argv) < 2:
        print("Usage: python check_api_doc_ids.py <docs/api/file.md> [more.md ...]")
        return 2

    messages: list[str] = []
    for filename in argv[1:]:
        messages.extend(validate_file(Path(filename)))

    if messages:
        for message in messages:
            print(message)
        print(f"\n{len(messages)} warning(s). Confirm YAML scopes and method-list ownership before publishing.")
        return 1

    print("API doc scopes look consistent.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
