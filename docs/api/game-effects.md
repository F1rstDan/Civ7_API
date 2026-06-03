---
title: GameEffects 效果系统
---

# GameEffects 效果系统

GameEffects 是文明7的 Modifier（修改器）和 Requirement（需求）系统的核心 API。它管理游戏中所有活动的效果、需求集和需求。

> 来源：Modifiers.ltp、Requirements.ltp

## GameEffects 全局对象 — Modifier 相关

```javascript
// 来源 Modifiers.ltp
GameEffects.getModifierCount();                    // 获取修改器总数
GameEffects.getModifiers();                        // 获取所有修改器实例数组

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

## GameEffects 全局对象 — Requirement 相关

```javascript
// 来源 Requirements.ltp
GameEffects.getRequirementCount();                 // 获取需求总数
GameEffects.getRequirementSetCount();              // 获取需求集总数
GameEffects.getRequirementSets();                  // 获取所有需求集实例

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

## Game.Modifiers 子系统

```javascript
// 来源 Player Modifiers.ltp
const gameModifiers = Game.Modifiers;
gameModifiers.getModifiers();                      // 获取所有游戏级修改器
// 每个 modifier: modifierType, collectionType, affectsYields, requiresConstructibles
gameModifiers.getModifierSubjects(modifierName);
```

## Player Modifiers 子系统

```javascript
// 来源 Player Modifiers.ltp
const playerModifiers = player.Modifiers;
playerModifiers.getModifiers();                    // 获取玩家修改器列表
// 每个 modifier: modifierType, collectionType, affectsYields, requiresConstructibles
playerModifiers.getModifierSubjects(modifierName);
```

## City Modifiers 子系统

```javascript
// 来源 Player Modifiers.ltp
const cityModifiers = city.Modifiers;
cityModifiers.getModifiers();                      // 获取城市修改器列表
cityModifiers.getModifierSubjects(modifierName);
```

## GameInfo 关联表

```javascript
GameInfo.Modifiers;           // 修改器定义表
GameInfo.DynamicModifiers;    // 动态修改器表（含 CollectionType, EffectType）
GameInfo.Types;               // 通用类型表
```

---

*来源：Modifiers.ltp、Requirements.ltp、Player Modifiers.ltp*