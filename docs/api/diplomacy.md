---
title: Diplomacy 外交
doc_type: system-topic
summary: 外交系统 API，涵盖玩家外交关系、外交事件、外交会话、外交令牌和交易操作。
primary_scope:
  - Diplomacy
  - Game.Diplomacy
  - player.Diplomacy
  - Game.DiplomacySessions
related_scope:
  - Game.DiplomacyDeals
  - player.Influence
  - Game.PlayerOperations
source:
  - TunerPanels/Diplomacy.ltp
  - TunerPanels/Deals.ltp
  - TunerPanels/Independents.ltp
---

# Diplomacy 外交

外交系统 API，管理玩家间外交关系、外交事件、会话、令牌和交易操作。

```javascript
// 快速示例：查询外交关系并宣战
// 来源 Diplomacy.ltp
const diplomacy = player.Diplomacy;
if (diplomacy.hasMet(otherPlayerID) && diplomacy.canDeclareWarOn(otherPlayerID, WarTypes.SURPRISE_WAR).Success) {
  diplomacy.forceDeclareWar(otherPlayerID);
}
```

## 方法列表（共 24 个）

### player.Diplomacy 子系统

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>player.Diplomacy.hasMet</API> | otherPlayerID | `bool` | 两个玩家是否已见面 |
| <API>player.Diplomacy.isAtWarWith</API> | otherPlayerID | `bool` | 是否处于战争状态 |
| <API>player.Diplomacy.canDeclareWarOn</API> | otherPlayerID, WarType | `object` | 是否可以宣战（返回 `.Success`） |
| <API>player.Diplomacy.canMakePeaceWith</API> | otherPlayerID | `object` | 是否可以和谈（返回 `.Success`） |
| <API>player.Diplomacy.forceDeclareWar</API> | otherPlayerID | `void` | 强制执行宣战 |
| <API>player.Diplomacy.forceAttackOperation</API> | otherPlayerID | `void` | 强制执行攻击行动 |
| <API>player.Diplomacy.getNumGrievances</API> | otherPlayerID | `float` | 获取不满值 |
| <API>player.Diplomacy.getNumFavors</API> | otherPlayerID | `float` | 获取好感值 |
| <API>player.Diplomacy.changeNumGrievances</API> | otherPlayerID, amount | `void` | 修改不满值 |
| <API>player.Diplomacy.changeNumFavors</API> | otherPlayerID, amount | `void` | 修改好感值 |
| <API>player.Diplomacy.getRelationshipLevel</API> | otherPlayerID | `int` | 获取关系等级 |
| <API>player.Diplomacy.getRelationshipLevelName</API> | otherPlayerID | `string` | 获取关系等级名称 |
| <API>player.Diplomacy.changeRelationshipLevel</API> | otherPlayerID, amount | `void` | 修改关系等级 |
| <API>player.Diplomacy.getTotalTokens</API> | — | `object` | 获取总令牌数（取 `.value`） |
| <API>player.Diplomacy.getAvailableTokens</API> | — | `object` | 获取可用令牌数（取 `.value`） |
| <API>player.Diplomacy.getCommittedTokens</API> | — | `object` | 获取已承诺令牌数（取 `.value`） |
| <API>player.Diplomacy.getEscrowTokens</API> | — | `object` | 获取托管令牌数（取 `.value`） |
| <API>player.Diplomacy.getExhaustedTokens</API> | — | `object` | 获取已耗尽令牌数（取 `.value`） |
| <API>player.Diplomacy.getReservedTokens</API> | — | `object` | 获取已保留令牌数（取 `.value`） |
| <API>player.Diplomacy.changeAvailableTokens</API> | amount | `void` | 修改可用令牌数 |

