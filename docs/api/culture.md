---
title: Culture 文化
---

# Culture 文化

文化系统 API。

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `getChosenIdeology` | playerID | `string` | 获取已选择的意识形态 |
| `getGovernmentType` | playerID | `string` | 获取政体类型 |
| `getGreatWorkType` | greatWorkID | `string` | 获取大作品类型 |
| `get` | playerID | `object` | 获取玩家文化对象 |
| `isNodeUnlocked` | playerID, nodeID | `bool` | 文化节点是否已解锁 |
| `getTurnsForNode` | playerID, nodeID | `int` | 获取节点所需回合数 |
| `getNumWorksInArchive` | playerID | `int` | 获取档案中的大作品数量 |
| `getArchivedGreatWork` | playerID, index | `object` | 获取归档的大作品 |
