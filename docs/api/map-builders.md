---
title: Map Builders 地图构建
doc_type: system
summary: 地图构建系统 API，包括 TerrainBuilder、AreaBuilder、ResourceBuilder、FractalBuilder、StartPositioner 和 MapConstructibles。
primary_scope:
  - TerrainBuilder
  - AreaBuilder
  - ResourceBuilder
  - FractalBuilder
  - StartPositioner
  - MapConstructibles
related_scope:
  - GameplayMap
  - GameInfo
  - MapAreas
  - MapRegions
source:
  - TunerPanels/Map.ltp
  - TunerPanels/Map Areas.ltp
  - TunerPanels/Resources.ltp
doc_update: 2026-06-05
---

# Map Builders 地图构建

地图构建 API，用于程序化生成和配置文明7地图。

```javascript
// 来源 TunerPanels/Map.ltp
// 简要描述功能：设置地形和标记地块
TerrainBuilder.setTerrainType(x, y, "TERRAIN_GRASS");
TerrainBuilder.setPlotTag(x, y, "PLOT_TAG_COASTAL");
AreaBuilder.recalculateAreas();
```

## TerrainBuilder 地形构建

| 方法（共 12 个） | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>TerrainBuilder.getRandomNumber</API> | max | `int` | 获取随机数 |
| <API>TerrainBuilder.setTerrainType</API> | x, y, type | `void` | 设置地形类型 |
| <API>TerrainBuilder.validateAndFixTerrain</API> | — | `void` | 验证并修复地形 |
| <API>TerrainBuilder.modelRivers</API> | — | `void` | 生成河流模型 |
| <API>TerrainBuilder.stampContinents</API> | — | `void` | 印盖大陆 |
| <API>TerrainBuilder.buildElevation</API> | — | `void` | 构建海拔 |
| <API>TerrainBuilder.defineNamedRivers</API> | — | `void` | 定义命名河流 |
| <API>TerrainBuilder.addFloodplains</API> | — | `void` | 添加冲积平原 |
| <API>TerrainBuilder.setPlotTag</API> | x, y, tag | `void` | 设置地块标签 |
| <API>TerrainBuilder.setFeatureType</API> | x, y, type | `void` | 设置地物类型 |
| <API>TerrainBuilder.setBiomeType</API> | x, y, type | `void` | 设置生物群落类型 |
| <API>TerrainBuilder.setLandmassRegionId</API> | x, y, id | `void` | 设置陆地区域 ID |

## AreaBuilder 地域构建

| 方法（共 5 个） | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>AreaBuilder.recalculateAreas</API> | — | `void` | 重新计算区域 |
| <API>AreaBuilder.findBiggestArea</API> | — | `int` | 查找最大区域 |
| <API>AreaBuilder.getAreaBoundary</API> | areaID | `object` | 获取区域边界 |
| <API>AreaBuilder.isAreaConnectedToOcean</API> | areaID | `bool` | 区域是否连接海洋 |
| <API>AreaBuilder.getPlotCount</API> | areaID | `int` | 获取区域地块数 |

## ResourceBuilder 资源构建

| 方法（共 5 个） | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>ResourceBuilder.canHaveResource</API> | x, y, type | `bool` | 地块是否可以有资源 |
| <API>ResourceBuilder.setResourceType</API> | x, y, type | `void` | 设置资源类型 |
| <API>ResourceBuilder.getResourceLandmass</API> | type | `int` | 获取资源所属陆地 |
| <API>ResourceBuilder.isResourceRequiredForAge</API> | type | `bool` | 资源是否为时代必需 |
| <API>ResourceBuilder.getGeneratedMapResources</API> | — | `array` | 获取生成的地图资源 |

## FractalBuilder 分形构建

| 方法（共 3 个） | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>FractalBuilder.create</API> | params | `Fractal` | 创建分形生成器 |
| <API>FractalBuilder.getHeightFromPercent</API> | percent | `int` | 从百分比获取高度 |
| <API>FractalBuilder.getHeight</API> | x, y | `int` | 获取指定位置高度 |

## StartPositioner 起始位置设置

