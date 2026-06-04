---
title: Players 玩家管理
---

# Players 玩家管理

玩家数据访问的全局对象。用于获取玩家实例、查询玩家状态、遍历所有玩家等。从不通过 import 引入，引擎直接注入。

```javascript
// 来源 Players.ltp
// 遍历所有曾经存活的玩家，获取领袖和文明信息
for (const id of Players.getWasEverAliveIds()) {
  let player = Players.get(id);
  let leaderDef = GameInfo.Leaders.lookup(player.leaderType);
  let strPlayer = Locale.compose(player.civilizationFullName);
}

// 来源 assign-starting-plots.js
// 起始位置分配：区分人类与 AI 玩家
const aliveMajorIds = Players.getAliveMajorIds();
const humanPlayers = [];
for (let i = 0; i < iMaxNumMajors; i++) {
  if (i < aliveMajorIds.length && Players.isHuman(aliveMajorIds[i])) {
    humanPlayers.push(i);
  }
}
```

## 方法列表（共 20 个）

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Players.get</API> | playerID | `PlayerLibrary` | 根据玩家 ID 获取玩家对象（最常用） |
| <API>Players.getAlive</API> | — | `PlayerLibrary[]` | 获取当前所有存活的玩家数组 |
| <API>Players.getAliveIds</API> | — | `int[]` | 获取当前所有存活玩家的 ID 数组 |
| <API>Players.getAliveMajorIds</API> | — | `int[]` | 获取存活的主要文明玩家 ID 数组 |
| <API>Players.getEverAlive</API> | — | `PlayerLibrary[]` | 获取所有曾经存活过的玩家数组（含已死亡） |
| <API>Players.getNumAliveHumans</API> | — | `int` | 获取存活的人类玩家数量 |
| <API>Players.isAlive</API> | playerID | `bool` | 检查玩家是否存活 |
| <API>Players.isHuman</API> | playerID | `bool` | 检查玩家是否为人类 |
| <API>Players.isAI</API> | playerID | `bool` | 检查玩家是否为 AI |
| <API>Players.isValid</API> | playerID | `bool` | 检查玩家 ID 是否有效 |
| <API>Players.isParticipant</API> | playerID | `bool` | 检查玩家是否为参与者 |
| <API>Players.getWasEverAliveMajorIds</API> | — | `int[]` | 获取曾经存活的主要文明 ID |
| <API>Players.getWasEverAliveIds</API> | — | `int[]` | 获取所有曾经存活的玩家 ID（含已死亡） |
| <API>Players.getAliveMinorIds</API> | — | `int[]` | 获取存活的城邦/次要玩家 ID |
| <API>Players.getNumWasEverAliveMajors</API> | — | `int` | 获取曾经存活的主要文明数量 |
| <API>Players.grantYield</API> | playerID, yieldType, amount | `void` | 给玩家指定产出（如金币、文化、科学） |
| <API>Players.grantGreatWork</API> | greatWorkIndex, playerID | `void` | 给玩家授予巨作 |
| <API>Players.grantCultureSlot</API> | playerID, slotType, amount | `void` | 给玩家授予文化槽位 |
| <API>Players.increaseMaxTradeDistance</API> | amount, playerID | `void` | 增加最大贸易距离 |
| <API>Players.restoreMaxTradeDistance</API> | playerID | `void` | 恢复默认贸易距离 |

## PlayerLibrary 子库

`Players.get(id)` 返回的 PlayerLibrary 对象包含以下属性和子库：

### 基础属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | `int` | 玩家 ID |
| `isHuman` | `bool` | 是否为人类玩家 |
| `isAlive` | `bool` | 是否存活 |
| `isTurnActive` | `bool` | 当前回合是否激活 |
| `isMajor` | `bool` | 是否为主要文明 |
| `isIndependent` | `bool` | 是否为独立势力 |
| `isMinor` | `bool` | 是否为次要文明（城邦） |
| `name` | `string` | 玩家名称 |
| `civilizationType` | `int` | 文明类型哈希值 |
| `civilizationAdjective` | `string` | 文明形容词（用于本地化） |
| `civilizationFullName` | `string` | 文明完整本地化名称 |
| `leaderType` | `int` | 领袖类型哈希值 |

