---
title: Victories 胜利系统
doc_type: system
summary: 胜利系统，包含全局胜利管理（Game.VictoryManager）、玩家胜利状态（player.Victories）和时代进度（Game.AgeProgressManager）。
primary_scope:
  - Game.VictoryManager
  - player.Victories
  - Game.AgeProgressManager
related_scope:
  - GameInfo.Victories
  - GameInfo.Defeats
  - GameInfo.LegacyPaths
  - player.LegacyPaths
source:
  - TunerPanels/Victories.ltp
  - TunerPanels/VictoriesDefeats.ltp
  - modules/base-standard/ui/victory-manager/victory-manager.js
  - modules/base-standard/ui-next/screens/victories/victories-screen-model.js
  - modules/base-standard/ui/age-progression-warning-popup/age-progression-warning-popup-manager.js
  - modules/base-standard/ui/legends-report/screen-legends-report.js
  - modules/base-standard/ui/endgame/screen-endgame.js
doc_update: 2026-06-05
---

# Victories 胜利系统

文明7的胜利系统由 `Game.VictoryManager`（全局胜利管理）、`player.Victories`（玩家胜利状态）和 `Game.AgeProgressManager`（时代进度管理）组成。

## 快速示例

```javascript
// 来源 TunerPanels/Victories.ltp
// 检查玩家胜利进度和支配状态
const playerVictories = player.Victories;
if (playerVictories) {
  const points = playerVictories.getPointsForVictoryType(victoryHash);
  const isDominant = playerVictories.getDominantForVictoryType(victoryHash);
  const countdown = playerVictories.getDominantCountdownForVictoryType(victoryHash);
  console.log(`胜利点数: ${points}, 支配: ${isDominant}, 倒计时: ${countdown}`);
}
```

## 方法列表

### Game.VictoryManager 全局胜利管理

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Game.VictoryManager.grantTeamVictory</API> | team, victoryType | `void` | 授予团队胜利 |
| <API>Game.VictoryManager.surrenderPlayer</API> | playerId, defeatType | `void` | 玩家投降 |
| <API>Game.VictoryManager.getDefeatEnabledPlayers</API> | — | `int[]` | 获取启用失败的玩家 ID 列表 |
| <API>Game.VictoryManager.getLatestPlayerDefeat</API> | playerId | `int` | 获取玩家最近失败类型 |
| <API>Game.VictoryManager.getConfiguration</API> | — | `{enabledVictories, enabledDefeats}` | 获取胜利配置 |
| <API>Game.VictoryManager.getVictories</API> | — | `[{victory, place, team}]` | 获取所有胜利记录 |
| <API>Game.VictoryManager.getCountdownVictoryDominanceScore</API> | victoryType | `int` | 获取支配胜利倒计时最低分数 |

### player.Victories 玩家胜利子系统

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>player.Victories.addVictoryPoints</API> | victoryHash, points | `void` | 添加胜利点数 |
| <API>player.Victories.getPointsForVictoryType</API> | victoryHash | `int` | 获取某胜利类型当前点数 |
| <API>player.Victories.getScoringForVictoryType</API> | victoryHash | `[{name, points}]` | 获取胜利计分明细 |
| <API>player.Victories.getDominantForVictoryType</API> | victoryHash | `boolean` | 检查是否处于支配状态 |
| <API>player.Victories.getDominantCountdownForVictoryType</API> | victoryHash | `int` | 获取支配倒计时剩余回合 |
| <API>player.Victories.getVictoryCountdownStatus</API> | victoryHash | `{prereqs: [{description, current, total}]}` | 获取胜利倒计时前置条件状态 |

### Game.AgeProgressManager 时代进度管理

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Game.AgeProgressManager.updateAgeProgressionPoints</API> | n | `void` | 增加时代进度点数 |
| <API>Game.AgeProgressManager.getCurrentAgeProgressionPoints</API> | — | `int` | 获取当前时代进度点数 |
| <API>Game.AgeProgressManager.getMaxAgeProgressionPoints</API> | — | `int` | 获取最大时代进度点数 |
| <API>Game.AgeProgressManager.isExtendedGame</API> | — | `boolean` | 是否为延长游戏（再来一回合） |
| <API>Game.AgeProgressManager.isAgeOver</API> | — | `boolean` | 时代是否已结束 |
| <API>Game.AgeProgressManager.isFinalAge</API> | — | `boolean` | 是否为最终时代 |
| <API>Game.AgeProgressManager.getAgeCountdownLength</API> | — | `int` | 获取时代倒计时总长度 |
| <API>Game.AgeProgressManager.ageCountdownStarted</API> | — | `boolean` | 时代倒计时是否已开始 |
| <API>Game.AgeProgressManager.isMilestoneComplete</API> | AgeProgressionMilestoneType | `boolean` | 检查里程碑是否完成 |
| <API>Game.AgeProgressManager.getMilestoneProgressionPoints</API> | AgeProgressionMilestoneType | `int` | 获取里程碑进度点数 |
| <API>Game.AgeProgressManager.canTransitionToNextAge</API> | playerId | `boolean` | 检查玩家是否可以过渡到下一时代 |

