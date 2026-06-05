---
title: OperationsCommands 操作命令
doc_type: object-api
summary: 游戏操作和命令系统，用于查询和执行城市、单位、玩家的操作与命令。
primary_scope:
  - OperationsCommands
related_scope:
  - Game
source:
  - TunerPanels/Cities.ltp
  - TunerPanels/Units.ltp
  - TunerPanels/Player.ltp
---

# OperationsCommands 操作命令

游戏操作和命令 API。用于查询和执行城市、单位、玩家的操作。

```javascript
// 快速示例：检查并执行城市操作
// 来源 Cities.ltp
if (Game.CityOperations.canStart(cityID, operationID)) {
  Game.CityOperations.sendRequest(cityID, operationID);
}
```

## Game.CityOperations

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Game.CityOperations.canStart</API> | cityID, operationID | `bool` | 城市是否可以开始操作 |
| <API>Game.CityOperations.sendRequest</API> | cityID, operationID | `void` | 发送城市操作请求 |
| <API>Game.CityOperations.canStartQuery</API> | cityID, operationID | `bool` | 查询是否可以开始操作 |

## Game.CityCommands

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Game.CityCommands.canStart</API> | cityID, commandID | `bool` | 城市是否可以执行命令 |
| <API>Game.CityCommands.sendRequest</API> | cityID, commandID | `void` | 发送城市命令请求 |
| <API>Game.CityCommands.canStartQuery</API> | cityID, commandID | `bool` | 查询是否可以执行命令 |

## Game.UnitOperations

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Game.UnitOperations.canStart</API> | unitID, operationID | `bool` | 单位是否可以开始操作 |
| <API>Game.UnitOperations.sendRequest</API> | unitID, operationID | `void` | 发送单位操作请求 |
| <API>Game.UnitOperations.forEach</API> | callback | `void` | 遍历所有操作 |
| <API>Game.UnitOperations.canStartAny</API> | unitID | `bool` | 单位是否可以开始任何操作 |
| <API>Game.UnitOperations.lookup</API> | type | `object` | 根据类型查询操作 |

## Game.UnitCommands

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Game.UnitCommands.canStart</API> | unitID, commandID | `bool` | 单位是否可以执行命令 |
| <API>Game.UnitCommands.sendRequest</API> | unitID, commandID | `void` | 发送单位命令请求 |
| <API>Game.UnitCommands.lookup</API> | type | `object` | 根据类型查询命令 |
| <API>Game.UnitCommands.forEach</API> | callback | `void` | 遍历所有命令 |

## Game.PlayerOperations

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Game.PlayerOperations.sendRequest</API> | playerID, operationID | `void` | 发送玩家操作请求 |
| <API>Game.PlayerOperations.canStart</API> | playerID, operationID | `bool` | 玩家是否可以开始操作 |

---

<API id="Game.CityOperations.canStart"><h3>Game.CityOperations.canStart(cityID, operationID)</h3>

**说明**: 检查城市是否可以开始指定操作。

| 参数名 | 类型 | 说明 |
|------|------|------|
| cityID | `int` | 城市 ID |
| operationID | `int` | 操作类型 ID |

**返回值**: `bool`

</API>
<API id="Game.CityOperations.sendRequest"><h3>Game.CityOperations.sendRequest(cityID, operationID)</h3>

**说明**: 发送城市操作请求。

| 参数名 | 类型 | 说明 |
|------|------|------|
| cityID | `int` | 城市 ID |
| operationID | `int` | 操作类型 ID |

**返回值**: `void`

</API>
<API id="Game.CityOperations.canStartQuery"><h3>Game.CityOperations.canStartQuery(cityID, operationID)</h3>

**说明**: 查询城市是否可以开始操作。

| 参数名 | 类型 | 说明 |
|------|------|------|
| cityID | `int` | 城市 ID |
| operationID | `int` | 操作类型 ID |

**返回值**: `bool`

</API>
<API id="Game.CityCommands.canStart"><h3>Game.CityCommands.canStart(cityID, commandID)</h3>

**说明**: 检查城市是否可以执行指定命令。

| 参数名 | 类型 | 说明 |
|------|------|------|
| cityID | `int` | 城市 ID |
| commandID | `int` | 命令类型 ID |

**返回值**: `bool`

