---
title: Component 基类
doc_type: other
summary: 所有 UI 组件的基类，定义生命周期、焦点管理、属性变更、音效播放和 ComponentRoot 根元素等核心功能。
primary_scope:
  - Component
  - ComponentRoot
  - ComponentID
related_scope:
  - LiteEvent
  - Subject
  - asyncLoad
  - delayByFrame
  - waitForLayout
  - waitUntilValue
  - removeAllChildren
source:
  - modules/core/ui/component-support.js
  - modules/core/ui/panel-support.js
  - modules/core/ui/utilities/utilities-component-id.js
  - modules/core/ui/components/fxs-radio-button.js
  - modules/core/ui/components/fxs-close-button.js
doc_update: 2026-06-06
---

# Component 基类

所有 UI 组件的基类。每个 UI 组件（面板、屏幕、弹窗等）都继承自 `Component`。

```javascript
// 来源 modules/core/ui/component-support.js
// 自定义组件继承 Component 基类，实现生命周期方法
class MyPanel extends Component {
  onInitialize() {
    // 组件首次初始化时调用（仅一次）
  }

  onAttach() {
    super.onAttach();
    // 组件挂载到 DOM 时调用（每次）
    engine.on('CityAddedToMap', this.onCityAdded, this);
  }

  onDetach() {
    // 组件从 DOM 移除时调用
    engine.off('CityAddedToMap', this.onCityAdded, this);
    super.onDetach();
  }
}
```

## 方法列表

| 方法 | 参数 | 返回值 | 说明 |
|------|------|------|------|
| <API>Component.onInitialize</API> | — | `void` | 组件首次创建时调用，仅执行一次 |
| <API>Component.onAttach</API> | — | `void` | 组件挂载到 DOM 时调用，可多次触发 |
| <API>Component.postOnAttach</API> | — | `void` | `onAttach()` 之后立即调用，不要覆盖此方法 |
| <API>Component.onDetach</API> | — | `void` | 组件从 DOM 移除时调用 |
| <API>Component.Destroy</API> | — | `void` | 组件永久销毁，清理事件监听器并移除 DOM |
| <API>Component.Root</API> | — | `ComponentRoot` | 组件的根 DOM 元素（HTMLElement 子类） |
| <API>Component.audioGroup</API> | — | `string` | 音频组名称，用于播放音效 |
| <API>Component.onReceiveFocus</API> | — | `void` | 手柄焦点获取时调用 |
| <API>Component.onLoseFocus</API> | — | `void` | 手柄焦点丢失时调用 |
| <API>Component.onDeactivated</API> | — | `void` | 其他组件激活时被调用（需注册事件） |
| <API>Component.onAttributeChanged</API> | name, oldValue, newValue | `void` | 属性变更回调（需在组件定义中声明属性） |
| <API>Component.playSound</API> | id, idKeyAttr | `void` | 播放音效 |

## ComponentRoot 根元素

`ComponentRoot` 继承自 `HTMLElement`，是每个组件的 DOM 根元素，通过 `Component.Root` 访问。

```javascript
// 来源 modules/core/ui/component-support.js
// ComponentRoot 在构造函数中接收组件类型名，自动管理焦点、事件和生命周期
class ComponentRoot extends HTMLElement {
  constructor(typeName) {
    super();
    this._typeName = typeName;
  }
}
```

| 方法 | 参数 | 返回值 | 说明 |
|------|------|------|------|
| <API>ComponentRoot.receiveFocus</API> | — | `void` | 触发焦点获取，调用组件的 `onReceiveFocus()` |
| <API>ComponentRoot.loseFocus</API> | — | `void` | 触发焦点丢失，调用组件的 `onLoseFocus()` |
| <API>ComponentRoot.destroy</API> | — | `void` | 销毁组件，调用组件的 `Destroy()` |
| <API>ComponentRoot.listenForEngineEvent</API> | name, callback, context | `void` | 注册引擎事件，组件销毁时自动清理 |
| <API>ComponentRoot.listenForWindowEvent</API> | name, callback, useCapture | `void` | 注册 window 事件，组件销毁时自动清理 |
| <API>ComponentRoot.redirectChildrenToContent</API> | elOrFunc | `void` | 重定向子节点到指定元素（仅在 onAttach 中使用） |
| <API>ComponentRoot.initialize</API> | — | `void` | 初始化组件，触发 `onInitialize()` |

