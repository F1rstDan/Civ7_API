---
title: MapFeatures 自然特征系统
---

# MapFeatures 自然特征系统

文明7的地图自然特征系统包括火山、河流、风暴、地块效果和地块产出修改器。

> 来源：Features.ltp、Rivers.ltp、Random Events.ltp、Plot Effects.ltp

> 来源补充：Map Areas.ltp、Map_Regions.ltp、WorldUI Models.ltp

## MapFeatures 全局对象

```javascript
// 来源 Features.ltp、Random Events.ltp
MapFeatures.getNaturalWonders();                      // 获取所有自然奇观
// 每个: {type, plotIndex, plots[], direction}

MapFeatures.getFeatureInfoAt(plotIndex);              // 获取地块特征信息
// 返回: {type, plotIndex, plots[]}

// 火山系统
MapFeatures.numVolcanoes;                             // 火山总数
MapFeatures.getVolcanoIDByIndex(index);               // 按索引获取火山地块
MapFeatures.getVolcanoTypeByIndex(index);             // 按索引获取火山类型
MapFeatures.getVolcanoIDByType(volcanoType);          // 按类型获取火山地块
MapFeatures.isVolcanoActive(volcanoType);             // 火山是否活跃
MapFeatures.isVolcanoActiveAt(plotIndex);             // 指定地块火山是否活跃
MapFeatures.setVolcanoActive(volcanoType, state);     // 设置火山活跃状态
MapFeatures.getVolcanoEruptionInfoAt(plotIndex);      // 获取火山喷发信息
// 返回: {isErupting, severity, turnsRemaining}
```

## MapRivers 全局对象

```javascript
// 来源 Rivers.ltp、Random Events.ltp
MapRivers.numRivers;                                  // 河流总数
MapRivers.getRiverIDByIndex(index);                   // 按索引获取河流 ID
MapRivers.getRiver(riverID);                          // 获取河流对象
// 返回: {type, isFloodable, isFlooded}
MapRivers.getRiverPlots(riverID);                     // 获取河流地块数组
```

## MapStorms 全局对象

```javascript
// 来源 Random Events.ltp
MapStorms.numActiveStorms;                            // 活跃风暴数
MapStorms.getActiveStormIDByIndex(index);             // 按索引获取风暴 ID
MapStorms.getStorm(id);                               // 获取风暴对象
// 返回: {type, startTurn, startPlot, currentPlot, currentDirection, severity, name}
```

## MapPlotEffects 全局对象

```javascript
// 来源 Plot Effects.ltp
MapPlotEffects.getPlotEffects(plotIndex);             // 获取地块效果数组
// 每个: {effectType, duration, durationDecay, unoccupiedDecay}
```

## MapPlotYields 全局对象

```javascript
// 来源 Cities.ltp
MapPlotYields.getYieldsModifiers(x, y);              // 获取地块产出修改器
```

## MapAreas / MapRegions 全局对象

```javascript
// 来源 Map Areas.ltp
MapAreas.getAreaIds();                                // 获取所有区域 ID
MapRegions.getRegionIds();                            // 获取所有区域 ID
```

## RegionBuilder 全局对象

```javascript
// 来源 Map_Regions.ltp
RegionBuilder.recalculateRegions();                   // 重新计算区域
RegionBuilder.getNumRegions();                        // 区域数量
RegionBuilder.getNumCells();                          // 单元格数量
RegionBuilder.getNumTrianglesInRegion(index);         // 区域三角形数
RegionBuilder.getVertexForTriangle(regionIdx, triIdx, vertexIdx);
RegionBuilder.getCellCenter(cellIndex);               // 获取单元格中心
RegionBuilder.getNumLinks(cellIndex);                 // 获取链接数
RegionBuilder.getCellLink(cellIndex, linkIndex);      // 获取链接
RegionBuilder.getNumChokepoints();                    // 获取咽喉点数
RegionBuilder.getChokepointEndA(index);               // 咽喉点端点A
RegionBuilder.getChokepointEndB(index);               // 咽喉点端点B
```

## WorldUI 调试绘制

```javascript
// 来源 Map_Regions.ltp
let group = WorldUI.createDebugGroup("groupName");
group.clear();
let location = {plot: plotIndex, offset: {x: 0, y: 0, z: 0}};
group.addLine(location1, location2, colorHex);
```

## WorldUI 模型组管理

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

## GameInfo 关联表

```javascript
GameInfo.Features;          // 特征定义表
GameInfo.NamedRivers;       // 命名河流表
GameInfo.NamedVolcanoes;    // 命名火山表
GameInfo.RandomEvents;      // 随机事件表
GameInfo.PlotEffects;       // 地块效果表
GameInfo.Fertilities;       // 肥沃度表
GameInfo.NarrativeStories;  // 叙事故事表（含发现类型）
GameInfo.Independents;      // 独立势力定义表
GameInfo.VisArt_IndependentUnitCultures;  // 独立势力单位文化表
```

---

*来源：Features.ltp、Rivers.ltp、Random Events.ltp、Plot Effects.ltp、Map Areas.ltp、Map_Regions.ltp、WorldUI Models.ltp*
