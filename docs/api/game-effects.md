---
title: GameEffects 效果系统
doc_type: system
summary: GameEffects 是 Modifier（修改器）和 Requirement（需求）系统的核心 API，管理游戏中所有活动的效果、需求集和需求。
primary_scope:
  - GameEffects
  - Game.Modifiers
  - player.Modifiers
  - city.Modifiers
related_scope:
  - GameInfo.Modifiers
  - GameInfo.DynamicModifiers
  - GameInfo.Types
source:
  - TunerPanels/Modifiers.ltp
  - TunerPanels/Requirements.ltp
  - TunerPanels/Player Modifiers.ltp
doc_update: 2026-06-06
---

# GameEffects 效果系统

GameEffects 是文明7的 Modifier（修改器）和 Requirement（需求）系统的核心 API。

## 核心概念

**Modifier（修改器）**：游戏中的效果单元，每个 Modifier 代表一个正在生效或待生效的修改效果（如地块产出加成、单位战斗力提升等）。每个 Modifier 包含：
- 所有者（Owner）：应用该修改器的对象 ID
- 主题列表（Subjects）：受该修改器影响的对象列表
- 修改器定义（Definition）：指向 `GameInfo.Modifiers` 表中的定义数据，包含 `ownerRequirementSetID`（所有者需求集）、`subjectRequirementSetID`（主题需求集）、`isRunOnce`、`isPermanent`、`isNewOnly` 等属性

**Requirement（需求）**：决定 Modifier 是否生效的条件检查。每个 Requirement 是一个布尔条件，包含：
- 主题（Subject）：被检查的对象
- 上下文（Context）：可选的参考对象
- 需求定义（Definition）：指向 `GameInfo.Requirements` 表中的定义，指定检查逻辑（如"是否是城市"、"是否在海岸"等）

**RequirementSet（需求集）**：一组 Requirement 的集合，用于组合多个条件。Modifier 的 `ownerRequirementSetID` 和 `subjectRequirementSetID` 分别指向两个需求集，只有满足所有者需求集和主题需求集，Modifier 才会生效。需求集也可嵌套，一个 Requirement 内部可以包含子需求集（`getRequirementInnerRequirementSets`）。

**关系总结**：`RequirementSet` 包含多个 `Requirement`，每个 `Requirement` 检查一个布尔条件；`Modifier` 引用 `RequirementSet` 作为生效条件，当条件满足时 Modifier 变为 Active 状态并施加效果。`Game.Modifiers`、`player.Modifiers`、`city.Modifiers` 是不同层级的修改器子系统，分别管理游戏级、玩家级、城市级的修改器。

```javascript
// 来源 Modifiers.ltp
// 查询修改器信息
const count = GameEffects.getModifierCount();
const modifiers = GameEffects.getModifiers();
for (const modifier of modifiers) {
  const definition = GameEffects.getModifierDefinition(modifier);
  const owner = GameEffects.getModifierOwner(modifier);
  console.log(definition.ID, owner);
}
```

## 方法列表（共 29 个）

### GameEffects — Modifier 相关

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>GameEffects.getModifierCount</API> | — | `int` | 获取修改器总数 |
| <API>GameEffects.getModifiers</API> | — | `array` | 获取所有修改器实例数组 |
| <API>GameEffects.getModifierDefinition</API> | modifierInstanceId | `object` | 获取修改器定义 |
| <API>GameEffects.getModifierOwner</API> | modifierInstanceId | `int` | 获取修改器所有者 ID |
| <API>GameEffects.getModifierSubjectCount</API> | modifierInstanceId | `int` | 获取修改器主题数量 |
| <API>GameEffects.getModifierTrackedObjectCount</API> | modifierInstanceId | `int` | 获取修改器跟踪对象数量 |
| <API>GameEffects.getModifierActive</API> | modifierInstanceId | `bool` | 获取修改器是否活动 |
| <API>GameEffects.getModifierSubjects</API> | modifierInstanceId | `array` | 获取修改器主题列表 |
| <API>GameEffects.getModifierTrackedObjects</API> | modifierInstanceId | `array` | 获取修改器跟踪对象 |
| <API>GameEffects.getModifierDefinitionFromTypeId</API> | typeId | `object` | 从类型 ID 获取修改器定义 |
| <API>GameEffects.getCollectionNameFromTypeId</API> | collectionTypeId | `string` | 从类型 ID 获取集合名称 |
| <API>GameEffects.getObjectType</API> | objectId | `int` | 获取对象类型 |
| <API>GameEffects.getObjectName</API> | objectId | `string` | 获取对象名称 |
| <API>GameEffects.getObjectString</API> | objectId | `string` | 获取对象字符串 |