### Game.Diplomacy 全局对象

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Game.Diplomacy.getEventUnion</API> | player1ID, player2ID | `array` | 获取两玩家间的外交事件联合 |
| <API>Game.Diplomacy.getDiplomaticEventData</API> | eventID | `object` | 获取外交事件详细数据 |
| <API>Game.Diplomacy.getWarData</API> | eventID, playerID | `object` | 获取战争数据 |
| <API>Game.Diplomacy.getActiveEvents</API> | — | `array` | 获取所有活跃的外交事件 |
| <API>Game.Diplomacy.getInfluenceIndependentData</API> | eventID | `object` | 获取影响力独立数据 |
| <API>Game.Diplomacy.getLandClaimData</API> | eventID | `object` | 获取领土声索数据 |

### Game.DiplomacySessions

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Game.DiplomacySessions.requestSession</API> | fromPlayer, toPlayer, type | `void` | 请求外交会话 |
| <API>Game.DiplomacySessions.getOpenSessionIDs</API> | playerID | `int[]` | 获取开放会话 ID 列表 |
| <API>Game.DiplomacySessions.findOpenSession</API> | sessionID | `object` | 查找开放会话 |
| <API>Game.DiplomacySessions.getKeyNameOrNumber</API> | type | `string` | 获取会话键名 |

## 子对象/子系统

| 子系统 | 说明 |
|--------|------|
| `player.Influence` | 影响力/宗主权系统 |
| `Game.DiplomacyDeals` | 外交交易系统（详见 [DiplomacyDeals](diplomacy-deals.md)） |

### player.Influence 子系统

```javascript
// 来源 Diplomacy.ltp, Independents.ltp
const influence = player.Influence;
influence.setSuzerain(playerID);
influence.getSuzerain();
influence.tribeTypeHash;
```

### Game.DiplomacySessions 详情

```javascript
// 来源 Diplomacy.ltp
// 请求外交会话
Game.DiplomacySessions.requestSession(fromPlayer, toPlayer, "FIRST_MEET_NEAR_INITIATOR");
Game.DiplomacySessions.requestSession(fromPlayer, toPlayer, "DECLARE_SURPRISE_WAR");
Game.DiplomacySessions.requestSession(fromPlayer, toPlayer, "DEFEAT");

// 获取开放会话
let aIDs = Game.DiplomacySessions.getOpenSessionIDs(playerId);
for (const id of aIDs) {
  let session = Game.DiplomacySessions.findOpenSession(id);
  // session.from, session.to, session.pendingStatements
}
```

### Game.Diplomacy 详情

```javascript
// 来源 Diplomacy.ltp
// 获取外交事件联合
let events = Game.Diplomacy.getEventUnion(fromPlayer.id, toPlayer.id);
for (const event of events) {
  // event.uniqueID, event.initialPlayer, event.name, event.targetPlayer
  // event.support, event.progressScore, event.completionScore
}

let event = Game.Diplomacy.getDiplomaticEventData(eventID);
Game.Diplomacy.getInfluenceIndependentData(eventID);
Game.Diplomacy.getLandClaimData(eventID);
Game.Diplomacy.getWarData(eventID, playerID);
Game.Diplomacy.getActiveEvents();
```

### PlayerOperations（外交相关）

```javascript
// 来源 Diplomacy.ltp
// 支持外交行动
const args = { ID: eventID, Type: DiplomacyTokenTypes.DIPLOMACY_TOKEN_GLOBAL, Amount: 1, SubType: true };
Game.PlayerOperations.canStart(playerId, PlayerOperationTypes.SUPPORT_DIPLOMATIC_ACTION, args, false);
Game.PlayerOperations.sendRequest(playerId, PlayerOperationTypes.SUPPORT_DIPLOMATIC_ACTION, args);

// 反对外交行动
Game.PlayerOperations.sendRequest(playerId, PlayerOperationTypes.SUPPORT_DIPLOMATIC_ACTION, { ...args, SubType: false });

// 撤回外交行动
Game.PlayerOperations.sendRequest(playerId, PlayerOperationTypes.UNSUPPORT_DIPLOMATIC_ACTION, args);

// 结盟
const args2 = { Player1: fromPlayer.id, Player2: toPlayer.id, Type: DiplomacyActionTypes.DIPLOMACY_ACTION_FORM_ALLIANCE };
Game.PlayerOperations.sendRequest(playerId, PlayerOperationTypes.FORM_ALLIANCE, args2);
```

