---
title: Input 输入
doc_type: object-api
summary: 输入系统 API，管理输入上下文、动作绑定、设备类型检测和力反馈。
primary_scope:
  - Input
related_scope:
  - InterfaceMode
source:
  - 源码 Input 对象分析
---

# Input 输入

输入系统 API，管理输入上下文、动作绑定、设备类型检测和力反馈。

```javascript
// 来源 源码 Input 对象
// 设置活跃输入上下文
Input.setActiveContext("context_name");
const currentContext = Input.getActiveContext();
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

---

<API id="Input.setActiveContext"><h3>Input.setActiveContext(context)</h3>

**说明**: 设置当前活跃的输入上下文，切换按键绑定的生效范围。

| 参数名 | 类型 | 说明 |
|------|------|------|
| context | `string` | 输入上下文名称 |

**返回值**: `void`

</API>

<API id="Input.getActiveContext"><h3>Input.getActiveContext()</h3>

**说明**: 获取当前活跃的输入上下文。

**参数**: 无

**返回值**: `string` — 当前输入上下文名称

</API>

<API id="Input.getActionSortIndex"><h3>Input.getActionSortIndex(action)</h3>

**说明**: 获取指定动作的排序索引。

| 参数名 | 类型 | 说明 |
|------|------|------|
| action | `string` | 动作名称 |

**返回值**: `int` — 排序索引

</API>

<API id="Input.getActiveDeviceType"><h3>Input.getActiveDeviceType()</h3>

**说明**: 获取当前活跃的输入设备类型（键盘、手柄等）。

**参数**: 无

**返回值**: `string` — 设备类型

</API>

<API id="Input.getActionIdByName"><h3>Input.getActionIdByName(name)</h3>

**说明**: 根据动作名称获取对应的动作 ID。

| 参数名 | 类型 | 说明 |
|------|------|------|
| name | `string` | 动作名称 |

**返回值**: `int` — 动作 ID

</API>

<API id="Input.getGestureDisplayString"><h3>Input.getGestureDisplayString(gesture)</h3>

**说明**: 获取手势的显示字符串。

| 参数名 | 类型 | 说明 |
|------|------|------|
| gesture | `string` | 手势标识 |

**返回值**: `string` — 手势显示字符串

</API>

<API id="Input.getActionDescription"><h3>Input.getActionDescription(action)</h3>

**说明**: 获取指定动作的描述文本。

| 参数名 | 类型 | 说明 |
|------|------|------|
| action | `string` | 动作名称 |

**返回值**: `string` — 动作描述

</API>

<API id="Input.triggerForceFeedback"><h3>Input.triggerForceFeedback(intensity, duration)</h3>

**说明**: 触发手柄力反馈（震动）。

| 参数名 | 类型 | 说明 |
|------|------|------|
| intensity | `number` | 震动强度 |
| duration | `number` | 震动持续时间 |

**返回值**: `void`

</API>

<API id="Input.getActionName"><h3>Input.getActionName(action)</h3>

**说明**: 获取指定动作的名称。

| 参数名 | 类型 | 说明 |
|------|------|------|
| action | `string` | 动作标识 |

**返回值**: `string` — 动作名称

</API>

<API id="Input.loadPreferences"><h3>Input.loadPreferences()</h3>

**说明**: 加载输入偏好设置。

**参数**: 无

**返回值**: `void`

</API>

<API id="Input.isActionAllowed"><h3>Input.isActionAllowed(action)</h3>

**说明**: 检查指定动作是否在当前上下文中允许执行。

| 参数名 | 类型 | 说明 |
|------|------|------|
| action | `string` | 动作名称 |

**返回值**: `bool` — 动作是否允许

</API>