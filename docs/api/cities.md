---
title: Cities 城市
doc_type: object
summary: 城市管理的全局对象，提供城市的获取、位置查询等功能，以及 City 实例（属性、方法）和子系统（BuildQueue、Districts、Yields 等）。
primary_scope:
  - Cities
  - city
related_scope:
  - city.BuildQueue
  - city.FoodQueue
  - city.Districts
  - city.Constructibles
  - city.Yields
  - city.Religion
  - city.Trade
  - city.Resources
  - player.Cities
  - Districts
  - Constructibles
source:
  - TunerPanels/Cities.ltp
  - TunerPanels/Districts.ltp
  - TunerPanels/Resources.ltp
  - TunerPanels/Trade.ltp
  - modules/base-standard/ui/city-details/model-city-details.js
  - modules/base-standard/ui/city-banners/city-banners.js
  - modules/base-standard/ui/building-placement/building-placement-manager.js
  - modules/age-antiquity/ui/tutorial/tutorial-items-antiquity.js
doc_update: 2026-06-10
---

# Cities 城市

城市管理全局对象。用于获取城市实例、查询城市位置等。引擎直接注入，无需手动 import 引入。

```javascript
// 来源 TunerPanels/Cities.ltp
// 获取城市并读取基本属性
let city = Cities.get(cityId);
console.log(city.name, city.location, city.owner, city.isTown);
```

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Cities.get</API> | id | `City \| null` | 根据 ID 获取城市对象 |
| <API>Cities.getAtLocation</API> | plotIndex | `City \| null` | 获取指定地块索引位置的城市 |

## City 城市实例

城市实例通过 `Cities.get(cityId)` 获取。

```javascript
// 来源 TunerPanels/Cities.ltp
// 获取城市实例并读取属性
let city = Cities.get(cityId);
if (city && city.isValid) {
  // 读取属性
  console.log(city.name, city.isTown, city.population);
  // 调用方法
  city.addRuralPopulation(1);
}
```

### 属性与方法

| 属性(11) | 类型 | 说明 |
|------|------|------|
| `city.id` | `ComponentID` | 城市唯一标识（取数值 ID 用 `city.id.id`） |
| `city.location` | `{x, y}` | 城市坐标 |
| `city.name` | `string` | 城市名称（本地化键） |
| `city.owner` | `int` | 所有者玩家 ID |
| `city.originalOwner` | `int` | 原始所有者玩家 ID |
| `city.isValid` | `bool` | 城市实例是否有效 |
| `city.isTown` | `bool` | 是否为城镇 |
| `city.isCapital` | `bool` | 是否为首都 |
| `city.isOriginalCapital` | `bool` | 是否为原始首都 |
| `city.isBeingRazed` | `bool` | 是否正在被摧毁 |
| `city.population` | `int` | 当前人口数 |


| 方法(2) | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>city.getPurchasedPlots</API> | — | `int[]` | 获取已购买的地块索引数组 |
| <API>city.addRuralPopulation</API> | n | `void` | 增加农村人口 |

## City 子系统

`city` 实例内部包含以下子系统：

| 子系统 | 说明 |
|--------|------|
| city.BuildQueue | 生产队列 |
| city.FoodQueue | 食物队列（仅 Tuner 面板使用） |
| city.Districts | 城市区域管理 |
| city.Constructibles | 城市建筑/改良/奇观 |
| city.Yields | 城市产出 |
| city.Religion | 城市宗教 |
| city.Trade | 城市贸易 |
| city.Resources | 城市资源 |
| city.Workers | 城市工人分配 |

### BuildQueue 生产队列

```javascript
// 来源 TunerPanels/Cities.ltp
// 生产队列操作
const cityBuildQueue = city.BuildQueue;
cityBuildQueue.addProgress(10);           // 增加生产进度
cityBuildQueue.completeProduction();      // 完成当前生产
cityBuildQueue.getQueue();                // 获取队列项数组
cityBuildQueue.getProgressItems();        // 获取进行中的项目
cityBuildQueue.getOrderTypeName(type);    // 获取订单类型名称
cityBuildQueue.getProductionKindName(kind); // 获取生产类别名称
cityBuildQueue.getProductionTypeName(type, kind); // 获取生产类型名称
```

```javascript
// 来源 modules/base-standard/ui/production-chooser/production-chooser-helpers.js
// 获取建造某对象所需回合数
const turns = city.BuildQueue.getTurnsLeft(constructible.ConstructibleType);
```

