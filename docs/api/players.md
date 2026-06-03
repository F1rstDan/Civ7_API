---
title: Players 玩家管理
---

# Players 玩家管理

玩家数据访问的全局对象。用于获取玩家实例、查询玩家状态、遍历所有玩家等。从不通过 import 引入，引擎直接注入。

```javascript
const player = Players.get(GameContext.localPlayerID);
if (player) {
  const cities = player.Cities?.getCityIds();
  console.log('城市数量:', cities?.length);
}

// 遍历存活的主要文明
const aliveMajorIds = Players.getAliveMajorIds();
for (const id of aliveMajorIds) {
  if (Players.isHuman(id)) {
    console.log('人类玩家 ID:', id);
  }
}
```

## 方法列表（共 12 个）

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `get` | playerID | `PlayerLibrary` | 根据玩家 ID 获取玩家对象（最常用） |
| `getAlive` | — | `PlayerLibrary[]` | 获取当前所有存活的玩家数组 |
| `getAliveIds` | — | `int[]` | 获取当前所有存活玩家的 ID 数组 |
| `getAliveMajorIds` | — | `int[]` | 获取存活的主要文明玩家 ID 数组 |
| `getEverAlive` | — | `PlayerLibrary[]` | 获取所有曾经存活过的玩家数组（含已死亡） |
| `getNumAliveHumans` | — | `int` | 获取存活的人类玩家数量 |
| `isAlive` | playerID | `bool` | 检查玩家是否存活 |
| `isHuman` | playerID | `bool` | 检查玩家是否为人类 |
| `isAI` | playerID | `bool` | 检查玩家是否为 AI |
| `isValid` | playerID | `bool` | 检查玩家 ID 是否有效 |
| `isParticipant` | playerID | `bool` | 检查玩家是否为参与者 |
| `getWasEverAliveMajorIds` | — | `int[]` | 获取曾经存活的主要文明 ID |

## PlayerLibrary 对象常用属性

`Players.get(id)` 返回的 PlayerLibrary 对象包含以下子库和属性：

| 属性/子库 | 类型 | 说明 |
|-----------|------|------|
| `id` | `int` | 玩家 ID |
| `isHuman` | `bool` | 是否为人类玩家 |
| `isAlive` | `bool` | 是否存活 |
| `isTurnActive` | `bool` | 当前回合是否激活 |
| `name` | `string` | 玩家名称 |
| `civilizationType` | `int` | 文明类型哈希值 |
| `civilizationAdjective` | `string` | 文明形容词（用于本地化） |
| `Units` | `UnitLibrary` | 单位子库 |
| `Cities` | `CityLibrary` | 城市子库 |
| `Culture` | `CultureLibrary` | 文化子库 |
| `Constructibles` | `ConstructLibrary` | 建筑/改良子库 |
| `Diplomacy` | `DiplomacyLibrary` | 外交子库 |
| `LegacyPaths` | `LegacyPathLibrary` | 传承路径子库 |
| `AI` | `AILibrary` | AI 子库 |

## 详细说明

### `get(playerID)`

这是最常用的 Players 方法。几乎所有玩家相关操作都从这里开始。返回的 PlayerLibrary 对象包含该玩家的所有子库。如果 ID 无效，返回 `undefined`，建议使用可选链 `?.` 访问。

```javascript
const player = Players.get(GameContext.localPlayerID);
if (player) {
  const cities = player.Cities?.getCityIds();
  const units = player.Units?.getUnitIds();
}
```

### `getAliveMajorIds()`

仅返回主要文明（Major Civilization）的 ID，不包括城邦、蛮族等。常用于起始位置分配、胜利判定等。

```javascript
const aliveMajorIds = Players.getAliveMajorIds();
const humanPlayers = [];
for (let i = 0; i < aliveMajorIds.length; i++) {
  if (Players.isHuman(aliveMajorIds[i])) {
    humanPlayers.push(i);
  }
}
```

### `isHuman(id)` / `isAI(id)`

用于区分人类和 AI 玩家。在起始位置分配中广泛使用。

```javascript
if (Players.isHuman(aliveMajorIds[iMajorIndex])) {
  homelandPlayers.push(iMajorIndex);
} else if (Players.isAI(aliveMajorIds[iMajorIndex])) {
  distantPlayers.push(iMajorIndex);
}
```

### `isValid(playerID)`

不同于 `isAlive`，`isValid` 检查的是 ID 是否对应一个存在的玩家槽位，即使该玩家已死亡也会返回 `true`。

```javascript
if (!Players.isValid(playerID)) {
  console.error('Invalid PlayerId: ' + playerID);
  return;
}
const player = Players.get(playerID);
```

## 源文件引用

