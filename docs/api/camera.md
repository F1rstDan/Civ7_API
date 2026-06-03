---
title: Camera 镜头
---

# Camera 镜头

相机控制的全局对象。用于控制视角移动、缩放、旋转等。从不通过 import 引入。

```javascript
// 跳转到指定地块
Camera.lookAtPlot(10, 20);

// 缩放相机
Camera.zoom(-1.0);

// 保存/恢复相机状态
Camera.pushCamera();
// ... 临时移动相机 ...
Camera.popCamera();
```

## 方法列表（共 30 个）

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Camera.lookAt</API> | location | `void` | 将相机移动到指定世界坐标 {x, y} |
| <API>Camera.lookAtPlot</API> | iX, iY | `void` | 将相机移动到指定地块坐标 |
| <API>Camera.zoom</API> | delta | `void` | 调整缩放级别（正放大，负缩小） |
| <API>Camera.rotate</API> | angle | `void` | 旋转相机视角 |
| <API>Camera.dragFocus</API> | dx, dy | `void` | 拖动镜头焦点 |
| <API>Camera.panFocus</API> | dx, dy | `void` | 平移镜头焦点 |
| <API>Camera.pushCamera</API> | — | `void` | 将当前相机状态压入栈 |
| <API>Camera.popCamera</API> | — | `void` | 从栈中恢复相机状态 |
| <API>Camera.pushDynamicCamera</API> | settings | `void` | 压入动态镜头 |
| <API>Camera.pushFlyoverCamera</API> | settings | `void` | 压入飞越镜头 |
| <API>Camera.reset</API> | — | `void` | 重置相机到默认状态 |
| <API>Camera.restoreDefaults</API> | — | `void` | 恢复默认设置 |
| <API>Camera.clearAnimation</API> | — | `void` | 清除当前动画 |
| <API>Camera.beginAnimation</API> | duration | `void` | 开始镜头动画 |
| <API>Camera.endAnimation</API> | — | `void` | 结束镜头动画 |
| <API>Camera.addKeyframe</API> | time, data | `void` | 添加关键帧 |
| <API>Camera.addKeyframe_Translate</API> | time, pos | `void` | 添加位移关键帧 |
| <API>Camera.addDeltaKeyframe</API> | time, delta | `void` | 添加增量关键帧 |
| <API>Camera.getState</API> | — | `object` | 获取当前相机状态 |
| <API>Camera.setId</API> | id | `void` | 设置镜头 ID |
| <API>Camera.setPreventMouseCameraMovement</API> | prevent | `void` | 禁止/恢复鼠标控制相机 |
| <API>Camera.setPreventMouseCameraZoom</API> | prevent | `void` | 禁用/启用鼠标滚轮缩放 |
| <API>Camera.pickPlot</API> | x, y | `object` | 从屏幕坐标拾取地块坐标 |
| <API>Camera.pickPlotFromPoint</API> | x, y | `Plot` | 从屏幕坐标获取地块 |
| <API>Camera.calculateCameraFocusAndZoom</API> | — | `object` | 计算镜头焦点和缩放 |
| <API>Camera.getMovementMultiplier</API> | — | `float` | 获取移动倍率 |
| <API>Camera.isWorldDragging</API> | — | `bool` | 是否正在拖拽世界 |
| <API>Camera.saveCameraZoom</API> | — | `void` | 保存当前缩放级别 |
| <API>Camera.restoreCameraZoom</API> | — | `void` | 恢复之前保存的缩放级别 |
| <API>Camera.findDynamicCameraSettings</API> | id | `object` | 查找动态镜头设置 |


<API id="Camera.addDeltaKeyframe" title="Camera.addDeltaKeyframe(time, delta)">

**说明**: 添加增量关键帧。

| 参数名 | 类型 | 说明 |
|------|------|------|
| time | `float` | 时间点 |
| delta | `object` | 增量数据 |

**返回值**: `void`

</API>

<API id="Camera.addKeyframe" title="Camera.addKeyframe(time, data)">

**说明**: 添加关键帧。

