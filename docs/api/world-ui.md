---
title: WorldUI 世界UI
---

# WorldUI 世界UI

WorldUI 全局对象，用于在 3D 世界中创建标记、触发特效、管理模型组和调试绘制。从不通过 import 引入，引擎直接注入。

## 方法列表

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `createModelGroup` | name | `object` | 创建模型组 |
| `createFixedMarker` | options | `object` | 创建固定标记 |
| `getPlotLocation` | location | `object` | 获取地块 3D 位置 |
| `triggerVFXAtPlot` | location, vfx | `void` | 在地块触发特效 |
| `setUnitVisibility` | unitID, visible | `void` | 设置单位可见性 |
| `releaseMarker` | marker | `void` | 释放标记 |
| `createDebugGroup` | name | `object` | 创建调试绘制组 |
| `getModelGroupById` | groupId | `object` | 按 ID 获取模型组 |
| `modelGroupIds` | — | `array` | 获取所有模型组 ID（属性） |
| `getAssetNames` | filter? | `string[]` | 获取可用资源名（可选过滤） |
| `getVFXNames` | filter? | `string[]` | 获取可用 VFX 名（可选过滤） |

## 调试绘制

```javascript
// 来源 Map_Regions.ltp
let group = WorldUI.createDebugGroup("groupName");
group.clear();
let location = {plot: plotIndex, offset: {x: 0, y: 0, z: 0}};
group.addLine(location1, location2, colorHex);
```

## 模型组管理

```javascript
// 来源 WorldUI Models.ltp
// 获取所有模型组 ID
let aModelGroupIds = WorldUI.modelGroupIds;

// 按 ID 获取模型组
let group = WorldUI.getModelGroupById(groupId);

// 获取可用资源名（可选过滤参数）
let assets = WorldUI.getAssetNames(filter);
let vfx = WorldUI.getVFXNames(filter);
```

### 模型组对象

```javascript
// 来源 WorldUI Models.ltp
group.name;                      // 组名称
group.modelCount;                // 组内模型数量
group.vfxCount;                  // 组内 VFX 数量
group.getModelByIndex(i);        // 按索引获取模型
group.getVFXByIndex(i);          // 按索引获取 VFX
group.clear();                   // 清除组内所有实例
```

### 模型对象

```javascript
// 来源 WorldUI Models.ltp
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
// 来源 WorldUI Models.ltp — "Apply State" Action
let group = WorldUI.getModelGroupById(groupId);
if (group) {
  const model = group.getModelByIndex(modelIndex);
  if (model) {
    model.setState("STATE_NAME");
  }
}
```

### 使用示例：设置独立势力外观

```javascript
// 来源 WorldUI Models.ltp — "Apply Independent" Action
let def = GameInfo.Independents.lookup(independentName);
if (def) {
  let leaderName = "LEADER_INDEPENDENT_" + def.CityStateType;
  model.setAssetName(leaderName);
  let params = { ageStyle: 1, independent: independentName };
  model.setSelectionScriptParams(params);
}
```

---

*来源：WorldUI Models.ltp、Map_Regions.ltp*
