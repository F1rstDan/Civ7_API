---
title: Locale 本地化
doc_type: object-api
summary: 本地化/国际化工具对象，用于文本处理、多语言支持、数字格式化和语言切换。
primary_scope:
  - Locale
related_scope:
  - Game
source:
  - 源码 Locale 对象分析
---

# Locale 本地化

本地化/国际化工具对象，用于文本处理和多语言支持。

```javascript
// 来源 源码 Locale 对象
// 组合本地化文本和样式化
const text = Locale.compose("LOC_KEY_HELLO", playerName);
const styled = Locale.stylize("LOC_KEY", "font-bold");
```

## 方法列表（共 19 个）

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Locale.compose</API> | key, ...args | `string` | 组合本地化文本（支持参数替换） |
| <API>Locale.stylize</API> | key, style | `string` | 为本地化文本添加样式 |
| <API>Locale.compare</API> | a, b | `int` | 按当前语言排序比较两个字符串 |
| <API>Locale.toNumber</API> | num | `string` | 数字格式化为本地化字符串 |
| <API>Locale.keyExists</API> | key | `bool` | 检查本地化键是否存在 |
| <API>Locale.plainText</API> | key | `string` | 获取纯文本（去除标记） |
| <API>Locale.unpack</API> | key | `object` | 解包本地化数据 |
| <API>Locale.toUpper</API> | str | `string` | 转大写（本地化感知） |
| <API>Locale.toLower</API> | str | `string` | 转小写（本地化感知） |
| <API>Locale.toRomanNumeral</API> | num | `string` | 数字转罗马数字 |
| <API>Locale.toPercent</API> | num | `string` | 数字转百分比字符串 |
| <API>Locale.getCurrentDisplayLocale</API> | — | `string` | 获取当前显示语言 |
| <API>Locale.fromUGC</API> | text | `string` | 处理用户生成内容的文本 |
| <API>Locale.getCurrentAudioLanguageOption</API> | — | `string` | 获取当前音频语言 |
| <API>Locale.getCurrentDisplayLanguageOption</API> | — | `string` | 获取当前显示语言选项 |
| <API>Locale.changeAudioLanguageOption</API> | lang | `void` | 更改音频语言 |
| <API>Locale.changeDisplayLanguageOption</API> | lang | `void` | 更改显示语言 |
| <API>Locale.getAudioLanguageOptionNames</API> | — | `string[]` | 获取可用音频语言列表 |
| <API>Locale.getDisplayLanguageOptionNames</API> | — | `string[]` | 获取可用显示语言列表 |

---

<API id="Locale.compose"><h3>Locale.compose(key, ...args)</h3>

**说明**: 组合本地化文本，支持参数替换。将键对应的本地化字符串中的占位符替换为后续参数。

| 参数名 | 类型 | 说明 |
|------|------|------|
| key | `string` | 本地化键 |
| ...args | `any` | 替换参数 |

**返回值**: `string` — 组合后的本地化文本

**使用示例**:

```javascript
// 来源 源码 Locale 对象
// 组合带参数的本地化文本
const text = Locale.compose("LOC_KEY_HELLO", playerName);
```

</API>

<API id="Locale.stylize"><h3>Locale.stylize(key, style)</h3>

**说明**: 为本地化文本添加样式标记。

| 参数名 | 类型 | 说明 |
|------|------|------|
| key | `string` | 本地化键 |
| style | `string` | 样式名称 |

**返回值**: `string` — 带样式的本地化文本

**使用示例**:

```javascript
// 来源 源码 Locale 对象
// 对本地化文本应用粗体样式
const styled = Locale.stylize("LOC_KEY", "font-bold");
```

</API>

<API id="Locale.compare"><h3>Locale.compare(a, b)</h3>

**说明**: 按当前语言规则排序比较两个字符串。

| 参数名 | 类型 | 说明 |
|------|------|------|
| a | `string` | 字符串 A |
| b | `string` | 字符串 B |

**返回值**: `int` — 比较结果（负数表示 a < b，0 表示相等，正数表示 a > b）

</API>

<API id="Locale.toNumber"><h3>Locale.toNumber(num)</h3>

**说明**: 将数字格式化为本地化字符串。

| 参数名 | 类型 | 说明 |
|------|------|------|
| num | `number` | 要格式化的数字 |

**返回值**: `string` — 本地化数字字符串

