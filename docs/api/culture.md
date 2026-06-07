---
title: Culture 文化
doc_type: system
summary: 文化系统 API，涵盖玩家文化进度查询、文化树节点操作、传承解锁、意识形态和政体管理。
primary_scope:
  - player.Culture
  - Game.Culture
  - Players.Culture
  - Game.ProgressionTrees
related_scope:
  - Players.grantCultureSlot
  - Game.PlayerOperations
  - GameInfo.ProgressionTrees
  - GameInfo.ProgressionTreeNodes
  - GameInfo.ProgressionTreeNodeUnlocks
  - GameInfo.ProgressionTreeNodeTraits
  - GameInfo.Traditions
  - GameInfo.Ideologies
  - GameInfo.Governments
source:
  - TunerPanels/Player.ltp
  - modules/base-standard/ui-next/screens/choosers/culture-chooser/culture-chooser.js
  - modules/base-standard/ui/culture-tree/model-culture-tree.js
  - modules/base-standard/ui/culture-tree/screen-culture-tree.js
  - modules/base-standard/ui/diplo-ribbon/model-diplo-ribbon.js
  - modules/base-standard/ui/policies/model-government.js
  - modules/base-standard/ui/great-works/model-great-works.js
  - modules/base-standard/ui/advice/advice-support.js
  - modules/base-standard/ui/screen-government-picker/screen-government-picker.js
  - modules/age-antiquity/ui/tutorial/tutorial-items-antiquity.js
doc_update: 2026-06-07
---

# Culture 文化

管理玩家文化进度、文化树节点操作、传承解锁、意识形态和政体。`player.Culture` 是主要入口，配合 `Game.ProgressionTrees` 和 `Game.PlayerOperations` 使用。

> **关于 `player` 变量**：本文档中出现的 `player` 均指通过 `Players.get(playerID)` 获取的玩家实例对象，**不是**全局 `Players` 对象。典型用法：`const player = Players.get(GameContext.localPlayerID);`。`player.Culture` 是该玩家实例上的文化子系统，`Players.Culture` 则是全局 `Players` 对象上的静态文化访问器。

```javascript
// 来源 TunerPanels/Player.ltp
// 获取玩家文化对象，遍历可用文化树，揭示并获取节点
const player = Players.get(GameContext.localPlayerID);
const playerCulture = player.Culture;
if (playerCulture) {
    for (let eTree of playerCulture.getAvailableTrees()) {
        const treeInfo = GameInfo.ProgressionTrees.lookup(eTree);
        if (treeInfo) {
            Game.ProgressionTrees.revealTree(eTree.ProgressionTreeType, player.id);
        }
    }
}
```

```javascript
// 来源 modules/base-standard/ui-next/screens/choosers/culture-chooser/culture-chooser.js
// 设置当前文化研究节点
const args = { ProgressionTreeNodeType: nodeIndex };
const result = Game.PlayerOperations.canStart(
    GameContext.localPlayerID,
    PlayerOperationTypes.SET_CULTURE_TREE_NODE,
    args,
    false
);
if (result?.Success) {
    Game.PlayerOperations.sendRequest(
        GameContext.localPlayerID,
        PlayerOperationTypes.SET_CULTURE_TREE_NODE,
        args
    );
}
```

## 方法列表

