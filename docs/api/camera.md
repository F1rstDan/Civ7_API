---
title: Camera 镜头
doc_type: other
summary: 相机控制的全局对象，负责视角移动、缩放、旋转、动画以及鼠标交互控制。
primary_scope:
  - Camera
related_scope:
  - WorldUI.ForegroundCamera
source:
  - modules/core/ui/camera/camera-controller.js
  - modules/base-standard/ui/city-zoomer/city-zoomer.js
  - modules/base-standard/ui/cinematic/cinematic-manager.js
  - modules/core/ui/views/view-manager.js
  - modules/core/ui/input/plot-cursor.js
  - modules/core/ui/shell/leader-select/leader-select-model-manager.js
  - modules/base-standard/ui/automation/automation-base-play-game.js
  - modules/base-standard/ui/root-game.js
  - modules/base-standard/ui-next/screens/endgame/endgame-cinematics.js
  - modules/base-standard/ui/diplomacy/leader-model-manager.js
  - modules/base-standard/ui/narrative-event/graphic-narrative-event.js
  - TunerPanels/Districts.ltp
  - TunerPanels/Units.ltp
  - TunerPanels/Cities.ltp
  - TunerPanels/Features.ltp
doc_update: 2026-06-05
---

# Camera 镜头

相机控制的全局对象。用于控制视角移动、缩放、旋转、动画等。从不通过 import 引入。

```javascript
// 来源 modules/base-standard/ui/root-game.js
// 跳转到指定世界坐标
Camera.lookAt(cameraState.focusPoint.x, cameraState.focusPoint.y);

// 来源 TunerPanels/Units.ltp
// 跳转到指定地块
Camera.lookAtPlot(unit.location);

// 来源 modules/core/ui/camera/camera-controller.js
// 设置绝对缩放级别
Camera.zoom(0.5);

// 来源 modules/core/ui/shell/leader-select/leader-select-model-manager.js
// 保存/恢复相机状态
Camera.pushCamera(cameraPos, subjectPos);
// ... 临时移动相机 ...
Camera.popCamera();
```

## 方法列表（共 24 个）

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Camera.lookAt</API> | x, y, params? | `void` | 将相机移动到指定世界坐标 |
| <API>Camera.lookAtPlot</API> | iX, iY, params? | `void` | 将相机移动到指定地块坐标 |
| <API>Camera.zoom</API> | level | `void` | 设置绝对缩放级别（0~1） |
| <API>Camera.rotate</API> | angle, isRelative | `void` | 旋转相机视角 |
| <API>Camera.dragFocus</API> | dx, dy | `void` | 拖动镜头焦点 |
| <API>Camera.panFocus</API> | panAmount, ... | `void` | 平移镜头焦点 |
| <API>Camera.pushCamera</API> | cameraPos, subjectPos | `void` | 将当前相机状态压入栈 |
| <API>Camera.popCamera</API> | — | `void` | 从栈中恢复相机状态 |
| <API>Camera.pushDynamicCamera</API> | plot, settings | `void` | 压入动态镜头 |
| <API>Camera.pushFlyoverCamera</API> | plot, settings | `void` | 压入飞越镜头 |
| <API>Camera.restoreDefaults</API> | — | `void` | 恢复默认设置 |
| <API>Camera.clearAnimation</API> | — | `void` | 清除当前动画 |
| <API>Camera.addKeyframe</API> | keyframe | `void` | 添加关键帧 |
| <API>Camera.getState</API> | — | `object` | 获取当前相机状态 |
| <API>Camera.setPreventMouseCameraMovement</API> | prevent | `void` | 禁止/恢复鼠标控制相机 |
| <API>Camera.setPreventMouseCameraZoom</API> | prevent | `void` | 禁用/启用鼠标滚轮缩放 |
| <API>Camera.pickPlot</API> | x, y | `object` | 从屏幕比例坐标拾取地块坐标 |
| <API>Camera.pickPlotFromPoint</API> | x, y | `object` | 从屏幕像素坐标获取地块 |
| <API>Camera.calculateCameraFocusAndZoom</API> | plots, tilt, options | `object` | 计算镜头焦点和缩放 |
| <API>Camera.getMovementMultiplier</API> | — | `float` | 获取移动倍率 |
| <API>Camera.isWorldDragging</API> | — | `bool` | 是否正在拖拽世界 |
| <API>Camera.saveCameraZoom</API> | — | `void` | 保存当前缩放级别 |
| <API>Camera.restoreCameraZoom</API> | — | `void` | 恢复之前保存的缩放级别 |
| <API>Camera.findDynamicCameraSettings</API> | id | `object` | 查找动态镜头设置 |

