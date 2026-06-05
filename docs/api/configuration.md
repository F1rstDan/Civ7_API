---
title: Configuration 配置
doc_type: object-api
summary: 游戏配置访问的全局对象，分为 Game、User、Player 三个子配置，支持读取和编辑游戏设置。
primary_scope:
  - Configuration
related_scope:
  - GameContext
source:
  - modules/base-standard/ui/tutorial/tutorial-manager.js
  - modules/core/ui-next/screens/unlocks/civ-unlocks-model.js
  - modules/age-exploration/ui/tutorial/tutorial-items-exploration.js
  - modules/base-standard/ui/unlocks/panel-player-rewards.js
---

# Configuration 配置

游戏配置访问的全局对象。分为三个子配置：Game（游戏规则设置）、User（用户偏好设置）、Player（玩家槽位配置）。从不通过 import 引入，引擎直接注入。

```javascript
// 来源 TunerPanels/Configuration.ltp
// 判断多人游戏模式、检查教程等级、获取领袖名称
const gameConfig = Configuration.getGame();
if (gameConfig.isAnyMultiplayer) {
  console.log('多人游戏模式');
}
const tutorialLevel = Configuration.getUser().tutorialLevel;
const playerConfig = Configuration.getPlayer(GameContext.localPlayerID);
const leaderName = playerConfig.leaderName;
```

