---
title: Culture 文化
doc_type: system
summary: 文化系统 API，涵盖玩家文化进度查询、传承解锁、文化树节点操作与槽位管理。
primary_scope:
  - Game.Culture
  - Players.Culture
  - player.Culture
  - Game.ProgressionTrees
  - Players.grantCultureSlot
related_scope:
  - Players
  - GameInfo.ProgressionTrees
  - GameInfo.ProgressionTreeNodes
  - GameInfo.Traditions
  - Game.PlayerOperations
source:
  - TunerPanels/Player.ltp
  - modules/base-standard/ui/diplo-ribbon/model-diplo-ribbon.js
  - modules/base-standard/ui/policies/model-government.js
  - modules/base-standard/ui/great-works/model-great-works.js
  - modules/base-standard/ui/advice/advice-support.js
  - modules/base-standard/ui/culture-tree/model-culture-tree.js
  - modules/age-antiquity/ui/tutorial/tutorial-items-antiquity.js
doc_update: 2026-06-06
---

# Culture 文化

文化系统 API，管理玩家文化进度、传承解锁、政策与文化树节点操作。

> **关于 `player` 变量**：本文档中出现的 `player` 均指通过 `Players.get(playerID)` 获取的玩家实例对象，**不是**全局 `Players` 对象。典型用法：`const player = Players.get(GameContext.localPlayerID);`。`player.Culture` 是该玩家实例上的文化子系统，`Players.Culture` 则是全局 `Players` 对象上的静态文化访问器。

```javascript
// 来源 Player.ltp
// 快速示例：获取玩家文化对象，查询研究进度并解锁传承
const player = Players.get(GameContext.localPlayerID);
const playerCulture = player.Culture;
if (playerCulture) {
  const researching = playerCulture.getResearching();
  console.log("当前研究: " + researching.type + ", 剩余回合: " + playerCulture.getTurnsLeft());
  playerCulture.unlockTradition(traditionIndex);
}
```

## Game.Culture（全局方法）

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Game.Culture.getGreatWorkType</API> | greatWorkIndex | `string` | 获取大作品类型 |
| <API>Game.Culture.GetCelebrationTypesForGovernment</API> | governmentType | `array` | 获取政体对应的庆典类型列表 |

```javascript
// 来源 modules/base-standard/ui/great-works/model-great-works.js
// 通过大作品索引获取类型并查询定义
const gwType = Game.Culture.getGreatWorkType(greatWorkIndex);
const greatWork = GameInfo.GreatWorks.lookup(gwType);
console.log(greatWork?.GreatWorkObjectType);
```

## Players.Culture（静态访问器）

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Players.Culture.get</API> | playerID | `object` | 获取指定玩家的文化对象 |

```javascript
// 来源 modules/age-antiquity/ui/tutorial/tutorial-items-antiquity.js
// 通过 Players.Culture 静态方法获取玩家文化对象
const culture = Players.Culture.get(GameContext.localPlayerID);
if (culture) {
  console.log(culture.getTurnsLeft());
}
```

## player.Culture（玩家实例方法）

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>player.Culture.getAvailableTrees</API> | — | `array` | 获取可用文化树类型列表 |
| <API>player.Culture.getResearching</API> | — | `object` | 获取当前正在研究的文化项（`.type`, `.depth`, `.maxDepth`） |
| <API>player.Culture.getTurnsLeft</API> | — | `int` | 获取当前研究剩余回合数 |
| <API>player.Culture.getActiveTree</API> | — | `string` | 获取当前活跃文化树类型 |
| <API>player.Culture.getLastCompletedNodeType</API> | — | `string` | 获取最近完成的节点类型 |
| <API>player.Culture.getNumAllCultureSlots</API> | — | `int` | 获取所有文化槽位总数 |
| <API>player.Culture.isTraditionUnlocked</API> | traditionIndex | `bool` | 检查指定传承是否已解锁 |
| <API>player.Culture.unlockTradition</API> | traditionIndex | `void` | 解锁指定传承 |
| <API>player.Culture.getChosenIdeology</API> | — | `string` | 获取已选择的意识形态 |
| <API>player.Culture.getGovernmentType</API> | — | `string` | 获取政体类型 |
| <API>player.Culture.isNodeUnlocked</API> | nodeName | `bool` | 检查文化节点是否已解锁 |
| <API>player.Culture.getTurnsForNode</API> | nodeType | `int` | 获取节点所需回合数 |