</API>
<API id="Game.CityCommands.sendRequest"><h3>Game.CityCommands.sendRequest(cityID, commandID)</h3>

**说明**: 发送城市命令请求。

| 参数名 | 类型 | 说明 |
|------|------|------|
| cityID | `int` | 城市 ID |
| commandID | `int` | 命令类型 ID |

**返回值**: `void`

</API>
<API id="Game.CityCommands.canStartQuery"><h3>Game.CityCommands.canStartQuery(cityID, commandID)</h3>

**说明**: 查询城市是否可以执行命令。

| 参数名 | 类型 | 说明 |
|------|------|------|
| cityID | `int` | 城市 ID |
| commandID | `int` | 命令类型 ID |

**返回值**: `bool`

</API>
<API id="Game.UnitOperations.canStart"><h3>Game.UnitOperations.canStart(unitID, operationID)</h3>

**说明**: 检查单位是否可以开始指定操作。

| 参数名 | 类型 | 说明 |
|------|------|------|
| unitID | `int` | 单位 ID |
| operationID | `int` | 操作类型 ID |

**返回值**: `bool`

</API>
<API id="Game.UnitOperations.sendRequest"><h3>Game.UnitOperations.sendRequest(unitID, operationID)</h3>

**说明**: 发送单位操作请求。

| 参数名 | 类型 | 说明 |
|------|------|------|
| unitID | `int` | 单位 ID |
| operationID | `int` | 操作类型 ID |

**返回值**: `void`

</API>
<API id="Game.UnitOperations.forEach"><h3>Game.UnitOperations.forEach(callback)</h3>

**说明**: 遍历所有操作。

| 参数名 | 类型 | 说明 |
|------|------|------|
| callback | `function` | 回调函数 |

**返回值**: `void`

</API>
<API id="Game.UnitOperations.canStartAny"><h3>Game.UnitOperations.canStartAny(unitID)</h3>

**说明**: 检查单位是否可以开始任何操作。

| 参数名 | 类型 | 说明 |
|------|------|------|
| unitID | `int` | 单位 ID |

**返回值**: `bool`

</API>
<API id="Game.UnitOperations.lookup"><h3>Game.UnitOperations.lookup(type)</h3>

**说明**: 根据类型查询操作。

| 参数名 | 类型 | 说明 |
|------|------|------|
| type | `int` | 操作类型哈希值 |

**返回值**: `object`

</API>
<API id="Game.UnitCommands.canStart"><h3>Game.UnitCommands.canStart(unitID, commandID)</h3>

**说明**: 检查单位是否可以执行指定命令。

| 参数名 | 类型 | 说明 |
|------|------|------|
| unitID | `int` | 单位 ID |
| commandID | `int` | 命令类型 ID |

**返回值**: `bool`

</API>
<API id="Game.UnitCommands.sendRequest"><h3>Game.UnitCommands.sendRequest(unitID, commandID)</h3>

**说明**: 发送单位命令请求。

| 参数名 | 类型 | 说明 |
|------|------|------|
| unitID | `int` | 单位 ID |
| commandID | `int` | 命令类型 ID |

**返回值**: `void`

</API>
<API id="Game.UnitCommands.lookup"><h3>Game.UnitCommands.lookup(type)</h3>

**说明**: 根据类型查询命令。

| 参数名 | 类型 | 说明 |
|------|------|------|
| type | `int` | 命令类型哈希值 |

**返回值**: `object`

</API>
<API id="Game.UnitCommands.forEach"><h3>Game.UnitCommands.forEach(callback)</h3>

**说明**: 遍历所有命令。

| 参数名 | 类型 | 说明 |
|------|------|------|
| callback | `function` | 回调函数 |

**返回值**: `void`

</API>
<API id="Game.PlayerOperations.sendRequest"><h3>Game.PlayerOperations.sendRequest(playerID, operationID)</h3>

**说明**: 发送玩家操作请求。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 玩家 ID |
| operationID | `int` | 操作类型 ID |

**返回值**: `void`

</API>
<API id="Game.PlayerOperations.canStart"><h3>Game.PlayerOperations.canStart(playerID, operationID)</h3>

**说明**: 检查玩家是否可以开始指定操作。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 玩家 ID |
| operationID | `int` | 操作类型 ID |

**返回值**: `bool`

</API>