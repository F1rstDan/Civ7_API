---
title: WorldUI 世界UI
doc_type: other
summary: WorldUI 全局对象，用于在 3D 世界中创建标记、触发特效、管理模型组和调试绘制。
primary_scope:
  - WorldUI
related_scope:
  - GameplayMap
  - Camera
source:
  - TunerPanels/WorldUI Models.ltp
  - TunerPanels/Map_Regions.ltp
  - modules/base-standard/ui/world-vfx/world-vfx.js
  - modules/base-standard/ui/unit-selection/unit-selection.js
  - modules/base-standard/ui/interface-modes/interface-mode-ranged-attack.js
  - modules/base-standard/ui/views/view-cinematic.js
  - modules/base-standard/ui/diplomacy/leader-model-manager.js
  - modules/core/ui/shell/leader-select/leader-select-model-manager.js
doc_update: 2026-06-05
---

# WorldUI 世界UI

WorldUI 全局对象，用于在 3D 世界中创建标记、触发特效、管理模型组和调试绘制。从不通过 import 引入，引擎直接注入。

```javascript
// 快速示例：创建模型组、在地块触发特效、获取地块 3D 位置
// 来源 TunerPanels/WorldUI Models.ltp / modules/base-standard/ui/world-vfx/world-vfx.js
// 获取所有模型组 ID，创建模型组，在地块触发 VFX
let aModelGroupIds = WorldUI.modelGroupIds;
let modelGroup = WorldUI.createModelGroup("myGroup");

// 在地块触发 VFX 特效
WorldUI.triggerVFXAtPlot("VFX_District_Added_To_Map", data.location, { x: 0, y: 0, z: 0 }, { angle: 0, scale: 1 });

// 获取地块 3D 世界坐标
const pos = WorldUI.getPlotLocation(plotCoord, { x: 0, y: 0, z: 0 });
```

## 方法列表

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>WorldUI.createModelGroup</API> | name | `object` | 创建模型组 |
| <API>WorldUI.createFixedMarker</API> | options | `object` | 创建固定标记 |
| <API>WorldUI.getPlotLocation</API> | location, offset?, placementMode? | `object` | 获取地块 3D 位置 |
| <API>WorldUI.triggerVFXAtPlot</API> | vfxName, location, offset?, options? | `void` | 在地块触发特效 |
| <API>WorldUI.setUnitVisibility</API> | visible | `void` | 设置所有单位可见性 |
| <API>WorldUI.releaseMarker</API> | marker | `void` | 释放标记 |
| <API>WorldUI.createDebugGroup</API> | name | `object` | 创建调试绘制组 |
| <API>WorldUI.getModelGroupById</API> | groupId | `object` | 按 ID 获取模型组 |
| WorldUI.modelGroupIds | — | `array` | 获取所有模型组 ID（属性） |
| <API>WorldUI.getAssetNames</API> | filter? | `string[]` | 获取可用资源名（可选过滤） |
| <API>WorldUI.getVFXNames</API> | filter? | `string[]` | 获取可用 VFX 名（可选过滤） |

## 模型组管理

模型组（Model Group）是 WorldUI 管理 3D 模型和 VFX 实例的容器。通过 `createModelGroup` 创建，通过 `getModelGroupById` 获取已有组。

```javascript
// 来源 TunerPanels/WorldUI Models.ltp
// 获取所有模型组 ID，遍历并按 ID 获取模型组
let aModelGroupIds = WorldUI.modelGroupIds;
for (const id of aModelGroupIds) {
  let group = WorldUI.getModelGroupById(id);
  if (group) {
    console.log(id + ";" + group.name);
  }
}
```

### 模型组对象

```javascript
// 来源 TunerPanels/WorldUI Models.ltp
// 模型组基本属性和方法
group.name;                      // 组名称
group.modelCount;                // 组内模型数量
group.vfxCount;                  // 组内 VFX 数量
group.getModelByIndex(i);        // 按索引获取模型
group.getVFXByIndex(i);          // 按索引获取 VFX
group.clear();                   // 清除组内所有实例
```

### 模型对象

```javascript
// 来源 TunerPanels/WorldUI Models.ltp
// 模型对象属性和方法
model.assetName;                 // 资源名称
model.state;                     // 当前状态
model.possibleStates;            // 可用状态列表
model.setState(state);           // 设置状态
model.setAssetName(name);        // 设置资源名
model.setSeed(seed);             // 设置随机种子
model.setSelectionScriptParams(params);       // 设置选择脚本参数
model.updateSelectionScriptParams(params);    // 更新选择脚本参数
```

