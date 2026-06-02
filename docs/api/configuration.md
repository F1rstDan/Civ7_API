---
title: Configuration API
---

# Configuration

游戏配置访问的全局对象。分为三个子配置：Game（游戏规则设置）、User（用户偏好设置）、Player（玩家槽位配置）。从不通过 import 引入，引擎直接注入。

```javascript
// 判断是否为多人游戏
const gameConfig = Configuration.getGame();
if (gameConfig.isAnyMultiplayer) {
  console.log('多人游戏模式');
}

// 检查教程等级
const tutorialLevel = Configuration.getUser().tutorialLevel;

// 获取玩家领袖名称
const playerConfig = Configuration.getPlayer(GameContext.localPlayerID);
const leaderName = playerConfig.leaderName;
```

## 方法列表（共 9 个）

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `getGame` | — | `GameConfiguration` | 获取游戏配置对象（游戏规则、模式设置） |
| `getUser` | — | `UserConfiguration` | 获取用户偏好配置（UI 设置、教程等级等） |
| `getPlayer` | playerID | `PlayerConfiguration` | 获取玩家槽位配置（领袖、文明名称等） |
| `getGameValue` | key | `any` | 获取游戏配置值（getGame().getValue 便捷方法） |
| `getMap` | — | `MapConfiguration` | 获取地图配置对象 |
| `getMapValue` | key | `any` | 获取地图配置值 |
| `editGame` | key, value | `void` | 编辑游戏配置 |
| `editMap` | key, value | `void` | 编辑地图配置 |
| `editPlayer` | playerID, key, value | `void` | 编辑玩家槽位配置 |

## GameConfiguration 常用属性

`Configuration.getGame()` 返回的对象常用属性：

| 属性 | 类型 | 说明 |
|------|------|------|
| `isAnyMultiplayer` | `bool` | 是否为任何多人模式 |
| `isNetworkMultiplayer` | `bool` | 是否为网络多人 |
| `isHotseat` | `bool` | 是否为热座模式 |
| `isNoTeams` | `bool` | 是否无队伍 |
| `isNoCivilizationUnlocks` | `bool` | 是否禁用文明解锁 |
| `previousAgeCount` | `int` | 已游玩的时代数量 |
| `campaignStartAgeType` | `int` | 战役起始时代类型哈希 |
| `skipStartButton` | `bool` | 是否跳过开始按钮 |
| `getValue(key)` | `method` | 读取自定义游戏设置 |

## UserConfiguration 常用属性

`Configuration.getUser()` 返回的对象常用属性：

| 属性 | 类型 | 说明 |
|------|------|------|
| `tutorialLevel` | `TutorialLevel` | 教程等级枚举 |
| `edgePan` | `bool` | 边缘平移开关 |
| `cameraPanningSpeed` | `number` | 相机平移速度 |
| `isAutoUnitCycle` | `bool` | 自动切换单位 |
| `isProductionPanelStayOpen` | `bool` | 生产面板保持打开 |
| `plotTooltipDelay` | `number` | 地块提示延迟（毫秒） |
| `textToSpeechOnHover` | `bool` | 悬停 TTS 开关 |
| `debugUILowLevelLogging` | `number` | UI 调试日志级别 |

## 详细说明

### `getGame()`

返回一个 GameConfiguration 对象，包含大量布尔和数值属性用于判断游戏模式。还支持 `getValue(key)` 方法读取自定义游戏设置。

```javascript
// 读取自定义游戏设置
const noCivUnlocks = Configuration.getGame().getValue('NoCivilizationUnlocks');
if (noCivUnlocks === true) {
  // 跳过文明解锁逻辑
}

// 获取已游玩时代数
const ageCount = Configuration.getGame().previousAgeCount;
if (ageCount == 0) {
  // 首次游戏
}
```

### `getUser()`

返回一个 UserConfiguration 对象，包含 UI 设置、教程等级、相机偏好等玩家个人设置。

```javascript
// 检查教程等级
if (Configuration.getUser().tutorialLevel == TutorialLevel.TutorialOn) {
  // 启用教程逻辑
}

// 读取相机平移速度
const panSpeed = Configuration.getUser().cameraPanningSpeed * panModifier;
```

### `getPlayer(playerID)`

返回一个 PlayerConfiguration 对象，包含 `leaderName`、`slotName`、`hostIconStr` 等属性。不同于 `Players.get()` 返回的游戏内玩家数据，这里是玩家加入游戏时的配置信息。

```javascript
const playerConfig = Configuration.getPlayer(defeatedPlayer);
if (playerConfig) {
  const leaderName = playerConfig.leaderName ?? 'Unknown';
}
```

## 源文件引用

- `modules/base-standard/ui/tutorial/tutorial-manager.js` — 教程系统中的 Configuration 使用
- `modules/core/ui-next/screens/unlocks/civ-unlocks-model.js` — 文明解锁配置读取
- `modules/age-exploration/ui/tutorial/tutorial-items-exploration.js` — 探索时代教程配置读取
- `modules/base-standard/ui/unlocks/panel-player-rewards.js` — 玩家奖励面板配置读取