---
title: IndependentPowers 独立势力
doc_type: object
summary: 独立势力管理，包括城邦、蛮族等非主要文明的查询、关系和敌意系统。
primary_scope:
  - Game.IndependentPowers
related_scope:
  - player.Influence
source:
  - TunerPanels/Independents.ltp
  - TunerPanels/Map.ltp
  - TunerPanels/Diplomacy.ltp
  - modules/base-standard/ui/unit-flags/unit-flags-independent-powers.js
  - modules/base-standard/ui-next/tooltips/plot-tooltip/helpers.js
  - modules/age-antiquity/ui/tutorial/tutorial-items-antiquity.js
doc_update: 2026-06-05
---

# IndependentPowers 独立势力

独立势力 API（城邦、蛮族等），通过 `Game.IndependentPowers` 访问。

```javascript
// 快速示例：获取指定位置的独立势力
// 来源 unit-flags-independent-powers.js
// 根据地图坐标查询独立势力玩家 ID
const independentID = Game.IndependentPowers.getIndependentPlayerIDAt(x, y);
if (independentID != PlayerIds.NO_PLAYER) {
  const name = Game.IndependentPowers.independentName(independentID);
  const isEncampment = Game.IndependentPowers.isIndependentEncampment(independentID);
  const hostility = Game.IndependentPowers.getIndependentHostility(independentID, localPlayerID);
}
```

## 方法列表

| 方法（共 12 个） | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Game.IndependentPowers.getNumIndependents</API> | — | `int` | 获取独立势力总数 |
| <API>Game.IndependentPowers.getIndependentPlayerIDAt</API> | x, y | `int` | 获取指定位置的独立势力玩家 ID |
| <API>Game.IndependentPowers.getIndependentPlayerIDFromUnit</API> | unitID | `int` | 从单位获取独立势力玩家 ID |
| <API>Game.IndependentPowers.getIndependentPlayerIDWithUnitsAt</API> | x, y | `int` | 获取指定位置有单位的独立势力玩家 ID |
| <API>Game.IndependentPowers.independentName</API> | playerID | `string` | 获取独立势力名称 |
| <API>Game.IndependentPowers.isIndependentAlive</API> | index | `bool` | 检查独立势力是否存活 |
| <API>Game.IndependentPowers.isIndependentEncampment</API> | independentID | `bool` | 检查是否为独立势力营地 |
| <API>Game.IndependentPowers.independentVillageDiscoveredByPlayer</API> | indepPlayerID, playerID | `bool` | 村庄是否被玩家发现 |
| <API>Game.IndependentPowers.getIndependentType</API> | playerID | `int` | 获取独立势力类型 |
| <API>Game.IndependentPowers.getIndependentPlayerLevel</API> | index, majorPlayerID | `int` | 获取独立势力等级 |
| <API>Game.IndependentPowers.getIndependentRelationship</API> | indepPlayerID, playerID | `int` | 获取与独立势力的关系值 |
| <API>Game.IndependentPowers.getIndependentHostility</API> | indepPlayerID, playerID | `int` | 获取独立势力敌意值 |

## 子对象/子系统

| 子系统 | 说明 |
|--------|------|
| player.Influence | 影响力/城邦系统，管理宗主关系 |

### player.Influence 子系统

```javascript
// 来源 Independents.ltp
// 影响力/城邦系统宗主关系操作
const influence = player.Influence;
influence.setSuzerain(majorPlayerId);  // 设置宗主
influence.getSuzerain();               // 获取宗主玩家 ID
influence.tribeTypeHash;               // 部落类型哈希
```

### 独立势力遍历模式

