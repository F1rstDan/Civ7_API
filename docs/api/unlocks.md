---
title: Unlocks 解锁系统
doc_type: object-api
summary: 解锁管理系统，控制玩家的科技、文化、文明能力解锁状态。
primary_scope:
  - Unlocks
related_scope:
  - GameInfo.Unlocks
source:
  - TunerPanels/Unlocks.ltp
---

# Unlocks 解锁系统

文明7的解锁管理系统，控制玩家的科技、文化、文明能力解锁状态。

```javascript
// 快速示例：检查解锁状态
// 来源 Unlocks.ltp
const isUnlocked = Game.Unlocks.isUnlockedForPlayer(unlockType, playerId);
if (!isUnlocked) {
  Game.Unlocks.setForceUnlockedForPlayer(unlockHash, playerId, true);
}
```

## Game.Unlocks 子系统

```javascript
// 来源 Unlocks.ltp
// 解锁管理核心方法
Game.Unlocks.isUnlockedForPlayer(unlockType, playerId);              // 检查是否已解锁
Game.Unlocks.setForceUnlockedForPlayer(unlockId, playerId, true);    // 强制解锁
Game.Unlocks.clearForceUnlockedForPlayer(unlockId, playerId);        // 清除强制解锁
```

### 参数说明

| 方法 | 参数 | 类型 | 说明 |
|------|------|------|------|
| `isUnlockedForPlayer` | unlockType | number/string | 解锁类型（$hash 或 UnlockType 字符串） |
| `isUnlockedForPlayer` | playerId | number | 玩家 ID |
| `setForceUnlockedForPlayer` | unlockId | number | 解锁项的 $hash |
| `setForceUnlockedForPlayer` | playerId | number | 玩家 ID |
| `setForceUnlockedForPlayer` | forced | boolean | `true` 表示强制解锁 |
| `clearForceUnlockedForPlayer` | unlockId | number | 解锁项的 $hash |
| `clearForceUnlockedForPlayer` | playerId | number | 玩家 ID |

## GameInfo 关联表

```javascript
// 来源 Unlocks.ltp
GameInfo.Unlocks;          // 解锁定义表（UnlockType, ...）
```

## 使用示例

```javascript
// 来源 Unlocks.ltp — SelectionList PopulateList + Actions
// 检查某玩家是否解锁了特定项目
GameInfo.Unlocks.forEach(u => {
  const met = Game.Unlocks.isUnlockedForPlayer(u.UnlockType, playerId);
  // met: boolean
});

// 强制解锁（调试用）
const unlockHash = unlockEntry.$hash;
Game.Unlocks.setForceUnlockedForPlayer(unlockHash, playerId, true);

// 清除强制解锁
Game.Unlocks.clearForceUnlockedForPlayer(unlockHash, playerId);
```