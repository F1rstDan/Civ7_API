---
title: Map Builders 地图构建
---

# Map Builders 地图构建

地图构建 API。

## TerrainBuilder

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `getRandomNumber` | max | `int` | 获取随机数 |
| `setTerrainType` | x, y, type | `void` | 设置地形类型 |
| `validateAndFixTerrain` | — | `void` | 验证并修复地形 |
| `modelRivers` | — | `void` | 生成河流模型 |
| `stampContinents` | — | `void` | 印盖大陆 |
| `buildElevation` | — | `void` | 构建海拔 |
| `defineNamedRivers` | — | `void` | 定义命名河流 |
| `addFloodplains` | — | `void` | 添加冲积平原 |
| `setPlotTag` | x, y, tag | `void` | 设置地块标签 |
| `setFeatureType` | x, y, type | `void` | 设置地物类型 |
| `setBiomeType` | x, y, type | `void` | 设置生物群落类型 |
| `setLandmassRegionId` | x, y, id | `void` | 设置陆地区域 ID |

## AreaBuilder

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `recalculateAreas` | — | `void` | 重新计算区域 |
| `findBiggestArea` | — | `int` | 查找最大区域 |
| `getAreaBoundary` | areaID | `object` | 获取区域边界 |
| `isAreaConnectedToOcean` | areaID | `bool` | 区域是否连接海洋 |
| `getPlotCount` | areaID | `int` | 获取区域地块数 |

## ResourceBuilder

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `canHaveResource` | x, y, type | `bool` | 地块是否可以有资源 |
| `setResourceType` | x, y, type | `void` | 设置资源类型 |
| `getResourceLandmass` | type | `int` | 获取资源所属陆地 |
| `isResourceRequiredForAge` | type | `bool` | 资源是否为时代必需 |
| `getGeneratedMapResources` | — | `array` | 获取生成的地图资源 |

## FractalBuilder

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `create` | params | `Fractal` | 创建分形生成器 |
| `getHeightFromPercent` | percent | `int` | 从百分比获取高度 |
| `getHeight` | x, y | `int` | 获取指定位置高度 |

## StartPositioner

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `setStartPosition` | playerID, location | `void` | 设置起始位置 |
| `getPlotFertilityForCoord` | x, y | `int` | 获取地块肥沃度 |
| `initializeValues` | — | `void` | 初始化值 |
| `divideMapIntoMajorRegions` | — | `void` | 将地图划分为主要区域 |
| `getMajorStartRegion` | playerID | `int` | 获取主要起始区域 |
| `getStartPosition` | playerID | `object` | 获取起始位置 |

## MapConstructibles

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `getConstructibles` | location | `array` | 获取地块上的建造物 |
| `getHiddenFilteredConstructibles` | location | `array` | 获取隐藏过滤的建造物 |
| `addDiscovery` | location, type | `void` | 添加发现 |
| `addRoute` | location, type | `void` | 添加道路 |
| `removeRoute` | location | `void` | 移除道路 |
