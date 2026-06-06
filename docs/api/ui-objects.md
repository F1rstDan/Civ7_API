---
title: UI Objects UI对象
doc_type: other
summary: UI 框架全局对象和辅助对象，包括 UI、UI.Player、Databind、NavTray、DialogBoxManager、Icon 和 Layout 等。引擎直接注入，无需 import。
primary_scope:
  - UI
  - UI.Player
  - Databind
  - InterfaceMode
  - Layout
  - DialogBoxManager
  - Icon
  - NavTray
related_scope:
  - Component
source:
  - modules/core/ui/panel-support.js
  - modules/core/ui/component-support.js
  - modules/core/ui/interface-modes/interface-modes.js
  - modules/core/ui/options/options.js
  - modules/core/ui/audio-base/audio-support.js
  - modules/core/ui/utilities/utilities-image.js
  - modules/core/ui/shell/main-menu/main-menu.js
  - modules/core/ui/navigation-tray/navigation-tray.js
  - modules/core/ui/navigation-tray/model-navigation-tray.js
  - modules/core/ui/dialog-box/manager-dialog-box.js
  - modules/core/ui/utilities/utilities-databinding.js
  - modules/core/ui/components/fxs-flipbook.js
  - modules/base-standard/ui/city-banners/city-banners.js
doc_update: 2026-06-06
---

# UI Objects UI对象

UI 框架全局对象和辅助对象。引擎直接注入，无需手动 import。

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

| 方法(16) | 参数 | 返回值 | 说明 |
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

`UI.Player` 是 UI 层玩家操作对象，负责选中、取消选中、相机移动等操作。

```javascript
// 来源 modules/age-antiquity/ui/tutorial/tutorial-items-antiquity.js
// 简要描述功能
const cityID = UI.Player.getHeadSelectedCity();
const unitID = UI.Player.getHeadSelectedUnit();
UI.Player.selectCity(cityID);
UI.Player.deselectAllUnits();
```

| 方法(10) | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>UI.Player.getHeadSelectedCity</API> | — | `int` | 获取选中的城市 ID |
| <API>UI.Player.getHeadSelectedUnit</API> | — | `int` | 获取选中的单位 ID |
| <API>UI.Player.getPrimaryColorValueAsString</API> | playerID | `string` | 玩家主颜色字符串 |
| <API>UI.Player.getPrimaryColorValueAsHex</API> | playerID | `string` | 玩家主颜色十六进制 |
| <API>UI.Player.lookAtID</API> | id | `void` | 相机移动到对象 |
| <API>UI.Player.selectCity</API> | cityID | `void` | 选中城市 |
| <API>UI.Player.selectUnit</API> | unitID | `void` | 选中单位 |
| <API>UI.Player.deselectAllUnits</API> | — | `void` | 取消所有单位选中 |
| <API>UI.Player.deselectAllCities</API> | — | `void` | 取消所有城市选中 |
| <API>UI.Player.selectNextReadyUnit</API> | — | `void` | 选中下一个就绪单位 |

## Databind — 数据绑定

`Databind` 是数据绑定全局对象，用于将 UI 元素与数据模型绑定，实现声明式 UI 更新。

```javascript
// 来源 modules/core/ui/navigation-tray/navigation-tray.js
// 简要描述功能
Databind.if(container, "g_NavTray.isTrayActive");
Databind.for(item, "g_NavTray.entries", "item");
Databind.locText(caption, "item.description");
Databind.classToggle(button, "hidden", "g_NavTray.isTrayRequired");
```

| 方法(7) | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Databind.attribute</API> | name, value | `void` | 绑定属性 |
| <API>Databind.classToggle</API> | className, condition | `void` | 切换 CSS 类 |
| <API>Databind.if</API> | condition, template | `void` | 条件渲染 |
| <API>Databind.for</API> | items, template | `void` | 列表渲染 |
| <API>Databind.locText</API> | key | `void` | 绑定本地化文本 |
| <API>Databind.tooltip</API> | key | `void` | 绑定工具提示 |
| <API>Databind.value</API> | getter, setter | `void` | 绑定值 |