### GameEffects — Requirement 相关

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>GameEffects.getRequirementCount</API> | — | `int` | 获取需求总数 |
| <API>GameEffects.getRequirementSetCount</API> | — | `int` | 获取需求集总数 |
| <API>GameEffects.getRequirementSets</API> | — | `array` | 获取所有需求集实例 |
| <API>GameEffects.getRequirementSetConstInfo</API> | instanceId | `object` | 获取需求集常量信息 |
| <API>GameEffects.getRequirementSetDynamicInfo</API> | instanceId | `object` | 获取需求集动态信息 |
| <API>GameEffects.getRequirementId</API> | instanceId | `int` | 获取需求 ID |
| <API>GameEffects.getRequirementConstInfo</API> | instanceId | `object` | 获取需求常量信息 |
| <API>GameEffects.getRequirementState</API> | instanceId | `bool` | 获取需求状态 |
| <API>GameEffects.getRequirementInnerRequirements</API> | requirementInstanceId | `array` | 获取内部需求 |
| <API>GameEffects.getRequirementInnerRequirementSets</API> | requirementInstanceId | `array` | 获取内部需求集 |
| <API>GameEffects.getRequirementSubject</API> | instanceId | `object` | 获取需求主题 |
| <API>GameEffects.getRequirementContext</API> | instanceId | `object` | 获取需求上下文 |
| <API>GameEffects.getRequirementSetSubject</API> | instanceId | `object` | 获取需求集主题 |
| <API>GameEffects.getRequirementSetContext</API> | instanceId | `object` | 获取需求集上下文 |

### Game.Modifiers 子系统

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Game.Modifiers.getModifiers</API> | — | `array` | 获取所有游戏级修改器 |
| <API>Game.Modifiers.getModifierSubjects</API> | modifierName | `array` | 获取修改器主题列表 |

### player.Modifiers 子系统

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>player.Modifiers.getModifiers</API> | — | `array` | 获取玩家修改器列表 |
| <API>player.Modifiers.getModifierSubjects</API> | modifierName | `array` | 获取修改器主题列表 |

### city.Modifiers 子系统

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>city.Modifiers.getModifiers</API> | — | `array` | 获取城市修改器列表 |
| <API>city.Modifiers.getModifierSubjects</API> | modifierName | `array` | 获取修改器主题列表 |

## Modifier 详情

```javascript
// 来源 Modifiers.ltp
// 获取修改器总数
GameEffects.getModifierCount();
GameEffects.getModifiers();

// 获取修改器定义
let definition = GameEffects.getModifierDefinition(modifierInstanceId);
// definition.ID — 修改器定义 ID
// definition.ownerRequirementSetID
// definition.subjectRequirementSetID
// definition.isRunOnce
// definition.isPermanent
// definition.isNewOnly

// 获取修改器所有者
let ownerID = GameEffects.getModifierOwner(modifierInstanceId);
let ownerName = Locale.compose(GameEffects.getObjectName(ownerID));

// 获取修改器主题数量
GameEffects.getModifierSubjectCount(modifierInstanceId);
GameEffects.getModifierTrackedObjectCount(modifierInstanceId);

// 获取修改器活动状态
GameEffects.getModifierActive(modifierInstanceId);

// 获取修改器主题列表
let subjects = GameEffects.getModifierSubjects(modifierInstanceId);
// 每个 subject 包含: owner, id, type

// 获取跟踪对象
let objects = GameEffects.getModifierTrackedObjects(modifierInstanceId);

// 从类型 ID 获取信息
GameEffects.getModifierDefinitionFromTypeId(typeId);
GameEffects.getCollectionNameFromTypeId(collectionTypeId);
```