### DiplomacyDeals（交易系统）

```javascript
// 来源 Deals.ltp
// 查询交易
Game.DiplomacyDeals.getDealIds(playerId);
Game.DiplomacyDeals.getDeal(dealId);
Game.DiplomacyDeals.getDealItem(dealId, itemId);
Game.DiplomacyDeals.hasPendingDeal(fromPlayer, toPlayer);

// 创建交易
let workingDealId = { direction: DiplomacyDealDirection.OUTGOING, player1: from, player2: to };
Game.DiplomacyDeals.clearWorkingDeal(workingDealId);
let dealItem = { type: DiplomacyDealItemTypes.AGREEMENTS, agreementType: DiplomacyDealItemAgreementTypes.OPEN_BORDERS, duration: 10 };
Game.DiplomacyDeals.addItemToWorkingDeal(workingDealId, dealItem);
Game.DiplomacyDeals.sendWorkingDeal(workingDealId, DiplomacyDealProposalActions.ACCEPTED);
Game.DiplomacyDeals.getPossibleWorkingDealItems(workingDealId, playerId, DiplomacyDealItemTypes.CITIES);
```

## 常用枚举

| 枚举 | 说明 |
|------|------|
| `DiplomacyTokenTypes.DIPLOMACY_TOKEN_GLOBAL` | 全局外交令牌 |
| `DiplomacyActionTypes.DIPLOMACY_ACTION_FORM_ALLIANCE` | 结盟行动 |
| `WarTypes.SURPRISE_WAR` | 奇袭战争 |
| `PlayerOperationTypes.SUPPORT_DIPLOMATIC_ACTION` | 支持外交行动 |
| `PlayerOperationTypes.UNSUPPORT_DIPLOMATIC_ACTION` | 撤回外交行动 |
| `PlayerOperationTypes.FORM_ALLIANCE` | 结盟 |
| `DiplomacyDealItemTypes.AGREEMENTS` | 协议类交易项 |
| `DiplomacyDealItemTypes.CITIES` | 城市类交易项 |
| `DiplomacyDealDirection.OUTGOING` | 出站交易 |
| `DiplomacyDealProposalActions.ACCEPTED` | 接受提案 |

---

<API id="player.Diplomacy.hasMet"><h3>player.Diplomacy.hasMet(otherPlayerID)</h3>

**说明**: 检查当前玩家是否已与目标玩家见面。

| 参数名 | 类型 | 说明 |
|------|------|------|
| otherPlayerID | `int` | 目标玩家 ID |

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 Diplomacy.ltp
// 检查是否已见面
const diplomacy = player.Diplomacy;
if (diplomacy.hasMet(otherPlayerID)) {
  console.log("已见面");
}
```

</API>
<API id="player.Diplomacy.isAtWarWith"><h3>player.Diplomacy.isAtWarWith(otherPlayerID)</h3>

**说明**: 检查当前玩家是否与目标玩家处于战争状态。

| 参数名 | 类型 | 说明 |
|------|------|------|
| otherPlayerID | `int` | 目标玩家 ID |

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 Diplomacy.ltp
// 检查战争状态
if (player.Diplomacy.isAtWarWith(otherPlayerID)) {
  console.log("战争中");
}
```

</API>
<API id="player.Diplomacy.canDeclareWarOn"><h3>player.Diplomacy.canDeclareWarOn(otherPlayerID, WarType)</h3>

**说明**: 检查是否可以宣战。返回对象的 `.Success` 属性表示结果。

| 参数名 | 类型 | 说明 |
|------|------|------|
| otherPlayerID | `int` | 目标玩家 ID |
| WarType | `WarTypes` | 战争类型，如 `WarTypes.SURPRISE_WAR` |

**返回值**: `object` (取 `.Success` 判断)