## 方法列表（共 9 个）

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Configuration.getGame</API> | — | `GameConfiguration` | 获取游戏配置对象（游戏规则、模式设置） |
| <API>Configuration.getUser</API> | — | `UserConfiguration` | 获取用户偏好配置（UI 设置、教程等级等） |
| <API>Configuration.getPlayer</API> | playerID | `PlayerConfiguration` | 获取玩家槽位配置（领袖、文明名称等） |
| <API>Configuration.getGameValue</API> | key | `any` | 获取游戏配置值（getGame().getValue 便捷方法） |
| <API>Configuration.getMap</API> | — | `MapConfiguration` | 获取地图配置对象 |
| <API>Configuration.getMapValue</API> | key | `any` | 获取地图配置值 |
| <API>Configuration.editGame</API> | key, value | `void` | 编辑游戏配置 |
| <API>Configuration.editMap</API> | key, value | `void` | 编辑地图配置 |
| <API>Configuration.editPlayer</API> | playerID, key, value | `void` | 编辑玩家槽位配置 |

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
// 来源 TunerPanels/Configuration.ltp
// 读取自定义游戏设置和已游玩时代数
const noCivUnlocks = Configuration.getGame().getValue('NoCivilizationUnlocks');
if (noCivUnlocks === true) {
  // 跳过文明解锁逻辑
}
const ageCount = Configuration.getGame().previousAgeCount;
if (ageCount == 0) {
  // 首次游戏
}
```

### `getUser()`

返回一个 UserConfiguration 对象，包含 UI 设置、教程等级、相机偏好等玩家个人设置。

```javascript
// 来源 TunerPanels/Configuration.ltp
// 检查教程等级和相机平移速度
if (Configuration.getUser().tutorialLevel == TutorialLevel.TutorialOn) {
  // 启用教程逻辑
}
const panSpeed = Configuration.getUser().cameraPanningSpeed * panModifier;
```

### `getPlayer(playerID)`

返回一个 PlayerConfiguration 对象，包含 `leaderName`、`slotName`、`hostIconStr` 等属性。不同于 `Players.get()` 返回的游戏内玩家数据，这里是玩家加入游戏时的配置信息。

```javascript
// 来源 TunerPanels/Configuration.ltp
// 获取被击败玩家的领袖名称
const playerConfig = Configuration.getPlayer(defeatedPlayer);
if (playerConfig) {
  const leaderName = playerConfig.leaderName ?? 'Unknown';
}
```

### Configuration.getGame() 补充

```javascript
// 来源 TunerPanels/Configuration.ltp
// 游戏配置高级操作
const gameConfig = Configuration.getGame();
gameConfig.possibleParticipatingPlayerIDs;
gameConfig.maxPlayers;
gameConfig.setNarrativeSiftingAmount(amount);
gameConfig.setNarrativeSiftingType();
gameConfig.turnOffDiscoveries();
```

### Configuration.getMap() 补充

```javascript
// 来源 TunerPanels/Configuration.ltp
// 地图配置与自然奇观请求
const mapConfig = Configuration.getMap();
mapConfig.mapSizeTypeName;
mapConfig.getValue("RequestedNaturalWonders");
Configuration.editMap().setValue("RequestedNaturalWonders", activeRequests);
```

### Configuration.getPlayer() 补充

```javascript
// 来源 TunerPanels/Configuration.ltp
// 玩家槽位配置详细信息
const playerConfig = Configuration.getPlayer(playerIndex);
playerConfig.leaderTypeName;
playerConfig.civilizationTypeName;
playerConfig.slotStatus;       // SlotStatus.SS_OPEN/SS_CLOSED/SS_COMPUTER/SS_TAKEN/SS_OBSERVER
playerConfig.isAlive;
playerConfig.startingPosition; // {x, y}
playerConfig.team;
```

### GameSetup API

```javascript
// 来源 TunerPanels/Configuration.ltp
// 游戏设置中的玩家参数读写
GameSetup.findPlayerParameter(player, "PlayerCivilization");
GameSetup.findPlayerParameter(player, "PlayerLeader");
GameSetup.setPlayerParameterValue(player, "PlayerCivilization", value);
```

## 常用枚举

| 枚举 | 说明 |
|------|------|
| `SlotStatus.SS_OPEN` | 开放槽位 |
| `SlotStatus.SS_CLOSED` | 关闭槽位 |
| `SlotStatus.SS_COMPUTER` | AI 控制 |
| `SlotStatus.SS_TAKEN` | 已被占用 |
| `SlotStatus.SS_OBSERVER` | 观察者 |

---

<!-- 
  以下 <API> 内容块为各方法的弹窗说明。
-->

<API id="Configuration.getGame"><h3>Configuration.getGame()</h3>

**说明**: 获取游戏配置对象（GameConfiguration），包含游戏规则、模式设置等大量布尔和数值属性。支持 `getValue(key)` 读取自定义设置。

**参数**: 无

**返回值**: `GameConfiguration`

**使用示例**:

```javascript
// 来源 TunerPanels/Configuration.ltp
// 获取游戏配置并检查多人模式
const gameConfig = Configuration.getGame();
if (gameConfig.isAnyMultiplayer) {
  console.log('多人游戏模式');
}
```

</API>

<API id="Configuration.getUser"><h3>Configuration.getUser()</h3>

**说明**: 获取用户偏好配置对象（UserConfiguration），包含 UI 设置、教程等级、相机偏好等玩家个人设置。

**参数**: 无

**返回值**: `UserConfiguration`

**使用示例**:

```javascript
// 来源 TunerPanels/Configuration.ltp
// 检查教程等级
if (Configuration.getUser().tutorialLevel == TutorialLevel.TutorialOn) {
  // 启用教程逻辑
}
```

</API>

<API id="Configuration.getPlayer"><h3>Configuration.getPlayer(playerID)</h3>

**说明**: 获取玩家槽位配置对象（PlayerConfiguration），包含领袖名、文明名、槽位状态等。不同于 `Players.get()` 返回的游戏内玩家数据，这是玩家加入游戏时的配置信息。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 玩家 ID |

**返回值**: `PlayerConfiguration`

**使用示例**:

```javascript
// 来源 TunerPanels/Configuration.ltp
// 获取玩家槽位配置
const playerConfig = Configuration.getPlayer(playerIndex);
const leaderName = playerConfig.leaderName;
const civName = playerConfig.civilizationTypeName;
const slotStatus = playerConfig.slotStatus;
```

</API>

<API id="Configuration.getGameValue"><h3>Configuration.getGameValue(key)</h3>

**说明**: `getGame().getValue(key)` 的便捷方法，直接读取游戏配置值。

| 参数名 | 类型 | 说明 |
|------|------|------|
| key | `string` | 配置键名 |

**返回值**: `any`

</API>

<API id="Configuration.getMap"><h3>Configuration.getMap()</h3>

**说明**: 获取地图配置对象（MapConfiguration），包含地图尺寸、自然奇观等设置。

**参数**: 无

**返回值**: `MapConfiguration`

**使用示例**:

```javascript
// 来源 TunerPanels/Configuration.ltp
// 获取地图配置
const mapConfig = Configuration.getMap();
const sizeName = mapConfig.mapSizeTypeName;
const wonders = mapConfig.getValue("RequestedNaturalWonders");
```

</API>

<API id="Configuration.getMapValue"><h3>Configuration.getMapValue(key)</h3>

**说明**: `getMap().getValue(key)` 的便捷方法，直接读取地图配置值。

| 参数名 | 类型 | 说明 |
|------|------|------|
| key | `string` | 配置键名 |

**返回值**: `any`

</API>

<API id="Configuration.editGame"><h3>Configuration.editGame(key, value)</h3>

**说明**: 编辑游戏配置中的指定键值。

| 参数名 | 类型 | 说明 |
|------|------|------|
| key | `string` | 配置键名 |
| value | `any` | 新值 |

**返回值**: `void`

</API>

<API id="Configuration.editMap"><h3>Configuration.editMap(key, value)</h3>

**说明**: 编辑地图配置中的指定键值。

| 参数名 | 类型 | 说明 |
|------|------|------|
| key | `string` | 配置键名 |
| value | `any` | 新值 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 TunerPanels/Configuration.ltp
// 编辑地图自然奇观请求
let activeRequests = Configuration.getMap().getValue("RequestedNaturalWonders");
Configuration.editMap().setValue("RequestedNaturalWonders", activeRequests);
```

</API>

<API id="Configuration.editPlayer"><h3>Configuration.editPlayer(playerID, key, value)</h3>

**说明**: 编辑指定玩家槽位配置中的键值。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 玩家 ID |
| key | `string` | 配置键名 |
| value | `any` | 新值 |

**返回值**: `void`

</API>