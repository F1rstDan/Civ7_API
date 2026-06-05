---
title: Trade 贸易系统
doc_type: system-topic
summary: 贸易系统 API，涵盖全局贸易管理、玩家贸易操作和城市贸易路线。
primary_scope:
  - Game.Trade
  - player.Trade
  - city.Trade
related_scope:
  - GameInfo.Trade
source:
  - TunerPanels/Trade.ltp
  - TunerPanels/Resources.ltp
---

# Trade 贸易系统

文明7的贸易系统涉及三个层级的 API：`Game.Trade`（全局贸易管理）、`player.Trade`（玩家贸易操作）、`city.Trade`（城市贸易路线）。

```javascript
// 快速示例：检查贸易可行性并获取路线
// 来源 Trade.ltp
const playerTrade = player.Trade;
const status = playerTrade.canStartTradeRouteToCity(cityId, DomainTypes.DOMAIN_SEA);
if (status === TradeRouteStatus.SUCCESS) {
  const routes = playerTrade.projectPossibleTradeRoutes(TradeRouteSearchOptions.INCLUDE_FAILED);
}
```

## 方法列表（共 8 个）

### Game.Trade 全局对象

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Game.Trade.calculateTradeRouteExportYield</API> | routeId, yieldType | `int` | 计算贸易路线出口产出 |
| <API>Game.Trade.getCityGraphEdges</API> | cityId | `int[]` | 获取城市贸易路线图边 ID 列表 |
| <API>Game.Trade.getGraphEdge</API> | edgeId | `object` | 获取贸易路线图边详情 |

### player.Trade 子系统

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>player.Trade.canStartTradeRouteToCity</API> | cityId, domainType | `TradeRouteStatus` | 检查是否可以开始贸易路线 |
| <API>player.Trade.countPlayerCityRoutes</API> | cityId | `int` | 统计玩家城市已有贸易路线数 |
| <API>player.Trade.projectPossibleTradeRoutes</API> | options | `array` | 预测可能的贸易路线 |

### city.Trade 子系统

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>city.Trade.routes</API> | — | `array` | 获取城市贸易路线列表（属性） |

## Game.Trade 详情

```javascript
// 来源 Trade.ltp
// 计算贸易路线出口产出
Game.Trade.calculateTradeRouteExportYield(routeId, YieldTypes.YIELD_GOLD);
Game.Trade.calculateTradeRouteExportYield(routeId, YieldTypes.YIELD_FOOD);
Game.Trade.calculateTradeRouteExportYield(routeId, YieldTypes.YIELD_PRODUCTION);

// 贸易路线图
let edges = Game.Trade.getCityGraphEdges(cityId);
for (const id of edges) {
  let edge = Game.Trade.getGraphEdge(id);
  // edge.domain (0=SEA, 1=AIR, 2=LAND)
  // edge.numActiveRoutes
  // edge.fromVertex.location / edge.fromVertex.cityId
  // edge.toVertex.location / edge.toVertex.cityId
  // edge.path — 路径地块数组
}
```

## player.Trade 详情

```javascript
// 来源 Trade.ltp
const playerTrade = player.Trade;

// 检查是否可以开始贸易路线
playerTrade.canStartTradeRouteToCity(cityId, DomainTypes.DOMAIN_SEA);
// 返回 TradeRouteStatus 枚举值

// 统计已有路线
playerTrade.countPlayerCityRoutes(cityId);

// 预测可能的贸易路线
let options = TradeRouteSearchOptions.INCLUDE_FAILED + TradeRouteSearchOptions.EXTENDED_STATUS;
let routes = playerTrade.projectPossibleTradeRoutes(options);
// 每个 route 包含: targetCityId, status (数组), nearestCityId
```

## city.Trade 详情

```javascript
// 来源 Trade.ltp
let routes = city.Trade.routes;
for (let route of routes) {
  route.id;            // 路线 ID
  route.name;          // 路线名称
  route.leftCityID;    // 左端城市 ID
  route.rightCityID;   // 右端城市 ID
  route.leftPayload;   // 左端货物
  route.rightPayload;  // 右端货物
  // route.leftPayload.resourceValues — 资源值数组
}
```

## 贸易路线状态查询示例

```javascript
// 来源 Trade.ltp
// 查询所有外国城市的贸易可行性
for (const playerId of Players.getWasEverAliveIds()) {
  if (playerId == selectedPlayer) continue;
  let targetPlayer = Players.get(playerId);
  for (const cityId of targetPlayer.Cities.getCityIds()) {
    let seaStatus = player.Trade.canStartTradeRouteToCity(cityId, DomainTypes.DOMAIN_SEA);
    let landStatus = player.Trade.canStartTradeRouteToCity(cityId, DomainTypes.DOMAIN_LAND);
    // 检查 TradeRouteStatus 枚举值
  }
}
```

## 常用枚举

### TradeRouteStatus

| 枚举值 | 说明 |
|--------|------|
| `TradeRouteStatus.SUCCESS` | 成功 |
| `TradeRouteStatus.INVALID` | 无效 |
| `TradeRouteStatus.NO_RESOURCES` | 无资源 |
| `TradeRouteStatus.AT_WAR` | 战争中 |
| `TradeRouteStatus.DISTANCE` | 距离不足 |
| `TradeRouteStatus.OVER_OCEAN` | 跨洋 |
| `TradeRouteStatus.NO_URBAN_SEA_ROUTE` | 无城市海路 |
| `TradeRouteStatus.NEED_MORE_FRIENDSHIP` | 需要更多友谊 |
| `TradeRouteStatus.ALREADY_EXISTS` | 已存在 |

