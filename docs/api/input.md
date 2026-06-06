---
title: Input 输入
doc_type: other
summary: 输入系统 API，管理输入上下文、动作绑定、设备类型检测和力反馈。
primary_scope:
  - Input
related_scope:
  - InterfaceMode
source:
  - modules/core/ui-next/services/input.js
  - modules/core/ui/input/hotkey-manager.js
  - modules/core/ui/input/cursor.js
  - modules/core/ui/input/action-handler.js
  - modules/core/ui/components/fxs-nav-help.js
doc_update: 2026-06-05
---

# Input 输入

输入系统 API，管理输入上下文、动作绑定、设备类型检测和力反馈。`Input` 为引擎注入的全局对象，无需手动引入。

```javascript
// 来源 modules/core/ui/input/hotkey-manager.js
// 根据当前输入上下文执行不同的快捷键处理逻辑
if (Input.getActiveContext() == InputContext.Unit) {
    // 单位选中状态下的快捷键
} else if (!ActionHandler.isGamepadActive && Input.getActiveContext() == InputContext.World) {
    // 世界地图模式下的快捷键
}
```

## 方法列表（共 11 个）

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Input.setActiveContext</API> | context | `void` | 设置活跃输入上下文 |
| <API>Input.getActiveContext</API> | — | `string` | 获取活跃输入上下文 |
| <API>Input.getActionSortIndex</API> | action | `int` | 获取动作排序索引 |
| <API>Input.getActiveDeviceType</API> | — | `string` | 获取活跃设备类型 |
| <API>Input.getActionIdByName</API> | name | `int` | 根据名称获取动作 ID |
| <API>Input.getGestureDisplayString</API> | gesture | `string` | 获取手势显示字符串 |
| <API>Input.getActionDescription</API> | action | `string` | 获取动作描述 |
| <API>Input.triggerForceFeedback</API> | intensity, duration | `void` | 触发力反馈 |
| <API>Input.getActionName</API> | action | `string` | 获取动作名称 |
| <API>Input.loadPreferences</API> | — | `void` | 加载输入偏好 |
| <API>Input.isActionAllowed</API> | action | `bool` | 动作是否允许 |

## 相关全局对象

| 对象 | 说明 |
|------|------|
| `InterfaceMode` | 界面模式管理，与 `Input` 配合切换输入上下文（如 `InterfaceMode.isInDefaultMode()`、`InterfaceMode.switchToDefault()`） |

---

<API id="Input.setActiveContext"><h3>Input.setActiveContext(context)</h3>

**说明**: 设置当前活跃的输入上下文，切换按键绑定的生效范围。

