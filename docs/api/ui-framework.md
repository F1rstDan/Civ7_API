---
title: UI Framework
---

# UI Framework

UI 框架全局对象。

## UI 对象

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `sendAudioEvent` | event | `void` | 发送音频事件 |
| `getIconURL` | iconName | `string` | 获取图标 URL |
| `getViewExperience` | — | `string` | 获取视图体验类型 |
| `getIconCSS` | iconName | `string` | 获取图标 CSS |
| `isInGame` | — | `bool` | 是否在游戏中 |
| `getIcon` | iconName | `string` | 获取图标 |
| `setCursorByType` | type | `void` | 按类型设置光标 |
| `getOption` | key | `any` | 获取选项值 |
| `setOption` | key, value | `void` | 设置选项值 |
| `isInShell` | — | `bool` | 是否在主菜单 |
| `getGameLoadingState` | — | `string` | 获取游戏加载状态 |
| `lockCursor` | locked | `void` | 锁定/解锁光标 |
| `isMultiplayer` | — | `bool` | 是否为多人游戏 |
| `reloadUI` | — | `void` | 重新加载 UI |
| `randomInt` | min, max | `int` | 生成随机整数 |
| `notifyUIReady` | — | `void` | 通知 UI 已就绪 |

## Databind

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `attribute` | name, value | `void` | 绑定属性 |
| `classToggle` | className, condition | `void` | 切换 CSS 类 |
| `if` | condition, template | `void` | 条件渲染 |
| `for` | items, template | `void` | 列表渲染 |
| `locText` | key | `void` | 绑定本地化文本 |
| `tooltip` | key | `void` | 绑定工具提示 |
| `value` | getter, setter | `void` | 绑定值 |

## NavTray

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `clear` | — | `void` | 清除导航栏 |
| `addOrUpdateGenericBack` | callback | `void` | 添加/更新返回按钮 |
| `addOrUpdateShellAction1` | label, callback | `void` | 添加/更新操作按钮 1 |
| `addOrUpdateAccept` | label, callback | `void` | 添加/更新接受按钮 |
| `addOrUpdateCancel` | label, callback | `void` | 添加/更新取消按钮 |

## DialogBoxManager

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `createDialog_Confirm` | options | `void` | 创建确认对话框 |
| `createDialog_ConfirmCancel` | options | `void` | 创建确认/取消对话框 |
| `createDialog_MultiOption` | options | `void` | 创建多选项对话框 |
| `closeDialogBox` | id | `void` | 关闭对话框 |
| `clear` | — | `void` | 清除所有对话框 |

## WorldUI

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `createModelGroup` | name | `object` | 创建模型组 |
| `createFixedMarker` | options | `object` | 创建固定标记 |
| `getPlotLocation` | location | `object` | 获取地块 3D 位置 |
| `triggerVFXAtPlot` | location, vfx | `void` | 在地块触发特效 |
| `setUnitVisibility` | unitID, visible | `void` | 设置单位可见性 |
| `releaseMarker` | marker | `void` | 释放标记 |

## Icon

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `getLeaderPortraitIcon` | leaderType | `string` | 获取领袖头像图标 |
| `getCivSymbolFromCivilizationType` | civType | `string` | 获取文明符号 |
| `getIconFromActionName` | actionName | `string` | 从动作名获取图标 |
| `getNotificationIconFromID` | notifID | `string` | 从通知 ID 获取图标 |
| `getUnitIconFromDefinition` | unitDef | `string` | 从单位定义获取图标 |
| `getYieldIcon` | yieldType | `string` | 获取产出图标 |
| `getVictoryIcon` | victoryType | `string` | 获取胜利图标 |

## Layout & CSS

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `pixelsToScreenPixels` | px | `float` | 像素转屏幕像素 |
| `pixels` | px | `float` | 像素值转换 |
| `isCompact` | — | `bool` | 是否为紧凑布局 |
| `px` | value | `string` | 值转 px 字符串 |
| `percent` | value | `string` | 值转百分比字符串 |
---
title: 工具函数与 UI 框架
---

# 工具函数与 UI 框架

全局工具函数和辅助对象。包括 Locale（本地化）、Database（数据库查询）、GameContext（游戏上下文）、InterfaceMode（界面模式）、Game（游戏状态）、ComponentID（组件ID工具）等。从不通过 import 引入，引擎直接注入。

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

## Locale — 本地化工具

使用最频繁的全局对象（~2000+ 调用）。

| 方法 | 参数 | 返回值 | 调用次数 | 说明 |
|------|------|--------|---------|------|
| `compose` | locKey, ...args | `string` | 1581 | 翻译本地化键为显示文本 |
| `Stylize` | style, ...args | `string` | 392 | 应用样式标记 |
| `compare` | a, b | `int` | 27 | 比较文本排序 |
| `toNumber` | num, ...opts | `string` | 26 | 数字格式化 |
| `keyExists` | key | `bool` | 19 | 检查键是否存在 |
| `plainText` | key, ...args | `string` | 18 | 获取纯文本（去除样式） |