## InterfaceMode — 界面模式

`InterfaceMode` 是全局对象，管理游戏的界面模式切换。每个界面模式（如默认模式、城市生产、外交对话等）都有对应的处理器，负责该模式下的输入处理、视图切换等。

```javascript
// 来源 modules/core/ui/interface-modes/interface-modes.js
// 注册自定义界面模式处理器
InterfaceMode.addHandler("INTERFACEMODE_RADIAL_SELECTION", new RadialSelectionInterfaceMode());

// 来源 modules/base-standard/ui/production-chooser/production-chooser-helpers.js
// 切换到指定界面模式，传递参数
InterfaceMode.switchTo(item.interfaceMode, {
  cityID: currentCity,
  constructibleID: item.id
});

// 来源 modules/core/ui/input/hotkey-manager.js
// 检查当前模式是否允许热键
if (InterfaceMode.allowsHotKeys()) {
  // 处理热键输入
}
```

| 方法(8) | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>InterfaceMode.getCurrent</API> | — | `string` | 获取当前界面模式名称 |
| <API>InterfaceMode.switchTo</API> | mode, parameters | `bool` | 切换到指定界面模式 |
| <API>InterfaceMode.switchToDefault</API> | — | `void` | 切换到默认界面模式 |
| <API>InterfaceMode.isInInterfaceMode</API> | mode | `bool` | 检查是否处于指定模式 |
| <API>InterfaceMode.isInDefaultMode</API> | — | `bool` | 检查是否处于默认模式 |
| <API>InterfaceMode.addHandler</API> | mode, handler | `void` | 注册界面模式处理器 |
| <API>InterfaceMode.getParameters</API> | — | `object` | 获取当前模式的参数 |
| <API>InterfaceMode.allowsHotKeys</API> | — | `bool` | 当前模式是否允许热键 |

## Layout — 布局与 CSS

`Layout` 是布局辅助全局对象，提供像素转换和紧凑布局检测。

```javascript
// 来源 modules/core/ui/components/fxs-flipbook.js
// 简要描述功能
this.Root.style.width = Layout.pixels(sprite.width);
this.Root.style.height = Layout.pixels(sprite.height);

// 来源 modules/core/ui/shell/create-panels/advanced-options-base.js
// 简要描述功能
const isCompact = Layout.isCompact();
```

| 方法(3) | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Layout.pixelsToScreenPixels</API> | px | `float` | 像素转屏幕像素 |
| <API>Layout.pixels</API> | px | `float` | 像素值转换 |
| <API>Layout.isCompact</API> | — | `bool` | 是否为紧凑布局 |

## DialogBoxManager — 对话框管理器

`DialogBoxManager` 用于创建和管理对话框（确认框、确认/取消框、多选项框等）。

```javascript
// 来源 modules/core/ui/options/screen-options.js
// 简要描述功能
DialogBoxManager.createDialog_Confirm({
  title: "LOC_OPTIONS_RESET_TITLE",
  message: "LOC_OPTIONS_RESET_MESSAGE",
  onConfirm: () => { /* 重置逻辑 */ }
});

DialogBoxManager.createDialog_ConfirmCancel({
  title: "LOC_OPTIONS_APPLY_TITLE",
  message: "LOC_OPTIONS_APPLY_MESSAGE",
  onConfirm: () => { /* 确认逻辑 */ },
  onCancel: () => { /* 取消逻辑 */ }
});
```

| 方法(5) | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>DialogBoxManager.createDialog_Confirm</API> | options | `void` | 创建确认对话框 |
| <API>DialogBoxManager.createDialog_ConfirmCancel</API> | options | `void` | 创建确认/取消对话框 |
| <API>DialogBoxManager.createDialog_MultiOption</API> | options | `void` | 创建多选项对话框 |
| <API>DialogBoxManager.closeDialogBox</API> | id | `void` | 关闭对话框 |
| <API>DialogBoxManager.clear</API> | — | `void` | 清除所有对话框 |

## Icon — 图标辅助

`Icon` 是图标辅助全局对象，提供各类游戏图标（领袖头像、文明符号、产出图标、胜利图标等）的获取函数。

