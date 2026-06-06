---
title: AdviceManager 建议系统
doc_type: object
summary: 文明7的游戏内建议（Advisor）系统，通过 AdviceManager 全局对象访问，分为文化、经济、军事、科学四个类别。支持关注/取消关注顾问、获取建议页面、注册自定义建议条目和 Bundle。
primary_scope:
  - AdviceManager
related_scope:
  - globalThis.AdviceManager
  - AdvisorTypes
  - GameInfo.AdviceInstances
source:
  - TunerPanels/Advice.ltp
  - modules/base-standard/ui/advice/advice-manager.js
  - modules/base-standard/ui-next/screens/advisor-council/advisor-screen-model.js
  - modules/age-antiquity/ui/advice/advice-items-antiquity-culture.js
  - modules/age-antiquity/ui/advice/advice-items-antiquity-economic.js
  - modules/age-antiquity/ui/advice/advice-items-antiquity-military.js
  - modules/age-antiquity/ui/advice/advice-items-antiquity-science.js
  - modules/base-standard/ui/notification-train/notification-handlers.js
doc_update: 2026-06-06
---

# AdviceManager 建议系统

文明7的游戏内建议（Advisor）系统，分为文化、经济、军事、科学四个类别。通过 `AdviceManager` 全局对象访问（源码中 `globalThis.AdviceManager` 指向同一实例）。源码位于 `modules/base-standard/ui/advice/advice-manager.js`。

```javascript
// 来源 modules/base-standard/ui-next/screens/advisor-council/advisor-screen-model.js
// 查询各类顾问的关注状态
const isCultureFollowed = AdviceManager.isCultureFollowed();
const isMilitaryFollowed = AdviceManager.isMilitaryFollowed();

// 设置关注某类顾问
AdviceManager.setCultureFollowed(true);
AdviceManager.setEconomicFollowed(false);

// 获取某类顾问的建议页面列表
const culturePages = AdviceManager.getCulturePages();
const militaryPages = AdviceManager.getMilitaryPages();
```

### 注册自定义建议条目

```javascript
// 来源 modules/age-antiquity/ui/advice/advice-items-antiquity-culture.js
// 向 AdviceManager 注册一条建议条目（自动包装为单页 Bundle）
AdviceManager.addItem({
  id: "ADVICE_ANTIQUITY_CULTURE_CULTURAL_VICTORY",
  type: AdvisorTypes.CULTURE,
  onSelect: () => {
    return Game.turn == 1;
  }
});

// 注册一个包含多页建议的 Bundle
AdviceManager.addBundle({
  id: "cultureMisc01",
  type: AdvisorTypes.CULTURE,
  pages: [
    "ADVICE_ANTIQUITY_CULTURE_UNIQUE_CIVICS",
    "ADVICE_ANTIQUITY_CULTURE_INCREASE_PRODUCTION"
  ],
  priority: 100,
  delivery: "random",
  onSelect: () => {
    return shouldSelect(TURN_START, TURN_WAIT, TURN_OFFSET);
  },
  onObsolete: () => {
    return Game.turn > 90;
  }
});
```

### 从 WatchOut 通知添加建议

```javascript
// 来源 modules/base-standard/ui/notification-train/notification-handlers.js
// 从 WatchOut 通知中添加建议页面，并检查顾问是否被关注
AdviceManager.addFromWatchOut(notificationId);
if (!AdviceManager.isFollowed(AdviceManager.getAdvisorTypeFromTutorialAdvisorType(this.advisorType))) {
  // 顾问未被关注，执行相应处理
}
```

## AdviceManager 方法列表

### 关注状态查询

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>AdviceManager.isCultureFollowed</API> | — | `boolean` | 是否关注文化顾问 |
| <API>AdviceManager.isEconomicFollowed</API> | — | `boolean` | 是否关注经济顾问 |
| <API>AdviceManager.isMilitaryFollowed</API> | — | `boolean` | 是否关注军事顾问 |
| <API>AdviceManager.isScientificFollowed</API> | — | `boolean` | 是否关注科学顾问 |
| <API>AdviceManager.isFollowed</API> | `AdvisorTypes` | `boolean` | 检查指定类型的顾问是否被关注 |
| <API>AdviceManager.isAnyFollowed</API> | — | `boolean` | 是否有任意顾问被关注 |

