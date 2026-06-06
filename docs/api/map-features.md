---
title: MapFeatures 自然特征
doc_type: system
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
  - TunerPanels/Cities.ltp
doc_update: 2026-06-05
---

# MapFeatures 自然特征

文明7的地图自然特征系统，包括火山、河流、风暴、地块效果和地块产出修改器。这些全局对象由引擎直接注入，无需手动 import 引入。

```javascript
// 来源 Features.ltp、Random Events.ltp
// 遍历自然奇观和火山状态
const aNaturalWonders = MapFeatures.getNaturalWonders();
for (let i = 0; i < MapFeatures.numVolcanoes; ++i) {
  const volcanoPlotIndex = MapFeatures.getVolcanoIDByIndex(i);
  const volcanoType = MapFeatures.getVolcanoTypeByIndex(i);
  const volcanoActive = MapFeatures.isVolcanoActiveAt(volcanoPlotIndex);
}

// 来源 Rivers.ltp
// 遍历所有河流获取地块
for (let i = 0; i < MapRivers.numRivers; ++i) {
  const riverID = MapRivers.getRiverIDByIndex(i);
  const river = MapRivers.getRiver(riverID);
  const plots = MapRivers.getRiverPlots(riverID);
}
```

## 方法列表

### MapFeatures 地块特征系统

| 属性（共 1 个） | 类型 | 说明 |
|------|------|------|
| `MapFeatures.numVolcanoes` | `int` | 火山总数 |

| 方法（共 9 个） | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>MapFeatures.getNaturalWonders</API> | — | `NaturalWonder[]` | 获取所有自然奇观 |
| <API>MapFeatures.getFeatureInfoAt</API> | plotIndex | `FeatureInfo` | 获取地块特征信息 |
| <API>MapFeatures.getVolcanoIDByIndex</API> | index | `int` | 按索引获取火山地块 ID |
| <API>MapFeatures.getVolcanoTypeByIndex</API> | index | `int` | 按索引获取火山类型 |
| <API>MapFeatures.getVolcanoIDByType</API> | volcanoType | `int` | 按类型获取火山地块 ID |
| <API>MapFeatures.isVolcanoActive</API> | volcanoType | `bool` | 火山是否活跃 |
| <API>MapFeatures.isVolcanoActiveAt</API> | plotIndex | `bool` | 指定地块火山是否活跃 |
| <API>MapFeatures.setVolcanoActive</API> | volcanoType, state | `void` | 设置火山活跃状态 |
| <API>MapFeatures.getVolcanoEruptionInfoAt</API> | plotIndex | `EruptionInfo` | 获取火山喷发信息 |

### MapRivers 河流系统

| 属性（共 1 个） | 类型 | 说明 |
|------|------|------|
| `MapRivers.numRivers` | `int` | 河流总数 |

| 方法（共 3 个） | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>MapRivers.getRiverIDByIndex</API> | index | `int` | 按索引获取河流 ID |
| <API>MapRivers.getRiver</API> | riverID | `River` | 获取河流对象 |
| <API>MapRivers.getRiverPlots</API> | riverID | `int[]` | 获取河流地块数组 |

### MapStorms 风暴系统

| 属性（共 1 个） | 类型 | 说明 |
|------|------|------|
| `MapStorms.numActiveStorms` | `int` | 活跃风暴数 |

| 方法（共 2 个） | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>MapStorms.getActiveStormIDByIndex</API> | index | `int` | 按索引获取风暴 ID |
| <API>MapStorms.getStorm</API> | id | `Storm` | 获取风暴对象 |

### MapPlotEffects 地块效果系统

| 方法（共 1 个） | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>MapPlotEffects.getPlotEffects</API> | plotIndex | `PlotEffect[]` | 获取地块效果数组 |

### MapPlotYields 地块产出系统

| 方法（共 1 个） | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>MapPlotYields.getYieldsModifiers</API> | x, y | `object` | 获取地块产出修改器 |

### MapAreas / MapRegions 区域系统

| 方法（共 2 个） | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>MapAreas.getAreaIds</API> | — | `int[]` | 获取所有区域 ID |
| <API>MapRegions.getRegionIds</API> | — | `int[]` | 获取所有区域 ID |