### 子系统

| 子系统 | 类型 | 说明 |
|--------|------|------|
| `Units` | `UnitLibrary` | 单位子库 |
| `Cities` | `CityLibrary` | 城市子库 |
| `Culture` | `CultureLibrary` | 文化/市政子库 |
| `Constructibles` | `ConstructLibrary` | 建筑/改良子库 |
| `Diplomacy` | `DiplomacyLibrary` | 外交子库 |
| `LegacyPaths` | `LegacyPathLibrary` | 传承路径子库 |
| `AI` | `AILibrary` | AI 子库 |
| `Treasury` | `TreasuryLibrary` | 财政子库，管理金币 |
| `DiplomacyTreasury` | `DiplomacyTreasuryLibrary` | 外交财政，管理影响力 |
| `Identity` | `IdentityLibrary` | 身份子库，管理叙事标签和通配属性点 |
| `Workers` | `WorkersLibrary` | 工人子库 |
| `Happiness` | `HappinessLibrary` | 幸福度子库 |
| `Stats` | `StatsLibrary` | 统计子库，获取产出数据 |
| `Victories` | `VictoriesLibrary` | 胜利子库，管理胜利点数 |
| `Legacies` | `LegaciesLibrary` | 传承子库，管理传承触发和进度 |
| `Stories` | `StoriesLibrary` | 故事子库，管理叙事事件 |
| `AdvancedStart` | `AdvancedStartLibrary` | 高级开局子库 |
| `Influence` | `InfluenceLibrary` | 影响力子库，管理宗主关系 |
| `Trade` | `TradeLibrary` | 贸易子库 |
| `Resources` | `ResourcesLibrary` | 资源子库 |
| `Modifiers` | `ModifiersLibrary` | 修改器子库 |
| `Formations` | `FormationsLibrary` | 编队子库 |
| `Armies` | `ArmiesLibrary` | 军团子库 |
| `Advisory` | `AdvisoryLibrary` | 顾问子库，提供建议 |
| `Techs` | `TechsLibrary` | 科技子库 |

### Treasury 财政子库

```javascript
// 来源 Player.ltp
// 金币增减
const treasury = player.Treasury;
treasury.changeGoldBalance(500, -1);  // +500 金币
```

### DiplomacyTreasury 外交财政子库

```javascript
// 来源 Player.ltp
// 影响力增减
const treasury = player.DiplomacyTreasury;
treasury.changeDiplomacyBalance(500);  // +500 影响力
```

### Identity 身份子库

```javascript
// 来源 Player.ltp
// 管理叙事标签和通配属性点
const identity = player.Identity;
identity.addWildcardAttributePoints(1);      // +1 通配属性点
identity.changeNarrativeTagPoints(tagIndex, 5);  // 叙事标签 +5
identity.getNarrativeTagPoints(tagIndex);        // 获取标签点数
```

### Workers 工人子库

```javascript
// 来源 Player.ltp
// 增加工人
const workers = player.Workers;
workers.AddWorker(1);  // +1 工人
```

### Happiness 幸福度子库

```javascript
// 来源 Player.ltp
// 开始黄金时代
player.Happiness.startGoldenAge(player.id);
```

### Stats 统计子库

```javascript
// 来源 Player.ltp
// 遍历所有产出类型获取统计数据
const playerStats = player.Stats;
for (let i = 0; i < GameInfo.Yields.length; i++) {
  const yieldType = GameInfo.Yields[i].YieldType;
  const yields = playerStats.getYieldsForType(yieldType);
  // yields.base.value — 基础产出值
}
```

### Victories 胜利子库

```javascript
// 来源 Victories.ltp
// 管理胜利点数和进度
const playerVictories = player.Victories;
playerVictories.addVictoryPoints(victoryHash, 500);
playerVictories.getPointsForVictoryType(victoryHash);
playerVictories.getScoringForVictoryType(victoryHash);
playerVictories.getDominantForVictoryType(victoryHash);
playerVictories.getDominantCountdownForVictoryType(victoryHash);
playerVictories.getVictoryCountdownStatus(victoryHash);
```

### Legacies 传承子库