## WorldUI.ForegroundCamera 前景镜头

2D 前景层的专用相机，用于领袖外交、叙事事件等 UI 场景中的 3D 模型渲染。与 `Camera`（世界相机）独立，支持独立的动画关键帧系统。

```javascript
// 来源 modules/base-standard/ui/diplomacy/leader-model-manager.js
// 重置前景相机，设置 FOV、相机位置和目标点
WorldUI.ForegroundCamera.reset(35, { x: 0, y: 0, z: 0 }, { x: 0, y: 1, z: 0 });

// 开始动画并添加关键帧
WorldUI.ForegroundCamera.beginAnimation({ cameraPos: cameraStart, subjectPos: subjectStart }, 0);
WorldUI.ForegroundCamera.addKeyframe_Translate({ x: 0, y: 0, z: 0 }, 0.1, 0);
WorldUI.ForegroundCamera.setId(LeaderModelManagerClass.FOREGROUND_CAMERA_IN_ID);
WorldUI.ForegroundCamera.endAnimation();
```

### 方法列表（共 6 个）

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>WorldUI.ForegroundCamera.reset</API> | fov, cameraPos, subjectPos | `void` | 重置前景相机到指定状态 |
| <API>WorldUI.ForegroundCamera.beginAnimation</API> | initialState, delay | `void` | 开始前景相机动画 |
| <API>WorldUI.ForegroundCamera.addDeltaKeyframe</API> | delta, duration, delay | `void` | 添加增量关键帧 |
| <API>WorldUI.ForegroundCamera.addKeyframe_Translate</API> | offset, duration, delay | `void` | 添加位移关键帧 |
| <API>WorldUI.ForegroundCamera.endAnimation</API> | — | `void` | 结束当前动画 |
| <API>WorldUI.ForegroundCamera.setId</API> | id | `void` | 设置镜头 ID |

<API id="Camera.addKeyframe"><h3>Camera.addKeyframe(keyframe)</h3>

**说明**: 添加关键帧。用于相机动画中设置目标状态，如城市缩放动画。

| 参数名 | 类型 | 说明 |
|------|------|------|
| keyframe | `object` | 关键帧配置对象，包含 `duration`、`focus`、`zoom`、`tilt`、`func`、`writeMask`、`end` 等字段 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/city-zoomer/city-zoomer.js
// 城市缩放时添加关键帧
const cameraFrame = {
  duration: 1,
  tilt: 30,
  focus: { x: calculatedFocus.x, y: calculatedFocus.y },
  zoom: utils.clamp(calculatedFocus.z, MAX_ZOOM, 1),
  func: InterpolationFunc.EaseOutSin,
  writeMask: KeyframeFlag.FLAG_ALL,
  end: true
};
Camera.addKeyframe(cameraFrame);
```

</API>

<API id="Camera.calculateCameraFocusAndZoom"><h3>Camera.calculateCameraFocusAndZoom(plots, tilt, options)</h3>

**说明**: 计算镜头焦点和缩放级别。用于城市缩放等需要精确计算相机参数的场景。

| 参数名 | 类型 | 说明 |
|------|------|------|
| plots | `array` | 地块列表 |
| tilt | `int` | 倾斜角度 |
| options | `object` | 可选配置，如 `{region}` |

**返回值**: `object` — 包含 `{x, y, z}` 的计算结果

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/city-zoomer/city-zoomer.js
// 计算城市缩放时的相机参数
const region = { min: { x: 0.275, y: 0.025 }, max: { x: 0.975, y: 0.975 } };
const calculatedFocus = Camera.calculateCameraFocusAndZoom(city.getPurchasedPlots(), 30, {
  region
});
```