### 关注状态设置

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>AdviceManager.setCultureFollowed</API> | `boolean` | `void` | 设置文化顾问关注状态 |
| <API>AdviceManager.setEconomicFollowed</API> | `boolean` | `void` | 设置经济顾问关注状态 |
| <API>AdviceManager.setMilitaryFollowed</API> | `boolean` | `void` | 设置军事顾问关注状态 |
| <API>AdviceManager.setScientificFollowed</API> | `boolean` | `void` | 设置科学顾问关注状态 |

### 获取建议页面

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>AdviceManager.getCulturePages</API> | — | `Array` | 获取文化建议页面列表 |
| <API>AdviceManager.getEconomicPages</API> | — | `Array` | 获取经济建议页面列表 |
| <API>AdviceManager.getMilitaryPages</API> | — | `Array` | 获取军事建议页面列表 |
| <API>AdviceManager.getScientificPages</API> | — | `Array` | 获取科学建议页面列表 |

### 注册建议

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>AdviceManager.addItem</API> | `Object` | `void` | 注册一条建议条目（自动包装为单页 Bundle） |
| <API>AdviceManager.addBundle</API> | `Object` | `void` | 注册一个建议 Bundle（可包含多页） |

### 其他

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>AdviceManager.getAdvisorTypeFromTutorialAdvisorType</API> | `TutorialAdvisorType` | `AdvisorTypes` | 从教程顾问类型转换为 AdvisorTypes |
| <API>AdviceManager.addFromWatchOut</API> | `string` | `void` | 从 WatchOut 通知添加建议页面 |

## 建议类别索引

| 类别 | AdvisorTypes 常量 | 说明 |
|------|-------------------|------|
| Culture | `AdvisorTypes.CULTURE` | 文化顾问 |
| Military | `AdvisorTypes.MILITARY` | 军事顾问 |
| Economic | `AdvisorTypes.ECONOMIC` | 经济顾问 |
| Science | `AdvisorTypes.SCIENCE` | 科学顾问 |

`AdvisorTypes` 还有一个 `NO_ADVISOR` 值，表示无顾问。

## Tuner 调试 API

以下 API 以 `tuner` 前缀命名，是 Firaxis 为调试工具（Tuner）专门暴露的接口。

```javascript
// 来源 TunerPanels/Advice.ltp
// 获取所有建议 Bundle（调试用），返回 4 个数组，索引: [0]=Culture, [1]=Military, [2]=Economic, [3]=Science
let bundles = globalThis.AdviceManager.tunerGetBundles();

// 获取某个 Bundle 内的建议页面
let items = globalThis.AdviceManager.tunerGetItemsInBundle(bundleName);

// 强制添加建议 Bundle
globalThis.AdviceManager.tunerAddBundleForcibly(bundleName);

// 强制添加建议页面
globalThis.AdviceManager.tunerAddPageForcibly(pageName);

// 清除各类别的建议书（清空已显示的建议）
globalThis.AdviceManager.tunerClearCultureMind();
globalThis.AdviceManager.tunerClearEconomicMind();
globalThis.AdviceManager.tunerClearMilitaryMind();
globalThis.AdviceManager.tunerClearScienceMind();
```

### Tuner 方法列表

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>AdviceManager.tunerGetBundles</API> | — | `Array[4]` | 返回 4 个数组，每个对应一个类别的 Bundle 列表 |
| <API>AdviceManager.tunerGetItemsInBundle</API> | `string` | `Array` | 返回指定 Bundle 中的所有建议页面 |
| <API>AdviceManager.tunerAddBundleForcibly</API> | `string` | `void` | 强制显示某个 Bundle 的所有建议 |
| <API>AdviceManager.tunerAddPageForcibly</API> | `string` | `void` | 强制显示某个建议页面 |
| <API>AdviceManager.tunerClearCultureMind</API> | — | `void` | 清除文化建议 |
| <API>AdviceManager.tunerClearEconomicMind</API> | — | `void` | 清除经济建议 |
| <API>AdviceManager.tunerClearMilitaryMind</API> | — | `void` | 清除军事建议 |
| <API>AdviceManager.tunerClearScienceMind</API> | — | `void` | 清除科学建议 |