- `modules/base-standard/maps/assign-starting-plots.js` — 起始位置分配中的 Players 使用
- `modules/base-standard/ui/unlocks/model-unlocks.js` — 解锁系统中的 Players 使用
- `modules/base-standard/scripts/age-transition-post-load.js` — 时代过渡中的 Players 使用
- `modules/base-standard/ui/tree-grid/tree-detail.js` — 科技树中的 Players 使用
---

## TunerPanel 补充：新增 Players 方法（来源：Player.ltp、Players.ltp）

以下方法从 Firaxis 官方调试面板代码中确认，标记为 	uner_verified。

| 方法 | 参数 | 返回值 | 说明 | 来源面板 |
|------|------|--------|------|---------|
| getWasEverAliveIds | — | int[] | 获取所有曾经存活的玩家 ID（含已死亡） | Players.ltp |
| getAliveMinorIds | — | int[] | 获取存活的城邦/次要玩家 ID | Independents.ltp |
| getNumWasEverAliveMajors | — | int | 获取曾经存活的主要文明数量 | Independents.ltp |
| grantYield | playerID, yieldType, amount | oid | 给玩家指定产出（如金币、文化、科学） | Player.ltp |
| grantGreatWork | greatWorkIndex, playerID | oid | 给玩家授予巨作 | Player.ltp |
| grantCultureSlot | playerID, slotType, amount | oid | 给玩家授予文化槽位 | Player.ltp |
| increaseMaxTradeDistance | amount, playerID | oid | 增加最大贸易距离 | Player.ltp |
| estoreMaxTradeDistance | playerID | oid | 恢复默认贸易距离 | Player.ltp |

`javascript
// TunerPanel 示例：给本地玩家 +500 金币（来源 Player.ltp）
let player = Players.get(GameContext.localPlayerID);
if (player) {
  const treasury = player.Treasury;
  treasury.changeGoldBalance(500, -1);
}

// TunerPanel 示例：给玩家 +100 文化（来源 Player.ltp）
Players.grantYield(player.id, YieldTypes.YIELD_CULTURE, 100);

// TunerPanel 示例：给玩家授予巨作（来源 Player.ltp）
Players.grantGreatWork(greatWorkIndex, player.id);
`

---

## TunerPanel 补充：PlayerLibrary 完整子库列表

以下子库从 .ltp 面板代码中发现，是对上方基础属性表的扩展。

| 子库 | 类型 | 说明 | 来源面板 |
|------|------|------|---------|
| Treasury | TreasuryLibrary | 财政子库，管理金币 | Player.ltp |
| DiplomacyTreasury | DiplomacyTreasuryLibrary | 外交财政，管理影响力 | Player.ltp |
| Identity | IdentityLibrary | 身份子库，管理叙事标签和通配属性点 | Player Stories.ltp |
| Workers | WorkersLibrary | 工人子库 | Player.ltp |
| Happiness | HappinessLibrary | 幸福度子库，支持黄金时代 | Player.ltp |
| Stats | StatsLibrary | 统计子库，获取产出数据 | Player.ltp |
| Victories | VictoriesLibrary | 胜利子库，管理胜利点数 | Victories.ltp |
| LegacyPaths | LegacyPathLibrary | 传承路径子库 | Player Legacy Path.ltp |
| Legacies | LegaciesLibrary | 传承子库，管理传承触发和进度 | Legacies.ltp |
| Stories | StoriesLibrary | 故事子库，管理叙事事件 | Player Stories.ltp |
| AdvancedStart | AdvancedStartLibrary | 高级开局子库 | AdvancedStart.ltp |
| Influence | InfluenceLibrary | 影响力子库，管理宗主关系 | Diplomacy.ltp |
| Trade | TradeLibrary | 贸易子库 | Trade.ltp |
| Resources | ResourcesLibrary | 资源子库 | Resources.ltp |
| Modifiers | ModifiersLibrary | 修改器子库 | Player Modifiers.ltp |
| Formations | FormationsLibrary | 编队子库 | Units.ltp |
| Armies | ArmiesLibrary | 军团子库 | Units.ltp |
| Advisory | AdvisoryLibrary | 顾问子库，提供建议 | Player.ltp |
| Techs | TechsLibrary | 科技子库 | Player.ltp |
| Culture | CultureLibrary | 文化/市政子库 | Player.ltp |
| Diplomacy | DiplomacyLibrary | 外交子库 | Diplomacy.ltp |

### Treasury 子库

`javascript
// 来源 Player.ltp
const treasury = player.Treasury;
treasury.changeGoldBalance(500, -1);  // +500 金币
`

### DiplomacyTreasury 子库

`javascript
// 来源 Player.ltp
const treasury = player.DiplomacyTreasury;
treasury.changeDiplomacyBalance(500);  // +500 影响力
`