**使用示例**:

```javascript
// 来源 Diplomacy.ltp
// 检查是否可以奇袭宣战
const result = player.Diplomacy.canDeclareWarOn(otherPlayerID, WarTypes.SURPRISE_WAR);
if (result.Success) {
  player.Diplomacy.forceDeclareWar(otherPlayerID);
}
```

</API>
<API id="player.Diplomacy.canMakePeaceWith"><h3>player.Diplomacy.canMakePeaceWith(otherPlayerID)</h3>

**说明**: 检查是否可以和目标玩家和谈。返回对象的 `.Success` 属性表示结果。

| 参数名 | 类型 | 说明 |
|------|------|------|
| otherPlayerID | `int` | 目标玩家 ID |

**返回值**: `object` (取 `.Success` 判断)

</API>
<API id="player.Diplomacy.forceDeclareWar"><h3>player.Diplomacy.forceDeclareWar(otherPlayerID)</h3>

**说明**: 强制对目标玩家宣战。

| 参数名 | 类型 | 说明 |
|------|------|------|
| otherPlayerID | `int` | 目标玩家 ID |

**返回值**: `void`

</API>
<API id="player.Diplomacy.forceAttackOperation"><h3>player.Diplomacy.forceAttackOperation(otherPlayerID)</h3>

**说明**: 强制对目标玩家执行攻击行动。

| 参数名 | 类型 | 说明 |
|------|------|------|
| otherPlayerID | `int` | 目标玩家 ID |

**返回值**: `void`

</API>
<API id="player.Diplomacy.getNumGrievances"><h3>player.Diplomacy.getNumGrievances(otherPlayerID)</h3>

**说明**: 获取当前玩家对目标玩家的不满值。

| 参数名 | 类型 | 说明 |
|------|------|------|
| otherPlayerID | `int` | 目标玩家 ID |

**返回值**: `float`

**使用示例**:

```javascript
// 来源 Diplomacy.ltp
// 获取不满值
const grievances = player.Diplomacy.getNumGrievances(otherPlayerID);
console.log(grievances.toFixed(1));
```

</API>
<API id="player.Diplomacy.getNumFavors"><h3>player.Diplomacy.getNumFavors(otherPlayerID)</h3>

**说明**: 获取当前玩家对目标玩家的好感值。

| 参数名 | 类型 | 说明 |
|------|------|------|
| otherPlayerID | `int` | 目标玩家 ID |

**返回值**: `float`

</API>
<API id="player.Diplomacy.changeNumGrievances"><h3>player.Diplomacy.changeNumGrievances(otherPlayerID, amount)</h3>

**说明**: 修改当前玩家对目标玩家的不满值。

| 参数名 | 类型 | 说明 |
|------|------|------|
| otherPlayerID | `int` | 目标玩家 ID |
| amount | `float` | 修改量 |

**返回值**: `void`

</API>
<API id="player.Diplomacy.changeNumFavors"><h3>player.Diplomacy.changeNumFavors(otherPlayerID, amount)</h3>

**说明**: 修改当前玩家对目标玩家的好感值。

| 参数名 | 类型 | 说明 |
|------|------|------|
| otherPlayerID | `int` | 目标玩家 ID |
| amount | `float` | 修改量 |

**返回值**: `void`

</API>
<API id="player.Diplomacy.getRelationshipLevel"><h3>player.Diplomacy.getRelationshipLevel(otherPlayerID)</h3>

**说明**: 获取当前玩家与目标玩家的关系等级数值。

| 参数名 | 类型 | 说明 |
|------|------|------|
| otherPlayerID | `int` | 目标玩家 ID |

**返回值**: `int`

</API>
<API id="player.Diplomacy.getRelationshipLevelName"><h3>player.Diplomacy.getRelationshipLevelName(otherPlayerID)</h3>

**说明**: 获取当前玩家与目标玩家的关系等级名称（本地化文本）。

| 参数名 | 类型 | 说明 |
|------|------|------|
| otherPlayerID | `int` | 目标玩家 ID |