## Game.VictoryManager 详情

```javascript
// 来源 TunerPanels/VictoriesDefeats.ltp
// 授予团队胜利
Game.VictoryManager.grantTeamVictory(player.team, victoryType);

// 玩家投降
Game.VictoryManager.surrenderPlayer(player.id, defeatType);

// 获取启用失败的玩家列表
const players = Game.VictoryManager.getDefeatEnabledPlayers();
for (const id of players) {
  const defeat = Game.VictoryManager.getLatestPlayerDefeat(id);
  const strDefeat = GameInfo.Defeats.lookup(defeat)?.DefeatType ?? 'No Defeat';
}

// 获取胜利配置和记录
const enabledVictories = Game.VictoryManager.getConfiguration().enabledVictories;
const victories = Game.VictoryManager.getVictories();
// victories[i] = { victory, place, team }
```

## player.Victories 详情

```javascript
// 来源 TunerPanels/Victories.ltp
// 玩家胜利状态操作
const playerVictories = player.Victories;

// 添加胜利点数
playerVictories.addVictoryPoints(victoryHash, 500);

// 获取计分明细
const pointItems = playerVictories.getScoringForVictoryType(victoryHash);
for (const item of pointItems) {
  console.log(Locale.compose(item.name) + ":" + item.points);
}

// 获取胜利倒计时前置条件
const status = playerVictories.getVictoryCountdownStatus(victoryHash);
if (status != null) {
  for (const prereq of status.prereqs) {
    console.log(`${prereq.description}: ${prereq.current}/${prereq.total}`);
  }
}
```

## Game.AgeProgressManager 详情

```javascript
// 来源 TunerPanels/VictoriesDefeats.ltp
// 时代进度基本查询
const curProgress = Game.AgeProgressManager.getCurrentAgeProgressionPoints();
const maxProgress = Game.AgeProgressManager.getMaxAgeProgressionPoints();
const isExtended = Game.AgeProgressManager.isExtendedGame;       // 再来一回合
const isAgeOver = Game.AgeProgressManager.isAgeOver;             // 时代结束
const isFinalAge = Game.AgeProgressManager.isFinalAge;           // 最终时代
```

```javascript
// 来源 modules/base-standard/ui/age-progression-warning-popup/age-progression-warning-popup-manager.js
// 时代倒计时相关
const ageCountdownStarted = Game.AgeProgressManager.ageCountdownStarted;
const countdownLength = Game.AgeProgressManager.getAgeCountdownLength;
```

```javascript
// 来源 modules/base-standard/ui/legends-report/screen-legends-report.js
// 检查是否可以过渡到下一时代
const canTransition = Game.AgeProgressManager.canTransitionToNextAge(GameContext.localPlayerID);
```

## 常用枚举

```javascript
// 来源 TunerPanels/Victories.ltp
// 胜利类型列表
["VICTORY_MILITARY_MODERN", "VICTORY_CULTURE_MODERN",
 "VICTORY_ECONOMIC_MODERN", "VICTORY_SCIENCE_MODERN", "VICTORY_SCORE"]
```

## GameInfo 关联表

```javascript
// 来源 TunerPanels/VictoriesDefeats.ltp
GameInfo.Victories;    // 胜利定义表，含 VictoryType、VictoryClassType 字段
GameInfo.Defeats;      // 失败定义表，含 DefeatType、Name 字段
GameInfo.LegacyPaths;  // 传承路径表，含 LegacyPathType 字段
```

<API id="Game.VictoryManager.grantTeamVictory"><h3>Game.VictoryManager.grantTeamVictory(team, victoryType)</h3>

**说明**: 授予指定团队胜利。