### player.Culture（玩家文化子系统）

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>player.Culture.getAvailableTrees</API> | — | `array` | 获取当前时代所有可用文化树类型列表 |
| <API>player.Culture.getActiveTree</API> | — | `string` | 获取当前活跃文化树类型标识 |
| <API>player.Culture.getResearching</API> | — | `{type, depth, maxDepth}` | 获取当前正在研究的文化节点信息 |
| <API>player.Culture.getTurnsLeft</API> | — | `int` | 获取当前研究节点剩余回合数 |
| <API>player.Culture.getTurnsForNode</API> | nodeType | `int` | 获取研究指定节点需要的回合数 |
| <API>player.Culture.getNodeCost</API> | nodeType | `int` | 获取研究指定节点需要的文化值总量 |
| <API>player.Culture.getAllAvailableNodeTypes</API> | — | `array` | 获取所有可研究文化节点类型列表 |
| <API>player.Culture.isNodeUnlocked</API> | nodeName | `bool` | 检查指定文化节点是否已解锁 |
| <API>player.Culture.getLastCompletedNodeType</API> | — | `string` | 获取最近完成的文化节点类型 |
| <API>player.Culture.getNumAllCultureSlots</API> | — | `int` | 获取所有文化槽位总数（政策 + 传承） |
| <API>player.Culture.isTraditionUnlocked</API> | traditionIndex | `bool` | 检查指定传承是否已解锁 |
| <API>player.Culture.unlockTradition</API> | traditionIndex | `void` | 解锁指定传承 |
| <API>player.Culture.getChosenIdeology</API> | — | `string` | 获取已选择的意识形态类型 |
| <API>player.Culture.getGovernmentType</API> | — | `string` | 获取当前政体类型 |

### Game.Culture（全局文化方法）

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Game.Culture.getGreatWorkType</API> | greatWorkIndex | `string` | 获取大作品类型标识 |
| <API>Game.Culture.GetCelebrationTypesForGovernment</API> | governmentType | `array` | 获取政体对应的庆典类型列表 |

### Players.Culture（静态访问器）

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Players.Culture.get</API> | playerID | `object` | 获取指定玩家的文化对象（等价于 `Players.get(playerID).Culture`） |

### Game.ProgressionTrees（文化树运行时）

文化树复用了 `ProgressionTrees` 运行时系统，完整方法见 [ProgressionTrees 文档](./progression-trees.md)。常用方法：

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Game.ProgressionTrees.getTree</API> | playerID, treeType | `object` | 获取指定玩家的文化树运行时对象（含 `nodes`、`activeNodeIndex`） |
| <API>Game.ProgressionTrees.getNode</API> | playerID, nodeType | `object` | 获取指定玩家指定节点的运行时数据（含 `state`、`depthUnlocked` 等） |
| <API>Game.ProgressionTrees.revealTree</API> | treeType, playerID | `void` | 为玩家揭示整棵文化树（调试用） |

### Game.PlayerOperations（文化操作）

| 操作类型 | 参数 | 说明 |
|------|------|------|
| `PlayerOperationTypes.SET_CULTURE_TREE_NODE` | `{ProgressionTreeNodeType}` | 设置当前研究的文化节点 |
| `PlayerOperationTypes.SET_CULTURE_TREE_TARGET_NODE` | `{ProgressionTreeNodeType}` | 设置文化树目标节点（自动研究路径） |
| `PlayerOperationTypes.GRANT_TREE_NODE` | `{ProgressionTreeNodeType, FullyUnlock}` | 直接授予文化树节点（调试/测试用） |

### 文化槽位操作

```javascript
// 来源 TunerPanels/Player.ltp
// 授予文化槽位
Players.grantCultureSlot(player.id, CultureSlotTypes.POLICY_CULTURE_SLOT, 1);
Players.grantCultureSlot(player.id, CultureSlotTypes.TRADITION_CULTURE_SLOT, 1);
```

## 事件

| 事件名 | 触发时机 | 说明 |
|------|------|------|
| `CultureTreeChanged` | 文化树变化时 | 节点解锁、研究完成等 |
| `CultureTargetChanged` | 文化目标变化时 | 玩家改变研究目标路径 |
| `CultureNodeCompleted` | 文化节点完成时 | 单个节点研究完成 |
| `CultureYieldChanged` | 文化值产出变化时 | 文化产出值更新 |

```javascript
// 来源 modules/base-standard/ui-next/screens/choosers/culture-chooser/culture-chooser.js
// 监听文化相关事件并刷新
const events = [
    "CultureYieldChanged",
    "CultureTreeChanged",
    "CultureTargetChanged",
    "CultureNodeCompleted",
    "PlayerTurnActivated",
    "LocalPlayerTurnBegin",
    "LocalPlayerChanged"
];
for (const e of events) {
    engine.on(e, listener);
}
```