### RegionBuilder 区域构建器系统

| 方法（共 11 个） | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>RegionBuilder.recalculateRegions</API> | — | `void` | 重新计算区域 |
| <API>RegionBuilder.getNumRegions</API> | — | `int` | 区域数量 |
| <API>RegionBuilder.getNumCells</API> | — | `int` | 单元格数量 |
| <API>RegionBuilder.getNumTrianglesInRegion</API> | index | `int` | 区域三角形数 |
| <API>RegionBuilder.getVertexForTriangle</API> | regionIdx, triIdx, vertexIdx | `int` | 获取三角形顶点 |
| <API>RegionBuilder.getCellCenter</API> | cellIndex | `int` | 获取单元格中心 |
| <API>RegionBuilder.getNumLinks</API> | cellIndex | `int` | 获取链接数 |
| <API>RegionBuilder.getCellLink</API> | cellIndex, linkIndex | `int` | 获取链接 |
| <API>RegionBuilder.getNumChokepoints</API> | — | `int` | 获取咽喉点数 |
| <API>RegionBuilder.getChokepointEndA</API> | index | `int` | 咽喉点端点 A |
| <API>RegionBuilder.getChokepointEndB</API> | index | `int` | 咽喉点端点 B |

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

<API id="MapFeatures.getNaturalWonders"><h3>MapFeatures.getNaturalWonders()</h3>

**说明**: 获取所有自然奇观数组。每个自然奇观包含 `{type, plotIndex, plots[], direction}`。

**参数**: 无

**返回值**: `NaturalWonder[]`

**使用示例**:

```javascript
// 来源 Features.ltp
// 获取所有自然奇观列表
let aNaturalWonders = MapFeatures.getNaturalWonders();
```

</API>

<API id="MapFeatures.getFeatureInfoAt"><h3>MapFeatures.getFeatureInfoAt(plotIndex)</h3>

**说明**: 获取指定地块的特征信息，返回 `{type, plotIndex, plots[]}`。

| 参数名 | 类型 | 说明 |
|------|------|------|
| plotIndex | `int` | 地块索引 |

**返回值**: `FeatureInfo`

**使用示例**:

```javascript
// 来源 Features.ltp
// 获取指定地块的特征信息
let featureInfo = MapFeatures.getFeatureInfoAt(plotIndex);
```

</API>

<API id="MapFeatures.getVolcanoIDByIndex"><h3>MapFeatures.getVolcanoIDByIndex(index)</h3>

**说明**: 按索引获取火山的地块 ID。

| 参数名 | 类型 | 说明 |
|------|------|------|
| index | `int` | 火山索引（0 ~ numVolcanoes-1） |

**返回值**: `int` — 火山地块 ID

**使用示例**:

```javascript
// 来源 Random Events.ltp
// 遍历火山获取地块 ID
for (let i = 0; i < MapFeatures.numVolcanoes; ++i) {
  const volcanoPlotIndex = MapFeatures.getVolcanoIDByIndex(i);
}
```

</API>

<API id="MapFeatures.getVolcanoTypeByIndex"><h3>MapFeatures.getVolcanoTypeByIndex(index)</h3>

**说明**: 按索引获取火山类型。

| 参数名 | 类型 | 说明 |
|------|------|------|
| index | `int` | 火山索引 |

**返回值**: `int` — 火山类型哈希值

**使用示例**:

```javascript
// 来源 Random Events.ltp
// 获取火山类型
const volcanoType = MapFeatures.getVolcanoTypeByIndex(i);
```

</API>

<API id="MapFeatures.getVolcanoIDByType"><h3>MapFeatures.getVolcanoIDByType(volcanoType)</h3>

**说明**: 按类型获取火山地块 ID。

| 参数名 | 类型 | 说明 |
|------|------|------|
| volcanoType | `int` | 火山类型哈希值 |

**返回值**: `int` — 火山地块 ID

**使用示例**:

```javascript
// 来源 Random Events.ltp
// 按类型查找火山地块
const volcanoPlotIndex = MapFeatures.getVolcanoIDByType(volcanoType);
```

</API>

<API id="MapFeatures.isVolcanoActive"><h3>MapFeatures.isVolcanoActive(volcanoType)</h3>