### Identity 子库

`javascript
// 来源 Player.ltp
const identity = player.Identity;
identity.addWildcardAttributePoints(1);  // +1 通配属性点
identity.changeNarrativeTagPoints(tagIndex, 5);  // 叙事标签 +5
identity.getNarrativeTagPoints(tagIndex);  // 获取标签点数
`

### Workers 子库

`javascript
// 来源 Player.ltp
const workers = player.Workers;
workers.AddWorker(1);  // +1 工人
`

### Happiness 子库

`javascript
// 来源 Player.ltp
player.Happiness.startGoldenAge(player.id);  // 开始黄金时代
`

### Stats 子库

`javascript
// 来源 Player.ltp
const playerStats = player.Stats;
for (let i = 0; i < GameInfo.Yields.length; i++) {
  const yieldType = GameInfo.Yields[i].YieldType;
  const yields = playerStats.getYieldsForType(yieldType);
  // yields.base.value — 基础产出值
}
`

### Victories 子库

`javascript
// 来源 Victories.ltp
const playerVictories = player.Victories;
playerVictories.addVictoryPoints(victoryHash, 500);
playerVictories.getPointsForVictoryType(victoryHash);
playerVictories.getScoringForVictoryType(victoryHash);
playerVictories.getDominantForVictoryType(victoryHash);
playerVictories.getDominantCountdownForVictoryType(victoryHash);
playerVictories.getVictoryCountdownStatus(victoryHash);
`

### Legacies 子库

`javascript
// 来源 Legacies.ltp
const playerLegacies = player.Legacies;
playerLegacies.isTriggered(legacyType);
playerLegacies.isValidLegacy(legacyType);
playerLegacies.getProgress(legacyType);
playerLegacies.setForceTriggered(legacyType, true, true);
playerLegacies.clearForceTriggered(legacyType, true, true);
`

### Stories 子库

`javascript
// 来源 Player Stories.ltp
const playerStories = player.Stories;
playerStories.getActiveIds();
playerStories.find(storyId);
playerStories.getStoryStateName(state);
playerStories.getStoryPlotCoord(storyId);
playerStories.isSuppressed(storyType);
playerStories.getNumArchived();
playerStories.getArchived(index);
playerStories.getActiveQuests();
playerStories.getCompletedQuests();
playerStories.onRequirementsMet(storyId);
`

### AdvancedStart 子库

`javascript
// 来源 AdvancedStart.ltp
const advStart = player.AdvancedStart;
advStart.getAvailableCards();
advStart.getCards();
advStart.getDeckSize();
advStart.getPlacementComplete();
advStart.setPlacementComplete(true);
`

### Techs 子库

`javascript
// 来源 Player.ltp
const playerTechs = player.Techs;
playerTechs.getTreeType();
playerTechs.getResearching();  // 返回 {type, depth, maxDepth}
playerTechs.getTurnsLeft();
`

### Culture 子库

`javascript
// 来源 Player.ltp
const playerCulture = player.Culture;
playerCulture.getAvailableTrees();
playerCulture.getResearching();  // 返回 {type, depth, maxDepth}
playerCulture.getTurnsLeft();
playerCulture.unlockTradition(traditionIndex);
playerCulture.isTraditionUnlocked(traditionIndex);
`

### Diplomacy 子库

`javascript
// 来源 Diplomacy.ltp
const diplomacy = player.Diplomacy;
diplomacy.hasMet(otherPlayerID);
diplomacy.isAtWarWith(otherPlayerID);
diplomacy.getNumGrievances(otherPlayerID);
diplomacy.getNumFavors(otherPlayerID);
diplomacy.changeNumGrievances(otherPlayerID, amount);
diplomacy.changeNumFavors(otherPlayerID, amount);
diplomacy.changeRelationshipLevel(otherPlayerID, amount);
diplomacy.getRelationshipLevel(otherPlayerID);
diplomacy.getRelationshipLevelName(otherPlayerID);
diplomacy.canDeclareWarOn(otherPlayerID, WarTypes.SURPRISE_WAR);
diplomacy.canMakePeaceWith(otherPlayerID);
diplomacy.forceDeclareWar(otherPlayerID);
diplomacy.forceAttackOperation(otherPlayerID);
diplomacy.changeAvailableTokens(amount);
diplomacy.getTotalTokens();
diplomacy.getAvailableTokens();
diplomacy.getCommittedTokens();
diplomacy.getEscrowTokens();
diplomacy.getExhaustedTokens();
diplomacy.getReservedTokens();
`

### Influence 子库

`javascript
// 来源 Diplomacy.ltp, Independents.ltp
const influence = player.Influence;
influence.setSuzerain(playerID);  // 设置宗主
influence.getSuzerain();  // 获取宗主玩家 ID
influence.tribeTypeHash;  // 部落类型哈希
`

