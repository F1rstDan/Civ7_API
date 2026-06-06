---
title: Combat 战斗系统
doc_type: system
summary: 战斗系统，覆盖全局战斗模拟（Game.Combat）、单位战斗属性（unit.Combat）、指挥官军队（player.Armies / Armies）和编队（player.Formations / Formations）。
primary_scope:
  - Game.Combat
  - unit.Combat
  - player.Armies
  - Armies
  - player.Formations
  - Formations
related_scope:
  - CombatTypes
  - CombatStrengthTypes
  - Game.UnitOperations
  - GameplayMap
source:
  - TunerPanels/Units.ltp
  - TunerPanels/Random Events.ltp
  - modules/base-standard/ui/unit-combat-preview/panel-unit-combat-preview.js
  - modules/base-standard/ui/world-input/world-input.js
  - modules/base-standard/ui/commander-interact/model-commander-interact.js
  - modules/base-standard/scripts/age-transition-post-load.js
  - modules/base-standard/ui/unit-flags/army-commander-flags.js
  - modules/base-standard/ui/interface-modes/support-unit-map-decoration.js
  - modules/base-standard/ui/interface-modes/interface-mode-ranged-attack.js
  - modules/base-standard/ui/interface-modes/interface-mode-move-to.js
doc_update: 2026-06-06
---

# Combat 战斗系统

提供战斗预演、攻击判定、军队编队管理和指挥官增援等战斗相关功能。`Game.Combat` 为全局战斗管理器，`unit.Combat` 提供单位战斗属性，`player.Armies` / `player.Formations` 管理军队和编队。

## 快速示例

```javascript
// 来源 TunerPanels/Units.ltp
// 遍历所有玩家的军队和编队，获取单位详情
const player = Players.get(id);
const pArmies = player.Armies;
for (const armyId of pArmies.getArmyIds()) {
    const pArmy = Armies.get(armyId);
    if (pArmy) {
        const commanderId = pArmy.getCommanderId();
        for (const unitId of pArmy.getUnitIds()) {
            const pUnit = Units.get(unitId);
            console.log(pUnit.type);
        }
    }
}
```

```javascript
// 来源 panel-unit-combat-preview.js
// 战斗预演：检查能否攻击，然后异步模拟战斗结果
const attackingUnit = Units.get(selectedUnitID);
const attackingUnitCombat = attackingUnit.Combat;
if (attackingUnitCombat?.isCombat && attackingUnitCombat?.canAttack) {
    const targetID = Game.Combat.getBestDefender(location, selectedUnitID);
    const args = { Location: location, CombatType: CombatTypes.COMBAT_MELEE };
    const queryID = Game.Combat.simulateAttackAsync(attackingUnit.id, args);
}
```

## Game.Combat 全局战斗管理器

| 方法(5) | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Game.Combat.testAttackInto</API> | unitId, parameters | `CombatTypes` | 测试攻击类型，返回战斗类型枚举 |
| <API>Game.Combat.getDefensibleDistrict</API> | location | `ComponentID` | 获取指定位置的可防御区域 ID |
| <API>Game.Combat.getBestDefender</API> | location, selectedUnitId | `ComponentID` | 获取指定位置的最佳防守单位 ID |
| <API>Game.Combat.simulateAttackAsync</API> | unitId, args | `ComponentID` (queryToken) | 异步模拟攻击，通过 `SimulateCombatResult` 事件获取结果 |
| <API>Game.Combat.detonateWMD</API> | playerId, wmdType, plotCoord | `void` | 在指定坐标引爆 WMD |

## unit.Combat 单位战斗属性

通过 `unit.Combat` 访问单位战斗属性，返回 UnitsCombat 对象。

```javascript
// 来源 panel-unit-combat-preview.js
// 获取单位战斗属性并检查
const unit = Units.get(selectedUnitID);
const combat = unit.Combat;
if (combat?.isCombat && combat?.canAttack) {
    console.log(combat.attackRange);
    console.log(combat.getMeleeStrength(false));
}
```

| 属性(6) | 类型 | 说明 |
|------|------|------|
| `unit.Combat.isCombat` | `bool` | 是否可参与战斗 |
| `unit.Combat.canAttack` | `bool` | 当前是否可攻击 |
| `unit.Combat.attackRange` | `int` | 攻击范围 |
| `unit.Combat.rangedStrength` | `int` | 远程战斗力 |
| `unit.Combat.bombardStrength` | `int` | 轰炸战斗力 |
| `unit.Combat.attacksRemaining` | `int` | 剩余攻击次数 |