| 方法（共 6 个） | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>StartPositioner.setStartPosition</API> | playerID, location | `void` | 设置起始位置 |
| <API>StartPositioner.getPlotFertilityForCoord</API> | x, y | `int` | 获取地块肥沃度 |
| <API>StartPositioner.initializeValues</API> | — | `void` | 初始化值 |
| <API>StartPositioner.divideMapIntoMajorRegions</API> | — | `void` | 将地图划分为主要区域 |
| <API>StartPositioner.getMajorStartRegion</API> | playerID | `int` | 获取主要起始区域 |
| <API>StartPositioner.getStartPosition</API> | playerID | `object` | 获取起始位置 |

## MapConstructibles 地图建造物

| 方法（共 5 个） | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>MapConstructibles.getConstructibles</API> | location | `array` | 获取地块上的建造物 |
| <API>MapConstructibles.getHiddenFilteredConstructibles</API> | location | `array` | 获取隐藏过滤的建造物 |
| <API>MapConstructibles.addDiscovery</API> | location, type | `void` | 添加发现 |
| <API>MapConstructibles.addRoute</API> | location, type | `void` | 添加道路 |
| <API>MapConstructibles.removeRoute</API> | location | `void` | 移除道路 |

## GameInfo 关联表

```javascript
GameInfo.Units;           // 单位定义表
GameInfo.Features;        // 地物定义表
GameInfo.Fertilities;     // 肥沃度定义表
GameInfo.Constructibles;  // 建造物定义表
GameInfo.Resources;       // 资源定义表
GameInfo.Routes;          // 道路定义表
GameInfo.Districts;       // 区域定义表
GameInfo.Biomes;          // 生物群落定义表
```

## 相关全局对象

| 对象 | 说明 |
|------|------|
| `GameplayMap.getLocationFromIndex()` | 从索引获取地图位置 |
| `MapAreas.getAreaIds()` | 获取所有区域 ID |
| `MapRegions.getRegionIds()` | 获取所有地图区域 ID |

<API id="TerrainBuilder.getRandomNumber"><h3>TerrainBuilder.getRandomNumber(max)</h3>

**说明**: 获取随机数。

| 参数名 | 类型 | 说明 |
|------|------|------|
| max | `int` | 最大值 |

**返回值**: `int`

**使用示例**:

```javascript
// 来源 TunerPanels/Map.ltp
// 简要描述功能：获取 0 到 max 之间的随机数
const num = TerrainBuilder.getRandomNumber(100);
```

</API>

<API id="TerrainBuilder.setTerrainType"><h3>TerrainBuilder.setTerrainType(x, y, type)</h3>

**说明**: 设置指定坐标的地形类型。

| 参数名 | 类型 | 说明 |
|------|------|------|
| x | `int` | X 坐标 |
| y | `int` | Y 坐标 |
| type | `string` | 地形类型（如 `"TERRAIN_GRASS"`） |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 TunerPanels/Map.ltp
// 简要描述功能：设置地块地形为草原
TerrainBuilder.setTerrainType(10, 20, "TERRAIN_GRASS");
```

</API>

<API id="TerrainBuilder.validateAndFixTerrain"><h3>TerrainBuilder.validateAndFixTerrain()</h3>

**说明**: 验证并修复地形数据。

**参数**: 无

**返回值**: `void`

</API>

<API id="TerrainBuilder.modelRivers"><h3>TerrainBuilder.modelRivers()</h3>

**说明**: 生成河流模型。

**参数**: 无

**返回值**: `void`

</API>

<API id="TerrainBuilder.stampContinents"><h3>TerrainBuilder.stampContinents()</h3>

**说明**: 印盖大陆。

**参数**: 无

**返回值**: `void`

</API>

<API id="TerrainBuilder.buildElevation"><h3>TerrainBuilder.buildElevation()</h3>

**说明**: 构建海拔。

**参数**: 无

**返回值**: `void`

</API>

<API id="TerrainBuilder.defineNamedRivers"><h3>TerrainBuilder.defineNamedRivers()</h3>

**说明**: 定义命名河流。

**参数**: 无

**返回值**: `void`

</API>

<API id="TerrainBuilder.addFloodplains"><h3>TerrainBuilder.addFloodplains()</h3>

**说明**: 添加冲积平原。

**参数**: 无

**返回值**: `void`

</API>

<API id="TerrainBuilder.setPlotTag"><h3>TerrainBuilder.setPlotTag(x, y, tag)</h3>

**说明**: 设置地块标签。

| 参数名 | 类型 | 说明 |
|------|------|------|
| x | `int` | X 坐标 |
| y | `int` | Y 坐标 |
| tag | `string` | 地块标签（如 `"PLOT_TAG_COASTAL"`） |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 TunerPanels/Map.ltp
// 简要描述功能：标记地块为沿海
TerrainBuilder.setPlotTag(5, 8, "PLOT_TAG_COASTAL");
```