### 使用示例：设置模型状态

```javascript
// 来源 TunerPanels/WorldUI Models.ltp — "Apply State" Action
// 设置指定模型的状态
let group = WorldUI.getModelGroupById(g_TunerState.WorldUIModels.selectedGroup);
if (group) {
  const model = group.getModelByIndex(g_TunerState.WorldUIModels.selectedModel);
  if (model) {
    model.setState("STATE_NAME");
  }
}
```

### 使用示例：设置独立势力外观

```javascript
// 来源 TunerPanels/WorldUI Models.ltp — "Apply Independent" Action
// 为独立势力设置模型外观
let def = GameInfo.Independents.lookup(independentName);
if (def) {
  let leaderName = "LEADER_INDEPENDENT_" + def.CityStateType;
  model.setAssetName(leaderName);
  let params = { ageStyle: 1, independent: independentName };
  model.setSelectionScriptParams(params);
}
```

## 调试绘制

```javascript
// 来源 TunerPanels/Map_Regions.ltp
// 创建调试绘制组并添加线条，用于在地图上绘制区域轮廓
let group = WorldUI.createDebugGroup("regionDraw");
group.clear();
let location0 = { plot: plot0, offset: { x: 0, y: 0, z: 0 } };
let location1 = { plot: plot1, offset: { x: 0, y: 0, z: 0 } };
let location2 = { plot: plot2, offset: { x: 0, y: 0, z: 0 } };
group.addLine(location0, location1, 0xFFFF00FF);
group.addLine(location1, location2, 0xFFFF00FF);
group.addLine(location2, location0, 0xFFFF00FF);
```

<API id="WorldUI.createModelGroup"><h3>WorldUI.createModelGroup(name)</h3>

**说明**: 创建一个新的模型组，用于管理 3D 模型和 VFX 实例。

| 参数名 | 类型 | 说明 |
|------|------|------|
| name | `string` | 模型组名称 |

**返回值**: `object` — 模型组对象

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/leader-select/leader-select-model-manager.js
// 创建模型组用于管理领袖选择界面的 3D 模型
this.leaderSelectModelGroup = WorldUI.createModelGroup("leaderModelGroup");
this.leaderPedestalModelGroup = WorldUI.createModelGroup("leaderPedestalGroup");
```

</API>
<API id="WorldUI.createFixedMarker"><h3>WorldUI.createFixedMarker(options)</h3>

**说明**: 创建一个固定 3D 标记（Marker），用于在屏幕空间中锚定模型或 VFX 位置。

| 参数名 | 类型 | 说明 |
|------|------|------|
| options | `object` | 包含 `{ x, y, z }` 坐标的位置对象 |

**返回值**: `object` — 标记句柄，可用于后续 `releaseMarker` 释放

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/diplomacy/leader-model-manager.js
// 创建固定标记用于放置领袖 3D 模型
this.leader3DMarkerCenter = WorldUI.createFixedMarker({ x: 0, y: 0, z: 0 });
```

</API>
<API id="WorldUI.getPlotLocation"><h3>WorldUI.getPlotLocation(location, offset?, placementMode?)</h3>

**说明**: 获取指定地块的 3D 世界坐标位置。

| 参数名 | 类型 | 说明 |
|------|------|------|
| location | `object` | 地块坐标 `{ x, y }` 或含 `location` 属性的对象 |
| offset | `object` | 可选，位置偏移 `{ x, y, z }` |
| placementMode | `string` | 可选，放置模式（如 `PlacementMode.TERRAIN`） |

**返回值**: `object` — 3D 世界坐标 `{ x, y, z }`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/interface-modes/interface-mode-ranged-attack.js
// 获取地块 3D 坐标用于计算攻击轨迹
const target_position = WorldUI.getPlotLocation(plotCoord, { x: 0, y: 0, z: 0 }, PlacementMode.TERRAIN);
const source_position = WorldUI.getPlotLocation(unit.location, { x: 0, y: 0, z: 0 }, PlacementMode.TERRAIN);
```

</API>
<API id="WorldUI.triggerVFXAtPlot"><h3>WorldUI.triggerVFXAtPlot(vfxName, location, offset?, options?)</h3>

**说明**: 在指定地块位置触发 VFX 特效。

| 参数名 | 类型 | 说明 |
|------|------|------|
| vfxName | `string` | VFX 资源名称，如 `"VFX_UnitSelection_Ground_Burst_01"` |
| location | `object` | 地块坐标对象 `{ x, y }` |
| offset | `object` | 可选，位置偏移 `{ x, y, z }` |
| options | `object` | 可选，特效参数 `{ angle, scale }` |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/world-vfx/world-vfx.js
// 在区域添加时触发特效
WorldUI.triggerVFXAtPlot(
  "VFX_District_Added_To_Map",
  data.location,
  { x: 0, y: 0, z: 0 },
  { angle: 0, scale: 1 }
);
```