```javascript
// 来源 Legacies.ltp
// 管理传承触发和进度
const playerLegacies = player.Legacies;
playerLegacies.isTriggered(legacyType);
playerLegacies.isValidLegacy(legacyType);
playerLegacies.getProgress(legacyType);
playerLegacies.setForceTriggered(legacyType, true, true);
playerLegacies.clearForceTriggered(legacyType, true, true);
```

### Stories 故事子库

```javascript
// 来源 Player Stories.ltp
// 管理叙事事件和故事线
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
```

### AdvancedStart 进阶开局子库

```javascript
// 来源 AdvancedStart.ltp, age-transition-post-load.js
// 进阶开局卡片管理
const advStart = player.AdvancedStart;
advStart.getAvailableCards();
advStart.getCards();
advStart.getDeckSize();
advStart.getPlacementComplete();
advStart.setPlacementComplete(true);
```

### Techs 科技子库

```javascript
// 来源 Player.ltp
// 科技树研究状态
const playerTechs = player.Techs;
playerTechs.getTreeType();
playerTechs.getResearching();  // 返回 {type, depth, maxDepth}
playerTechs.getTurnsLeft();
```

### Culture 文化子库

```javascript
// 来源 Player.ltp
// 文化/市政树研究状态
const playerCulture = player.Culture;
playerCulture.getAvailableTrees();
playerCulture.getResearching();  // 返回 {type, depth, maxDepth}
playerCulture.getTurnsLeft();
playerCulture.unlockTradition(traditionIndex);
playerCulture.isTraditionUnlocked(traditionIndex);
```

### Diplomacy 外交子库

```javascript
// 来源 Diplomacy.ltp
// 外交关系和操作
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
```

### Influence 影响力子库

```javascript
// 来源 Diplomacy.ltp, Independents.ltp
// 宗主权管理
const influence = player.Influence;
influence.setSuzerain(playerID);  // 设置宗主
influence.getSuzerain();          // 获取宗主玩家 ID
influence.tribeTypeHash;          // 部落类型哈希
```

### Trade 贸易子库

```javascript
// 来源 Trade.ltp
// 贸易路线管理
const playerTrade = player.Trade;
playerTrade.canStartTradeRouteToCity(cityId, DomainTypes.DOMAIN_SEA);
playerTrade.countPlayerCityRoutes(cityId);
playerTrade.projectPossibleTradeRoutes(TradeRouteSearchOptions.INCLUDE_FAILED);
```

### Resources 资源子库

```javascript
// 来源 Resources.ltp
// 资源分配管理
const pResources = player.Resources;
pResources.getResources();              // 获取所有资源
pResources.getCityIDAssigned(resource); // 获取资源分配的城市
```

### Modifiers 修改器子库

```javascript
// 来源 Player Modifiers.ltp
// 修改器管理
const playerModifiers = player.Modifiers;
playerModifiers.getModifiers();                      // 获取所有修改器
playerModifiers.getModifierSubjects(modifierName);   // 获取修改器主题
```

### Advisory 建议子库

```javascript
// 来源 Player.ltp
// 获取建造/研究建议
const playerAdvisory = player.Advisory;
let request = {};
request.cityId = city.id;
request.subject = AdvisorySubjectTypes.PRODUCTION;
request.maxReturnedEntries = 4;
let recommendations = playerAdvisory.getBuildRecommendations(request);
```

### Formations 编队子库

```javascript
// 来源 Units.ltp
// 编队遍历
const pFormations = player.Formations;
for (const formationId of pFormations.getFormationIds()) {
  const pFormation = Formations.get(formationId);
  for (const unitId of pFormation.getUnitIds()) { /* ... */ }
}
```

### Armies 军团子库

```javascript
// 来源 Units.ltp
// 军团遍历
const pArmies = player.Armies;
for (const armyId of pArmies.getArmyIds()) {
  const pArmy = Armies.get(armyId);
  pArmy.getCommanderId();
  for (const unitId of pArmy.getUnitIds()) { /* ... */ }
}
```

## 常用枚举