## 常用枚举

| 枚举 | 说明 |
|------|------|
| `CultureSlotTypes.POLICY_CULTURE_SLOT` | 政策文化槽位 |
| `CultureSlotTypes.TRADITION_CULTURE_SLOT` | 传承文化槽位 |
| `PlayerOperationTypes.SET_CULTURE_TREE_NODE` | 设置文化树研究节点 |
| `PlayerOperationTypes.SET_CULTURE_TREE_TARGET_NODE` | 设置文化树目标节点 |
| `PlayerOperationTypes.GRANT_TREE_NODE` | 授予文化树节点 |

## GameInfo 关联表

| 表名 | 说明 |
|------|------|
| `GameInfo.ProgressionTrees` | 文化树定义表（含 `ProgressionTreeType`、`Name`、`AgeType`、`SystemType`） |
| `GameInfo.ProgressionTreeNodes` | 文化树节点定义表（含 `Name`、`Description`、`ProgressionTree`） |
| `GameInfo.ProgressionTreeNodeUnlocks` | 节点解锁内容表（含 `TargetKind`、`TargetType`、`UnlockDepth`、`Hidden`） |
| `GameInfo.ProgressionTreeNodeTraits` | 节点属性解锁表（按 `ProgressionTreeNodeType` 索引） |
| `GameInfo.Traditions` | 传承定义表（含 `TraditionType`、`Name`、`$index`） |
| `GameInfo.Ideologies` | 意识形态定义表 |
| `GameInfo.Governments` | 政体定义表 |

## 相关全局对象

| 对象 | 说明 |
|------|------|
| `Game.ProgressionTrees` | 科技/文化树运行时系统，详见 [ProgressionTrees 文档](./progression-trees.md) |
| `Game.PlayerOperations` | 玩家操作请求系统，详见 [操作命令文档](./operations-commands.md) |
| `player.Techs` | 玩家科技子系统，文化的科技对应物，详见 [Technology 文档](./technology.md) |

---

<API id="player.Culture.getAvailableTrees"><h3>player.Culture.getAvailableTrees()</h3>

**说明**: 获取当前玩家可用的所有文化树类型列表。可用于 `Game.ProgressionTrees.getTree()` 获取树运行时对象。

**参数**: 无

**返回值**: `array` — 树类型标识字符串数组（如 `["TREE_CIVIC_ANTIQUITY_MAIN", "TREE_CIVIC_ANTIQUITY_SECONDARY"]`）。

**使用示例**:

```javascript
// 来源 TunerPanels/Player.ltp
// 遍历所有可用文化树，揭示并获取节点
const playerCulture = player.Culture;
if (playerCulture) {
    for (let eTree of playerCulture.getAvailableTrees()) {
        const treeInfo = GameInfo.ProgressionTrees.lookup(eTree);
        if (treeInfo) {
            Game.ProgressionTrees.revealTree(eTree.ProgressionTreeType, player.id);
        }
    }
}
```

```javascript
// 来源 modules/base-standard/ui-next/screens/choosers/culture-chooser/culture-chooser.js
// 打开完整文化树视图
const trees = player?.Culture?.getAvailableTrees();
const treeCSV = trees?.join(",");
```

</API>

<API id="player.Culture.getActiveTree"><h3>player.Culture.getActiveTree()</h3>

**说明**: 获取当前活跃的文化树类型标识。可通过 `Game.ProgressionTrees.getTree()` 获取该树的运行时对象。

**参数**: 无

**返回值**: `string` — 树类型标识。

**使用示例**:

```javascript
// 来源 modules/base-standard/ui-next/screens/choosers/culture-chooser/culture-chooser.js
// 获取当前活跃文化树及正在研究的节点
const cultureTreeType = player?.Culture?.getActiveTree();
if (cultureTreeType !== void 0) {
    const treeObject = Game.ProgressionTrees.getTree(player.id, cultureTreeType);
    const activeNode = treeObject?.nodes?.[treeObject.activeNodeIndex];
}
```

