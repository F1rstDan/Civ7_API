---
title: IndependentPowers 独立势力
doc_type: object-api
summary: 独立势力管理，包括城邦、蛮族等非主要文明的查询、关系和敌意系统。
primary_scope:
  - Game.IndependentPowers
related_scope:
  - player.Influence
source:
  - TunerPanels/Independents.ltp
---

# IndependentPowers 独立势力

独立势力 API（城邦、蛮族等），通过 `Game.IndependentPowers` 访问。

```javascript
// 快速示例：获取指定位置的独立势力
// 来源 Independents.ltp
const indepPlayerId = Game.IndependentPowers.getIndependentPlayerIDAt(location);
if (indepPlayerId >= 0) {
  console.log(Game.IndependentPowers.independentName(indepPlayerId));
}
```

## 方法列表（共 8 个）

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Game.IndependentPowers.getIndependentPlayerIDAt</API> | location | `int` | 获取指定位置的独立势力玩家 ID |
| <API>Game.IndependentPowers.getIndependentPlayerIDFromUnit</API> | unitID | `int` | 从单位获取独立势力玩家 ID |
| <API>Game.IndependentPowers.independentName</API> | playerID | `string` | 获取独立势力名称 |
| <API>Game.IndependentPowers.isIndependentEncampment</API> | location | `bool` | 是否为独立势力营地 |
| <API>Game.IndependentPowers.getIndependentRelationship</API> | playerID, indepPlayerID | `int` | 获取与独立势力的关系 |
| <API>Game.IndependentPowers.getIndependentHostility</API> | playerID, indepPlayerID | `int` | 获取独立势力敌意值 |
| <API>Game.IndependentPowers.getIndependentPlayerIDWithUnitsAt</API> | location | `int` | 获取有单位的独立势力 ID |
| <API>Game.IndependentPowers.independentVillageDiscoveredByPlayer</API> | indepPlayerID, playerID | `bool` | 村庄是否被玩家发现 |

## TunerPanel 补充：Independent Powers 完整 API（来源 Independents.ltp）

### Game.IndependentPowers 扩展方法

```javascript
// 来源 Independents.ltp
// 更多独立势力方法
Game.IndependentPowers.getNumIndependents();
Game.IndependentPowers.isIndependentAlive(index);
Game.IndependentPowers.getIndependentType(playerId);
Game.IndependentPowers.getIndependentPlayerLevel(index, majorPlayerId);
```

### player.Influence（城邦相关）

```javascript
// 来源 Independents.ltp
// 影响力/城邦系统
const influence = player.Influence;
influence.setSuzerain(majorPlayerId);  // 设置宗主
influence.getSuzerain();               // 获取宗主玩家 ID
influence.tribeTypeHash;               // 部落类型哈希
```

### 独立势力查询模式

```javascript
// 来源 Independents.ltp
// 遍历所有独立势力
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

## GameInfo 关联表

```javascript
GameInfo.Independents;    // 独立势力定义表
```

---

<API id="Game.IndependentPowers.getIndependentPlayerIDAt"><h3>Game.IndependentPowers.getIndependentPlayerIDAt(location)</h3>

**说明**: 获取指定位置的独立势力玩家 ID。

| 参数名 | 类型 | 说明 |
|------|------|------|
| location | `object` | 坐标 `{x, y}` |

**返回值**: `int`

</API>
<API id="Game.IndependentPowers.getIndependentPlayerIDFromUnit"><h3>Game.IndependentPowers.getIndependentPlayerIDFromUnit(unitID)</h3>

**说明**: 从单位获取其所属独立势力玩家 ID。

| 参数名 | 类型 | 说明 |
|------|------|------|
| unitID | `int` | 单位 ID |

**返回值**: `int`

</API>
<API id="Game.IndependentPowers.independentName"><h3>Game.IndependentPowers.independentName(playerID)</h3>

**说明**: 获取独立势力名称。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 独立势力玩家 ID |

**返回值**: `string`

</API>
<API id="Game.IndependentPowers.isIndependentEncampment"><h3>Game.IndependentPowers.isIndependentEncampment(location)</h3>

**说明**: 检查指定位置是否为独立势力营地。

| 参数名 | 类型 | 说明 |
|------|------|------|
| location | `object` | 坐标 `{x, y}` |

**返回值**: `bool`

</API>
<API id="Game.IndependentPowers.getIndependentRelationship"><h3>Game.IndependentPowers.getIndependentRelationship(playerID, indepPlayerID)</h3>

**说明**: 获取主要文明与独立势力之间的关系。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 主要文明玩家 ID |
| indepPlayerID | `int` | 独立势力玩家 ID |

**返回值**: `int`

</API>
<API id="Game.IndependentPowers.getIndependentHostility"><h3>Game.IndependentPowers.getIndependentHostility(playerID, indepPlayerID)</h3>

**说明**: 获取独立势力对主要文明的敌意值。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 主要文明玩家 ID |
| indepPlayerID | `int` | 独立势力玩家 ID |

**返回值**: `int`

</API>
<API id="Game.IndependentPowers.getIndependentPlayerIDWithUnitsAt"><h3>Game.IndependentPowers.getIndependentPlayerIDWithUnitsAt(location)</h3>

**说明**: 获取指定位置有单位的独立势力玩家 ID。

| 参数名 | 类型 | 说明 |
|------|------|------|
| location | `object` | 坐标 `{x, y}` |

**返回值**: `int`

</API>
<API id="Game.IndependentPowers.independentVillageDiscoveredByPlayer"><h3>Game.IndependentPowers.independentVillageDiscoveredByPlayer(indepPlayerID, playerID)</h3>

**说明**: 检查村庄是否已被玩家发现。

| 参数名 | 类型 | 说明 |
|------|------|------|
| indepPlayerID | `int` | 独立势力玩家 ID |
| playerID | `int` | 主要文明玩家 ID |

**返回值**: `bool`

</API>