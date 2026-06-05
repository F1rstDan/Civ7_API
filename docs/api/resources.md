---
title: Resources 资源
doc_type: object-api
summary: 资源管理全局对象，负责资源定义查询、地块资源获取、资源分配与交换。
primary_scope:
  - Resources
related_scope:
  - player.Resources
  - city.Resources
  - GameInfo.Resources
source:
  - TunerPanels/Resources.ltp
---

# Resources 资源

资源管理全局对象，用于查询资源定义、获取地块资源、管理资源分配。引擎直接注入，无需手动 import 引入。

```javascript
// 快速示例：获取地块上的资源
// 来源 Resources.ltp
const resource = Resources.getResourceOnPlot({ x: 10, y: 20 });
if (resource) {
  console.log(resource.type, resource.amount);
}
```

## 方法列表（共 7 个）

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Resources.getResourceOnPlot</API> | location | `object` | 获取地块上的资源 |
| <API>Resources.getAssignedResources</API> | playerID | `array` | 获取已分配的资源 |
| <API>Resources.getOriginCity</API> | resourceID | `City` | 获取资源来源城市 |
| <API>Resources.getAssignedResourcesCap</API> | playerID | `int` | 获取资源分配上限 |
| <API>Resources.forEach</API> | callback | `void` | 遍历所有资源 |
| <API>Resources.getLocalResources</API> | playerID | `array` | 获取本地资源 |
| <API>Resources.canStartTreasureFleet</API> | playerID | `bool` | 是否可以开始宝藏舰队 |

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
// 遍历玩家所有资源
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

## GameInfo 关联表

```javascript
GameInfo.Resources;              // 资源定义表
GameInfo.Resources.lookup(type); // 根据类型查询资源定义
```

---

<API id="Resources.getResourceOnPlot"><h3>Resources.getResourceOnPlot(location)</h3>

**说明**: 获取指定地块上的资源信息。

| 参数名 | 类型 | 说明 |
|------|------|------|
| location | `object` | 坐标 `{x, y}` |

**返回值**: `object` \| `undefined`

**使用示例**:

```javascript
// 来源 Resources.ltp
// 获取地块上的资源
const resource = Resources.getResourceOnPlot({ x: 10, y: 20 });
if (resource) {
  console.log(resource.type, resource.amount);
}
```

</API>
<API id="Resources.getAssignedResources"><h3>Resources.getAssignedResources(playerID)</h3>

**说明**: 获取玩家已分配的资源列表。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 玩家 ID |

**返回值**: `array`

</API>
<API id="Resources.getOriginCity"><h3>Resources.getOriginCity(resourceID)</h3>

**说明**: 获取指定资源的来源城市。

| 参数名 | 类型 | 说明 |
|------|------|------|
| resourceID | `int` | 资源 ID |

**返回值**: `City` \| `undefined`

</API>
<API id="Resources.getAssignedResourcesCap"><h3>Resources.getAssignedResourcesCap(playerID)</h3>

**说明**: 获取玩家的资源分配上限。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 玩家 ID |

**返回值**: `int`

</API>
<API id="Resources.forEach"><h3>Resources.forEach(callback)</h3>

**说明**: 遍历所有资源。

| 参数名 | 类型 | 说明 |
|------|------|------|
| callback | `function` | 回调函数 |

**返回值**: `void`

</API>
<API id="Resources.getLocalResources"><h3>Resources.getLocalResources(playerID)</h3>

**说明**: 获取玩家的本地资源列表。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 玩家 ID |

**返回值**: `array`

</API>
<API id="Resources.canStartTreasureFleet"><h3>Resources.canStartTreasureFleet(playerID)</h3>

**说明**: 检查玩家是否可以开始宝藏舰队。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 玩家 ID |

**返回值**: `bool`

</API>