</API>

<API id="Camera.clearAnimation"><h3>Camera.clearAnimation()</h3>

**说明**: 强制清除当前镜头动画。在退出特殊镜头模式时使用。

**参数**: 无

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/city-zoomer/city-zoomer.js
// 重置城市缩放时清除动画
Camera.restoreDefaults();
Camera.restoreCameraZoom();
Camera.clearAnimation();
```

</API>

<API id="Camera.dragFocus"><h3>Camera.dragFocus(dx, dy)</h3>

**说明**: 拖动镜头焦点。用于鼠标拖拽世界地图时的镜头跟随。

| 参数名 | 类型 | 说明 |
|------|------|------|
| dx | `float` | X 偏移量 |
| dy | `float` | Y 偏移量 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/camera/camera-controller.js
// 鼠标拖拽时更新镜头焦点
Camera.dragFocus(this.lastMouseDragPos, newMouseDragPos);
```

</API>

<API id="Camera.findDynamicCameraSettings"><h3>Camera.findDynamicCameraSettings(id)</h3>

**说明**: 查找动态镜头配置。通过 ID 查找预设的镜头参数。

| 参数名 | 类型 | 说明 |
|------|------|------|
| id | `string` | 镜头配置 ID |

**返回值**: `object`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/cinematic/cinematic-manager.js
// 查找默认镜头配置
const params = Camera.findDynamicCameraSettings("DEFAULT_CAMERA_SETTINGS");
```

</API>

<API id="Camera.getMovementMultiplier"><h3>Camera.getMovementMultiplier()</h3>

**说明**: 获取移动倍率。用于控制器/手柄光标移动时缩放速度。

**参数**: 无

**返回值**: `float`

**使用示例**:

```javascript
// 来源 modules/core/ui/input/plot-cursor.js
// 调整手柄光标移动速度
scale *= Camera.getMovementMultiplier();
```

</API>

<API id="Camera.getState"><h3>Camera.getState()</h3>

**说明**: 获取当前相机状态，包含缩放级别、焦点坐标等信息。

**参数**: 无

**返回值**: `object` — 包含 `zoomLevel`、`focusPoint` 等字段

**使用示例**:

```javascript
// 来源 modules/core/ui/camera/camera-controller.js
// 获取当前缩放级别用于计算新缩放值
const cameraState = Camera.getState();
const amount = Math.max(cameraState.zoomLevel - zoomRate * zoomValue, 0);
Camera.zoom(amount);
```

</API>

<API id="Camera.isWorldDragging"><h3>Camera.isWorldDragging()</h3>

**说明**: 是否正在拖拽世界。用于判断用户是否正在拖拽地图，通常用于压制 tooltip 显示。

**参数**: 无

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui-next/tooltips/plot-tooltip/plot-tooltip.js
// 拖拽时隐藏 tooltip
const isWorldDraggingNext = Camera.isWorldDragging();
```

</API>

<API id="Camera.lookAt"><h3>Camera.lookAt(x, y, params?)</h3>

**说明**: 平滑移动相机到目标世界坐标。常用于 UI 点击跳转到某个地块或城市。