```javascript
// 来源 Independents.ltp
// 遍历所有独立势力，获取名称、存活状态、类型、宗主等信息
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

<API id="Game.IndependentPowers.getNumIndependents"><h3>Game.IndependentPowers.getNumIndependents()</h3>

**说明**: 获取独立势力总数，用于遍历所有独立势力。

**参数**: 无

**返回值**: `int`

**使用示例**:

```javascript
// 来源 Map.ltp
// 遍历所有独立势力
for (let i = 0; i < Game.IndependentPowers.getNumIndependents(); i++) {
  let strTribe = Locale.compose(Game.IndependentPowers.independentName(i));
  if (Game.IndependentPowers.isIndependentAlive(i)) {
    // 处理存活势力
  }
}
```

</API>
<API id="Game.IndependentPowers.getIndependentPlayerIDAt"><h3>Game.IndependentPowers.getIndependentPlayerIDAt(x, y)</h3>

**说明**: 获取指定坐标的独立势力玩家 ID。未找到时返回 `PlayerIds.NO_PLAYER`。

| 参数名 | 类型 | 说明 |
|------|------|------|
| x | `int` | X 坐标 |
| y | `int` | Y 坐标 |

**返回值**: `int`

**使用示例**:

```javascript
// 来源 unit-flags-independent-powers.js
// 根据地图坐标获取独立势力 ID
const independentID = Game.IndependentPowers.getIndependentPlayerIDAt(
  data.location.x,
  data.location.y
);
if (independentID == PlayerIds.NO_PLAYER) {
  return;
}
```

</API>
<API id="Game.IndependentPowers.getIndependentPlayerIDFromUnit"><h3>Game.IndependentPowers.getIndependentPlayerIDFromUnit(unitID)</h3>

**说明**: 从单位获取其所属独立势力玩家 ID。

| 参数名 | 类型 | 说明 |
|------|------|------|
| unitID | `int` | 单位 ID（componentID） |

**返回值**: `int`

**使用示例**:

```javascript
// 来源 unit-flags-independent-powers.js
// 从单位获取所属独立势力
this.independentID = Game.IndependentPowers.getIndependentPlayerIDFromUnit(this.componentID);
```

</API>
<API id="Game.IndependentPowers.getIndependentPlayerIDWithUnitsAt"><h3>Game.IndependentPowers.getIndependentPlayerIDWithUnitsAt(x, y)</h3>

**说明**: 获取指定坐标有单位的独立势力玩家 ID。未找到时返回 `PlayerIds.NO_PLAYER`。

| 参数名 | 类型 | 说明 |
|------|------|------|
| x | `int` | X 坐标 |
| y | `int` | Y 坐标 |

**返回值**: `int`

**使用示例**:

```javascript
// 来源 tutorial-items-antiquity.js
// 当 getIndependentPlayerIDAt 未找到时，回退查找有单位的独立势力
independentID = Game.IndependentPowers.getIndependentPlayerIDWithUnitsAt(
  eventLoc.x,
  eventLoc.y
);
```

</API>
<API id="Game.IndependentPowers.independentName"><h3>Game.IndependentPowers.independentName(playerID)</h3>

**说明**: 获取独立势力名称（本地化字符串）。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 独立势力玩家 ID |

**返回值**: `string`

**使用示例**:

```javascript
// 来源 unit-flags-independent-powers.js
// 获取独立势力显示名称
const name = Game.IndependentPowers.independentName(this.independentID);
```

</API>
<API id="Game.IndependentPowers.isIndependentAlive"><h3>Game.IndependentPowers.isIndependentAlive(index)</h3>

**说明**: 检查指定索引的独立势力是否存活。

| 参数名 | 类型 | 说明 |
|------|------|------|
| index | `int` | 独立势力索引 |

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 Independents.ltp
// 判断独立势力存活状态（城邦用 player.isAlive，蛮族用此方法）
if (player.isMinor && player.isAlive) {
  strLive = "Yes";
}
if (Game.IndependentPowers.isIndependentAlive(index)) {
  strLive = "Yes";
}
```

</API>
<API id="Game.IndependentPowers.isIndependentEncampment"><h3>Game.IndependentPowers.isIndependentEncampment(independentID)</h3>