</API>

<API id="TerrainBuilder.setFeatureType"><h3>TerrainBuilder.setFeatureType(x, y, type)</h3>

**说明**: 设置地物类型。

| 参数名 | 类型 | 说明 |
|------|------|------|
| x | `int` | X 坐标 |
| y | `int` | Y 坐标 |
| type | `string` | 地物类型 |

**返回值**: `void`

</API>

<API id="TerrainBuilder.setBiomeType"><h3>TerrainBuilder.setBiomeType(x, y, type)</h3>

**说明**: 设置生物群落类型。

| 参数名 | 类型 | 说明 |
|------|------|------|
| x | `int` | X 坐标 |
| y | `int` | Y 坐标 |
| type | `string` | 生物群落类型 |

**返回值**: `void`

</API>

<API id="TerrainBuilder.setLandmassRegionId"><h3>TerrainBuilder.setLandmassRegionId(x, y, id)</h3>

**说明**: 设置陆地区域 ID。

| 参数名 | 类型 | 说明 |
|------|------|------|
| x | `int` | X 坐标 |
| y | `int` | Y 坐标 |
| id | `int` | 区域 ID |

**返回值**: `void`

</API>

<API id="AreaBuilder.recalculateAreas"><h3>AreaBuilder.recalculateAreas()</h3>

**说明**: 重新计算所有区域。

**参数**: 无

**返回值**: `void`

**使用示例**:

```javascript
// 来源 TunerPanels/Map.ltp
// 简要描述功能：地形修改后重新计算区域
AreaBuilder.recalculateAreas();
```

</API>

<API id="AreaBuilder.findBiggestArea"><h3>AreaBuilder.findBiggestArea()</h3>

**说明**: 查找最大区域。

**参数**: 无

**返回值**: `int`

</API>

<API id="AreaBuilder.getAreaBoundary"><h3>AreaBuilder.getAreaBoundary(areaID)</h3>

**说明**: 获取区域边界。

| 参数名 | 类型 | 说明 |
|------|------|------|
| areaID | `int` | 区域 ID |

**返回值**: `object`

</API>

<API id="AreaBuilder.isAreaConnectedToOcean"><h3>AreaBuilder.isAreaConnectedToOcean(areaID)</h3>

**说明**: 判断区域是否连接海洋。

| 参数名 | 类型 | 说明 |
|------|------|------|
| areaID | `int` | 区域 ID |

**返回值**: `bool`

</API>

<API id="AreaBuilder.getPlotCount"><h3>AreaBuilder.getPlotCount(areaID)</h3>

**说明**: 获取区域内地块数量。

| 参数名 | 类型 | 说明 |
|------|------|------|
| areaID | `int` | 区域 ID |

**返回值**: `int`

</API>

<API id="ResourceBuilder.canHaveResource"><h3>ResourceBuilder.canHaveResource(x, y, type)</h3>

**说明**: 判断地块是否可以放置指定资源。

| 参数名 | 类型 | 说明 |
|------|------|------|
| x | `int` | X 坐标 |
| y | `int` | Y 坐标 |
| type | `string` | 资源类型 |

**返回值**: `bool`

</API>

<API id="ResourceBuilder.setResourceType"><h3>ResourceBuilder.setResourceType(x, y, type)</h3>

**说明**: 设置资源类型。

| 参数名 | 类型 | 说明 |
|------|------|------|
| x | `int` | X 坐标 |
| y | `int` | Y 坐标 |
| type | `string` | 资源类型 |

**返回值**: `void`

</API>

<API id="ResourceBuilder.getResourceLandmass"><h3>ResourceBuilder.getResourceLandmass(type)</h3>

**说明**: 获取资源所属陆地。

| 参数名 | 类型 | 说明 |
|------|------|------|
| type | `string` | 资源类型 |

**返回值**: `int`

</API>

<API id="ResourceBuilder.isResourceRequiredForAge"><h3>ResourceBuilder.isResourceRequiredForAge(type)</h3>

**说明**: 判断资源是否为时代必需。