| 参数名 | 类型 | 说明 |
|------|------|------|
| x | `number` | 目标世界 X 坐标 |
| y | `number` | 目标世界 Y 坐标 |
| params | `object` | 可选参数，如 `{zoom, instantaneous}` |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/root-game.js
// 时代过渡时恢复相机位置
const params = { zoom: cameraState.zoomLevel, instantaneous: true };
Camera.lookAt(cameraState.focusPoint.x, cameraState.focusPoint.y, params);
```

</API>

<API id="Camera.lookAtPlot"><h3>Camera.lookAtPlot(iX, iY, params?)</h3>

**说明**: 接受地块的 iX, iY 坐标，比 `lookAt` 更方便。接受可选的 params 对象控制缩放和动画。

| 参数名 | 类型 | 说明 |
|------|------|------|
| iX | `int` | 地块 X 坐标 |
| iY | `int` | 地块 Y 坐标 |
| params | `object` | 可选参数，如 `{zoom, tilt, instantaneous}` |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 TunerPanels/Units.ltp
// 跳转到单位所在位置
Camera.lookAtPlot(unit.location);

// 来源 modules/base-standard/ui/city-zoomer/city-zoomer.js
// 带缩放和倾斜参数跳转城市
Camera.lookAtPlot(city.location, { zoom: 1, tilt: 30 });
```

</API>

<API id="Camera.panFocus"><h3>Camera.panFocus(panAmount, ...)</h3>

**说明**: 平移镜头焦点。在迷你地图拖拽、边缘平移等场景中广泛使用。

| 参数名 | 类型 | 说明 |
|------|------|------|
| panAmount | `object` | 平移量 `{x, y}` |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/automation/automation-base-play-game.js
// 自动测试中平移镜头
const panAmount = { x: this.totalDistance, y: 0 };
Camera.panFocus(panAmount);

// 来源 modules/core/ui/input/plot-cursor.js
// 手柄控制平移
Camera.panFocus(delta, false);
```

</API>

<API id="Camera.pickPlot"><h3>Camera.pickPlot(x, y)</h3>

**说明**: 从屏幕比例坐标（0~1）转换为游戏地图上的地块坐标。用于将屏幕中心点等比例位置转换为地图坐标。

| 参数名 | 类型 | 说明 |
|------|------|------|
| x | `float` | 屏幕 X 比例（0~1） |
| y | `float` | 屏幕 Y 比例（0~1） |

**返回值**: `object`

**使用示例**:

```javascript
// 来源 modules/core/ui/input/plot-cursor.js
// 获取屏幕中心对应的地块坐标
const center = Camera.pickPlot(0.5, 0.5);
```

</API>

<API id="Camera.pickPlotFromPoint"><h3>Camera.pickPlotFromPoint(x, y)</h3>

**说明**: 从屏幕像素坐标获取地块。与 `pickPlot` 不同，此方法接受像素坐标而非比例坐标。

| 参数名 | 类型 | 说明 |
|------|------|------|
| x | `int` | 屏幕 X 像素坐标 |
| y | `int` | 屏幕 Y 像素坐标 |

**返回值**: `object` — 地块坐标信息

**使用示例**:

```javascript
// 来源 modules/core/ui/input/debug-input-handler.js
// 从光标位置拾取地块
const plotCoords = Camera.pickPlotFromPoint(Cursor.position.x, Cursor.position.y);

// 来源 modules/core/ui/input/plot-cursor.js
// 鼠标点击时获取地块
this.plotCursorCoords = Camera.pickPlotFromPoint(inputEvent.detail.x, inputEvent.detail.y);
```

</API>

<API id="Camera.popCamera"><h3>Camera.popCamera()</h3>

**说明**: 从栈中恢复相机状态，与 `pushCamera` 配对使用。

**参数**: 无

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/leader-select/leader-select-model-manager.js
// 退出领袖选择界面时恢复相机
if (this.isLeaderCameraActive) {
  Camera.popCamera();
  this.isLeaderCameraActive = false;
}
```

</API>

<API id="Camera.pushCamera"><h3>Camera.pushCamera(cameraPos, subjectPos)</h3>

**说明**: 将当前相机状态压入栈，并设置新的相机位置和目标点。与 `popCamera` 配对使用实现相机状态保存和恢复。