| 参数名 | 类型 | 说明 |
|------|------|------|
| context | `string` | 输入上下文名称（如 `InputContext.Shell`、`InputContext.World`、`InputContext.Dual`） |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/views/view-manager.js
// 切换视图时同步更新输入上下文
Input.setActiveContext(this.current.getInputContext());
```

```javascript
// 来源 modules/base-standard/ui/interface-modes/interface-mode-place-building.js
// 进入建造模式时切换到世界输入上下文
Input.setActiveContext(InputContext.World);
```

</API>

<API id="Input.getActiveContext"><h3>Input.getActiveContext()</h3>

**说明**: 获取当前活跃的输入上下文。

**参数**: 无

**返回值**: `string` — 当前输入上下文名称

**使用示例**:

```javascript
// 来源 modules/core/ui-next/services/input.js
// 创建信号以跟踪当前输入上下文
const [activeInputContext, setActiveInputContext] = createSignal(Input.getActiveContext());
```

```javascript
// 来源 modules/core/ui-next/components/tooltip-model.js
// 保存并恢复输入上下文
const currentContext = Input.getActiveContext();
```

</API>

<API id="Input.getActionSortIndex"><h3>Input.getActionSortIndex(action)</h3>

**说明**: 获取指定动作的排序索引。

| 参数名 | 类型 | 说明 |
|------|------|------|
| action | `string` | 动作名称 |

**返回值**: `int` — 排序索引

**使用示例**:

```javascript
// 获取动作排序索引用于快捷键列表排序
const sortIndex = Input.getActionSortIndex("action_name");
```

</API>

<API id="Input.getActiveDeviceType"><h3>Input.getActiveDeviceType()</h3>

**说明**: 获取当前活跃的输入设备类型（键盘、手柄等）。

**参数**: 无

**返回值**: `string` — 设备类型

**使用示例**:

```javascript
// 来源 modules/core/ui/input/cursor.js
// 根据设备类型调整光标行为
const deviceType = Input.getActiveDeviceType();
```

```javascript
// 来源 modules/core/ui/input/action-handler.js
// 动作处理器初始化时检测设备类型
this.deviceType = Input.getActiveDeviceType();
```

</API>

<API id="Input.getActionIdByName"><h3>Input.getActionIdByName(name)</h3>

**说明**: 根据动作名称获取对应的动作 ID。

| 参数名 | 类型 | 说明 |
|------|------|------|
| name | `string` | 动作名称 |

**返回值**: `int` — 动作 ID

**使用示例**:

```javascript
// 根据动作名称获取 ID 用于动作检查
const actionId = Input.getActionIdByName("action_name");
```

</API>

<API id="Input.getGestureDisplayString"><h3>Input.getGestureDisplayString(gesture)</h3>

**说明**: 获取手势的显示字符串。

| 参数名 | 类型 | 说明 |
|------|------|------|
| gesture | `string` | 手势标识 |

**返回值**: `string` — 手势显示字符串

**使用示例**:

```javascript
// 获取手势的显示文本用于 UI 提示
const displayStr = Input.getGestureDisplayString("gesture_name");
```

</API>

<API id="Input.getActionDescription"><h3>Input.getActionDescription(action)</h3>

**说明**: 获取指定动作的描述文本。

| 参数名 | 类型 | 说明 |
|------|------|------|
| action | `string` | 动作名称 |

**返回值**: `string` — 动作描述

**使用示例**:

```javascript
// 获取动作描述用于快捷键提示
const desc = Input.getActionDescription("action_name");
```

</API>

<API id="Input.triggerForceFeedback"><h3>Input.triggerForceFeedback(intensity, duration)</h3>

**说明**: 触发手柄力反馈（震动）。

| 参数名 | 类型 | 说明 |
|------|------|------|
| intensity | `number` | 震动强度 |
| duration | `number` | 震动持续时间 |

**返回值**: `void`

**使用示例**:

```javascript
// 触发手柄震动反馈
Input.triggerForceFeedback(0.5, 200);
```

</API>

<API id="Input.getActionName"><h3>Input.getActionName(action)</h3>

**说明**: 获取指定动作的名称。

| 参数名 | 类型 | 说明 |
|------|------|------|
| action | `string` | 动作标识 |

**返回值**: `string` — 动作名称

**使用示例**:

```javascript
// 获取动作用户友好名称
const name = Input.getActionName("action_name");
```

</API>

<API id="Input.loadPreferences"><h3>Input.loadPreferences()</h3>

**说明**: 加载输入偏好设置。

**参数**: 无

**返回值**: `void`

**使用示例**:

```javascript
// 加载玩家自定义的输入偏好
Input.loadPreferences();
```

</API>

<API id="Input.isActionAllowed"><h3>Input.isActionAllowed(action)</h3>

**说明**: 检查指定动作是否在当前上下文中允许执行。

| 参数名 | 类型 | 说明 |
|------|------|------|
| action | `string` | 动作名称 |

**返回值**: `bool` — 动作是否允许

**使用示例**:

```javascript
// 来源 modules/core/ui/components/fxs-nav-help.js
// 检查动作是否可在当前上下文中执行
const isAllowed = actionId != null && Input.isActionAllowed(actionId, Input.getActiveContext());
```

</API>