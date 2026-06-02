---
title: Resources
---

# Resources

资源管理全局对象。

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `lookup` | type | `object` | 根据类型查询资源定义 |
| `getResourceOnPlot` | location | `object` | 获取地块上的资源 |
| `getAssignedResources` | playerID | `array` | 获取已分配的资源 |
| `getOriginCity` | resourceID | `City` | 获取资源来源城市 |
| `getAssignedResourcesCap` | playerID | `int` | 获取资源分配上限 |
| `forEach` | callback | `void` | 遍历所有资源 |
| `getLocalResources` | playerID | `array` | 获取本地资源 |
| `canStartTreasureFleet` | playerID | `bool` | 是否可以开始宝藏舰队 |