```javascript
// 来源 modules/base-standard/ui/city-banners/city-banners.js
// 简要描述功能
const icon = Icon.getLeaderPortraitIcon(leaderType);
const civSymbol = Icon.getCivSymbolCSSFromPlayer(playerID);
const yieldIcon = Icon.getYieldIcon(yieldType);
```

| 方法(7) | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Icon.getLeaderPortraitIcon</API> | leaderType | `string` | 获取领袖头像图标 |
| <API>Icon.getCivSymbolFromCivilizationType</API> | civType | `string` | 获取文明符号 |
| <API>Icon.getIconFromActionName</API> | actionName | `string` | 从动作名获取图标 |
| <API>Icon.getNotificationIconFromID</API> | notifID | `string` | 从通知 ID 获取图标 |
| <API>Icon.getUnitIconFromDefinition</API> | unitDef | `string` | 从单位定义获取图标 |
| <API>Icon.getYieldIcon</API> | yieldType | `string` | 获取产出图标 |
| <API>Icon.getVictoryIcon</API> | victoryType | `string` | 获取胜利图标 |

## NavTray — 导航托盘

`NavTray` 是手柄导航托盘全局对象，管理底部导航栏的按钮显示和操作。

```javascript
// 来源 modules/base-standard/ui/advanced-start/screen-advanced-start.js
// 简要描述功能
NavTray.clear();
NavTray.addOrUpdateGenericBack();
NavTray.addOrUpdateAccept("LOC_UI_QUEUE_MOVE_UP");
NavTray.addOrUpdateShellAction1("LOC_UI_QUEUE_DELETE_ITEM");
NavTray.addOrUpdateCancel("LOC_GENERIC_CANCEL");
```

| 方法(5) | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>NavTray.clear</API> | — | `void` | 清除导航栏 |
| <API>NavTray.addOrUpdateGenericBack</API> | callback | `void` | 添加/更新返回按钮 |
| <API>NavTray.addOrUpdateShellAction1</API> | label, callback | `void` | 添加/更新操作按钮 1 |
| <API>NavTray.addOrUpdateAccept</API> | label, callback | `void` | 添加/更新接受按钮 |
| <API>NavTray.addOrUpdateCancel</API> | label, callback | `void` | 添加/更新取消按钮 |

## 相关全局对象

| 对象 | 说明 |
|------|------|
| [Component](component.md) | 所有 UI 组件的基类，定义生命周期、焦点管理、属性变更、音效播放等核心功能 |

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
<API id="UI.Player.getHeadSelectedCity"><h3>UI.Player.getHeadSelectedCity()</h3>

**说明**: 获取当前玩家选中的城市 ID，无选中时返回 `undefined`。

**参数**: 无

**返回值**: `int` | `undefined`

**使用示例**:

```javascript
// 来源 modules/age-antiquity/ui/tutorial/tutorial-items-antiquity.js
// 简要描述功能
const cityID = UI.Player.getHeadSelectedCity();
if (cityID) {
  const city = Cities.get(cityID);
}
```

</API>
<API id="UI.Player.getHeadSelectedUnit"><h3>UI.Player.getHeadSelectedUnit()</h3>

**说明**: 获取当前玩家选中的单位 ID，无选中时返回 `undefined`。

**参数**: 无

**返回值**: `int` | `undefined`

**使用示例**:

```javascript
// 来源 modules/age-antiquity/ui/tutorial/tutorial-items-antiquity.js
// 简要描述功能
const unitID = UI.Player.getHeadSelectedUnit();
if (unitID) {
  const unit = Units.get(unitID);
}
```

</API>
<API id="UI.Player.getPrimaryColorValueAsString"><h3>UI.Player.getPrimaryColorValueAsString(playerID)</h3>

**说明**: 获取指定玩家的主颜色字符串表示。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 玩家 ID |

**返回值**: `string`

**使用示例**:

```javascript
// 来源 modules/core/ui/panel-support.js
// 简要描述功能
const colorStr = UI.Player.getPrimaryColorValueAsString(playerID);
```

