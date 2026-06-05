---
title: Legacies 传承系统
doc_type: system
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
  - TunerPanels/VictoriesDefeats.ltp
  - modules/base-standard/ui-next/screens/legacies/legacies-model.js
  - modules/base-standard/ui/endgame/screen-endgame.js
  - modules/base-standard/ui/victory-manager/victory-manager.js
  - modules/base-standard/ui/age-rankings/panel-age-rankings.js
doc_update: 2026-06-05
---

# Legacies 传承系统

文明7的传承系统包括 `player.Legacies`（传承触发和进度）和 `player.LegacyPaths`（传承路径和奖励）。

## 快速示例

```javascript
// 来源 TunerPanels/Legacies.ltp
// 遍历所有传承并查询触发状态和进度
const playerLegacies = player.Legacies;
for (const legacy of GameInfo.Legacies) {
  if (playerLegacies.isValidLegacy(legacy.LegacyType)) {
    let triggered = playerLegacies.isTriggered(legacy.LegacyType);
    let state = playerLegacies.getProgress(legacy.LegacyType);
    // state.progress[0].current / state.progress[0].total
  }
}
```

## 方法列表

### player.Legacies

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>player.Legacies.isTriggered</API> | legacyType | `boolean` | 检查传承是否已触发 |
| <API>player.Legacies.isValidLegacy</API> | legacyType | `boolean` | 检查传承在当前对局是否有效 |
| <API>player.Legacies.getProgress</API> | legacyType | `{progress: [{current, total}], raceWinner}` | 获取传承进度 |
| <API>player.Legacies.setForceTriggered</API> | legacyType, bFlag, bFlag2 | `void` | 强制触发传承（调试用） |
| <API>player.Legacies.clearForceTriggered</API> | legacyType, bFlag, bFlag2 | `void` | 清除强制触发状态（调试用） |

### player.LegacyPaths

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>player.LegacyPaths.hasReward</API> | hash | `boolean` | 检查是否拥有某个时代进度奖励 |
| <API>player.LegacyPaths.grantReward</API> | hash | `void` | 授予时代进度奖励（调试用） |
| <API>player.LegacyPaths.addLegacyPathEvent</API> | legacyPathId, amount | `void` | 添加传承路径事件积分 |
| <API>player.LegacyPaths.getEnabledLegacyPaths</API> | — | `[{legacyPath, ...}]` | 获取当前启用的传承路径列表 |
| <API>player.LegacyPaths.getCompletedLegacyPaths</API> | — | `[hash, ...]` | 获取已完成的传承路径 hash 列表 |
| <API>player.LegacyPaths.getScore</API> | legacyPathType | `number` | 获取某传承路径类型的当前得分 |

## 子对象/子系统

### player.Legacies 子系统

```javascript
// 来源 TunerPanels/Legacies.ltp
// 获取玩家传承对象并查询基本状态
const playerLegacies = player.Legacies;

playerLegacies.isTriggered(legacyType);                    // 是否已触发
playerLegacies.isValidLegacy(legacyType);                  // 是否有效
playerLegacies.getProgress(legacyType);                    // 获取进度
playerLegacies.setForceTriggered(legacyType, true, true);  // 强制触发
playerLegacies.clearForceTriggered(legacyType, true, true); // 清除强制触发
```

### player.LegacyPaths 子系统

```javascript
// 来源 TunerPanels/Player Legacy Path.ltp
// 传承路径奖励查询与授予
const playerLegacyPaths = player.LegacyPaths;

playerLegacyPaths.hasReward(hash);           // 是否拥有奖励
playerLegacyPaths.grantReward(hash);         // 授予奖励
```

```javascript
// 来源 TunerPanels/VictoriesDefeats.ltp
// 添加传承路径事件积分
p.LegacyPaths.addLegacyPathEvent(legacyPathId, 2);
```

```javascript
// 来源 modules/base-standard/ui/age-rankings/panel-age-rankings.js
// 获取当前启用的传承路径
const enabledLegacyPaths = Players.get(GameContext.localPlayerID)?.LegacyPaths?.getEnabledLegacyPaths();
```