**返回值**: `string`

**使用示例**:

```javascript
// 来源 Diplomacy.ltp
// 获取关系等级名称
const relStatus = Locale.compose(player.Diplomacy.getRelationshipLevelName(otherPlayerID));
console.log(relStatus);
```

</API>
<API id="player.Diplomacy.changeRelationshipLevel"><h3>player.Diplomacy.changeRelationshipLevel(otherPlayerID, amount)</h3>

**说明**: 修改当前玩家与目标玩家的关系等级。

| 参数名 | 类型 | 说明 |
|------|------|------|
| otherPlayerID | `int` | 目标玩家 ID |
| amount | `int` | 修改量 |

**返回值**: `void`

</API>
<API id="player.Diplomacy.getTotalTokens"><h3>player.Diplomacy.getTotalTokens()</h3>

**说明**: 获取外交令牌总数，取 `.value` 获取数值。

**参数**: 无

**返回值**: `object` (取 `.value`)

**使用示例**:

```javascript
// 来源 Diplomacy.ltp
// 获取令牌信息
const totalTokens = player.Diplomacy.getTotalTokens().value;
const availableTokens = player.Diplomacy.getAvailableTokens().value;
```

</API>
<API id="player.Diplomacy.getAvailableTokens"><h3>player.Diplomacy.getAvailableTokens()</h3>

**说明**: 获取可用外交令牌数，取 `.value` 获取数值。

**参数**: 无

**返回值**: `object` (取 `.value`)

</API>
<API id="player.Diplomacy.getCommittedTokens"><h3>player.Diplomacy.getCommittedTokens()</h3>

**说明**: 获取已承诺外交令牌数，取 `.value` 获取数值。

**参数**: 无

**返回值**: `object` (取 `.value`)

</API>
<API id="player.Diplomacy.getEscrowTokens"><h3>player.Diplomacy.getEscrowTokens()</h3>

**说明**: 获取托管外交令牌数，取 `.value` 获取数值。

**参数**: 无

**返回值**: `object` (取 `.value`)

</API>
<API id="player.Diplomacy.getExhaustedTokens"><h3>player.Diplomacy.getExhaustedTokens()</h3>

**说明**: 获取已耗尽外交令牌数，取 `.value` 获取数值。

**参数**: 无

**返回值**: `object` (取 `.value`)

</API>
<API id="player.Diplomacy.getReservedTokens"><h3>player.Diplomacy.getReservedTokens()</h3>

**说明**: 获取已保留外交令牌数，取 `.value` 获取数值。

**参数**: 无

**返回值**: `object` (取 `.value`)

</API>
<API id="player.Diplomacy.changeAvailableTokens"><h3>player.Diplomacy.changeAvailableTokens(amount)</h3>

**说明**: 修改可用外交令牌数。

| 参数名 | 类型 | 说明 |
|------|------|------|
| amount | `int` | 修改量 |

**返回值**: `void`

</API>
<API id="Game.Diplomacy.getEventUnion"><h3>Game.Diplomacy.getEventUnion(player1ID, player2ID)</h3>

**说明**: 获取两个玩家之间的外交事件联合列表。每个事件包含 `uniqueID`、`initialPlayer`、`name`、`targetPlayer`、`support`、`progressScore`、`completionScore` 等属性。

| 参数名 | 类型 | 说明 |
|------|------|------|
| player1ID | `int` | 玩家 1 ID |
| player2ID | `int` | 玩家 2 ID |

**返回值**: `array`

**使用示例**:

```javascript
// 来源 Diplomacy.ltp
// 获取外交事件
let events = Game.Diplomacy.getEventUnion(fromPlayer.id, toPlayer.id);
for (const event of events) {
  console.log(event.uniqueID, event.name, event.support, event.progressScore);
}
```

</API>
<API id="Game.Diplomacy.getDiplomaticEventData"><h3>Game.Diplomacy.getDiplomaticEventData(eventID)</h3>