</API>
<API id="UI.Player.getPrimaryColorValueAsHex"><h3>UI.Player.getPrimaryColorValueAsHex(playerID)</h3>

**说明**: 获取指定玩家的主颜色十六进制字符串。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 玩家 ID |

**返回值**: `string`

**使用示例**:

```javascript
// 来源 modules/core/ui/panel-support.js
// 简要描述功能
const hexColor = UI.Player.getPrimaryColorValueAsHex(playerID);
```

</API>
<API id="UI.Player.lookAtID"><h3>UI.Player.lookAtID(id)</h3>

**说明**: 将相机移动到指定对象位置。

| 参数名 | 类型 | 说明 |
|------|------|------|
| id | `int` | 目标对象 ID（城市、单位等） |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/age-antiquity/ui/tutorial/tutorial-items-antiquity.js
// 简要描述功能
UI.Player.lookAtID(cityID);
```

</API>
<API id="UI.Player.selectCity"><h3>UI.Player.selectCity(cityID)</h3>

**说明**: 选中指定城市。

| 参数名 | 类型 | 说明 |
|------|------|------|
| cityID | `int` | 城市 ID |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/age-antiquity/ui/tutorial/tutorial-items-antiquity.js
// 简要描述功能
UI.Player.selectCity(cityID);
```

</API>
<API id="UI.Player.selectUnit"><h3>UI.Player.selectUnit(unitID)</h3>

**说明**: 选中指定单位。

| 参数名 | 类型 | 说明 |
|------|------|------|
| unitID | `int` | 单位 ID |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/age-antiquity/ui/tutorial/tutorial-items-antiquity.js
// 简要描述功能
UI.Player.selectUnit(unit.id);
```

</API>
<API id="UI.Player.deselectAllUnits"><h3>UI.Player.deselectAllUnits()</h3>

**说明**: 取消所有单位的选中状态。

**参数**: 无

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/age-antiquity/ui/tutorial/tutorial-items-antiquity.js
// 简要描述功能
UI.Player.deselectAllUnits();
```

</API>
<API id="UI.Player.deselectAllCities"><h3>UI.Player.deselectAllCities()</h3>

**说明**: 取消所有城市的选中状态。

**参数**: 无

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/panel-support.js
// 简要描述功能
UI.Player.deselectAllCities();
```

</API>
<API id="UI.Player.selectNextReadyUnit"><h3>UI.Player.selectNextReadyUnit()</h3>

**说明**: 选中下一个就绪（有剩余行动力）的单位。

**参数**: 无

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/age-antiquity/ui/tutorial/tutorial-items-antiquity.js
// 简要描述功能
UI.Player.selectNextReadyUnit();
```

</API>
<API id="Databind.attribute"><h3>Databind.attribute(name, value)</h3>

**说明**: 将 DOM 属性绑定到数据模型。

| 参数名 | 类型 | 说明 |
|------|------|------|
| name | `string` | 属性名 |
| value | `any` | 属性值 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/utilities/utilities-databinding.js
// 简要描述功能
Databind.attribute(target, "componentid", `${baseComponentID}`, verbose);
```

</API>
<API id="Databind.classToggle"><h3>Databind.classToggle(className, condition)</h3>

**说明**: 根据条件切换 CSS 类名。

| 参数名 | 类型 | 说明 |
|------|------|------|
| className | `string` | CSS 类名 |
| condition | `string` | 条件表达式，如 `"g_NavTray.isTrayRequired"` |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/navigation-tray/navigation-tray.js
// 简要描述功能
Databind.classToggle(button, "hidden", "g_NavTray.isTrayRequired");
```

</API>
<API id="Databind.if"><h3>Databind.if(condition, template)</h3>

**说明**: 根据条件渲染元素。