| 参数名 | 类型 | 说明 |
|------|------|------|
| cameraPos | `object` | 相机位置 `{x, y, z}` |
| subjectPos | `object` | 目标点位置 `{x, y, z}` |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/leader-select/leader-select-model-manager.js
// 压入领袖选择界面的相机位置
Camera.pushCamera(LeaderSelectModelManagerClass.DEFAULT_CAMERA_POSITION, {
  x: LeaderSelectModelManagerClass.DEFAULT_CAMERA_TARGET.x,
  y: LeaderSelectModelManagerClass.DEFAULT_CAMERA_TARGET.y,
  z: LeaderSelectModelManagerClass.DEFAULT_CAMERA_TARGET.z
});

// 来源 modules/core/ui/options/editors/calibrateHDR/editor-calibrate-hdr.js
// 压入 HDR 校准场景的相机
Camera.pushCamera({ x: 285, y: 80, z: 255 }, { x: 0, y: -95, z: -20 });
```

</API>

<API id="Camera.pushDynamicCamera"><h3>Camera.pushDynamicCamera(plot, settings)</h3>

**说明**: 压入动态镜头设置。用于电影镜头、胜利画面、自然奇观等场景。

| 参数名 | 类型 | 说明 |
|------|------|------|
| plot | `object` | 目标地块坐标 |
| settings | `object` | 动态镜头参数对象 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/cinematic/cinematic-manager.js
// 自然奇观电影镜头
Camera.pushDynamicCamera(plotSet, this.getCinematicDynamicCameraParams());
Camera.lookAtPlot(this.currentCinematicData.plot, { instantaneous: true });
```

</API>

<API id="Camera.pushFlyoverCamera"><h3>Camera.pushFlyoverCamera(plot, settings)</h3>

**说明**: 压入飞越镜头。用于过场动画中的俯瞰效果。

| 参数名 | 类型 | 说明 |
|------|------|------|
| plot | `object` | 目标地块坐标 |
| settings | `object` | 飞越镜头参数对象 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui-next/screens/endgame/endgame-cinematics.js
// 胜利画面飞越镜头
Camera.pushFlyoverCamera(this.currentPoi.plot, this.currentPoi.camera);
```

</API>

<API id="Camera.restoreCameraZoom"><h3>Camera.restoreCameraZoom()</h3>

**说明**: 恢复之前通过 `saveCameraZoom` 保存的缩放级别。

**参数**: 无

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/city-zoomer/city-zoomer.js
// 重置城市缩放时恢复缩放级别
Camera.restoreDefaults();
Camera.restoreCameraZoom();
Camera.clearAnimation();
```

</API>

<API id="Camera.restoreDefaults"><h3>Camera.restoreDefaults()</h3>

**说明**: 恢复相机到默认设置。在退出特殊镜头模式时使用。

**参数**: 无

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/city-zoomer/city-zoomer.js
// 退出城市缩放时恢复默认
Camera.restoreDefaults();
```

</API>

<API id="Camera.rotate"><h3>Camera.rotate(angle, isRelative)</h3>

**说明**: 旋转相机视角。

| 参数名 | 类型 | 说明 |
|------|------|------|
| angle | `float` | 旋转角度 |
| isRelative | `bool` | true=相对旋转，false=绝对旋转（重置为 0） |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/camera/camera-controller.js
// 旋转结束时重置角度
if (status == InputActionStatuses.FINISH) {
  Camera.rotate(0, false);
} else {
  Camera.rotate(x, true);
}
```

</API>

<API id="Camera.saveCameraZoom"><h3>Camera.saveCameraZoom()</h3>

**说明**: 保存当前缩放级别。后续可通过 `restoreCameraZoom` 恢复。

