---
title: GameplayMap 地图操作
doc_type: object
summary: 地图操作的全局对象，负责地图尺寸、地块坐标、地形、资源、区域、河流等地理信息的查询。
primary_scope:
  - GameplayMap
related_scope:
  - GameInfo.Terrains
source:
  - TunerPanels/Map.ltp
  - TunerPanels/Cities.ltp
  - TunerPanels/Features.ltp
  - TunerPanels/Resources.ltp
  - TunerPanels/Player.ltp
  - TunerPanels/Random Events.ltp
  - modules/age-antiquity/ui/tutorial/tutorial-items-antiquity.js
  - modules/base-standard/ui-next/tooltips/plot-tooltip/helpers.js
  - modules/base-standard/ui-next/tooltips/plot-tooltip/plot-tooltip.js
  - modules/base-standard/maps/feature-biome-generator.js
  - modules/base-standard/maps/volcano-generator.js
  - modules/base-standard/maps/resource-generator.js
  - modules/base-standard/scripts/age-transition-post-load.js
doc_update: 2026-06-05
---

# GameplayMap 地图操作

地图操作的核心全局对象，直接在脚本中使用，无需 import。

```javascript
// 来源 TunerPanels/Map.ltp
// 获取地图基本信息：尺寸、地形、距离
const iSize = GameplayMap.getMapSize();
const iTerrain = GameplayMap.getTerrainType(10, 20);
const iDist = GameplayMap.getPlotDistance(10, 20, 30, 40);
```

## 方法列表（共 55 个）

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>GameplayMap.getMapSize</API> | — | `int` | 获取当前地图尺寸枚举值 |
| <API>GameplayMap.getGridWidth</API> | — | `int` | 地图网格宽度（列数） |
| <API>GameplayMap.getGridHeight</API> | — | `int` | 地图网格高度（行数） |
| <API>GameplayMap.getPlotDistance</API> | iX1, iY1, iX2, iY2 | `int` | 计算两个地块之间的六角格距离 |
| <API>GameplayMap.getIndexFromXY</API> | iX, iY | `int` | 二维坐标转一维索引 |
| <API>GameplayMap.getLocationFromIndex</API> | iIndex | `object` | 一维索引转 {x, y} 坐标 |
| <API>GameplayMap.isValidLocation</API> | location | `bool` | 坐标是否在地图范围内 |
| <API>GameplayMap.getAdjacentPlotLocation</API> | location, direction | `object` | 获取指定方向(0-5)相邻地块坐标 |
| <API>GameplayMap.getDirectionToPlot</API> | fromLoc, toLoc | `int` | 获取两个地块之间的方向 |
| <API>GameplayMap.getTerrainType</API> | iX, iY | `int` | 地形类型（对照 GameInfo.Terrains） |
| <API>GameplayMap.getBiomeType</API> | iX, iY | `int` | 生物群落类型 |
| <API>GameplayMap.getFeatureType</API> | iX, iY | `int` | 地物类型（森林、沼泽等） |
| <API>GameplayMap.getFeatureClassType</API> | iX, iY | `int` | 地物分类类型 |
| <API>GameplayMap.getResourceType</API> | iX, iY | `int` | 资源类型 |
| <API>GameplayMap.getContinentType</API> | iX, iY | `int` | 大陆类型 |
| <API>GameplayMap.getElevation</API> | iX, iY | `int` | 海拔高度 |
| <API>GameplayMap.getRainfall</API> | iX, iY | `int` | 降雨量 |
| <API>GameplayMap.getPlotLatitude</API> | iX, iY | `float` | 纬度 |
| <API>GameplayMap.getHemisphere</API> | iX, iY | `int` | 所在半球 |
| <API>GameplayMap.getPrimaryHemisphere</API> | iX, iY | `int` | 主要半球 |
| <API>GameplayMap.getAppeal</API> | iX, iY | `int` | 吸引力值 |
| <API>GameplayMap.getOwner</API> | iX, iY | `int` | 所属玩家ID，-1=无主 |
| <API>GameplayMap.getOwnerName</API> | iX, iY | `string` | 所属玩家名称 |
| <API>GameplayMap.getOwningCityFromXY</API> | iX, iY | `object` | 拥有该地块的城市对象 |
| <API>GameplayMap.getRegionId</API> | iX, iY | `int` | 区域 ID |
| <API>GameplayMap.getLandmassRegionId</API> | iX, iY | `int` | 陆地区域 ID |
| <API>GameplayMap.getAreaId</API> | iX, iY | `int` | 面积区域 ID |
| <API>GameplayMap.getAreaIsWater</API> | iX, iY | `bool` | 区域是否为水域 |
| <API>GameplayMap.getRiverType</API> | iX, iY | `int` | 河流类型 |
| <API>GameplayMap.getRiverName</API> | iX, iY | `string` | 河流名称 |
| <API>GameplayMap.getRouteType</API> | iX, iY | `int` | 道路类型 |
| <API>GameplayMap.getVolcanoName</API> | iX, iY | `string` | 火山名称 |
| <API>GameplayMap.isWater</API> | iX, iY | `bool` | 是否为水域 |
| <API>GameplayMap.isMountain</API> | iX, iY | `bool` | 是否为山脉 |
| <API>GameplayMap.isLake</API> | iX, iY | `bool` | 是否为湖泊 |
| <API>GameplayMap.isRiver</API> | iX, iY | `bool` | 是否有河流 |
| <API>GameplayMap.isNavigableRiver</API> | iX, iY | `bool` | 河流是否可通航 |
| <API>GameplayMap.isCoastalLand</API> | iX, iY | `bool` | 是否为沿海陆地 |
| <API>GameplayMap.isFreshWater</API> | iX, iY | `bool` | 是否有淡水 |
| <API>GameplayMap.isVolcano</API> | iX, iY | `bool` | 是否为火山 |
| <API>GameplayMap.isVolcanoActive</API> | iX, iY | `bool` | 火山是否活跃 |
| <API>GameplayMap.isNaturalWonder</API> | iX, iY | `bool` | 是否为自然奇观 |
| <API>GameplayMap.isImpassable</API> | iX, iY | `bool` | 是否不可通行 |
| <API>GameplayMap.isCliffCrossing</API> | iX1, iY1, iX2, iY2 | `bool` | 两地块之间是否有悬崖 |
| <API>GameplayMap.isFerry</API> | iX, iY | `bool` | 是否为渡口 |
| <API>GameplayMap.isAdjacentToFeature</API> | iX, iY | `bool` | 是否与地物相邻 |
| <API>GameplayMap.isAdjacentToLand</API> | iX, iY | `bool` | 是否与陆地相邻 |
| <API>GameplayMap.isAdjacentToRivers</API> | iX, iY | `bool` | 是否与河流相邻 |
| <API>GameplayMap.isAdjacentToShallowWater</API> | iX, iY | `bool` | 是否与浅水相邻 |
| <API>GameplayMap.hasPlotTag</API> | iX, iY, tag | `bool` | 地块是否有特定标签 |
| <API>GameplayMap.getYields</API> | iX, iY | `object` | 地块产出数据 |
| <API>GameplayMap.getYieldsWithCity</API> | iX, iY, city | `object` | 特定城市影响下的产出 |
| <API>GameplayMap.getRevealedState</API> | iX, iY, playerID | `int` | 地块对指定玩家的揭示状态 |
| <API>GameplayMap.getPlotIndicesInRadius</API> | iX, iY, radius | `int[]` | 半径内所有地块索引数组 |
| <API>GameplayMap.getRandomSeed</API> | — | `int` | 地图随机种子 |