| 参数名 | 类型 | 说明 |
|------|------|------|
| condition | `string` | 条件表达式 |
| template | `string` | 模板名称 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/navigation-tray/navigation-tray.js
// 简要描述功能
Databind.if(container, "g_NavTray.isTrayActive");
```

</API>
<API id="Databind.for"><h3>Databind.for(items, template)</h3>

**说明**: 根据数据列表循环渲染元素。

| 参数名 | 类型 | 说明 |
|------|------|------|
| items | `string` | 数据列表表达式 |
| template | `string` | 模板名称 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/navigation-tray/navigation-tray.js
// 简要描述功能
Databind.for(item, "g_NavTray.entries", "item");
```

</API>
<API id="Databind.locText"><h3>Databind.locText(key)</h3>

**说明**: 绑定本地化文本到元素。

| 参数名 | 类型 | 说明 |
|------|------|------|
| key | `string` | 本地化键名 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/navigation-tray/navigation-tray.js
// 简要描述功能
Databind.locText(caption, "item.description");
```

</API>
<API id="Databind.tooltip"><h3>Databind.tooltip(key)</h3>

**说明**: 绑定工具提示到元素。

| 参数名 | 类型 | 说明 |
|------|------|------|
| key | `string` | 工具提示键名 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/age-rankings/panel-age-rankings.js
// 简要描述功能
Databind.tooltip(playerContainer, player.playerName);
```

</API>
<API id="Databind.value"><h3>Databind.value(getter, setter)</h3>

**说明**: 绑定值到元素，支持双向绑定。

| 参数名 | 类型 | 说明 |
|------|------|------|
| getter | `function` | 获取值的函数 |
| setter | `function` | 设置值的函数 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/utilities/utilities-databinding.js
// 简要描述功能
Databind.value(() => model.value, (v) => model.value = v);
```

</API>
<API id="NavTray.clear"><h3>NavTray.clear()</h3>

**说明**: 清除导航栏所有按钮。

**参数**: 无

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/advanced-start/screen-advanced-start.js
// 简要描述功能
NavTray.clear();
```

</API>
<API id="NavTray.addOrUpdateGenericBack"><h3>NavTray.addOrUpdateGenericBack(callback)</h3>

**说明**: 添加或更新通用返回按钮。

| 参数名 | 类型 | 说明 |
|------|------|------|
| callback | `function` | 点击回调函数 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/advanced-start/screen-advanced-start.js
// 简要描述功能
NavTray.addOrUpdateGenericBack();
```

</API>
<API id="NavTray.addOrUpdateShellAction1"><h3>NavTray.addOrUpdateShellAction1(label, callback)</h3>

**说明**: 添加或更新第一个操作按钮（通常是 Y 键）。

| 参数名 | 类型 | 说明 |
|------|------|------|
| label | `string` | 按钮标签（本地化键） |
| callback | `function` | 点击回调函数 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/advanced-start/screen-advanced-start.js
// 简要描述功能
NavTray.addOrUpdateShellAction1("LOC_ADVANCED_FORCE_COMPLETE_DECK");
```

</API>
<API id="NavTray.addOrUpdateAccept"><h3>NavTray.addOrUpdateAccept(label, callback)</h3>

**说明**: 添加或更新接受按钮。

| 参数名 | 类型 | 说明 |
|------|------|------|
| label | `string` | 按钮标签（本地化键） |
| callback | `function` | 点击回调函数 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/build-queue/panel-build-queue.js
// 简要描述功能
NavTray.addOrUpdateAccept("LOC_UI_QUEUE_MOVE_UP");
```

</API>
<API id="NavTray.addOrUpdateCancel"><h3>NavTray.addOrUpdateCancel(label, callback)</h3>

**说明**: 添加或更新取消按钮。

| 参数名 | 类型 | 说明 |
|------|------|------|
| label | `string` | 按钮标签（本地化键） |
| callback | `function` | 点击回调函数 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/navigation-tray/model-navigation-tray.js
// 简要描述功能
NavTray.addOrUpdateCancel("LOC_GENERIC_CANCEL");
```

</API>
<API id="DialogBoxManager.createDialog_Confirm"><h3>DialogBoxManager.createDialog_Confirm(options)</h3>

**说明**: 创建确认对话框，仅有一个确认按钮。

