---
title: DiplomacyDeals 外交交易
doc_type: system-topic
summary: 外交交易管理 API，涵盖交易的创建、修改、发送和查询。
primary_scope:
  - Game.DiplomacyDeals
related_scope:
  - DiplomacyDealDirection
  - DiplomacyDealItemTypes
  - DiplomacyDealProposalActions
source:
  - TunerPanels/Deals.ltp
  - TunerPanels/Diplomacy.ltp
  - modules/base-standard/ui/diplomacy-peace-deal/panel-diplomacy-peace-deal.js
doc_update: 2026-06-05
---

# DiplomacyDeals 外交交易

外交交易管理 API，用于创建、修改、发送和查询玩家间的外交交易。

```javascript
// 快速示例：创建并发送开放边界协议
// 来源 Deals.ltp
let workingDealId = { direction: DiplomacyDealDirection.OUTGOING, player1: fromPlayer, player2: toPlayer };
Game.DiplomacyDeals.clearWorkingDeal(workingDealId);
let dealItem = { type: DiplomacyDealItemTypes.AGREEMENTS, agreementType: DiplomacyDealItemAgreementTypes.OPEN_BORDERS, duration: 10 };
Game.DiplomacyDeals.addItemToWorkingDeal(workingDealId, dealItem);
Game.DiplomacyDeals.sendWorkingDeal(workingDealId, DiplomacyDealProposalActions.ACCEPTED);
```

## 方法列表（共 10 个）

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Game.DiplomacyDeals.getDealIds</API> | playerID | `int[]` | 获取玩家的交易 ID 列表 |
| <API>Game.DiplomacyDeals.getDeal</API> | dealID | `object` | 获取指定交易详情 |
| <API>Game.DiplomacyDeals.getDealItem</API> | dealID, itemID | `object` | 获取交易中的指定项目 |
| <API>Game.DiplomacyDeals.hasPendingDeal</API> | player1ID, player2ID | `bool` | 检查两玩家间是否有待处理交易 |
| <API>Game.DiplomacyDeals.clearWorkingDeal</API> | workingDealId | `void` | 清除当前工作交易 |
| <API>Game.DiplomacyDeals.addItemToWorkingDeal</API> | workingDealId, dealItem | `void` | 向工作交易添加项目 |
| <API>Game.DiplomacyDeals.removeItemFromWorkingDeal</API> | workingDealId, index | `void` | 从工作交易移除项目 |
| <API>Game.DiplomacyDeals.sendWorkingDeal</API> | workingDealId, proposalAction | `void` | 发送工作交易 |
| <API>Game.DiplomacyDeals.getWorkingDeal</API> | workingDealId | `object` | 获取工作交易详情 |
| <API>Game.DiplomacyDeals.getPossibleWorkingDealItems</API> | workingDealId, playerId, itemType | `array` | 获取可选交易项目 |

## 交易创建流程

```javascript
// 来源 Deals.ltp
// 完整交易创建流程
let workingDealId = { direction: DiplomacyDealDirection.OUTGOING, player1: from, player2: to };
Game.DiplomacyDeals.clearWorkingDeal(workingDealId);
let dealItem = { type: DiplomacyDealItemTypes.AGREEMENTS, agreementType: DiplomacyDealItemAgreementTypes.OPEN_BORDERS, duration: 10 };
Game.DiplomacyDeals.addItemToWorkingDeal(workingDealId, dealItem);
Game.DiplomacyDeals.sendWorkingDeal(workingDealId, DiplomacyDealProposalActions.ACCEPTED);
```

## 交易查询

```javascript
// 来源 Deals.ltp
// 查询玩家所有交易
let aIDs = Game.DiplomacyDeals.getDealIds(playerId);
for (const id of aIDs) {
  let deal = Game.DiplomacyDeals.getDeal(id);
  if (deal) {
    // deal.player1, deal.player2, deal.itemIds
    for (const itemId of deal.itemIds) {
      let dealItem = Game.DiplomacyDeals.getDealItem(id, itemId);
    }
  }
}

// 检查待处理交易
// 来源 Diplomacy.ltp
let bHasPendingDeal = Game.DiplomacyDeals.hasPendingDeal(fromPlayerID, toPlayerID);
```