## Requirement 详情

```javascript
// 来源 Requirements.ltp
// 获取需求统计
GameEffects.getRequirementCount();
GameEffects.getRequirementSetCount();
GameEffects.getRequirementSets();

// 需求集信息
let info = GameEffects.getRequirementSetConstInfo(instanceId);
// info.definition.ID
// info.requirements — 需求实例数组
// info.subjectID, info.subjectType, info.subjectName
// info.contextID, info.contextType, info.contextName

let dyinfo = GameEffects.getRequirementSetDynamicInfo(instanceId);
// dyinfo.state
// dyinfo.refCount

// 需求信息
GameEffects.getRequirementId(instanceId);
GameEffects.getRequirementConstInfo(instanceId);
GameEffects.getRequirementState(instanceId);

// 内部需求
GameEffects.getRequirementInnerRequirements(requirementInstanceId);
GameEffects.getRequirementInnerRequirementSets(requirementInstanceId);

// 对象信息
GameEffects.getObjectType(objectId);
GameEffects.getObjectName(objectId);
GameEffects.getObjectString(objectId);

// 需求主题/上下文
GameEffects.getRequirementSubject(instanceId);
GameEffects.getRequirementContext(instanceId);
GameEffects.getRequirementSetSubject(instanceId);
GameEffects.getRequirementSetContext(instanceId);
```

## Game.Modifiers 详情

```javascript
// 来源 Player Modifiers.ltp
// 获取游戏级修改器
const gameModifiers = Game.Modifiers;
gameModifiers.getModifiers();
// 每个 modifier: modifierType, collectionType, affectsYields, requiresConstructibles
gameModifiers.getModifierSubjects(modifierName);
```

## Player Modifiers 详情

```javascript
// 来源 Player Modifiers.ltp
// 获取玩家修改器
const playerModifiers = player.Modifiers;
playerModifiers.getModifiers();
// 每个 modifier: modifierType, collectionType, affectsYields, requiresConstructibles
playerModifiers.getModifierSubjects(modifierName);
```

## City Modifiers 详情

```javascript
// 来源 Player Modifiers.ltp
// 获取城市修改器
const cityModifiers = city.Modifiers;
cityModifiers.getModifiers();
cityModifiers.getModifierSubjects(modifierName);
```

## GameInfo 关联表

```javascript
// 来源 Modifiers.ltp
// 修改器相关数据表
GameInfo.Modifiers;           // 修改器定义表
GameInfo.DynamicModifiers;    // 动态修改器表（含 CollectionType, EffectType）
GameInfo.Types;               // 通用类型表
```

---

<API id="GameEffects.getModifierCount"><h3>GameEffects.getModifierCount()</h3>

**说明**: 获取当前游戏中的修改器总数。

**参数**: 无

**返回值**: `int`

**使用示例**:

```javascript
// 来源 Modifiers.ltp
// 获取激活的修改器总数
const count = GameEffects.getModifierCount();
console.log(`当前共有 ${count} 个修改器`);
```

</API>
<API id="GameEffects.getModifiers"><h3>GameEffects.getModifiers()</h3>

**说明**: 获取所有修改器实例数组。

**参数**: 无

**返回值**: `array`

**使用示例**:

```javascript
// 来源 Modifiers.ltp
// 遍历所有修改器
const modifiers = GameEffects.getModifiers();
for (const modifier of modifiers) {
  const definition = GameEffects.getModifierDefinition(modifier);
  console.log(definition.ID);
}
```

