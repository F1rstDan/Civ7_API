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
