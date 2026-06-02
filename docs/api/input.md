---
title: Input
---

# Input

输入系统 API。

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `setActiveContext` | context | `void` | 设置活跃输入上下文 |
| `getActiveContext` | — | `string` | 获取活跃输入上下文 |
| `getActionSortIndex` | action | `int` | 获取动作排序索引 |
| `getActiveDeviceType` | — | `string` | 获取活跃设备类型 |
| `getActionIdByName` | name | `int` | 根据名称获取动作 ID |
| `getGestureDisplayString` | gesture | `string` | 获取手势显示字符串 |
| `getActionDescription` | action | `string` | 获取动作描述 |
| `triggerForceFeedback` | intensity, duration | `void` | 触发力反馈 |
| `getActionName` | action | `string` | 获取动作名称 |
| `loadPreferences` | — | `void` | 加载输入偏好 |
| `isActionAllowed` | action | `bool` | 动作是否允许 |
