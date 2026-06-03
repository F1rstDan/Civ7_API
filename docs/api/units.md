---
title: Units
---

# Units

单位管理全局对象。

```javascript
const unit = Units.get(unitID);
const unitInfo = Units.lookup(unitType);
```

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `get` | id | `Unit` | 根据 ID 获取单位对象 |
| `lookup` | type | `object` | 根据类型哈希查询单位定义 |
| `getBuildUnit` | playerID | `Unit` | 获取建造中的单位 |
| `find` | predicate | `Unit` | 查找满足条件的单位 |
| `forEach` | callback | `void` | 遍历所有单位 |
| `getUnitTypesUnlockedWithTag` | tag | `array` | 获取带指定标签的已解锁单位类型 |
| `getUnits` | playerID | `Unit[]` | 获取指定玩家的所有单位 |
| `getReachableTargets` | unitID | `array` | 获取单位可到达的目标 |
| `getPathTo` | unitID, target | `array` | 获取单位到目标的路径 |
| `create` | params | `Unit` | 创建新单位 |
| `setLocation` | unitID, location | `void` | 设置单位位置 |
## TunerPanel 补充：Units 方法（来源 Units.ltp）

| 方法 | 参数 | 返回值 | 说明 | 来源 |
|------|------|--------|------|------|
| `restoreMovement` | unitID | `void` | 恢复单位移动力 | Units.ltp |
| `changeDamage` | unitID, amount | `void` | 改变单位伤害（正值扣血，负值治疗） | Units.ltp |
| `setDamage` | unitID, amount | `void` | 设置单位伤害值 | Units.ltp |
| `changeExperience` | unitID, amount | `void` | 改变单位经验值 | Units.ltp |
| `setActivity` | unitID, activityType | `void` | 设置单位活动状态 | Units.ltp |
| `hasTag` | unitID, tag | `bool` | 检查单位是否拥有指定标签 | Units.ltp |

```javascript
// 来源 Units.ltp
let unit = Units.get(unitId);
Units.restoreMovement(unit.id);
Units.changeDamage(unit.id, 25);
Units.changeDamage(unit.id, -25);
Units.setDamage(unit.id, 0);
Units.setDamage(unit.id, unit.Health.maxDamage);
Units.changeExperience(unit.id, 500);
Units.setActivity(unit.id, UnitActivityTypes.SLEEP);
Units.hasTag(unitId, "UNIT_CLASS_SIEGE");
```

## Unit 对象子系统

| 子系统 | 说明 | 来源 |
|--------|------|------|
| `Health` | 生命值子系统 | Units.ltp |
| `Combat` | 战斗子系统 | Units.ltp |
| `Experience` | 经验子系统 | Units.ltp |
| `Religion` | 宗教子系统 | Units.ltp |

### Unit 基本属性

```javascript
let unit = Units.get(unitId);
unit.id;
unit.type;
unit.location;          // {x, y}
unit.activityType;
unit.embarkationType;
unit.isEmbarked;
unit.operationQueueSize;
unit.originalOwner;
```

### Health 子系统

```javascript
unit.Health.damage;     // 当前伤害值
unit.Health.maxDamage;  // 最大伤害值
unit.Health.isDead;     // 是否死亡
```

### Combat 子系统

```javascript
unit.Combat.attackRange; // 攻击范围
```

### Experience 子系统

```javascript
unit.Experience.canPromote;
unit.Experience.getAllPromotions(); // [{disciplineType, promotionType}]
```

### Religion 子系统

```javascript
unit.Religion.religionType;
```

### 操作队列

```javascript
for (let i = 0; i < unit.operationQueueSize; i++) {
  const opType = unit.getOperationType(i);
  const params = unit.getOperationParameters(i);
}
```

### 能力与视野

```javascript
unit.getAbilities();   // 单位能力数组
unit.getSightPlots();  // 视野地块索引数组
```

## Formations 与 Armies

```javascript
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

| 枚举 | 说明 |
|------|------|
| `UnitActivityTypes.NONE` | 无活动 |
| `UnitActivityTypes.AWAKE` | 清醒 |
| `UnitActivityTypes.SLEEP` | 睡眠 |
| `UnitActivityTypes.HEAL` | 治疗 |
| `UnitActivityTypes.SENTRY` | 警戒 |
| `UnitActivityTypes.HOLD` | 待命 |
| `UnitActivityTypes.INTERCEPT` | 拦截 |
| `UnitActivityTypes.OPERATION` | 执行操作 |

## 常用 GameInfo 表

```javascript
GameInfo.Units;
GameInfo.UnitOperations;
GameInfo.UnitPromotions;
GameInfo.UnitPromotionDisciplines;
GameInfo.UnitAbilities;
GameInfo.UnitEmbarkationTypes;
```

---

*来源：Units.ltp*
