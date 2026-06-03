---
title: WorldUnits 单位视觉表现
---

# WorldUnits 单位视觉表现

`WorldUnits` 全局对象用于控制单位在世界地图上的视觉表现：活动动画、空闲样式、战斗动画、生命值显示等。这是**视觉层 API**，不影响游戏逻辑状态。

> 来源：WorldUnits.ltp

## WorldUnits 全局对象

```javascript
// 来源 WorldUnits.ltp
WorldUnits.setActivity(unitId, activityType);     // 设置单位活动动画
WorldUnits.setIdleStyle(unitId, idleType);         // 设置单位空闲样式
WorldUnits.setHealth(unitId, healthPercent);       // 设置单位生命值百分比（0-100）
WorldUnits.setAgeStyle(unitId, ageStyle);          // 设置单位时代风格
WorldUnits.doCombat(params);                       // 触发战斗动画
```

## 方法详细

### setActivity

```javascript
WorldUnits.setActivity(unitId, "TYPE_SLEEP");
// unitId: {owner: number, id: number}
// activityType: "TYPE_" + 活动名称（见 UnitActivityTypes 枚举）
```

### setIdleStyle

```javascript
WorldUnits.setIdleStyle(unitId, "IDLE_SELECTED");
// idleType: "IDLE_" + 样式名称（见 UnitIdleStyles 枚举）
```

### setHealth

```javascript
WorldUnits.setHealth(unitId, 50);  // 设置为 50% 生命值
// healthPercent: 0-100
```

### setAgeStyle

```javascript
WorldUnits.setAgeStyle(unitId, 1);  // 设置时代风格（1=STYLE_1, 2=STYLE_2, 3=STYLE_3）
```

### doCombat

```javascript
// 来源 WorldUnits.ltp — "Do Combat" Action
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

## UnitActivityTypes 枚举

```javascript
// 来源 WorldUnits.ltp — Activities SelectionList
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
const UnitIdleStyles = [
  "DEFAULT", "SELECTED", "COMBAT", "COMBAT_SELECTED",
  "COMBAT_RANGED", "COMBAT_RANGED_SELECTED"
];
// 使用时加前缀: "IDLE_" + 样式名，如 "IDLE_SELECTED"
```

## CombatTypes 枚举

```javascript
// 来源 WorldUnits.ltp — Combat Type SelectionList
const CombatTypes = ["MELEE", "RANGED", "BOMBARD", "AIR", "ICBM", "RELIGIOUS"];
// 使用时加前缀: "COMBAT_" + 类型名，如 "COMBAT_MELEE"
// 最终需通过 Database.makeHash() 转换为 hash 值
```

::: warning 视觉层 API
WorldUnits 方法仅影响单位的**视觉表现**，不改变游戏逻辑状态（如实际生命值、移动点数等）。游戏逻辑状态应使用 `Units` 子系统的方法（如 `Units.get(id).Health.changeDamage()`）。
:::

---

*来源：WorldUnits.ltp*