| 参数名 | 类型 | 说明 |
|------|------|------|
| options | `object` | 对话框配置对象，包含 `title`、`message`、`onConfirm` 等字段 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/options/screen-options.js
// 简要描述功能
DialogBoxManager.createDialog_Confirm({
  title: "LOC_OPTIONS_RESET_TITLE",
  message: "LOC_OPTIONS_RESET_MESSAGE",
  onConfirm: () => { /* 重置逻辑 */ }
});
```

</API>
<API id="DialogBoxManager.createDialog_ConfirmCancel"><h3>DialogBoxManager.createDialog_ConfirmCancel(options)</h3>

**说明**: 创建确认/取消对话框，有确认和取消两个按钮。

| 参数名 | 类型 | 说明 |
|------|------|------|
| options | `object` | 对话框配置对象，包含 `title`、`message`、`onConfirm`、`onCancel` 等字段 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/options/screen-options.js
// 简要描述功能
DialogBoxManager.createDialog_ConfirmCancel({
  title: "LOC_OPTIONS_APPLY_TITLE",
  message: "LOC_OPTIONS_APPLY_MESSAGE",
  onConfirm: () => { /* 确认逻辑 */ },
  onCancel: () => { /* 取消逻辑 */ }
});
```

</API>
<API id="DialogBoxManager.createDialog_MultiOption"><h3>DialogBoxManager.createDialog_MultiOption(options)</h3>

**说明**: 创建多选项对话框，支持多个自定义按钮。

| 参数名 | 类型 | 说明 |
|------|------|------|
| options | `object` | 对话框配置对象，包含 `title`、`message`、`options`（按钮数组）等字段 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/options/options-helpers.js
// 简要描述功能
DialogBoxManager.createDialog_MultiOption({
  title: "LOC_OPTIONS_CHOOSE_TITLE",
  message: "LOC_OPTIONS_CHOOSE_MESSAGE",
  options: [
    { label: "LOC_OPTION_A", callback: () => {} },
    { label: "LOC_OPTION_B", callback: () => {} }
  ]
});
```

</API>
<API id="DialogBoxManager.closeDialogBox"><h3>DialogBoxManager.closeDialogBox(id)</h3>

**说明**: 关闭指定 ID 的对话框。

| 参数名 | 类型 | 说明 |
|------|------|------|
| id | `int` | 对话框 ID |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/dialog-box/screen-dialog-box.js
// 简要描述功能
DialogBoxManager.closeDialogBox(this.dialogId);
```

</API>
<API id="DialogBoxManager.clear"><h3>DialogBoxManager.clear()</h3>

**说明**: 清除所有对话框。

**参数**: 无

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/context-manager/context-manager.js
// 简要描述功能
DialogBoxManager.clear();
```

</API>
<API id="Icon.getLeaderPortraitIcon"><h3>Icon.getLeaderPortraitIcon(leaderType)</h3>

**说明**: 获取指定领袖类型的头像图标路径。

| 参数名 | 类型 | 说明 |
|------|------|------|
| leaderType | `string` | 领袖类型名称 |

**返回值**: `string`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/city-banners/city-banners.js
// 简要描述功能
const icon = Icon.getLeaderPortraitIcon(leaderType);
```

</API>
<API id="Icon.getCivSymbolFromCivilizationType"><h3>Icon.getCivSymbolFromCivilizationType(civType)</h3>

**说明**: 获取指定文明类型的符号图标路径。

| 参数名 | 类型 | 说明 |
|------|------|------|
| civType | `string` | 文明类型名称 |

**返回值**: `string`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui-next/tooltips/plot-tooltip/player-portrait.js
// 简要描述功能
setCivSymbol(Icon.getCivSymbolFromCivilizationType(player.civilizationType));
```

</API>
<API id="Icon.getIconFromActionName"><h3>Icon.getIconFromActionName(actionName)</h3>

**说明**: 从动作名称获取对应的图标路径。

| 参数名 | 类型 | 说明 |
|------|------|------|
| actionName | `string` | 动作名称 |

**返回值**: `string`

**使用示例**:

```javascript
// 来源 modules/core/ui/components/fxs-hold-to-confirm.js
// 简要描述功能
const imagePath = Icon.getIconFromActionName(actionName) ?? "";
```

</API>
<API id="Icon.getNotificationIconFromID"><h3>Icon.getNotificationIconFromID(notifID)</h3>

**说明**: 从通知 ID 获取对应的通知图标路径。

| 参数名 | 类型 | 说明 |
|------|------|------|
| notifID | `int` | 通知 ID |

**返回值**: `string`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/notification-train/panel-notification-train.js
// 简要描述功能
icon.src = Icon.getNotificationIconFromID(notificationID);
```

