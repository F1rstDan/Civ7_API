---
title: Resources 资源
doc_type: system
summary: 资源管理系统，包含全局资源查询（Game.Resources）、玩家资源管理（player.Resources）和城市资源分配（city.Resources）。
primary_scope:
  - Game.Resources
  - player.Resources
  - city.Resources
related_scope:
  - GameInfo.Resources
source:
  - TunerPanels/Resources.ltp
  - modules/base-standard/ui-next/screens/commerce/commerce-screen-model.js
  - modules/base-standard/ui/resource-allocation/model-resource-allocation.js
  - modules/base-standard/ui/city-details/model-city-details.js
  - modules/base-standard/ui/city-trade/model-city-trade.js
doc_update: 2026-06-06
---

# Resources 资源

资源管理系统，用于查询资源定义、获取地块资源、管理资源分配与交换。`Game.Resources` 为全局管理器，`player.Resources` 和 `city.Resources` 分别为玩家和城市实例。

```javascript
// 来源 commerce-screen-model.js
// 获取指定地块上的资源信息
const resource = Game.Resources.getResourceOnPlot(resourceValue);
const resourceDef = GameInfo.Resources.lookup(resource.resource);
```

## Game.Resources 全局方法（共 2 个）

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Game.Resources.getResourceOnPlot</API> | resourceValue | `object` | 获取地块上的资源信息 |
| <API>Game.Resources.getOriginCity</API> | resourceValue | `int` | 获取资源来源城市 ID |

## player.Resources 玩家资源

获取方法：`player.Resources`，其中 `player = Players.get(playerID)`。

```javascript
// 来源 Resources.ltp
// 获取玩家资源列表
const player = Players.get(playerID);
const pResources = player.Resources;
const resources = pResources.getResources();
```

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>player.Resources.getResources</API> | — | `array` | 获取玩家所有资源 |
| <API>player.Resources.getCityIDAssigned</API> | resource | `int` | 获取资源分配的城市 ID |
| <API>player.Resources.isRessourceAssignmentLocked</API> | — | `bool` | 资源分配是否锁定 |

## city.Resources 城市资源

获取方法：`city.Resources`，其中 `city = Cities.get(cityID)`。

```javascript
// 来源 commerce-screen-model.js
// 获取城市已分配资源及容量
const city = Cities.get(cityID);
const assignedResources = city.Resources.getAssignedResources();
const cap = city.Resources.getAssignedResourcesCap();
const availableSlots = cap - assignedResources.length;
```

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>city.Resources.getAssignedResources</API> | — | `array` | 获取已分配资源列表 |
| <API>city.Resources.getAssignedResourcesCap</API> | — | `int` | 获取资源分配上限 |
| <API>city.Resources.getLocalResources</API> | — | `array` | 获取本地资源列表 |
| <API>city.Resources.canStartTreasureFleet</API> | — | `bool` | 是否可以开始宝藏舰队 |
| <API>city.Resources.getTurnsUntilTreasureGenerated</API> | — | `int` | 获取距离宝藏生成的剩余回合数 |
| <API>city.Resources.getFactoryResource</API> | — | `string` | 获取工厂资源类型 |
| <API>city.Resources.getNumFactoryResources</API> | — | `int` | 获取工厂资源数量 |
| <API>city.Resources.isTreasureConstructiblePrereqMet</API> | — | `bool` | 宝藏建造前提是否满足 |
| <API>city.Resources.getAutoTreasureFleetValue</API> | — | `int` | 获取自动宝藏舰队值 |
| <API>city.Resources.getProducedTreasureFleetGold</API> | — | `int` | 获取已产出宝藏舰队金币 |
| <API>city.Resources.getProducedTreasureFleetGDP</API> | — | `int` | 获取已产出宝藏舰队 GDP |
| <API>city.Resources.getProducedTreasureFleetPoints</API> | — | `int` | 获取已产出宝藏舰队点数 |
| <API>city.Resources.getGlobalTurnsUntilTreasureGenerated</API> | — | `int` | 获取全局宝藏生成剩余回合数 |

### 资源分配操作

```javascript
// 来源 Resources.ltp
// 分配资源到城市
const args = { Location: location, City: cityId };
Game.PlayerOperations.canStart(playerId, PlayerOperationTypes.ASSIGN_RESOURCE, args, false);
Game.PlayerOperations.sendRequest(playerId, PlayerOperationTypes.ASSIGN_RESOURCE, args);

// 取消分配
// 来源 Resources.ltp
// 通过 Action 参数取消资源分配
const args2 = { Location: location, City: cityId, Action: PlayerOperationParameters.Deactivate };
Game.PlayerOperations.sendRequest(playerId, PlayerOperationTypes.ASSIGN_RESOURCE, args2);

// 交换资源
// 来源 Resources.ltp
// 交换两个资源的位置
const args3 = { Location: location1, Location2: location2 };
Game.PlayerOperations.sendRequest(playerId, PlayerOperationTypes.SWAP_RESOURCES, args3);
```