**说明**: 检查指定独立势力是否为营地类型（蛮族营地）。

| 参数名 | 类型 | 说明 |
|------|------|------|
| independentID | `int` | 独立势力玩家 ID |

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 tutorial-items-antiquity.js
// 判断独立势力是否为营地类型
const isEncampment = Game.IndependentPowers.isIndependentEncampment(independentID);
if (independentName != null && isEncampment) {
  // 营地类型处理逻辑
}
```

</API>
<API id="Game.IndependentPowers.independentVillageDiscoveredByPlayer"><h3>Game.IndependentPowers.independentVillageDiscoveredByPlayer(indepPlayerID, playerID)</h3>

**说明**: 检查村庄是否已被玩家发现。

| 参数名 | 类型 | 说明 |
|------|------|------|
| indepPlayerID | `int` | 独立势力玩家 ID |
| playerID | `int` | 主要文明玩家 ID |

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 tutorial-items-antiquity.js
// 检查村庄是否被本地玩家发现
bVillageDiscovered = Game.IndependentPowers.independentVillageDiscoveredByPlayer(
  independentID,
  GameContext.localPlayerID
);
```

</API>
<API id="Game.IndependentPowers.getIndependentType"><h3>Game.IndependentPowers.getIndependentType(playerID)</h3>

**说明**: 获取独立势力类型哈希值，可用于查询 `GameInfo.Independents` 表。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 独立势力玩家 ID |

**返回值**: `int`

**使用示例**:

```javascript
// 来源 Diplomacy.ltp
// 获取独立势力类型
let independentType = Game.IndependentPowers.getIndependentType(data.independentPlayerID);
```

</API>
<API id="Game.IndependentPowers.getIndependentPlayerLevel"><h3>Game.IndependentPowers.getIndependentPlayerLevel(index, majorPlayerID)</h3>

**说明**: 获取独立势力相对于某主要文明的等级。

| 参数名 | 类型 | 说明 |
|------|------|------|
| index | `int` | 独立势力玩家 ID |
| majorPlayerID | `int` | 主要文明玩家 ID |

**返回值**: `int`

**使用示例**:

```javascript
// 来源 Independents.ltp
// 获取独立势力对主要文明的等级和关系
let strIntLevel = Game.IndependentPowers.getIndependentPlayerLevel(iVillage, player.id);
let strRelLevel = Game.IndependentPowers.getIndependentRelationship(iVillage, player.id);
```

</API>
<API id="Game.IndependentPowers.getIndependentRelationship"><h3>Game.IndependentPowers.getIndependentRelationship(indepPlayerID, playerID)</h3>

**说明**: 获取主要文明与独立势力之间的关系值。返回值可对照 `IndependentRelationship` 枚举判断友善/中立/敌对。

| 参数名 | 类型 | 说明 |
|------|------|------|
| indepPlayerID | `int` | 独立势力玩家 ID |
| playerID | `int` | 主要文明玩家 ID |

**返回值**: `int`

**使用示例**:

```javascript
// 来源 helpers.js
// 获取独立势力与本地玩家的关系
const relationship = Game.IndependentPowers.getIndependentRelationship(independentID, localPlayerID);
if (relationship === IndependentRelationship.NEUTRAL) {
  return; // 中立关系不显示
}
```

</API>
<API id="Game.IndependentPowers.getIndependentHostility"><h3>Game.IndependentPowers.getIndependentHostility(indepPlayerID, playerID)</h3>

**说明**: 获取独立势力对主要文明的敌意值。

| 参数名 | 类型 | 说明 |
|------|------|------|
| indepPlayerID | `int` | 独立势力玩家 ID |
| playerID | `int` | 主要文明玩家 ID |

**返回值**: `int`

**使用示例**:

```javascript
// 来源 helpers.js
// 获取独立势力敌意值
Game.IndependentPowers.getIndependentHostility(independentID, localPlayerID)
```

</API>