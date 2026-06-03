---
title: GameplayMap 地图操作
---

# GameplayMap 地图操作

地图操作的核心全局对象，直接在脚本中使用，无需 import。

```javascript
const iSize = GameplayMap.getMapSize();
const iTerrain = GameplayMap.getTerrainType(10, 20);
const iDist = GameplayMap.getPlotDistance(10, 20, 30, 40);
```

## 方法列表（共 55 个）

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `getMapSize` | — | `int` | 获取当前地图尺寸枚举值 |
| `getGridWidth` | — | `int` | 地图网格宽度（列数） |
| `getGridHeight` | — | `int` | 地图网格高度（行数） |
| `getPlotDistance` | iX1, iY1, iX2, iY2 | `int` | 计算两个地块之间的六角格距离 |
| `getIndexFromXY` | iX, iY | `int` | 二维坐标转一维索引 |
| `getLocationFromIndex` | iIndex | `object` | 一维索引转 {x, y} 坐标 |
| `isValidLocation` | location | `bool` | 坐标是否在地图范围内 |
| `getAdjacentPlotLocation` | location, direction | `object` | 获取指定方向(0-5)相邻地块坐标 |
| `getDirectionToPlot` | fromLoc, toLoc | `int` | 获取两个地块之间的方向 |
| `getTerrainType` | iX, iY | `int` | 地形类型（对照 GameInfo.Terrains） |
| `getBiomeType` | iX, iY | `int` | 生物群落类型 |
| `getFeatureType` | iX, iY | `int` | 地物类型（森林、沼泽等） |
| `getFeatureClassType` | iX, iY | `int` | 地物分类类型 |
| `getResourceType` | iX, iY | `int` | 资源类型 |
| `getContinentType` | iX, iY | `int` | 大陆类型 |
| `getElevation` | iX, iY | `int` | 海拔高度 |
| `getRainfall` | iX, iY | `int` | 降雨量 |
| `getPlotLatitude` | iX, iY | `float` | 纬度 |
| `getHemisphere` | iX, iY | `int` | 所在半球 |
| `getPrimaryHemisphere` | iX, iY | `int` | 主要半球 |
| `getAppeal` | iX, iY | `int` | 吸引力值 |
| `getOwner` | iX, iY | `int` | 所属玩家ID，-1=无主 |
| `getOwnerName` | iX, iY | `string` | 所属玩家名称 |
| `getOwningCityFromXY` | iX, iY | `object` | 拥有该地块的城市对象 |
| `getRegionId` | iX, iY | `int` | 区域 ID |
| `getLandmassRegionId` | iX, iY | `int` | 陆地区域 ID |
| `getAreaId` | iX, iY | `int` | 面积区域 ID |
| `getAreaIsWater` | iX, iY | `bool` | 区域是否为水域 |
| `getRiverType` | iX, iY | `int` | 河流类型 |
| `getRiverName` | iX, iY | `string` | 河流名称 |
| `getRouteType` | iX, iY | `int` | 道路类型 |
| `getVolcanoName` | iX, iY | `string` | 火山名称 |
| `isWater` | iX, iY | `bool` | 是否为水域 |
| `isMountain` | iX, iY | `bool` | 是否为山脉 |
| `isLake` | iX, iY | `bool` | 是否为湖泊 |
| `isRiver` | iX, iY | `bool` | 是否有河流 |
| `isNavigableRiver` | iX, iY | `bool` | 河流是否可通航 |
| `isCoastalLand` | iX, iY | `bool` | 是否为沿海陆地 |
| `isFreshWater` | iX, iY | `bool` | 是否有淡水 |
| `isVolcano` | iX, iY | `bool` | 是否为火山 |
| `isVolcanoActive` | iX, iY | `bool` | 火山是否活跃 |
| `isNaturalWonder` | iX, iY | `bool` | 是否为自然奇观 |
| `isImpassable` | iX, iY | `bool` | 是否不可通行 |
| `isCliffCrossing` | iX1, iY1, iX2, iY2 | `bool` | 两地块之间是否有悬崖 |
| `isFerry` | iX, iY | `bool` | 是否为渡口 |
| `isAdjacentToFeature` | iX, iY | `bool` | 是否与地物相邻 |
| `isAdjacentToLand` | iX, iY | `bool` | 是否与陆地相邻 |
| `isAdjacentToRivers` | iX, iY | `bool` | 是否与河流相邻 |
| `isAdjacentToShallowWater` | iX, iY | `bool` | 是否与浅水相邻 |
| `hasPlotTag` | iX, iY, tag | `bool` | 地块是否有特定标签 |
| `getYields` | iX, iY | `object` | 地块产出数据 |
| `getYieldsWithCity` | iX, iY, city | `object` | 特定城市影响下的产出 |
| `getRevealedState` | iX, iY, playerID | `int` | 地块对指定玩家的揭示状态 |
| `getPlotIndicesInRadius` | iX, iY, radius | `int[]` | 半径内所有地块索引数组 |
| `getRandomSeed` | — | `int` | 地图随机种子 |
