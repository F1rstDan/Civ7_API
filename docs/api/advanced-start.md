---
title: AdvancedStart 高级开局
doc_type: object-api
summary: 高级开局子系统，管理卡牌获取、牌组操作、效果使用和放置状态。
primary_scope:
  - AdvancedStart
related_scope:
  - player.AdvancedStart
source:
  - TunerPanels/AdvancedStart.ltp
---

# AdvancedStart 高级开局

AdvancedStart 子系统管理文明7的高级开局阶段，包括卡牌系统和效果使用。

```javascript
// 快速示例：获取可用卡牌
// 来源 AdvancedStart.ltp
const advStart = player.AdvancedStart;
let cards = advStart.getAvailableCards();
for (const card of cards) {
  console.log(card.name, card.effects);
}
```

## player.AdvancedStart 子系统

```javascript
// 来源 AdvancedStart.ltp
// 高级开局核心 API
const advStart = player.AdvancedStart;

// 获取可用卡牌
let cards = advStart.getAvailableCards();
for (const card of cards) {
  card.id;          // 卡牌 ID
  card.name;        // 卡牌名称
  card.description; // 卡牌描述
  card.effects;     // 效果数组 [{id, amount}]
}

// 获取当前牌组
let deck = advStart.getCards();
for (const card of deck) {
  card.info.id;
  card.info.effects;
}

// 牌组管理
advStart.getDeckSize();              // 获取牌组大小
advStart.getPlacementComplete();     // 放置是否完成
advStart.setPlacementComplete(true); // 设置放置完成
```

## PlayerOperations 高级开局

```javascript
// 来源 AdvancedStart.ltp
// 通过操作执行高级开局功能

// 添加/移除卡牌
let args = { Type: "ADD", ID: cardId };
Game.PlayerOperations.canStart(playerId, PlayerOperationTypes.ADVANCED_START_MODIFY_DECK, args, false);
Game.PlayerOperations.sendRequest(playerId, PlayerOperationTypes.ADVANCED_START_MODIFY_DECK, args);

// 使用效果
let args2 = { ID: effectId };
Game.PlayerOperations.canStart(playerId, PlayerOperationTypes.ADVANCED_START_USE_EFFECT, args2, false);
Game.PlayerOperations.sendRequest(playerId, PlayerOperationTypes.ADVANCED_START_USE_EFFECT, args2);
```

## GameInfo 关联表

```javascript
GameInfo.AdvancedStartCardEffects;  // 高级开局卡牌效果表
```