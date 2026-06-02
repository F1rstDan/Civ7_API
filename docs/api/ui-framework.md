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