## ComponentID 组件ID

`ComponentID` 是全局对象，用于创建、解析、比较游戏对象的唯一标识符。每个 ComponentID 由 `owner`（玩家ID）、`type`（对象类型）和 `id`（对象ID）三部分组成。

```javascript
// 来源 modules/base-standard/ui/city-banners/city-banner-manager.js
// 创建城市 ComponentID 并转为位域
const cityCID = ComponentID.make(playerID, ComponentIDTypes.CITY, cityID);
const bitfield = ComponentID.toBitfield(cityCID);

// 来源 modules/core/ui/utilities/utilities-databinding.js
// 从字符串解析 ComponentID
const parsedID = ComponentID.fromString(attrValue);
if (ComponentID.isValid(parsedID)) {
  // 使用有效 ID
}

// 来源 modules/core/ui/utilities/utilities-data.js
// 比较两个 ComponentID 是否匹配
if (ComponentID.isMatch(route.leftCityID, cityId)) {
  // 处理匹配
}
```

| 方法 | 参数 | 返回值 | 说明 |
|------|------|------|------|
| <API>ComponentID.make</API> | owner, type, id | `ComponentID` | 创建新的 ComponentID 对象 |
| <API>ComponentID.toString</API> | id | `string` | 将 ComponentID 转为字符串（格式 `owner;id;type`） |
| <API>ComponentID.fromString</API> | str | `ComponentID` | 从字符串解析 ComponentID，失败返回 invalidID |
| <API>ComponentID.isMatch</API> | id1, id2 | `bool` | 比较两个 ComponentID 是否完全匹配 |
| <API>ComponentID.isValid</API> | id | `bool` | 检查 ComponentID 是否有效（owner 和 id 不为 -1） |
| <API>ComponentID.isInvalid</API> | id | `bool` | 检查 ComponentID 是否为无效 ID |
| <API>ComponentID.getInvalidID</API> | — | `ComponentID` | 获取全局无效 ID 单例 `{owner:-1, id:-1, type:0}` |
| <API>ComponentID.toLogString</API> | id | `string` | 转为可读日志字符串（如 `CITY:1:65536`） |
| <API>ComponentID.isInstanceOf</API> | thing | `bool` | 检查对象是否具有 ComponentID 结构（owner + id） |

## 子对象/子系统

### LiteEvent

轻量级事件系统，用于组件间通信。

| 方法 | 说明 |
|------|------|
| `on(handler)` | 注册事件处理器 |
| `off(handler)` | 移除事件处理器 |
| `trigger(data)` | 触发事件 |
| `expose()` | 暴露事件实例 |

### Subject

可观察值，值变更时自动通知所有订阅者。

| 方法 | 说明 |
|------|------|
| `get value` | 获取当前值 |
| `set value(data)` | 设置值并通知所有订阅者 |
| `on(handler)` | 注册变更处理器（立即触发一次） |
| `off(handler)` | 移除变更处理器 |

### 工具函数

| 函数 | 参数 | 说明 |
|------|------|------|
| `asyncLoad(url)` | url: string | 异步加载文件，返回 Promise |
| `delayByFrame(cb, count)` | cb: function, count: int | 延迟指定帧数后执行回调 |
| `waitForLayout(cb)` | cb: function | 等待布局完成后执行（默认延迟 2 帧） |
| `waitUntilValue(f, maxFrames)` | f: function, maxFrames: int | 等待函数返回非空值 |
| `removeAllChildren(container)` | container: HTMLElement | 清空容器所有子元素 |

<API id="Component.onInitialize"><h3>Component.onInitialize()</h3>

**说明**: 组件首次创建时调用，仅执行一次。适合进行一次性初始化，如 DOM 渲染、状态初始化等。

