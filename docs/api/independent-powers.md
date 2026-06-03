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
## TunerPanel 补充：Independent Powers 完整 API（来源 Independents.ltp）

### Game.IndependentPowers

```javascript
// 来源 Independents.ltp
Game.IndependentPowers.getNumIndependents();
Game.IndependentPowers.isIndependentAlive(index);
Game.IndependentPowers.independentName(index);
Game.IndependentPowers.getIndependentType(playerId);
Game.IndependentPowers.getIndependentPlayerLevel(index, majorPlayerId);
Game.IndependentPowers.getIndependentRelationship(index, majorPlayerId);
```

### player.Influence（城邦相关）

```javascript
// 来源 Independents.ltp
const influence = player.Influence;
influence.setSuzerain(majorPlayerId);  // 设置宗主
influence.getSuzerain();               // 获取宗主玩家 ID
influence.tribeTypeHash;               // 部落类型哈希
```

### 独立势力查询模式

```javascript
// 来源 Independents.ltp
for (const id of Players.getWasEverAliveIds()) {
  let player = Players.get(id);
  if (player.isIndependent || player.isMinor) {
    let strTribe = Game.IndependentPowers.independentName(id);
    let isAlive = player.isMinor ? player.isAlive : Game.IndependentPowers.isIndependentAlive(id);
    let indType = GameInfo.Independents.lookup(player.Influence?.tribeTypeHash);
    let hasDistricts = player.Districts?.getDistricts().length > 0;
    let hasUnits = player.Units?.numUnits > 0;
    let suzerain = player.isMinor ? player.Influence?.getSuzerain() : -1;
  }
}

// 获取存活的主要文明
Players.getAliveMajorIds();
Players.getAliveMinorIds();
```

---

*来源：Independents.ltp*