</API>
<API id="Icon.getUnitIconFromDefinition"><h3>Icon.getUnitIconFromDefinition(unitDef)</h3>

**说明**: 从单位定义获取单位图标路径。

| 参数名 | 类型 | 说明 |
|------|------|------|
| unitDef | `object` | 单位定义对象 |

**返回值**: `string`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui-next/screens/choosers/helpers.js
// 简要描述功能
return Icon.getUnitIconFromDefinition(unitInfo);
```

</API>
<API id="Icon.getYieldIcon"><h3>Icon.getYieldIcon(yieldType)</h3>

**说明**: 获取指定产出类型的图标路径。

| 参数名 | 类型 | 说明 |
|------|------|------|
| yieldType | `string` | 产出类型名称 |

**返回值**: `string`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui-next/screens/commerce/commerce-screen-model.js
// 简要描述功能
iconSrc: `url(${Icon.getYieldIcon(yieldDefinition.YieldType)})`
```

</API>
<API id="Icon.getVictoryIcon"><h3>Icon.getVictoryIcon(victoryType)</h3>

**说明**: 获取指定胜利类型的图标路径。

| 参数名 | 类型 | 说明 |
|------|------|------|
| victoryType | `string` | 胜利类型名称 |

**返回值**: `string`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui-next/screens/victories/victories-screen-model.js
// 简要描述功能
const victoryIcon = Icon.getVictoryIcon(victoryType);
```

</API>
<API id="Layout.pixelsToScreenPixels"><h3>Layout.pixelsToScreenPixels(px)</h3>

**说明**: 将像素值转换为屏幕像素值，用于响应式布局计算。

| 参数名 | 类型 | 说明 |
|------|------|------|
| px | `float` | 像素值 |

**返回值**: `float`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/diplo-ribbon/panel-diplo-ribbon.js
// 简要描述功能
if (window.innerWidth >= Layout.pixelsToScreenPixels(1919) && !isMobileViewExperience) {
  // 大屏布局
}
```

</API>
<API id="Layout.pixels"><h3>Layout.pixels(px)</h3>

**说明**: 将像素值转换为 CSS 像素字符串，用于设置元素样式。

| 参数名 | 类型 | 说明 |
|------|------|------|
| px | `float` | 像素值 |

**返回值**: `string`

**使用示例**:

```javascript
// 来源 modules/core/ui/components/fxs-flipbook.js
// 简要描述功能
this.Root.style.width = Layout.pixels(sprite.width);
this.Root.style.height = Layout.pixels(sprite.height);
```

</API>
<API id="Layout.isCompact"><h3>Layout.isCompact()</h3>

**说明**: 检查当前是否为紧凑布局（窄屏/移动端）。

**参数**: 无

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/create-panels/advanced-options-base.js
// 简要描述功能
const isCompact = Layout.isCompact();
```

</API>

<API id="InterfaceMode.getCurrent"><h3>InterfaceMode.getCurrent()</h3>

**说明**: 获取当前界面模式名称，如 `"INTERFACEMODE_DEFAULT"`、`"INTERFACEMODE_CITY_PRODUCTION"` 等。

**参数**: 无

**返回值**: `string` — 当前界面模式名称

**使用示例**:

```javascript
// 来源 modules/core/ui/input/hotkey-manager.js
// 根据当前模式执行不同热键逻辑
if (InterfaceMode.getCurrent() == "INTERFACEMODE_CITY_PRODUCTION") {
  // 城市生产模式下的特殊处理
}
```

</API>

<API id="InterfaceMode.switchTo"><h3>InterfaceMode.switchTo(mode, parameters)</h3>

**说明**: 切换到指定界面模式。会先检查当前模式是否允许离开，再检查目标模式是否允许进入，最后切换视图。

| 参数名 | 类型 | 说明 |
|------|------|------|
| mode | `string` | 目标界面模式名称 |
| parameters | `object` | 可选，传递给目标模式处理器的参数 |

**返回值**: `bool` — 切换成功返回 `true`，失败返回 `false`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/production-chooser/production-chooser-helpers.js
// 切换到生产选择界面模式
InterfaceMode.switchTo(item.interfaceMode, {
  cityID: currentCity,
  constructibleID: item.id
});
```