## GameInfo 关联表

```javascript
GameInfo.Terrains;       // 地形类型定义表
GameInfo.Features;       // 地物类型定义表
GameInfo.Resources;      // 资源类型定义表
```

<!-- 
  以下 <API> 内容块为各方法的弹窗说明。
  按方法字母序排列（getXxx 在前，isXxx 在后，hasXxx 在最后）。
-->

<API id="GameplayMap.getMapSize"><h3>GameplayMap.getMapSize()</h3>

**说明**: 获取当前游戏地图尺寸的枚举值，对应 GameInfo 中定义的地图尺寸类型。

**参数**: 无

**返回值**: `int` — 地图尺寸枚举值

**使用示例**:

```javascript
// 来源 modules/base-standard/maps/terra-incognita.js
// 获取地图尺寸用于初始化
const uiMapSize = GameplayMap.getMapSize();
```

</API>

<API id="GameplayMap.getGridWidth"><h3>GameplayMap.getGridWidth()</h3>

**说明**: 获取地图网格的宽度（列数）。

**参数**: 无

**返回值**: `int`

**使用示例**:

```javascript
// 来源 TunerPanels/Map.ltp
// 计算地图总地块数
let size = GameplayMap.getGridWidth() * GameplayMap.getGridHeight();
```

</API>

<API id="GameplayMap.getGridHeight"><h3>GameplayMap.getGridHeight()</h3>

**说明**: 获取地图网格的高度（行数）。

**参数**: 无

**返回值**: `int`

**使用示例**:

```javascript
// 来源 TunerPanels/Map.ltp
// 显示地图尺寸信息
let result = GameplayMap.getGridWidth().toString() + " x " + GameplayMap.getGridHeight().toString();
```

</API>