## 获取可选交易项目

```javascript
// 来源 Deals.ltp
// 获取可选的城市交易项目
let workingDealId = { direction: DiplomacyDealDirection.OUTGOING, player1: from, player2: to };
let items = Game.DiplomacyDeals.getPossibleWorkingDealItems(workingDealId, workingDealId.player1, DiplomacyDealItemTypes.CITIES);
```

## 常用枚举

| 枚举 | 说明 |
|------|------|
| `DiplomacyDealItemTypes.AGREEMENTS` | 协议类交易项 |
| `DiplomacyDealItemTypes.CITIES` | 城市类交易项 |
| `DiplomacyDealItemAgreementTypes.OPEN_BORDERS` | 开放边界协议 |
| `DiplomacyDealDirection.OUTGOING` | 出站交易方向 |
| `DiplomacyDealProposalActions.ACCEPTED` | 接受提案 |

---

<API id="Game.DiplomacyDeals.getDealIds"><h3>Game.DiplomacyDeals.getDealIds(playerID)</h3>

**说明**: 获取指定玩家的所有交易 ID 列表。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 玩家 ID |

**返回值**: `int[]`

**使用示例**:

```javascript
// 来源 Deals.ltp
// 获取玩家交易列表
let aIDs = Game.DiplomacyDeals.getDealIds(playerId);
for (const id of aIDs) {
  let deal = Game.DiplomacyDeals.getDeal(id);
}
```

</API>
<API id="Game.DiplomacyDeals.getDeal"><h3>Game.DiplomacyDeals.getDeal(dealID)</h3>

**说明**: 获取指定交易 ID 的详情。返回对象包含 `player1`、`player2`、`itemIds` 等属性。

| 参数名 | 类型 | 说明 |
|------|------|------|
| dealID | `int` | 交易 ID |

**返回值**: `object`

**使用示例**:

```javascript
// 来源 Deals.ltp
// 获取交易详情
let deal = Game.DiplomacyDeals.getDeal(dealId);
if (deal) {
  console.log(deal.player1, deal.player2, deal.itemIds);
}
```

</API>
<API id="Game.DiplomacyDeals.getDealItem"><h3>Game.DiplomacyDeals.getDealItem(dealID, itemID)</h3>

**说明**: 获取指定交易中的指定项目详情。

| 参数名 | 类型 | 说明 |
|------|------|------|
| dealID | `int` | 交易 ID |
| itemID | `int` | 项目 ID |

**返回值**: `object`

**使用示例**:

```javascript
// 来源 Deals.ltp
// 获取交易项目
let dealItem = Game.DiplomacyDeals.getDealItem(dealId, itemId);
```

</API>
<API id="Game.DiplomacyDeals.hasPendingDeal"><h3>Game.DiplomacyDeals.hasPendingDeal(player1ID, player2ID)</h3>

**说明**: 检查两个玩家之间是否有待处理的交易。

| 参数名 | 类型 | 说明 |
|------|------|------|
| player1ID | `int` | 玩家 1 ID |
| player2ID | `int` | 玩家 2 ID |

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 Diplomacy.ltp
// 检查待处理交易
let bHasPendingDeal = Game.DiplomacyDeals.hasPendingDeal(fromPlayer.id, toPlayer.id);
```

</API>
<API id="Game.DiplomacyDeals.clearWorkingDeal"><h3>Game.DiplomacyDeals.clearWorkingDeal(workingDealId)</h3>

**说明**: 清除指定的工作交易，重置所有项目。

| 参数名 | 类型 | 说明 |
|------|------|------|
| workingDealId | `object` | 工作交易 ID 对象，含 `direction`、`player1`、`player2` |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 Deals.ltp
// 清除工作交易
let workingDealId = { direction: DiplomacyDealDirection.OUTGOING, player1: from, player2: to };
Game.DiplomacyDeals.clearWorkingDeal(workingDealId);
```

