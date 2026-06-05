---
title: MapFeatures 自然特征
doc_type: object-api
summary: 文明7的地图自然特征系统，包括火山、河流、风暴、地块效果、地块产出修改器和区域系统。
primary_scope:
  - MapFeatures
  - MapRivers
  - MapStorms
  - MapPlotEffects
  - MapPlotYields
  - MapAreas
  - MapRegions
  - RegionBuilder
related_scope:
  - GameInfo.Features
  - GameInfo.NamedRivers
  - GameInfo.NamedVolcanoes
  - GameInfo.RandomEvents
  - GameInfo.PlotEffects
source:
  - TunerPanels/Features.ltp
  - TunerPanels/Rivers.ltp
  - TunerPanels/Random Events.ltp
  - TunerPanels/Plot Effects.ltp
  - TunerPanels/Map Areas.ltp
  - TunerPanels/Map_Regions.ltp
---

# MapFeatures 自然特征

文明7的地图自然特征系统包括火山、河流、风暴、地块效果和地块产出修改器。

## MapFeatures 全局对象

```javascript
// 来源 TunerPanels/Features.ltp、TunerPanels/Random Events.ltp
// 获取自然奇观和地块特征
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
// 来源 TunerPanels/Rivers.ltp、TunerPanels/Random Events.ltp
// 查询河流信息
MapRivers.numRivers;                                  // 河流总数
MapRivers.getRiverIDByIndex(index);                   // 按索引获取河流 ID
MapRivers.getRiver(riverID);                          // 获取河流对象
// 返回: {type, isFloodable, isFlooded}
MapRivers.getRiverPlots(riverID);                     // 获取河流地块数组
```

## MapStorms 全局对象

```javascript
// 来源 TunerPanels/Random Events.ltp
// 查询活跃风暴
MapStorms.numActiveStorms;                            // 活跃风暴数
MapStorms.getActiveStormIDByIndex(index);             // 按索引获取风暴 ID
MapStorms.getStorm(id);                               // 获取风暴对象
// 返回: {type, startTurn, startPlot, currentPlot, currentDirection, severity, name}
```

## MapPlotEffects 全局对象

```javascript
// 来源 TunerPanels/Plot Effects.ltp
// 获取地块效果
MapPlotEffects.getPlotEffects(plotIndex);             // 获取地块效果数组
// 每个: {effectType, duration, durationDecay, unoccupiedDecay}
```

## MapPlotYields 全局对象

```javascript
// 来源 TunerPanels/Cities.ltp
// 获取地块产出修改器
MapPlotYields.getYieldsModifiers(x, y);              // 获取地块产出修改器
```

## MapAreas / MapRegions 全局对象

```javascript
// 来源 TunerPanels/Map Areas.ltp
// 获取区域 ID
MapAreas.getAreaIds();                                // 获取所有区域 ID
MapRegions.getRegionIds();                            // 获取所有区域 ID
```

## RegionBuilder 全局对象

```javascript
// 来源 TunerPanels/Map_Regions.ltp
// 区域构建和查询
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

---

## GameInfo 关联表

```javascript
// 来源 源码 GameInfo 关联
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