---
title: Advisors 建议系统
doc_type: object
summary: 文明7的游戏内建议（Advisor）系统，分为文化、经济、军事、科学四个类别，通过 globalThis.AdviceManager 全局对象访问。包含 Tuner 调试 API 和运行时 Mod 可用 API。
primary_scope:
  - AdviceManager
related_scope:
  - globalThis.AdviceManager
source:
  - TunerPanels/Advice.ltp
  - modules/base-standard/ui-next/screens/advisor-council/advisor-screen-model.js
  - modules/base-standard/ui/advice/advice-manager.js
  - modules/age-antiquity/ui/advice/advice-items-antiquity-culture.js
doc_update: 2026-06-05
---

# Advisors 建议系统

文明7的游戏内建议（Advisor）系统，分为文化、经济、军事、科学四个类别。通过 `globalThis.AdviceManager` 全局对象访问。

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
| `tunerGetBundles()` | — | `Array[4]` | 返回 4 个数组，每个对应一个类别的 Bundle 列表 |
| `tunerGetItemsInBundle(bundle)` | `string` | `Array` | 返回指定 Bundle 中的所有建议页面 |
| `tunerAddBundleForcibly(bundle)` | `string` | void | 强制显示某个 Bundle 的所有建议 |
| `tunerAddPageForcibly(page)` | `string` | void | 强制显示某个建议页面 |
| `tunerClearCultureMind()` | — | void | 清除文化建议 |
| `tunerClearEconomicMind()` | — | void | 清除经济建议 |
| `tunerClearMilitaryMind()` | — | void | 清除军事建议 |
| `tunerClearScienceMind()` | — | void | 清除科学建议 |

::: warning 注意
这些 API 以 `tuner` 前缀命名，表明它们是 Firaxis 为调试工具（Tuner）专门暴露的接口。在正式 Mod 开发中可能不完全可用，但可作为理解建议系统架构的参考。
:::

## 运行时 API（Mod 可用）

以下 `AdviceManager` 方法在游戏运行时由 UI 层调用，属于 Mod 开发中实际可用的接口。源码位于 `modules/base-standard/ui/advice/advice-manager.js`。

```javascript
// 来源 modules/base-standard/ui-next/screens/advisor-council/advisor-screen-model.js
// 查询各类顾问的关注状态
const isCultureFollowed = AdviceManager.isCultureFollowed();
const isEconomicFollowed = AdviceManager.isEconomicFollowed();
const isMilitaryFollowed = AdviceManager.isMilitaryFollowed();
const isScientificFollowed = AdviceManager.isScientificFollowed();

// 设置/取消关注某类顾问
AdviceManager.setCultureFollowed(true);
AdviceManager.setEconomicFollowed(false);

// 获取某类顾问的建议页面
const culturePages = AdviceManager.getCulturePages();
const militaryPages = AdviceManager.getMilitaryPages();
```

### 添加建议条目（Mod 注册用）

```javascript
// 来源 modules/age-antiquity/ui/advice/advice-items-antiquity-culture.js
// 向 AdviceManager 注册一条建议条目和 Bundle
AdviceManager.addItem({
  id: "ADVICE_ANTIQUITY_CULTURE_CULTURAL_VICTORY",
  type: AdvisorTypes.CULTURE,
  onSelect: () => {
    return Game.turn == 1;
  }
});

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

### 运行时方法列表

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `isCultureFollowed()` | — | `boolean` | 是否关注文化顾问 |
| `isEconomicFollowed()` | — | `boolean` | 是否关注经济顾问 |
| `isMilitaryFollowed()` | — | `boolean` | 是否关注军事顾问 |
| `isScientificFollowed()` | — | `boolean` | 是否关注科学顾问 |
| `setCultureFollowed(bool)` | `boolean` | void | 设置文化顾问关注状态 |
| `setEconomicFollowed(bool)` | `boolean` | void | 设置经济顾问关注状态 |
| `setMilitaryFollowed(bool)` | `boolean` | void | 设置军事顾问关注状态 |
| `setScientificFollowed(bool)` | `boolean` | void | 设置科学顾问关注状态 |
| `getCulturePages()` | — | `Array` | 获取文化建议页面列表 |
| `getEconomicPages()` | — | `Array` | 获取经济建议页面列表 |
| `getMilitaryPages()` | — | `Array` | 获取军事建议页面列表 |
| `getScientificPages()` | — | `Array` | 获取科学建议页面列表 |
| `addItem(config)` | `Object` | void | 注册一条建议条目 |
| `addBundle(config)` | `Object` | void | 注册一个建议 Bundle |
| `isFollowed(advisorType)` | `AdvisorTypes` | `boolean` | 检查指定类型的顾问是否被关注 |
| `isAnyFollowed()` | — | `boolean` | 是否有任意顾问被关注 |
| `getAdvisorTypeFromTutorialAdvisorType(type)` | `string` | `AdvisorTypes` | 从教程顾问类型转换 |
| `addFromWatchOut(notificationId)` | `string` | void | 从 WatchOut 通知添加建议 |

## 建议类别索引

从 `Advice.ltp` 面板布局可确认：

| 索引 | 类别 | AdvisorTypes 常量 |
|------|------|-------------------|
| 0 | Culture | `AdvisorTypes.CULTURE` |
| 1 | Military | `AdvisorTypes.MILITARY` |
| 2 | Economic | `AdvisorTypes.ECONOMIC` |
| 3 | Science | `AdvisorTypes.SCIENCE` |

## 相关全局对象

| 对象 | 说明 |
|------|------|
| `AdvisorTypes` | 顾问类别枚举（CULTURE / ECONOMIC / MILITARY / SCIENCE / NO_ADVISOR） |
| `AdviceManager.addItem()` | 在 Mod 中注册自定义建议条目 |
| `AdviceManager.addBundle()` | 在 Mod 中注册自定义建议 Bundle |