---
title: ProgressionTrees
---

# ProgressionTrees

科技/文化树管理 API。

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `getNode` | nodeID | `object` | 获取树节点 |
| `getTree` | treeID | `object` | 获取树对象 |
| `lookup` | type | `object` | 根据类型查询 |
| `getNodeState` | playerID, nodeID | `string` | 获取节点状态（已解锁/进行中/锁定） |
| `find` | predicate | `object` | 查找满足条件的树 |
| `getTreeStructure` | treeID | `object` | 获取树结构 |
| `canEverUnlock` | playerID, nodeID | `bool` | 是否可以解锁 |
| `hasLegendUnlocked` | playerID | `bool` | 传说是否已解锁 |