**参数**: 无

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/city-zoomer/city-zoomer.js
// 进入城市缩放前保存当前缩放
Camera.saveCameraZoom();
const calculatedFocus = Camera.calculateCameraFocusAndZoom(city.getPurchasedPlots(), 30, { region });
// ... 执行缩放动画 ...
```

</API>

<API id="Camera.setPreventMouseCameraMovement"><h3>Camera.setPreventMouseCameraMovement(prevent)</h3>

**说明**: 在 UI 弹窗或对话框打开时，通常需要禁止鼠标相机移动以避免误操作。

| 参数名 | 类型 | 说明 |
|------|------|------|
| prevent | `bool` | true=禁止，false=恢复 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/views/view-manager.js
// 切换世界输入时控制相机移动
set isWorldInputAllowed(state) {
  this._isWorldInputAllowed = state;
  Camera.setPreventMouseCameraMovement(!state);
  Input.setClipCursorPaused(!state);
}
```

</API>

<API id="Camera.setPreventMouseCameraZoom"><h3>Camera.setPreventMouseCameraZoom(prevent)</h3>

**说明**: 禁用或启用鼠标滚轮缩放。在需要锁定缩放级别的 UI 场景中使用。

| 参数名 | 类型 | 说明 |
|------|------|------|
| prevent | `bool` | true=禁用，false=启用 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/views/view-manager.js
// 设置鼠标缩放权限
Camera.setPreventMouseCameraZoom(!state);
```

</API>

<API id="Camera.zoom"><h3>Camera.zoom(level)</h3>

**说明**: 设置绝对缩放级别，范围 0~1（0 为最远，1 为最近）。不是相对增量，而是直接设置目标缩放值。

| 参数名 | 类型 | 说明 |
|------|------|------|
| level | `float` | 绝对缩放级别（0~1），0=最远，1=最近 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/camera/camera-controller.js
// 基于当前缩放级别计算新缩放值
const cameraState = Camera.getState();
const amount = Math.max(cameraState.zoomLevel - zoomRate * zoomValue, 0);
Camera.zoom(amount);
```

</API>

<API id="WorldUI.ForegroundCamera.reset"><h3>WorldUI.ForegroundCamera.reset(fov, cameraPos, subjectPos)</h3>

**说明**: 重置前景相机到指定状态。在进入领袖外交、叙事事件等场景时调用，设置 FOV、相机位置和注视目标。

| 参数名 | 类型 | 说明 |
|------|------|------|
| fov | `int` | 视场角（Field of View） |
| cameraPos | `object` | 相机位置 `{x, y, z}` |
| subjectPos | `object` | 注视目标位置 `{x, y, z}` |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/diplomacy/leader-model-manager.js
// 进入领袖外交场景时重置前景相机
WorldUI.ForegroundCamera.reset(35, { x: 0, y: 0, z: 0 }, { x: 0, y: 1, z: 0 });
```

</API>

<API id="WorldUI.ForegroundCamera.beginAnimation"><h3>WorldUI.ForegroundCamera.beginAnimation(initialState, delay)</h3>

**说明**: 开始前景相机动画。设置初始相机状态和延迟时间，后续通过 `addDeltaKeyframe` / `addKeyframe_Translate` 添加关键帧，最后 `endAnimation` 结束。

| 参数名 | 类型 | 说明 |
|------|------|------|
| initialState | `object` | 初始状态 `{cameraPos, subjectPos, fov?}` |
| delay | `float` | 延迟时间（秒） |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/diplomacy/leader-model-manager.js
// 领袖外交场景中推拉镜头动画
const cameraStart = { x: 0, y: 0 + startOffset, z: 0 };
const subjectStart = { x: 0, y: LeaderModelManagerClass.CAMERA_SUBJECT_DISTANCE, z: 0 };
WorldUI.ForegroundCamera.beginAnimation({ cameraPos: cameraStart, subjectPos: subjectStart }, 0);
WorldUI.ForegroundCamera.addKeyframe_Translate({ x: 0, y: 0, z: 0 }, 0.1, 0);
WorldUI.ForegroundCamera.setId(LeaderModelManagerClass.FOREGROUND_CAMERA_IN_ID);
WorldUI.ForegroundCamera.endAnimation();
```