</API>
<API id="GameEffects.getModifierDefinition"><h3>GameEffects.getModifierDefinition(modifierInstanceId)</h3>

**说明**: 获取指定修改器实例的定义。返回对象包含 `ID`、`ownerRequirementSetID`、`subjectRequirementSetID`、`isRunOnce`、`isPermanent`、`isNewOnly` 等属性。

| 参数名 | 类型 | 说明 |
|------|------|------|
| modifierInstanceId | `int` | 修改器实例 ID |

**返回值**: `object`

**使用示例**:

```javascript
// 来源 Modifiers.ltp
// 获取修改器定义并检查属性
const definition = GameEffects.getModifierDefinition(modifierInstanceId);
console.log(definition.ID);               // 修改器定义 ID
console.log(definition.isRunOnce);         // 是否只运行一次
console.log(definition.isPermanent);       // 是否永久
```

</API>
<API id="GameEffects.getModifierOwner"><h3>GameEffects.getModifierOwner(modifierInstanceId)</h3>

**说明**: 获取修改器的所有者对象 ID。

| 参数名 | 类型 | 说明 |
|------|------|------|
| modifierInstanceId | `int` | 修改器实例 ID |

**返回值**: `int`

**使用示例**:

```javascript
// 来源 Modifiers.ltp
// 获取修改器所有者
const ownerID = GameEffects.getModifierOwner(modifierInstanceId);
const ownerName = Locale.compose(GameEffects.getObjectName(ownerID));
```

</API>
<API id="GameEffects.getModifierSubjectCount"><h3>GameEffects.getModifierSubjectCount(modifierInstanceId)</h3>

**说明**: 获取指定修改器的主题数量。

| 参数名 | 类型 | 说明 |
|------|------|------|
| modifierInstanceId | `int` | 修改器实例 ID |

**返回值**: `int`

**使用示例**:

```javascript
// 来源 Modifiers.ltp
// 获取修改器的主题数量和跟踪对象数量
const subjectCount = GameEffects.getModifierSubjectCount(modifierInstanceId);
const trackedCount = GameEffects.getModifierTrackedObjectCount(modifierInstanceId);
console.log(`主题: ${subjectCount}, 跟踪: ${trackedCount}`);
```

</API>
<API id="GameEffects.getModifierTrackedObjectCount"><h3>GameEffects.getModifierTrackedObjectCount(modifierInstanceId)</h3>

**说明**: 获取指定修改器跟踪的对象数量。

| 参数名 | 类型 | 说明 |
|------|------|------|
| modifierInstanceId | `int` | 修改器实例 ID |

**返回值**: `int`

**使用示例**:

```javascript
// 来源 Modifiers.ltp
// 获取修改器跟踪的对象数量
const trackedCount = GameEffects.getModifierTrackedObjectCount(modifierInstanceId);
```

</API>
<API id="GameEffects.getModifierActive"><h3>GameEffects.getModifierActive(modifierInstanceId)</h3>

**说明**: 获取指定修改器是否处于活动状态。

