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
| `lookAt` | location | `void` | 将相机移动到指定世界坐标 {x, y} |
| `lookAtPlot` | iX, iY | `void` | 将相机移动到指定地块坐标 |
| `zoom` | delta | `void` | 调整缩放级别（正放大，负缩小） |
| `rotate` | angle | `void` | 旋转相机视角 |
| `dragFocus` | dx, dy | `void` | 拖动镜头焦点 |
| `panFocus` | dx, dy | `void` | 平移镜头焦点 |
| `pushCamera` | — | `void` | 将当前相机状态压入栈 |
| `popCamera` | — | `void` | 从栈中恢复相机状态 |
| `pushDynamicCamera` | settings | `void` | 压入动态镜头 |
| `pushFlyoverCamera` | settings | `void` | 压入飞越镜头 |
| `reset` | — | `void` | 重置相机到默认状态 |
| `restoreDefaults` | — | `void` | 恢复默认设置 |
| `clearAnimation` | — | `void` | 清除当前动画 |
| `beginAnimation` | duration | `void` | 开始镜头动画 |
| `endAnimation` | — | `void` | 结束镜头动画 |
| `addKeyframe` | time, data | `void` | 添加关键帧 |
| `addKeyframe_Translate` | time, pos | `void` | 添加位移关键帧 |
| `addDeltaKeyframe` | time, delta | `void` | 添加增量关键帧 |
| `getState` | — | `object` | 获取当前相机状态 |
| `setId` | id | `void` | 设置镜头 ID |
| `setPreventMouseCameraMovement` | prevent | `void` | 禁止/恢复鼠标控制相机 |
| `setPreventMouseCameraZoom` | prevent | `void` | 禁用/启用鼠标滚轮缩放 |
| `pickPlot` | x, y | `object` | 从屏幕坐标拾取地块坐标 |
| `pickPlotFromPoint` | x, y | `Plot` | 从屏幕坐标获取地块 |
| `calculateCameraFocusAndZoom` | — | `object` | 计算镜头焦点和缩放 |
| `getMovementMultiplier` | — | `float` | 获取移动倍率 |
| `isWorldDragging` | — | `bool` | 是否正在拖拽世界 |
| `saveCameraZoom` | — | `void` | 保存当前缩放级别 |
| `restoreCameraZoom` | — | `void` | 恢复之前保存的缩放级别 |
| `findDynamicCameraSettings` | id | `object` | 查找动态镜头设置 |

## 详细说明

### `lookAt(location)`

平滑移动相机到目标坐标。常用于 UI 点击跳转到某个地块或城市。

### `lookAtPlot(iX, iY)`

接受地块的 iX, iY 坐标，比 `lookAt` 更方便。

### `panFocus(dx, dy)`

平移镜头焦点。在迷你地图拖拽、边缘平移等场景中广泛使用。

### `dragFocus(dx, dy)`

拖动镜头焦点。用于鼠标拖拽世界地图时的镜头跟随。

### `pushDynamicCamera(settings)`

压入动态镜头设置。用于电影镜头、胜利画面等场景。

### `pushFlyoverCamera(settings)`

压入飞越镜头。用于过场动画中的俯瞰效果。

### `findDynamicCameraSettings(id)`

查找动态镜头配置。通过 ID 查找预设的镜头参数。

### `pickPlotFromPoint(x, y)`

从屏幕坐标获取地块。与 `pickPlot` 类似，但参数更明确。

### `calculateCameraFocusAndZoom()`

计算镜头焦点和缩放级别。用于城市缩放等需要精确计算的场景。

### `setPreventMouseCameraMovement(prevent)`

在 UI 弹窗或对话框打开时，通常需要禁止鼠标相机移动以避免误操作。

### `setPreventMouseCameraZoom(prevent)`

禁用或启用鼠标滚轮缩放。在需要锁定缩放级别的 UI 场景中使用。

### `pickPlot(x, y)`

用于将鼠标/触屏位置转换为游戏地图上的地块坐标。

### `pushCamera()` / `popCamera()`

配对使用，实现相机状态的保存和恢复。`pushCamera` 保存当前状态，`popCamera` 恢复。

### `beginAnimation()` / `endAnimation()` / `clearAnimation()`

镜头动画系统。通过 `beginAnimation` 开始，`addKeyframe` / `addDeltaKeyframe` 添加关键帧，`endAnimation` 结束。`clearAnimation` 强制清除当前动画。

### `restoreDefaults()`

恢复相机到默认设置。在退出特殊镜头模式时使用。