<API id="GameplayMap.getPlotDistance"><h3>GameplayMap.getPlotDistance(iX1, iY1, iX2, iY2)</h3>

**说明**: 计算两个地块之间的六角格距离。

| 参数名 | 类型 | 说明 |
|------|------|------|
| iX1 | `int` | 第一个地块 X 坐标 |
| iY1 | `int` | 第一个地块 Y 坐标 |
| iX2 | `int` | 第二个地块 X 坐标 |
| iY2 | `int` | 第二个地块 Y 坐标 |

**返回值**: `int`

</API>

<API id="GameplayMap.getIndexFromXY"><h3>GameplayMap.getIndexFromXY(iX, iY)</h3>

**说明**: 将二维地图坐标 (X,Y) 转换为一维索引值。

| 参数名 | 类型 | 说明 |
|------|------|------|
| iX | `int` | X 坐标 |
| iY | `int` | Y 坐标 |

**返回值**: `int` — 一维地块索引

**使用示例**:

```javascript
// 来源 TunerPanels/Resources.ltp
// 坐标转索引
let index = GameplayMap.getIndexFromXY(x, y);
```

</API>

<API id="GameplayMap.getLocationFromIndex"><h3>GameplayMap.getLocationFromIndex(iIndex)</h3>

**说明**: 将一维地块索引转换为二维坐标对象 `{x, y}`。这是地图操作中使用频率最高的方法之一。

| 参数名 | 类型 | 说明 |
|------|------|------|
| iIndex | `int` | 地块一维索引 |

**返回值**: `object` — `{ x: int, y: int }`

**使用示例**:

```javascript
// 来源 TunerPanels/Cities.ltp
// 索引转二维坐标
let loc = GameplayMap.getLocationFromIndex(g_TunerState.CityPanel.selectedOwnedPlot);
console.log(loc.x, loc.y);
```

</API>

<API id="GameplayMap.isValidLocation"><h3>GameplayMap.isValidLocation(location)</h3>

**说明**: 检查给定坐标对象是否位于地图范围内。

| 参数名 | 类型 | 说明 |
|------|------|------|
| location | `object` | 坐标对象 `{x, y}` |

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 TunerPanels/Random Events.ltp
// 检查火山位置是否合法
let center = GameplayMap.getLocationFromIndex(volcanoPlotIndex);
if (GameplayMap.isValidLocation(center)) {
  let plots = GameplayMap.getPlotIndicesInRadius(center.x, center.y, 1);
}
```

</API>

<API id="GameplayMap.getAdjacentPlotLocation"><h3>GameplayMap.getAdjacentPlotLocation(location, direction)</h3>

**说明**: 获取指定方向上的相邻地块坐标。direction 取值为 0-5（六角格六个方向）。

| 参数名 | 类型 | 说明 |
|------|------|------|
| location | `object` | 当前坐标 `{x, y}` |
| direction | `int` | 方向 0-5 |

**返回值**: `object` — `{ x: int, y: int }`

**使用示例**:

```javascript
// 来源 modules/base-standard/maps/volcano-generator.js
// 获取相邻地块位置
const iLocation = GameplayMap.getLocationFromIndex(iIndex);
const pAdjacentPlot = GameplayMap.getAdjacentPlotLocation(iLocation, iDirection);
```

</API>

<API id="GameplayMap.getDirectionToPlot"><h3>GameplayMap.getDirectionToPlot(fromLoc, toLoc)</h3>

**说明**: 获取从 fromLoc 到 toLoc 的方向值（0-5，六角格方向）。

| 参数名 | 类型 | 说明 |
|------|------|------|
| fromLoc | `object` | 起点坐标 `{x, y}` |
| toLoc | `object` | 终点坐标 `{x, y}` |

**返回值**: `int` — 方向 0-5

</API>

<API id="GameplayMap.getTerrainType"><h3>GameplayMap.getTerrainType(iX, iY)</h3>

**说明**: 获取指定地块的地形类型枚举值，对照 `GameInfo.Terrains` 查询地形名称。

| 参数名 | 类型 | 说明 |
|------|------|------|
| iX | `int` | X 坐标 |
| iY | `int` | Y 坐标 |

**返回值**: `int` — 地形类型哈希值

**使用示例**:

```javascript
// 来源 modules/base-standard/ui-next/tooltips/plot-tooltip/helpers.js
// 获取地形类型并查询名称
const terrainType = GameplayMap.getTerrainType(location.x, location.y);
const terrain = GameInfo.Terrains.lookup(terrainType);
```

</API>

<API id="GameplayMap.getBiomeType"><h3>GameplayMap.getBiomeType(iX, iY)</h3>

**说明**: 获取指定地块的生物群落类型。

| 参数名 | 类型 | 说明 |
|------|------|------|
| iX | `int` | X 坐标 |
| iY | `int` | Y 坐标 |

**返回值**: `int`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui-next/tooltips/plot-tooltip/helpers.js
// 获取生物群落类型
const biomeType = GameplayMap.getBiomeType(location.x, location.y);
```