| BuildQueue 属性 | 类型 | 说明 |
|------|------|------|
| `cityBuildQueue.isEmpty` | `bool` | 生产队列是否为空 |
| `cityBuildQueue.CurrentProductionTypeHash` | `int` | 当前生产类型哈希 |

### FoodQueue 食物队列

> **注意**：`city.FoodQueue` 目前仅在 TunerPanels/Cities.ltp 中有引用，正式游戏 JS 代码中使用引擎事件 `FoodQueueChanged` 代替。

```javascript
// 来源 TunerPanels/Cities.ltp
// 食物队列操作（仅 Tuner 面板）
const cityFoodQueue = city.FoodQueue;
cityFoodQueue.addProgress(10);        // 增加食物进度
cityFoodQueue.completeProduction();   // 完成食物增长
```

### Districts 城市区域

```javascript
// 来源 modules/base-standard/ui/player-yields-report/model-yields-report.js
// 遍历城市区域
const cityDistricts = city.Districts;
for (const districtId of cityDistricts.getIds()) {
  const district = Districts.get(districtId);
  console.log(district.location, district.type);
}
```

```javascript
// 来源 modules/base-standard/ui-next/screens/endgame/endgame-cinematics.js
// 按类型获取区域 ID
const districts = city.Districts?.getIdsOfType(DistrictTypes.URBAN);
```

| Districts 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `cityDistricts.getIds` | — | `ComponentID[]` | 获取所有区域 ID 数组 |
| `cityDistricts.getIdsOfType` | type | `ComponentID[]` | 获取指定类型的区域 ID 数组 |
| `cityDistricts.removeDistrict` | districtID | `void` | 移除指定区域 |

### Constructibles 城市建筑/改良

```javascript
// 来源 TunerPanels/Cities.ltp
// 按类别遍历城市建筑/改良
const cityConstructibles = city.Constructibles;
for (const id of cityConstructibles.getIdsOfClass("BUILDING")) { /* ... */ }
for (const id of cityConstructibles.getIdsOfClass("IMPROVEMENT")) { /* ... */ }
for (const id of cityConstructibles.getIdsOfClass("WONDER")) { /* ... */ }
```

```javascript
// 来源 modules/core/ui/utilities/utilities-core-textprovider.js
// 检查邻接加成是否解锁
if (!city.Constructibles.isAdjacencyUnlocked(yieldChangeDef.ID)) { /* ... */ }
```

```javascript
// 来源 modules/base-standard/ui/great-works/screen-great-works.js
// 获取巨作建筑及产出
const gwBuildings = city.Constructibles.getGreatWorkBuildings();
const totalYield = city.Constructibles.getYieldFromGreatWork(yieldType, greatWork.$index);
```

| Constructibles 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `cityConstructibles.getIdsOfClass` | className | `ComponentID[]` | 获取指定类别的建筑/改良 ID 数组 |
| `cityConstructibles.isAdjacencyUnlocked` | yieldChangeID | `bool` | 检查指定邻接加成是否已解锁 |
| `cityConstructibles.getNumWonders` | — | `int` | 获取城市奇迹数量 |
| `cityConstructibles.getGreatWorkBuildings` | — | `BuildingInfo[]` | 获取可存放巨作的建筑列表 |
| `cityConstructibles.getYieldFromGreatWork` | yieldType, index | `int` | 获取巨作提供的指定产出值 |

### Yields 城市产出

```javascript
// 来源 TunerPanels/Cities.ltp
// 获取城市产出信息
const cityYields = city.Yields;
cityYields.getPlotYields(plotIndex);       // 获取地块产出
cityYields.hasPlotYields(plotIndex);       // 检查地块是否有产出
cityYields.getYields();                    // 获取城市资源产出
cityYields.calculateAllAdjacencyYieldsForConstructible(type, plotIndex);
```

```javascript
// 来源 modules/base-standard/ui/city-trade/model-city-trade.js
// 获取贸易及资源产出
this._tradeYields = city.Yields.getTradeYields();
this._resourceYields = city.Yields.getResourceYields();
```

```javascript
// 来源 modules/base-standard/ui/building-placement/building-placement-manager.js
// 提取产出变化数据
if (this.city?.Yields && this.city.Yields.extractYieldChangesData(placementData.yieldChanges, change.yieldType) > 0) { /* ... */ }
```