::: warning 注意
这些 API 以 `tuner` 前缀命名，表明它们是 Firaxis 为调试工具（Tuner）专门暴露的接口。在正式 Mod 开发中可能不完全可用，但可作为理解建议系统架构的参考。
:::

## GameInfo 关联表

| 表名 | 说明 |
|------|------|
| `GameInfo.AdviceInstances` | 建议实例数据表，通过 `lookup(pageId)` 查询建议页面内容 |

`AdviceManager.addFromWatchOut()` 内部通过 `GameInfo.AdviceInstances.lookup()` 查找通知对应的建议类型和页面 ID。

## 相关全局对象

| 对象 | 说明 |
|------|------|
| `AdvisorTypes` | 顾问类别枚举（CULTURE / ECONOMIC / MILITARY / SCIENCE / NO_ADVISOR） |

<API id="AdviceManager.isCultureFollowed"><h3>AdviceManager.isCultureFollowed()</h3>

**说明**: 查询文化顾问是否被关注。

**参数**: 无

**返回值**: `boolean` — `true` 表示已关注文化顾问

**使用示例**:

```javascript
// 来源 modules/base-standard/ui-next/screens/advisor-council/advisor-screen-model.js
// 查询文化顾问关注状态
if (AdviceManager.isCultureFollowed()) {
  // 文化顾问已被关注
}
```

</API>

<API id="AdviceManager.isEconomicFollowed"><h3>AdviceManager.isEconomicFollowed()</h3>

**说明**: 查询经济顾问是否被关注。

**参数**: 无

**返回值**: `boolean` — `true` 表示已关注经济顾问

</API>

<API id="AdviceManager.isMilitaryFollowed"><h3>AdviceManager.isMilitaryFollowed()</h3>

**说明**: 查询军事顾问是否被关注。

**参数**: 无

**返回值**: `boolean` — `true` 表示已关注军事顾问

</API>

<API id="AdviceManager.isScientificFollowed"><h3>AdviceManager.isScientificFollowed()</h3>

**说明**: 查询科学顾问是否被关注。

**参数**: 无

**返回值**: `boolean` — `true` 表示已关注科学顾问

</API>

<API id="AdviceManager.isFollowed"><h3>AdviceManager.isFollowed(advisorType)</h3>

**说明**: 检查指定类型的顾问是否被关注。是 `isCultureFollowed()` 等四个便捷方法的底层实现。

| 参数名 | 类型 | 说明 |
|------|------|------|
| advisorType | `AdvisorTypes` | 顾问类型枚举值 |

**返回值**: `boolean` — `true` 表示该类型顾问已被关注

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/notification-train/notification-handlers.js
// 检查某个顾问类型是否被关注
if (!AdviceManager.isFollowed(AdviceManager.getAdvisorTypeFromTutorialAdvisorType(advisorType))) {
  // 顾问未被关注
}
```

</API>

<API id="AdviceManager.isAnyFollowed"><h3>AdviceManager.isAnyFollowed()</h3>

**说明**: 检查是否有任意一个顾问被关注。

**参数**: 无

**返回值**: `boolean` — `true` 表示至少有 1 个顾问被关注

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/action/panel-action.js
// 检查是否有任意顾问被关注，用于判断是否显示顾问警告
if (!AdviceManager.isAnyFollowed()) {
  // 没有顾问被关注
}
```

</API>

<API id="AdviceManager.setCultureFollowed"><h3>AdviceManager.setCultureFollowed(isFollowed)</h3>

**说明**: 设置文化顾问的关注状态。设置后会自动写入存档。

