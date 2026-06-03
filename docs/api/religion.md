---
title: Religion 宗教
---

# Religion 宗教

宗教系统 API。

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `getPlayerFromReligion` | religionID | `int` | 获取宗教所属玩家 |
| `isBeliefClaimable` | beliefID | `bool` | 信仰是否可认领 |
| `hasBeenFounded` | religionID | `bool` | 宗教是否已创立 |
| `hasCreatedReligion` | playerID | `bool` | 玩家是否已创建宗教 |
| `canHaveBelief` | playerID, beliefID | `bool` | 是否可以拥有信仰 |
| `getPantheons` | — | `array` | 获取万神殿列表 |
| `getReligionName` | religionID | `string` | 获取宗教名称 |
| `getReligionType` | religionID | `string` | 获取宗教类型 |
| `get` | religionID | `object` | 获取宗教对象 |
| `canCreateReligion` | playerID | `bool` | 是否可以创建宗教 |