</API>

<API id="GameplayMap.getFeatureType"><h3>GameplayMap.getFeatureType(iX, iY)</h3>

**说明**: 获取指定地块的地物类型（如森林、沼泽、雨林等），对照 `GameInfo.Features` 查询。

| 参数名 | 类型 | 说明 |
|------|------|------|
| iX | `int` | X 坐标 |
| iY | `int` | Y 坐标 |

**返回值**: `int` — 地物类型哈希值

**使用示例**:

```javascript
// 来源 modules/base-standard/ui-next/tooltips/plot-tooltip/helpers.js
// 获取地物类型
const type = GameplayMap.getFeatureType(location.x, location.y);
```

</API>

<API id="GameplayMap.getFeatureClassType"><h3>GameplayMap.getFeatureClassType(iX, iY)</h3>

**说明**: 获取指定地块的地物分类类型（比具体地物类型层级更高的大类）。

| 参数名 | 类型 | 说明 |
|------|------|------|
| iX | `int` | X 坐标 |
| iY | `int` | Y 坐标 |

**返回值**: `int`

</API>

<API id="GameplayMap.getResourceType"><h3>GameplayMap.getResourceType(iX, iY)</h3>

**说明**: 获取指定地块的资源类型，对照 `GameInfo.Resources` 查询资源名称。

| 参数名 | 类型 | 说明 |
|------|------|------|
| iX | `int` | X 坐标 |
| iY | `int` | Y 坐标 |

**返回值**: `int` — 资源类型哈希值

**使用示例**:

```javascript
// 来源 modules/age-antiquity/ui/tutorial/tutorial-items-antiquity.js
// 检查地块是否有特定资源
const resource = GameplayMap.getResourceType(loc.x, loc.y);
```

</API>

<API id="GameplayMap.getContinentType"><h3>GameplayMap.getContinentType(iX, iY)</h3>

**说明**: 获取指定地块所在的大陆类型。

| 参数名 | 类型 | 说明 |
|------|------|------|
| iX | `int` | X 坐标 |
| iY | `int` | Y 坐标 |

**返回值**: `int`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui-next/tooltips/plot-tooltip/helpers.js
// 获取大陆类型
const continentType = GameplayMap.getContinentType(location.x, location.y);
```

</API>

<API id="GameplayMap.getElevation"><h3>GameplayMap.getElevation(iX, iY)</h3>

**说明**: 获取指定地块的海拔高度。

| 参数名 | 类型 | 说明 |
|------|------|------|
| iX | `int` | X 坐标 |
| iY | `int` | Y 坐标 |

**返回值**: `int`

**使用示例**:

```javascript
// 来源 modules/base-standard/maps/feature-biome-generator.js
// 获取海拔用于调整纬度计算
latitude += Math.round(GameplayMap.getElevation(iX, iY) / 120);
```

</API>

<API id="GameplayMap.getRainfall"><h3>GameplayMap.getRainfall(iX, iY)</h3>

**说明**: 获取指定地块的降雨量。

| 参数名 | 类型 | 说明 |
|------|------|------|
| iX | `int` | X 坐标 |
| iY | `int` | Y 坐标 |

**返回值**: `int`

**使用示例**:

```javascript
// 来源 modules/base-standard/maps/feature-biome-generator.js
// 获取降雨量用于植被生成
const rainfall = GameplayMap.getRainfall(iX, iY);
```

</API>

<API id="GameplayMap.getPlotLatitude"><h3>GameplayMap.getPlotLatitude(iX, iY)</h3>

**说明**: 获取指定地块的纬度值（浮点数）。

| 参数名 | 类型 | 说明 |
|------|------|------|
| iX | `int` | X 坐标 |
| iY | `int` | Y 坐标 |

**返回值**: `float`

**使用示例**:

```javascript
// 来源 modules/base-standard/maps/feature-biome-generator.js
// 获取纬度用于生物群落判断
const latitude = GameplayMap.getPlotLatitude(iX, iY);
```

</API>

<API id="GameplayMap.getHemisphere"><h3>GameplayMap.getHemisphere(iX, iY)</h3>

**说明**: 获取指定地块所在的半球（北半球/南半球）。

| 参数名 | 类型 | 说明 |
|------|------|------|
| iX | `int` | X 坐标 |
| iY | `int` | Y 坐标 |

**返回值**: `int`

</API>

<API id="GameplayMap.getPrimaryHemisphere"><h3>GameplayMap.getPrimaryHemisphere(iX, iY)</h3>

**说明**: 获取指定地块的主要半球类型。

| 参数名 | 类型 | 说明 |
|------|------|------|
| iX | `int` | X 坐标 |
| iY | `int` | Y 坐标 |

**返回值**: `int`

</API>

<API id="GameplayMap.getAppeal"><h3>GameplayMap.getAppeal(iX, iY)</h3>

**说明**: 获取指定地块的吸引力值，用于影响邻接加成等。

| 参数名 | 类型 | 说明 |
|------|------|------|
| iX | `int` | X 坐标 |
| iY | `int` | Y 坐标 |

**返回值**: `int`

</API>

<API id="GameplayMap.getOwner"><h3>GameplayMap.getOwner(iX, iY)</h3>

**说明**: 获取指定地块的拥有者玩家 ID。返回 -1 表示无主地块。

| 参数名 | 类型 | 说明 |
|------|------|------|
| iX | `int` | X 坐标 |
| iY | `int` | Y 坐标 |

**返回值**: `int` — 玩家 ID 或 -1

**使用示例**:

```javascript
// 来源 modules/base-standard/ui-next/tooltips/plot-tooltip/helpers.js
// 获取地块所有者
const playerID = GameplayMap.getOwner(location.x, location.y);
```

</API>

<API id="GameplayMap.getOwnerName"><h3>GameplayMap.getOwnerName(iX, iY)</h3>

**说明**: 获取指定地块拥有者的名称字符串。

| 参数名 | 类型 | 说明 |
|------|------|------|
| iX | `int` | X 坐标 |
| iY | `int` | Y 坐标 |

**返回值**: `string`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui-next/tooltips/plot-tooltip/helpers.js
// 获取地块所有者文明名称
const civName = GameplayMap.getOwnerName(location.x, location.y);
```

