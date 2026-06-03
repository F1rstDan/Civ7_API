---
title: Resources 资源
---

# Resources 资源

资源管理全局对象。

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `lookup` | type | `object` | 根据类型查询资源定义 |
| `getResourceOnPlot` | location | `object` | 获取地块上的资源 |
| `getAssignedResources` | playerID | `array` | 获取已分配的资源 |
| `getOriginCity` | resourceID | `City` | 获取资源来源城市 |
| `getAssignedResourcesCap` | playerID | `int` | 获取资源分配上限 |
| `forEach` | callback | `void` | 遍历所有资源 |
| `getLocalResources` | playerID | `array` | 获取本地资源 |
| `canStartTreasureFleet` | playerID | `bool` | 是否可以开始宝藏舰队 |
## TunerPanel 补充：Resources 完整 API（来源 Resources.ltp）

### player.Resources

```javascript
// 来源 Resources.ltp
const pResources = player.Resources;
pResources.getResources();                    // 获取所有资源
pResources.getCityIDAssigned(resource);       // 获取资源分配的城市 ID
```

### city.Resources

```javascript
// 来源 Resources.ltp
const cityResources = city.Resources;
cityResources.getLocalResources();            // 获取本地资源
cityResources.getAssignedResources();         // 获取已分配资源
```

### 资源分配操作

```javascript
// 来源 Resources.ltp
// 分配资源到城市
const args = { Location: location, City: cityId };
Game.PlayerOperations.canStart(playerId, PlayerOperationTypes.ASSIGN_RESOURCE, args, false);
Game.PlayerOperations.sendRequest(playerId, PlayerOperationTypes.ASSIGN_RESOURCE, args);

// 取消分配
const args2 = { Location: location, City: cityId, Action: PlayerOperationParameters.Deactivate };
Game.PlayerOperations.sendRequest(playerId, PlayerOperationTypes.ASSIGN_RESOURCE, args2);

// 交换资源
const args3 = { Location: location1, Location2: location2 };
Game.PlayerOperations.sendRequest(playerId, PlayerOperationTypes.SWAP_RESOURCES, args3);
```

### 资源查询模式

```javascript
// 来源 Resources.ltp
let player = Players.get(playerId);
let playerResources = player.Resources.getResources();
for (let resource of playerResources) {
  let resName = GameInfo.Resources.lookup(resource.uniqueResource.resource)?.Name ?? "";
  let location = GameplayMap.getLocationFromIndex(resource.value);
  let cityID = player.Resources.getCityIDAssigned(resource);
  let city = Cities.get(cityID);
}
```

## 常用枚举

| 枚举 | 说明 |
|------|------|
| `PlayerOperationTypes.ASSIGN_RESOURCE` | 分配资源 |
| `PlayerOperationTypes.SWAP_RESOURCES` | 交换资源 |
| `PlayerOperationParameters.Deactivate` | 取消分配 |

---

*来源：Resources.ltp*
