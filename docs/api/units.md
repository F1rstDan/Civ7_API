---
title: Units 单位
---

# Units 单位

单位管理全局对象，提供单位的获取、创建、属性修改及状态查询等功能。

## 快速示例

```javascript
// 来源 Units.ltp
// 通过 ID 获取单位并读取其基本属性
const unit = Units.get(unitId);
unit.location;       // {x, y}
unit.activityType;
unit.isEmbarked;
```

## 方法列表

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Units.get</API> | id | `Unit` | 根据 ID 获取单位对象 |
| <API>Units.create</API> | params | `Unit` | 创建新单位 |
| <API>Units.setLocation</API> | unitID, location | `void` | 设置单位位置 |
| <API>Units.getReachableTargets</API> | unitID | `array` | 获取单位可到达的攻击目标 |
| <API>Units.getPathTo</API> | unitID, target | `array` | 获取单位到目标的路径 |
| <API>Units.getReachableMovement</API> | unitID | `array` | 获取单位可到达的移动地块 |
| <API>Units.getReachableZonesOfControl</API> | unitID, excludeFriendly | `array` | 获取单位控制区（ZOC）地块 |
| <API>Units.getCommandRadiusPlots</API> | unitID | `array` | 获取指挥官的指挥半径地块 |
| <API>Units.getQueuedOperationDestination</API> | unitID | `object` | 获取单位排队操作的目标位置 |
| <API>Units.restoreMovement</API> | unitID | `void` | 恢复单位移动力 |
| <API>Units.changeDamage</API> | unitID, amount | `void` | 改变单位伤害值（正值扣血，负值治疗） |
| <API>Units.setDamage</API> | unitID, amount | `void` | 设置单位伤害值 |
| <API>Units.changeExperience</API> | unitID, amount | `void` | 改变单位经验值 |
| <API>Units.setActivity</API> | unitID, activityType | `void` | 设置单位活动状态，见[常用枚举](#常用枚举) |
| <API>Units.hasTag</API> | unitID, tag | `bool` | 检查单位是否拥有指定标签 |

## Unit 对象子系统

单位对象通过 `Units.get(unitId)` 获取，包含以下子系统：

| 子系统 | 说明 |
|--------|------|
| `Health` | 生命值子系统 |
| `Combat` | 战斗子系统 |
| `Experience` | 经验子系统 |
| `Religion` | 宗教子系统 |

### 基本属性

```javascript
// 来源 Units.ltp
// 获取单位对象并读取常用属性
let unit = Units.get(unitId);
unit.id;
```

| 属性 | 类型 | 说明 |
|------|------|------|
| `unit.id` | `object` | 单位 ID 对象（含 `owner`、`id`、`type` 字段） |
| `unit.type` | `int` | 单位类型哈希值，可通过 `GameInfo.Units.lookup(type)` 查询定义 |
| `unit.location` | `object` | 单位当前坐标 `{x, y}` |
| `unit.activityType` | `UnitActivityTypes` | 当前活动状态，见[常用枚举](#常用枚举) |
| `unit.embarkationType` | `int` | 装载类型哈希值，`-1` 表示未装载 |
| `unit.isEmbarked` | `bool` | 是否处于装载状态（海上运输） |
| `unit.operationQueueSize` | `int` | 操作队列长度 |
| `unit.originalOwner` | `int` | 原始拥有者玩家 ID，`-1` 表示无 |
| `unit.isCommanderUnit` | `bool` | 是否是指挥官单位 |
| `unit.Movement` | `object` | 移动子系统，含 `movementMovesRemaining` 等 |
| `unit.Combat` | `object` | 战斗子系统，含 `attackRange`、`attacksRemaining`、`hasMovedIntoZOC` 等 |

### Health 生命子系统

```javascript
// 来源 Units.ltp
// 读取单位的生命值状态
unit.Health.damage;     // 当前伤害值
unit.Health.maxDamage;  // 最大伤害值
unit.Health.isDead;     // 是否死亡
```

### Combat 战斗子系统

```javascript
// 来源 Units.ltp
// 读取单位的战斗属性
unit.Combat.attackRange; // 攻击范围
```

### Experience 晋级子系统

```javascript
// 来源 Units.ltp
// 读取单位的经验与晋升状态
unit.Experience.canPromote;
unit.Experience.getAllPromotions(); // [{disciplineType, promotionType}]
```

### Religion 宗教子系统

```javascript
// 来源 Units.ltp
// 读取单位的宗教属性
unit.Religion.religionType;
```

### 操作队列

```javascript
// 来源 Units.ltp
// 遍历单位的操作队列
for (let i = 0; i < unit.operationQueueSize; i++) {
  const opType = unit.getOperationType(i);
  const params = unit.getOperationParameters(i);
}
```

### 能力与视野

```javascript
// 来源 Units.ltp
// 获取单位的能力列表与视野范围
unit.getAbilities();   // 单位能力数组
unit.getSightPlots();  // 视野地块索引数组
```

## Formations 与 Armies

```javascript
// 来源 Units.ltp
// 遍历玩家的阵型与军队
// Formations
const pFormations = player.Formations;
for (const formationId of pFormations.getFormationIds()) {
  const pFormation = Formations.get(formationId);
  for (const unitId of pFormation.getUnitIds()) {}
}

// Armies
const pArmies = player.Armies;
for (const armyId of pArmies.getArmyIds()) {
  const pArmy = Armies.get(armyId);
  const commanderId = pArmy.getCommanderId();
  for (const unitId of pArmy.getUnitIds()) {}
}
```

## 常用枚举

用于 <API>Units.setActivity</API>`(unitID, activityType)` 和读取 `unit.activityType` 时。

| 单位活动状态枚举 | 说明 |
|------|------|
| `UnitActivityTypes.NONE` | 无活动 |
| `UnitActivityTypes.AWAKE` | 清醒（已激活，等待指令） |
| `UnitActivityTypes.SLEEP` | 睡眠（跳过此单位回合） |
| `UnitActivityTypes.HEAL` | 治疗（原地恢复生命值） |
| `UnitActivityTypes.SENTRY` | 警戒（发现敌人时唤醒） |
| `UnitActivityTypes.HOLD` | 待命（跳过回合但不睡眠） |
| `UnitActivityTypes.INTERCEPT` | 拦截（自动拦截敌方单位） |
| `UnitActivityTypes.OPERATION` | 执行操作（正在执行排队操作） |
| `UnitActivityTypes.JUMP` | 跳跃（传送类移动） |

## 常用 GameInfo 表

```javascript
GameInfo.Units;
GameInfo.UnitOperations;
GameInfo.UnitPromotions;
GameInfo.UnitPromotionDisciplines;
GameInfo.UnitAbilities;
GameInfo.UnitEmbarkationTypes;
```

**`GameInfo.Units` 常用方式**：

| 方法 | 说明 | 示例 |
|------|------|------|
| `lookup(type)` | 根据类型哈希查询单位定义 | `GameInfo.Units.lookup(unit.type)` |
| `find(predicate)` | 查找满足条件的第一个单位定义 | `GameInfo.Units.find((o) => o.UnitType == "UNIT_SCOUT")` |
| `forEach(callback)` | 遍历所有单位定义 | `GameInfo.Units.forEach((u) => { ... })` |

## 其他相关方法

以下方法属于 `player.Units` 子系统，与 `Units` 全局对象配合使用：

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `player.Units.getBuildUnit` | type | `int` | 获取指定类型单位的建造哈希值 |
| `player.Units.getUnits` | — | `Unit[]` | 获取该玩家的所有单位 |
| `player.Units.getUnitIds` | — | `array` | 获取该玩家所有单位的 ID 列表 |
| `player.Units.getUnitTypesUnlockedWithTag` | tag, includeUnlocked | `array` | 获取带指定标签的已解锁单位类型 |
| `player.Units.getUnitTypesWithTag` | tag | `array` | 获取带指定标签的所有单位类型 |
| `player.Units.numUnits` | — | `int` | 该玩家的单位总数 |
| `player.Units.isReplacedUnitUnlocked` | type, bool, bool | `bool` | 检查替换单位是否已解锁 |
| `player.Units.isBuildPermanentlyDisabled` | type | `bool` | 检查单位建造是否永久禁用 |

```javascript
// 来源 TunerPanels/Units.ltp
// 通过 player.Units 遍历单位
const player = Players.get(playerId);
const pUnits = player.Units;
for (const unitId of pUnits.getUnitIds()) {
  const pUnit = Units.get(unitId);
}

// 来源 modules/base-standard/scripts/age-transition-post-load.js
// 获取可建造单位
const commanderType = player.Units?.getBuildUnit("UNIT_ARMY_COMMANDER");

// 来源 modules/base-standard/ui/tutorial/tutorial-support.js
// 获取已解锁的特定标签单位
const units = player.Units.getUnitTypesUnlockedWithTag("UNIT_CLASS_RANGED", false);
```

## 源文件引用

- `TunerPanels/Units.ltp`
- `modules/base-standard/ui/interface-modes/support-unit-map-decoration.js`
- `modules/base-standard/scripts/age-transition-post-load.js`
- `modules/base-standard/ui/tutorial/tutorial-support.js`

<API id="Units.get" title="Units.get(id)">

**说明**: 根据单位 ID 获取单位对象，是最常用的入口方法。

| 参数名 | 类型 | 说明 |
|------|------|------|
| id | `object` | 单位 ID 对象（含 owner、id、type 字段） |

**返回值**: `Unit` — 单位对象，不存在时返回 `null`

**使用示例**:

```javascript
// 来源 Units.ltp
// 获取单位后读取基本属性和子系统
let unit = Units.get(unitId);
if (unit != null) {
  let loc = unit.location;
  let damage = unit.Health.damage;
  let typeName = GameInfo.Units.lookup(unit.type)?.UnitType.replace("UNIT_", "");
}
```

</API>

<API id="Units.restoreMovement" title="Units.restoreMovement(unitID)">

**说明**: 恢复指定单位的所有移动力。

| 参数名 | 类型 | 说明 |
|------|------|------|
| unitID | `object` | 单位 ID 对象 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 Units.ltp
// 恢复单个单位或全体单位移动力
Units.restoreMovement(unit.id);

// 恢复当前玩家所有单位的移动力
const playerId = GameContext.getLocalPlayerID();
const player = Players.get(playerId);
for (const unitId of player.Units.getUnitIds()) {
  Units.restoreMovement(unitId);
}
```

</API>

<API id="Units.changeDamage" title="Units.changeDamage(unitID, amount)">

**说明**: 改变单位的伤害值。正值为扣血，负值为治疗。

| 参数名 | 类型 | 说明 |
|------|------|------|
| unitID | `object` | 单位 ID 对象 |
| amount | `int` | 伤害变化量，正数扣血、负数治疗 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 Units.ltp
// 扣血 25 点、治疗 25 点
Units.changeDamage(unit.id, 25);
Units.changeDamage(unit.id, -25);
```

</API>

<API id="Units.setDamage" title="Units.setDamage(unitID, amount)">

**说明**: 直接设置单位的伤害值。

| 参数名 | 类型 | 说明 |
|------|------|------|
| unitID | `object` | 单位 ID 对象 |
| amount | `int` | 伤害值，0 表示满血 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 Units.ltp
// 完全治疗单位 / 杀死单位
Units.setDamage(unit.id, 0);
Units.setDamage(unit.id, unit.Health.maxDamage);
```

</API>

<API id="Units.changeExperience" title="Units.changeExperience(unitID, amount)">

**说明**: 改变单位的经验值。

| 参数名 | 类型 | 说明 |
|------|------|------|
| unitID | `object` | 单位 ID 对象 |
| amount | `int` | 经验值变化量 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 Units.ltp
// 增加 500 点经验
Units.changeExperience(unit.id, 500);
```

</API>

<API id="Units.setActivity" title="Units.setActivity(unitID, activityType)">

**说明**: 设置单位的活动状态，见[常用枚举](#常用枚举)。

| 参数名 | 类型 | 说明 |
|------|------|------|
| unitID | `object` | 单位 ID 对象 |
| activityType | `UnitActivityTypes` | 活动类型枚举值 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 Units.ltp
// 设置单位活动状态
Units.setActivity(unit.id, UnitActivityTypes.SLEEP);
Units.setActivity(unit.id, UnitActivityTypes.HEAL);
Units.setActivity(unit.id, UnitActivityTypes.SENTRY);
```

</API>

<API id="Units.hasTag" title="Units.hasTag(unitID, tag)">

**说明**: 检查单位是否拥有指定标签。

| 参数名 | 类型 | 说明 |
|------|------|------|
| unitID | `object` | 单位 ID 对象 |
| tag | `string` | 标签名称，如 `"UNIT_CLASS_SIEGE"` |

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 Units.ltp
// 判断单位是否为攻城单位
const isSiege = Units.hasTag(unitId, "UNIT_CLASS_SIEGE");
```

</API>

<API id="Units.getReachableTargets" title="Units.getReachableTargets(unitID)">

**说明**: 获取单位当前可到达的攻击目标地块列表。

| 参数名 | 类型 | 说明 |
|------|------|------|
| unitID | `object` | 单位 ID 对象 |

**返回值**: `array` — 可攻击的地块索引数组

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/interface-modes/support-unit-map-decoration.js
// 获取单位可攻击的目标列表
const kAttackPlots = Units.getReachableTargets(unit.id);
```

</API>

<API id="Units.getPathTo" title="Units.getPathTo(unitID, target)">

**说明**: 获取单位到目标位置的移动路径。

| 参数名 | 类型 | 说明 |
|------|------|------|
| unitID | `object` | 单位 ID 对象 |
| target | `object` | 目标位置 `{x, y}` |

**返回值**: `array` — 路径地块数组

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/interface-modes/support-unit-map-decoration.js
// 获取单位到目的地的路径
const destination = { x: 67, y: 27 };
const result = Units.getPathTo(unit.id, destination);
```

</API>

<API id="Units.create" title="Units.create(playerID, params)">

**说明**: 为指定玩家创建新单位。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 玩家 ID |
| params | `object` | 创建参数，含 `Type`（单位类型）和 `Location`（`{x, y}`），可选 `Validate` |

**返回值**: `object` — 创建结果，含新单位 ID

**使用示例**:

```javascript
// 来源 modules/base-standard/scripts/age-transition-post-load.js
// 创建指挥官单位 / 普通单位
const result = Units.create(player.id, {
  Type: commanderType,
  Location: city.location
});
Units.create(player.id, {
  Type: buildUnit,
  Location: location,
  Validate: true
});
```

</API>

<API id="Units.setLocation" title="Units.setLocation(unitID, location)">

**说明**: 设置单位的位置。

| 参数名 | 类型 | 说明 |
|------|------|------|
| unitID | `object` | 单位 ID 对象 |
| location | `object` | 目标位置 `{x, y}` |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/base-standard/scripts/age-transition-post-load.js
// 将单位移动到城市位置
Units.setLocation(unitID, city.location);
```

</API>

<API id="Units.getReachableMovement" title="Units.getReachableMovement(unitID)">

**说明**: 获取单位当前可到达的移动地块列表。

| 参数名 | 类型 | 说明 |
|------|------|------|
| unitID | `object` | 单位 ID 对象 |

**返回值**: `array` — 可移动的地块索引数组

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/interface-modes/support-unit-map-decoration.js
// 获取单位可移动的地块（未进入 ZOC 时）
const movePlots = Units.getReachableMovement(unit.id);
```

</API>

<API id="Units.getReachableZonesOfControl" title="Units.getReachableZonesOfControl(unitID, excludeFriendly)">

**说明**: 获取单位当前控制区（ZOC）范围内的地块列表。

| 参数名 | 类型 | 说明 |
|------|------|------|
| unitID | `object` | 单位 ID 对象 |
| excludeFriendly | `bool` | 是否排除友方地块 |

**返回值**: `array` — ZOC 地块索引数组

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/interface-modes/support-unit-map-decoration.js
// 获取单位的控制区地块（排除友方）
const zocPlots = Units.getReachableZonesOfControl(unit.id, true);
```

</API>

<API id="Units.getCommandRadiusPlots" title="Units.getCommandRadiusPlots(unitID)">

**说明**: 获取指挥官的指挥半径内地块。仅对指挥官单位有效。

| 参数名 | 类型 | 说明 |
|------|------|------|
| unitID | `object` | 单位 ID 对象 |

**返回值**: `array` — 指挥半径内地块索引数组

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/interface-modes/support-unit-map-decoration.js
// 获取指挥官的指挥半径地块
if (unit.isCommanderUnit) {
  const commandRadiusPlots = Units.getCommandRadiusPlots(unit.id);
}
```

</API>

<API id="Units.getQueuedOperationDestination" title="Units.getQueuedOperationDestination(unitID)">

**说明**: 获取单位排队操作的目标位置。

| 参数名 | 类型 | 说明 |
|------|------|------|
| unitID | `object` | 单位 ID 对象 |

**返回值**: `object` — 目标位置 `{x, y}`，无排队操作时返回 `null`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/interface-modes/support-unit-map-decoration.js
// 获取排队操作目标并绘制路径
const destination = Units.getQueuedOperationDestination(unit.id);
if (destination) {
  const result = Units.getPathTo(unit.id, destination);
}
```

</API>