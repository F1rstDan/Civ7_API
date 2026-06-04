#!/usr/bin/env python3
"""Flag Civ7 API doc tags that may be shortened from longer receiver chains."""

from __future__ import annotations

import re
import sys
from pathlib import Path


API_TEXT_RE = re.compile(r"<API>([^<]+)</API>")
API_ID_RE = re.compile(r'<API\s+id="([^"]+)"')
CODE_RE = re.compile(r"`[^`\n]+`")


def line_number(text: str, index: int) -> int:
    return text.count("\n", 0, index) + 1


def strip_api_tags(text: str) -> str:
    text = API_TEXT_RE.sub("", text)
    return API_ID_RE.sub("", text)


def collect_api_ids(text: str) -> list[tuple[str, int]]:
    ids: dict[str, int] = {}
    for pattern in (API_TEXT_RE, API_ID_RE):
        for match in pattern.finditer(text):
            api_id = match.group(1).strip()
            if "." in api_id:
                ids.setdefault(api_id, line_number(text, match.start()))
    return sorted(ids.items(), key=lambda item: (item[0], item[1]))


def find_longer_chains(text: str, api_id: str) -> list[tuple[str, int]]:
    # Example: API id Units.lookup should warn on GameInfo.Units.lookup.
    pattern = re.compile(
        rf"\b([A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*)*\.{re.escape(api_id)})\s*\("
    )
    hits: list[tuple[str, int]] = []
    for match in pattern.finditer(text):
        hits.append((match.group(1), line_number(text, match.start())))
    first_hits: dict[str, int] = {}
    for chain, line in hits:
        first_hits.setdefault(chain, line)
    return sorted(first_hits.items(), key=lambda item: (item[1], item[0]))


def main(argv: list[str]) -> int:
    if len(argv) < 2:
        print("Usage: python check_api_doc_ids.py <docs/api/file.md> [more.md ...]")
        return 2

    warnings = 0
    for filename in argv[1:]:
        path = Path(filename)
        text = path.read_text(encoding="utf-8")
        searchable = CODE_RE.sub(lambda m: m.group(0).strip("`"), strip_api_tags(text))
        api_ids = collect_api_ids(text)

        for api_id, api_line in api_ids:
            for longer_chain, hit_line in find_longer_chains(searchable, api_id):
                warnings += 1
                print(
                    f"{path}:{api_line}: warning: <API>{api_id}</API> may be a shortened form "
                    f"of {longer_chain} found on line {hit_line}; verify receiver ownership."
                )

    if warnings:
        print(f"\n{warnings} warning(s). Confirm ownership in source before publishing.")
        return 1

    print("No shortened API receiver chains found.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
