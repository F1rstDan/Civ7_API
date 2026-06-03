---
title: Trade 贸易系统
---

# Trade 贸易系统

文明7的贸易系统涉及三个层级的 API：`Game.Trade`（全局贸易管理）、`player.Trade`（玩家贸易操作）、`city.Trade`（城市贸易路线）。

> 来源：Trade.ltp、Resources.ltp

## Game.Trade 全局对象

```javascript
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

## player.Trade 子系统

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

## city.Trade 子系统

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

## TradeRouteStatus 枚举

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

## TradeRouteSearchOptions 枚举

| 枚举值 | 说明 |
|--------|------|
| `TradeRouteSearchOptions.INCLUDE_FAILED` | 包含失败的路线 |
| `TradeRouteSearchOptions.EXTENDED_STATUS` | 扩展状态信息 |

## DomainTypes 枚举

| 枚举值 | 说明 |
|--------|------|
| `DomainTypes.DOMAIN_SEA` | 海路 |
| `DomainTypes.DOMAIN_LAND` | 陆路 |

## 贸易路线状态查询示例

```javascript
// 来源 Trade.ltp — 查询所有外国城市的贸易可行性
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

---

*来源：Trade.ltp*