| 参数名 | 类型 | 说明 |
|------|------|------|
| team | `int` | 团队 ID |
| victoryType | `int` | 胜利类型 hash |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 TunerPanels/VictoriesDefeats.ltp
// 授予玩家所在团队胜利
Game.VictoryManager.grantTeamVictory(player.team, victoryType);
```

</API>

<API id="Game.VictoryManager.surrenderPlayer"><h3>Game.VictoryManager.surrenderPlayer(playerId, defeatType)</h3>

**说明**: 让指定玩家投降。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerId | `int` | 玩家 ID |
| defeatType | `int` | 失败类型 hash |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 TunerPanels/VictoriesDefeats.ltp
// 触发玩家失败
Game.VictoryManager.surrenderPlayer(player.id, defeatType);
```

</API>

<API id="Game.VictoryManager.getDefeatEnabledPlayers"><h3>Game.VictoryManager.getDefeatEnabledPlayers()</h3>

**说明**: 获取当前所有启用失败机制的玩家 ID 列表。

**参数**: 无

**返回值**: `int[]` — 玩家 ID 数组

**使用示例**:

```javascript
// 来源 TunerPanels/VictoriesDefeats.ltp
// 遍历所有启用失败的玩家
const players = Game.VictoryManager.getDefeatEnabledPlayers();
for (const id of players) {
  const defeat = Game.VictoryManager.getLatestPlayerDefeat(id);
}
```

</API>

<API id="Game.VictoryManager.getLatestPlayerDefeat"><h3>Game.VictoryManager.getLatestPlayerDefeat(playerId)</h3>

**说明**: 获取指定玩家最近一次失败的类型。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerId | `int` | 玩家 ID |

**返回值**: `int` — 失败类型 hash，可用 `GameInfo.Defeats.lookup()` 查详情

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/endgame/screen-endgame.js
// 获取本地玩家失败状态
const playerDefeat = Game.VictoryManager.getLatestPlayerDefeat(localPlayer);
```

</API>

<API id="Game.VictoryManager.getConfiguration"><h3>Game.VictoryManager.getConfiguration()</h3>

**说明**: 获取当前胜利/失败配置。

**参数**: 无

**返回值**: `{enabledVictories, enabledDefeats}` — 启用的胜利和失败类型列表

**使用示例**:

```javascript
// 来源 TunerPanels/VictoriesDefeats.ltp
// 获取启用的胜利类型
const config = Game.VictoryManager.getConfiguration();
const enabledVictories = config.enabledVictories;
const enabledDefeats = config.enabledDefeats;
```

</API>

<API id="Game.VictoryManager.getVictories"><h3>Game.VictoryManager.getVictories()</h3>

**说明**: 获取所有已记录的胜利信息。

**参数**: 无

**返回值**: `[{victory, place, team}]` — 胜利记录数组

**使用示例**:

```javascript
// 来源 TunerPanels/VictoriesDefeats.ltp
// 遍历胜利记录
const victories = Game.VictoryManager.getVictories();
const firstPlace = victories.filter(v => v.place === 1).map(v => v.team);
```

</API>

<API id="Game.VictoryManager.getCountdownVictoryDominanceScore"><h3>Game.VictoryManager.getCountdownVictoryDominanceScore(victoryType)</h3>

**说明**: 获取指定胜利类型达到支配状态所需的最低分数。

| 参数名 | 类型 | 说明 |
|------|------|------|
| victoryType | `int` | 胜利类型 hash |

**返回值**: `int` — 支配最低分数

**使用示例**:

```javascript
// 来源 TunerPanels/Victories.ltp
// 获取支配胜利所需最低分数
let minPoints = Game.VictoryManager.getCountdownVictoryDominanceScore(victoryType);
```

</API>

<API id="player.Victories.addVictoryPoints"><h3>player.Victories.addVictoryPoints(victoryHash, points)</h3>

**说明**: 为指定胜利类型添加胜利点数。

| 参数名 | 类型 | 说明 |
|------|------|------|
| victoryHash | `int` | 胜利类型 hash |
| points | `int` | 要添加的点数 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 TunerPanels/Victories.ltp
// 添加 500 胜利点数
player.Victories.addVictoryPoints(victoryHash, 500);
```

</API>

<API id="player.Victories.getPointsForVictoryType"><h3>player.Victories.getPointsForVictoryType(victoryHash)</h3>

**说明**: 获取玩家在指定胜利类型的当前点数。

| 参数名 | 类型 | 说明 |
|------|------|------|
| victoryHash | `int` | 胜利类型 hash |

**返回值**: `int` — 当前胜利点数

