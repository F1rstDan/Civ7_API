---
title: Component 基类
doc_type: ui-api
summary: 所有 UI 组件的基类，定义生命周期、焦点管理、属性变更、音效播放和 ComponentRoot 根元素等核心功能。
primary_scope:
  - Component
related_scope:
  - ComponentRoot
  - LiteEvent
  - Subject
source:
  - modules/core/ui/component.js
---

# Component 基类

所有 UI 组件的基类。每个 UI 组件（面板、屏幕、弹窗等）都继承自 `Component`。

```javascript
// 来源 modules/core/ui/component.js
// 自定义组件继承 Component 基类
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

## 生命周期

| 阶段 | 方法 | 说明 |
|------|------|------|
| 初始化 | `onInitialize()` | 组件首次创建时调用，仅执行一次 |
| 挂载 | `onAttach()` | 组件挂载到 DOM 时调用，可多次触发 |
| 挂载后 | `postOnAttach()` | `onAttach()` 之后立即调用，不要覆盖此方法 |
| 卸载 | `onDetach()` | 组件从 DOM 移除时调用 |
| 销毁 | `Destroy()` | 组件永久销毁，清理事件监听器并移除 DOM |

## 属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `Root` | ComponentRoot | 组件的根 DOM 元素（HTMLElement 子类） |
| `audioGroup` | string | 音频组名称，用于播放音效 |

## 焦点方法

| 方法 | 说明 |
|------|------|
| `onReceiveFocus()` | 手柄焦点获取时调用 |
| `onLoseFocus()` | 手柄焦点丢失时调用 |
| `onDeactivated()` | 其他组件激活时被调用（需注册事件） |

## 属性变更

| 方法 | 参数 | 说明 |
|------|------|------|
| `onAttributeChanged()` | name, oldValue, newValue | 属性变更回调（需在组件定义中声明属性） |

## 音效

| 方法 | 参数 | 说明 |
|------|------|------|
| `playSound()` | id, idKeyAttr | 播放音效 |

## ComponentRoot（根元素）

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

## 辅助工具

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