---
title: Religion 宗教
doc_type: object-api
summary: 宗教系统全局对象，负责宗教创建、信仰查询、万神殿管理。
primary_scope:
  - Religion
related_scope:
  - city.Religion
  - GameInfo.Religions
source:
  - TunerPanels/Religion.ltp
---

# Religion 宗教

宗教系统全局对象，用于查询宗教状态、管理信仰和万神殿。引擎直接注入，无需手动 import 引入。

```javascript
// 快速示例：检查是否可以创建宗教
// 来源 Religion.ltp
if (Religion.canCreateReligion(playerId)) {
  console.log(Religion.getPantheons());
}
```

## 方法列表（共 10 个）

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Religion.get</API> | religionID | `object` | 获取宗教对象 |
| <API>Religion.getPlayerFromReligion</API> | religionID | `int` | 获取宗教所属玩家 |
| <API>Religion.isBeliefClaimable</API> | beliefID | `bool` | 信仰是否可认领 |
| <API>Religion.hasBeenFounded</API> | religionID | `bool` | 宗教是否已创立 |
| <API>Religion.hasCreatedReligion</API> | playerID | `bool` | 玩家是否已创建宗教 |
| <API>Religion.canHaveBelief</API> | playerID, beliefID | `bool` | 是否可以拥有信仰 |
| <API>Religion.getPantheons</API> | — | `array` | 获取万神殿列表 |
| <API>Religion.getReligionName</API> | religionID | `string` | 获取宗教名称 |
| <API>Religion.getReligionType</API> | religionID | `string` | 获取宗教类型 |
| <API>Religion.canCreateReligion</API> | playerID | `bool` | 是否可以创建宗教 |

## GameInfo 关联表

```javascript
GameInfo.Religions;    // 宗教定义表
```

---

<API id="Religion.get"><h3>Religion.get(religionID)</h3>

**说明**: 根据 ID 获取宗教对象。

| 参数名 | 类型 | 说明 |
|------|------|------|
| religionID | `int` | 宗教 ID |

**返回值**: `object` \| `undefined`

</API>
<API id="Religion.getPlayerFromReligion"><h3>Religion.getPlayerFromReligion(religionID)</h3>

**说明**: 获取指定宗教所属的玩家 ID。

| 参数名 | 类型 | 说明 |
|------|------|------|
| religionID | `int` | 宗教 ID |

**返回值**: `int`

</API>
<API id="Religion.isBeliefClaimable"><h3>Religion.isBeliefClaimable(beliefID)</h3>

**说明**: 检查指定信仰是否可以被认领。

| 参数名 | 类型 | 说明 |
|------|------|------|
| beliefID | `int` | 信仰 ID |

**返回值**: `bool`

</API>
<API id="Religion.hasBeenFounded"><h3>Religion.hasBeenFounded(religionID)</h3>

**说明**: 检查指定宗教是否已被创立。

| 参数名 | 类型 | 说明 |
|------|------|------|
| religionID | `int` | 宗教 ID |

**返回值**: `bool`

</API>
<API id="Religion.hasCreatedReligion"><h3>Religion.hasCreatedReligion(playerID)</h3>

**说明**: 检查玩家是否已创建过宗教。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 玩家 ID |

**返回值**: `bool`

</API>
<API id="Religion.canHaveBelief"><h3>Religion.canHaveBelief(playerID, beliefID)</h3>

**说明**: 检查玩家是否可以拥有指定信仰。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 玩家 ID |
| beliefID | `int` | 信仰 ID |

**返回值**: `bool`

</API>
<API id="Religion.getPantheons"><h3>Religion.getPantheons()</h3>

**说明**: 获取万神殿列表。

**参数**: 无

**返回值**: `array`

</API>
<API id="Religion.getReligionName"><h3>Religion.getReligionName(religionID)</h3>

**说明**: 获取指定宗教的名称。

| 参数名 | 类型 | 说明 |
|------|------|------|
| religionID | `int` | 宗教 ID |

**返回值**: `string`

</API>
<API id="Religion.getReligionType"><h3>Religion.getReligionType(religionID)</h3>

**说明**: 获取指定宗教的类型。

| 参数名 | 类型 | 说明 |
|------|------|------|
| religionID | `int` | 宗教 ID |

**返回值**: `string`

</API>
<API id="Religion.canCreateReligion"><h3>Religion.canCreateReligion(playerID)</h3>

**说明**: 检查玩家是否可以创建宗教。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 玩家 ID |

**返回值**: `bool`

</API>