**使用示例**:

```javascript
// 来源 TunerPanels/Victories.ltp
// 获取当前胜利点数
const points = player.Victories.getPointsForVictoryType(victoryHash);
```

</API>

<API id="player.Victories.getScoringForVictoryType"><h3>player.Victories.getScoringForVictoryType(victoryHash)</h3>

**说明**: 获取玩家在指定胜利类型的计分项明细。

| 参数名 | 类型 | 说明 |
|------|------|------|
| victoryHash | `int` | 胜利类型 hash |

**返回值**: `[{name, points}]` — 计分项数组，每个元素含名称和点数

**使用示例**:

```javascript
// 来源 TunerPanels/Victories.ltp
// 获取计分明细并显示
const pointItems = player.Victories.getScoringForVictoryType(victoryHash);
for (const item of pointItems) {
  console.log(Locale.compose(item.name) + ";" + item.points);
}
```

</API>

<API id="player.Victories.getDominantForVictoryType"><h3>player.Victories.getDominantForVictoryType(victoryHash)</h3>

**说明**: 检查玩家在指定胜利类型是否处于支配状态。

| 参数名 | 类型 | 说明 |
|------|------|------|
| victoryHash | `int` | 胜利类型 hash |

**返回值**: `boolean` — 是否支配

**使用示例**:

```javascript
// 来源 TunerPanels/Victories.ltp
// 检查支配状态
const isDominant = player.Victories.getDominantForVictoryType(victoryHash);
```

</API>

<API id="player.Victories.getDominantCountdownForVictoryType"><h3>player.Victories.getDominantCountdownForVictoryType(victoryHash)</h3>

**说明**: 获取玩家在指定胜利类型支配状态下的倒计时剩余回合。

| 参数名 | 类型 | 说明 |
|------|------|------|
| victoryHash | `int` | 胜利类型 hash |

**返回值**: `int` — 倒计时剩余回合

**使用示例**:

```javascript
// 来源 TunerPanels/Victories.ltp
// 获取支配倒计时
const countdown = player.Victories.getDominantCountdownForVictoryType(victoryHash);
```

</API>

<API id="player.Victories.getVictoryCountdownStatus"><h3>player.Victories.getVictoryCountdownStatus(victoryHash)</h3>

**说明**: 获取指定胜利类型倒计时的前置条件完成状态。

| 参数名 | 类型 | 说明 |
|------|------|------|
| victoryHash | `int` | 胜利类型 hash |

**返回值**: `{prereqs: [{description, current, total}]}` — 前置条件状态，可能为 `null`

**使用示例**:

```javascript
// 来源 TunerPanels/Victories.ltp
// 获取倒计时前置条件进度
const status = player.Victories.getVictoryCountdownStatus(victoryHash);
if (status != null) {
  for (const prereq of status.prereqs) {
    console.log(`${prereq.description}: ${prereq.current}/${prereq.total}`);
  }
}
```

</API>

<API id="Game.AgeProgressManager.updateAgeProgressionPoints"><h3>Game.AgeProgressManager.updateAgeProgressionPoints(n)</h3>

**说明**: 增加时代进度点数（调试用）。

| 参数名 | 类型 | 说明 |
|------|------|------|
| n | `int` | 要增加的点数 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 TunerPanels/VictoriesDefeats.ltp
// 增加 1 点时代进度
Game.AgeProgressManager.updateAgeProgressionPoints(1);
```

</API>

<API id="Game.AgeProgressManager.getCurrentAgeProgressionPoints"><h3>Game.AgeProgressManager.getCurrentAgeProgressionPoints()</h3>

**说明**: 获取当前时代进度点数。

**参数**: 无

**返回值**: `int` — 当前进度点数

**使用示例**:

```javascript
// 来源 TunerPanels/VictoriesDefeats.ltp
// 获取当前时代进度
const curPoints = Game.AgeProgressManager.getCurrentAgeProgressionPoints();
const maxPoints = Game.AgeProgressManager.getMaxAgeProgressionPoints();
console.log(`时代进度: ${curPoints}/${maxPoints}`);
```

</API>

<API id="Game.AgeProgressManager.getMaxAgeProgressionPoints"><h3>Game.AgeProgressManager.getMaxAgeProgressionPoints()</h3>

**说明**: 获取当前时代最大进度点数。

**参数**: 无

**返回值**: `int` — 最大进度点数

**使用示例**:

```javascript
// 来源 modules/base-standard/ui-next/screens/victories/victories-screen-model.js
// 计算时代进度百分比
const maxPoints = Game.AgeProgressManager.getMaxAgeProgressionPoints();
const curPoints = Game.AgeProgressManager.getCurrentAgeProgressionPoints();
const percent = curPoints / maxPoints * 100;
```

</API>

<API id="Game.AgeProgressManager.isExtendedGame"><h3>Game.AgeProgressManager.isExtendedGame</h3>

**说明**: 属性。是否为延长游戏（"再来一回合"模式）。

**返回值**: `boolean`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui-next/screens/victories/victories-screen.js
// 判断是否为延长游戏模式
const isOneMoreTurn = Game.AgeProgressManager.isExtendedGame || Game.AgeProgressManager.getMaxAgeProgressionPoints() <= 0;
```