</API>

<API id="WorldUI.ForegroundCamera.addDeltaKeyframe"><h3>WorldUI.ForegroundCamera.addDeltaKeyframe(delta, duration, delay)</h3>

**说明**: 添加增量关键帧。在 `beginAnimation` 之后调用，以增量方式叠加相机状态变化。

| 参数名 | 类型 | 说明 |
|------|------|------|
| delta | `object` | 增量数据 `{cameraPos, subjectPos, fov}` |
| duration | `float` | 持续时间（秒） |
| delay | `float` | 延迟时间（秒） |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/diplomacy/leader-model-manager.js
// 领袖外交推拉镜头——增量移动相机
WorldUI.ForegroundCamera.beginAnimation(
  { cameraPos: cameraStartPosition, subjectPos: subjectStartPosition, fov: cameraStartFOV },
  0
);
WorldUI.ForegroundCamera.addDeltaKeyframe(
  { cameraPos: movementDelta, subjectPos: movementDelta, fov: 0 },
  moveDuration,
  0
);
WorldUI.ForegroundCamera.setId(cameraId);
WorldUI.ForegroundCamera.endAnimation();
```

</API>

<API id="WorldUI.ForegroundCamera.addKeyframe_Translate"><h3>WorldUI.ForegroundCamera.addKeyframe_Translate(offset, duration, delay)</h3>

**说明**: 添加位移关键帧。在 `beginAnimation` 之后调用，以绝对位移方式移动前景相机。

| 参数名 | 类型 | 说明 |
|------|------|------|
| offset | `object` | 位移偏移量 `{x, y, z}` |
| duration | `float` | 持续时间（秒） |
| delay | `float` | 延迟时间（秒） |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/diplomacy/leader-model-manager.js
// 宣战场景推拉镜头——绝对位移
WorldUI.ForegroundCamera.beginAnimation({ cameraPos: cameraStart, subjectPos: subjectStart, fov: 15 }, 0);
WorldUI.ForegroundCamera.addKeyframe_Translate({ x: 0, y: moveDistance, z: 1 }, 1.1, 0);
WorldUI.ForegroundCamera.setId(LeaderModelManagerClass.FOREGROUND_CAMERA_IN_ID);
WorldUI.ForegroundCamera.endAnimation();
```

</API>

<API id="WorldUI.ForegroundCamera.endAnimation"><h3>WorldUI.ForegroundCamera.endAnimation()</h3>

**说明**: 结束当前前景相机动画，使动画生效。与 `beginAnimation` 配对使用。

**参数**: 无

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/diplomacy/leader-model-manager.js
// 完成动画序列
WorldUI.ForegroundCamera.beginAnimation({ cameraPos: cameraStart, subjectPos: subjectStart }, 0);
WorldUI.ForegroundCamera.addKeyframe_Translate({ x: 0, y: 0, z: 0 }, 0.1, 0);
WorldUI.ForegroundCamera.setId(LeaderModelManagerClass.FOREGROUND_CAMERA_IN_ID);
WorldUI.ForegroundCamera.endAnimation();
```

</API>

<API id="WorldUI.ForegroundCamera.setId"><h3>WorldUI.ForegroundCamera.setId(id)</h3>

**说明**: 设置前景镜头 ID。用于标识动画序列，动画完成后可通过 ID 监听完成事件。

| 参数名 | 类型 | 说明 |
|------|------|------|
| id | `string` | 镜头标识符 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/diplomacy/leader-model-manager.js
// 设置镜头 ID 并等待动画完成
WorldUI.ForegroundCamera.setId(cameraId);
WorldUI.ForegroundCamera.endAnimation();
this.leaderSequenceGate.waitingForForegroundCameraId = cameraId;
```

</API>