| 参数名 | 类型 | 说明 |
|------|------|------|
| isFollowed | `boolean` | `true` 关注，`false` 取消关注 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui-next/screens/advisor-council/advisor-screen-model.js
// 关注文化顾问
AdviceManager.setCultureFollowed(true);
// 取消关注文化顾问
AdviceManager.setCultureFollowed(false);
```

</API>

<API id="AdviceManager.setEconomicFollowed"><h3>AdviceManager.setEconomicFollowed(isFollowed)</h3>

**说明**: 设置经济顾问的关注状态。设置后会自动写入存档。

| 参数名 | 类型 | 说明 |
|------|------|------|
| isFollowed | `boolean` | `true` 关注，`false` 取消关注 |

**返回值**: `void`

</API>

<API id="AdviceManager.setMilitaryFollowed"><h3>AdviceManager.setMilitaryFollowed(isFollowed)</h3>

**说明**: 设置军事顾问的关注状态。设置后会自动写入存档。

| 参数名 | 类型 | 说明 |
|------|------|------|
| isFollowed | `boolean` | `true` 关注，`false` 取消关注 |

**返回值**: `void`

</API>

<API id="AdviceManager.setScientificFollowed"><h3>AdviceManager.setScientificFollowed(isFollowed)</h3>

**说明**: 设置科学顾问的关注状态。设置后会自动写入存档。

| 参数名 | 类型 | 说明 |
|------|------|------|
| isFollowed | `boolean` | `true` 关注，`false` 取消关注 |

**返回值**: `void`

</API>

<API id="AdviceManager.getCulturePages"><h3>AdviceManager.getCulturePages()</h3>

**说明**: 获取文化顾问的建议页面列表。返回内容来自 `GameInfo.AdviceInstances` 表中已触发的建议页面，每条包含 `id`、`quote`、`title`、`message`、`noteTitle`、`noteDescription` 字段。

**参数**: 无

**返回值**: `Array` — 建议页面对象数组

**使用示例**:

```javascript
// 来源 modules/base-standard/ui-next/screens/advisor-council/advisor-screen-model.js
// 获取文化顾问所有建议页面
const culturePages = AdviceManager.getCulturePages();
culturePages.forEach((page) => {
  console.log(page.title);
});
```

</API>

<API id="AdviceManager.getEconomicPages"><h3>AdviceManager.getEconomicPages()</h3>

**说明**: 获取经济顾问的建议页面列表。返回结构与 `getCulturePages()` 相同。

**参数**: 无

**返回值**: `Array` — 建议页面对象数组

</API>

<API id="AdviceManager.getMilitaryPages"><h3>AdviceManager.getMilitaryPages()</h3>

**说明**: 获取军事顾问的建议页面列表。返回结构与 `getCulturePages()` 相同。

**参数**: 无

**返回值**: `Array` — 建议页面对象数组

</API>

<API id="AdviceManager.getScientificPages"><h3>AdviceManager.getScientificPages()</h3>

**说明**: 获取科学顾问的建议页面列表。返回结构与 `getCulturePages()` 相同。

**参数**: 无

**返回值**: `Array` — 建议页面对象数组

</API>

<API id="AdviceManager.addItem"><h3>AdviceManager.addItem(item)</h3>

**说明**: 注册一条建议条目。内部会将条目包装为单页 Bundle（`bundlized_` + id）再调用 `addBundle()`。这是 Mod 注册自定义建议的最简方式。

| 参数名 | 类型 | 说明 |
|------|------|------|
| item | `Object` | 配置对象，见下方属性说明 |

**item 对象属性**:

| 属性 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | `string` | 是 | 条目唯一标识，对应 `GameInfo.AdviceInstances` 中的 AdviceID |
| type | `AdvisorTypes` | 是 | 顾问类别 |
| onSelect | `function` | 是 | 选择条件回调，返回 `true` 时触发该建议 |
| onObsolete | `function` | 否 | 过期条件回调，返回 `true` 时该建议作废 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/age-antiquity/ui/advice/advice-items-antiquity-culture.js
// 注册一条在第一回合时触发的文化建议
AdviceManager.addItem({
  id: "ADVICE_ANTIQUITY_CULTURE_CULTURAL_VICTORY",
  type: AdvisorTypes.CULTURE,
  onSelect: () => {
    return Game.turn == 1;
  }
});
```