</API>

<API id="GameplayMap.getOwningCityFromXY"><h3>GameplayMap.getOwningCityFromXY(iX, iY)</h3>

**说明**: 获取拥有该地块的城市组件 ID（而非城市对象）。返回的 ID 需通过其他 API 获取城市详细信息。

| 参数名 | 类型 | 说明 |
|------|------|------|
| iX | `int` | X 坐标 |
| iY | `int` | Y 坐标 |

**返回值**: `object` — 城市组件 ID

**使用示例**:

```javascript
// 来源 modules/age-antiquity/ui/tutorial/tutorial-items-antiquity.js
// 获取地块所属城市
const cityComponentID = GameplayMap.getOwningCityFromXY(location.x, location.y);
```

</API>

<API id="GameplayMap.getRegionId"><h3>GameplayMap.getRegionId(iX, iY)</h3>

**说明**: 获取指定地块所在的区域 ID。

| 参数名 | 类型 | 说明 |
|------|------|------|
| iX | `int` | X 坐标 |
| iY | `int` | Y 坐标 |

**返回值**: `int`

</API>

<API id="GameplayMap.getLandmassRegionId"><h3>GameplayMap.getLandmassRegionId(iX, iY)</h3>

**说明**: 获取指定地块所在的陆地区域 ID。

| 参数名 | 类型 | 说明 |
|------|------|------|
| iX | `int` | X 坐标 |
| iY | `int` | Y 坐标 |

**返回值**: `int`

**使用示例**:

```javascript
// 来源 modules/base-standard/scripts/age-transition-post-load.js
// 获取陆地区域 ID 用于资源分布
const landmassRegionId = GameplayMap.getLandmassRegionId(kLocation.x, kLocation.y);
```

</API>

<API id="GameplayMap.getAreaId"><h3>GameplayMap.getAreaId(iX, iY)</h3>

**说明**: 获取指定地块所在的面积区域 ID。

| 参数名 | 类型 | 说明 |
|------|------|------|
| iX | `int` | X 坐标 |
| iY | `int` | Y 坐标 |

**返回值**: `int`

</API>

<API id="GameplayMap.getAreaIsWater"><h3>GameplayMap.getAreaIsWater(iX, iY)</h3>

**说明**: 判断指定地块所在区域是否为水域。

| 参数名 | 类型 | 说明 |
|------|------|------|
| iX | `int` | X 坐标 |
| iY | `int` | Y 坐标 |

**返回值**: `bool`

</API>

<API id="GameplayMap.getRiverType"><h3>GameplayMap.getRiverType(iX, iY)</h3>

**说明**: 获取指定地块的河流类型。

| 参数名 | 类型 | 说明 |
|------|------|------|
| iX | `int` | X 坐标 |
| iY | `int` | Y 坐标 |