**参数**: 无

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/mp-additional-content/mp-additional-content.js
// 初始化时查询 DOM 子元素并设置音频组
onInitialize() {
  this.titleText = MustGetElement(".font-title", this.Root);
  this.frame = MustGetElement("fxs-modal-frame", this.Root);
  this.closeButton = MustGetElement(".mp-additional-content__close-button", this.Root);
  this.Root.setAttribute("data-audio-group-ref", "audio-mp-additional-content");
}
```

</API>

<API id="Component.onAttach"><h3>Component.onAttach()</h3>

**说明**: 组件挂载到 DOM 时调用，每次挂载都会触发。适合注册事件监听器、订阅引擎事件等。

**参数**: 无

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/components/fxs-close-button.js
// 挂载时注册引擎输入事件、窗口事件和鼠标事件
onAttach() {
  super.onAttach();
  this.Root.addEventListener("mouseenter", this.playSound.bind(this, "data-audio-focus", "data-audio-focus-ref"));
  window.addEventListener(ActiveDeviceTypeChangedEventName, this.activeDeviceTypeListener, true);
  this.Root.addEventListener("engine-input", this.engineInputListener);
}
```

</API>

<API id="Component.postOnAttach"><h3>Component.postOnAttach()</h3>

**说明**: `onAttach()` 之后立即调用，负责处理组件定义中声明的属性初始值。**此方法不应被子类覆盖**，覆盖时也必须调用 `super.postOnAttach()`。

**参数**: 无

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/panel-support.js
// Panel 的 postOnAttach 标志 attach 完成
postOnAttach() {
  super.postOnAttach();
  this.inAttach = false;
}
```

</API>

<API id="Component.onDetach"><h3>Component.onDetach()</h3>

**说明**: 组件从 DOM 移除时调用，适合清理事件监听器和资源。组件可能后续重新挂载，不应在此处做永久销毁。

**参数**: 无

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/components/fxs-radio-button.js
// 卸载时移除注册的事件监听器
onDetach() {
  window.removeEventListener("radio-button-change", this.radioButtonChangeEventListener);
  this.Root.removeEventListener("engine-input", this.engineInputEventListener);
  this.Root.removeEventListener("mouseenter", this.mouseEnterEventListener);
  super.onDetach();
}
```

</API>

<API id="Component.Destroy"><h3>Component.Destroy()</h3>

**说明**: 组件永久销毁，清理事件监听器并从 DOM 中移除根元素。调用后组件不可再使用。

**参数**: 无

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/city-banners/city-banners.js
// 移除组件时调用 Destroy 进行清理
remove() {
  this.Destroy();
}
```

</API>

<API id="Component.Root"><h3>Component.Root</h3>

**说明**: 组件的根 DOM 元素，类型为 `ComponentRoot`（继承自 `HTMLElement`）。在构造函数中由 `ComponentRoot` 传入，组件通过此属性访问和操作 DOM。

**参数**: 无

**返回值**: `ComponentRoot`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/mp-additional-content/mp-additional-content.js
// 通过 this.Root 查询子元素、设置属性、注册事件
onInitialize() {
  this.titleText = MustGetElement(".font-title", this.Root);
  this.Root.setAttribute("data-audio-group-ref", "audio-mp-additional-content");
}
onAttach() {
  this.Root.addEventListener(InputEngineEventName, this.engineInputListener);
}
```

</API>

<API id="Component.audioGroup"><h3>Component.audioGroup</h3>

**说明**: 音频组名称，用于 `playSound()` 方法查找对应的音效配置。可通过 `data-audio-group-ref` 属性指定，或自动从 `audio-{typeName}` 推断。

**参数**: 无

**返回值**: `string | null`

**使用示例**:

```javascript
// 来源 modules/core/ui/component-support.js
// playSound 内部使用 this.audioGroup 查找音效配置
playSound(id, idKeyAttr) {
  const group = this.audioGroup;
  id = idKeyAttr ? this.Root.getAttribute(idKeyAttr) ?? id : id;
  const soundTag = group ? Component.audio[group]?.[id] : Component.audio["audio-base"][id];
  if (soundTag) {
    UI.sendAudioEvent(soundTag);
  }
}
```

</API>

<API id="Component.onReceiveFocus"><h3>Component.onReceiveFocus()</h3>

**说明**: 手柄焦点获取时调用。默认实现为根元素添加 `trigger-nav-help` CSS 类。

