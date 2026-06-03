---
title: UI Objects UI对象
---

# UI Objects UI对象

UI 框架组件和辅助对象。从不通过 import 引入，引擎直接注入。

## UI.Player — UI 层玩家操作

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `getHeadSelectedCity` | — | `int` | 获取选中的城市 ID |
| `getHeadSelectedUnit` | — | `int` | 获取选中的单位 ID |
| `getPrimaryColorValueAsString` | playerID | `string` | 玩家主颜色字符串 |
| `getPrimaryColorValueAsHex` | playerID | `string` | 玩家主颜色十六进制 |
| `lookAtID` | id | `void` | 相机移动到对象 |
| `selectCity` | cityID | `void` | 选中城市 |
| `selectUnit` | unitID | `void` | 选中单位 |
| `deselectAllUnits` | — | `void` | 取消所有单位选中 |
| `deselectAllCities` | — | `void` | 取消所有城市选中 |
| `selectNextReadyUnit` | — | `void` | 选中下一个就绪单位 |

```javascript
const cityID = UI.Player.getHeadSelectedCity();
if (cityID) {
  const city = Cities.get(cityID);
}
```

---

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