| 方法(1) | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>unit.Combat.getMeleeStrength</API> | isAttacking (bool) | `int` | 获取近战战斗力 |

## player.Armies 玩家军队管理

通过 `player.Armies` 访问玩家军队，管理指挥官军队和单位增援。

```javascript
// 来源 model-commander-interact.js
// 获取单位的增援指挥官和 ETA
const playerArmies = player.Armies;
const armyId = playerArmies.getUnitReinforcementCommanderId(unitID, localPlayerID);
const startLocation = playerArmies.getUnitReinforcementStartLocation(unitID, localPlayerID);
const arrivalTime = playerArmies.getUnitReinforcementETA(unitID, localPlayerID);
```

```javascript
// 来源 TunerPanels/Units.ltp
// 遍历军队列表，获取指挥官和编入单位
const pArmies = player.Armies;
for (const armyId of pArmies.getArmyIds()) {
    const pArmy = Armies.get(armyId);
    if (pArmy) {
        const commanderId = pArmy.getCommanderId();
        const unitIds = pArmy.getUnitIds();
    }
}
```

| 方法(4) | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>player.Armies.getArmyIds</API> | — | `ComponentID[]` | 获取所有军队 ID 列表 |
| <API>player.Armies.getUnitReinforcementCommanderId</API> | unitId, playerId | `ComponentID` | 获取单位增援目标指挥官 ID |
| <API>player.Armies.getUnitReinforcementStartLocation</API> | unitId, playerId | `Location` | 获取增援单位起始位置 |
| <API>player.Armies.getUnitReinforcementETA</API> | unitId, playerId | `int` | 获取增援到达剩余回合数 |

### 军队实例（Armies.get 返回值）

| 属性(1) | 类型 | 说明 |
|------|------|------|
| `army.location` | `Location` | 军队当前位置 |

| 方法(3) | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Armies.get</API> | armyId | `Army` | 根据 ID 获取军队实例 |
| `army.getUnitIds` | — | `ComponentID[]` | 获取编入军队的所有单位 ID |
| `army.getCommanderId` | — | `ComponentID` | 获取指挥官单位 ID |
| `army.packUnit` | unit | `void` | 将单位编入军队 |

## player.Formations 玩家编队管理

通过 `player.Formations` 访问玩家编队，管理单位编队组。

```javascript
// 来源 TunerPanels/Units.ltp
// 遍历编队列表，获取编队内所有单位
const pFormations = player.Formations;
for (const formationId of pFormations.getFormationIds()) {
    const pFormation = Formations.get(formationId);
    if (pFormation) {
        for (const unitId of pFormation.getUnitIds()) {
            const pUnit = Units.get(unitId);
        }
    }
}
```

| 方法(1) | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>player.Formations.getFormationIds</API> | — | `ComponentID[]` | 获取所有编队 ID 列表 |

### 编队实例（Formations.get 返回值）

| 方法(2) | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Formations.get</API> | formationId | `Formation` | 根据 ID 获取编队实例 |
| `formation.getUnitIds` | — | `ComponentID[]` | 获取编队内所有单位 ID |

## 常用枚举

| 枚举 | 说明 |
|------|------|
| `CombatTypes.NO_COMBAT` | 无战斗 |
| `CombatTypes.COMBAT_MELEE` | 近战攻击 |
| `CombatTypes.COMBAT_RANGED` | 远程攻击 |
| `CombatStrengthTypes.STRENGTH_MELEE` | 近战强度类型 |
| `CombatStrengthTypes.STRENGTH_RANGED` | 远程强度类型 |
| `CombatStrengthTypes.STRENGTH_BOMBARD` | 轰炸强度类型 |

## 相关全局对象

| 对象 | 说明 |
|------|------|
| `Game.UnitOperations` | 单位操作（发起攻击等），见 operations-commands.md |
| `GameplayMap` | 地图对象，用于坐标转换，见 gameplay-map.md |
| `Units` | 单位管理，见 units.md |

<API id="Game.Combat.testAttackInto"><h3>Game.Combat.testAttackInto(unitId, parameters)</h3>