| 枚举 | 说明 | 来源 |
|------|------|------|
| `YieldTypes.YIELD_GOLD` | 金币产出 | Player.ltp |
| `YieldTypes.YIELD_CULTURE` | 文化产出 | Player.ltp |
| `YieldTypes.YIELD_SCIENCE` | 科学产出 | Player.ltp |
| `YieldTypes.YIELD_HAPPINESS` | 幸福度产出 | Player.ltp |
| `YieldTypes.YIELD_DIPLOMACY` | 外交产出（影响力） | Player.ltp |
| `YieldTypes.YIELD_FOOD` | 食物产出 | Trade.ltp |
| `YieldTypes.YIELD_PRODUCTION` | 生产力产出 | Trade.ltp |
| `CultureSlotTypes.POLICY_CULTURE_SLOT` | 政策槽 | Player.ltp |
| `CultureSlotTypes.TRADITION_CULTURE_SLOT` | 传统槽 | Player.ltp |
| `AdvisorySubjectTypes.PRODUCTION` | 生产建议 | Player.ltp |
| `AdvisorySubjectTypes.CHOOSE_TECH` | 科技建议 | Player.ltp |
| `AdvisorySubjectTypes.CHOOSE_CULTURE` | 文化建议 | Player.ltp |
| `WarTypes.SURPRISE_WAR` | 奇袭战争 | Diplomacy.ltp |
| `ComponentIDTypes.CITY` | 城市组件 ID 类型 | Cities.ltp |
| `ComponentIDTypes.DISTRICT` | 区域组件 ID 类型 | Cities.ltp |
| `ComponentIDTypes.UNIT` | 单位组件 ID 类型 | Units.ltp |
| `ComponentIDTypes.CONSTRUCTIBLE` | 建筑组件 ID 类型 | Cities.ltp |

## 相关全局对象

| 全局对象 | 说明 | 来源 |
|---------|------|------|
| `GameContext.localPlayerID` | 本地玩家 ID | 多个面板 |
| `GameContext.localObserverID` | 本地观察者 ID | model-diplo-ribbon.js |
| `GameContext.getLocalPlayerID()` | 获取本地玩家 ID（函数形式） | Units.ltp |
| `Database.makeHash(string)` | 将字符串转为哈希值 | Victories.ltp |
| `Locale.compose(key)` | 本地化文本 | 多个面板 |
| `GameInfo.Leaders.lookup(hash)` | 查询领袖信息 | Players.ltp |
| `GameInfo.Civilizations.lookup(hash)` | 查询文明信息 | Players.ltp |
| `Configuration.getPlayer(playerId)` | 获取玩家配置 | automation-test-support.js |

## 源文件引用

- `modules/base-standard/maps/assign-starting-plots.js` — 起始位置分配：isHuman / isAI 区分
- `modules/base-standard/maps/map-utilities.js` — 地图工具：getEverAlive 遍历
- `modules/base-standard/scripts/age-transition-post-load.js` — 时代过渡：Players.get 遍历
- `modules/base-standard/ui/victory-progress/model-victory-progress.js` — 胜利进度：getNumAliveHumans
- `modules/base-standard/ui/victory-manager/victory-manager.js` — 胜利管理：getAlive 遍历
- `modules/base-standard/ui/diplo-ribbon/model-diplo-ribbon.js` — 外交栏：getAlive 遍历
- `modules/base-standard/ui/tutorial/tutorial-support.js` — 教程：isValid 检查
- `modules/base-standard/ui/cinematic/cinematic-manager.js` — 过场动画：isParticipant 检查
- `modules/base-standard/ui/automation/automation-test-support.js` — 自动化测试：getAliveIds 遍历
- `modules/core/ui/utilities/utilities-image.js` — 图片工具：getEverAlive + find
- `TunerPanels/Players.ltp` — 调试面板：getWasEverAliveIds 遍历显示
- `TunerPanels/Player.ltp` — 调试面板：grantYield / grantGreatWork / grantCultureSlot / Treasury 等
- `TunerPanels/Independents.ltp` — 调试面板：getAliveMinorIds / getNumWasEverAliveMajors
- `TunerPanels/Diplomacy.ltp` — 调试面板：Diplomacy / Influence 子库
- `TunerPanels/Trade.ltp` — 调试面板：Trade 子库
- `TunerPanels/Resources.ltp` — 调试面板：Resources 子库
- `TunerPanels/Victories.ltp` — 调试面板：Victories 子库
- `TunerPanels/Legacies.ltp` — 调试面板：Legacies 子库
- `TunerPanels/Player Stories.ltp` — 调试面板：Stories / Identity 子库
- `TunerPanels/Player Modifiers.ltp` — 调试面板：Modifiers 子库
- `TunerPanels/AdvancedStart.ltp` — 调试面板：AdvancedStart 子库
- `TunerPanels/Units.ltp` — 调试面板：Formations / Armies 子库
- `TunerPanels/Player Legacy Path.ltp` — 调试面板：LegacyPaths 子库
- `TunerPanels/VictoriesDefeats.ltp` — 调试面板：胜利/失败