### Trade 子库

`javascript
// 来源 Trade.ltp
const playerTrade = player.Trade;
playerTrade.canStartTradeRouteToCity(cityId, DomainTypes.DOMAIN_SEA);
playerTrade.countPlayerCityRoutes(cityId);
playerTrade.projectPossibleTradeRoutes(TradeRouteSearchOptions.INCLUDE_FAILED);
`

### Resources 子库

`javascript
// 来源 Resources.ltp
const pResources = player.Resources;
pResources.getResources();  // 获取所有资源
pResources.getCityIDAssigned(resource);  // 获取资源分配的城市
`

### Modifiers 子库

`javascript
// 来源 Player Modifiers.ltp
const playerModifiers = player.Modifiers;
playerModifiers.getModifiers();  // 获取所有修改器
playerModifiers.getModifierSubjects(modifierName);  // 获取修改器主题
`

### Advisory 子库

`javascript
// 来源 Player.ltp
const playerAdvisory = player.Advisory;
let request = {};
request.cityId = city.id;
request.subject = AdvisorySubjectTypes.PRODUCTION;
request.maxReturnedEntries = 4;
let recommendations = playerAdvisory.getBuildRecommendations(request);
`

### Formations 子库

`javascript
// 来源 Units.ltp
const pFormations = player.Formations;
for (const formationId of pFormations.getFormationIds()) {
  const pFormation = Formations.get(formationId);
  for (const unitId of pFormation.getUnitIds()) { /* ... */ }
}
`

### Armies 子库

`javascript
// 来源 Units.ltp
const pArmies = player.Armies;
for (const armyId of pArmies.getArmyIds()) {
  const pArmy = Armies.get(armyId);
  pArmy.getCommanderId();
  for (const unitId of pArmy.getUnitIds()) { /* ... */ }
}
`

## TunerPanel 补充：常用枚举

| 枚举 | 值 | 说明 | 来源 |
|------|---|------|------|
| YieldTypes.YIELD_GOLD | — | 金币产出 | Player.ltp |
| YieldTypes.YIELD_CULTURE | — | 文化产出 | Player.ltp |
| YieldTypes.YIELD_SCIENCE | — | 科学产出 | Player.ltp |
| YieldTypes.YIELD_HAPPINESS | — | 幸福度产出 | Player.ltp |
| YieldTypes.YIELD_DIPLOMACY | — | 外交产出（影响力） | Player.ltp |
| YieldTypes.YIELD_FOOD | — | 食物产出 | Trade.ltp |
| YieldTypes.YIELD_PRODUCTION | — | 生产力产出 | Trade.ltp |
| CultureSlotTypes.POLICY_CULTURE_SLOT | — | 政策槽 | Player.ltp |
| CultureSlotTypes.TRADITION_CULTURE_SLOT | — | 传统槽 | Player.ltp |
| AdvisorySubjectTypes.PRODUCTION | — | 生产建议 | Player.ltp |
| AdvisorySubjectTypes.CHOOSE_TECH | — | 科技建议 | Player.ltp |
| AdvisorySubjectTypes.CHOOSE_CULTURE | — | 文化建议 | Player.ltp |
| WarTypes.SURPRISE_WAR | — | 奇袭战争 | Diplomacy.ltp |
| ComponentIDTypes.CITY | — | 城市组件 ID 类型 | Cities.ltp |
| ComponentIDTypes.DISTRICT | — | 区域组件 ID 类型 | Cities.ltp |
| ComponentIDTypes.UNIT | — | 单位组件 ID 类型 | Units.ltp |
| ComponentIDTypes.CONSTRUCTIBLE | — | 建筑组件 ID 类型 | Cities.ltp |

## TunerPanel 补充：相关全局对象

| 全局对象 | 说明 | 来源面板 |
|---------|------|---------|
| GameContext.localPlayerID | 本地玩家 ID | 多个面板 |
| GameContext.getLocalPlayerID() | 获取本地玩家 ID（函数形式） | Units.ltp |
| Database.makeHash(string) | 将字符串转为哈希值 | Victories.ltp |
| Locale.compose(key) | 本地化文本 | 多个面板 |
| GameInfo.Leaders.lookup(hash) | 查询领袖信息 | Players.ltp |
| GameInfo.Civilizations.lookup(hash) | 查询文明信息 | Players.ltp |

---

*来源：Player.ltp、Players.ltp、Victories.ltp、VictoriesDefeats.ltp、Legacies.ltp、Player Legacy Path.ltp、Player Stories.ltp、Player Modifiers.ltp、Independents.ltp、Diplomacy.ltp、Trade.ltp、Resources.ltp、AdvancedStart.ltp*