**参数**: 无

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/create-panels/advanced-options-base.js
// 获取焦点时做额外处理，然后调用父类方法
onReceiveFocus() {
  // 自定义焦点处理逻辑
  super.onReceiveFocus();
}
```

</API>

<API id="Component.onLoseFocus"><h3>Component.onLoseFocus()</h3>

**说明**: 手柄焦点丢失时调用。默认实现为根元素移除 `trigger-nav-help` CSS 类。

**参数**: 无

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/create-panels/advanced-options-base.js
// 丢失焦点时清空导航托盘，然后调用父类方法
onLoseFocus() {
  NavTray.clear();
  super.onLoseFocus();
}
```

</API>

<API id="Component.onDeactivated"><h3>Component.onDeactivated()</h3>

**说明**: 当另一个组件被激活时，在当前激活组件上调用。需要组件注册了 `set-activated-component` 事件才会被触发。

**参数**: 无

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/context-manager/context-manager.js
// 当其他组件激活时，通知上一个组件失活
setLastActivatedComponent(component) {
  if (this.lastActivatedComponent != component) {
    if (this.lastActivatedComponent) {
      this.lastActivatedComponent.onDeactivated();
    }
    this.lastActivatedComponent = component;
  }
}
```

</API>

<API id="Component.onAttributeChanged"><h3>Component.onAttributeChanged(name, oldValue, newValue)</h3>

**说明**: DOM 属性变更回调。只有在组件定义中通过 `attributes` 字段声明的属性才会触发此回调。

| 参数名 | 类型 | 说明 |
|------|------|------|
| name | `string` | 变更的属性名 |
| oldValue | `string` | 变更前的值 |
| newValue | `string` | 变更后的值 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/components/fxs-stateful-icon.js
// 根据属性变更切换图标状态
onAttributeChanged(name, oldValue, newValue) {
  switch (name) {
    case "data-state":
      if (this.controller.isValidState(newValue)) {
        this.controller.state = newValue;
      }
      break;
    default:
      super.onAttributeChanged(name, oldValue, newValue);
  }
  super.onAttributeChanged(name, oldValue, newValue);
}
```

</API>

<API id="Component.playSound"><h3>Component.playSound(id, idKeyAttr)</h3>

**说明**: 播放音效。根据当前组件的 `audioGroup` 查找对应的音效配置。

| 参数名 | 类型 | 说明 |
|------|------|------|
| id | `string` | 音效 ID，对应音频配置中的键名 |
| idKeyAttr | `string` | 可选，从 DOM 属性读取音效 ID 的属性名 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/components/fxs-radio-button.js
// 播放按下和激活音效
playPressSound() {
  this.playSound("data-audio-press", "data-audio-press-ref");
}
// 激活时播放
this.playSound("data-audio-activate", "data-audio-activate-ref");
```

</API>

<API id="ComponentRoot.receiveFocus"><h3>ComponentRoot.receiveFocus()</h3>

**说明**: 触发焦点获取，调用组件的 `onReceiveFocus()` 方法。

**参数**: 无

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/component-support.js
// 事件管理器调用 receiveFocus 触发焦点获取
receiveFocus() {
  this._component?.onReceiveFocus();
}
```

</API>

<API id="ComponentRoot.loseFocus"><h3>ComponentRoot.loseFocus()</h3>

**说明**: 触发焦点丢失，调用组件的 `onLoseFocus()` 方法。

**参数**: 无

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/component-support.js
// 事件管理器调用 loseFocus 触发焦点丢失
loseFocus() {
  this._component?.onLoseFocus();
}
```

</API>

<API id="ComponentRoot.destroy"><h3>ComponentRoot.destroy()</h3>

**说明**: 销毁组件，调用组件的 `Destroy()` 方法进行永久清理。

**参数**: 无

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/component-support.js
// 销毁组件，清理事件监听器并移除 DOM
destroy() {
  this._component?.Destroy();
}
```

</API>

<API id="ComponentRoot.listenForEngineEvent"><h3>ComponentRoot.listenForEngineEvent(name, callback, context)</h3>

**说明**: 注册引擎事件监听器，组件销毁时自动清理。