---

<API id="Players.get" title="Players.get(playerID)">

**说明**: 根据玩家 ID 获取 PlayerLibrary 对象。这是最常用的 Players 方法，几乎所有玩家相关操作都从这里开始。如果 ID 无效，返回 `undefined`，建议使用可选链 `?.` 访问。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 玩家唯一标识 ID |

**返回值**: `PlayerLibrary` | `undefined`

**使用示例**:

```javascript
// 来源 Player.ltp
// 获取玩家后访问其子库
let player = Players.get(GameContext.localPlayerID);
if (player) {
  const cities = player.Cities?.getCityIds();
  const units = player.Units?.getUnitIds();
}
```

</API>

<API id="Players.getAlive" title="Players.getAlive()">

**说明**: 获取当前所有存活的 PlayerLibrary 数组。常用于遍历所有活跃玩家。

**参数**: 无

**返回值**: `PlayerLibrary[]`

**使用示例**:

```javascript
// 来源 victory-manager.js
// 遍历所有存活的主要文明
const players = Players.getAlive();
for (const player of players) {
  if (player.isMajor) {
    // 处理主要文明
  }
}
```

</API>

<API id="Players.getAliveIds" title="Players.getAliveIds()">

**说明**: 获取当前所有存活玩家的 ID 数组（纯整数，不返回对象）。

**参数**: 无

**返回值**: `int[]`

**使用示例**:

```javascript
// 来源 automation-test-support.js
// 遍历存活玩家 ID 获取配置
const aPlayers = Players.getAliveIds();
for (const playerId of aPlayers) {
  const pConfig = Configuration.getPlayer(playerId);
}
```

</API>

<API id="Players.getAliveMajorIds" title="Players.getAliveMajorIds()">

**说明**: 仅返回主要文明（Major Civilization）的 ID，不包括城邦、蛮族等。常用于起始位置分配、胜利判定等需要忽略城邦的场景。

**参数**: 无

**返回值**: `int[]`

**使用示例**:

```javascript
// 来源 assign-starting-plots.js
// 起始位置分配时区分人类和 AI 玩家
const aliveMajorIds = Players.getAliveMajorIds();
for (let i = 0; i < aliveMajorIds.length; i++) {
  if (Players.isHuman(aliveMajorIds[i])) {
    homelandPlayers.push(i);
  } else if (Players.isAI(aliveMajorIds[i])) {
    distantPlayers.push(i);
  }
}

// 来源 fractal-voronoi.js
// 获取主要文明数量用于地图生成
const iTotalPlayers = Players.getAliveMajorIds().length;
```

</API>

<API id="Players.getEverAlive" title="Players.getEverAlive()">

**说明**: 获取所有曾经存活过的玩家数组，包含已死亡的玩家。适用于需要遍历完整玩家历史的场景。

**参数**: 无

**返回值**: `PlayerLibrary[]`

**使用示例**:

```javascript
// 来源 utilities-image.js
// 在全部玩家中按 ID 查找
const playerList = Players.getEverAlive();
const player = playerList.find((p) => p.id == playerID);

// 来源 map-utilities.js
// 检查曾经存活的玩家中的人类玩家
if (Players.getEverAlive()[iPlay] && Players.getEverAlive()[iPlay].isHuman) {
  const uiCivType = Players.getEverAlive()[iPlay].civilizationType;
}
```

</API>

<API id="Players.getNumAliveHumans" title="Players.getNumAliveHumans()">

