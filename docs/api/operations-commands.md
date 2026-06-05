---
title: OperationsCommands 操作命令
doc_type: system-topic
summary: 游戏操作和命令系统，用于查询和执行城市、单位、玩家的操作与命令。
primary_scope:
  - Game.CityOperations
  - Game.CityCommands
  - Game.UnitOperations
  - Game.UnitCommands
  - Game.PlayerOperations
related_scope:
  - GameInfo.UnitOperations
  - GameInfo.UnitCommands
source:
  - TunerPanels/Cities.ltp
  - TunerPanels/Units.ltp
  - TunerPanels/Player.ltp
  - TunerPanels/AdvancedStart.ltp
  - TunerPanels/Diplomacy.ltp
  - TunerPanels/Pax Imperatoria.ltp
  - modules/base-standard/ui/build-queue/model-build-queue.js
  - modules/base-standard/ui/production-chooser/production-chooser-helpers.js
  - modules/base-standard/ui/unit-actions/unit-actions.js
  - modules/base-standard/ui/world-input/world-input.js
doc_update: 2026-06-05
---

# OperationsCommands 操作命令

游戏操作和命令 API。用于查询和执行城市、单位、玩家的操作。通过 `Game` 对象访问各子系统。

```javascript
// 快速示例：城市建造、单位操作、玩家操作
// 来源 model-build-queue.js, Units.ltp, AdvancedStart.ltp
// 检查并执行城市建造操作
const result = Game.CityOperations.canStart(cityID, CityOperationTypes.BUILD, args, false);
if (result.Success) {
  Game.CityOperations.sendRequest(cityID, CityOperationTypes.BUILD, args);
}

// 单位操作检查
Game.UnitOperations?.canStart(unit.id, "UNITOPERATION_RANGE_ATTACK", parameters, true);

// 玩家操作
Game.PlayerOperations.sendRequest(GameContext.localPlayerID, PlayerOperationTypes.GRANT_TREE_NODE, args);
```

## 方法列表

### Game.CityOperations（共 3 个）

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Game.CityOperations.canStart</API> | cityID, operationID | `bool` | 城市是否可以开始操作 |
| <API>Game.CityOperations.sendRequest</API> | cityID, operationID | `void` | 发送城市操作请求 |
| <API>Game.CityOperations.canStartQuery</API> | cityID, operationID | `bool` | 查询是否可以开始操作 |

### Game.CityCommands（共 3 个）

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Game.CityCommands.canStart</API> | cityID, commandID | `bool` | 城市是否可以执行命令 |
| <API>Game.CityCommands.sendRequest</API> | cityID, commandID | `void` | 发送城市命令请求 |
| <API>Game.CityCommands.canStartQuery</API> | cityID, commandID | `bool` | 查询是否可以执行命令 |

### Game.UnitOperations（共 5 个）

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Game.UnitOperations.canStart</API> | unitID, operationID | `bool` | 单位是否可以开始操作 |
| <API>Game.UnitOperations.sendRequest</API> | unitID, operationID | `void` | 发送单位操作请求 |
| <API>Game.UnitOperations.forEach</API> | callback | `void` | 遍历所有操作 |
| <API>Game.UnitOperations.canStartAny</API> | unitID | `bool` | 单位是否可以开始任何操作 |
| <API>Game.UnitOperations.lookup</API> | type | `object` | 根据类型查询操作 |

### Game.UnitCommands（共 4 个）

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Game.UnitCommands.canStart</API> | unitID, commandID | `bool` | 单位是否可以执行命令 |
| <API>Game.UnitCommands.sendRequest</API> | unitID, commandID | `void` | 发送单位命令请求 |
| <API>Game.UnitCommands.lookup</API> | type | `object` | 根据类型查询命令 |
| <API>Game.UnitCommands.forEach</API> | callback | `void` | 遍历所有命令 |

### Game.PlayerOperations（共 2 个）

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Game.PlayerOperations.sendRequest</API> | playerID, operationID | `void` | 发送玩家操作请求 |
| <API>Game.PlayerOperations.canStart</API> | playerID, operationID | `bool` | 玩家是否可以开始操作 |

## GameInfo 关联表

```javascript
// 来源 Units.ltp, unit-actions.js
// 操作和命令定义表（通过 GameInfo 访问，非 Game.*Operations/Commands）
GameInfo.UnitOperations.lookup(operationType);  // 查询单位操作定义
GameInfo.UnitCommands.lookup("UNITCOMMAND_PACK_ARMY");  // 查询单位命令定义
GameInfo.UnitCommands.forEach((command) => { ... });  // 遍历单位命令
```

---

<API id="Game.CityOperations.canStart"><h3>Game.CityOperations.canStart(cityID, operationID)</h3>

**说明**: 检查城市是否可以开始指定操作。