```javascript
// 来源 modules/base-standard/ui/culture-tree/screen-culture-tree.js
// 获取可用文化树
const availableCultureTree = player.Culture?.getAvailableTrees();

// 来源 modules/base-standard/ui/culture-chooser/culture-chooser.js
// 获取当前活跃文化树
const activeTree = player.Culture?.getActiveTree();

// 来源 modules/age-antiquity/ui/tutorial/tutorial-items-antiquity.js
// 获取最近完成的节点类型
const nodeType = player.Culture?.getLastCompletedNodeType();

// 来源 modules/age-antiquity/ui/tutorial/tutorial-items-antiquity.js
// 获取所有文化槽位总数
const numTraditionSlots = player.Culture?.getNumAllCultureSlots();
```

## Game.ProgressionTrees（文化树管理）

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Game.ProgressionTrees.revealTree</API> | treeType, playerID | `void` | 为玩家揭示文化树 |
| <API>Game.ProgressionTrees.getTree</API> | playerID, treeType | `object` | 获取玩家文化树对象（含 `.nodes` 数组） |

```javascript
// 来源 Player.ltp
// 揭示所有文化树并获取节点
const playerCulture = player.Culture;
if (playerCulture) {
  for (let eTree of playerCulture.getAvailableTrees()) {
    const treeInfo = GameInfo.ProgressionTrees.lookup(eTree);
    if (treeInfo) {
      Game.ProgressionTrees.revealTree(eTree.ProgressionTreeType, player.id);
    }
  }
}

// 获取文化树节点
const treeObject = Game.ProgressionTrees.getTree(player.id, eTree);
if (treeObject) {
  for (const node of treeObject.nodes) {
    // node 包含文化节点信息
  }
}
```

## 子对象/子系统

| 子系统 | 说明 |
|--------|------|
| `Game.ProgressionTrees` | 全局文化树管理 |
| `GameInfo.ProgressionTrees` | 文化树定义表 |
| `GameInfo.ProgressionTreeNodes` | 文化树节点定义表 |
| `Game.PlayerOperations` | 文化节点授予（`GRANT_TREE_NODE`） |

### 文化槽位操作

```javascript
// 来源 Player.ltp
// 授予文化槽位
Players.grantCultureSlot(player.id, CultureSlotTypes.POLICY_CULTURE_SLOT, 1);
Players.grantCultureSlot(player.id, CultureSlotTypes.TRADITION_CULTURE_SLOT, 1);
```

### 文化树节点授予

```javascript
// 来源 Player.ltp
// 通过 PlayerOperations 授予文化树节点
const args = { ProgressionTreeNodeType: nodeIndex, FullyUnlock: 1 };
Game.PlayerOperations.sendRequest(GameContext.localPlayerID, PlayerOperationTypes.GRANT_TREE_NODE, args);
```

### 传承查询

```javascript
// 来源 Player.ltp
// 遍历所有传承，检查是否已解锁
const playerCulture = player.Culture;
if (playerCulture) {
  for (const tradition of GameInfo.Traditions) {
    if (playerCulture.isTraditionUnlocked(tradition.$index)) {
      console.log(tradition.TraditionType + " 已解锁");
    }
  }
}
```

## 常用枚举

| 枚举 | 说明 |
|------|------|
| `CultureSlotTypes.POLICY_CULTURE_SLOT` | 政策文化槽位 |
| `CultureSlotTypes.TRADITION_CULTURE_SLOT` | 传承文化槽位 |
| `PlayerOperationTypes.GRANT_TREE_NODE` | 授予文化树节点 |

## GameInfo 关联表

```javascript
// 来源 Player.ltp
// GameInfo 文化相关数据表
GameInfo.ProgressionTrees;       // 文化树定义表
GameInfo.ProgressionTreeNodes;   // 文化树节点表
GameInfo.Traditions;             // 传承定义表
```

---

<API id="Game.Culture.getGreatWorkType"><h3>Game.Culture.getGreatWorkType(greatWorkIndex)</h3>

**说明**: 获取指定大作品索引对应的类型标识。

| 参数名 | 类型 | 说明 |
|------|------|------|
| greatWorkIndex | `int` | 大作品索引 |

**返回值**: `string`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/great-works/model-great-works.js
// 通过大作品索引获取类型并查询定义
const gwType = Game.Culture.getGreatWorkType(greatWorkIndex);
const greatWork = GameInfo.GreatWorks.lookup(gwType);
console.log(greatWork?.GreatWorkObjectType);
```

</API>
<API id="Game.Culture.GetCelebrationTypesForGovernment"><h3>Game.Culture.GetCelebrationTypesForGovernment(governmentType)</h3>

**说明**: 获取指定政体类型对应的庆典类型列表。

| 参数名 | 类型 | 说明 |
|------|------|------|
| governmentType | `string` | 政体类型标识 |

**返回值**: `array`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/screen-government-picker/screen-government-picker.js
// 获取政体可用的庆典类型
const governmentCelebrationTypes = Game.Culture.GetCelebrationTypesForGovernment(
  currentGovernment.GovernmentType
);
```

