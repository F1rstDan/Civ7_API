---
title: Culture 文化
doc_type: system-topic
summary: 文化系统 API，涵盖玩家文化进度、传承解锁、ProgressionTree 节点操作。
primary_scope:
  - Game.Culture
  - Players.grantCultureSlot
  - player.Culture
  - Game.ProgressionTrees
related_scope:
  - GameInfo.ProgressionTrees
  - Game.PlayerOperations
  - Players
source:
  - TunerPanels/Player.ltp
  - modules/base-standard/ui/diplo-ribbon/model-diplo-ribbon.js
  - modules/base-standard/ui/policies/model-government.js
  - modules/base-standard/ui/great-works/model-great-works.js
  - modules/base-standard/ui/advice/advice-support.js
  - modules/base-standard/ui/culture-tree/model-culture-tree.js
  - modules/age-antiquity/ui/tutorial/tutorial-items-antiquity.js
doc_update: 2026-06-05
---

# Culture 文化

文化系统 API，管理玩家文化进度、传承解锁、政策与文化树节点操作。

```javascript
// 来源 Player.ltp
// 快速示例：查询文化进度并解锁传承
const player = Players.get(GameContext.localPlayerID);
const playerCulture = player.Culture;
if (playerCulture) {
  const researching = playerCulture.getResearching();
  console.log("当前研究: " + researching.type + ", 剩余回合: " + playerCulture.getTurnsLeft());
  playerCulture.unlockTradition(traditionIndex);
}
```

## 方法列表（共 15 个）

### player.Culture 子系统

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>player.Culture.getAvailableTrees</API> | — | `array` | 获取可用文化树列表 |
| <API>player.Culture.getResearching</API> | — | `object` | 获取当前正在研究的文化项（`.type`, `.depth`, `.maxDepth`） |
| <API>player.Culture.getTurnsLeft</API> | — | `int` | 获取当前研究剩余回合数 |
| <API>player.Culture.isTraditionUnlocked</API> | traditionIndex | `bool` | 检查指定传承是否已解锁 |
| <API>player.Culture.unlockTradition</API> | traditionIndex | `void` | 解锁指定传承 |
| <API>player.Culture.getChosenIdeology</API> | playerID | `string` | 获取已选择的意识形态 |
| <API>player.Culture.getGovernmentType</API> | playerID | `string` | 获取政体类型 |
| <API>player.Culture.getGreatWorkType</API> | greatWorkID | `string` | 获取大作品类型 |
| <API>player.Culture.get</API> | playerID | `object` | 获取玩家文化对象 |
| <API>player.Culture.isNodeUnlocked</API> | playerID, nodeID | `bool` | 文化节点是否已解锁 |
| <API>player.Culture.getTurnsForNode</API> | playerID, nodeID | `int` | 获取节点所需回合数 |
| <API>player.Culture.getNumWorksInArchive</API> | playerID | `int` | 获取档案中的大作品数量 |
| <API>player.Culture.getArchivedGreatWork</API> | playerID, index | `object` | 获取归档的大作品 |

### Game.ProgressionTrees 全局对象

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Game.ProgressionTrees.revealTree</API> | treeType, playerID | `void` | 为玩家揭示文化树 |
| <API>Game.ProgressionTrees.getTree</API> | playerID, treeType | `object` | 获取玩家文化树对象（含 `.nodes` 数组） |

## 子对象/子系统

| 子系统 | 说明 |
|--------|------|
| `Game.ProgressionTrees` | 全局文化树管理 |
| `GameInfo.ProgressionTrees` | 文化树定义表 |
| `Game.PlayerOperations` | 文化节点授予（`GRANT_TREE_NODE`） |

### Game.ProgressionTrees 详情

```javascript
// 来源 Player.ltp
// 揭示所有文化树
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

### 文化槽位操作

```javascript
// 来源 Player.ltp
// 授予文化槽位
Players.grantCultureSlot(player.id, CultureSlotTypes.POLICY_CULTURE_SLOT, 1);
Players.grantCultureSlot(player.id, CultureSlotTypes.TRADITION_CULTURE_SLOT, 1);

// 授予文化树节点
const args = { ProgressionTreeNodeType: nodeIndex, FullyUnlock: 1 };
Game.PlayerOperations.sendRequest(GameContext.localPlayerID, PlayerOperationTypes.GRANT_TREE_NODE, args);
```

### 传承查询

```javascript
// 来源 Player.ltp
// 检查传承是否已解锁
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
<API id="player.Culture.getChosenIdeology"><h3>player.Culture.getChosenIdeology(playerID)</h3>

**说明**: 获取指定玩家已选择的意识形态。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 玩家 ID |

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
<API id="player.Culture.getGovernmentType"><h3>player.Culture.getGovernmentType(playerID)</h3>

**说明**: 获取指定玩家的政体类型。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 玩家 ID |

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
<API id="player.Culture.getGreatWorkType"><h3>player.Culture.getGreatWorkType(greatWorkID)</h3>

**说明**: 获取指定大作品的类型。

| 参数名 | 类型 | 说明 |
|------|------|------|
| greatWorkID | `int` | 大作品 ID |

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
<API id="player.Culture.get"><h3>player.Culture.get(playerID)</h3>

**说明**: 获取指定玩家的文化对象。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 玩家 ID |

**返回值**: `object`

**使用示例**:

```javascript
// 来源 modules/age-antiquity/ui/tutorial/tutorial-items-antiquity.js
// 通过全局 Players.Culture 获取玩家文化对象
const culture = Players.Culture.get(GameContext.localPlayerID);
if (culture) {
  console.log(culture.getTurnsLeft());
}
```

</API>
<API id="player.Culture.isNodeUnlocked"><h3>player.Culture.isNodeUnlocked(playerID, nodeID)</h3>

**说明**: 检查指定文化节点是否已解锁。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 玩家 ID |
| nodeID | `int` | 节点 ID |

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
<API id="player.Culture.getTurnsForNode"><h3>player.Culture.getTurnsForNode(playerID, nodeID)</h3>

**说明**: 获取指定节点所需的回合数。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 玩家 ID |
| nodeID | `int` | 节点 ID |

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
<API id="player.Culture.getNumWorksInArchive"><h3>player.Culture.getNumWorksInArchive(playerID)</h3>

**说明**: 获取指定玩家档案中的大作品数量。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 玩家 ID |

**返回值**: `int`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/great-works/model-great-works.js
// 获取档案中的大作品数量
const playerCulture = player.Culture;
if (playerCulture) {
  const numWorks = playerCulture.getNumWorksInArchive();
  console.log("档案大作品数: " + numWorks);
}
```

</API>
<API id="player.Culture.getArchivedGreatWork"><h3>player.Culture.getArchivedGreatWork(playerID, index)</h3>

**说明**: 获取指定玩家档案中指定索引的大作品。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 玩家 ID |
| index | `int` | 大作品索引 |

**返回值**: `object`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/great-works/model-great-works.js
// 遍历档案中的大作品
const playerCulture = player.Culture;
if (playerCulture) {
  const numWorks = playerCulture.getNumWorksInArchive();
  for (let i = 0; i < numWorks; i++) {
    const greatWorkIndex = playerCulture.getArchivedGreatWork(i);
    console.log("大作品索引: " + greatWorkIndex);
  }
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