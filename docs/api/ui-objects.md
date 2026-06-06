---
title: UI Objects UI对象
doc_type: other
summary: UI 框架组件和辅助对象，包括 UI、UI.Player、Databind、NavTray、DialogBoxManager、Icon 和 Layout 等。
primary_scope:
  - UI
related_scope:
  - UI.Player
  - Databind
  - NavTray
  - DialogBoxManager
  - Icon
source:
  - modules/core/ui/panel-support.js
  - modules/core/ui/options/options.js
  - modules/core/ui/component-support.js
  - modules/core/ui/audio-base/audio-support.js
  - modules/core/ui/utilities/utilities-image.js
  - modules/core/ui/shell/main-menu/main-menu.js
doc_update: 2026-06-05
---

# UI Objects UI对象

UI 框架组件和辅助对象。从不通过 import 引入，引擎直接注入。

```javascript
// 快速示例：检查游戏状态并获取当前选中城市
// 来源 modules/core/ui/component-support.js
// 简要描述功能
if (UI.isInGame()) {
  const cityID = UI.Player.getHeadSelectedCity();
  if (cityID) {
    const city = Cities.get(cityID);
  }
}
```

## UI 对象 — 属性与方法

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>UI.sendAudioEvent</API> | event | `void` | 发送音频事件 |
| <API>UI.getIconURL</API> | iconName | `string` | 获取图标 URL |
| <API>UI.getViewExperience</API> | — | `string` | 获取视图体验类型 |
| <API>UI.getIconCSS</API> | iconName | `string` | 获取图标 CSS |
| <API>UI.isInGame</API> | — | `bool` | 是否在游戏中 |
| <API>UI.getIcon</API> | iconName | `string` | 获取图标 |
| <API>UI.setCursorByType</API> | type | `void` | 按类型设置光标 |
| <API>UI.getOption</API> | key | `any` | 获取选项值 |
| <API>UI.setOption</API> | key, value | `void` | 设置选项值 |
| <API>UI.isInShell</API> | — | `bool` | 是否在主菜单 |
| <API>UI.getGameLoadingState</API> | — | `string` | 获取游戏加载状态 |
| <API>UI.lockCursor</API> | locked | `void` | 锁定/解锁光标 |
| <API>UI.isMultiplayer</API> | — | `bool` | 是否为多人游戏 |
| <API>UI.reloadUI</API> | — | `void` | 重新加载 UI |
| <API>UI.randomInt</API> | min, max | `int` | 生成随机整数 |
| <API>UI.notifyUIReady</API> | — | `void` | 通知 UI 已就绪 |

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
// 来源 modules/age-antiquity/ui/tutorial/tutorial-items-antiquity.js
// 简要描述功能
const cityID = UI.Player.getHeadSelectedCity();
if (cityID) {
  const city = Cities.get(cityID);
}
```

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

<API id="UI.sendAudioEvent"><h3>UI.sendAudioEvent(event)</h3>

**说明**: 发送音频事件，播放指定音效标签。

| 参数名 | 类型 | 说明 |
|------|------|------|
| event | `string` | 音频事件标签 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/audio-base/audio-support.js
// 简要描述功能
UI.sendAudioEvent("age-begin-banner");
```

</API>
<API id="UI.getIconURL"><h3>UI.getIconURL(iconName)</h3>

**说明**: 获取指定图标的完整 URL 地址。

| 参数名 | 类型 | 说明 |
|------|------|------|
| iconName | `string` | 图标名称 |

**返回值**: `string`

**使用示例**:

```javascript
// 来源 modules/core/ui/utilities/utilities-image.js
// 简要描述功能
const iconURL = UI.getIconURL("MOD_GENERIC_BONUS");
```

</API>
<API id="UI.getViewExperience"><h3>UI.getViewExperience()</h3>

**说明**: 获取当前视图体验类型（桌面端或移动端）。

**参数**: 无

**返回值**: `string` — 返回 `UIViewExperience` 枚举值（如 `UIViewExperience.Mobile`）

**使用示例**:

```javascript
// 来源 modules/core/ui-next/services/view-experience.js
// 简要描述功能
const isMobile = UI.getViewExperience() == UIViewExperience.Mobile;
```

</API>
<API id="UI.getIconCSS"><h3>UI.getIconCSS(iconName)</h3>

**说明**: 获取指定图标的 CSS 样式字符串。

| 参数名 | 类型 | 说明 |
|------|------|------|
| iconName | `string` | 图标名称 |