**说明**: 获取当前存活的人类玩家数量。用于判断是否需要显示特定 UI。

**参数**: 无

**返回值**: `int`

**使用示例**:

```javascript
// 来源 model-victory-progress.js
// 非人类玩家回合时跳过更新
if (!player.isTurnActive && Players.getNumAliveHumans() > 0) {
  return;
}
```

</API>

<API id="Players.isAlive" title="Players.isAlive(playerID)">

**说明**: 检查指定玩家是否存活。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 玩家 ID |

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 helpers.js
// 在显示提示前检查玩家是否存活
if (!player || !Players.isAlive(playerID)) {
  return null;
}

// 来源 automation-test-support.js
// 根据参数类型区分用途
if (Players.isAlive(param)) {
  observeAs = param;
}
```

</API>

<API id="Players.isHuman" title="Players.isHuman(playerID)">

**说明**: 检查指定玩家是否为人类。在起始位置分配中广泛用于区分人类和 AI。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 玩家 ID |

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 assign-starting-plots.js
// 区分人类和 AI 玩家，用于岸内/岸外分配
if (Players.isHuman(aliveMajorIds[iMajorIndex])) {
  homelandPlayers.push(iMajorIndex);
} else if (Players.isAI(aliveMajorIds[iMajorIndex])) {
  distantPlayers.push(iMajorIndex);
}
```

</API>

<API id="Players.isAI" title="Players.isAI(playerID)">

**说明**: 检查指定玩家是否为 AI。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 玩家 ID |

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 shattered-seas-voronoi.js
// 地图生成时遍历 AI 主要文明
const PlayerList = Players.getAlive();
for (const player of PlayerList) {
  if (player.isValid && player.isMajor && player.isAI) {
    // 处理 AI 玩家
  }
}
```

</API>

<API id="Players.isValid" title="Players.isValid(playerID)">

**说明**: 检查玩家 ID 是否对应一个存在的玩家槽位。不同于 `isAlive`，即使玩家已死亡也会返回 `true`。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 玩家 ID |

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 tutorial-support.js
// 先验证 ID 再使用
if (!Players.isValid(playerID)) {
  console.error('Invalid PlayerId: ' + playerID);
  return;
}
const player = Players.get(playerID);
```

</API>

<API id="Players.isParticipant" title="Players.isParticipant(playerID)">

**说明**: 检查指定玩家是否为当前游戏的参与者（排除观战者等）。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 玩家 ID |

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 cinematic-manager.js
// 观战者不触发过场动画
if (!Players.isParticipant(GameContext.localPlayerID)) {
  return;
}
```

</API>

<API id="Players.getWasEverAliveMajorIds" title="Players.getWasEverAliveMajorIds()">

**说明**: 获取所有曾经存活过的主要文明 ID（含已死亡的）。

**参数**: 无

**返回值**: `int[]`

**使用示例**:

```javascript
// 来源 Legacies.ltp
// 遍历所有曾经存活的主要文明填充下拉列表
for (const id of Players.getWasEverAliveMajorIds()) {
  let player = Players.get(id);
}
```

</API>

<API id="Players.getWasEverAliveIds" title="Players.getWasEverAliveIds()">

**说明**: 获取所有曾经存活的玩家 ID，包含已死亡和非主要文明。

**参数**: 无

**返回值**: `int[]`

**使用示例**:

```javascript
// 来源 Players.ltp
// 遍历所有玩家显示完整列表
for (const id of Players.getWasEverAliveIds()) {
  let player = Players.get(id);
  let strLeader = Locale.compose(GameInfo.Leaders.lookup(player.leaderType)?.Name);
  let strPlayer = Locale.compose(player.civilizationFullName);
}