</API>
<API id="Players.Culture.get"><h3>Players.Culture.get(playerID)</h3>

**说明**: 获取指定玩家的文化对象。这是 `Players.Culture` 静态方法，不是 `player.Culture` 实例方法。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 玩家 ID |

**返回值**: `object`

**使用示例**:

```javascript
// 来源 modules/age-antiquity/ui/tutorial/tutorial-items-antiquity.js
// 通过 Players.Culture 静态方法获取玩家文化对象
const culture = Players.Culture.get(GameContext.localPlayerID);
if (culture) {
  console.log(culture.getTurnsLeft());
}
```

</API>
<API id="player.Culture.getAvailableTrees"><h3>player.Culture.getAvailableTrees()</h3>

**说明**: 获取当前玩家可用的所有文化树类型列表。

**参数**: 无

**返回值**: `array`

**使用示例**:

```javascript
// 来源 Player.ltp
// 遍历可用文化树
const playerCulture = player.Culture;
if (playerCulture) {
  for (let eTree of playerCulture.getAvailableTrees()) {
    const treeInfo = GameInfo.ProgressionTrees.lookup(eTree);
    console.log(treeInfo.ProgressionTreeType);
  }
}
```

</API>
<API id="player.Culture.getResearching"><h3>player.Culture.getResearching()</h3>

**说明**: 获取当前正在研究的文化项。返回对象包含 `type`（节点类型标识）、`depth`（当前深度）、`maxDepth`（最大深度）等属性。

**参数**: 无

**返回值**: `object`

**使用示例**:

```javascript
// 来源 Player.ltp
// 查询当前研究进度
const playerCulture = player.Culture;
if (playerCulture) {
  const what = playerCulture.getResearching();
  if (what.type != -1) {
    const entry = GameInfo.ProgressionTreeNodes.lookup(what.type);
    console.log(Locale.compose(entry.Name) + " (" + (what.depth + 1) + "/" + what.maxDepth + ")");
  }
}
```

</API>
<API id="player.Culture.getTurnsLeft"><h3>player.Culture.getTurnsLeft()</h3>

**说明**: 获取当前研究剩余回合数。

**参数**: 无

**返回值**: `int`

**使用示例**:

```javascript
// 来源 Player.ltp
// 获取剩余回合
const turnsLeft = player.Culture.getTurnsLeft();
console.log("剩余回合: " + turnsLeft);
```

</API>
<API id="player.Culture.getActiveTree"><h3>player.Culture.getActiveTree()</h3>

**说明**: 获取当前活跃的文化树类型标识。

**参数**: 无

**返回值**: `string`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/culture-chooser/culture-chooser.js
// 获取当前活跃文化树
const activeTree = player.Culture?.getActiveTree();
console.log("活跃文化树: " + activeTree);
```

</API>
<API id="player.Culture.getLastCompletedNodeType"><h3>player.Culture.getLastCompletedNodeType()</h3>

**说明**: 获取最近完成的文化节点类型标识。

**参数**: 无

**返回值**: `string`

**使用示例**:

```javascript
// 来源 modules/age-antiquity/ui/tutorial/tutorial-items-antiquity.js
// 获取最近完成的节点类型
const nodeType = player.Culture?.getLastCompletedNodeType();
if (nodeType) {
  const nodeInfo = GameInfo.ProgressionTreeNodes.lookup(nodeType);
  console.log("最近完成: " + Locale.compose(nodeInfo?.Name));
}
```

</API>
<API id="player.Culture.getNumAllCultureSlots"><h3>player.Culture.getNumAllCultureSlots()</h3>

**说明**: 获取当前玩家所有文化槽位（政策槽位 + 传承槽位）的总数。

**参数**: 无

**返回值**: `int`

**使用示例**:

```javascript
// 来源 modules/age-antiquity/ui/tutorial/tutorial-items-antiquity.js
// 获取文化槽位总数
const numTraditionSlots = player.Culture?.getNumAllCultureSlots();
console.log("文化槽位总数: " + numTraditionSlots);
```

</API>
<API id="player.Culture.isTraditionUnlocked"><h3>player.Culture.isTraditionUnlocked(traditionIndex)</h3>

**说明**: 检查指定索引的传承是否已解锁。

| 参数名 | 类型 | 说明 |
|------|------|------|
| traditionIndex | `int` | 传承索引（`GameInfo.Traditions` 中的 `$index`） |

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 Player.ltp
// 检查传承解锁状态
const playerCulture = player.Culture;
if (playerCulture) {
  if (playerCulture.isTraditionUnlocked(tradition.$index)) {
    console.log("已解锁传承: " + tradition.TraditionType);
  }
}
```