| 参数名 | 类型 | 说明 |
|------|------|------|
| modifierInstanceId | `int` | 修改器实例 ID |

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 Modifiers.ltp
// 检查修改器是否处于活动状态
const isActive = GameEffects.getModifierActive(modifierInstanceId);
console.log(`修改器 ${modifierInstanceId} 活动状态: ${isActive}`);
```

</API>
<API id="GameEffects.getModifierSubjects"><h3>GameEffects.getModifierSubjects(modifierInstanceId)</h3>

**说明**: 获取指定修改器的主题列表。每个主题包含 `owner`、`id`、`type` 属性。

| 参数名 | 类型 | 说明 |
|------|------|------|
| modifierInstanceId | `int` | 修改器实例 ID |

**返回值**: `array`

**使用示例**:

```javascript
// 来源 Modifiers.ltp
// 获取修改器主题列表和跟踪对象
const subjects = GameEffects.getModifierSubjects(modifierInstanceId);
const objects = GameEffects.getModifierTrackedObjects(modifierInstanceId);
objects.forEach((obj) => {
  const name = Locale.compose(GameEffects.getObjectName(obj));
  const isMet = subjects.includes(obj) ? "Met" : "Not Met";
  console.log(`${name}: ${isMet}`);
});
```

</API>
<API id="GameEffects.getModifierTrackedObjects"><h3>GameEffects.getModifierTrackedObjects(modifierInstanceId)</h3>

**说明**: 获取指定修改器跟踪的对象列表。

| 参数名 | 类型 | 说明 |
|------|------|------|
| modifierInstanceId | `int` | 修改器实例 ID |

**返回值**: `array`

**使用示例**:

```javascript
// 来源 Modifiers.ltp
// 遍历修改器跟踪的所有对象
const objects = GameEffects.getModifierTrackedObjects(modifierInstanceId);
for (const obj of objects) {
  const name = GameEffects.getObjectString(obj);
  console.log(name);
}
```

</API>
<API id="GameEffects.getModifierDefinitionFromTypeId"><h3>GameEffects.getModifierDefinitionFromTypeId(typeId)</h3>

**说明**: 从类型 ID 获取修改器定义。

| 参数名 | 类型 | 说明 |
|------|------|------|
| typeId | `int` | 类型 ID |

**返回值**: `object`

**使用示例**:

```javascript
// 来源 Player Modifiers.ltp
// 从 modifier 的 modifierType 获取修改器定义
const definition = GameEffects.getModifierDefinitionFromTypeId(modifier.modifierType);
const collectionName = GameEffects.getCollectionNameFromTypeId(modifier.collectionType);
```

</API>
<API id="GameEffects.getCollectionNameFromTypeId"><h3>GameEffects.getCollectionNameFromTypeId(collectionTypeId)</h3>

**说明**: 从集合类型 ID 获取集合名称。

| 参数名 | 类型 | 说明 |
|------|------|------|
| collectionTypeId | `int` | 集合类型 ID |

**返回值**: `string`

**使用示例**:

```javascript
// 来源 Player Modifiers.ltp
// 获取修改器的集合类型名称
const collectionName = GameEffects.getCollectionNameFromTypeId(modifier.collectionType);
```

</API>
<API id="GameEffects.getObjectType"><h3>GameEffects.getObjectType(objectId)</h3>

**说明**: 获取指定对象的类型标识。

| 参数名 | 类型 | 说明 |
|------|------|------|
| objectId | `int` | 对象 ID |

**返回值**: `int`

**使用示例**:

```javascript
// 来源 Modifiers.ltp
// 获取对象的类型和名称
const type = Locale.compose(GameEffects.getObjectType(objectId));
const name = Locale.compose(GameEffects.getObjectName(objectId));
```

</API>
<API id="GameEffects.getObjectName"><h3>GameEffects.getObjectName(objectId)</h3>

**说明**: 获取指定对象的名称（本地化键）。

| 参数名 | 类型 | 说明 |
|------|------|------|
| objectId | `int` | 对象 ID |

**返回值**: `string`

**使用示例**:

```javascript
// 来源 Modifiers.ltp
// 获取对象名称
const name = Locale.compose(GameEffects.getObjectName(ownerID));
```

</API>
<API id="GameEffects.getObjectString"><h3>GameEffects.getObjectString(objectId)</h3>

**说明**: 获取指定对象的字符串表示。

| 参数名 | 类型 | 说明 |
|------|------|------|
| objectId | `int` | 对象 ID |

**返回值**: `string`

**使用示例**:

```javascript
// 来源 Modifiers.ltp
// 获取对象的字符串表示
const str = GameEffects.getObjectString(ownerID);
```

</API>
<API id="GameEffects.getRequirementCount"><h3>GameEffects.getRequirementCount()</h3>

**说明**: 获取当前游戏中的需求总数。

**参数**: 无

**返回值**: `int`

**使用示例**:

```javascript
// 来源 Requirements.ltp
// 获取需求和需求集总数
const reqCount = GameEffects.getRequirementCount();
const reqSetCount = GameEffects.getRequirementSetCount();
console.log(`需求: ${reqCount}, 需求集: ${reqSetCount}`);
```

</API>
<API id="GameEffects.getRequirementSetCount"><h3>GameEffects.getRequirementSetCount()</h3>

**说明**: 获取当前游戏中的需求集总数。

**参数**: 无

**返回值**: `int`

**使用示例**:

```javascript
// 来源 Requirements.ltp
// 获取需求集总数
const count = GameEffects.getRequirementSetCount();
```

</API>
<API id="GameEffects.getRequirementSets"><h3>GameEffects.getRequirementSets()</h3>

**说明**: 获取所有需求集实例数组。

**参数**: 无

**返回值**: `array`

**使用示例**:

```javascript
// 来源 Requirements.ltp
// 遍历所有需求集
const requirementSets = GameEffects.getRequirementSets();
for (const r of requirementSets) {
  const info = GameEffects.getRequirementSetConstInfo(r);
  console.log(info.definition.ID);
}
```

</API>
<API id="GameEffects.getRequirementSetConstInfo"><h3>GameEffects.getRequirementSetConstInfo(instanceId)</h3>

**说明**: 获取指定需求集实例的常量信息。返回对象包含 `definition.ID`、`requirements`（需求实例数组）、`subjectID`、`subjectType`、`subjectName`、`contextID`、`contextType`、`contextName` 等。

| 参数名 | 类型 | 说明 |
|------|------|------|
| instanceId | `int` | 需求集实例 ID |

**返回值**: `object`

**使用示例**:

```javascript
// 来源 Requirements.ltp
// 获取需求集常量信息和动态信息
const info = GameEffects.getRequirementSetConstInfo(instanceId);
const dyinfo = GameEffects.getRequirementSetDynamicInfo(instanceId);
console.log(info.definition.ID, dyinfo.state);
```

</API>
<API id="GameEffects.getRequirementSetDynamicInfo"><h3>GameEffects.getRequirementSetDynamicInfo(instanceId)</h3>

**说明**: 获取指定需求集实例的动态信息。返回对象包含 `state`、`refCount` 等。

| 参数名 | 类型 | 说明 |
|------|------|------|
| instanceId | `int` | 需求集实例 ID |

**返回值**: `object`

**使用示例**:

```javascript
// 来源 Requirements.ltp
// 获取需求集动态信息
const dyinfo = GameEffects.getRequirementSetDynamicInfo(instanceId);
console.log(`状态: ${dyinfo.state}, 引用计数: ${dyinfo.refCount}`);
```

</API>
<API id="GameEffects.getRequirementId"><h3>GameEffects.getRequirementId(instanceId)</h3>

**说明**: 获取指定需求实例的 ID。

| 参数名 | 类型 | 说明 |
|------|------|------|
| instanceId | `int` | 需求实例 ID |

**返回值**: `int`

**使用示例**:

```javascript
// 来源 Requirements.ltp
// 获取需求实例的 ID
const reqId = GameEffects.getRequirementId(instanceId);
```

</API>
<API id="GameEffects.getRequirementConstInfo"><h3>GameEffects.getRequirementConstInfo(instanceId)</h3>

**说明**: 获取指定需求实例的常量信息。

| 参数名 | 类型 | 说明 |
|------|------|------|
| instanceId | `int` | 需求实例 ID |

**返回值**: `object`

**使用示例**:

```javascript
// 来源 Requirements.ltp
// 获取需求实例常量信息
const info = GameEffects.getRequirementConstInfo(instanceId);
console.log(info.definition.ID);
```

</API>
<API id="GameEffects.getRequirementState"><h3>GameEffects.getRequirementState(instanceId)</h3>

**说明**: 获取指定需求实例的状态（是否满足条件）。

| 参数名 | 类型 | 说明 |
|------|------|------|
| instanceId | `int` | 需求实例 ID |

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 Requirements.ltp
// 检查需求是否满足
const isMet = GameEffects.getRequirementState(reqInst);
console.log(`需求 ${reqInst} 满足: ${isMet}`);
```