| Yields 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `cityYields.getYields` | — | `YieldInfo[]` | 获取城市所有产出数据 |
| `cityYields.getPlotYields` | plotIndex | `YieldInfo` | 获取指定地块的产出 |
| `cityYields.hasPlotYields` | plotIndex | `bool` | 检查指定地块是否有产出 |
| `cityYields.getTradeYields` | — | `YieldInfo[]` | 获取贸易路线产出 |
| `cityYields.getResourceYields` | — | `YieldInfo[]` | 获取资源产出 |
| `cityYields.calculateAllAdjacencyYieldsForConstructible` | type, plotIndex | `void` | 计算建筑的邻接加成产出 |
| `cityYields.extractYieldChangesData` | yieldChanges, yieldType | `int` | 从产出变化数据中提取指定类型的值 |

### Religion 城市宗教

```javascript
// 来源 TunerPanels/Cities.ltp
// 城市宗教信息
const cityReligion = city.Religion;
cityReligion.majorityReligion;  // 主流宗教
cityReligion.urbanReligion;     // 城市宗教
cityReligion.ruralReligion;     // 农村宗教
```

```javascript
// 来源 modules/base-standard/ui/pantheon-chooser/panel-religion-chooser.js
// 判断城镇是否信奉某宗教
if (_city.isTown && _city.Religion?.majorityReligion == currentReligion?.getReligionType()) { /* ... */ }
```

| Religion 属性 | 类型 | 说明 |
|------|------|------|
| `cityReligion.majorityReligion` | `ReligionType` | 城市主流宗教类型 |
| `cityReligion.urbanReligion` | `ReligionType` | 城市市区宗教 |
| `cityReligion.ruralReligion` | `ReligionType` | 农村地区宗教 |

### Trade 城市贸易

```javascript
// 来源 modules/base-standard/ui/city-trade/screen-city-trade.js
// 获取城市贸易路线和网络状态
const routes = city.Trade.routes;           // 贸易路线数组
const isInNetwork = city.Trade.isInTradeNetwork(); // 是否在贸易网络中
const numRoutes = city.Trade.numRoutes;     // 贸易路线数量
```

### Resources 城市资源

```javascript
// 来源 TunerPanels/Resources.ltp
// 获取城市已分配资源
const assignedResources = pCity.Resources.getAssignedResources();
```

```javascript
// 来源 TunerPanels/Trade.ltp
// 获取城市本地资源
const localResources = pCity.Resources.getLocalResources();
```

```javascript
// 来源 modules/base-standard/ui-next/screens/commerce/commerce-screen-model.js
// 获取资源槽位和宝藏舰队相关
const assignedCap = city.Resources.getAssignedResourcesCap();
const turnsUntil = city.Resources.getTurnsUntilTreasureGenerated();
const fleetPoints = city.Resources.getProducedTreasureFleetPoints();
```

| Resources 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `pCity.Resources.getAssignedResources` | — | `ResourceInfo[]` | 获取已分配的资源列表 |
| `pCity.Resources.getLocalResources` | — | `ResourceInfo[]` | 获取城市本地资源列表 |
| `pCity.Resources.getAssignedResourcesCap` | — | `int` | 获取资源分配容量上限 |
| `pCity.Resources.getTurnsUntilTreasureGenerated` | — | `int` | 获取生成宝藏剩余回合数 |
| `pCity.Resources.getProducedTreasureFleetPoints` | — | `int` | 获取宝藏舰队积分值 |

## player.Cities 子系统

`player.Cities` 提供了玩家维度的城市集合查询方法。这些方法通过 `player.Cities` 调用，而非全局 `Cities` 对象。

| 属性/方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `player.Cities.numCities` | — | `int` | 玩家城市总数（属性） |
| `player.Cities.getCityIds` | — | `ComponentID[]` | 获取玩家城市 ID 列表 |
| `player.Cities.getCities` | — | `City[]` | 获取玩家城市对象数组 |
| `player.Cities.getCapital` | — | `City` | 获取玩家首都 |
| `player.Cities.findClosest` | location | `City \| null` | 获取距指定位置最近的城市 |

```javascript
// 来源 modules/age-exploration/ui/tutorial/tutorial-items-exploration.js
// 遍历玩家所有城市
for (let i = 0; i < player.Cities.getCityIds().length; i++) {
  const thisCityInfo = Cities.get(player.Cities.getCityIds()[i]);
}
```

```javascript
// 来源 modules/base-standard/ui/panel-religion-picker/panel-religion-picker.js
// 在玩家城市中查找
const foundCity = this.playerObject.Cities.getCities().find((city) => {
  // 匹配条件
});
```

```javascript
// 来源 modules/age-antiquity/ui/advice/advice-items-antiquity-science.js
// 获取玩家首都
const capital = player.Cities.getCapital();
```

