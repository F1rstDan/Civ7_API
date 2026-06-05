---
title: 复盘：API 源码检索失败原因
doc_type: retrospective
date: 2026-06-05
scope: docs/api/engine.md
---

# 复盘：API 源码检索失败原因

**触发场景**：对 engine.md 的 7 个 API（synchronizeModels、reloadLocalization、BindingsReady、AddOnHandler、RemoveOnHandler、addDataBindEventListner、registerBindingAttribute）在源码中搜索代码示例时全部返回零结果。

**错误结论**：我在文档中标注了"未在 .js/.ltp 源码中找到直接调用示例"。

**真实情况**：其中 6 个 API 在源码中有明确调用，仅 AddOnHandler 不存在（后从文档删除）。

---

## 根因分析

### 根因 1 — ripgrep 默认不支持 lookbehind

搜索命令：

```powershell
rg -n "(?<![A-Za-z0-9_$])engine.synchronizeModels" "D:\Games Design\Civ7_mod\.官方变动" -g "*.js" -g "*.ltp" 2>$null
```

`(?<![A-Za-z0-9_$])` 是 PCRE2 负向后顾断言（negative lookbehind），但 ripgrep 默认使用 Rust regex 引擎，不支持 look-around。

rg 输出的错误信息：

```
rg: regex parse error:
    (?:(?<![A-Za-z0-9_$])engine.synchronizeModels)
       ^^^^
error: look-around, including look-ahead and look-behind, is not supported
Consider enabling PCRE2 with the --pcre2 flag
```

然后 rg 以 exit code 1 退出。

### 根因 2 — `2>$null` 静默吞噬了错误

`2>$null` 将 stderr 重定向到 null。regex parse error 输出到 stderr，被完全丢弃。

所以看到的结果就是：零输出 + exit code 1。

但 exit code 1 同时表示"未找到匹配"和"正则解析失败"。在无输出的情况下，无法区分这两种情况。

### 根因 3（辅助）— SKILL.md 自身缺少 `--pcre2`

SKILL.md 的"搜索代码示例"和"搜索顺序"两节的 rg 命令使用了 `(?<![A-Za-z0-9_$])` 但没有加 `--pcre2`，所以复制粘贴即出问题。

---

## 正确检索方式

### 首选：固定字符串搜索（`-F`）

```powershell
# -F 做字面量匹配，不涉及正则引擎，简单可靠
rg -n -F "engine.synchronizeModels" "D:\Games Design\Civ7_mod\.官方变动\modules" -g "*.js"
```

### 备选：正则 + --pcre2

```powershell
# 仅在需要排除后缀误匹配时才用 --pcre2
rg -n --pcre2 "(?<![A-Za-z0-9_$])engine.synchronizeModels" "D:\Games Design\Civ7_mod\.官方变动\modules" -g "*.js"
```

### 规则

- 任何含 `(?<` / `(?=` / `(?<=` / `(?<!` 等环视断言的正则**必须加 `--pcre2`**
- **禁止**在 rg 命令中追加 `2>$null` —— 它会把 regex parse error 静默吞掉
- **优先使用 `-F`（固定字符串）** 搜索，仅在确实需要排除后缀误匹配时才用正则

---

## 实际命中结果

| API | 命中数 | 来源文件 |
|-----|--------|---------|
| `engine.synchronizeModels` | 9 | model-culture-tree.js, model-navigation-tray.js, model-radial-menu.js, screen-victory-progress.js 等 |
| `engine.reloadLocalization` | 1 | component-support.js:1203 |
| `engine.BindingsReady` | 2 | cohtml.js:227,460 |
| `engine.RemoveOnHandler` | 3 | cohtml.js:67,68,122 |
| `engine.addDataBindEventListner` | 1 | cohtml.js:443 |
| `engine.registerBindingAttribute` | 2 | component-support.js:1196,1197 |
| `engine.AddOnHandler` | **0** | 仅 `rigger.AddOnHandler` 存在于 TunerPanels（不同对象） |

---

## 已执行的修复

1. **engine.md** — 7 个内容块的代码示例全部替换为真实源码示例
2. **engine.md** — 删除不存在的 `AddOnHandler`，新增 `AddOrRemoveOnHandler` 和 `addSynchronizationDependency`
3. **SKILL.md** — 搜索命令全部加入 `--pcre2`，新增 `-F` 首选方案，标记 `2>$null` 为危险操作