| 参数名 | 类型 | 说明 |
|------|------|------|
| time | `float` | 时间点 |
| data | `object` | 关键帧数据 |

**返回值**: `void`

</API>

<API id="Camera.addKeyframe_Translate" title="Camera.addKeyframe_Translate(time, pos)">

**说明**: 添加位移关键帧。

| 参数名 | 类型 | 说明 |
|------|------|------|
| time | `float` | 时间点 |
| pos | `object` | 位置数据 |

**返回值**: `void`

</API>

<API id="Camera.beginAnimation" title="Camera.beginAnimation(duration)">

**说明**: 开始镜头动画。通过 `addKeyframe` / `addDeltaKeyframe` 添加关键帧，`endAnimation` 结束。

| 参数名 | 类型 | 说明 |
|------|------|------|
| duration | `float` | 动画持续时间（秒） |

**返回值**: `void`

</API>

<API id="Camera.calculateCameraFocusAndZoom" title="Camera.calculateCameraFocusAndZoom()">

**说明**: 计算镜头焦点和缩放级别。用于城市缩放等需要精确计算的场景。

**参数**: 无

**返回值**: `object`

</API>

<API id="Camera.clearAnimation" title="Camera.clearAnimation()">

**说明**: 强制清除当前镜头动画。

**参数**: 无

**返回值**: `void`

</API>

<API id="Camera.dragFocus" title="Camera.dragFocus(dx, dy)">

**说明**: 拖动镜头焦点。用于鼠标拖拽世界地图时的镜头跟随。

| 参数名 | 类型 | 说明 |
|------|------|------|
| dx | `float` | X 偏移量 |
| dy | `float` | Y 偏移量 |

**返回值**: `void`

</API>

<API id="Camera.endAnimation" title="Camera.endAnimation()">

**说明**: 结束当前镜头动画，与 `beginAnimation` / `addKeyframe` 配合使用。

**参数**: 无

**返回值**: `void`

</API>

<API id="Camera.findDynamicCameraSettings" title="Camera.findDynamicCameraSettings(id)">

**说明**: 查找动态镜头配置。通过 ID 查找预设的镜头参数。

| 参数名 | 类型 | 说明 |
|------|------|------|
| id | `string` | 镜头配置 ID |

**返回值**: `object`

</API>

<API id="Camera.getMovementMultiplier" title="Camera.getMovementMultiplier()">

**说明**: 获取移动倍率。

**参数**: 无

**返回值**: `float`

</API>

<API id="Camera.getState" title="Camera.getState()">

**说明**: 获取当前相机状态。

**参数**: 无

**返回值**: `object`

</API>

<API id="Camera.isWorldDragging" title="Camera.isWorldDragging()">

**说明**: 是否正在拖拽世界。

**参数**: 无

**返回值**: `bool`

</API>

<API id="Camera.lookAt" title="Camera.lookAt(location)">

**说明**: 平滑移动相机到目标坐标。常用于 UI 点击跳转到某个地块或城市。

| 参数名 | 类型 | 说明 |
|------|------|------|
| location | `{x: number, y: number}` | 目标世界坐标 |

**返回值**: `void`

</API>

<API id="Camera.lookAtPlot" title="Camera.lookAtPlot(iX, iY)">

**说明**: 接受地块的 iX, iY 坐标，比 `lookAt` 更方便。

| 参数名 | 类型 | 说明 |
|------|------|------|
| iX | `int` | 地块 X 坐标 |
| iY | `int` | 地块 Y 坐标 |

**返回值**: `void`

</API>

<API id="Camera.panFocus" title="Camera.panFocus(dx, dy)">

**说明**: 平移镜头焦点。在迷你地图拖拽、边缘平移等场景中广泛使用。

| 参数名 | 类型 | 说明 |
|------|------|------|
| dx | `float` | X 偏移量 |
| dy | `float` | Y 偏移量 |

**返回值**: `void`

</API>

<API id="Camera.pickPlot" title="Camera.pickPlot(x, y)">

**说明**: 用于将鼠标/触屏位置转换为游戏地图上的地块坐标。

