---
title: Camera API
---

# Camera

镜头控制的全局对象。

```javascript
Camera.lookAt(10, 20);
Camera.pushCamera('world');
Camera.setPreventMouseCameraMovement(true);
```

## 方法列表（共 30 个）

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `lookAt` | x, y | `void` | 将镜头移动到指定坐标 |
| `lookAtPlot` | plot | `void` | 将镜头移动到指定地块 |
| `zoom` | delta | `void` | 缩放镜头 |
| `rotate` | delta | `void` | 旋转镜头 |
| `dragFocus` | dx, dy | `void` | 拖动镜头焦点 |
| `panFocus` | dx, dy | `void` | 平移镜头焦点 |
| `pushCamera` | cameraID | `void` | 压入镜头状态 |
| `popCamera` | — | `void` | 弹出镜头状态 |
| `pushDynamicCamera` | settings | `void` | 压入动态镜头 |
| `pushFlyoverCamera` | settings | `void` | 压入飞越镜头 |
| `reset` | — | `void` | 重置镜头 |
| `clearAnimation` | — | `void` | 清除当前动画 |
| `beginAnimation` | duration | `void` | 开始镜头动画 |
| `endAnimation` | — | `void` | 结束镜头动画 |
| `addKeyframe` | time, data | `void` | 添加关键帧 |
| `addKeyframe_Translate` | time, pos | `void` | 添加位移关键帧 |
| `addDeltaKeyframe` | time, delta | `void` | 添加增量关键帧 |
| `getState` | — | `object` | 获取当前镜头状态 |
| `setId` | id | `void` | 设置镜头 ID |
| `setPreventMouseCameraMovement` | prevent | `void` | 禁用/启用鼠标镜头移动 |
| `setPreventMouseCameraZoom` | prevent | `void` | 禁用/启用鼠标滚轮缩放 |
| `pickPlot` | — | `Plot` | 获取镜头中心的地块 |
| `pickPlotFromPoint` | x, y | `Plot` | 从屏幕坐标获取地块 |
| `calculateCameraFocusAndZoom` | — | `object` | 计算镜头焦点和缩放 |
| `getMovementMultiplier` | — | `float` | 获取移动倍率 |
| `isWorldDragging` | — | `bool` | 是否正在拖拽世界 |
| `saveCameraZoom` | — | `void` | 保存当前缩放 |
| `restoreCameraZoom` | — | `void` | 恢复保存的缩放 |
| `restoreDefaults` | — | `void` | 恢复默认设置 |
| `findDynamicCameraSettings` | id | `object` | 查找动态镜头设置 |
---
title: Camera API
---

# Camera

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

## 方法列表（共 12 个）

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `lookAt` | location | `void` | 将相机移动到指定世界坐标 {x, y} |
| `lookAtPlot` | iX, iY | `void` | 将相机移动到指定地块坐标 |
| `zoom` | delta | `void` | 调整缩放级别（正放大，负缩小） |
| `rotate` | angle | `void` | 旋转相机视角 |
| `pushCamera` | — | `void` | 将当前相机状态压入栈 |
| `popCamera` | — | `void` | 从栈中恢复相机状态 |
| `reset` | — | `void` | 重置相机到默认状态 |
| `setPreventMouseCameraMovement` | prevent | `void` | 禁止/恢复鼠标控制相机 |
| `pickPlot` | x, y | `object` | 从屏幕坐标拾取地块坐标 |
| `getState` | — | `object` | 获取当前相机状态 |
| `saveCameraZoom` | — | `void` | 保存当前缩放级别 |
| `restoreCameraZoom` | — | `void` | 恢复之前保存的缩放级别 |

## 详细说明

### `lookAt(location)`

平滑移动相机到目标坐标。常用于 UI 点击跳转到某个地块或城市。

### `lookAtPlot(iX, iY)`

接受地块的 iX, iY 坐标，比 `lookAt` 更方便。

### `setPreventMouseCameraMovement(prevent)`

在 UI 弹窗或对话框打开时，通常需要禁止鼠标相机移动以避免误操作。

### `pickPlot(x, y)`

用于将鼠标/触屏位置转换为游戏地图上的地块坐标。

### `pushCamera()` / `popCamera()`

配对使用，实现相机状态的保存和恢复。`pushCamera` 保存当前状态，`popCamera` 恢复。