| 参数名 | 类型 | 说明 |
|------|------|------|
| type | `string` | 资源类型 |

**返回值**: `bool`

</API>

<API id="ResourceBuilder.getGeneratedMapResources"><h3>ResourceBuilder.getGeneratedMapResources()</h3>

**说明**: 获取生成的地图资源。

**参数**: 无

**返回值**: `array`

</API>

<API id="FractalBuilder.create"><h3>FractalBuilder.create(params)</h3>

**说明**: 创建分形生成器。

| 参数名 | 类型 | 说明 |
|------|------|------|
| params | `object` | 分形参数 |

**返回值**: `Fractal`

</API>

<API id="FractalBuilder.getHeightFromPercent"><h3>FractalBuilder.getHeightFromPercent(percent)</h3>

**说明**: 从百分比获取高度值。

| 参数名 | 类型 | 说明 |
|------|------|------|
| percent | `float` | 百分比值 |

**返回值**: `int`

</API>

<API id="FractalBuilder.getHeight"><h3>FractalBuilder.getHeight(x, y)</h3>

**说明**: 获取指定位置的高度值。

| 参数名 | 类型 | 说明 |
|------|------|------|
| x | `int` | X 坐标 |
| y | `int` | Y 坐标 |

**返回值**: `int`

</API>

<API id="StartPositioner.setStartPosition"><h3>StartPositioner.setStartPosition(playerID, location)</h3>

**说明**: 设置玩家起始位置。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 玩家 ID |
| location | `object` | 位置对象 |

**返回值**: `void`

</API>

<API id="StartPositioner.getPlotFertilityForCoord"><h3>StartPositioner.getPlotFertilityForCoord(x, y)</h3>

**说明**: 获取指定坐标地块的肥沃度。

| 参数名 | 类型 | 说明 |
|------|------|------|
| x | `int` | X 坐标 |
| y | `int` | Y 坐标 |

**返回值**: `int`

</API>

<API id="StartPositioner.initializeValues"><h3>StartPositioner.initializeValues()</h3>

**说明**: 初始化起始位置计算所需的值。

**参数**: 无

**返回值**: `void`

</API>

<API id="StartPositioner.divideMapIntoMajorRegions"><h3>StartPositioner.divideMapIntoMajorRegions()</h3>

**说明**: 将地图划分为主要区域。

**参数**: 无

**返回值**: `void`

</API>

<API id="StartPositioner.getMajorStartRegion"><h3>StartPositioner.getMajorStartRegion(playerID)</h3>

**说明**: 获取玩家的主要起始区域。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 玩家 ID |

**返回值**: `int`

</API>

<API id="StartPositioner.getStartPosition"><h3>StartPositioner.getStartPosition(playerID)</h3>

**说明**: 获取玩家起始位置。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 玩家 ID |

**返回值**: `object`

</API>

<API id="MapConstructibles.getConstructibles"><h3>MapConstructibles.getConstructibles(location)</h3>

**说明**: 获取指定位置上的建造物。

| 参数名 | 类型 | 说明 |
|------|------|------|
| location | `object` | 位置对象 |

**返回值**: `array`

</API>

<API id="MapConstructibles.getHiddenFilteredConstructibles"><h3>MapConstructibles.getHiddenFilteredConstructibles(location)</h3>

**说明**: 获取隐藏过滤后的建造物。

| 参数名 | 类型 | 说明 |
|------|------|------|
| location | `object` | 位置对象 |

**返回值**: `array`

</API>

<API id="MapConstructibles.addDiscovery"><h3>MapConstructibles.addDiscovery(location, type)</h3>

**说明**: 添加发现。

| 参数名 | 类型 | 说明 |
|------|------|------|
| location | `object` | 位置对象 |
| type | `string` | 发现类型 |

**返回值**: `void`

</API>

<API id="MapConstructibles.addRoute"><h3>MapConstructibles.addRoute(location, type)</h3>

**说明**: 添加道路。

| 参数名 | 类型 | 说明 |
|------|------|------|
| location | `object` | 位置对象 |
| type | `string` | 道路类型 |

**返回值**: `void`

</API>

<API id="MapConstructibles.removeRoute"><h3>MapConstructibles.removeRoute(location)</h3>

**说明**: 移除道路。

| 参数名 | 类型 | 说明 |
|------|------|------|
| location | `object` | 位置对象 |

**返回值**: `void`

</API>