</API>
<API id="GameEffects.getRequirementInnerRequirements"><h3>GameEffects.getRequirementInnerRequirements(requirementInstanceId)</h3>

**说明**: 获取指定需求实例的内部需求列表。

| 参数名 | 类型 | 说明 |
|------|------|------|
| requirementInstanceId | `int` | 需求实例 ID |

**返回值**: `array`

**使用示例**:

```javascript
// 来源 Requirements.ltp
// 遍历需求的内部子需求
const reqs = GameEffects.getRequirementInnerRequirements(requirementInstanceId);
for (const r of reqs) {
  const id = GameEffects.getRequirementId(r);
  const subject = GameEffects.getRequirementSubject(r);
  const context = GameEffects.getRequirementContext(r);
  console.log(id, subject, context);
}
```

</API>
<API id="GameEffects.getRequirementInnerRequirementSets"><h3>GameEffects.getRequirementInnerRequirementSets(requirementInstanceId)</h3>

**说明**: 获取指定需求实例的内部需求集列表。

| 参数名 | 类型 | 说明 |
|------|------|------|
| requirementInstanceId | `int` | 需求实例 ID |

**返回值**: `array`

**使用示例**:

```javascript
// 来源 Requirements.ltp
// 遍历需求的内部子需求集
const reqSets = GameEffects.getRequirementInnerRequirementSets(requirementInstanceId);
for (const r of reqSets) {
  const subject = GameEffects.getRequirementSetSubject(r);
  const context = GameEffects.getRequirementSetContext(r);
  console.log(subject, context);
}
```

