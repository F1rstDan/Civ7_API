---
title: Religion 宗教
doc_type: system
summary: 宗教系统全局对象，负责宗教创建、信仰查询、万神殿管理。
primary_scope:
  - Game.Religion
  - player.Religion
  - city.Religion
related_scope:
  - GameInfo.Religions
source:
  - modules/base-standard/ui/panel-belief-picker/panel-belief-picker.js
  - modules/base-standard/ui/panel-religion-picker/panel-religion-picker.js
  - modules/base-standard/ui/sub-system-dock/panel-sub-system-dock.js
  - modules/base-standard/ui/pantheon-chooser/panel-religion-chooser.js
doc_update: 2026-06-05
---

# Religion 宗教

宗教系统全局对象，通过 `Game.Religion` 访问，用于查询宗教状态、管理信仰和万神殿。引擎直接注入，无需手动 import 引入。

```javascript
// 快速示例：检查是否可以创建宗教
// 来源 panel-sub-system-dock.js
// 检查玩家是否可以创建宗教，决定打开哪个面板
if (player.Religion.canCreateReligion() && !player.Religion.hasCreatedReligion()) {
  // 打开宗教选择面板
} else {
  // 打开信仰查看面板
}
```

## 全局方法（Game.Religion）

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Game.Religion.canHaveBelief</API> | playerID, beliefID | `bool` | 是否可以拥有信仰 |
| <API>Game.Religion.getPlayerFromReligion</API> | religionType | `int` | 获取宗教所属玩家 |
| <API>Game.Religion.hasBeenFounded</API> | religionType | `bool` | 宗教是否已创立 |
| <API>Game.Religion.isBeliefClaimable</API> | beliefType | `bool` | 信仰是否可认领 |

## 玩家宗教实例（player.Religion）

```javascript
// 快速示例：获取玩家宗教实例
// 来源 panel-belief-picker.js
// 通过 player.Religion 获取玩家宗教子系统
const pReligion = player.Religion;
if (!pReligion) {
  console.error("Player object had no religion!");
}
```

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>player.Religion.get</API> | — | `object` | 获取宗教对象（返回万神殿） |
| <API>player.Religion.canCreateReligion</API> | — | `bool` | 是否可以创建宗教 |
| <API>player.Religion.hasCreatedReligion</API> | — | `bool` | 玩家是否已创建宗教 |
| <API>player.Religion.getPantheons</API> | — | `array` | 获取万神殿列表 |
| <API>player.Religion.getReligionName</API> | — | `string` | 获取宗教名称 |
| <API>player.Religion.getReligionType</API> | — | `string` | 获取宗教类型 |

## GameInfo 关联表

```javascript
GameInfo.Religions;    // 宗教定义表
```

---

<API id="Game.Religion.canHaveBelief"><h3>Game.Religion.canHaveBelief(playerID, beliefID)</h3>

**说明**: 检查玩家是否可以拥有指定信仰。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 玩家 ID |
| beliefID | `int` | 信仰 ID |

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 screen-belief-chooser.js
// 遍历所有信仰，只显示玩家可用的
GameInfo.Beliefs.forEach((belief) => {
  if (Game.Religion.canHaveBelief(GameContext.localPlayerID, belief.$index)) {
    // 创建信仰选项条目
  }
});
```

</API>
<API id="Game.Religion.getPlayerFromReligion"><h3>Game.Religion.getPlayerFromReligion(religionType)</h3>

**说明**: 获取指定宗教所属的玩家 ID。

| 参数名 | 类型 | 说明 |
|------|------|------|
| religionType | `int` | 宗教类型 |

**返回值**: `int`

**使用示例**:

```javascript
// 来源 panel-belief-picker.js
// 获取宗教创立者信息
const religionFounderName = Players.get(
  Game.Religion.getPlayerFromReligion(viewingReligion.getReligionType())
)?.name;
```

</API>
<API id="Game.Religion.hasBeenFounded"><h3>Game.Religion.hasBeenFounded(religionType)</h3>

**说明**: 检查指定宗教是否已被创立。

| 参数名 | 类型 | 说明 |
|------|------|------|
| religionType | `int` | 宗教类型 |

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 panel-belief-picker.js
// 遍历所有宗教，只显示已创立的
for (const religion of GameInfo.Religions) {
  if (Game.Religion.hasBeenFounded(religion.ReligionType)) {
    const pLib = Players.get(
      Game.Religion.getPlayerFromReligion(religion.ReligionType)
    );
  }
}
```

</API>
<API id="Game.Religion.isBeliefClaimable"><h3>Game.Religion.isBeliefClaimable(beliefType)</h3>

**说明**: 检查指定信仰是否可以被认领。

| 参数名 | 类型 | 说明 |
|------|------|------|
| beliefType | `int` | 信仰类型 |

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 panel-belief-picker.js
// 判断信仰是否可被认领，不可认领的加锁样式
const isSwappable = Game.Religion.isBeliefClaimable(beliefDef.BeliefType);
const isLocked = !Game.Religion.isBeliefClaimable(belief.$index) || this.beliefsToAdd.includes(belief.BeliefType);
```

</API>
<API id="player.Religion.get"><h3>player.Religion.get()</h3>

**说明**: 获取宗教对象（返回万神殿）。注意：`Player.Religion.get()` 返回的是万神殿对象。

**参数**: 无

**返回值**: `object`

</API>
<API id="player.Religion.canCreateReligion"><h3>player.Religion.canCreateReligion()</h3>

**说明**: 检查玩家是否可以创建宗教。

**参数**: 无

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 panel-sub-system-dock.js
// 检查玩家是否可以创建宗教，决定打开哪个面板
if (player.Religion.canCreateReligion() && !player.Religion.hasCreatedReligion()) {
  return "panel-religion-picker";
} else {
  return "panel-belief-picker";
}
```

</API>
<API id="player.Religion.hasCreatedReligion"><h3>player.Religion.hasCreatedReligion()</h3>

**说明**: 检查玩家是否已创建过宗教。

**参数**: 无

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 advice-support.js
// 检查玩家是否已创建宗教
return player.Religion.hasCreatedReligion();
```

</API>
<API id="player.Religion.getPantheons"><h3>player.Religion.getPantheons()</h3>

**说明**: 获取万神殿列表。

**参数**: 无

**返回值**: `array`

**使用示例**:

```javascript
// 来源 panel-diplomacy-actions.js
// 获取玩家的万神殿列表
const playerPantheons = playerObject.Religion.getPantheons();
if (playerPantheons.length > 0) {
  let religionTitleText = playerObject.Religion.getReligionName();
}
```

</API>
<API id="player.Religion.getReligionName"><h3>player.Religion.getReligionName()</h3>

**说明**: 获取指定宗教的名称。

**参数**: 无

**返回值**: `string`

**使用示例**:

```javascript
// 来源 panel-radial-menu.js
// 获取玩家宗教名称用于显示
const religionType = playerReligion.getReligionType();
const pantheons = playerReligion.getPantheons();
religionName = playerReligion.getReligionName();
```

</API>
<API id="player.Religion.getReligionType"><h3>player.Religion.getReligionType()</h3>

**说明**: 获取指定宗教的类型。

**参数**: 无

**返回值**: `string`

**使用示例**:

```javascript
// 来源 panel-religion-chooser.js
// 获取玩家宗教类型并查询定义
const religionData = GameInfo.Religions.lookup(player.Religion.getReligionType());
```

</API>