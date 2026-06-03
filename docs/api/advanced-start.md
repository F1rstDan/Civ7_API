---
title: AdvancedStart 高级开局
---

# AdvancedStart 高级开局

AdvancedStart 子系统管理文明7的高级开局阶段，包括卡牌系统和效果使用。

> 来源：AdvancedStart.ltp

## player.AdvancedStart 子系统

```javascript
// 来源 AdvancedStart.ltp
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

---

*来源：AdvancedStart.ltp*