```javascript
const name = Locale.compose('LOC_UNIT_WARRIOR_NAME');
const styled = Locale.Stylize('font-bold', '重要文本');
```

## GameContext — 游戏上下文

| 属性 | 类型 | 调用次数 | 说明 |
|------|------|---------|------|
| `localPlayerID` | `int` | 1054 | 本地玩家 ID（热座模式下会变化） |
| `localObserverID` | `int` | 97 | 本地观察者 ID |

```javascript
const player = Players.get(GameContext.localPlayerID);
```

## Database — 数据库查询

| 方法 | 参数 | 返回值 | 调用次数 | 说明 |
|------|------|--------|---------|------|
| `makeHash` | str | `int` | 118 | 字符串转哈希值 |
| `query` | queryType, ...args | `array` | 57 | 执行数据库查询 |

```javascript
const HASH = Database.makeHash('CORE_CLASS_MILITARY');
if (unit.coreClass == HASH) { /* 军事单位 */ }
```

## InterfaceMode — 界面模式

| 方法 | 参数 | 返回值 | 调用次数 | 说明 |
|------|------|--------|---------|------|
| `isInInterfaceMode` | modeName | `bool` | 109 | 检查是否在指定模式 |
| `switchTo` | modeName, ...args | `void` | 77 | 切换到指定模式 |
| `getCurrent` | — | `string` | 44 | 获取当前模式名 |
| `addHandler` | modeName, handler | `void` | 56 | 添加模式处理器 |
| `switchToDefault` | — | `void` | 54 | 切换回默认模式 |

```javascript
if (InterfaceMode.getCurrent() == 'INTERFACEMODE_CITY_PRODUCTION') {
  // 在城市生产界面
}
```

## Game — 游戏状态

| 属性/方法 | 类型 | 调用次数 | 说明 |
-----------|------|---------|------|
| `age` | `int` | 116 | 当前时代类型哈希 |
| `turn` | `int` | 51 | 当前回合数 |
| `PlayerOperations` | `object` | 168 | 玩家操作接口 |
| `Diplomacy` | `object` | 136 | 外交子系统 |
| `Notifications` | `object` | 133 | 通知子系统 |
| `AgeProgressManager` | `object` | 81 | 时代进度管理器 |
| `CityOperations` | `object` | 53 | 城市操作接口 |
| `UnitOperations` | `object` | 52 | 单位操作接口 |
| `UnitCommands` | `object` | 42 | 单位命令接口 |
| `ProgressionTrees` | `object` | 34 | 科技/文化树 |
| `IndependentPowers` | `object` | 32 | 独立势力 |
| `getHash` | `method` | 32 | 获取哈希值 |

```javascript
const ageDef = GameInfo.Ages.lookup(Game.age);
```

## ComponentID — 组件 ID 工具

| 方法 | 参数 | 返回值 | 调用次数 | 说明 |
|------|------|--------|---------|------|
| `isMatch` | id1, id2 | `bool` | 85 | 比较两个 ID |
| `isValid` | id | `bool` | 67 | 检查 ID 是否有效 |
| `toLogString` | id | `string` | 111 | ID 转日志字符串 |
| `toBitfield` | id | `int` | 38 | ID 转位域 |
| `getInvalidID` | — | `object` | 33 | 获取无效 ID |
| `isInvalid` | id | `bool` | 32 | 检查 ID 是否无效 |

## UI.Player — UI 层玩家操作

| 方法 | 参数 | 返回值 | 调用次数 | 说明 |
|------|------|--------|---------|------|
| `getHeadSelectedCity` | — | `int` | 60 | 获取选中的城市 ID |
| `getHeadSelectedUnit` | — | `int` | 44 | 获取选中的单位 ID |
| `getPrimaryColorValueAsString` | playerID | `string` | 33 | 玩家主颜色字符串 |
| `getPrimaryColorValueAsHex` | playerID | `string` | 18 | 玩家主颜色十六进制 |
| `lookAtID` | id | `void` | 14 | 相机移动到对象 |
| `selectCity` | cityID | `void` | 14 | 选中城市 |
| `selectUnit` | unitID | `void` | 10 | 选中单位 |
| `deselectAllUnits` | — | `void` | 8 | 取消所有单位选中 |
| `deselectAllCities` | — | `void` | 4 | 取消所有城市选中 |
| `selectNextReadyUnit` | — | `void` | 4 | 选中下一个就绪单位 |

```javascript
const cityID = UI.Player.getHeadSelectedCity();
if (cityID) {
  const city = Cities.get(cityID);
}
```

## 源文件引用

- `modules/base-standard/ui/unlocks/model-unlocks.js` — GameContext.localPlayerID 使用
- `modules/base-standard/scripts/age-transition-post-load.js` — Database.makeHash 使用
- `modules/age-modern/ui/tutorial/tutorial-items-modern.js` — InterfaceMode 和 UI.Player 使用
- `modules/base-standard/ui/unit-actions/unit-actions.js` — ComponentID 使用
