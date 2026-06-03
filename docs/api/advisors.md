---
title: Advisors 建议系统
---

# Advisors 建议系统

文明7的游戏内建议（Advisor）系统，分为文化、经济、军事、科学四个类别。通过 `globalThis.AdviceManager` 全局对象访问。

> 来源：Advice.ltp

## AdviceManager 全局对象

```javascript
// 来源 Advice.ltp
// 获取所有建议 Bundle（调试用）
let bundles = globalThis.AdviceManager.tunerGetBundles();
// 返回数组，索引: [0]=Culture, [1]=Military, [2]=Economic, [3]=Science

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

## 建议类别索引

从 `Advice.ltp` 面板布局可确认：

| 索引 | 类别 | 说明 |
|------|------|------|
| 0 | Culture | 文化建议 |
| 1 | Military | 军事建议 |
| 2 | Economic | 经济建议 |
| 3 | Science | 科学建议 |

## 方法详细

| 方法 | 返回值 | 说明 |
|------|--------|------|
| `tunerGetBundles()` | `Array[4]` | 返回 4 个数组，每个对应一个类别的 Bundle 列表 |
| `tunerGetItemsInBundle(bundle)` | `Array` | 返回指定 Bundle 中的所有建议页面 |
| `tunerAddBundleForcibly(bundle)` | void | 强制显示某个 Bundle 的所有建议 |
| `tunerAddPageForcibly(page)` | void | 强制显示某个建议页面 |
| `tunerClearCultureMind()` | void | 清除文化建议 |
| `tunerClearEconomicMind()` | void | 清除经济建议 |
| `tunerClearMilitaryMind()` | void | 清除军事建议 |
| `tunerClearScienceMind()` | void | 清除科学建议 |

::: warning 注意
这些 API 以 `tuner` 前缀命名，表明它们是 Firaxis 为调试工具（Tuner）专门暴露的接口。在正式 Mod 开发中可能不完全可用，但可作为理解建议系统架构的参考。
:::

---

*来源：Advice.ltp*