```javascript
// 来源 modules/base-standard/scripts/age-transition-post-load.js
// 查找距单位最近的玩家城市
const city = player.Cities?.findClosest(unit.location);
```

## Constructibles 全局对象

`Constructibles` 是全局对象，用于建筑/改良/奇观实例的获取与操作，不仅局限于城市上下文。

```javascript
// 来源 TunerPanels/Cities.ltp
// 建筑/改良实例操作
Constructibles.get(id);              // 获取建筑/改良实例
Constructibles.setDamaged(id, state); // 设置损坏状态
constructible.id;                     // 实例 ID
constructible.type;                   // 类型哈希
constructible.damaged;                // 是否损坏
constructible.location;               // {x, y}
```

## Districts 全局对象补充

`Districts` 是全局对象，用于区域实例的获取与操作。

```javascript
// 来源 TunerPanels/Districts.ltp
// 区域对象操作
Districts.get(districtId);  // 获取区域
district.location;           // {x, y}
district.type;               // 类型哈希
district.cityId;             // 所属城市 ID
district.isQuarter;          // 是否为街区
district.isUniqueQuarter;    // 是否为独特街区
district.isUrbanCore;        // 是否为城市核心
district.isDefensible;       // 是否可防御
district.originalOwner;      // 原始所有者
district.getMaxDamage;       // 最大生命值
district.getDamage;          // 当前伤害
district.changeDamage(10);   // 改变伤害值
district.getConstructibleIdsOfClass("BUILDING"); // 获取建筑
district.getConstructibleIdsOfClass("IMPROVEMENT"); // 获取改良
```

## GameInfo 关联表

```javascript
// 来源 TunerPanels/Cities.ltp
GameInfo.Districts;        // 区域定义表
GameInfo.Constructibles;   // 建筑/改良/奇观定义表（ConstructibleClass: BUILDING/IMPROVEMENT/WONDER）
GameInfo.Yields;           // 产出定义表
GameInfo.Religions;        // 宗教定义表
GameInfo.Advisors;         // 顾问定义表
```

## 相关全局对象

| 对象 | 说明 | 来源 |
|------|------|------|
| Camera.lookAtPlot(location) | 将镜头移到城市位置 | Cities.ltp |
| ReflectionArchives.getByComponentID(cityId) | 获取城市反射档案 | Cities.ltp |
| ComponentIDTypes.CITY | 城市组件 ID 类型常量 | Cities.ltp |

<API id="Cities.get"><h3>Cities.get(id)</h3>

**说明**: 根据城市 ID 获取城市对象。这是最常用的 Cities 方法，几乎所有城市操作都从这里开始。ID 无效时返回 `null`。

| 参数名 | 类型 | 说明 |
|------|------|------|
| id | `int` / `ComponentID` | 城市唯一标识 ID |

**返回值**: `City` | `null`

**使用示例**:

```javascript
// 来源 TunerPanels/Cities.ltp
// 获取城市并读取基本属性
let city = Cities.get(cityId);
if (city) {
  console.log(city.name, city.location, city.owner);
}
```

</API>

<API id="Cities.getAtLocation"><h3>Cities.getAtLocation(plotIndex)</h3>

**说明**: 根据地块索引获取该地块上的城市对象。

| 参数名 | 类型 | 说明 |
|------|------|------|
| plotIndex | `int` | 地块索引 |

**返回值**: `City` | `null`

**使用示例**:

```javascript
// 来源 modules/age-antiquity/ui/tutorial/tutorial-items-antiquity.js
// 根据地块坐标获取城市
const thisCity = Cities.getAtLocation(plotIndex);
if (thisCity) {
  // 使用城市对象
}
```

</API>

<API id="city.getPurchasedPlots"><h3>city.getPurchasedPlots()</h3>

**说明**: 获取城市已购买的所有地块索引数组。

**参数**: 无

**返回值**: `int[]`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/lenses/layer/city-borders-layer.js
// 获取已购买地块并渲染边界
const cityPlots = city.getPurchasedPlots();
// 遍历处理每个地块
```

</API>

<API id="city.addRuralPopulation"><h3>city.addRuralPopulation(n)</h3>

**说明**: 为城市增加指定数量的农村人口。

| 参数名 | 类型 | 说明 |
|------|------|------|
| n | `int` | 增加的农村人口数量 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 TunerPanels/Cities.ltp
// 增加农村人口
city.addRuralPopulation(1);
```

</API>