</API>
<API id="player.Culture.unlockTradition"><h3>player.Culture.unlockTradition(traditionIndex)</h3>

**说明**: 解锁指定索引的传承。

| 参数名 | 类型 | 说明 |
|------|------|------|
| traditionIndex | `int` | 传承索引（`GameInfo.Traditions` 中的 `$index`） |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 Player.ltp
// 解锁传承
const playerCulture = player.Culture;
if (playerCulture) {
  playerCulture.unlockTradition(selectedTraditionIndex);
}
```

</API>
<API id="player.Culture.getChosenIdeology"><h3>player.Culture.getChosenIdeology()</h3>

**说明**: 获取当前玩家已选择的意识形态类型标识。

**参数**: 无

**返回值**: `string`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/diplo-ribbon/model-diplo-ribbon.js
// 获取玩家意识形态并查询定义
const ideology = player.Culture?.getChosenIdeology();
const ideologyDef = GameInfo.Ideologies.lookup(ideology);
if (ideologyDef) {
  console.log(ideologyDef.Name);
}
```

</API>
<API id="player.Culture.getGovernmentType"><h3>player.Culture.getGovernmentType()</h3>

**说明**: 获取当前玩家的政体类型标识。

**参数**: 无

**返回值**: `string`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/policies/model-government.js
// 获取政体类型并查询定义
const governmentType = player.Culture?.getGovernmentType();
const currentGovernment = GameInfo.Governments.lookup(governmentType);
if (currentGovernment) {
  console.log(Locale.compose(currentGovernment.Name));
}
```

</API>
<API id="player.Culture.isNodeUnlocked"><h3>player.Culture.isNodeUnlocked(nodeName)</h3>

**说明**: 检查指定文化节点是否已解锁。

| 参数名 | 类型 | 说明 |
|------|------|------|
| nodeName | `string` | 节点名称（如 `"NODE_CIVIC_AQ_MAIN_CHIEFDOM"`） |

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/advice/advice-support.js
// 检查文化节点是否已解锁
const playerCulture = player.Culture;
if (playerCulture) {
  if (playerCulture.isNodeUnlocked("NODE_CIVIC_AQ_MAIN_CHIEFDOM")) {
    console.log("Chiefdom 文化节点已解锁");
  }
}
```

</API>
<API id="player.Culture.getTurnsForNode"><h3>player.Culture.getTurnsForNode(nodeType)</h3>

**说明**: 获取完成指定节点类型所需的回合数。

| 参数名 | 类型 | 说明 |
|------|------|------|
| nodeType | `int` | 节点类型标识 |

**返回值**: `int`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/culture-tree/model-culture-tree.js
// 获取文化节点所需回合数
const playerCulture = player.Culture;
if (playerCulture) {
  const turnsLeft = playerCulture.getTurnsForNode(nodeType);
  console.log("剩余回合: " + turnsLeft);
}
```

</API>
<API id="Game.ProgressionTrees.revealTree"><h3>Game.ProgressionTrees.revealTree(treeType, playerID)</h3>

**说明**: 为指定玩家揭示文化树。

| 参数名 | 类型 | 说明 |
|------|------|------|
| treeType | `string` | 文化树类型标识 |
| playerID | `int` | 玩家 ID |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 Player.ltp
// 揭示文化树
Game.ProgressionTrees.revealTree(eTree.ProgressionTreeType, player.id);
```

</API>
<API id="Game.ProgressionTrees.getTree"><h3>Game.ProgressionTrees.getTree(playerID, treeType)</h3>

**说明**: 获取指定玩家的文化树对象，返回对象包含 `.nodes` 数组。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 玩家 ID |
| treeType | `string` | 文化树类型标识 |

**返回值**: `object`

**使用示例**:

```javascript
// 来源 Player.ltp
// 获取文化树节点
const treeObject = Game.ProgressionTrees.getTree(player.id, eTree);
if (treeObject) {
  for (const node of treeObject.nodes) {
    console.log(node);
  }
}
```

</API>