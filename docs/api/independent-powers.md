---
title: IndependentPowers
---

# IndependentPowers

独立势力 API（城邦、蛮族等）。

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `getIndependentPlayerIDAt` | location | `int` | 获取指定位置的独立势力玩家 ID |
| `getIndependentPlayerIDFromUnit` | unitID | `int` | 从单位获取独立势力玩家 ID |
| `independentName` | playerID | `string` | 获取独立势力名称 |
| `isIndependentEncampment` | location | `bool` | 是否为独立势力营地 |
| `getIndependentRelationship` | playerID, indepPlayerID | `int` | 获取与独立势力的关系 |
| `getIndependentHostility` | playerID, indepPlayerID | `int` | 获取独立势力敌意值 |
| `getIndependentPlayerIDWithUnitsAt` | location | `int` | 获取有单位的独立势力 ID |
| `independentVillageDiscoveredByPlayer` | indepPlayerID, playerID | `bool` | 村庄是否被玩家发现 |