**返回值**: `int`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui-next/tooltips/plot-tooltip/helpers.js
// 获取河流类型
const riverType = GameplayMap.getRiverType(location.x, location.y);
```

</API>

<API id="GameplayMap.getRiverName"><h3>GameplayMap.getRiverName(iX, iY)</h3>

**说明**: 获取指定地块所在河流的名称字符串。

| 参数名 | 类型 | 说明 |
|------|------|------|
| iX | `int` | X 坐标 |
| iY | `int` | Y 坐标 |

**返回值**: `string`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui-next/tooltips/plot-tooltip/helpers.js
// 获取河流名称
let riverNameLabel = GameplayMap.getRiverName(location.x, location.y);
```

</API>

<API id="GameplayMap.getRouteType"><h3>GameplayMap.getRouteType(iX, iY)</h3>

**说明**: 获取指定地块的道路类型（如古代道路、铁路等）。

| 参数名 | 类型 | 说明 |
|------|------|------|
| iX | `int` | X 坐标 |
| iY | `int` | Y 坐标 |

**返回值**: `int`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui-next/tooltips/plot-tooltip/helpers.js
// 获取道路类型
const routeTypeHash = GameplayMap.getRouteType(location.x, location.y);
```

</API>

<API id="GameplayMap.getVolcanoName"><h3>GameplayMap.getVolcanoName(iX, iY)</h3>

**说明**: 获取指定地块所在火山的名称。

| 参数名 | 类型 | 说明 |
|------|------|------|
| iX | `int` | X 坐标 |
| iY | `int` | Y 坐标 |

**返回值**: `string`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui-next/tooltips/plot-tooltip/helpers.js
// 获取火山名称
const volcanoName = GameplayMap.getVolcanoName(location.x, location.y);
```

</API>

<API id="GameplayMap.isWater"><h3>GameplayMap.isWater(iX, iY)</h3>

**说明**: 判断指定地块是否为水域。

| 参数名 | 类型 | 说明 |
|------|------|------|
| iX | `int` | X 坐标 |
| iY | `int` | Y 坐标 |

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 modules/base-standard/maps/feature-biome-generator.js
// 判断是否为水域，用于地物生成
if (GameplayMap.isWater(iX, iY) == false) {
  // 陆地地块处理
}
```

</API>

<API id="GameplayMap.isMountain"><h3>GameplayMap.isMountain(iX, iY)</h3>

**说明**: 判断指定地块是否为山脉。

| 参数名 | 类型 | 说明 |
|------|------|------|
| iX | `int` | X 坐标 |
| iY | `int` | Y 坐标 |

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui-next/tooltips/plot-tooltip/plot-tooltip.js
// 判断是否为山脉用于地形提示
const isMountain = GameplayMap.isMountain(local.plotCoord.x, local.plotCoord.y);
```

</API>

<API id="GameplayMap.isLake"><h3>GameplayMap.isLake(iX, iY)</h3>

**说明**: 判断指定地块是否为湖泊。

| 参数名 | 类型 | 说明 |
|------|------|------|
| iX | `int` | X 坐标 |
| iY | `int` | Y 坐标 |

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui-next/tooltips/plot-tooltip/helpers.js
// 判断沿海地块是否为湖泊
if (terrain.TerrainType == "TERRAIN_COAST" && GameplayMap.isLake(location.x, location.y)) {
  // 湖泊中的沿海地块
}
```

</API>

<API id="GameplayMap.isRiver"><h3>GameplayMap.isRiver(iX, iY)</h3>

**说明**: 判断指定地块是否有河流经过。

| 参数名 | 类型 | 说明 |
|------|------|------|
| iX | `int` | X 坐标 |
| iY | `int` | Y 坐标 |

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 modules/base-standard/maps/feature-biome-generator.js
// 判断河流用于植被生成
if (GameplayMap.isRiver(iX, iY)) {
  // 沿河地块处理
}
```

</API>

<API id="GameplayMap.isNavigableRiver"><h3>GameplayMap.isNavigableRiver(iX, iY)</h3>

**说明**: 判断指定地块上的河流是否可通航（即河道宽度足以让船只通行）。

| 参数名 | 类型 | 说明 |
|------|------|------|
| iX | `int` | X 坐标 |
| iY | `int` | Y 坐标 |

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 modules/base-standard/maps/feature-biome-generator.js
// 判断可通航河流用于排除特殊地物生成
if (GameplayMap.isNavigableRiver(iX, iY) == false) {
  // 非通航河流地块处理
}
```

</API>

<API id="GameplayMap.isCoastalLand"><h3>GameplayMap.isCoastalLand(iX, iY)</h3>

**说明**: 判断指定地块是否为沿海陆地（陆地且与水域相邻）。

| 参数名 | 类型 | 说明 |
|------|------|------|
| iX | `int` | X 坐标 |
| iY | `int` | Y 坐标 |

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 modules/base-standard/maps/feature-biome-generator.js
// 判断沿海陆地用于地物生成
if (GameplayMap.isCoastalLand(iX, iY)) {
  // 沿海陆地处理
}
```