| 参数名 | 类型 | 说明 |
|------|------|------|
| cityID | `int` | 城市 ID |
| operationID | `int` | 操作类型 ID |

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 model-build-queue.js
// 检查城市是否可以开始建造操作
const result = Game.CityOperations.canStart(cityID, CityOperationTypes.BUILD, args, false);
if (result.Success) {
  // 可以执行建造
}
```

</API>
<API id="Game.CityOperations.sendRequest"><h3>Game.CityOperations.sendRequest(cityID, operationID)</h3>

**说明**: 发送城市操作请求。

| 参数名 | 类型 | 说明 |
|------|------|------|
| cityID | `int` | 城市 ID |
| operationID | `int` | 操作类型 ID |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 model-build-queue.js
// 发送城市建造请求
Game.CityOperations.sendRequest(cityID, CityOperationTypes.BUILD, args);
```

</API>
<API id="Game.CityOperations.canStartQuery"><h3>Game.CityOperations.canStartQuery(cityID, operationID)</h3>

**说明**: 查询城市是否可以开始操作。

| 参数名 | 类型 | 说明 |
|------|------|------|
| cityID | `int` | 城市 ID |
| operationID | `int` | 操作类型 ID |

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 production-chooser-helpers.js
// 批量查询城市建造可行性
const results = Game.CityOperations.canStartQuery(cityID, CityOperationTypes.BUILD, CityQueryType.Constructible);
```

</API>
<API id="Game.CityCommands.canStart"><h3>Game.CityCommands.canStart(cityID, commandID)</h3>

**说明**: 检查城市是否可以执行指定命令。

| 参数名 | 类型 | 说明 |
|------|------|------|
| cityID | `int` | 城市 ID |
| commandID | `int` | 命令类型 ID |

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 production-chooser-operations.js
// 检查城市是否可以购买或扩张
const result = Game.CityCommands.canStart(cityID, CityCommandTypes.PURCHASE, args, false);
if (result.Success) {
  Game.CityCommands.sendRequest(cityID, CityCommandTypes.PURCHASE, args);
}
```

</API>
<API id="Game.CityCommands.sendRequest"><h3>Game.CityCommands.sendRequest(cityID, commandID)</h3>

**说明**: 发送城市命令请求。

| 参数名 | 类型 | 说明 |
|------|------|------|
| cityID | `int` | 城市 ID |
| commandID | `int` | 命令类型 ID |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 production-chooser-helpers.js
// 发送城市购买命令
Game.CityCommands.sendRequest(cityID, CityCommandTypes.PURCHASE, args);
```

</API>
<API id="Game.CityCommands.canStartQuery"><h3>Game.CityCommands.canStartQuery(cityID, commandID)</h3>

**说明**: 查询城市是否可以执行命令。

| 参数名 | 类型 | 说明 |
|------|------|------|
| cityID | `int` | 城市 ID |
| commandID | `int` | 命令类型 ID |

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 production-chooser-helpers.js
// 批量查询城市购买可行性
const results = Game.CityCommands.canStartQuery(cityID, CityCommandTypes.PURCHASE, CityQueryType.Constructible);
```

</API>
<API id="Game.UnitOperations.canStart"><h3>Game.UnitOperations.canStart(unitID, operationID)</h3>

**说明**: 检查单位是否可以开始指定操作。

| 参数名 | 类型 | 说明 |
|------|------|------|
| unitID | `int` | 单位 ID |
| operationID | `int` | 操作类型 ID |

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 Units.ltp
// 检查单位是否可以远程攻击
Game.UnitOperations?.canStart(unitID, "UNITOPERATION_RANGE_ATTACK", parameters, true);
```

</API>
<API id="Game.UnitOperations.sendRequest"><h3>Game.UnitOperations.sendRequest(unitID, operationID)</h3>

**说明**: 发送单位操作请求。

| 参数名 | 类型 | 说明 |
|------|------|------|
| unitID | `int` | 单位 ID |
| operationID | `int` | 操作类型 ID |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 Pax Imperatoria.ltp
// 发送单位建城操作
Game.UnitOperations?.sendRequest(unitID, FOUND_CITY_OPERATION, FOUND_CITY_PAYLOAD);
```

</API>
<API id="Game.UnitOperations.forEach"><h3>Game.UnitOperations.forEach(callback)</h3>

**说明**: 遍历所有操作。

| 参数名 | 类型 | 说明 |
|------|------|------|
| callback | `function` | 回调函数 |

**返回值**: `void`

**使用示例**:

```javascript
// 未验证前提：源码中仅找到 GameInfo.UnitOperations.lookup，未找到 Game.UnitOperations.forEach
// 来源 未找到直接调用
// 遍历所有单位操作（如有）
Game.UnitOperations.forEach((operation) => {
  console.log(operation.type);
});
```