```javascript
// 来源 modules/base-standard/ui/endgame/screen-endgame.js
// 获取已完成的传承路径
const playerCompletedLegacyPaths = player.LegacyPaths?.getCompletedLegacyPaths();
for (const path of playerCompletedLegacyPaths) {
  const legacyPath = GameInfo.LegacyPaths.lookup(path);
}
```

```javascript
// 来源 modules/base-standard/ui/victory-manager/victory-manager.js
// 获取传承路径得分
const score = player.LegacyPaths?.getScore(d.LegacyPathType) ?? 0;
```

## GameInfo 关联表

```javascript
// 来源 源码 GameInfo 关联
GameInfo.Legacies;              // 传承定义表
GameInfo.LegacyPaths;           // 传承路径表
GameInfo.AgeProgressionRewards; // 时代进度奖励表
```

```javascript
// 来源 modules/base-standard/ui-endgame/screen-endgame.js
// 通过 hash 查找传承路径定义
const legacyPath = GameInfo.LegacyPaths.lookup(path);
```

```javascript
// 来源 TunerPanels/Legacies.ltp
// 遍历所有传承定义并查询玩家状态
for (const legacy of GameInfo.Legacies) {
  const triggered = playerLegacies.isTriggered(legacy.LegacyType);
  const valid = playerLegacies.isValidLegacy(legacy.LegacyType);
}
```

<API id="player.Legacies.isTriggered"><h3>player.Legacies.isTriggered(legacyType)</h3>

**说明**: 检查指定传承是否已被触发（完成）。

| 参数名 | 类型 | 说明 |
|------|------|------|
| legacyType | `string` | 传承类型标识符 |

**返回值**: `boolean` — 已触发返回 `true`。

**使用示例**:

```javascript
// 来源 TunerPanels/Legacies.ltp
// 检查传承是否已触发
const playerLegacies = player.Legacies;
const triggered = playerLegacies.isTriggered(legacy.LegacyType);
```

</API>

<API id="player.Legacies.isValidLegacy"><h3>player.Legacies.isValidLegacy(legacyType)</h3>

**说明**: 检查指定传承在当前对局中是否有效（如是否满足时代条件）。

| 参数名 | 类型 | 说明 |
|------|------|------|
| legacyType | `string` | 传承类型标识符 |

**返回值**: `boolean` — 有效返回 `true`。

**使用示例**:

```javascript
// 来源 TunerPanels/Legacies.ltp
// 检查传承是否有效
const playerLegacies = player.Legacies;
const valid = playerLegacies.isValidLegacy(legacy.LegacyType);
```

</API>

<API id="player.Legacies.getProgress"><h3>player.Legacies.getProgress(legacyType)</h3>

**说明**: 获取指定传承的当前进度，返回包含进度数组和竞赛获胜者信息。

| 参数名 | 类型 | 说明 |
|------|------|------|
| legacyType | `string` | 传承类型标识符 |

**返回值**: `{progress: [{current, total}], raceWinner}` — `progress` 为进度数组，`raceWinner` 为竞赛获胜者玩家 ID（`-1` 表示无）。

**使用示例**:

```javascript
// 来源 TunerPanels/Legacies.ltp
// 获取传承进度
const legacyState = playerLegacies.getProgress(legacy.LegacyType);
if (legacyState) {
  const current = legacyState.progress[0].current;
  const total = legacyState.progress[0].total;
  const winner = legacyState.raceWinner;
}
```

</API>

<API id="player.Legacies.setForceTriggered"><h3>player.Legacies.setForceTriggered(legacyType, bFlag, bFlag2)</h3>

**说明**: 强制触发指定传承（调试面板专用）。

| 参数名 | 类型 | 说明 |
|------|------|------|
| legacyType | `string` | 传承类型标识符 |
| bFlag | `boolean` | 强制触发标志 |
| bFlag2 | `boolean` | 附加标志 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 TunerPanels/Legacies.ltp
// 强制触发传承
playerLegacies.setForceTriggered(legacySelected, true, true);
```

</API>

<API id="player.Legacies.clearForceTriggered"><h3>player.Legacies.clearForceTriggered(legacyType, bFlag, bFlag2)</h3>

**说明**: 清除指定传承的强制触发状态（调试面板专用）。

| 参数名 | 类型 | 说明 |
|------|------|------|
| legacyType | `string` | 传承类型标识符 |
| bFlag | `boolean` | 清除标志 |
| bFlag2 | `boolean` | 附加标志 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 TunerPanels/Legacies.ltp
// 清除强制触发状态
playerLegacies.clearForceTriggered(legacySelected, true, true);
```