</API>

<API id="AdviceManager.addBundle"><h3>AdviceManager.addBundle(bundle)</h3>

**说明**: 注册一个建议 Bundle，可包含多个建议页面。Bundle 是 AdviceManager 的核心调度单元，每个 Bundle 包含一组页面，按 `delivery` 策略依次投递。

| 参数名 | 类型 | 说明 |
|------|------|------|
| bundle | `Object` | 配置对象，见下方属性说明 |

**bundle 对象属性**:

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| id | `string` | 是 | — | Bundle 唯一标识 |
| type | `AdvisorTypes` | 是 | — | 顾问类别 |
| pages | `string[]` | 是 | — | 建议页面 ID 数组，每个对应 `GameInfo.AdviceInstances` |
| priority | `number` | 否 | `Priority.low` | 优先级，数值越大越优先 |
| delivery | `"random"` \| `"sequential"` | 否 | `"random"` | 投递策略：随机或顺序 |
| onSelect | `function` | 是 | — | 选择条件回调，返回 `true` 时触发 |
| onObsolete | `function` | 否 | — | 过期条件回调，返回 `true` 时 Bundle 作废 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/age-antiquity/ui/advice/advice-items-antiquity-culture.js
// 注册一个包含 8 页建议的文化 Bundle
AdviceManager.addBundle({
  id: "cultureMisc01",
  type: AdvisorTypes.CULTURE,
  pages: [
    "ADVICE_ANTIQUITY_CULTURE_UNIQUE_CIVICS",
    "ADVICE_ANTIQUITY_CULTURE_INCREASE_PRODUCTION",
    "ADVICE_ANTIQUITY_CULTURE_TOWNS_CITIES",
    "ADVICE_ANTIQUITY_CULTURE_NATURAL_WONDERS"
  ],
  priority: 100,
  delivery: "random",
  onSelect: () => {
    return shouldSelect(TURN_START, TURN_WAIT, TURN_OFFSET);
  },
  onObsolete: () => {
    return Game.turn > 90;
  }
});
```

</API>

<API id="AdviceManager.getAdvisorTypeFromTutorialAdvisorType"><h3>AdviceManager.getAdvisorTypeFromTutorialAdvisorType(tutorialAdvisorType)</h3>

**说明**: 将 `TutorialAdvisorType` 枚举转换为 `AdvisorTypes` 枚举。主要用于 WatchOut 通知系统与 AdviceManager 之间的类型桥接。

| 参数名 | 类型 | 说明 |
|------|------|------|
| tutorialAdvisorType | `TutorialAdvisorType` | 教程顾问类型枚举值 |

**返回值**: `AdvisorTypes` — 对应的顾问类型，不匹配时返回 `AdvisorTypes.NO_ADVISOR`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/notification-train/notification-handlers.js
// 将 TutorialAdvisorType 转为 AdvisorTypes 后检查关注状态
const advisorType = AdviceManager.getAdvisorTypeFromTutorialAdvisorType(this.advisorType);
if (!AdviceManager.isFollowed(advisorType)) {
  // 该顾问未被关注
}
```

</API>

<API id="AdviceManager.addFromWatchOut"><h3>AdviceManager.addFromWatchOut(notificationId)</h3>

**说明**: 从 WatchOut 通知中提取建议信息并添加到对应的顾问"思维"中。内部通过 `Game.Notifications.find()` 查找通知，再通过 `GameInfo.AdviceInstances.lookup()` 获取建议类型和页面 ID。