```javascript
// 来源 modules/base-standard/ui/sub-system-dock/panel-sub-system-dock.js
// 获取当前活跃文化树并显示子面板
const culture = localPlayer.Culture;
const activeCultureTreeType = culture.getActiveTree();
const treeObject = Game.ProgressionTrees.getTree(localPlayerID, activeCultureTreeType);
```

</API>

<API id="player.Culture.getResearching"><h3>player.Culture.getResearching()</h3>

**说明**: 获取当前正在研究的文化节点信息，包含节点类型、当前深度和最大深度。

**参数**: 无

**返回值**: `{type: string, depth: int, maxDepth: int}` — 当前研究状态：
- `type`: 正在研究的节点类型标识（`-1` 表示无研究）
- `depth`: 当前已解锁的深度层级
- `maxDepth`: 该节点的最大深度层级

**使用示例**:

```javascript
// 来源 TunerPanels/Player.ltp
// 获取当前文化研究进度并显示
const playerCulture = player.Culture;
if (playerCulture) {
    const what = playerCulture.getResearching();
    if (what.type != -1) {
        const entry = GameInfo.ProgressionTreeNodes.lookup(what.type);
        let str = Locale.compose(entry.Name);
        str = str + " (" + (what.depth + 1) + "/" + what.maxDepth + ")";
        str = str + " ... " + playerCulture.getTurnsLeft() + " Turns";
    }
}
```

</API>

<API id="player.Culture.getTurnsLeft"><h3>player.Culture.getTurnsLeft()</h3>

**说明**: 获取当前正在研究的文化节点剩余回合数。

**参数**: 无

**返回值**: `int` — 剩余回合数。

**使用示例**:

```javascript
// 来源 TunerPanels/Player.ltp
// 显示当前文化研究剩余回合数
const turnsLeft = player.Culture?.getTurnsLeft();
const str = nodeName + " ... " + turnsLeft + " Turns";
```

</API>

<API id="player.Culture.getTurnsForNode"><h3>player.Culture.getTurnsForNode(nodeType)</h3>

**说明**: 获取在当前文化产出速率下，研究指定节点需要的回合数。

| 参数名 | 类型 | 说明 |
|------|------|------|
| nodeType | `string` | 节点类型标识 |

**返回值**: `int` — 预计所需回合数。

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/culture-tree/model-culture-tree.js
// 获取节点研究回合数作为树网格显示数据
const turnsCallback = (nodeType) => {
    const player = Players.get(GameContext.localPlayerID);
    const turnsLeft = player ? player.Culture ? player.Culture.getTurnsForNode(nodeType) : 0 : 0;
    return turnsLeft;
};
```

```javascript
// 来源 modules/base-standard/ui-next/screens/choosers/culture-chooser/culture-chooser.js
// 获取文化选择器中节点的回合数
const playerCulture = player?.Culture;
const turns = playerCulture?.getTurnsForNode(nodeType) ?? -1;
```

</API>

<API id="player.Culture.getNodeCost"><h3>player.Culture.getNodeCost(nodeType)</h3>

**说明**: 获取研究指定节点需要的文化值总量。

| 参数名 | 类型 | 说明 |
|------|------|------|
| nodeType | `string` | 节点类型标识 |

**返回值**: `int` — 文化值成本，不可用时返回 `-1`。

**使用示例**:

```javascript
// 来源 modules/base-standard/ui-next/screens/choosers/culture-chooser/culture-chooser.js
// 获取文化选择器中节点的成本
const playerCulture = player?.Culture;
const cost = playerCulture?.getNodeCost(nodeType) ?? -1;
```

</API>

<API id="player.Culture.getAllAvailableNodeTypes"><h3>player.Culture.getAllAvailableNodeTypes()</h3>

**说明**: 获取当前玩家所有可研究的文化节点类型列表。

**参数**: 无

**返回值**: `array` — 节点类型字符串数组。

**使用示例**:

```javascript
// 来源 modules/base-standard/ui-next/screens/choosers/culture-chooser/culture-chooser.js
// 获取所有可用文化节点并构建选择器列表
const available = player?.Culture?.getAllAvailableNodeTypes?.();
if (!available) return out;
const activeNodeType = getActiveCultureNodeType(player);
for (const nodeType of available) {
    const isActiveResearch = nodeType === activeNodeType;
    const node = buildCultureNodeData(player, nodeType, isActiveResearch);
    if (node) out.push(node);
}
```

</API>

<API id="player.Culture.isNodeUnlocked"><h3>player.Culture.isNodeUnlocked(nodeName)</h3>

**说明**: 检查指定文化节点是否已解锁。

| 参数名 | 类型 | 说明 |
|------|------|------|
| nodeName | `string` | 节点名称（如 `"NODE_CIVIC_AQ_MAIN_CHIEFDOM"`） |

**返回值**: `bool` — 已解锁返回 `true`。

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/advice/advice-support.js
// 检查文化节点是否已解锁以提供建议
const playerCulture = player.Culture;
if (playerCulture) {
    if (playerCulture.isNodeUnlocked("NODE_CIVIC_AQ_MAIN_CHIEFDOM")) {
        // 该文化节点已解锁
    }
}
```

