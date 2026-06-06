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
  - TunerPanels/Cities.ltp
  - TunerPanels/Units.ltp
  - modules/base-standard/ui/panel-belief-picker/panel-belief-picker.js
  - modules/base-standard/ui/panel-religion-picker/panel-religion-picker.js
  - modules/base-standard/ui/sub-system-dock/panel-sub-system-dock.js
  - modules/base-standard/ui/pantheon-chooser/panel-religion-chooser.js
  - modules/base-standard/ui/pantheon-chooser/screen-pantheon-chooser.js
  - modules/base-standard/ui/pantheon-complete/panel-pantheon-complete.js
doc_update: 2026-06-06
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
| <API>player.Religion.getNumPantheons</API> | — | `int` | 获取万神殿数量 |
| <API>player.Religion.getNumPantheonsUnlocked</API> | — | `int` | 获取已解锁的万神殿数量 |
| <API>player.Religion.getReligionName</API> | — | `string` | 获取宗教名称 |
| <API>player.Religion.getReligionType</API> | — | `string` | 获取宗教类型 |
| <API>player.Religion.getHolyCityName</API> | — | `string` | 获取圣城名称 |
| <API>player.Religion.getBeliefs</API> | — | `array` | 获取已选信仰列表 |
| <API>player.Religion.getNumBeliefsEarned</API> | — | `int` | 获取已获得的信仰数量 |

## 城市宗教实例（city.Religion）

城市对象上的宗教子系统，为只读属性，用于查询城市中各宗教的分布情况。

```javascript
// 快速示例：查看城市宗教信息
// 来源 TunerPanels/Cities.ltp
// 获取城市的三种宗教类型
const cityReligion = city.Religion;
const majorityType = cityReligion.majorityReligion;  // 主流宗教
const urbanType = cityReligion.urbanReligion;        // 城市宗教
const ruralType = cityReligion.ruralReligion;        // 乡村宗教
```

| 属性 | 类型 | 说明 |
|------|------|------|
| `city.Religion.majorityReligion` | `int` | 主流宗教类型（信仰人数最多的宗教） |
| `city.Religion.urbanReligion` | `int` | 城市区域宗教类型 |
| `city.Religion.ruralReligion` | `int` | 乡村区域宗教类型 |

```javascript
// 示例：检查城市是否信仰指定宗教
// 来源 panel-religion-chooser.js
// 遍历玩家城镇，统计信仰某宗教的城镇数量
if (_city.isTown && _city.Religion?.majorityReligion == currentReligion?.getReligionType()) {
  townsInReligion++;
}
```

## GameInfo 关联表

```javascript
// 来源 panel-belief-picker.js
// 遍历所有宗教定义，查询已创立的宗教
for (const religion of GameInfo.Religions) {
  if (Game.Religion.hasBeenFounded(religion.ReligionType)) {
    const religionDef = GameInfo.Religions.lookup(religion.ReligionType);
  }
}
```

```javascript
// 来源 panel-religion-chooser.js
// 通过宗教类型查宗教定义，获取图标
const religionData = GameInfo.Religions.lookup(player.Religion.getReligionType());
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

**说明**: 获取宗教对象（返回万神殿）。注意：`Players.Religion.get()` 返回的是万神殿对象。

**参数**: 无

**返回值**: `object`

**使用示例**:

```javascript
// 来源 panel-religion-chooser.js
// 通过管理器获取玩家宗教对象（带 playerID 参数）
const currentReligion = Players.Religion?.get(player.id);
if (currentReligion == null) {
  return;
}
```

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
<API id="player.Religion.getNumPantheons"><h3>player.Religion.getNumPantheons()</h3>

**说明**: 获取玩家已拥有的万神殿数量。

**参数**: 无

**返回值**: `int`

**使用示例**:

```javascript
// 来源 panel-pantheon-complete.js
// 根据万神殿数量显示文案
if (playerReligion.getPantheons().length == 0) {
  this.yourPantheonText.innerHTML = Locale.stylize("LOC_UI_PANTHEON_EMPTY");
} else {
  this.yourPantheonText.innerHTML = Locale.compose(
    "LOC_UI_PANTHEON_YOUR_PANTHEON",
    playerReligion.getNumPantheons()
  );
}
```

</API>
<API id="player.Religion.getNumPantheonsUnlocked"><h3>player.Religion.getNumPantheonsUnlocked()</h3>

**说明**: 获取已解锁的万神殿数量。

**参数**: 无

**返回值**: `int`

**使用示例**:

```javascript
// 来源 screen-pantheon-chooser.js
// 获取已解锁万神殿数量，用于显示副标题
const playerReligion = player.Religion;
this.numPantheonsToAdd = playerReligion.getNumPantheonsUnlocked();
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
<API id="player.Religion.getHolyCityName"><h3>player.Religion.getHolyCityName()</h3>

**说明**: 获取宗教的圣城名称。

**参数**: 无

**返回值**: `string`

**使用示例**:

```javascript
// 来源 panel-belief-picker.js
// 显示宗教圣城名称
beliefReligionHolyCity.setAttribute(
  "data-l10n-id",
  Locale.compose("LOC_UI_ESTABLISH_RELIGION_HOLY_CITY", viewingReligion.getHolyCityName())
);
```

</API>
<API id="player.Religion.getBeliefs"><h3>player.Religion.getBeliefs()</h3>

**说明**: 获取玩家宗教已选择的信仰列表。

**参数**: 无

**返回值**: `array`

**使用示例**:

```javascript
// 来源 panel-religion-chooser.js
// 遍历已选信仰，查找增强信条
const beliefs = currentReligion.getBeliefs();
if (beliefs) {
  beliefs.forEach((belief) => {
    const beliefDef = GameInfo.Beliefs.lookup(belief);
    if (beliefDef?.BeliefClassType == "BELIEF_CLASS_ENHANCER") {
      // 处理增强信条
    }
  });
}
```

</API>
<API id="player.Religion.getNumBeliefsEarned"><h3>player.Religion.getNumBeliefsEarned()</h3>

**说明**: 获取已获得的信仰数量（用于决定创始人信条槽位数量）。

**参数**: 无

**返回值**: `int`

**使用示例**:

```javascript
// 来源 panel-belief-picker.js
// 根据已获得信仰数量决定创始人信条槽位
const numBeliefsEarned = viewingReligion.getNumBeliefsEarned();
switch (numBeliefsEarned) {
  case 1:
  case 2:
  case 3:
    return 1;
  case 4:
    return 2;
  case 5:
    return 3;
}
```

</API>