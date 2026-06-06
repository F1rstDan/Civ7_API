---
title: Debug 调试
doc_type: other
summary: UI.Debug 调试系统，用于注册调试控件、读取控件值、动态开关 UI 功能。通过 Live Tuner 调试面板实时控制游戏内 UI 子系统。
primary_scope:
  - UI.Debug
related_scope:
  - engine
  - Autoplay
  - Automation
  - Configuration
source:
  - modules/core/ui-next/utilities/debug-widgets.js
  - modules/base-standard/ui/debug/hud-debug-widgets.js
  - modules/base-standard/ui/debug/city-banners-stress-test.js
  - modules/core/ui/input/plot-cursor.js
  - modules/core/ui-next/components/image-cache.js
  - modules/core/ui-next/components/nav-help.js
  - modules/core/ui-next/components/throbber.js
doc_update: 2026-06-06
---

# Debug 调试

UI.Debug 是文明7的调试系统，用于注册调试控件、读取控件值、动态开关 UI 功能。引擎直接注入，无需手动 import 引入。通过 Live Tuner 调试面板可实时控制游戏内 UI 子系统（HUD、单位旗标、提示框等）。

```javascript
// 来源 modules/core/ui/input/plot-cursor.js
// 注册一个布尔型调试控件，用于开关功能
const disablePlotCursor = {
  id: "disablePlotCursor",
  category: "Systems",
  caption: "Disable Plot Cursor",
  domainType: "bool",
  value: false
};
UI.Debug.registerWidget(disablePlotCursor);
```

```javascript
// 来源 modules/base-standard/ui/debug/hud-debug-widgets.js
// 监听调试控件值变化，在 Live Tuner 面板中切换 UI 功能
engine.on("DebugWidgetUpdated", (id, value) => {
  if (id == "disableHUD") {
    if (value) {
      ViewManager.setCurrentByName("Unset");
      ViewManager.switchToEmptyView();
    } else {
      ViewManager.setCurrentByName("World");
    }
  }
});
```

## 属性与方法

| 方法(4) | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>UI.Debug.registerWidget</API> | widget: `Object` | `void` | 注册调试控件到 Live Tuner 面板 |
| <API>UI.Debug.deleteWidget</API> | id: `string` | `void` | 从面板中移除调试控件 |
| <API>UI.Debug.getWidgetValue</API> | id: `string` | `any` | 获取调试控件的当前值 |
| <API>UI.Debug.markImagesAsPreloaded</API> | urls: `string[]` | `void` | 标记图片为已预加载（跳过缓存） |

## 调试控件对象结构

每个调试控件是一个普通对象，注册后出现在 Live Tuner 的 Debug 面板中。控件由以下属性定义：

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 唯一标识符，用于读取值和监听变化 |
| `category` | `string` | 控件分组，如 `"Systems"`、`"Debug"`、`"Profiling"`、`"Tuning"` |
| `caption` | `string` | 在调试面板中显示的名称 |
| `domainType` | `string` | 值类型，常用 `"bool"` |
| `value` | `any` | 初始值，与 `domainType` 对应 |

```javascript
// 来源 modules/core/ui-next/components/nav-help.js
// 注册一个 Debug 类别的调试控件
UI.Debug.registerWidget({
  caption: "Show unknown icons in <NavHelp>",
  category: "Debug",
  domainType: "bool",
  id: "navHelpShowUnknownIcons",
  value: false
});
```

```javascript
// 来源 modules/base-standard/ui/debug/city-banners-stress-test.js
// 注册一个 Profiling 类别的调试控件
const CityBannerDebugWidget = {
  id: "stressTestCityBanners",
  category: "Profiling",
  caption: "Stress Test City Banners",
  domainType: "bool",
  value: false
};
UI.Debug.registerWidget(CityBannerDebugWidget);
```

## 引擎事件

### DebugWidgetUpdated

`engine.on("DebugWidgetUpdated", callback)` 监听调试控件值变化。当用户在 Live Tuner 中切换控件开关时触发。

```javascript
// 来源 modules/core/ui/input/plot-cursor.js
// 监听控件变化，动态开关功能
engine.on("DebugWidgetUpdated", (id, value) => {
  if (id == "disablePlotCursor") {
    if (value) {
      this.shutdown();
    } else {
      this.startup();
    }
  } else if (id == "hidePlotVFX") {
    if (value) {
      this.hidePlotVFX();
    } else {
      this.showPlotVFX();
    }
  }
});
```

## SolidJS 集成

`modules/core/ui-next/utilities/debug-widgets.js` 提供了 SolidJS 信号绑定，可将调试控件值直接接入响应式 UI：