</API>
<API id="Game.UnitOperations.canStartAny"><h3>Game.UnitOperations.canStartAny(unitID)</h3>

**说明**: 检查单位是否可以开始任何操作。

| 参数名 | 类型 | 说明 |
|------|------|------|
| unitID | `int` | 单位 ID |

**返回值**: `bool`

**使用示例**:

```javascript
// 未验证前提：源码中未找到 canStartAny 调用
// 来源 未找到直接调用
// 检查单位是否有任何可用操作
const canAct = Game.UnitOperations.canStartAny(unitID);
```

</API>
<API id="Game.UnitOperations.lookup"><h3>Game.UnitOperations.lookup(type)</h3>

**说明**: 根据类型查询操作。

| 参数名 | 类型 | 说明 |
|------|------|------|
| type | `int` | 操作类型哈希值 |

**返回值**: `object`

**使用示例**:

```javascript
// 未验证前提：源码中仅找到 GameInfo.UnitOperations.lookup，未找到 Game.UnitOperations.lookup
// 来源 Units.ltp（GameInfo.UnitOperations.lookup）
// 查询操作定义信息
const info = GameInfo.UnitOperations.lookup(operationType);
```

</API>
<API id="Game.UnitCommands.canStart"><h3>Game.UnitCommands.canStart(unitID, commandID)</h3>

**说明**: 检查单位是否可以执行指定命令。

| 参数名 | 类型 | 说明 |
|------|------|------|
| unitID | `int` | 单位 ID |
| commandID | `int` | 命令类型 ID |

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 unit-actions.js
// 检查单位命令是否可用
const enabled = Game.UnitCommands?.canStart(unitID, command.CommandType, parameters);
if (enabled.Success) {
  Game.UnitCommands?.sendRequest(unitID, command.CommandType, parameters);
}
```

</API>
<API id="Game.UnitCommands.sendRequest"><h3>Game.UnitCommands.sendRequest(unitID, commandID)</h3>

**说明**: 发送单位命令请求。

| 参数名 | 类型 | 说明 |
|------|------|------|
| unitID | `int` | 单位 ID |
| commandID | `int` | 命令类型 ID |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 world-input.js
// 发送单位碾压命令
Game.UnitCommands?.sendRequest(unitID, "UNITCOMMAND_ARMY_OVERRUN", parameters);
```

</API>
<API id="Game.UnitCommands.lookup"><h3>Game.UnitCommands.lookup(type)</h3>

**说明**: 根据类型查询命令。

| 参数名 | 类型 | 说明 |
|------|------|------|
| type | `int` | 命令类型哈希值 |

**返回值**: `object`

**使用示例**:

```javascript
// 未验证前提：源码中仅找到 GameInfo.UnitCommands.lookup，未找到 Game.UnitCommands.lookup
// 来源 army-panel.js（GameInfo.UnitCommands.lookup）
// 查询命令定义
const packArmy = GameInfo.UnitCommands.lookup("UNITCOMMAND_PACK_ARMY");
```

</API>
<API id="Game.UnitCommands.forEach"><h3>Game.UnitCommands.forEach(callback)</h3>

**说明**: 遍历所有命令。

| 参数名 | 类型 | 说明 |
|------|------|------|
| callback | `function` | 回调函数 |

**返回值**: `void`

**使用示例**:

```javascript
// 未验证前提：源码中仅找到 GameInfo.UnitCommands.forEach，未找到 Game.UnitCommands.forEach
// 来源 unit-actions.js（GameInfo.UnitCommands.forEach）
// 遍历所有命令定义
GameInfo.UnitCommands.forEach((command) => {
  console.log(command.CommandType);
});
```

</API>
<API id="Game.PlayerOperations.sendRequest"><h3>Game.PlayerOperations.sendRequest(playerID, operationID)</h3>

**说明**: 发送玩家操作请求。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 玩家 ID |
| operationID | `int` | 操作类型 ID |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 AdvancedStart.ltp
// 发送进阶开局修改牌组操作
Game.PlayerOperations.sendRequest(GameContext.localPlayerID, PlayerOperationTypes.ADVANCED_START_MODIFY_DECK, args);
```

</API>
<API id="Game.PlayerOperations.canStart"><h3>Game.PlayerOperations.canStart(playerID, operationID)</h3>

**说明**: 检查玩家是否可以开始指定操作。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 玩家 ID |
| operationID | `int` | 操作类型 ID |

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 AdvancedStart.ltp
// 检查玩家操作是否可用
const result = Game.PlayerOperations.canStart(
  GameContext.localPlayerID,
  PlayerOperationTypes.ADVANCED_START_MODIFY_DECK,
  args,
  false
);
if (result.Success) {
  Game.PlayerOperations.sendRequest(GameContext.localPlayerID, PlayerOperationTypes.ADVANCED_START_MODIFY_DECK, args);
}
```

</API>