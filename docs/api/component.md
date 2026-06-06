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
| <API>Component.onInitialize</API> | 无 | `void` | 组件首次创建时调用，仅执行一次 |
| <API>Component.onAttach</API> | 无 | `void` | 组件挂载到 DOM 时调用，可多次触发 |
| <API>Component.postOnAttach</API> | 无 | `void` | `onAttach()` 之后立即调用，不要覆盖此方法 |
| <API>Component.onDetach</API> | 无 | `void` | 组件从 DOM 移除时调用 |
| <API>Component.Destroy</API> | 无 | `void` | 组件永久销毁，清理事件监听器并移除 DOM |
| <API>Component.Root</API> | — | `ComponentRoot` | 组件的根 DOM 元素（HTMLElement 子类） |
| <API>Component.audioGroup</API> | — | `string` | 音频组名称，用于播放音效 |
| <API>Component.onReceiveFocus</API> | 无 | `void` | 手柄焦点获取时调用 |
| <API>Component.onLoseFocus</API> | 无 | `void` | 手柄焦点丢失时调用 |
| <API>Component.onDeactivated</API> | 无 | `void` | 其他组件激活时被调用（需注册事件） |
| <API>Component.onAttributeChanged</API> | name, oldValue, newValue | `void` | 属性变更回调（需在组件定义中声明属性） |
| <API>Component.playSound</API> | id, idKeyAttr | `void` | 播放音效 |

## 子对象/子系统

### ComponentRoot（根元素）

`ComponentRoot` 继承自 `HTMLElement`，是每个组件的 DOM 根元素。

| 方法 | 说明 |
|------|------|
| `receiveFocus()` | 触发焦点获取 |
| `loseFocus()` | 触发焦点丢失 |
| `destroy()` | 销毁组件 |
| `listenForEngineEvent(name, cb, ctx)` | 注册引擎事件，组件销毁时自动清理 |
| `listenForWindowEvent(name, cb, capture)` | 注册 window 事件，组件销毁时自动清理 |
| `redirectChildrenToContent(el)` | 重定向子节点到指定元素（仅在 onAttach 中使用） |
| `initialize()` | 初始化组件 |

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