**说明**: 检查指定类型的火山是否活跃。

| 参数名 | 类型 | 说明 |
|------|------|------|
| volcanoType | `int` | 火山类型哈希值 |

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 Random Events.ltp
// 切换火山活跃状态
let state = MapFeatures.isVolcanoActive(volcanoType);
MapFeatures.setVolcanoActive(volcanoType, !state);
```

</API>

<API id="MapFeatures.isVolcanoActiveAt"><h3>MapFeatures.isVolcanoActiveAt(plotIndex)</h3>

**说明**: 检查指定地块的火山是否活跃。

| 参数名 | 类型 | 说明 |
|------|------|------|
| plotIndex | `int` | 火山地块索引 |

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 Random Events.ltp
// 检查指定地块火山活跃状态
const volcanoActive = MapFeatures.isVolcanoActiveAt(volcanoPlotIndex);
```

</API>

<API id="MapFeatures.setVolcanoActive"><h3>MapFeatures.setVolcanoActive(volcanoType, state)</h3>

**说明**: 设置火山的活跃状态。

| 参数名 | 类型 | 说明 |
|------|------|------|
| volcanoType | `int` | 火山类型哈希值 |
| state | `bool` | 是否活跃 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 Random Events.ltp
// 切换火山活跃状态
let state = MapFeatures.isVolcanoActive(volcanoType);
MapFeatures.setVolcanoActive(volcanoType, !state);
```

</API>

<API id="MapFeatures.getVolcanoEruptionInfoAt"><h3>MapFeatures.getVolcanoEruptionInfoAt(plotIndex)</h3>

**说明**: 获取指定地块的火山喷发信息，返回 `{isErupting, severity, turnsRemaining}`。

| 参数名 | 类型 | 说明 |
|------|------|------|
| plotIndex | `int` | 火山地块索引 |

**返回值**: `EruptionInfo`

**使用示例**:

```javascript
// 来源 Random Events.ltp
// 获取火山喷发详情
const info = MapFeatures.getVolcanoEruptionInfoAt(volcanoPlotIndex);
```

</API>

<API id="MapRivers.getRiverIDByIndex"><h3>MapRivers.getRiverIDByIndex(index)</h3>

**说明**: 按索引获取河流 ID。

| 参数名 | 类型 | 说明 |
|------|------|------|
| index | `int` | 河流索引（0 ~ numRivers-1） |

**返回值**: `int` — 河流 ID

**使用示例**:

```javascript
// 来源 Rivers.ltp
// 遍历河流获取河流 ID
for (let i = 0; i < MapRivers.numRivers; ++i) {
  const riverID = MapRivers.getRiverIDByIndex(i);
}
```

</API>

<API id="MapRivers.getRiver"><h3>MapRivers.getRiver(riverID)</h3>

**说明**: 获取河流对象，返回 `{type, isFloodable, isFlooded}`。

| 参数名 | 类型 | 说明 |
|------|------|------|
| riverID | `int` | 河流 ID |

**返回值**: `River`

**使用示例**:

```javascript
// 来源 Rivers.ltp
// 获取河流对象
const river = MapRivers.getRiver(riverID);
```

</API>

<API id="MapRivers.getRiverPlots"><h3>MapRivers.getRiverPlots(riverID)</h3>

**说明**: 获取河流流经的所有地块索引数组。

| 参数名 | 类型 | 说明 |
|------|------|------|
| riverID | `int` | 河流 ID |

**返回值**: `int[]` — 地块索引数组

**使用示例**:

```javascript
// 来源 Rivers.ltp
// 获取河流覆盖的所有地块
const plots = MapRivers.getRiverPlots(riverID);
```

</API>

<API id="MapStorms.getActiveStormIDByIndex"><h3>MapStorms.getActiveStormIDByIndex(index)</h3>

**说明**: 按索引获取活跃风暴的 ID。

| 参数名 | 类型 | 说明 |
|------|------|------|
| index | `int` | 风暴索引（0 ~ numActiveStorms-1） |

**返回值**: `int` — 风暴 ID

**使用示例**:

```javascript
// 来源 Random Events.ltp
// 遍历活跃风暴
for (let i = 0; i < MapStorms.numActiveStorms; ++i) {
  const id = MapStorms.getActiveStormIDByIndex(i);
}
```

</API>

<API id="MapStorms.getStorm"><h3>MapStorms.getStorm(id)</h3>

**说明**: 获取风暴对象，返回 `{type, startTurn, startPlot, currentPlot, currentDirection, severity, name}`。

| 参数名 | 类型 | 说明 |
|------|------|------|
| id | `int` | 风暴 ID |

**返回值**: `Storm`

**使用示例**:

```javascript
// 来源 Random Events.ltp
// 获取风暴详细信息
const info = MapStorms.getStorm(id);
```

</API>

<API id="MapPlotEffects.getPlotEffects"><h3>MapPlotEffects.getPlotEffects(plotIndex)</h3>

**说明**: 获取指定地块的效果数组。每个效果包含 `{effectType, duration, durationDecay, unoccupiedDecay}`。

| 参数名 | 类型 | 说明 |
|------|------|------|
| plotIndex | `int` | 地块索引 |

**返回值**: `PlotEffect[]`

**使用示例**:

```javascript
// 来源 Plot Effects.ltp
// 获取地块上的效果列表
let aEffects = MapPlotEffects.getPlotEffects(plotIndex);
```

</API>

<API id="MapPlotYields.getYieldsModifiers"><h3>MapPlotYields.getYieldsModifiers(x, y)</h3>

**说明**: 获取指定坐标地块的产出修改器。

| 参数名 | 类型 | 说明 |
|------|------|------|
| x | `int` | 地块 X 坐标 |
| y | `int` | 地块 Y 坐标 |

**返回值**: `object`

**使用示例**:

```javascript
// 来源 Cities.ltp
// 获取地块产出修改器
const plotYields = MapPlotYields.getYieldsModifiers(loc.x, loc.y);
```

</API>

<API id="MapAreas.getAreaIds"><h3>MapAreas.getAreaIds()</h3>

**说明**: 获取所有区域 ID 数组。

**参数**: 无

**返回值**: `int[]`

**使用示例**:

```javascript
// 来源 Map Areas.ltp
// 获取所有区域 ID
let areaIds = MapAreas.getAreaIds();
```

</API>

<API id="MapRegions.getRegionIds"><h3>MapRegions.getRegionIds()</h3>

**说明**: 获取所有区域 ID 数组。

**参数**: 无

**返回值**: `int[]`

**使用示例**:

```javascript
// 来源 Map Areas.ltp
// 获取所有区域 ID
let ids = MapRegions.getRegionIds();
```

</API>

<API id="RegionBuilder.recalculateRegions"><h3>RegionBuilder.recalculateRegions()</h3>

**说明**: 重新计算所有区域划分。

**参数**: 无

**返回值**: `void`

**使用示例**:

```javascript
// 来源 Map_Regions.ltp
// 重新计算区域
RegionBuilder.recalculateRegions();
```

</API>

<API id="RegionBuilder.getNumRegions"><h3>RegionBuilder.getNumRegions()</h3>

**说明**: 获取区域总数。

**参数**: 无

**返回值**: `int`

**使用示例**:

```javascript
// 来源 Map_Regions.ltp
// 获取区域数量
const numRegions = RegionBuilder.getNumRegions();
```

</API>

<API id="RegionBuilder.getNumCells"><h3>RegionBuilder.getNumCells()</h3>

**说明**: 获取单元格总数。

**参数**: 无

**返回值**: `int`

**使用示例**:

```javascript
// 来源 Map_Regions.ltp
// 遍历所有单元格
for (let i = 0; i < RegionBuilder.getNumCells(); i++) {
  let plot0 = RegionBuilder.getCellCenter(i);
}
```

</API>

<API id="RegionBuilder.getNumTrianglesInRegion"><h3>RegionBuilder.getNumTrianglesInRegion(index)</h3>

**说明**: 获取指定区域内的三角形数量。

| 参数名 | 类型 | 说明 |
|------|------|------|
| index | `int` | 区域索引 |

**返回值**: `int`

**使用示例**:

```javascript
// 来源 Map_Regions.ltp
// 遍历区域三角形
for (let j = 0; j < RegionBuilder.getNumTrianglesInRegion(i); j++) {
  let plot0 = RegionBuilder.getVertexForTriangle(i, j, 0);
}
```

</API>

<API id="RegionBuilder.getVertexForTriangle"><h3>RegionBuilder.getVertexForTriangle(regionIdx, triIdx, vertexIdx)</h3>

**说明**: 获取指定区域、三角形、顶点的地块索引。

| 参数名 | 类型 | 说明 |
|------|------|------|
| regionIdx | `int` | 区域索引 |
| triIdx | `int` | 三角形索引 |
| vertexIdx | `int` | 顶点索引（0-2） |

**返回值**: `int` — 地块索引

**使用示例**:

```javascript
// 来源 Map_Regions.ltp
// 获取三角形三个顶点
let plot0 = RegionBuilder.getVertexForTriangle(i, j, 0);
let plot1 = RegionBuilder.getVertexForTriangle(i, j, 1);
let plot2 = RegionBuilder.getVertexForTriangle(i, j, 2);
```

</API>

<API id="RegionBuilder.getCellCenter"><h3>RegionBuilder.getCellCenter(cellIndex)</h3>

**说明**: 获取指定单元格的中心地块索引。

| 参数名 | 类型 | 说明 |
|------|------|------|
| cellIndex | `int` | 单元格索引 |

**返回值**: `int` — 地块索引

**使用示例**:

```javascript
// 来源 Map_Regions.ltp
// 获取单元格中心地块
let plot0 = RegionBuilder.getCellCenter(i);
```

</API>

<API id="RegionBuilder.getNumLinks"><h3>RegionBuilder.getNumLinks(cellIndex)</h3>

**说明**: 获取指定单元格的链接数。

| 参数名 | 类型 | 说明 |
|------|------|------|
| cellIndex | `int` | 单元格索引 |

**返回值**: `int`

**使用示例**:

```javascript
// 来源 Map_Regions.ltp
// 遍历单元格链接
for (let j = 0; j < RegionBuilder.getNumLinks(i); j++) {
  let link = RegionBuilder.getCellLink(i, j);
}
```

</API>

<API id="RegionBuilder.getCellLink"><h3>RegionBuilder.getCellLink(cellIndex, linkIndex)</h3>

**说明**: 获取指定单元格的链接目标单元格索引。

| 参数名 | 类型 | 说明 |
|------|------|------|
| cellIndex | `int` | 单元格索引 |
| linkIndex | `int` | 链接索引 |

**返回值**: `int` — 目标单元格索引

**使用示例**:

```javascript
// 来源 Map_Regions.ltp
// 获取链接目标单元格
let link = RegionBuilder.getCellLink(i, j);
let plot1 = RegionBuilder.getCellCenter(link);
```

</API>

<API id="RegionBuilder.getNumChokepoints"><h3>RegionBuilder.getNumChokepoints()</h3>

**说明**: 获取咽喉点总数。

**参数**: 无

**返回值**: `int`

**使用示例**:

```javascript
// 来源 Map_Regions.ltp
// 遍历咽喉点
for (let i = 0; i < RegionBuilder.getNumChokepoints(); i++) {
  let plot0 = RegionBuilder.getChokepointEndA(i);
  let plot1 = RegionBuilder.getChokepointEndB(i);
}
```

</API>

<API id="RegionBuilder.getChokepointEndA"><h3>RegionBuilder.getChokepointEndA(index)</h3>

**说明**: 获取咽喉点的端点 A 地块索引。

| 参数名 | 类型 | 说明 |
|------|------|------|
| index | `int` | 咽喉点索引 |

**返回值**: `int` — 地块索引

**使用示例**:

```javascript
// 来源 Map_Regions.ltp
// 获取咽喉点端点
let plot0 = RegionBuilder.getChokepointEndA(i);
```

</API>

<API id="RegionBuilder.getChokepointEndB"><h3>RegionBuilder.getChokepointEndB(index)</h3>

**说明**: 获取咽喉点的端点 B 地块索引。

| 参数名 | 类型 | 说明 |
|------|------|------|
| index | `int` | 咽喉点索引 |

**返回值**: `int` — 地块索引

**使用示例**:

```javascript
// 来源 Map_Regions.ltp
// 获取咽喉点端点
let plot1 = RegionBuilder.getChokepointEndB(i);
```

</API>