| 参数名 | 类型 | 说明 |
|------|------|------|
| x | `int` | 屏幕 X 坐标 |
| y | `int` | 屏幕 Y 坐标 |

**返回值**: `object`

</API>

<API id="Camera.pickPlotFromPoint" title="Camera.pickPlotFromPoint(x, y)">

**说明**: 从屏幕坐标获取地块。与 `pickPlot` 类似，但参数更明确。

| 参数名 | 类型 | 说明 |
|------|------|------|
| x | `int` | 屏幕 X 坐标 |
| y | `int` | 屏幕 Y 坐标 |

**返回值**: `Plot`

</API>

<API id="Camera.popCamera" title="Camera.popCamera()">

**说明**: 从栈中恢复相机状态，与 `pushCamera` 配对使用。

**参数**: 无

**返回值**: `void`

</API>

<API id="Camera.pushCamera" title="Camera.pushCamera()">

**说明**: 将当前相机状态压入栈，与 `popCamera` 配对使用实现相机状态保存和恢复。

**参数**: 无

**返回值**: `void`

</API>

<API id="Camera.pushDynamicCamera" title="Camera.pushDynamicCamera(settings)">

**说明**: 压入动态镜头设置。用于电影镜头、胜利画面等场景。

| 参数名 | 类型 | 说明 |
|------|------|------|
| settings | `object` | 动态镜头参数对象 |

**返回值**: `void`

</API>

<API id="Camera.pushFlyoverCamera" title="Camera.pushFlyoverCamera(settings)">

**说明**: 压入飞越镜头。用于过场动画中的俯瞰效果。

| 参数名 | 类型 | 说明 |
|------|------|------|
| settings | `object` | 飞越镜头参数对象 |

**返回值**: `void`

</API>

<API id="Camera.reset" title="Camera.reset()">

**说明**: 重置相机到默认状态。

**参数**: 无

**返回值**: `void`

</API>

<API id="Camera.restoreCameraZoom" title="Camera.restoreCameraZoom()">

**说明**: 恢复之前保存的缩放级别。

**参数**: 无

**返回值**: `void`

</API>

<API id="Camera.restoreDefaults" title="Camera.restoreDefaults()">

**说明**: 恢复相机到默认设置。在退出特殊镜头模式时使用。

**参数**: 无

**返回值**: `void`

</API>

<API id="Camera.rotate" title="Camera.rotate(angle)">

**说明**: 旋转相机视角。

| 参数名 | 类型 | 说明 |
|------|------|------|
| angle | `float` | 旋转角度 |

**返回值**: `void`

</API>

<API id="Camera.saveCameraZoom" title="Camera.saveCameraZoom()">

**说明**: 保存当前缩放级别。

**参数**: 无

**返回值**: `void`

</API>

<API id="Camera.setId" title="Camera.setId(id)">

**说明**: 设置镜头 ID。

| 参数名 | 类型 | 说明 |
|------|------|------|
| id | `string` | 镜头标识符 |

**返回值**: `void`

</API>

<API id="Camera.setPreventMouseCameraMovement" title="Camera.setPreventMouseCameraMovement(prevent)">

**说明**: 在 UI 弹窗或对话框打开时，通常需要禁止鼠标相机移动以避免误操作。

| 参数名 | 类型 | 说明 |
|------|------|------|
| prevent | `bool` | true=禁止，false=恢复 |

**返回值**: `void`

</API>

<API id="Camera.setPreventMouseCameraZoom" title="Camera.setPreventMouseCameraZoom(prevent)">

**说明**: 禁用或启用鼠标滚轮缩放。在需要锁定缩放级别的 UI 场景中使用。

| 参数名 | 类型 | 说明 |
|------|------|------|
| prevent | `bool` | true=禁用，false=启用 |

**返回值**: `void`

</API>

<API id="Camera.zoom" title="Camera.zoom(delta)">

**说明**: 调整缩放级别（正放大，负缩小）。

| 参数名 | 类型 | 说明 |
|------|------|------|
| delta | `float` | 缩放增量，正值为放大，负值为缩小 |

**返回值**: `void`

</API>

