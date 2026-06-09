---
title: Armies 军队
doc_type: object
summary: 军队管理全局对象，负责军队获取、指挥官管理、单位组队和战斗群编队信息。
primary_scope:
  - Armies
  - army
related_scope:
  - player.Armies
source:
  - modules/base-standard/ui/unit-flags/army-commander-flags.js
doc_update: 2026-06-09
---

# Armies 军队

军队管理全局对象，提供军队接口的获取、编队内单位的管理。引擎直接注入，无需手动 import 引入。

```javascript
// 快速示例：获取指挥官统领的军队并遍历其中所有单位
// 来源 army-commander-flags.js
if (unit.isCommanderUnit && unit.armyId) {
  const army = Armies.get(unit.armyId);
  if (army) {
    const armyUnits = army.getUnitIds();
    for (let i = 1; i < armyUnits.length; i++) {
      const armyUnit = Units.get(armyUnits[i]);
      console.log("军队内单位:", armyUnit.id);
    }
  }
}
```

## 方法列表

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Armies.get</API> | commanderId | `Army` \| `null` | 根据指挥官单位的 ComponentID (如 `unit.armyId`) 获取军队对象 |

## army 实例属性与方法

通过 `Armies.get(id)` 获取的 `army` 实例对象包含以下属性和方法：

### 属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `army.unitCount` | `int` | 军队中当前含有的单位总数（包含指挥官本身，数值为 1 时说明军队仅有指挥官一人） |
| `army.combatUnitCapacity` | `int` | 军队所能容纳的战斗单位最大上限容量 |

### 方法

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>army.getUnitIds</API> | — | `ComponentID[]` | 获取该军队所包含的全部单位 ID 列表（包含指挥官） |
| <API>army.getCommanderId</API> | — | `ComponentID` | 获取该军队的指挥官单位的 ComponentID |
| <API>army.packUnit</API> | unit | `void` | 将一个普通单位装载/打包并入该军队 |
| <API>army.regionValueDiff</API> | — | `any` | 获取该军队在区域内的战斗/移动估值差异 |
| <API>army.turnsToVictory</API> | — | `any` | 评估该军队在当前行动下达成战略目标的预估回合数 |

---

## player.Armies 子系统

用于获取和遍历玩家所拥有的所有军队集合：

```javascript
// 来源 Units.ltp 与 units.md
// 遍历玩家的所有军队
const pArmies = player.Armies;
for (const armyId of pArmies.getArmyIds()) {
  const pArmy = Armies.get(armyId);
  const commanderId = pArmy.getCommanderId();
  console.log("指挥官 ID:", commanderId);
}
```

---

<API id="Armies.get"><h3>Armies.get(commanderId)</h3>

**说明**: 根据指挥官的 ComponentID 获取军队对象。如果该指挥官没有编组军队，则返回 `null`。

| 参数名 | 类型 | 说明 |
|------|------|------|
| commanderId | `object` | 指挥官单位的 ComponentID (即 `unit.armyId`) |

**返回值**: `Army` \| `null`

**使用示例**:

```javascript
// 来源 army-commander-flags.js
// 获取军队并判断容量与实际单位数
const army = Armies.get(unit.armyId);
if (army) {
  const unitCount = army.unitCount - 1; // 扣除指挥官后的部属数量
  console.log(`当前军队编队容量: ${unitCount}/${army.combatUnitCapacity}`);
}
```

</API>
<API id="army.getUnitIds"><h3>army.getUnitIds()</h3>

**说明**: 获取军队编队里的所有单位 ComponentID 列表。通常列表中的首个元素是该军队的指挥官。

**参数**: 无

**返回值**: `ComponentID[]` — 军队中所有单位的 ID 数组

**使用示例**:

```javascript
// 来源 army-commander-flags.js
// 获取军队所有单位并查找其中的非战斗单位数量
const armyUnits = army.getUnitIds();
let numCivilians = 0;
for (let i = 1; i < armyUnits.length; i++) {
  const armyUnit = Units.get(armyUnits[i]);
  if (armyUnit) {
    const unitDef = GameInfo.Units.lookup(armyUnit.type);
    if (unitDef && unitDef.FormationClass == "FORMATION_CLASS_CIVILIAN") {
      numCivilians++;
    }
  }
}
console.log("非战斗单位数量:", numCivilians);
```

</API>
<API id="army.getCommanderId"><h3>army.getCommanderId()</h3>

**说明**: 获取该军队指挥官的唯一 ComponentID。

**参数**: 无

**返回值**: `ComponentID`

</API>
<API id="army.packUnit"><h3>army.packUnit(unit)</h3>

**说明**: 将一个指定单位合并入该军队。

| 参数名 | 类型 | 说明 |
|------|------|------|
| unit | `object` | 要并入的单位对象或 ID |

**返回值**: `void`

</API>