</API>
<API id="GameEffects.getRequirementSubject"><h3>GameEffects.getRequirementSubject(instanceId)</h3>

**说明**: 获取指定需求实例的主题对象。

| 参数名 | 类型 | 说明 |
|------|------|------|
| instanceId | `int` | 需求实例 ID |

**返回值**: `object`

**使用示例**:

```javascript
// 来源 Requirements.ltp
// 获取需求实例的主题和上下文
const subject = GameEffects.getRequirementSubject(instanceId);
const context = GameEffects.getRequirementContext(instanceId);
const subjectName = Locale.compose(GameEffects.getObjectName(subject));
const contextName = Locale.compose(GameEffects.getObjectName(context));
```

</API>
<API id="GameEffects.getRequirementContext"><h3>GameEffects.getRequirementContext(instanceId)</h3>

**说明**: 获取指定需求实例的上下文对象。

| 参数名 | 类型 | 说明 |
|------|------|------|
| instanceId | `int` | 需求实例 ID |

**返回值**: `object`

**使用示例**:

```javascript
// 来源 Requirements.ltp
// 获取需求实例的上下文
const context = GameEffects.getRequirementContext(instanceId);
const contextName = Locale.compose(GameEffects.getObjectName(context));
```

</API>
<API id="GameEffects.getRequirementSetSubject"><h3>GameEffects.getRequirementSetSubject(instanceId)</h3>

**说明**: 获取指定需求集实例的主题对象。

| 参数名 | 类型 | 说明 |
|------|------|------|
| instanceId | `int` | 需求集实例 ID |

**返回值**: `object`

**使用示例**:

```javascript
// 来源 Requirements.ltp
// 获取需求集的主题和上下文
const subject = GameEffects.getRequirementSetSubject(instanceId);
const context = GameEffects.getRequirementSetContext(instanceId);
const subjectName = Locale.compose(GameEffects.getObjectName(subject));
```

