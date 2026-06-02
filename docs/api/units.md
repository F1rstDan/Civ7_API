---
title: Units
---

# Units

单位管理全局对象。

```javascript
const unit = Units.get(unitID);
const unitInfo = Units.lookup(unitType);
```

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `get` | id | `Unit` | 根据 ID 获取单位对象 |
| `lookup` | type | `object` | 根据类型哈希查询单位定义 |
| `getBuildUnit` | playerID | `Unit` | 获取建造中的单位 |
| `find` | predicate | `Unit` | 查找满足条件的单位 |
| `forEach` | callback | `void` | 遍历所有单位 |
| `getUnitTypesUnlockedWithTag` | tag | `array` | 获取带指定标签的已解锁单位类型 |
| `getUnits` | playerID | `Unit[]` | 获取指定玩家的所有单位 |
| `getReachableTargets` | unitID | `array` | 获取单位可到达的目标 |
| `getPathTo` | unitID, target | `array` | 获取单位到目标的路径 |
| `create` | params | `Unit` | 创建新单位 |
| `setLocation` | unitID, location | `void` | 设置单位位置 |
