---
title: Autoplay 自动播放
doc_type: object-api
summary: Autoplay 全局对象控制文明7的自动播放/观察模式，支持状态查询、玩家切换和 AI 控制。
primary_scope:
  - Autoplay
related_scope:
  - Automation
source:
  - TunerPanels/Autoplay.ltp
  - modules/base-standard/ui/automation/automation-base-play-game.js
  - modules/base-standard/ui/automation/automation-test-benchmark-ai.js
doc_update: 2026-06-05
---

# Autoplay 自动播放

Autoplay 全局对象控制文明7的自动播放/观察模式。引擎直接注入，无需手动 import 引入。

```javascript
// 来源 TunerPanels/Autoplay.ltp
// 激活自动播放并设置回合数
Autoplay.setTurns(10);
Autoplay.setActive(true);
```

## 属性与方法

```javascript
// 来源 TunerPanels/Autoplay.ltp
// 状态查询（属性）
Autoplay.isActive;              // 是否激活
Autoplay.turns;                 // 剩余回合数
Autoplay.returnAsPlayer;        // 返回时控制的玩家 ID
Autoplay.observeAsPlayer;       // 观察的玩家 ID

// 控制（方法）
Autoplay.setActive(true);       // 激活/停用自动播放
Autoplay.setTurns(10);          // 设置回合数（-1 为无限制）
Autoplay.setPause(true);        // 暂停/恢复自动播放
Autoplay.setReturnAsPlayer(playerId);   // 设置返回玩家
Autoplay.setObserveAsPlayer(playerId);  // 设置观察玩家
Autoplay.setAsLocalPlayer(playerId);    // 设为本地玩家
Autoplay.setAsAI(playerId);            // 设为 AI 控制
Autoplay.setAsHuman(playerId);         // 设为人类控制
```

## Automation 检查

```javascript
// 来源 TunerPanels/Autoplay.ltp
// 在设置 Autoplay 前检查 Automation 是否活跃，避免冲突
if (typeof Automation == 'undefined' || Automation.isActive == false) {
  Autoplay.setTurns(10);
}
```

## 典型场景

```javascript
// 来源 modules/base-standard/ui/automation/automation-base-play-game.js
// 自动化测试中启动观察模式
Autoplay.setTurns(turnCount);
Autoplay.setReturnAsPlayer(0);
Autoplay.setObserveAsPlayer(observeAs);
Autoplay.setActive(true);
```

```javascript
// 来源 modules/base-standard/ui/automation/automation-test-benchmark-ai.js
// 基准测试中设置 AI 自动播放并暂停
Autoplay.setTurns(this.TURN_TARGET);
Autoplay.setReturnAsPlayer(GameContext.localPlayerID);
Autoplay.setObserveAsPlayer(GameContext.localPlayerID);
Autoplay.setActive(true);
Autoplay.setPause(true);
```