</API>
<API id="Game.DiplomacyDeals.addItemToWorkingDeal"><h3>Game.DiplomacyDeals.addItemToWorkingDeal(workingDealId, dealItem)</h3>

**说明**: 向工作交易添加一个交易项目。

| 参数名 | 类型 | 说明 |
|------|------|------|
| workingDealId | `object` | 工作交易 ID 对象 |
| dealItem | `object` | 交易项目对象，含 `type`、`agreementType`、`duration` 等 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 Deals.ltp
// 添加交易项目
let dealItem = { type: DiplomacyDealItemTypes.AGREEMENTS, agreementType: DiplomacyDealItemAgreementTypes.OPEN_BORDERS, duration: 10 };
Game.DiplomacyDeals.addItemToWorkingDeal(workingDealId, dealItem);
```

</API>
<API id="Game.DiplomacyDeals.removeItemFromWorkingDeal"><h3>Game.DiplomacyDeals.removeItemFromWorkingDeal(workingDealId, index)</h3>

**说明**: 从工作交易中移除指定索引的项目。

| 参数名 | 类型 | 说明 |
|------|------|------|
| workingDealId | `object` | 工作交易 ID 对象 |
| index | `int` | 项目索引 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 panel-diplomacy-peace-deal.js
// 移除工作交易中的项目
Game.DiplomacyDeals.removeItemFromWorkingDeal(workingDealId, dealItem.id);
```

</API>
<API id="Game.DiplomacyDeals.sendWorkingDeal"><h3>Game.DiplomacyDeals.sendWorkingDeal(workingDealId, proposalAction)</h3>

**说明**: 发送工作交易，proposalAction 可选 `DiplomacyDealProposalActions.ACCEPTED` 等。

| 参数名 | 类型 | 说明 |
|------|------|------|
| workingDealId | `object` | 工作交易 ID 对象 |
| proposalAction | `DiplomacyDealProposalActions` | 提案动作 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 Deals.ltp
// 发送交易
Game.DiplomacyDeals.sendWorkingDeal(workingDealId, DiplomacyDealProposalActions.ACCEPTED);
```

</API>
<API id="Game.DiplomacyDeals.getWorkingDeal"><h3>Game.DiplomacyDeals.getWorkingDeal(workingDealId)</h3>

**说明**: 获取当前工作交易的详情。

| 参数名 | 类型 | 说明 |
|------|------|------|
| workingDealId | `object` | 工作交易 ID 对象 |

**返回值**: `object`

**使用示例**:

```javascript
// 来源 panel-diplomacy-peace-deal.js
// 获取工作交易详情
const workingDeal = Game.DiplomacyDeals.getWorkingDeal(workingDealId);
if (workingDeal) {
  workingDeal.itemIds.forEach((itemID) => {
    // 遍历交易项目
  });
}
```

</API>
<API id="Game.DiplomacyDeals.getPossibleWorkingDealItems"><h3>Game.DiplomacyDeals.getPossibleWorkingDealItems(workingDealId, playerId, itemType)</h3>

**说明**: 获取工作交易中可选的交易项目列表。itemType 可选 `DiplomacyDealItemTypes.CITIES`、`DiplomacyDealItemTypes.AGREEMENTS` 等。

| 参数名 | 类型 | 说明 |
|------|------|------|
| workingDealId | `object` | 工作交易 ID 对象 |
| playerId | `int` | 玩家 ID |
| itemType | `DiplomacyDealItemTypes` | 交易项目类型 |

**返回值**: `array`

**使用示例**:

```javascript
// 来源 Deals.ltp
// 获取可选城市交易项目
let items = Game.DiplomacyDeals.getPossibleWorkingDealItems(workingDealId, workingDealId.player1, DiplomacyDealItemTypes.CITIES);
```

</API>