```javascript
// 来源 modules/core/ui-next/utilities/debug-widgets.js
// 将调试控件绑定为 SolidJS 信号，组件自动响应值变化
import { createSignalFromDebugWidget } from 'modules/core/ui-next/utilities/debug-widgets.js';

const isDisabled = createSignalFromDebugWidget({
  id: "myFeatureToggle",
  category: "Debug",
  caption: "Toggle My Feature",
  domainType: "bool",
  value: false
});
// isDisabled 是 SolidJS getter，值变化时自动更新 UI
```

```javascript
// 来源 modules/core/ui-next/services/audio-support.js
// 读取调试控件值来控制日志输出
const shouldLog = UI.Debug.getWidgetValue("logMatchedAudioTriggers");
if (shouldLog) {
  console.log("Audio trigger matched:", triggerData);
}
```

## HUD 调试控件示例

`modules/base-standard/ui/debug/hud-debug-widgets.js` 注册了大量 HUD 调试控件，可动态禁用 UI 面板：

| 控件 ID | 说明 |
|---------|------|
| `disableHUD` | 禁用整个 HUD |
| `disableCityBanners` | 禁用城市横幅 |
| `panel-sub-system-dock` | 禁用子系统停靠栏 |
| `panel-mini-map` | 禁用小地图 |
| `panel-system-bar` | 禁用系统栏 |
| `panel-diplo-ribbon` | 禁用外交条 |
| `panel-action` | 禁用操作面板 |
| `panel-notification-train` | 禁用通知队列 |

## 相关全局对象

| 对象 | 说明 |
|------|------|
| `engine.on("DebugWidgetUpdated", callback)` | 监听调试控件值变化 |
| `Autoplay` | 自动播放/观察模式，详见 [Autoplay](./autoplay.md) |
| `Automation` | 自动化测试框架，详见 [Automation](./automation.md) |
| `Configuration` | 用户配置与调试设置，详见 [Configuration](./configuration.md) |

<API id="UI.Debug.registerWidget"><h3>UI.Debug.registerWidget(widget)</h3>

**说明**: 注册调试控件到 Live Tuner 面板。控件在面板中显示为可交互的开关/输入项，类型由 `domainType` 决定。

| 参数名 | 类型 | 说明 |
|------|------|------|
| widget | `Object` | 调试控件对象，需包含 `id`、`category`、`caption`、`domainType`、`value` 字段 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/input/plot-cursor.js
// 注册一个布尔型调试控件用于禁用光效
UI.Debug.registerWidget({
  id: "hidePlotVFX",
  category: "Tuning",
  caption: "Hide Plot VFX",
  domainType: "bool",
  value: false
});
```

</API>
<API id="UI.Debug.deleteWidget"><h3>UI.Debug.deleteWidget(id)</h3>

**说明**: 从 Live Tuner 面板中移除指定 ID 的调试控件。通常在组件卸载时调用，防止面板残留无效控件。

| 参数名 | 类型 | 说明 |
|------|------|------|
| id | `string` | 要移除的控件 ID |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui-next/utilities/debug-widgets.js
// 组件卸载时自动移除调试控件
onMount(() => {
  UI.Debug.registerWidget(widget);
  onCleanup(() => {
    UI.Debug.deleteWidget(widget.id);
  });
});
```

</API>
<API id="UI.Debug.getWidgetValue"><h3>UI.Debug.getWidgetValue(id)</h3>

**说明**: 获取调试控件的当前值。控件未注册时返回 `undefined`。

| 参数名 | 类型 | 说明 |
|------|------|------|
| id | `string` | 控件 ID |

**返回值**: `any` — 控件的当前值，类型取决于 `domainType`。未注册时返回 `undefined`。

**使用示例**:

```javascript
// 来源 modules/core/ui-next/services/audio-support.js
// 读取调试控件决定是否输出详细日志
const shouldLogVerbose = UI.Debug.getWidgetValue("logAudioRuleConstraintMatching");
if (shouldLogVerbose) {
  console.log("Constraint details:", constraintData);
}
```

</API>
<API id="UI.Debug.markImagesAsPreloaded"><h3>UI.Debug.markImagesAsPreloaded(urls)</h3>

**说明**: 标记一批图片 URL 为已预加载状态，跳过后续缓存检查。用于调试图片加载性能。

| 参数名 | 类型 | 说明 |
|------|------|------|
| urls | `string[]` | 图片 URL 数组 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui-next/components/image-cache.js
// 标记图片为已预加载
UI.Debug.markImagesAsPreloaded(urls2);
```

</API>