| 参数名 | 类型 | 说明 |
|------|------|------|
| notificationId | `string` | 游戏引擎通知 ID |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/notification-train/notification-handlers.js
// 从 WatchOut 通知添加建议
AdviceManager.addFromWatchOut(notificationId);
```

</API>

<API id="AdviceManager.tunerGetBundles"><h3>AdviceManager.tunerGetBundles()</h3>

**说明**: Tuner 调试用，返回所有已注册 Bundle 的列表，按类别分为 4 个数组。索引：`[0]=Culture, [1]=Military, [2]=Economic, [3]=Science`。每个元素为 `"bundleId;state"` 格式的字符串。

**参数**: 无

**返回值**: `Array[4]` — 4 个数组，每个包含该类别的 Bundle 信息

**使用示例**:

```javascript
// 来源 TunerPanels/Advice.ltp
// 获取所有 Bundle 并显示文化类别的 Bundle
let bundles = globalThis.AdviceManager.tunerGetBundles();
// bundles[0] = Culture 类别 Bundle 列表
```

</API>

<API id="AdviceManager.tunerGetItemsInBundle"><h3>AdviceManager.tunerGetItemsInBundle(bundleId)</h3>

**说明**: Tuner 调试用，返回指定 Bundle 中所有建议页面的列表。每个元素为 `"pageId;state"` 格式，state 为 `"delivered"` 或 `"pending"`。

| 参数名 | 类型 | 说明 |
|------|------|------|
| bundleId | `string` | Bundle 唯一标识 |

**返回值**: `Array` — 页面 ID 和状态字符串数组

**使用示例**:

```javascript
// 来源 TunerPanels/Advice.ltp
// 获取指定 Bundle 内的建议页面
let items = globalThis.AdviceManager.tunerGetItemsInBundle(bundleName);
```

</API>

<API id="AdviceManager.tunerAddBundleForcibly"><h3>AdviceManager.tunerAddBundleForcibly(id)</h3>

**说明**: Tuner 调试用，强制将指定 Bundle 中的所有页面添加到对应的顾问"思维"中，跳过选择条件检查。

| 参数名 | 类型 | 说明 |
|------|------|------|
| id | `string` | Bundle 唯一标识 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 TunerPanels/Advice.ltp
// 强制添加一个 Bundle 的所有建议
globalThis.AdviceManager.tunerAddBundleForcibly(selectedBundle);
```

</API>

<API id="AdviceManager.tunerAddPageForcibly"><h3>AdviceManager.tunerAddPageForcibly(id)</h3>

**说明**: Tuner 调试用，强制添加单个建议页面。系统会自动查找该页面所属的 Bundle 和顾问类别。

| 参数名 | 类型 | 说明 |
|------|------|------|
| id | `string` | 页面 ID（对应 `GameInfo.AdviceInstances` 中的 AdviceID） |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 TunerPanels/Advice.ltp
// 强制添加一个建议页面
globalThis.AdviceManager.tunerAddPageForcibly(selectedItem);
```

</API>

<API id="AdviceManager.tunerClearCultureMind"><h3>AdviceManager.tunerClearCultureMind()</h3>

**说明**: Tuner 调试用，清除文化顾问的所有已显示建议页面，并将所有 Bundle 重置为 `active` 状态。

**参数**: 无

**返回值**: `void`

**使用示例**:

```javascript
// 来源 TunerPanels/Advice.ltp
// 清除文化顾问建议书
globalThis.AdviceManager.tunerClearCultureMind();
```

</API>

<API id="AdviceManager.tunerClearEconomicMind"><h3>AdviceManager.tunerClearEconomicMind()</h3>

**说明**: Tuner 调试用，清除经济顾问的所有已显示建议页面。

**参数**: 无

**返回值**: `void`

</API>

<API id="AdviceManager.tunerClearMilitaryMind"><h3>AdviceManager.tunerClearMilitaryMind()</h3>

**说明**: Tuner 调试用，清除军事顾问的所有已显示建议页面。

**参数**: 无

**返回值**: `void`

</API>

<API id="AdviceManager.tunerClearScienceMind"><h3>AdviceManager.tunerClearScienceMind()</h3>

**说明**: Tuner 调试用，清除科学顾问的所有已显示建议页面。

**参数**: 无

**返回值**: `void`

</API>