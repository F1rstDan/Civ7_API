---
title: API 调用统计
doc_type: reference
summary: 文明7游戏源码中各全局工具对象和方法的静态分析调用频率统计，仅供开发参考。
primary_scope:
  - api-stats
related_scope:
  - Locale
  - GameContext
  - Database
  - InterfaceMode
  - Game
  - ComponentID
  - UI.Player
source:
  - modules/base-standard/scripts/
  - modules/base-standard/ui/
  - modules/core/ui/
  - TunerPanels/
doc_update: 2026-06-05
---

# API Stats API 调用统计

基于文明7游戏源码（modules/ + TunerPanels/）的静态分析，反映各全局工具对象和方法在源码中的相对使用频率。仅供开发参考，不代表 API 重要性排序。

```javascript
// 来源 TunerPanels/Notifications.ltp
// 典型用法：Locale.compose 翻译游戏内文本，GameContext.localPlayerID 获取本地玩家
const player = Players.get(GameContext.localPlayerID);
const playerName = Locale.compose(player.civilizationFullName);
if (playerName && playerName.length > 0) {
    console.log(playerName);
}

// 来源 modules/base-standard/ui/diplomacy/diplomacy-manager.js
// InterfaceMode.isInInterfaceMode 检查当前界面模式
const isAlreadyInDialog = InterfaceMode.isInInterfaceMode("INTERFACEMODE_DIPLOMACY_DIALOG");

// 来源 TunerPanels/Random Events.ltp
// Database.makeHash 将字符串转为哈希值
const volcanoType = {
    collection: Database.makeHash(GameInfo.NamedVolcanoes.tableName)
};
```

## 全局工具对象一览

| 对象 | 最常用方法 | 调用次数 | 说明 |
|------|-----------|---------|------|
| `Locale` | `compose` | 1581 | 本地化文本翻译 |
| `GameContext` | `localPlayerID` | 1054 | 本地玩家 ID |
| `Locale` | `Stylize` | 392 | 文本样式处理 |
| `Game` | `PlayerOperations` | 168 | 玩家操作接口 |
| `Game` | `Diplomacy` | 136 | 外交子系统 |
| `Game` | `Notifications` | 133 | 通知子系统 |
| `Database` | `makeHash` | 118 | 字符串转哈希 |
| `Game` | `age` | 116 | 当前时代 |
| `ComponentID` | `toLogString` | 111 | ID 转日志字符串 |
| `InterfaceMode` | `isInInterfaceMode` | 109 | 检查界面模式 |

## Locale 方法调用统计

| 方法 | 调用次数 |
|------|---------|
| `compose` | 1581 |
| `Stylize` | 392 |
| `compare` | 27 |
| `toNumber` | 26 |
| `keyExists` | 19 |
| `plainText` | 18 |

## GameContext 属性调用统计

| 属性 | 调用次数 |
|------|---------|
| `localPlayerID` | 1054 |
| `localObserverID` | 97 |

## Database 方法调用统计

| 方法 | 调用次数 |
|------|---------|
| `makeHash` | 118 |
| `query` | 57 |

## InterfaceMode 方法调用统计

| 方法 | 调用次数 |
|------|---------|
| `isInInterfaceMode` | 109 |
| `switchTo` | 77 |
| `addHandler` | 56 |
| `switchToDefault` | 54 |
| `getCurrent` | 44 |

## Game 属性/方法调用统计

| 属性/方法 | 调用次数 |
|-----------|---------|
| `PlayerOperations` | 168 |
| `Diplomacy` | 136 |
| `Notifications` | 133 |
| `age` | 116 |
| `AgeProgressManager` | 81 |
| `CityOperations` | 52 |
| `UnitOperations` | 52 |
| `turn` | 51 |
| `UnitCommands` | 42 |
| `ProgressionTrees` | 34 |
| `IndependentPowers` | 32 |
| `getHash` | 32 |

## ComponentID 方法调用统计

| 方法 | 调用次数 |
|------|---------|
| `toLogString` | 111 |
| `isMatch` | 85 |
| `isValid` | 67 |
| `toBitfield` | 38 |
| `getInvalidID` | 33 |
| `isInvalid` | 32 |

## UI.Player 方法调用统计

| 方法 | 调用次数 |
|------|---------|
| `getHeadSelectedCity` | 60 |
| `getHeadSelectedUnit` | 44 |
| `getPrimaryColorValueAsString` | 33 |
| `getPrimaryColorValueAsHex` | 18 |
| `lookAtID` | 14 |
| `selectCity` | 14 |
| `selectUnit` | 10 |
| `deselectAllUnits` | 8 |
| `deselectAllCities` | 4 |
| `selectNextReadyUnit` | 4 |