</API>
<API id="WorldUI.setUnitVisibility"><h3>WorldUI.setUnitVisibility(visible)</h3>

**说明**: 设置所有单位的可见性。常用于进入过场动画时隐藏单位，退出时恢复显示。

| 参数名 | 类型 | 说明 |
|------|------|------|
| visible | `bool` | `true` 显示单位，`false` 隐藏单位 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/views/view-cinematic.js
// 进入过场动画时隐藏单位，退出时恢复
WorldUI.setUnitVisibility(false);   // 隐藏所有单位
// ... 播放过场 ...
WorldUI.setUnitVisibility(true);    // 恢复显示
```

</API>
<API id="WorldUI.releaseMarker"><h3>WorldUI.releaseMarker(marker)</h3>

**说明**: 释放之前通过 `createFixedMarker` 创建的标记。

| 参数名 | 类型 | 说明 |
|------|------|------|
| marker | `object` | 标记句柄（由 `createFixedMarker` 返回） |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/diplomacy/leader-model-manager.js
// 清理外交界面中的领袖 3D 标记
WorldUI.releaseMarker(this.leader3DMarkerLeft);
WorldUI.releaseMarker(this.leader3DMarkerRight);
```

</API>
<API id="WorldUI.createDebugGroup"><h3>WorldUI.createDebugGroup(name)</h3>

**说明**: 创建调试绘制组，用于在 3D 世界中绘制调试线条和图形。

| 参数名 | 类型 | 说明 |
|------|------|------|
| name | `string` | 调试组名称 |

**返回值**: `object` — 调试绘制组对象，支持 `clear()`、`addLine()` 等方法

**使用示例**:

```javascript
// 来源 TunerPanels/Map_Regions.ltp
// 创建调试绘制组绘制区域轮廓
let drawRegionGroup = WorldUI.createDebugGroup("regionDraw");
drawRegionGroup.clear();
let location0 = { plot: plot0, offset: { x: 0, y: 0, z: 0 } };
let location1 = { plot: plot1, offset: { x: 0, y: 0, z: 0 } };
drawRegionGroup.addLine(location0, location1, 0xFFFF00FF);
```

</API>
<API id="WorldUI.getModelGroupById"><h3>WorldUI.getModelGroupById(groupId)</h3>

**说明**: 按 ID 获取已存在的模型组。

| 参数名 | 类型 | 说明 |
|------|------|------|
| groupId | `int` | 模型组 ID |

**返回值**: `object` | `undefined` — 模型组对象，不存在时返回 `undefined`

**使用示例**:

```javascript
// 来源 TunerPanels/WorldUI Models.ltp
// 获取模型组并操作其内部模型
let group = WorldUI.getModelGroupById(groupId);
if (group) {
  const model = group.getModelByIndex(modelIndex);
  if (model) {
    model.setState("STATE_NAME");
  }
}
```

</API>
<API id="WorldUI.getAssetNames"><h3>WorldUI.getAssetNames(filter?)</h3>

**说明**: 获取可用 3D 资源名称列表，可选过滤参数。

| 参数名 | 类型 | 说明 |
|------|------|------|
| filter | `string` | 可选，过滤字符串 |

**返回值**: `string[]` — 资源名称数组

**使用示例**:

```javascript
// 来源 TunerPanels/WorldUI Models.ltp
// 获取可用资源名称（带过滤或不带过滤）
let assets = WorldUI.getAssetNames(filter);   // 带过滤
let allAssets = WorldUI.getAssetNames();       // 获取全部
```

</API>
<API id="WorldUI.getVFXNames"><h3>WorldUI.getVFXNames(filter?)</h3>

**说明**: 获取可用 VFX 名称列表，可选过滤参数。

| 参数名 | 类型 | 说明 |
|------|------|------|
| filter | `string` | 可选，过滤字符串 |

**返回值**: `string[]` — VFX 名称数组

**使用示例**:

```javascript
// 来源 TunerPanels/WorldUI Models.ltp
// 获取可用 VFX 名称（带过滤或不带过滤）
let vfx = WorldUI.getVFXNames(filter);   // 带过滤
let allVFX = WorldUI.getVFXNames();       // 获取全部
```

</API>