</API>

<API id="Locale.keyExists"><h3>Locale.keyExists(key)</h3>

**说明**: 检查本地化键是否存在。

| 参数名 | 类型 | 说明 |
|------|------|------|
| key | `string` | 本地化键 |

**返回值**: `bool` — 键是否存在

</API>

<API id="Locale.plainText"><h3>Locale.plainText(key)</h3>

**说明**: 获取纯文本，去除所有样式标记。

| 参数名 | 类型 | 说明 |
|------|------|------|
| key | `string` | 本地化键 |

**返回值**: `string` — 纯文本

</API>

<API id="Locale.unpack"><h3>Locale.unpack(key)</h3>

**说明**: 解包本地化数据，返回包含原始数据的对象。

| 参数名 | 类型 | 说明 |
|------|------|------|
| key | `string` | 本地化键 |

**返回值**: `object` — 解包后的本地化数据

</API>

<API id="Locale.toUpper"><h3>Locale.toUpper(str)</h3>

**说明**: 将字符串转为大写（本地化感知）。

| 参数名 | 类型 | 说明 |
|------|------|------|
| str | `string` | 输入字符串 |

**返回值**: `string` — 大写字符串

</API>

<API id="Locale.toLower"><h3>Locale.toLower(str)</h3>

**说明**: 将字符串转为小写（本地化感知）。

| 参数名 | 类型 | 说明 |
|------|------|------|
| str | `string` | 输入字符串 |

**返回值**: `string` — 小写字符串

</API>

<API id="Locale.toRomanNumeral"><h3>Locale.toRomanNumeral(num)</h3>

**说明**: 将数字转换为罗马数字字符串。

| 参数名 | 类型 | 说明 |
|------|------|------|
| num | `number` | 要转换的数字 |

**返回值**: `string` — 罗马数字字符串

</API>

<API id="Locale.toPercent"><h3>Locale.toPercent(num)</h3>

**说明**: 将数字转换为本地化百分比字符串。

| 参数名 | 类型 | 说明 |
|------|------|------|
| num | `number` | 要转换的数字 |

**返回值**: `string` — 百分比字符串

</API>

<API id="Locale.getCurrentDisplayLocale"><h3>Locale.getCurrentDisplayLocale()</h3>

**说明**: 获取当前显示语言标识。

**参数**: 无

**返回值**: `string` — 当前显示语言

</API>

<API id="Locale.fromUGC"><h3>Locale.fromUGC(text)</h3>

**说明**: 处理用户生成内容（UGC）的文本，进行安全过滤和格式化。

| 参数名 | 类型 | 说明 |
|------|------|------|
| text | `string` | 用户生成内容文本 |

**返回值**: `string` — 处理后的文本

</API>

<API id="Locale.getCurrentAudioLanguageOption"><h3>Locale.getCurrentAudioLanguageOption()</h3>

**说明**: 获取当前音频语言选项。

**参数**: 无

**返回值**: `string` — 当前音频语言

</API>

<API id="Locale.getCurrentDisplayLanguageOption"><h3>Locale.getCurrentDisplayLanguageOption()</h3>

**说明**: 获取当前显示语言选项。

**参数**: 无

**返回值**: `string` — 当前显示语言选项

</API>

<API id="Locale.changeAudioLanguageOption"><h3>Locale.changeAudioLanguageOption(lang)</h3>

**说明**: 更改音频语言。

| 参数名 | 类型 | 说明 |
|------|------|------|
| lang | `string` | 目标音频语言 |

**返回值**: `void`

</API>

<API id="Locale.changeDisplayLanguageOption"><h3>Locale.changeDisplayLanguageOption(lang)</h3>

**说明**: 更改显示语言。

| 参数名 | 类型 | 说明 |
|------|------|------|
| lang | `string` | 目标显示语言 |

**返回值**: `void`

</API>

<API id="Locale.getAudioLanguageOptionNames"><h3>Locale.getAudioLanguageOptionNames()</h3>

**说明**: 获取可用音频语言列表。

**参数**: 无

**返回值**: `string[]` — 可用音频语言名称数组

</API>

<API id="Locale.getDisplayLanguageOptionNames"><h3>Locale.getDisplayLanguageOptionNames()</h3>

**说明**: 获取可用显示语言列表。

**参数**: 无

**返回值**: `string[]` — 可用显示语言名称数组

</API>