**说明**: 测试攻击单位进入目标位置时的战斗类型，用于判断是近战、远程还是无法攻击。

| 参数名 | 类型 | 说明 |
|------|------|------|
| unitId | `ComponentID` | 攻击单位 ID |
| parameters | `Object` | 攻击参数，含 X、Y 坐标 |

**返回值**: `CombatTypes`

**使用示例**:

```javascript
// 来源 world-input.js
// 测试攻击类型，决定是远程还是近战
const combatType = Game.Combat.testAttackInto(unit.id, parameters);
if (combatType == CombatTypes.COMBAT_RANGED) {
    // 发起远程攻击
    Game.UnitOperations?.sendRequest(unit.id, "UNITOPERATION_RANGE_ATTACK", parameters);
}
```

</API>
<API id="Game.Combat.getDefensibleDistrict"><h3>Game.Combat.getDefensibleDistrict(location)</h3>

**说明**: 获取指定位置的可防御区域 ID。如果位置有可防御的区域，返回区域 ID；否则返回无效 ID。

| 参数名 | 类型 | 说明 |
|------|------|------|
| location | `Location` | 目标位置坐标 |

**返回值**: `ComponentID`

**使用示例**:

```javascript
// 来源 panel-unit-combat-preview.js
// 获取目标位置的可防御区域
const defendingDistrictID = Game.Combat.getDefensibleDistrict(this.location);
if (ComponentID.isValid(defendingDistrictID)) {
    this.isTargetDistrict = true;
}
```

</API>
<API id="Game.Combat.getBestDefender"><h3>Game.Combat.getBestDefender(location, selectedUnitId)</h3>

**说明**: 获取指定位置上针对某个攻击方的最佳防守单位 ID。

| 参数名 | 类型 | 说明 |
|------|------|------|
| location | `Location` | 目标位置坐标 |
| selectedUnitId | `ComponentID` | 攻击方单位 ID |

**返回值**: `ComponentID`

**使用示例**:

```javascript
// 来源 panel-unit-combat-preview.js
// 获取最佳防守单位
const defendingUnitID = Game.Combat.getBestDefender(this.location, this.selectedUnitID);
```

</API>
<API id="Game.Combat.simulateAttackAsync"><h3>Game.Combat.simulateAttackAsync(unitId, args)</h3>

**说明**: 异步模拟战斗，返回一个查询令牌（queryToken）。结果通过 `SimulateCombatResult` 事件返回，包含攻击方/防守方战斗力、战斗修正等信息。

| 参数名 | 类型 | 说明 |
|------|------|------|
| unitId | `ComponentID` | 攻击单位 ID |
| args | `Object` | 攻击参数，含 `Location`、`X`、`Y`、`CombatType` |

**返回值**: `ComponentID` (queryToken)

**使用示例**:

```javascript
// 来源 panel-unit-combat-preview.js
// 异步模拟战斗，监听 SimulateCombatResult 事件获取结果
const args = {
    Location: this.location,
    X: this.location?.x,
    Y: this.location?.y,
    CombatType: CombatTypes.COMBAT_MELEE
};
this.queryCombatID = Game.Combat.simulateAttackAsync(attackingUnit.id, args);
```

</API>
<API id="Game.Combat.detonateWMD"><h3>Game.Combat.detonateWMD(playerId, wmdType, plotCoord)</h3>

