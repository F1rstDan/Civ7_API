---
title: Cities
---

# Cities

城市管理全局对象。

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `get` | id | `City` | 根据 ID 获取城市对象 |
| `getAtLocation` | location | `City` | 获取指定位置的城市 |
| `getCityIds` | playerID | `int[]` | 获取指定玩家的城市 ID 列表 |
| `getCities` | playerID | `City[]` | 获取指定玩家的城市列表 |
| `getCapital` | playerID | `City` | 获取指定玩家的首都 |

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

`javascript
// 来源 Cities.ltp
let city = Cities.get(cityId);
city.location;           // {x, y} 城市坐标
city.name;               // 城市名称（本地化键）
city.isTown;             // 是否为城镇
city.owner;              // 所有者玩家 ID
city.originalOwner;      // 原始所有者玩家 ID
city.getPurchasedPlots(); // 获取城市已购买的地块索引数组
city.addRuralPopulation(1); // 增加农村人口
`

### BuildQueue 子系统

`javascript
// 来源 Cities.ltp
const cityBuildQueue = city.BuildQueue;
cityBuildQueue.addProgress(10);           // 增加生产进度
cityBuildQueue.completeProduction();      // 完成当前生产
cityBuildQueue.getQueue();                // 获取队列项数组
cityBuildQueue.getProgressItems();        // 获取进行中的项目
cityBuildQueue.getOrderTypeName(type);    // 获取订单类型名称
cityBuildQueue.getProductionKindName(kind); // 获取生产类别名称
cityBuildQueue.getProductionTypeName(type, kind); // 获取生产类型名称
`

### FoodQueue 子系统

`javascript
// 来源 Cities.ltp
const cityFoodQueue = city.FoodQueue;
cityFoodQueue.addProgress(10);        // 增加食物进度
cityFoodQueue.completeProduction();   // 完成食物增长
`

### Districts 子系统

`javascript
// 来源 Cities.ltp
const cityDistricts = city.Districts;
for (const districtId of cityDistricts.getIds()) {
  const district = Districts.get(districtId);
  district.location;  // {x, y}
  district.type;      // 类型哈希
}
`

### Constructibles 子系统

`javascript
// 来源 Cities.ltp
const cityConstructibles = city.Constructibles;
for (const id of cityConstructibles.getIdsOfClass("BUILDING")) { /* ... */ }
for (const id of cityConstructibles.getIdsOfClass("IMPROVEMENT")) { /* ... */ }
for (const id of cityConstructibles.getIdsOfClass("WONDER")) { /* ... */ }
`

### Yields 子系统

`javascript
// 来源 Cities.ltp
const cityYields = city.Yields;
cityYields.getPlotYields(plotIndex);       // 获取地块产出
cityYields.hasPlotYields(plotIndex);       // 检查地块是否有产出
cityYields.getYields();                    // 获取城市资源产出
cityYields.calculateAllAdjacencyYieldsForConstructible(type, plotIndex);
`

### Religion 子系统

`javascript
// 来源 Cities.ltp
const cityReligion = city.Religion;
cityReligion.majorityReligion;  // 主流宗教
cityReligion.urbanReligion;     // 城市宗教
cityReligion.ruralReligion;     // 农村宗教
`

## Constructibles 全局对象

`javascript
// 来源 Cities.ltp
Constructibles.get(id);              // 获取建筑/改良实例
Constructibles.setDamaged(id, state); // 设置损坏状态
constructible.id;                     // 实例 ID
constructible.type;                   // 类型哈希
constructible.damaged;                // 是否损坏
constructible.location;               // {x, y}
`

## Districts 全局对象补充

`javascript
// 来源 Districts.ltp
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
`

## 常用 GameInfo 表（Cities 相关）

`javascript
// 来源 Cities.ltp
GameInfo.Districts;        // 区域定义表
GameInfo.Constructibles;   // 建筑/改良/奇观定义表（ConstructibleClass: BUILDING/IMPROVEMENT/WONDER）
GameInfo.Yields;           // 产出定义表
GameInfo.Religions;        // 宗教定义表
GameInfo.Advisors;         // 顾问定义表
`

## 相关全局对象

| 对象 | 说明 | 来源 |
|------|------|------|
| Camera.lookAtPlot(location) | 将镜头移到城市位置 | Cities.ltp |
| ReflectionArchives.getByComponentID(cityId) | 获取城市反射档案 | Cities.ltp |
| ComponentIDTypes.CITY | 城市组件 ID 类型常量 | Cities.ltp |

---

*来源：Cities.ltp、Districts.ltp、Resources.ltp、Trade.ltp*
