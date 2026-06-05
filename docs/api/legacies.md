---
title: Legacies 传承系统
doc_type: object-api
summary: 文明7的传承系统包括 player.Legacies（传承触发和进度）和 player.LegacyPaths（传承路径和奖励）。
primary_scope:
  - player.Legacies
  - player.LegacyPaths
related_scope:
  - GameInfo.Legacies
  - GameInfo.LegacyPaths
  - GameInfo.AgeProgressionRewards
source:
  - TunerPanels/Legacies.ltp
  - TunerPanels/Player Legacy Path.ltp
---

# Legacies 传承系统

文明7的传承系统包括 `player.Legacies`（传承触发和进度）和 `player.LegacyPaths`（传承路径和奖励）。

## player.Legacies 子系统

```javascript
// 来源 TunerPanels/Legacies.ltp
// 传承触发和进度查询
const playerLegacies = player.Legacies;

playerLegacies.isTriggered(legacyType);                    // 是否已触发
playerLegacies.isValidLegacy(legacyType);                  // 是否有效
playerLegacies.getProgress(legacyType);                    // 获取进度 {progress: [{current, total}]}
playerLegacies.setForceTriggered(legacyType, true, true);  // 强制触发
playerLegacies.clearForceTriggered(legacyType, true, true); // 清除强制触发
```

## player.LegacyPaths 子系统

```javascript
// 来源 TunerPanels/Player Legacy Path.ltp
// 传承路径和奖励管理
const playerLegacyPaths = player.LegacyPaths;

playerLegacyPaths.hasReward(hash);           // 是否拥有奖励
playerLegacyPaths.grantReward(hash);         // 授予奖励
playerLegacyPaths.addLegacyPathEvent(legacyPathId, amount); // 添加传承路径事件
```

## 查询传承状态示例

```javascript
// 来源 TunerPanels/Legacies.ltp
// 遍历所有传承路径并查询状态
for (const path of GameInfo.LegacyPaths) {
  let triggered = playerLegacies.isTriggered(path.LegacyType);
  let valid = playerLegacies.isValidLegacy(path.LegacyType);
  if (valid && triggered) {
    let legacyState = playerLegacies.getProgress(path.LegacyType);
    // legacyState.progress[0].current / legacyState.progress[0].total
  }
}
```

## GameInfo 关联表

```javascript
// 来源 源码 GameInfo 关联
GameInfo.Legacies;              // 传承定义表
GameInfo.LegacyPaths;           // 传承路径表
GameInfo.AgeProgressionRewards; // 时代进度奖励表
```