**说明**: 在指定坐标引爆大规模杀伤性武器（WMD）。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerId | `int` | 玩家 ID，-1 表示无玩家 |
| wmdType | `string` | WMD 类型 |
| plotCoord | `Location` | 引爆坐标 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 Random Events.ltp
// 在随机事件位置引爆 WMD
const plotCoord = GameplayMap.getLocationFromIndex(eventIndex);
Game.Combat.detonateWMD(-1, selectedWMDType, plotCoord);
```

</API>
<API id="unit.Combat.getMeleeStrength"><h3>unit.Combat.getMeleeStrength(isAttacking)</h3>

**说明**: 获取单位近战战斗力。参数指定是否在攻击状态。

| 参数名 | 类型 | 说明 |
|------|------|------|
| isAttacking | `bool` | 是否处于攻击状态 |

**返回值**: `int`

**使用示例**:

```javascript
// 来源 interface-mode-move-to.js
// 判断单位是远程优先还是近战优先
const attackingUnitCombat = unit.Combat;
if (attackingUnitCombat.getMeleeStrength(false) > 0) {
    // 有近战能力
}
```

</API>
<API id="player.Armies.getArmyIds"><h3>player.Armies.getArmyIds()</h3>

**说明**: 获取玩家所有军队的 ID 列表。

**参数**: 无

**返回值**: `ComponentID[]`

**使用示例**:

```javascript
// 来源 TunerPanels/Units.ltp
// 遍历所有军队
const pArmies = player.Armies;
for (const armyId of pArmies.getArmyIds()) {
    const pArmy = Armies.get(armyId);
}
```

</API>
<API id="player.Armies.getUnitReinforcementCommanderId"><h3>player.Armies.getUnitReinforcementCommanderId(unitId, playerId)</h3>

**说明**: 获取指定单位的增援目标指挥官军队 ID。

| 参数名 | 类型 | 说明 |
|------|------|------|
| unitId | `ComponentID` | 单位 ID |
| playerId | `int` | 玩家 ID |

**返回值**: `ComponentID`

**使用示例**:

```javascript
// 来源 model-commander-interact.js
// 获取单位增援目标指挥官
const playerArmies = player.Armies;
const armyId = playerArmies.getUnitReinforcementCommanderId(unitID, localPlayerID);
```

</API>
<API id="player.Armies.getUnitReinforcementStartLocation"><h3>player.Armies.getUnitReinforcementStartLocation(unitId, playerId)</h3>

**说明**: 获取增援单位的起始位置。

| 参数名 | 类型 | 说明 |
|------|------|------|
| unitId | `ComponentID` | 单位 ID |
| playerId | `int` | 玩家 ID |

**返回值**: `Location`

**使用示例**:

```javascript
// 来源 model-commander-interact.js
// 获取增援单位起始位置
const startLocation = playerArmies.getUnitReinforcementStartLocation(unitID, localPlayerID);
```

</API>
<API id="player.Armies.getUnitReinforcementETA"><h3>player.Armies.getUnitReinforcementETA(unitId, playerId)</h3>

**说明**: 获取增援单位到达目标指挥官所需的剩余回合数。

| 参数名 | 类型 | 说明 |
|------|------|------|
| unitId | `ComponentID` | 单位 ID |
| playerId | `int` | 玩家 ID |

**返回值**: `int`

**使用示例**:

```javascript
// 来源 model-commander-interact.js
// 获取增援到达 ETA
const arrivalTime = playerArmies.getUnitReinforcementETA(unitID, localPlayerID);
```

</API>
<API id="Armies.get"><h3>Armies.get(armyId)</h3>

**说明**: 根据 ID 获取军队实例。军队实例包含 `getUnitIds()`、`getCommanderId()`、`packUnit()` 等方法。

| 参数名 | 类型 | 说明 |
|------|------|------|
| armyId | `ComponentID` | 军队 ID |

**返回值**: `Army` | `undefined`

**使用示例**:

```javascript
// 来源 age-transition-post-load.js
// 获取军队实例，将单位编入
const army = Armies.get(commanderId);
if (army != null) {
    army.packUnit(unit);
}
```

</API>
<API id="player.Formations.getFormationIds"><h3>player.Formations.getFormationIds()</h3>

**说明**: 获取玩家所有编队的 ID 列表。

**参数**: 无

**返回值**: `ComponentID[]`

**使用示例**:

```javascript
// 来源 TunerPanels/Units.ltp
// 遍历所有编队
const pFormations = player.Formations;
for (const formationId of pFormations.getFormationIds()) {
    const pFormation = Formations.get(formationId);
}
```

</API>
<API id="Formations.get"><h3>Formations.get(formationId)</h3>

**说明**: 根据 ID 获取编队实例。编队实例包含 `getUnitIds()` 方法。

| 参数名 | 类型 | 说明 |
|------|------|------|
| formationId | `ComponentID` | 编队 ID |

**返回值**: `Formation` | `undefined`

**使用示例**:

```javascript
// 来源 TunerPanels/Units.ltp
// 获取编队实例，遍历编队内单位
const pFormation = Formations.get(formationId);
if (pFormation) {
    for (const unitId of pFormation.getUnitIds()) {
        const pUnit = Units.get(unitId);
    }
}
```

</API>