```javascript
// 来源 modules/age-antiquity/ui/tutorial/tutorial-items-antiquity.js
// 检查特定文化节点是否已完成
if (player.Culture.isNodeUnlocked("NODE_CIVIC_AQ_MAIN_MYSTICISM")) {
    // Mysticism 文化节点已解锁
}
```

</API>

<API id="player.Culture.getLastCompletedNodeType"><h3>player.Culture.getLastCompletedNodeType()</h3>

**说明**: 获取最近完成的文化节点类型标识。

**参数**: 无

**返回值**: `string` — 节点类型标识，无已完成节点时返回 `undefined`。

**使用示例**:

```javascript
// 来源 modules/age-antiquity/ui/tutorial/tutorial-items-antiquity.js
// 获取最近完成的节点类型并查询定义
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

**返回值**: `int` — 文化槽位总数。

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

**返回值**: `bool` — 已解锁返回 `true`。

**使用示例**:

```javascript
// 来源 TunerPanels/Player.ltp
// 遍历所有传承，检查解锁状态
const playerCulture = player.Culture;
if (playerCulture) {
    for (const tradition of GameInfo.Traditions) {
        if (playerCulture.isTraditionUnlocked(tradition.$index)) {
            console.log(tradition.TraditionType + " 已解锁");
        }
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
// 来源 TunerPanels/Player.ltp
// 解锁选中的传承
const playerCulture = player.Culture;
if (playerCulture) {
    playerCulture.unlockTradition(g_TunerState.PlayerPanel.selectedTradition);
}
```

</API>

<API id="player.Culture.getChosenIdeology"><h3>player.Culture.getChosenIdeology()</h3>

**说明**: 获取当前玩家已选择的意识形态类型标识。

**参数**: 无

**返回值**: `string` — 意识形态类型标识，可用 `GameInfo.Ideologies.lookup()` 查询定义。

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/diplo-ribbon/model-diplo-ribbon.js
// 获取玩家意识形态并查询定义
const ideology = player.Culture?.getChosenIdeology();
const ideologyDef = GameInfo.Ideologies.lookup(ideology);
if (ideologyDef) {
    console.log(Locale.compose(ideologyDef.Name));
}
```

```javascript
// 来源 modules/base-standard/ui-next/screens/victories/victories-screen-model.js
// 比较意识形态用于胜利条件判断
const ideology = player.Culture.getChosenIdeology();
const ideologyDef = GameInfo.Ideologies.lookup(ideology);
```

</API>

<API id="player.Culture.getGovernmentType"><h3>player.Culture.getGovernmentType()</h3>

**说明**: 获取当前玩家的政体类型标识。

**参数**: 无

**返回值**: `string` — 政体类型标识，可用 `GameInfo.Governments.lookup()` 查询定义。

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

```javascript
// 来源 modules/base-standard/ui/celebration-chooser/panel-celebration-chooser.js
// 获取政体对应的庆典类型
const governmentType = playerObject.Culture.getGovernmentType();
```

</API>

<API id="Game.Culture.getGreatWorkType"><h3>Game.Culture.getGreatWorkType(greatWorkIndex)</h3>

**说明**: 获取指定大作品索引对应的类型标识。

| 参数名 | 类型 | 说明 |
|------|------|------|
| greatWorkIndex | `int` | 大作品索引 |

**返回值**: `string` — 大作品类型标识，可用 `GameInfo.GreatWorks.lookup()` 查询定义。

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

**返回值**: `array` — 庆典类型标识数组。

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

**说明**: 获取指定玩家的文化对象。这是 `Players.Culture` 静态方法，等价于 `Players.get(playerID).Culture`。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 玩家 ID |

**返回值**: `object` — 玩家文化对象。

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

<API id="Game.ProgressionTrees.getTree"><h3>Game.ProgressionTrees.getTree(playerID, treeType)</h3>

**说明**: 获取指定玩家的文化树运行时对象。配合 `player.Culture.getActiveTree()` 或 `player.Culture.getAvailableTrees()` 使用。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 玩家 ID |
| treeType | `string` | 树类型标识（由 `player.Culture.getActiveTree()` 获得） |

**返回值**: `object` — 树运行时对象，包含 `nodes` 数组、`activeNodeIndex`、`playerId` 等。

**使用示例**:

```javascript
// 来源 modules/base-standard/ui-next/screens/choosers/culture-chooser/culture-chooser.js
// 获取文化树并遍历节点
const treeObject = Game.ProgressionTrees.getTree(player.id, cultureTreeType);
if (treeObject) {
    for (const node of treeObject.nodes) {
        const nodeInfo = GameInfo.ProgressionTreeNodes.lookup(node.nodeType);
        console.log(Locale.compose(nodeInfo.Name));
    }
}
```

</API>

<API id="Game.ProgressionTrees.getNode"><h3>Game.ProgressionTrees.getNode(playerID, nodeType)</h3>

**说明**: 获取指定玩家在指定文化节点上的运行时数据对象。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 玩家 ID |
| nodeType | `string` | 节点类型标识 |

**返回值**: `object` — 节点运行时数据，包含 `nodeType`、`state`、`depthUnlocked`、`progress`、`unlockIndices` 等属性。

**使用示例**:

```javascript
// 来源 modules/base-standard/ui-next/screens/choosers/culture-chooser/culture-chooser.js
// 获取节点数据，提取解锁信息
const nodeData = Game.ProgressionTrees.getNode(player.id, nodeType);
const nodeDef = GameInfo.ProgressionTreeNodes.lookup(nodeType);
if (!nodeDef || !nodeData) return null;
for (const idx of nodeData.unlockIndices) {
    const unlockInfo = GameInfo.ProgressionTreeNodeUnlocks[idx];
    // 处理解锁内容
}
```

</API>

<API id="Game.ProgressionTrees.revealTree"><h3>Game.ProgressionTrees.revealTree(treeType, playerID)</h3>

**说明**: 为指定玩家揭示整棵文化树（调试用，使所有节点可见）。

| 参数名 | 类型 | 说明 |
|------|------|------|
| treeType | `string` | 文化树类型标识 |
| playerID | `int` | 玩家 ID |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 TunerPanels/Player.ltp
// 揭示当前时代所有文化树
const currentAge = GameInfo.Ages.lookup(Game.age);
for (let eTree of GameInfo.ProgressionTrees) {
    if (eTree.SystemType === 'SYSTEM_CULTURE' && eTree.AgeType == currentAge.AgeType) {
        Game.ProgressionTrees.revealTree(eTree.ProgressionTreeType, player.id);
    }
}
```

</API>