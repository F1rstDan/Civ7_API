---
title: Diplomacy 外交
---

# Diplomacy 外交

外交系统 API。

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `hasMet` | player1, player2 | `bool` | 两个玩家是否已见面 |
| `isAtWarWith` | player1, player2 | `bool` | 是否处于战争状态 |
| `canMakePeaceWith` | player1, player2 | `bool` | 是否可以和谈 |
| `getWarData` | player1, player2 | `object` | 获取战争数据 |
| `getCompletionData` | eventID | `object` | 获取事件完成数据 |
| `getDiplomaticEventData` | eventID | `object` | 获取外交事件数据 |
| `getPlayerEvents` | playerID | `array` | 获取玩家的外交事件 |
| `getJointEvents` | player1, player2 | `array` | 获取联合事件 |
| `getSupportingPlayersWithBonusEnvoys` | eventID | `array` | 获取支持方玩家 |
| `getOpposingPlayersWithBonusEnvoys` | eventID | `array` | 获取反对方玩家 |
| `getInfluenceForNextSupport` | eventID | `int` | 获取下一次支持所需影响力 |
| `modifyByGameSpeed` | value | `int` | 按游戏速度修改数值 |
| `getAgendaNames` | playerID | `array` | 获取议程名称 |
| `isProjectCanceled` | projectID | `bool` | 项目是否已取消 |
| `getProjectDataForUI` | projectID | `object` | 获取项目 UI 数据 |
## TunerPanel 补充：Diplomacy 完整 API（来源 Diplomacy.ltp）

### player.Diplomacy 子系统

```javascript
// 来源 Diplomacy.ltp
const diplomacy = player.Diplomacy;

// 关系查询
diplomacy.hasMet(otherPlayerID);
diplomacy.isAtWarWith(otherPlayerID);
diplomacy.getNumGrievances(otherPlayerID);
diplomacy.getNumFavors(otherPlayerID);
diplomacy.getRelationshipLevel(otherPlayerID);
diplomacy.getRelationshipLevelName(otherPlayerID);

// 关系修改
diplomacy.changeNumGrievances(otherPlayerID, amount);
diplomacy.changeNumFavors(otherPlayerID, amount);
diplomacy.changeRelationshipLevel(otherPlayerID, amount);

// 战争/和平
diplomacy.canDeclareWarOn(otherPlayerID, WarTypes.SURPRISE_WAR);
diplomacy.canMakePeaceWith(otherPlayerID);
diplomacy.forceDeclareWar(otherPlayerID);
diplomacy.forceAttackOperation(otherPlayerID);

// 外交令牌
diplomacy.changeAvailableTokens(amount);
diplomacy.getTotalTokens();
diplomacy.getAvailableTokens();
diplomacy.getCommittedTokens();
diplomacy.getEscrowTokens();
diplomacy.getExhaustedTokens();
diplomacy.getReservedTokens();
```

### Game.DiplomacySessions

```javascript
// 来源 Diplomacy.ltp
Game.DiplomacySessions.requestSession(fromPlayer, toPlayer, "FIRST_MEET_NEAR_INITIATOR");
Game.DiplomacySessions.requestSession(fromPlayer, toPlayer, "DECLARE_SURPRISE_WAR");
Game.DiplomacySessions.requestSession(fromPlayer, toPlayer, "DEFEAT");

let aIDs = Game.DiplomacySessions.getOpenSessionIDs(playerId);
for (const id of aIDs) {
  let session = Game.DiplomacySessions.findOpenSession(id);
  // session.from, session.to, session.pendingStatements
}
```

### Game.Diplomacy

```javascript
// 来源 Diplomacy.ltp
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

### player.Influence 子系统

```javascript
// 来源 Diplomacy.ltp, Independents.ltp
const influence = player.Influence;
influence.setSuzerain(playerID);
influence.getSuzerain();
influence.tribeTypeHash;
```

### DiplomacyDeals（交易系统）

```javascript
// 来源 Deals.ltp
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

| 枚举 | 值 | 说明 |
|------|---|------|
| `DiplomacyTokenTypes.DIPLOMACY_TOKEN_GLOBAL` | — | 全局外交令牌 |
| `DiplomacyActionTypes.DIPLOMACY_ACTION_FORM_ALLIANCE` | — | 结盟行动 |
| `WarTypes.SURPRISE_WAR` | — | 奇袭战争 |
| `PlayerOperationTypes.SUPPORT_DIPLOMATIC_ACTION` | — | 支持外交行动 |
| `PlayerOperationTypes.UNSUPPORT_DIPLOMATIC_ACTION` | — | 撤回外交行动 |
| `PlayerOperationTypes.FORM_ALLIANCE` | — | 结盟 |
| `DiplomacyDealItemTypes.AGREEMENTS` | — | 协议类交易项 |
| `DiplomacyDealItemTypes.CITIES` | — | 城市类交易项 |
| `DiplomacyDealDirection.OUTGOING` | — | 出站交易 |
| `DiplomacyDealProposalActions.ACCEPTED` | — | 接受提案 |

---

*来源：Diplomacy.ltp、Deals.ltp、Independents.ltp*