### 资源查询模式

```javascript
// 来源 Resources.ltp
// 遍历玩家所有资源并获取名称与分配城市
const player = Players.get(playerId);
const playerResources = player.Resources.getResources();
for (const resource of playerResources) {
  const resName = GameInfo.Resources.lookup(resource.uniqueResource.resource)?.Name ?? "";
  const location = GameplayMap.getLocationFromIndex(resource.value);
  const cityID = player.Resources.getCityIDAssigned(resource);
  const city = Cities.get(cityID);
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
// 来源 commerce-screen-model.js
// 查询资源定义表
GameInfo.Resources;              // 资源定义表
GameInfo.Resources.lookup(type); // 根据类型查询资源定义
GameInfo.Resources.forEach((resource) => { /* 遍历所有资源定义 */ });
```

---

<API id="Game.Resources.getResourceOnPlot"><h3>Game.Resources.getResourceOnPlot(resourceValue)</h3>

**说明**: 获取指定地块上的资源信息。

| 参数名 | 类型 | 说明 |
|------|------|------|
| resourceValue | `int` | 资源值（地块索引） |

**返回值**: `object` \| `undefined`

**使用示例**:

```javascript
// 来源 commerce-screen-model.js
// 获取地块上的资源并查询定义
const resource = Game.Resources.getResourceOnPlot(resourceValue);
const resourceDef = GameInfo.Resources.lookup(resource.resource);
```

</API>
<API id="Game.Resources.getOriginCity"><h3>Game.Resources.getOriginCity(resourceValue)</h3>

**说明**: 获取指定资源的来源城市 ID。

| 参数名 | 类型 | 说明 |
|------|------|------|
| resourceValue | `int` | 资源值（地块索引） |

**返回值**: `int` \| `undefined`

**使用示例**:

```javascript
// 来源 commerce-screen-model.js
// 获取资源来源城市并查重分配
const originCityID = Game.Resources.getOriginCity(resourceValue);
const originCity = Cities.get(originCityID);
```

</API>
<API id="player.Resources.getResources"><h3>player.Resources.getResources()</h3>

**说明**: 获取玩家的所有资源列表。

**参数**: 无

**返回值**: `array`

**使用示例**:

```javascript
// 来源 Resources.ltp
// 获取玩家资源列表
const player = Players.get(playerID);
const resources = player.Resources.getResources();
```

</API>
<API id="player.Resources.getCityIDAssigned"><h3>player.Resources.getCityIDAssigned(resource)</h3>

**说明**: 获取资源当前分配的城市 ID。

| 参数名 | 类型 | 说明 |
|------|------|------|
| resource | `object` | 资源对象 |

**返回值**: `int` \| `undefined`

**使用示例**:

```javascript
// 来源 Resources.ltp
// 查询资源分配的城市
const cityID = player.Resources.getCityIDAssigned(resource);
const city = Cities.get(cityID);
```

</API>
<API id="player.Resources.isRessourceAssignmentLocked"><h3>player.Resources.isRessourceAssignmentLocked()</h3>

**说明**: 检查玩家的资源分配是否被锁定。

**参数**: 无

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 commerce-screen-model.js
// 检查资源分配是否锁定
const canSlot = player.Resources.isRessourceAssignmentLocked() ? false : true;
```

</API>
<API id="city.Resources.getAssignedResources"><h3>city.Resources.getAssignedResources()</h3>

**说明**: 获取城市已分配的资源列表。

**参数**: 无

**返回值**: `array`

**使用示例**:

```javascript
// 来源 commerce-screen-model.js
// 获取城市已分配资源并计算可用槽位
const assignedResources = city.Resources.getAssignedResources();
const numAvailableSlots = city.Resources.getAssignedResourcesCap() - assignedResources.length;
```

</API>
<API id="city.Resources.getAssignedResourcesCap"><h3>city.Resources.getAssignedResourcesCap()</h3>

**说明**: 获取城市的资源分配上限。

**参数**: 无

**返回值**: `int`

**使用示例**:

```javascript
// 来源 commerce-screen-model.js
// 计算城市资源分配剩余槽位
const cap = city.Resources.getAssignedResourcesCap();
const assigned = city.Resources.getAssignedResources().length;
const availableSlots = cap - assigned;
```

</API>
<API id="city.Resources.getLocalResources"><h3>city.Resources.getLocalResources()</h3>

**说明**: 获取城市的本地资源列表。

**参数**: 无

**返回值**: `array`

**使用示例**:

```javascript
// 来源 model-city-trade.js
// 获取城市本地资源数量
const numLocalResources = city.Resources.getLocalResources().length;
```

</API>
<API id="city.Resources.canStartTreasureFleet"><h3>city.Resources.canStartTreasureFleet()</h3>

**说明**: 检查城市是否可以开始宝藏舰队。

**参数**: 无

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 model-city-details.js
// 检查宝藏舰队是否可启动
const cityResources = city.Resources;
const canStart = cityResources.canStartTreasureFleet();
if (canStart) {
  const turnsRemaining = cityResources.getTurnsUntilTreasureGenerated();
}
```

