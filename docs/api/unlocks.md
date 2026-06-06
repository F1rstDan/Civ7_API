---
title: Unlocks 解锁系统
doc_type: object
summary: 解锁管理系统，控制玩家的科技、文化、文明能力解锁状态，通过 Game.Unlocks 访问。
primary_scope:
  - Game.Unlocks
related_scope:
  - GameInfo.Unlocks
source:
  - TunerPanels/Unlocks.ltp
  - modules/core/ui-next/screens/unlocks/civ-unlocks-model.js
  - modules/base-standard/ui/unlocks/screen-unlocks.js
  - modules/base-standard/ui/unlocks/unlocks-manager.js
  - modules/base-standard/ui/syncretism/syncretism-screen-model.js
doc_update: 2026-06-05
---

# Unlocks 解锁系统

文明7的解锁管理系统，控制玩家的科技、文化、文明能力解锁状态。通过 `Game.Unlocks` 全局对象访问。

```javascript
// 来源 TunerPanels/Unlocks.ltp
// 检查解锁状态
const isUnlocked = Game.Unlocks.isUnlockedForPlayer(unlockType, playerId);
if (!isUnlocked) {
  Game.Unlocks.setForceUnlockedForPlayer(unlockHash, playerId, true);
}
```

## 方法列表

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Game.Unlocks.isUnlockedForPlayer</API> | unlockType, playerId | `boolean` | 检查玩家是否已解锁指定类型 |
| <API>Game.Unlocks.getProgressForPlayer</API> | unlockType, playerId | `object` | 获取玩家在解锁类型上的进度 |
| <API>Game.Unlocks.setForceUnlockedForPlayer</API> | unlockId, playerId, forced | `void` | 强制解锁 |
| <API>Game.Unlocks.clearForceUnlockedForPlayer</API> | unlockId, playerId | `void` | 清除强制解锁 |
| <API>Game.Unlocks.getSyncreticCivUnlocksForChoice</API> | playerId, choiceType | `array` | 获取融合选择中可用的文明解锁 |
| <API>Game.Unlocks.getInfrastructureChoiceSyncreticUnlocks</API> | civType | `array` | 获取建筑融合选择的可升级项目 |
| <API>Game.Unlocks.getUnitChoiceSyncreticUnlocks</API> | civType | `array` | 获取单位融合选择的可升级项目 |
| <API>Game.Unlocks.getSelfChoiceSyncreticUnlocks</API> | civType | `array` | 获取自身融合选择的可解锁项目 |

## GameInfo 关联表

```javascript
// 来源 TunerPanels/Unlocks.ltp
// 解锁定义表
GameInfo.Unlocks;          // 解锁定义表（UnlockType, ...）
```

## 使用示例

```javascript
// 来源 TunerPanels/Unlocks.ltp
// 遍历所有解锁项，检查玩家是否已解锁
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

```javascript
// 来源 modules/base-standard/ui/unlocks/unlocks-manager.js
// 获取解锁进度
const progressStatus = Game.Unlocks.getProgressForPlayer(unlockType, GameContext.localPlayerID);
```

<API id="Game.Unlocks.isUnlockedForPlayer"><h3>Game.Unlocks.isUnlockedForPlayer(unlockType, playerId)</h3>

**说明**: 检查指定玩家是否已解锁某个解锁类型。解锁类型可以是 `$hash` 数值或 `UnlockType` 字符串。

| 参数名 | 类型 | 说明 |
|------|------|------|
| unlockType | `number` \| `string` | 解锁类型（`$hash` 或 `UnlockType` 字符串） |
| playerId | `number` | 玩家 ID |

**返回值**: `boolean`

**使用示例**:

```javascript
// 来源 TunerPanels/Unlocks.ltp
// 检查玩家是否已解锁
const met = Game.Unlocks.isUnlockedForPlayer(u.UnlockType, playerId);
```

</API>
<API id="Game.Unlocks.getProgressForPlayer"><h3>Game.Unlocks.getProgressForPlayer(unlockType, playerId)</h3>

**说明**: 获取玩家在某个解锁类型上的进度状态，返回包含进度信息的对象。

| 参数名 | 类型 | 说明 |
|------|------|------|
| unlockType | `number` \| `string` | 解锁类型（`$hash` 或 `UnlockType` 字符串） |
| playerId | `number` | 玩家 ID |

**返回值**: `object`

**使用示例**:

```javascript
// 来源 modules/core/ui-next/screens/unlocks/civ-unlocks-model.js
// 获取解锁进度
const progressStatus = Game.Unlocks.getProgressForPlayer(unlockType, GameContext.localPlayerID);
```

</API>
<API id="Game.Unlocks.setForceUnlockedForPlayer"><h3>Game.Unlocks.setForceUnlockedForPlayer(unlockId, playerId, forced)</h3>

**说明**: 强制解锁（或锁定）指定玩家的某个解锁项。通常用于调试。

| 参数名 | 类型 | 说明 |
|------|------|------|
| unlockId | `number` | 解锁项的 `$hash` |
| playerId | `number` | 玩家 ID |
| forced | `boolean` | `true` 表示强制解锁 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 TunerPanels/Unlocks.ltp
// 强制解锁
Game.Unlocks.setForceUnlockedForPlayer(unlock, player, true);
```