</API>

<API id="GameplayMap.isFreshWater"><h3>GameplayMap.isFreshWater(iX, iY)</h3>

**说明**: 判断指定地块是否有淡水（河流或湖泊）。

| 参数名 | 类型 | 说明 |
|------|------|------|
| iX | `int` | X 坐标 |
| iY | `int` | Y 坐标 |

**返回值**: `bool`

</API>

<API id="GameplayMap.isVolcano"><h3>GameplayMap.isVolcano(iX, iY)</h3>

**说明**: 判断指定地块是否为火山。

| 参数名 | 类型 | 说明 |
|------|------|------|
| iX | `int` | X 坐标 |
| iY | `int` | Y 坐标 |

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui-next/tooltips/plot-tooltip/helpers.js
// 判断火山并获取活跃状态
if (GameplayMap.isVolcano(location.x, location.y)) {
  const active = GameplayMap.isVolcanoActive(location.x, location.y);
}
```

</API>

<API id="GameplayMap.isVolcanoActive"><h3>GameplayMap.isVolcanoActive(iX, iY)</h3>

**说明**: 判断指定地块的火山是否处于活跃状态。

| 参数名 | 类型 | 说明 |
|------|------|------|
| iX | `int` | X 坐标 |
| iY | `int` | Y 坐标 |

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui-next/tooltips/plot-tooltip/helpers.js
// 判断火山活跃状态
const active = GameplayMap.isVolcanoActive(location.x, location.y);
```

</API>

<API id="GameplayMap.isNaturalWonder"><h3>GameplayMap.isNaturalWonder(iX, iY)</h3>

**说明**: 判断指定地块是否为自然奇观。

| 参数名 | 类型 | 说明 |
|------|------|------|
| iX | `int` | X 坐标 |
| iY | `int` | Y 坐标 |

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui-next/tooltips/plot-tooltip/helpers.js
// 判断自然奇观
const isNaturalWonder = GameplayMap.isNaturalWonder(location.x, location.y);
```

</API>

<API id="GameplayMap.isImpassable"><h3>GameplayMap.isImpassable(iX, iY)</h3>

**说明**: 判断指定地块是否不可通行（如山峰、深渊等）。

| 参数名 | 类型 | 说明 |
|------|------|------|
| iX | `int` | X 坐标 |
| iY | `int` | Y 坐标 |

**返回值**: `bool`

</API>

<API id="GameplayMap.isCliffCrossing"><h3>GameplayMap.isCliffCrossing(iX1, iY1, iX2, iY2)</h3>

**说明**: 判断两个相邻地块之间是否有悬崖。

| 参数名 | 类型 | 说明 |
|------|------|------|
| iX1 | `int` | 第一个地块 X 坐标 |
| iY1 | `int` | 第一个地块 Y 坐标 |
| iX2 | `int` | 第二个地块 X 坐标 |
| iY2 | `int` | 第二个地块 Y 坐标 |

**返回值**: `bool`

</API>

<API id="GameplayMap.isFerry"><h3>GameplayMap.isFerry(iX, iY)</h3>

**说明**: 判断指定地块是否为渡口。

| 参数名 | 类型 | 说明 |
|------|------|------|
| iX | `int` | X 坐标 |
| iY | `int` | Y 坐标 |

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui-next/tooltips/plot-tooltip/helpers.js
// 判断渡口
const isFerry = GameplayMap.isFerry(location.x, location.y);
```

</API>

<API id="GameplayMap.isAdjacentToFeature"><h3>GameplayMap.isAdjacentToFeature(iX, iY)</h3>

**说明**: 判断指定地块是否与地物（如森林、沼泽）相邻。

| 参数名 | 类型 | 说明 |
|------|------|------|
| iX | `int` | X 坐标 |
| iY | `int` | Y 坐标 |

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 modules/base-standard/maps/feature-biome-generator.js
// 判断是否与特定地物相邻
if (!GameplayMap.isAdjacentToFeature(iX, iY, featIdx)) {
  // 不与该地物相邻时的处理
}
```

</API>

<API id="GameplayMap.isAdjacentToLand"><h3>GameplayMap.isAdjacentToLand(iX, iY)</h3>

**说明**: 判断指定地块是否与陆地相邻。

| 参数名 | 类型 | 说明 |
|------|------|------|
| iX | `int` | X 坐标 |
| iY | `int` | Y 坐标 |

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 modules/base-standard/maps/feature-biome-generator.js
// 判断是否与陆地相邻
if (GameplayMap.isAdjacentToLand(iX, iY)) {
  // 与陆地相邻的水域地块
}
```