</API>

<API id="player.LegacyPaths.hasReward"><h3>player.LegacyPaths.hasReward(hash)</h3>

**说明**: 检查玩家是否已拥有指定的时代进度奖励。

| 参数名 | 类型 | 说明 |
|------|------|------|
| hash | `number` | 奖励的 hash 值（通常来自 `GameInfo.AgeProgressionRewards` 的 `$hash`） |

**返回值**: `boolean` — 已拥有返回 `true`。

**使用示例**:

```javascript
// 来源 TunerPanels/Player Legacy Path.ltp
// 检查玩家是否拥有奖励
const playerLegacyPaths = player.LegacyPaths;
const hasReward = playerLegacyPaths.hasReward(reward.$hash);
```

</API>

<API id="player.LegacyPaths.grantReward"><h3>player.LegacyPaths.grantReward(hash)</h3>

**说明**: 授予玩家指定的时代进度奖励（调试面板专用）。

| 参数名 | 类型 | 说明 |
|------|------|------|
| hash | `number` | 奖励的 hash 值 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 TunerPanels/Player Legacy Path.ltp
// 授予奖励
playerLegacyPaths.grantReward(selectedReward);
```

</API>

<API id="player.LegacyPaths.addLegacyPathEvent"><h3>player.LegacyPaths.addLegacyPathEvent(legacyPathId, amount)</h3>

**说明**: 向指定传承路径添加事件积分，推进传承进度。

| 参数名 | 类型 | 说明 |
|------|------|------|
| legacyPathId | `number` | 传承路径 ID |
| amount | `number` | 添加的积分数量 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 TunerPanels/VictoriesDefeats.ltp
// 添加传承路径事件积分
p.LegacyPaths.addLegacyPathEvent(tunerOptions.selectedLegacyPath, 2);
```

</API>

<API id="player.LegacyPaths.getEnabledLegacyPaths"><h3>player.LegacyPaths.getEnabledLegacyPaths()</h3>

**说明**: 获取当前玩家已启用的传承路径列表。

**参数**: 无

**返回值**: `[{legacyPath, ...}]` — 启用路径的数组，每个元素包含 `legacyPath` 字段（hash 值）。

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/age-rankings/panel-age-rankings.js
// 获取启用的传承路径
const enabledLegacyPaths = Players.get(GameContext.localPlayerID)?.LegacyPaths?.getEnabledLegacyPaths();
const legacyPath = enabledLegacyPaths?.find(lPath => lPath.legacyPath == targetHash);
```

</API>

<API id="player.LegacyPaths.getCompletedLegacyPaths"><h3>player.LegacyPaths.getCompletedLegacyPaths()</h3>

**说明**: 获取玩家已完成的传承路径 hash 列表。

**参数**: 无

**返回值**: `[hash, ...]` — 已完成传承路径的 hash 数组。

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/endgame/screen-endgame.js
// 获取已完成的传承路径
const completedLegacyPaths = player.LegacyPaths?.getCompletedLegacyPaths();
for (const path of completedLegacyPaths) {
  const legacyPath = GameInfo.LegacyPaths.lookup(path);
}
```

</API>

<API id="player.LegacyPaths.getScore"><h3>player.LegacyPaths.getScore(legacyPathType)</h3>

**说明**: 获取玩家在指定传承路径类型上的当前得分。

| 参数名 | 类型 | 说明 |
|------|------|------|
| legacyPathType | `string` | 传承路径类型标识符 |

**返回值**: `number` — 当前得分。

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/victory-manager/victory-manager.js
// 获取传承路径得分
const score = player.LegacyPaths?.getScore(d.LegacyPathType) ?? 0;
```

</API>