// 来源 Independents.ltp
// 与次要文明一起遍历
let numMajors = Players.getNumWasEverAliveMajors();
for (const id of Players.getWasEverAliveIds()) {
  let player = Players.get(id);
  if (player.isIndependent || player.isMinor) { /* ... */ }
}
```

</API>

<API id="Players.getAliveMinorIds" title="Players.getAliveMinorIds()">

**说明**: 获取当前存活的城邦/次要文明玩家 ID。

**参数**: 无

**返回值**: `int[]`

**使用示例**:

```javascript
// 来源 Independents.ltp
// 遍历所有存活的城邦显示列表
for (const id of Players.getAliveMinorIds()) {
  let player = Players.get(id);
  let strPlayer = Locale.compose(player.civilizationFullName);
}
```

</API>

<API id="Players.getNumWasEverAliveMajors" title="Players.getNumWasEverAliveMajors()">

**说明**: 获取从游戏开始至今曾经存活过的主要文明数量。

**参数**: 无

**返回值**: `int`

**使用示例**:

```javascript
// 来源 Independents.ltp
// 确定遍历边界
let numMajors = Players.getNumWasEverAliveMajors();
for (const id of Players.getWasEverAliveIds()) {
  let player = Players.get(id);
}
```

</API>

<API id="Players.grantYield" title="Players.grantYield(playerID, yieldType, amount)">

**说明**: 给指定玩家直接增加产出（金币、文化、科学、幸福度、影响力等）。用于调试或系统奖励。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 目标玩家 ID |
| yieldType | `int` | 产出类型枚举（如 `YieldTypes.YIELD_GOLD`） |
| amount | `int` | 增加的数量 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 Player.ltp
// 给玩家 +100 文化
let player = Players.get(g_TunerState.PlayerPanel.selectedPlayer);
if (player) {
  Players.grantYield(player.id, YieldTypes.YIELD_CULTURE, 100);
}

// 给玩家 +100 幸福度
Players.grantYield(player.id, YieldTypes.YIELD_HAPPINESS, 100);

// 给玩家 +100 科学
Players.grantYield(player.id, YieldTypes.YIELD_SCIENCE, 100);
```

</API>

<API id="Players.grantGreatWork" title="Players.grantGreatWork(greatWorkIndex, playerID)">

**说明**: 给玩家授予指定巨作。

| 参数名 | 类型 | 说明 |
|------|------|------|
| greatWorkIndex | `int` | 巨作索引/类型哈希 |
| playerID | `int` | 目标玩家 ID |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 Player.ltp
// 授予巨作（需要玩家拥有城市）
player = Players.get(g_TunerState.PlayerPanel.selectedPlayer);
greatWork = g_TunerState.PlayerPanel.selectedGreatWork;
if (player && player.Cities) {
  Players.grantGreatWork(greatWork, player.id);
}
```

</API>

<API id="Players.grantCultureSlot" title="Players.grantCultureSlot(playerID, slotType, amount)">

**说明**: 给玩家授予文化槽位（政策槽或传统槽）。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 目标玩家 ID |
| slotType | `int` | 槽位类型（`CultureSlotTypes.POLICY_CULTURE_SLOT` 或 `CultureSlotTypes.TRADITION_CULTURE_SLOT`） |
| amount | `int` | 增加数量 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 Player.ltp
// 授予政策槽
let player = Players.get(g_TunerState.PlayerPanel.selectedPlayer);
if (player) {
  Players.grantCultureSlot(player.id, CultureSlotTypes.POLICY_CULTURE_SLOT, 1);
}

// 授予传统槽
Players.grantCultureSlot(player.id, CultureSlotTypes.TRADITION_CULTURE_SLOT, 1);
```

</API>

<API id="Players.increaseMaxTradeDistance" title="Players.increaseMaxTradeDistance(amount, playerID)">

**说明**: 增加玩家的最大贸易距离。

| 参数名 | 类型 | 说明 |
|------|------|------|
| amount | `int` | 增加的距离值 |
| playerID | `int` | 目标玩家 ID |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 Player.ltp
// 大幅增加贸易距离（陆地和海洋）
let player = Players.get(g_TunerState.PlayerPanel.selectedPlayer);
if (player) {
  Players.increaseMaxTradeDistance(1000, player.id);
}
```

</API>

<API id="Players.restoreMaxTradeDistance" title="Players.restoreMaxTradeDistance(playerID)">

**说明**: 将玩家的最大贸易距离恢复为默认值。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 目标玩家 ID |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 Player.ltp
// 恢复默认贸易距离
let player = Players.get(g_TunerState.PlayerPanel.selectedPlayer);
if (player) {
  Players.restoreMaxTradeDistance(player.id);
}
```

</API>