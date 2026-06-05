---
title: Victories 胜利系统
doc_type: object-api
summary: 胜利系统，包含胜利管理、玩家胜利状态、时代进度、胜利类型。
primary_scope:
  - Victories
related_scope:
  - player.Victories
  - GameInfo.Victories
source:
  - TunerPanels/Victories.ltp
  - TunerPanels/VictoriesDefeats.ltp
---

# Victories 胜利系统

文明7的胜利系统由 `Game.VictoryManager`（全局胜利管理）和 `player.Victories`（玩家胜利状态）组成。

```javascript
// 快速示例：检查玩家胜利进度
// 来源 Victories.ltp
const playerVictories = player.Victories;
const points = playerVictories.getPointsForVictoryType(victoryHash);
console.log(points);
```

## Game.VictoryManager

```javascript
// 来源 VictoriesDefeats.ltp
// 胜利管理器
Game.VictoryManager.grantTeamVictory(team, victoryType);   // 授予团队胜利
Game.VictoryManager.surrenderPlayer(playerId, defeatType); // 玩家投降
Game.VictoryManager.getDefeatEnabledPlayers();             // 获取启用失败的玩家
Game.VictoryManager.getLatestPlayerDefeat(playerId);       // 获取最近失败类型
Game.VictoryManager.getConfiguration();                    // 获取胜利配置
Game.VictoryManager.getVictories();                        // 获取所有胜利记录
Game.VictoryManager.getCountdownVictoryDominanceScore(victoryType);
```

## player.Victories 子系统

```javascript
// 来源 Victories.ltp
// 玩家胜利状态
const playerVictories = player.Victories;

playerVictories.addVictoryPoints(victoryHash, 500);
playerVictories.getPointsForVictoryType(victoryHash);
playerVictories.getScoringForVictoryType(victoryHash);     // 返回 [{name, points}]
playerVictories.getDominantForVictoryType(victoryHash);
playerVictories.getDominantCountdownForVictoryType(victoryHash);
playerVictories.getVictoryCountdownStatus(victoryHash);    // 返回 {prereqs: [{description, current, total}]}
```

## Game.AgeProgressManager

```javascript
// 来源 VictoriesDefeats.ltp
// 时代进度管理器
Game.AgeProgressManager.updateAgeProgressionPoints(1);
Game.AgeProgressManager.getCurrentAgeProgressionPoints();
Game.AgeProgressManager.getMaxAgeProgressionPoints();
Game.AgeProgressManager.isExtendedGame;
Game.AgeProgressManager.isAgeOver;
Game.AgeProgressManager.isFinalAge;
```

## VictoryTypes（硬编码）

```javascript
// 来源 Victories.ltp
// 胜利类型列表
["VICTORY_MILITARY_MODERN", "VICTORY_CULTURE_MODERN", 
 "VICTORY_ECONOMIC_MODERN", "VICTORY_SCIENCE_MODERN", "VICTORY_SCORE"]
```

## GameInfo 关联表

```javascript
GameInfo.Victories;    // 胜利定义表
GameInfo.Defeats;      // 失败定义表
GameInfo.LegacyPaths;  // 传承路径表
```
