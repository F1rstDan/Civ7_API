---
title: Cities 城市
doc_type: object
summary: 城市管理的全局对象，提供城市的获取、创建、位置查询等功能，以及 City 对象子系统（BuildQueue、Districts、Yields 等）。
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
  - player.Units
  - Districts
  - Constructibles
source:
  - TunerPanels/Cities.ltp
  - TunerPanels/Districts.ltp
  - TunerPanels/Resources.ltp
  - TunerPanels/Trade.ltp
  - modules/base-standard/ui/city-details/model-city-details.js
  - modules/base-standard/ui/building-placement/building-placement-manager.js
doc_update: 2026-06-05
---

# Cities 城市

城市管理全局对象。用于获取城市实例、查询城市位置、创建城市等。引擎直接注入，无需手动 import 引入。

```javascript
// 来源 TunerPanels/Cities.ltp
// 获取城市对象并读取基本属性
let city = Cities.get(cityId);
city.location;           // {x, y}
city.name;               // 城市名称
city.owner;              // 所有者玩家 ID
city.isTown;             // 是否为城镇
```

## 方法列表（共 1 个）

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Cities.get</API> | id | `City` | 根据 ID 获取城市对象 |
| <API>Cities.getAtLocation</API> | location | `City` | 获取指定位置的城市 |

## player.Cities 子系统

`const player = Players.get(GameContext.localPlayerID);`

`player.Cities` 提供了玩家城市集合的查询方法。以下方法通过 `player.Cities` 调用，而非全局 `Cities` 对象。

| 方法 | 参数 | 返回值 | 说明 | 来源 |
|------|------|--------|------|------|
| `player.Cities.getCityIds` | 无 | `int[]` | 获取玩家城市 ID 列表 | tutorial-items-exploration.js |
| `player.Cities.getCities` | 无 | `City[]` | 获取玩家城市对象数组 | panel-religion-picker.js |
| `player.Cities.getCapital` | 无 | `City` | 获取玩家首都 | advice-items-antiquity-science.js |

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

## City 对象子系统

从 TunerPanels（Cities.ltp）确认的城市对象子系统：

| 子系统 | 说明 | 来源 |
|--------|------|------|
| city.BuildQueue | 生产队列 | Cities.ltp |
| city.FoodQueue | 食物队列 | Cities.ltp |
| city.Districts | 城市区域 | Cities.ltp |
| city.Constructibles | 城市建筑/改良 | Cities.ltp |
| city.Yields | 城市产出 | Cities.ltp |
| city.Religion | 城市宗教 | Cities.ltp |
| city.Trade | 城市贸易 | Trade.ltp |
| city.Resources | 城市资源 | Resources.ltp |

### City 基本属性

```javascript
// 来源 Cities.ltp
// 获取城市对象并读取常用属性
let city = Cities.get(cityId);
city.location;           // {x, y} 城市坐标
city.name;               // 城市名称（本地化键）
city.isTown;             // 是否为城镇
city.owner;              // 所有者玩家 ID
city.originalOwner;      // 原始所有者玩家 ID
city.getPurchasedPlots(); // 获取城市已购买的地块索引数组
city.addRuralPopulation(1); // 增加农村人口
```

### BuildQueue 子系统

```javascript
// 来源 Cities.ltp
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

### FoodQueue 子系统

```javascript
// 来源 Cities.ltp
// 食物队列操作
const cityFoodQueue = city.FoodQueue;
cityFoodQueue.addProgress(10);        // 增加食物进度
cityFoodQueue.completeProduction();   // 完成食物增长
```

### Districts 子系统

```javascript
// 来源 Cities.ltp
// 遍历城市区域
const cityDistricts = city.Districts;
for (const districtId of cityDistricts.getIds()) {
  const district = Districts.get(districtId);
  district.location;  // {x, y}
  district.type;      // 类型哈希
}
```

### Constructibles 子系统

```javascript
// 来源 Cities.ltp
// 按类别遍历城市建筑/改良
const cityConstructibles = city.Constructibles;
for (const id of cityConstructibles.getIdsOfClass("BUILDING")) { /* ... */ }
for (const id of cityConstructibles.getIdsOfClass("IMPROVEMENT")) { /* ... */ }
for (const id of cityConstructibles.getIdsOfClass("WONDER")) { /* ... */ }
```

### Yields 子系统

```javascript
// 来源 Cities.ltp
// 获取城市产出信息
const cityYields = city.Yields;
cityYields.getPlotYields(plotIndex);       // 获取地块产出
cityYields.hasPlotYields(plotIndex);       // 检查地块是否有产出
cityYields.getYields();                    // 获取城市资源产出
cityYields.calculateAllAdjacencyYieldsForConstructible(type, plotIndex);
```

### Religion 子系统

```javascript
// 来源 Cities.ltp
// 城市宗教信息
const cityReligion = city.Religion;
cityReligion.majorityReligion;  // 主流宗教
cityReligion.urbanReligion;     // 城市宗教
cityReligion.ruralReligion;     // 农村宗教
```

### Trade 子系统

```javascript
// 来源 Trade.ltp
// 获取城市贸易路线
const routes = city.Trade.routes;
```

### Resources 子系统

```javascript
// 来源 Resources.ltp
// 获取城市已分配资源
const assignedResources = pCity.Resources.getAssignedResources();
```

## Constructibles 全局对象

```javascript
// 来源 Cities.ltp
// 建筑/改良实例操作
Constructibles.get(id);              // 获取建筑/改良实例
Constructibles.setDamaged(id, state); // 设置损坏状态
constructible.id;                     // 实例 ID
constructible.type;                   // 类型哈希
constructible.damaged;                // 是否损坏
constructible.location;               // {x, y}
```

## Districts 全局对象补充

```javascript
// 来源 Districts.ltp
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

## 常用 GameInfo 表（Cities 相关）

```javascript
// 来源 Cities.ltp
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

**说明**: 根据城市 ID 获取城市对象。这是最常用的 Cities 方法，几乎所有城市操作都从这里开始。

| 参数名 | 类型 | 说明 |
|------|------|------|
| id | `int` | 城市唯一标识 ID |

**返回值**: `City` | `undefined`

**使用示例**:

```javascript
// 来源 TunerPanels/Cities.ltp
// 获取城市并读取基本属性
let city = Cities.get(g_TunerState.CityPanel.selectedCity);
if (city) {
  console.log(city.name, city.location, city.owner);
}
```

</API>

<API id="Cities.getAtLocation"><h3>Cities.getAtLocation(location)</h3>

**说明**: 根据坐标位置获取该地块上的城市对象。

| 参数名 | 类型 | 说明 |
|------|------|------|
| location | `object` | 包含 x, y 坐标的对象 |

**返回值**: `City` | `undefined`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/city-details/model-city-details.js
// 根据地块坐标获取城市
const city = Cities.getAtLocation(plot.x, plot.y);
if (city) {
  // 使用城市对象
}
```

</API>