</API>

<API id="InterfaceMode.switchToDefault"><h3>InterfaceMode.switchToDefault()</h3>

**说明**: 切换到默认界面模式（`INTERFACEMODE_DEFAULT`）。

**参数**: 无

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/production-chooser/production-chooser-helpers.js
// 退出建筑放置模式，返回默认模式
if (InterfaceMode.isInInterfaceMode("INTERFACEMODE_PLACE_BUILDING")) {
  InterfaceMode.switchToDefault();
}
```

</API>

<API id="InterfaceMode.isInInterfaceMode"><h3>InterfaceMode.isInInterfaceMode(mode)</h3>

**说明**: 检查当前是否处于指定的界面模式。

| 参数名 | 类型 | 说明 |
|------|------|------|
| mode | `string` | 要检查的界面模式名称 |

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/diplo-ribbon/model-diplo-ribbon.js
// 检查是否处于外交对话模式
if (InterfaceMode.isInInterfaceMode("INTERFACEMODE_DIPLOMACY_DIALOG") && !DiplomacyManager.currentDiplomacyDialogData) {
  // 外交对话模式下的处理
}
```

</API>

<API id="InterfaceMode.isInDefaultMode"><h3>InterfaceMode.isInDefaultMode()</h3>

**说明**: 检查当前是否处于默认界面模式。

**参数**: 无

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 modules/core/ui/interface-modes/interface-modes.js
// 检查是否处于默认模式
if (InterfaceMode.isInDefaultMode()) {
  // 默认模式下的处理
}
```

</API>

<API id="InterfaceMode.addHandler"><h3>InterfaceMode.addHandler(mode, handler)</h3>

**说明**: 为指定界面模式注册处理器。处理器需实现 `canEnterMode`、`transitionTo`、`transitionFrom` 等生命周期方法。

| 参数名 | 类型 | 说明 |
|------|------|------|
| mode | `string` | 界面模式名称 |
| handler | `object` | 模式处理器对象 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/interface-modes/interface-mode-radial-selection.js
// 注册径向选择界面模式处理器
class RadialSelectionInterfaceMode {
  canEnterMode(parameters) { /* ... */ }
  transitionTo(prevMode, mode, parameters) { /* ... */ }
  transitionFrom(prevMode, mode) { /* ... */ }
}
InterfaceMode.addHandler("INTERFACEMODE_RADIAL_SELECTION", new RadialSelectionInterfaceMode());
```

</API>

<API id="InterfaceMode.getParameters"><h3>InterfaceMode.getParameters()</h3>

**说明**: 获取当前界面模式切换时传入的参数对象。

**参数**: 无

**返回值**: `object` | `undefined` — 当前模式的参数对象

**使用示例**:

```javascript
// 来源 modules/core/ui/interface-modes/interface-modes.js
// 获取当前模式的参数
const params = InterfaceMode.getParameters();
if (params?.cityID) {
  // 使用传入的城市 ID
}
```

</API>

<API id="InterfaceMode.allowsHotKeys"><h3>InterfaceMode.allowsHotKeys()</h3>

**说明**: 检查当前界面模式是否允许热键输入。委托给当前模式处理器的 `allowsHotKeys()` 方法。

**参数**: 无

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 modules/core/ui/input/hotkey-manager.js
// 检查当前模式是否允许热键
if (InterfaceMode.allowsHotKeys()) {
  // 处理热键输入
}
```

</API>