---
title: Locale
---

# Locale

本地化/国际化工具对象，用于文本处理和多语言支持。

```javascript
const text = Locale.compose("LOC_KEY_HELLO", playerName);
const styled = Locale.stylize("LOC_KEY", "font-bold");
```

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `compose` | key, ...args | `string` | 组合本地化文本（支持参数替换） |
| `stylize` | key, style | `string` | 为本地化文本添加样式 |
| `compare` | a, b | `int` | 按当前语言排序比较两个字符串 |
| `toNumber` | num | `string` | 数字格式化为本地化字符串 |
| `keyExists` | key | `bool` | 检查本地化键是否存在 |
| `plainText` | key | `string` | 获取纯文本（去除标记） |
| `unpack` | key | `object` | 解包本地化数据 |
| `toUpper` | str | `string` | 转大写（本地化感知） |
| `toLower` | str | `string` | 转小写（本地化感知） |
| `toRomanNumeral` | num | `string` | 数字转罗马数字 |
| `toPercent` | num | `string` | 数字转百分比字符串 |
| `getCurrentDisplayLocale` | — | `string` | 获取当前显示语言 |
| `fromUGC` | text | `string` | 处理用户生成内容的文本 |
| `getCurrentAudioLanguageOption` | — | `string` | 获取当前音频语言 |
| `getCurrentDisplayLanguageOption` | — | `string` | 获取当前显示语言选项 |
| `changeAudioLanguageOption` | lang | `void` | 更改音频语言 |
| `changeDisplayLanguageOption` | lang | `void` | 更改显示语言 |
| `getAudioLanguageOptionNames` | — | `string[]` | 获取可用音频语言列表 |
| `getDisplayLanguageOptionNames` | — | `string[]` | 获取可用显示语言列表 |