</API>

<API id="Game.AgeProgressManager.isAgeOver"><h3>Game.AgeProgressManager.isAgeOver</h3>

**说明**: 属性。当前时代是否已结束。

**返回值**: `boolean`

**使用示例**:

```javascript
// 来源 TunerPanels/VictoriesDefeats.ltp
// 检查时代是否结束
console.log(`时代结束: ${Game.AgeProgressManager.isAgeOver}`);
```

</API>

<API id="Game.AgeProgressManager.isFinalAge"><h3>Game.AgeProgressManager.isFinalAge</h3>

**说明**: 属性。当前是否为最终时代。

**返回值**: `boolean`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/victory-progress/panel-advisor-victory.js
// 在最终时代显示不同内容
if (Game.AgeProgressManager.isFinalAge) {
  // 显示最终时代专属 UI
}
```

</API>

<API id="Game.AgeProgressManager.getAgeCountdownLength"><h3>Game.AgeProgressManager.getAgeCountdownLength</h3>

**说明**: 属性。获取时代倒计时总长度。

**返回值**: `int`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/age-progression-warning-popup/age-progression-warning-popup-manager.js
// 获取倒计时长度
const countdownLength = Game.AgeProgressManager.getAgeCountdownLength;
```

</API>

<API id="Game.AgeProgressManager.ageCountdownStarted"><h3>Game.AgeProgressManager.ageCountdownStarted</h3>

**说明**: 属性。时代倒计时是否已开始。

**返回值**: `boolean`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/age-progression-warning-popup/age-progression-warning-popup-manager.js
// 检查倒计时状态
const ageCountdownStarted = Game.AgeProgressManager.ageCountdownStarted;
if (ageCountdownStarted) {
  const curProgress = Game.AgeProgressManager.getCurrentAgeProgressionPoints();
  const maxProgress = Game.AgeProgressManager.getMaxAgeProgressionPoints();
}
```

</API>

<API id="Game.AgeProgressManager.isMilestoneComplete"><h3>Game.AgeProgressManager.isMilestoneComplete(AgeProgressionMilestoneType)</h3>

**说明**: 检查指定时代进度里程碑是否已完成。

| 参数名 | 类型 | 说明 |
|------|------|------|
| AgeProgressionMilestoneType | `string` | 里程碑类型名称 |

**返回值**: `boolean`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/victory-progress/model-advisor-victory.js
// 检查里程碑完成状态
const isComplete = Game.AgeProgressManager.isMilestoneComplete(milestone.AgeProgressionMilestoneType);
```

</API>

<API id="Game.AgeProgressManager.getMilestoneProgressionPoints"><h3>Game.AgeProgressManager.getMilestoneProgressionPoints(AgeProgressionMilestoneType)</h3>

**说明**: 获取指定里程碑的进度点数。

| 参数名 | 类型 | 说明 |
|------|------|------|
| AgeProgressionMilestoneType | `string` | 里程碑类型名称 |

**返回值**: `int`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/victory-progress/model-advisor-victory.js
// 获取里程碑进度点数
const points = Game.AgeProgressManager.getMilestoneProgressionPoints(milestone.AgeProgressionMilestoneType);
```

</API>

<API id="Game.AgeProgressManager.canTransitionToNextAge"><h3>Game.AgeProgressManager.canTransitionToNextAge(playerId)</h3>

**说明**: 检查指定玩家是否可以过渡到下一时代。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerId | `int` | 玩家 ID |

**返回值**: `boolean`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/legends-report/screen-legends-report.js
// 检查是否可以过渡到下一时代
const canTransition = Game.AgeProgressManager.canTransitionToNextAge(GameContext.localPlayerID);
```

</API>