**返回值**: `string`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui-next/tooltips/plot-tooltip/plot-tooltip.js
// 简要描述功能
const iconCSS = UI.getIconCSS(resourceType);
```

</API>
<API id="UI.isInGame"><h3>UI.isInGame()</h3>

**说明**: 检查当前是否处于游戏中（非主菜单/Shell）。

**参数**: 无

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 modules/core/ui/component-support.js
// 简要描述功能
if (UI.isInGame()) {
  // 游戏内逻辑
}
```

</API>
<API id="UI.getIcon"><h3>UI.getIcon(iconName)</h3>

**说明**: 获取指定图标的路径。

| 参数名 | 类型 | 说明 |
|------|------|------|
| iconName | `string` | 图标名称 |

**返回值**: `string`

**使用示例**:

```javascript
// 来源 modules/core/ui-next/screens/create-game/age-select-model.js
// 简要描述功能
const icon = UI.getIcon(ageType);
```

</API>
<API id="UI.setCursorByType"><h3>UI.setCursorByType(type)</h3>

**说明**: 按类型设置鼠标光标样式。

| 参数名 | 类型 | 说明 |
|------|------|------|
| type | `UIGameCursorType` | 光标类型，如 `UIHTMLCursorTypes.Default`、`UIHTMLCursorTypes.Text`、`UIHTMLCursorTypes.NotAllowed` |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/panel-support.js
// 简要描述功能
UI.setCursorByType(UIHTMLCursorTypes.Text);
```

</API>
<API id="UI.getOption"><h3>UI.getOption(key)</h3>

**说明**: 获取选项配置值。选项按三级结构分类：set、type、name。

| 参数名 | 类型 | 说明 |
|------|------|------|
| key | `string` | 选项集（optionSet） |

**返回值**: `any`

**使用示例**:

```javascript
// 来源 modules/core/ui/options/options.js
// 简要描述功能
const value = UI.getOption("user", "Accessibility", "LongPressDelay");
```

</API>
<API id="UI.setOption"><h3>UI.setOption(key, value)</h3>

**说明**: 设置选项配置值。

| 参数名 | 类型 | 说明 |
|------|------|------|
| key | `string` | 选项集（optionSet） |
| value | `any` | 选项值 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/options/options.js
// 简要描述功能
UI.setOption("user", "Accessibility", "LongPressDelay", value);
```

</API>
<API id="UI.isInShell"><h3>UI.isInShell()</h3>

**说明**: 检查当前是否在 Shell 主菜单中。

**参数**: 无

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 modules/core/ui/component-support.js
// 简要描述功能
if (UI.isInShell()) {
  // 主菜单逻辑
}
```

</API>
<API id="UI.getGameLoadingState"><h3>UI.getGameLoadingState()</h3>

**说明**: 获取当前游戏加载状态。

**参数**: 无

**返回值**: `string` — 返回 `UIGameLoadingState` 枚举值（如 `UIGameLoadingState.GameStarted`、`UIGameLoadingState.WaitingForUIReady`）

**使用示例**:

```javascript
// 来源 modules/core/ui/component-support.js
// 简要描述功能
if (UI.getGameLoadingState() === UIGameLoadingState.GameStarted) {
  // 游戏已加载完成
}
```

</API>
<API id="UI.lockCursor"><h3>UI.lockCursor(locked)</h3>

**说明**: 锁定或解锁鼠标光标，用于防止光标在特定操作期间切换。

| 参数名 | 类型 | 说明 |
|------|------|------|
| locked | `bool` | 是否锁定光标 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/panel-support.js
// 简要描述功能
UI.lockCursor(true);
// ... 操作 ...
UI.lockCursor(false);
```

</API>
<API id="UI.isMultiplayer"><h3>UI.isMultiplayer()</h3>

**说明**: 检查当前游戏是否为多人游戏。

**参数**: 无

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 modules/core/ui/options/options.js
// 简要描述功能
if (UI.isMultiplayer()) {
  // 多人游戏逻辑
}
```

</API>
<API id="UI.reloadUI"><h3>UI.reloadUI()</h3>

**说明**: 重新加载整个 UI 界面。

**参数**: 无

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/options/model-options.js
// 简要描述功能
UI.reloadUI();
```

</API>
<API id="UI.randomInt"><h3>UI.randomInt(min, max)</h3>

**说明**: 生成指定范围内的随机整数。

| 参数名 | 类型 | 说明 |
|------|------|------|
| min | `int` | 最小值（包含） |
| max | `int` | 最大值（包含） |

**返回值**: `int`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/main-menu/main-menu.js
// 简要描述功能
const seed = UI.randomInt(0, 1e3);
```

</API>
<API id="UI.notifyUIReady"><h3>UI.notifyUIReady()</h3>

**说明**: 通知引擎 UI 已就绪，完成加载流程。

**参数**: 无

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/loading/root-loading.js
// 简要描述功能
UI.notifyUIReady();
```

</API>