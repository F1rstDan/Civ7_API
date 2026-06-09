---
title: Constructibles 可建造物
doc_type: object
summary: 可建造物管理全局对象，负责地块改良设施、建筑、奇观的查询、状态获取以及损毁状态修改。
primary_scope:
  - Constructibles
  - constructible
related_scope:
  - player.Constructibles
  - GameInfo.Constructibles
source:
  - modules/base-standard/ui/lenses/layer/discovery-layer.ts
  - modules/base-standard/ui/place-building/model-place-building-v2.js
  - modules/base-standard/ui/production-chooser/production-chooser-helpers.js
doc_update: 2026-06-09
---

# Constructibles 可建造物

可建造物管理全局对象，提供可建造物（如改良设施、建筑、奇观等）的获取、状态设定。引擎直接注入，无需手动 import 引入。

```javascript
// 快速示例：获取可建造物并判断是否是探索发现物（如 Wilderness 探索点）
// 来源 discovery-layer.ts
const constructible = Constructibles.getByComponentID(constructibleID);
if (constructible) {
  const constructibleInfo = GameInfo.Constructibles.lookup(constructible.type);
  if (constructibleInfo && constructibleInfo.Discovery) {
    console.log("这是一个可探索的发现点:", constructibleInfo.ConstructibleType);
  }
}
```

## 方法列表

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Constructibles.getByComponentID</API> | id | `Constructible` \| `null` | 根据 ComponentID 获取可建造物对象 |
| <API>Constructibles.get</API> | selectedBuilding | `Constructible` | 获取指定类型的可建造物实例 |
| <API>Constructibles.setDamaged</API> | id, isDamaged | `void` | 设定指定可建造物组件的损毁状态 |

## constructible 实例属性与方法

通过 `Constructibles.getByComponentID(id)` 或 `Constructibles.get(id)` 获取的 `constructible` 实例对象包含以下属性和方法：

### 属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `constructible.id` | `object` | 唯一 ComponentID |
| `constructible.type` | `int` | 可建造物类型哈希值，对应 `GameInfo.Constructibles.lookup(type)` |
| `constructible.location` | `object` | 可建造物当前地块坐标 `{x, y}` |
| `constructible.Name` | `string` | 可建造物的内部本地化名称键（如 `"LOC_BUILDING_MONUMENT"`） |
| `constructible.ConstructibleClass` | `string` | 可建造物类别等级（例如 `"BUILDING"`, `"IMPROVEMENT"`, `"WONDER"` 等） |
| `constructible.complete` | `bool` | 是否已完全建造完毕 |
| `constructible.damaged` | `bool` | 是否处于被掠夺/损毁状态 |
| `constructible.placements` | `array` | 放置关系列表，记录与玩家和地块的级联 |
| `constructible.maintenanceMap` | `object` | 维护费用与资源映射数据 |
| `constructible.yieldMap` | `object` | 产出映射数据 |
| `constructible.cityId` | `object` | 所属城市的 ComponentID |
| `constructible.isUniqueQuarter` | `bool` | 是否为独特城区的可建造物 |

### 方法

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>constructible.get</API> | Type | `any` | 获取特定类型的配置数据 |
| <API>constructible.set</API> | Type, tagSet | `void` | 设置特定类型的属性与标签 |
| <API>constructible.has</API> | tag | `bool` | 检查可建造物是否拥有指定标签 |

---

## player.Constructibles 子系统

用于遍历或管理特定玩家拥有的可建造物集合：

```javascript
// 来源 production-chooser-helpers.js
// 获取玩家的 Constructibles 子系统实例
const playerConstructibles = Players.Constructibles.get(playerId);
```

---

## GameInfo 关联表

```javascript
GameInfo.Constructibles;   // 城区建筑/地块改良设施/奇观等所有可建造物的静态定义表
```

---

<API id="Constructibles.getByComponentID"><h3>Constructibles.getByComponentID(id)</h3>

**说明**: 根据组件的 ComponentID 获取可建造物对象。如果不存在或未加载，返回 `null`。

| 参数名 | 类型 | 说明 |
|------|------|------|
| id | `object` | 组件的 ComponentID 对象，包含 `owner` 和 `id` 等字段 |

**返回值**: `Constructible` \| `null`

**使用示例**:

```javascript
// 来源 discovery-layer.ts
// 获取地块上的发现点可建造物并查询配置
const constructible = Constructibles.getByComponentID(constructibleID);
if (constructible) {
  console.log("可建造物位置:", constructible.location.x, constructible.location.y);
  console.log("是否已损毁:", constructible.damaged);
}
```

</API>
<API id="Constructibles.get"><h3>Constructibles.get(selectedBuilding)</h3>

**说明**: 获取指定类型可建造物对象的方法。

| 参数名 | 类型 | 说明 |
|------|------|------|
| selectedBuilding | `any` | 选择的可建造物描述或 ID |

**返回值**: `Constructible`

</API>
<API id="Constructibles.setDamaged"><h3>Constructibles.setDamaged(id, isDamaged)</h3>

**说明**: 强制设置指定可建造物组件的受损/被掠夺状态。

| 参数名 | 类型 | 说明 |
|------|------|------|
| id | `object` | 可建造物 ComponentID |
| isDamaged | `bool` | 是否设置损毁状态 |

**返回值**: `void`

</API>