| 参数名 | 类型 | 说明 |
|------|------|------|
| name | `string` | 引擎事件名 |
| callback | `function` | 回调函数 |
| context | `object` | 回调上下文（this） |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/component-support.js
// 在 onAttach 中通过 ComponentRoot 注册引擎事件
onAttach() {
  this.Root.listenForEngineEvent('CityAddedToMap', this.onCityAdded, this);
}
```

</API>

<API id="ComponentRoot.listenForWindowEvent"><h3>ComponentRoot.listenForWindowEvent(name, callback, useCapture)</h3>

**说明**: 注册 window 事件监听器，组件销毁时自动清理。

| 参数名 | 类型 | 说明 |
|------|------|------|
| name | `string` | 事件名 |
| callback | `function` | 回调函数 |
| useCapture | `bool` | 是否使用捕获阶段 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/component-support.js
// 注册 window 级别的键盘事件
this.Root.listenForWindowEvent("keydown", this.onKeyDown, true);
```

</API>

<API id="ComponentRoot.redirectChildrenToContent"><h3>ComponentRoot.redirectChildrenToContent(elOrFunc)</h3>

**说明**: 重定向子节点到指定元素。**必须在 `onAttach()` 中调用**，否则抛出异常。

| 参数名 | 类型 | 说明 |
|------|------|------|
| elOrFunc | `HTMLElement` \| `function` | 目标容器元素或接收子节点的回调函数 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/component-support.js
// 在 onAttach 中将子节点重定向到内容容器
onAttach() {
  this.Root.redirectChildrenToContent(this.contentContainer);
}
```

</API>

<API id="ComponentRoot.initialize"><h3>ComponentRoot.initialize()</h3>

**说明**: 初始化组件，触发 `onInitialize()` 生命周期方法。

**参数**: 无

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/component-support.js
// 组件首次连接到 DOM 时自动调用 initialize
initialize() {
  this._component?.onInitialize();
}
```

</API>

<API id="ComponentID.make"><h3>ComponentID.make(owner, type, id)</h3>

**说明**: 创建新的 ComponentID 对象。ComponentID 由 `owner`（玩家ID）、`type`（对象类型枚举）和 `id`（对象ID）三部分组成。

| 参数名 | 类型 | 说明 |
|------|------|------|
| owner | `int` | 所属玩家 ID |
| type | `int` | 对象类型（如 `ComponentIDTypes.CITY`=1、`ComponentIDTypes.UNIT`=26） |
| id | `int` | 对象 ID |

**返回值**: `ComponentID` — `{ owner, type, id }` 对象

**使用示例**:

```javascript
// 来源 modules/base-standard/ui-next/screens/victories/victories-screen-model.js
// 创建城市 ComponentID
const cityId = ComponentID.make(player.id, ComponentIDTypes.CITY, score.id);
// 来源 modules/base-standard/ui/city-banners/city-banner-manager.js
// 创建城市 ComponentID 并转为位域
const cityCID = ComponentID.make(data.cityState, ComponentIDTypes.CITY, 65536);
const bitfield = ComponentID.toBitfield(cityCID);
```

</API>

<API id="ComponentID.toString"><h3>ComponentID.toString(id)</h3>

**说明**: 将 ComponentID 对象转为字符串表示，格式为 `owner;id;type`。

| 参数名 | 类型 | 说明 |
|------|------|------|
| id | `ComponentID` | ComponentID 对象 |

**返回值**: `string` — 格式 `"owner;id;type"`，无效时返回 `""`

**使用示例**:

```javascript
// 来源 modules/core/ui/utilities/utilities-component-id.js
// 将 ComponentID 转为字符串
const str = ComponentID.toString({ owner: 1, type: 1, id: 65536 });
// 返回 "1;65536;1"
```

</API>

<API id="ComponentID.fromString"><h3>ComponentID.fromString(str)</h3>

**说明**: 从字符串解析 ComponentID 对象。解析失败或空字符串时返回 `getInvalidID()`。

| 参数名 | 类型 | 说明 |
|------|------|------|
| str | `string` | 格式为 `"owner;id;type"` 的字符串 |