### TradeRouteSearchOptions

| 枚举值 | 说明 |
|--------|------|
| `TradeRouteSearchOptions.INCLUDE_FAILED` | 包含失败的路线 |
| `TradeRouteSearchOptions.EXTENDED_STATUS` | 扩展状态信息 |

### DomainTypes

| 枚举值 | 说明 |
|--------|------|
| `DomainTypes.DOMAIN_SEA` | 海路 |
| `DomainTypes.DOMAIN_LAND` | 陆路 |

---

<API id="Game.Trade.calculateTradeRouteExportYield"><h3>Game.Trade.calculateTradeRouteExportYield(routeId, yieldType)</h3>

**说明**: 计算指定贸易路线的出口产出（按产出类型）。

| 参数名 | 类型 | 说明 |
|------|------|------|
| routeId | `int` | 贸易路线 ID |
| yieldType | `YieldTypes` | 产出类型，如 `YieldTypes.YIELD_GOLD` |

**返回值**: `int`

**使用示例**:

```javascript
// 来源 Trade.ltp
// 计算贸易路线产出
const gold = Game.Trade.calculateTradeRouteExportYield(routeId, YieldTypes.YIELD_GOLD);
```

</API>
<API id="Game.Trade.getCityGraphEdges"><h3>Game.Trade.getCityGraphEdges(cityId)</h3>

**说明**: 获取与指定城市相关的贸易路线图边 ID 列表。

| 参数名 | 类型 | 说明 |
|------|------|------|
| cityId | `int` | 城市 ID |

**返回值**: `int[]`

**使用示例**:

```javascript
// 来源 Trade.ltp
// 遍历城市贸易图边
let edges = Game.Trade.getCityGraphEdges(cityId);
for (const id of edges) {
  let edge = Game.Trade.getGraphEdge(id);
}
```

</API>
<API id="Game.Trade.getGraphEdge"><h3>Game.Trade.getGraphEdge(edgeId)</h3>

**说明**: 获取指定贸易路线图边的详情。返回对象包含 `domain`（0=SEA, 1=AIR, 2=LAND）、`numActiveRoutes`、`fromVertex`、`toVertex`、`path` 等属性。

| 参数名 | 类型 | 说明 |
|------|------|------|
| edgeId | `int` | 边 ID |

**返回值**: `object`

**使用示例**:

```javascript
// 来源 Trade.ltp
// 获取贸易图边详情
let edge = Game.Trade.getGraphEdge(id);
console.log(edge.domain, edge.numActiveRoutes, edge.fromVertex.cityId);
```

</API>
<API id="player.Trade.canStartTradeRouteToCity"><h3>player.Trade.canStartTradeRouteToCity(cityId, domainType)</h3>

**说明**: 检查玩家是否可以开始通往目标城市的贸易路线。返回 `TradeRouteStatus` 枚举值。

| 参数名 | 类型 | 说明 |
|------|------|------|
| cityId | `int` | 目标城市 ID |
| domainType | `DomainTypes` | 路线类型，如 `DomainTypes.DOMAIN_SEA` |

**返回值**: `TradeRouteStatus`

**使用示例**:

```javascript
// 来源 Trade.ltp
// 检查海路贸易可行性
const status = player.Trade.canStartTradeRouteToCity(cityId, DomainTypes.DOMAIN_SEA);
if (status === TradeRouteStatus.SUCCESS) {
  console.log("可以开始贸易路线");
}
```

</API>
<API id="player.Trade.countPlayerCityRoutes"><h3>player.Trade.countPlayerCityRoutes(cityId)</h3>

**说明**: 统计玩家某城市已有的贸易路线数量。

| 参数名 | 类型 | 说明 |
|------|------|------|
| cityId | `int` | 城市 ID |

**返回值**: `int`

</API>
<API id="player.Trade.projectPossibleTradeRoutes"><h3>player.Trade.projectPossibleTradeRoutes(options)</h3>

**说明**: 预测可能的贸易路线。options 可使用 `TradeRouteSearchOptions` 枚举值组合。返回的每个 route 包含 `targetCityId`、`status`（数组）、`nearestCityId` 等。

| 参数名 | 类型 | 说明 |
|------|------|------|
| options | `int` | 搜索选项，由 `TradeRouteSearchOptions` 值组合 |

**返回值**: `array`

**使用示例**:

```javascript
// 来源 Trade.ltp
// 预测可能的贸易路线
let options = TradeRouteSearchOptions.INCLUDE_FAILED + TradeRouteSearchOptions.EXTENDED_STATUS;
let routes = player.Trade.projectPossibleTradeRoutes(options);
for (const route of routes) {
  console.log(route.targetCityId, route.status);
}
```

</API>
<API id="city.Trade.routes"><h3>city.Trade.routes</h3>

**说明**: 城市贸易路线属性，返回该城市所有贸易路线的数组。每条路线包含 `id`、`name`、`leftCityID`、`rightCityID`、`leftPayload`、`rightPayload` 等属性。

**参数**: 无（属性访问）

**返回值**: `array`

**使用示例**:

```javascript
// 来源 Trade.ltp
// 遍历城市贸易路线
let routes = city.Trade.routes;
for (let route of routes) {
  console.log(route.id, route.name, route.leftCityID, route.rightCityID);
}
```

</API>