**说明**: 获取指定外交事件的详细数据。

| 参数名 | 类型 | 说明 |
|------|------|------|
| eventID | `int` | 事件 ID |

**返回值**: `object`

**使用示例**:

```javascript
// 来源 Diplomacy.ltp
// 获取事件详细数据
let event = Game.Diplomacy.getDiplomaticEventData(eventID);
// event.uniqueID, event.initialPlayer, event.name, event.targetPlayer
```

</API>
<API id="Game.Diplomacy.getWarData"><h3>Game.Diplomacy.getWarData(eventID, playerID)</h3>

**说明**: 获取指定事件的战争数据。

| 参数名 | 类型 | 说明 |
|------|------|------|
| eventID | `int` | 事件 ID |
| playerID | `int` | 玩家 ID |

**返回值**: `object`

**使用示例**:

```javascript
// 来源 Diplomacy.ltp
// 获取战争数据
let warData = Game.Diplomacy.getWarData(event.uniqueID, event.initialPlayer);
```

</API>
<API id="Game.Diplomacy.getActiveEvents"><h3>Game.Diplomacy.getActiveEvents()</h3>

**说明**: 获取所有活跃的外交事件列表。

**参数**: 无

**返回值**: `array`

**使用示例**:

```javascript
// 来源 Diplomacy.ltp
// 遍历所有活跃外交事件
for (let event of Game.Diplomacy.getActiveEvents()) {
  console.log(event.uniqueID, event.name);
}
```

</API>
<API id="Game.Diplomacy.getInfluenceIndependentData"><h3>Game.Diplomacy.getInfluenceIndependentData(eventID)</h3>

**说明**: 获取指定事件的影响力独立数据。

| 参数名 | 类型 | 说明 |
|------|------|------|
| eventID | `int` | 事件 ID |

**返回值**: `object`

</API>
<API id="Game.Diplomacy.getLandClaimData"><h3>Game.Diplomacy.getLandClaimData(eventID)</h3>

**说明**: 获取指定事件的领土声索数据。

| 参数名 | 类型 | 说明 |
|------|------|------|
| eventID | `int` | 事件 ID |

**返回值**: `object`

</API>
<API id="Game.DiplomacySessions.requestSession"><h3>Game.DiplomacySessions.requestSession(fromPlayer, toPlayer, type)</h3>

**说明**: 请求创建一个外交会话。type 可为 `"FIRST_MEET_NEAR_INITIATOR"`、`"DECLARE_SURPRISE_WAR"`、`"DEFEAT"` 等。

| 参数名 | 类型 | 说明 |
|------|------|------|
| fromPlayer | `int` | 发起方玩家 ID |
| toPlayer | `int` | 目标玩家 ID |
| type | `string` | 会话类型 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 Diplomacy.ltp
// 请求外交会话
Game.DiplomacySessions.requestSession(fromPlayer, toPlayer, "DECLARE_SURPRISE_WAR");
```

</API>
<API id="Game.DiplomacySessions.getOpenSessionIDs"><h3>Game.DiplomacySessions.getOpenSessionIDs(playerID)</h3>

**说明**: 获取指定玩家的所有开放会话 ID 列表。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 玩家 ID |

**返回值**: `int[]`

</API>
<API id="Game.DiplomacySessions.findOpenSession"><h3>Game.DiplomacySessions.findOpenSession(sessionID)</h3>

**说明**: 查找指定 ID 的开放会话，返回会话对象（含 `from`、`to`、`pendingStatements` 等属性）。

| 参数名 | 类型 | 说明 |
|------|------|------|
| sessionID | `int` | 会话 ID |

**返回值**: `object`

</API>
<API id="Game.DiplomacySessions.getKeyNameOrNumber"><h3>Game.DiplomacySessions.getKeyNameOrNumber(type)</h3>

**说明**: 获取会话键的名称或数字。

| 参数名 | 类型 | 说明 |
|------|------|------|
| type | `int` | 键类型 |

**返回值**: `string`

</API>