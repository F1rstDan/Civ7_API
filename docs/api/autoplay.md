---
title: Autoplay 自动播放
doc_type: reference
summary: Autoplay 全局对象控制文明7的自动播放/观察模式，支持状态查询、玩家切换和 AI 控制。
primary_scope:
  - Autoplay
related_scope:
  - Automation
source:
  - TunerPanels/Autoplay.ltp
---

# Autoplay 自动播放

Autoplay 全局对象控制文明7的自动播放/观察模式。

## Autoplay 全局对象

```javascript
// 来源 TunerPanels/Autoplay.ltp
// 状态查询和控制

// 状态查询
Autoplay.isActive;              // 是否激活
Autoplay.turns;                 // 剩余回合数
Autoplay.returnAsPlayer;        // 返回时控制的玩家 ID
Autoplay.observeAsPlayer;       // 观察的玩家 ID

// 控制
Autoplay.setActive(true);       // 激活/停用
Autoplay.setTurns(10);          // 设置回合数（-1 为无限制）
Autoplay.setReturnAsPlayer(playerId);   // 设置返回玩家
Autoplay.setObserveAsPlayer(playerId);  // 设置观察玩家
Autoplay.setAsLocalPlayer(playerId);    // 设为本地玩家
Autoplay.setAsAI(playerId);            // 设为 AI 控制
Autoplay.setAsHuman(playerId);         // 设为人类控制
```

## Automation 检查

```javascript
// 来源 TunerPanels/Autoplay.ltp
// 在设置 Autoplay 前检查 Automation 是否活跃
if (typeof Automation == 'undefined' || Automation.isActive == false) {
  Autoplay.setTurns(10);
}
```