</API>
<API id="GameEffects.getRequirementSetContext"><h3>GameEffects.getRequirementSetContext(instanceId)</h3>

**说明**: 获取指定需求集实例的上下文对象。

| 参数名 | 类型 | 说明 |
|------|------|------|
| instanceId | `int` | 需求集实例 ID |

**返回值**: `object`

**使用示例**:

```javascript
// 来源 Requirements.ltp
// 获取需求集的上下文
const context = GameEffects.getRequirementSetContext(instanceId);
const contextName = Locale.compose(GameEffects.getObjectName(context));
```

</API>
<API id="Game.Modifiers.getModifiers"><h3>Game.Modifiers.getModifiers()</h3>

**说明**: 获取所有游戏级修改器列表。每个修改器包含 `modifierType`、`collectionType`、`affectsYields`、`requiresConstructibles` 等属性。

**参数**: 无

**返回值**: `array`

**使用示例**:

```javascript
// 来源 Player Modifiers.ltp
// 获取游戏级修改器
const gameModifiers = Game.Modifiers;
const modifiers = gameModifiers.getModifiers();
for (const modifier of modifiers) {
  console.log(modifier.modifierType, modifier.collectionType);
}
```

</API>
<API id="Game.Modifiers.getModifierSubjects"><h3>Game.Modifiers.getModifierSubjects(modifierName)</h3>

**说明**: 获取指定游戏级修改器的主题列表。

| 参数名 | 类型 | 说明 |
|------|------|------|
| modifierName | `string` | 修改器名称 |

**返回值**: `array`

**使用示例**:

```javascript
// 来源 Player Modifiers.ltp
// 获取游戏级修改器的主题列表
const subjects = Game.Modifiers.getModifierSubjects(modifierName);
```

</API>
<API id="player.Modifiers.getModifiers"><h3>player.Modifiers.getModifiers()</h3>

**说明**: 获取当前玩家的修改器列表。每个修改器包含 `modifierType`、`collectionType`、`affectsYields`、`requiresConstructibles` 等属性。

**参数**: 无

**返回值**: `array`

**使用示例**:

```javascript
// 来源 Player Modifiers.ltp
// 获取玩家修改器
const playerModifiers = player.Modifiers;
const modifiers = playerModifiers.getModifiers();
for (const modifier of modifiers) {
  console.log(modifier.modifierType);
}
```

</API>
<API id="player.Modifiers.getModifierSubjects"><h3>player.Modifiers.getModifierSubjects(modifierName)</h3>

**说明**: 获取指定玩家修改器的主题列表。

| 参数名 | 类型 | 说明 |
|------|------|------|
| modifierName | `string` | 修改器名称 |

**返回值**: `array`

**使用示例**:

```javascript
// 来源 Player Modifiers.ltp
// 获取玩家修改器的主题列表
const subjects = player.Modifiers.getModifierSubjects(modifierName);
```

</API>
<API id="city.Modifiers.getModifiers"><h3>city.Modifiers.getModifiers()</h3>

**说明**: 获取当前城市的修改器列表。

**参数**: 无

**返回值**: `array`

**使用示例**:

```javascript
// 来源 Player Modifiers.ltp
// 获取城市修改器
const cityModifiers = city.Modifiers;
const modifiers = cityModifiers.getModifiers();
```

</API>
<API id="city.Modifiers.getModifierSubjects"><h3>city.Modifiers.getModifierSubjects(modifierName)</h3>

**说明**: 获取指定城市修改器的主题列表。

| 参数名 | 类型 | 说明 |
|------|------|------|
| modifierName | `string` | 修改器名称 |

**返回值**: `array`

**使用示例**:

```javascript
// 来源 Player Modifiers.ltp
// 获取城市修改器的主题列表
const subjects = city.Modifiers.getModifierSubjects(modifierName);
```

</API>