**返回值**: `ComponentID` — 解析成功返回 `{ owner, type, id }`，失败返回 `invalidID`

**使用示例**:

```javascript
// 来源 modules/core/ui/components/fxs-hof-chart.js
// 从 DOM 属性解析 ComponentID
const attrValue = this.Root.getAttribute("data-filter-component-ID");
const componentID = ComponentID.fromString(attrValue);
```

</API>

<API id="ComponentID.isMatch"><h3>ComponentID.isMatch(id1, id2)</h3>

**说明**: 比较两个 ComponentID 是否完全匹配（owner、type、id 全部相等）。

| 参数名 | 类型 | 说明 |
|------|------|------|
| id1 | `ComponentID` | 第一个 ComponentID |
| id2 | `ComponentID` | 第二个 ComponentID |

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 modules/core/ui/utilities/utilities-data.js
// 判断贸易路线是否涉及指定城市
if (ComponentID.isMatch(route.leftCityID, cityId) || ComponentID.isMatch(route.rightCityID, cityId)) {
  // 处理涉及该城市的路线
}
```

</API>

<API id="ComponentID.isValid"><h3>ComponentID.isValid(id)</h3>

**说明**: 检查 ComponentID 是否有效（非 null 且 owner 和 id 不为 -1）。

| 参数名 | 类型 | 说明 |
|------|------|------|
| id | `ComponentID` | 待检查的 ComponentID |

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/production-chooser/production-chooser-helpers.js
// 检查当前城市 ID 是否有效
if (ComponentID.isValid(currentCity)) {
  // 执行需要有效城市 ID 的操作
}
```

</API>

<API id="ComponentID.isInvalid"><h3>ComponentID.isInvalid(id)</h3>

**说明**: 检查 ComponentID 是否为无效 ID（owner 和 id 均为 -1）。

| 参数名 | 类型 | 说明 |
|------|------|------|
| id | `ComponentID` | 待检查的 ComponentID |

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 modules/core/ui/utilities/utilities-component-id.js
// 判断是否为无效 ID
if (ComponentID.isInvalid(someID)) {
  console.warn("Received invalid ComponentID");
}
```

</API>

<API id="ComponentID.getInvalidID"><h3>ComponentID.getInvalidID()</h3>

**说明**: 获取全局无效 ID 单例。返回一个冻结的只读对象 `{ owner: -1, id: -1, type: 0 }`。

**参数**: 无

**返回值**: `ComponentID` — 冻结的无效 ID 对象

**使用示例**:

```javascript
// 来源 modules/core/ui/utilities/utilities-databinding.js
// 获取无效 ID 作为默认值
function databindRetrieveComponentID(target) {
  if (!foundID) {
    return ComponentID.getInvalidID();
  }
  return ComponentID.fromString(foundID);
}
```

</API>

<API id="ComponentID.toLogString"><h3>ComponentID.toLogString(id)</h3>

**说明**: 将 ComponentID 转为可读的日志字符串，格式为 `TYPE:owner:id`（如 `CITY:1:65536`）。

| 参数名 | 类型 | 说明 |
|------|------|------|
| id | `ComponentID` | ComponentID 对象 |

**返回值**: `string` — 如 `"CITY:1:65536"`，无效时返回 `"InvalidCID"`，null 时返回 `"NULL"`

**使用示例**:

```javascript
// 来源 modules/core/ui/utilities/utilities-image.js
// 调试时输出 ComponentID 的可读表示
console.error("Failed attempt to get a unit icon for unit cid: ", ComponentID.toLogString(componentID));
```

</API>

<API id="ComponentID.isInstanceOf"><h3>ComponentID.isInstanceOf(thing)</h3>

**说明**: 检查对象是否具有 ComponentID 的基本结构（拥有 `owner` 和 `id` 属性）。

| 参数名 | 类型 | 说明 |
|------|------|------|
| thing | `any` | 待检查的对象 |

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 modules/core/ui/utilities/utilities-component-id.js
// 判断对象是否为 ComponentID 实例
if (ComponentID.isInstanceOf(someObject)) {
  // 安全地将其作为 ComponentID 使用
  const id = someObject.id;
}
```

</API>