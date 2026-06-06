---
title: WorldUnits 单位视觉表现
doc_type: object
summary: 单位在世界地图上的视觉表现控制，包括活动动画、空闲样式、战斗动画、生命值显示。
primary_scope:
  - WorldUnits
related_scope:
  - Units
source:
  - TunerPanels/WorldUnits.ltp
doc_update: 2026-06-05
---

# WorldUnits 单位视觉表现

`WorldUnits` 全局对象用于控制单位在世界地图上的视觉表现：活动动画、空闲样式、战斗动画、生命值显示等。这是**视觉层 API**，不影响游戏逻辑状态。

```javascript
// 来源 WorldUnits.ltp
// 快速示例：设置单位活动动画和生命值
WorldUnits.setActivity(unitId, "TYPE_SLEEP");
WorldUnits.setHealth(unitId, 50);
```

## 方法列表（共 5 个）

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>WorldUnits.setActivity</API> | unitId, activityType | `void` | 设置单位活动动画 |
| <API>WorldUnits.setIdleStyle</API> | unitId, idleType | `void` | 设置单位空闲样式 |
| <API>WorldUnits.setHealth</API> | unitId, healthPercent | `void` | 设置单位生命值百分比（0-100） |
| <API>WorldUnits.setAgeStyle</API> | unitId, ageStyle | `void` | 设置单位时代风格 |
| <API>WorldUnits.doCombat</API> | params | `void` | 触发战斗动画 |

## UnitActivityTypes 枚举

```javascript
// 来源 WorldUnits.ltp — Activities SelectionList
// 单位活动类型
const UnitActivityTypes = [
  "NONE", "SLEEP", "HEAL", "SENTRY", "PILLAGE",
  "LOOKOUT", "FORTIFY", "LANDCLAIM", "BEFRIEND",
  "COMMANDER_ACTION", "COMMANDER_PACK", "COMMANDER_UNPACK",
  "COMMANDER_FOCUS_FIRE", "COMMANDER_COORDINATE_ATTACK"
];
// 使用时加前缀: "TYPE_" + 活动名，如 "TYPE_SLEEP"
```

## UnitIdleStyles 枚举

```javascript
// 来源 WorldUnits.ltp — Idles SelectionList
// 单位空闲样式
const UnitIdleStyles = [
  "DEFAULT", "SELECTED", "COMBAT", "COMBAT_SELECTED",
  "COMBAT_RANGED", "COMBAT_RANGED_SELECTED"
];
// 使用时加前缀: "IDLE_" + 样式名，如 "IDLE_SELECTED"
```

## CombatTypes 枚举

```javascript
// 来源 WorldUnits.ltp — Combat Type SelectionList
// 战斗类型
const CombatTypes = ["MELEE", "RANGED", "BOMBARD", "AIR", "ICBM", "RELIGIOUS"];
// 使用时加前缀: "COMBAT_" + 类型名，如 "COMBAT_MELEE"
// 最终需通过 Database.makeHash() 转换为 hash 值
```

::: warning 视觉层 API
WorldUnits 方法仅影响单位的**视觉表现**，不改变游戏逻辑状态（如实际生命值、移动点数等）。游戏逻辑状态应使用 `Units` 子系统的方法（如 `Units.get(id).Health.changeDamage()`）。
:::

<API id="WorldUnits.setActivity"><h3>WorldUnits.setActivity(unitId, activityType)</h3>

**说明**: 设置单位活动动画。

| 参数名 | 类型 | 说明 |
|------|------|------|
| unitId | `object` | 单位标识 `{owner, id}` |
| activityType | `string` | 活动类型，格式 `"TYPE_" + 活动名` |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 WorldUnits.ltp
// 设置单位活动动画
WorldUnits.setActivity(unitId, "TYPE_SLEEP");
```

</API>
<API id="WorldUnits.setIdleStyle"><h3>WorldUnits.setIdleStyle(unitId, idleType)</h3>

**说明**: 设置单位空闲样式。

| 参数名 | 类型 | 说明 |
|------|------|------|
| unitId | `object` | 单位标识 `{owner, id}` |
| idleType | `string` | 空闲样式，格式 `"IDLE_" + 样式名` |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 WorldUnits.ltp
// 设置单位空闲样式
WorldUnits.setIdleStyle(unitId, "IDLE_SELECTED");
```

</API>
<API id="WorldUnits.setHealth"><h3>WorldUnits.setHealth(unitId, healthPercent)</h3>

**说明**: 设置单位生命值显示百分比。

| 参数名 | 类型 | 说明 |
|------|------|------|
| unitId | `object` | 单位标识 `{owner, id}` |
| healthPercent | `int` | 生命值百分比，0-100 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 WorldUnits.ltp
// 设置生命值显示为 50%
WorldUnits.setHealth(unitId, 50);
```

</API>
<API id="WorldUnits.setAgeStyle"><h3>WorldUnits.setAgeStyle(unitId, ageStyle)</h3>

**说明**: 设置单位时代风格。

| 参数名 | 类型 | 说明 |
|------|------|------|
| unitId | `object` | 单位标识 `{owner, id}` |
| ageStyle | `int` | 时代风格编号（1=STYLE_1, 2=STYLE_2, 3=STYLE_3） |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 WorldUnits.ltp
// 设置单位时代风格
WorldUnits.setAgeStyle(unitId, 1);  // 1=STYLE_1, 2=STYLE_2, 3=STYLE_3
```

</API>
<API id="WorldUnits.doCombat"><h3>WorldUnits.doCombat(params)</h3>

**说明**: 触发战斗动画。

| 参数名 | 类型 | 说明 |
|------|------|------|
| params | `object` | 战斗参数对象，包含 Attacker、Defender、Visualize、CombatType |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 WorldUnits.ltp — "Do Combat" Action
// 触发战斗动画
let params = {};
params.Attacker = {};
params.Attacker.ID = attackerUnitId;           // {owner, id}
params.Attacker.MaxHitPoints = Units.get(attackerUnitId).Health?.maxDamage;
params.Attacker.DamageTo = 30;                 // 本次造成伤害
params.Attacker.FinalDamageTo = 30;            // 累计伤害

params.Defender = {};
params.Defender.ID = defenderUnitId;
params.Defender.MaxHitPoints = Units.get(defenderUnitId).Health?.maxDamage;
params.Defender.DamageTo = 25;
params.Defender.FinalDamageTo = 25;

params.Visualize = true;                       // 是否播放动画
params.CombatType = Database.makeHash("COMBAT_MELEE");  // 战斗类型

WorldUnits.doCombat(params);
```

</API>