</API>

<API id="GameplayMap.isAdjacentToRivers"><h3>GameplayMap.isAdjacentToRivers(iX, iY)</h3>

**说明**: 判断指定地块是否与河流相邻。

| 参数名 | 类型 | 说明 |
|------|------|------|
| iX | `int` | X 坐标 |
| iY | `int` | Y 坐标 |

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 modules/base-standard/maps/feature-biome-generator.js
// 判断是否与河流相邻用于植被生成
if (GameplayMap.isAdjacentToRivers(iX, iY, 1)) {
  // 沿河相邻地块处理
}
```

</API>

<API id="GameplayMap.isAdjacentToShallowWater"><h3>GameplayMap.isAdjacentToShallowWater(iX, iY)</h3>

**说明**: 判断指定地块是否与浅水相邻。

| 参数名 | 类型 | 说明 |
|------|------|------|
| iX | `int` | X 坐标 |
| iY | `int` | Y 坐标 |

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 modules/base-standard/maps/feature-biome-generator.js
// 判断是否与浅水相邻
if (GameplayMap.isAdjacentToShallowWater(x, y)) {
  // 浅水相邻地块处理
}
```

</API>

<API id="GameplayMap.hasPlotTag"><h3>GameplayMap.hasPlotTag(iX, iY, tag)</h3>

**说明**: 判断指定地块是否有特定的标签。

| 参数名 | 类型 | 说明 |
|------|------|------|
| iX | `int` | X 坐标 |
| iY | `int` | Y 坐标 |
| tag | `string/int` | 标签名或 ID |

**返回值**: `bool`

</API>

<API id="GameplayMap.getYields"><h3>GameplayMap.getYields(iX, iY)</h3>

**说明**: 获取指定地块的基础产出数据对象。

| 参数名 | 类型 | 说明 |
|------|------|------|
| iX | `int` | X 坐标 |
| iY | `int` | Y 坐标 |

**返回值**: `object` — 产出数据对象

**使用示例**:

```javascript
// 来源 modules/base-standard/ui-next/tooltips/plot-tooltip/helpers.js
// 获取地块产出
const rawYields = GameplayMap.getYields(plotIndex, playerID);
```

</API>

<API id="GameplayMap.getYieldsWithCity"><h3>GameplayMap.getYieldsWithCity(iX, iY, city)</h3>

**说明**: 获取在特定城市影响下指定地块的产出数据。

| 参数名 | 类型 | 说明 |
|------|------|------|
| iX | `int` | X 坐标 |
| iY | `int` | Y 坐标 |
| city | `object` | 城市对象 |

**返回值**: `object`

</API>

<API id="GameplayMap.getRevealedState"><h3>GameplayMap.getRevealedState(iX, iY, playerID)</h3>

**说明**: 获取指定地块对指定玩家的揭示状态（未探索/已探索/可见等）。

| 参数名 | 类型 | 说明 |
|------|------|------|
| iX | `int` | X 坐标 |
| iY | `int` | Y 坐标 |
| playerID | `int` | 玩家 ID |

**返回值**: `int`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui-next/tooltips/plot-tooltip/helpers.js
// 检查地块对本地玩家的可见性
const revealedState = GameplayMap.getRevealedState(
  localPlayer.id, location.x, location.y
);
if (revealedState != RevealedStates.VISIBLE) {
  // 地块不可见时的处理
}
```

</API>

<API id="GameplayMap.getPlotIndicesInRadius"><h3>GameplayMap.getPlotIndicesInRadius(iX, iY, radius)</h3>

**说明**: 获取指定坐标周围半径内的所有地块一维索引数组。常用于范围效果、邻接计算等。

| 参数名 | 类型 | 说明 |
|------|------|------|
| iX | `int` | 中心 X 坐标 |
| iY | `int` | 中心 Y 坐标 |
| radius | `int` | 半径（格数） |

**返回值**: `int[]` — 地块索引数组

**使用示例**:

```javascript
// 来源 TunerPanels/Player.ltp
// 获取地块周围半径 2 格内的所有地块
let loc = GameplayMap.getLocationFromIndex(g_TunerState.PlayerPanel.revealLocation);
let aPlots = GameplayMap.getPlotIndicesInRadius(loc.x, loc.y, 2);
```

</API>

<API id="GameplayMap.getRandomSeed"><h3>GameplayMap.getRandomSeed()</h3>

**说明**: 获取地图的随机种子值。

**参数**: 无

**返回值**: `int`

**使用示例**:

```javascript
// 来源 modules/base-standard/scripts/age-transition-post-load.js
// 获取随机种子用于时代过渡
const seed = GameplayMap.getRandomSeed() * (1 + g_incomingAge);
```

</API>