</API>
<API id="city.Resources.getTurnsUntilTreasureGenerated"><h3>city.Resources.getTurnsUntilTreasureGenerated()</h3>

**说明**: 获取距离宝藏生成的剩余回合数。

**参数**: 无

**返回值**: `int`

**使用示例**:

```javascript
// 来源 commerce-screen-model.js
// 获取宝藏生成剩余回合数
const turnsRemaining = city.Resources.getTurnsUntilTreasureGenerated();
```

</API>
<API id="city.Resources.getFactoryResource"><h3>city.Resources.getFactoryResource()</h3>

**说明**: 获取城市的工厂资源类型。

**参数**: 无

**返回值**: `string`

**使用示例**:

```javascript
// 来源 commerce-screen-model.js
// 获取工厂资源类型并查询定义
const factoryResourceType = city.Resources.getFactoryResource();
const factoryResourceDefinition = GameInfo.Resources.lookup(factoryResourceType);
```

</API>
<API id="city.Resources.getNumFactoryResources"><h3>city.Resources.getNumFactoryResources()</h3>

**说明**: 获取城市拥有的工厂资源数量。

**参数**: 无

**返回值**: `int`

**使用示例**:

```javascript
// 来源 commerce-screen-model.js
// 判断是否有工厂资源
const hasFactory = city.Resources.isTreasureConstructiblePrereqMet()
  && city.Resources.getNumFactoryResources() === 0;
```

</API>
<API id="city.Resources.isTreasureConstructiblePrereqMet"><h3>city.Resources.isTreasureConstructiblePrereqMet()</h3>

**说明**: 检查宝藏建造的前提条件是否满足。

**参数**: 无

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 commerce-screen-model.js
// 检查宝藏建造前提
const isPrereqMet = city.Resources.isTreasureConstructiblePrereqMet();
```

</API>
<API id="city.Resources.getAutoTreasureFleetValue"><h3>city.Resources.getAutoTreasureFleetValue()</h3>

**说明**: 获取城市的自动宝藏舰队产出值。

**参数**: 无

**返回值**: `int`

**使用示例**:

```javascript
// 来源 commerce-screen-model.js
// 获取宝藏舰队总产出值
const resourceValue = city.Resources.getProducedTreasureFleetPoints()
  + city.Resources.getAutoTreasureFleetValue();
```

</API>
<API id="city.Resources.getProducedTreasureFleetGold"><h3>city.Resources.getProducedTreasureFleetGold()</h3>

**说明**: 获取城市已产出的宝藏舰队金币。

**参数**: 无

**返回值**: `int`

**使用示例**:

```javascript
// 来源 commerce-screen-model.js
// 获取宝藏舰队产出数据
const gold = city.Resources.getProducedTreasureFleetGold();
const gdp = city.Resources.getProducedTreasureFleetGDP();
```

</API>
<API id="city.Resources.getProducedTreasureFleetGDP"><h3>city.Resources.getProducedTreasureFleetGDP()</h3>

**说明**: 获取城市已产出的宝藏舰队 GDP。

**参数**: 无

**返回值**: `int`

</API>
<API id="city.Resources.getProducedTreasureFleetPoints"><h3>city.Resources.getProducedTreasureFleetPoints()</h3>

**说明**: 获取城市已产出的宝藏舰队点数。

**参数**: 无

**返回值**: `int`

</API>
<API id="city.Resources.getGlobalTurnsUntilTreasureGenerated"><h3>city.Resources.getGlobalTurnsUntilTreasureGenerated()</h3>

**说明**: 获取全局宝藏生成剩余回合数。

**参数**: 无

**返回值**: `int`

**使用示例**:

```javascript
// 来源 commerce-screen-model.js
// 获取全局宝藏生成剩余回合
const globalTurns = city.Resources.getGlobalTurnsUntilTreasureGenerated();
```

</API>