</API>
<API id="Game.Unlocks.clearForceUnlockedForPlayer"><h3>Game.Unlocks.clearForceUnlockedForPlayer(unlockId, playerId)</h3>

**说明**: 清除指定玩家的强制解锁状态。

| 参数名 | 类型 | 说明 |
|------|------|------|
| unlockId | `number` | 解锁项的 `$hash` |
| playerId | `number` | 玩家 ID |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 TunerPanels/Unlocks.ltp
// 清除强制解锁
Game.Unlocks.clearForceUnlockedForPlayer(unlock, player);
```

</API>
<API id="Game.Unlocks.getSyncreticCivUnlocksForChoice"><h3>Game.Unlocks.getSyncreticCivUnlocksForChoice(playerId, choiceType)</h3>

**说明**: 获取融合选择（Syncretic Choice）中可用的文明解锁列表。`choiceType` 使用 `SyncreticChoiceTypes` 枚举值。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerId | `number` | 玩家 ID |
| choiceType | `SyncreticChoiceTypes` | 融合选择类型，如 `SYNCRETIC_CHOICE_INFRASTRUCTURE`、`SYNCRETIC_CHOICE_UNITS`、`SYNCRETIC_CHOICE_SELF` |

**返回值**: `array`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/syncretism/syncretism-screen-model.js
// 获取建筑融合选择中的文明解锁
const syncCivs = Game.Unlocks.getSyncreticCivUnlocksForChoice(
  player.id,
  SyncreticChoiceTypes.SYNCRETIC_CHOICE_INFRASTRUCTURE
);
```

</API>
<API id="Game.Unlocks.getInfrastructureChoiceSyncreticUnlocks"><h3>Game.Unlocks.getInfrastructureChoiceSyncreticUnlocks(civType)</h3>

**说明**: 获取建筑融合选择中指定文明类型的可升级建筑/区域项目。

| 参数名 | 类型 | 说明 |
|------|------|------|
| civType | `string` | 文明类型字符串，如 `civType?.CivilizationType` |

**返回值**: `array`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/syncretism/syncretism-screen-model.js
// 获取可升级的建筑项目
const upgradableConstructibles = Game.Unlocks.getInfrastructureChoiceSyncreticUnlocks(
  civType?.CivilizationType ?? ""
);
```

</API>
<API id="Game.Unlocks.getUnitChoiceSyncreticUnlocks"><h3>Game.Unlocks.getUnitChoiceSyncreticUnlocks(civType)</h3>

**说明**: 获取单位融合选择中指定文明类型的可升级单位项目。

| 参数名 | 类型 | 说明 |
|------|------|------|
| civType | `string` | 文明类型字符串 |

**返回值**: `array`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/syncretism/syncretism-screen-model.js
// 获取可升级的单位项目
const upgradableUnits = Game.Unlocks.getUnitChoiceSyncreticUnlocks(
  civType?.CivilizationType ?? ""
);
```

</API>
<API id="Game.Unlocks.getSelfChoiceSyncreticUnlocks"><h3>Game.Unlocks.getSelfChoiceSyncreticUnlocks(civType)</h3>

**说明**: 获取自身融合选择中指定文明类型的可解锁项目。

| 参数名 | 类型 | 说明 |
|------|------|------|
| civType | `string` | 文明类型字符串 |

**返回值**: `array`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/syncretism/syncretism-screen-model.js
// 获取可解锁的项目
const unlockables = Game.Unlocks.getSelfChoiceSyncreticUnlocks(
  civType?.CivilizationType ?? ""
);
```

</API>