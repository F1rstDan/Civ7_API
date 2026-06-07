---
title: Technology 科技
doc_type: system
summary: 科技树的研究状态、节点解锁、回合计算和科技值管理。通过 player.Techs 访问，并配合 Game.ProgressionTrees 和 PlayerOperations 操作科技树。
primary_scope:
  - player.Techs
  - Game.ProgressionTrees
related_scope:
  - Game.PlayerOperations
  - GameInfo.ProgressionTreeNodes
  - GameInfo.ProgressionTreeNodeUnlocks
source:
  - TunerPanels/Player.ltp
  - modules/base-standard/ui/tech-tree/model-tech-tree.js
  - modules/base-standard/ui/tech-tree/screen-tech-tree.js
  - modules/base-standard/ui-next/screens/choosers/tech-chooser/tech-chooser.js
  - modules/base-standard/ui/tree-grid/tree-grid.js
  - modules/base-standard/ui/advice/advice-support.js
  - modules/base-standard/ui/tutorial/tutorial-support.js
  - modules/base-standard/ui/notification-train/notification-handlers.js
doc_update: 2026-06-07
---

# Technology 科技

管理玩家科技树的研究进度、节点解锁、回合预估和科技值产出。`player.Techs` 是核心入口，与 `Game.ProgressionTrees` 和 `Game.PlayerOperations` 配合使用。

```javascript
// 来源 TunerPanels/Player.ltp
// 获取当前科技树，遍历所有节点，查看研究与解锁状态
const player = Players.get(GameContext.localPlayerID);
const playerTechs = player.Techs;
const eTree = playerTechs.getTreeType();
const treeObject = Game.ProgressionTrees.getTree(player.id, eTree);
if (treeObject) {
    for (const node of treeObject.nodes) {
        const nodeInfo = GameInfo.ProgressionTreeNodes.lookup(node.nodeType);
        console.log(Locale.compose(nodeInfo.Name));
    }
}
```

```javascript
// 来源 modules/base-standard/ui-next/screens/choosers/tech-chooser/tech-chooser.js
// 设置当前研究节点
const args = { ProgressionTreeNodeType: nodeIndex };
const result = Game.PlayerOperations.canStart(
    GameContext.localPlayerID,
    PlayerOperationTypes.SET_TECH_TREE_NODE,
    args,
    false
);
if (result?.Success) {
    Game.PlayerOperations.sendRequest(
        GameContext.localPlayerID,
        PlayerOperationTypes.SET_TECH_TREE_NODE,
        args
    );
}
```

## 方法列表

### player.Techs（玩家科技子系统）

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>player.Techs.getTreeType</API> | — | `string` | 获取当前时代的科技树类型标识（如 `"TREE_TECH_ANTIQUITY"`） |
| <API>player.Techs.getResearching</API> | — | `{type, depth, maxDepth}` | 获取当前正在研究的节点信息 |
| <API>player.Techs.getTurnsLeft</API> | — | `int` | 获取当前研究节点剩余回合数 |
| <API>player.Techs.getTurnsForNode</API> | nodeType | `int` | 获取研究指定节点需要的回合数 |
| <API>player.Techs.getNodeCost</API> | nodeType | `int` | 获取研究指定节点需要的科技值总量 |
| <API>player.Techs.isNodeUnlocked</API> | nodeType | `bool` | 检查指定节点是否已解锁 |
| <API>player.Techs.getAllAvailableNodeTypes</API> | — | `array` | 获取所有可研究节点类型列表 |

### Game.ProgressionTrees（树运行时，科技树相关）

科技树复用了 `ProgressionTrees` 运行时系统，完整方法见 [ProgressionTrees 文档](./progression-trees.md)。常用方法：

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Game.ProgressionTrees.getTree</API> | playerID, treeType | `object` | 获取指定玩家的科技树运行时对象（含 `nodes`、`activeNodeIndex`） |
| <API>Game.ProgressionTrees.getNode</API> | playerID, nodeType | `object` | 获取指定玩家指定节点的运行时数据（含 `state`、`depthUnlocked` 等） |
| <API>Game.ProgressionTrees.getNodeState</API> | playerID, nodeType | `int` | 获取节点状态，返回 `ProgressionTreeNodeState` 枚举值 |

### Game.PlayerOperations（科技操作）

| 操作类型 | 参数 | 说明 |
|------|------|------|
| `PlayerOperationTypes.SET_TECH_TREE_NODE` | `{ProgressionTreeNodeType}` | 设置当前研究的科技节点 |
| `PlayerOperationTypes.SET_TECH_TREE_TARGET_NODE` | `{ProgressionTreeNodeType}` | 设置科技树目标节点（自动研究路径） |
| `PlayerOperationTypes.GRANT_TREE_NODE` | `{ProgressionTreeNodeType, FullyUnlock}` | 直接授予科技节点（调试/测试用） |

## 事件

| 事件名 | 触发时机 | 说明 |
|------|------|------|
| `TechTreeChanged` | 科技树变化时 | 节点解锁、研究完成等 |
| `TechTargetChanged` | 科技目标变化时 | 玩家改变研究目标路径 |
| `TechNodeCompleted` | 科技节点完成时 | 单个节点研究完成 |
| `ScienceYieldChanged` | 科技值产出变化时 | 科技产出值更新 |

```javascript
// 来源 modules/base-standard/ui-next/screens/choosers/tech-chooser/tech-chooser.js
// 监听科技相关事件并刷新
const events = [
    "ScienceYieldChanged",
    "TechTreeChanged",
    "TechTargetChanged",
    "TechNodeCompleted",
    "PlayerTurnActivated",
    "LocalPlayerTurnBegin",
    "LocalPlayerChanged"
];
for (const e of events) {
    engine.on(e, listener);
}
```

## 常用枚举

### ProgressionTreeNodeState

| 值 | 说明 |
|------|------|
| `NODE_STATE_INVALID` | 无效 |
| `NODE_STATE_CLOSED` | 关闭/锁定 |
| `NODE_STATE_OPEN` | 开放（可研究） |
| `NODE_STATE_IN_PROGRESS` | 研究中 |
| `NODE_STATE_UNLOCKED` | 已解锁 |
| `NODE_STATE_FULLY_UNLOCKED` | 完全解锁（含大师属性） |

## GameInfo 关联表

| 表名 | 说明 |
|------|------|
| `GameInfo.ProgressionTrees` | 树定义表（含 `ProgressionTreeType`、`Name`、`AgeType`、`SystemType`） |
| `GameInfo.ProgressionTreeNodes` | 树节点定义表（含 `Name`、`Description`、`ProgressionTree`） |
| `GameInfo.ProgressionTreeNodeUnlocks` | 节点解锁内容表（含 `TargetKind`、`TargetType`、`UnlockDepth`） |

## 相关全局对象

| 对象 | 说明 |
|------|------|
| `Game.ProgressionTrees` | 科技/文化树运行时系统，详见 [ProgressionTrees 文档](./progression-trees.md) |
| `Game.PlayerOperations` | 玩家操作请求系统，详见 [操作命令文档](./operations-commands.md) |
| `player.Culture` | 玩家文化子系统，科技的文化对应物，接口类似 |

---

<API id="player.Techs.getTreeType"><h3>player.Techs.getTreeType()</h3>

**说明**: 获取当前时代玩家的科技树类型标识。可用于 `Game.ProgressionTrees.getTree()` 获取树运行时对象。

**参数**: 无

**返回值**: `string` — 树类型标识（如 `"TREE_TECH_ANTIQUITY"`、`"TREE_TECH_EXPLORATION"`、`"TREE_TECH_MODERN"`）。

**使用示例**:

```javascript
// 来源 TunerPanels/Player.ltp
// 获取当前科技树类型并遍历所有节点
const playerTechs = player.Techs;
const eTree = playerTechs.getTreeType();
const treeInfo = GameInfo.ProgressionTrees.lookup(eTree);
if (treeInfo) {
    for (let nodeInfo of GameInfo.ProgressionTreeNodes) {
        if (nodeInfo.ProgressionTree == treeInfo.ProgressionTreeType) {
            console.log(nodeInfo.Name);
        }
    }
}
```

```javascript
// 来源 modules/base-standard/ui/tech-tree/screen-tech-tree.js
// 检查科技树是否可用
const availableTechTree = player.Techs?.getTreeType();
if (availableTechTree == void 0) {
    // 该时代没有科技树
}
```

</API>

<API id="player.Techs.getResearching"><h3>player.Techs.getResearching()</h3>

**说明**: 获取当前正在研究的节点信息，包含节点类型、当前深度和最大深度。

**参数**: 无

**返回值**: `{type: string, depth: int, maxDepth: int}` — 当前研究状态：
- `type`: 正在研究的节点类型标识
- `depth`: 当前已解锁的深度层级
- `maxDepth`: 该节点的最大深度层级

**使用示例**:

```javascript
// 来源 TunerPanels/Player.ltp
// 获取当前研究进度并显示
const playerTechs = player.Techs;
const nodeState = playerTechs.getResearching();
const nodeInfo = GameInfo.ProgressionTreeNodes.lookup(nodeState.type);
let str = "";
if (nodeInfo) {
    str = Locale.compose(nodeInfo.Name);
}
str = str + " (" + (nodeState.depth + 1) + "/" + nodeState.maxDepth + ")";
str = str + " ... " + playerTechs.getTurnsLeft() + " Turns";
```

```javascript
// 来源 TunerPanels/Player.ltp
// 判断当前节点是否为指定节点
const researching = playerTechs.getResearching();
if (researching.type == node.type) {
    // 当前节点正在研究中
}
```

</API>

<API id="player.Techs.getTurnsLeft"><h3>player.Techs.getTurnsLeft()</h3>

**说明**: 获取当前正在研究的节点剩余回合数。

**参数**: 无

**返回值**: `int` — 剩余回合数。

**使用示例**:

```javascript
// 来源 TunerPanels/Player.ltp
// 显示当前研究剩余回合数
const str = nodeName + " ... " + playerTechs.getTurnsLeft() + " Turns";
```

</API>

<API id="player.Techs.getTurnsForNode"><h3>player.Techs.getTurnsForNode(nodeType)</h3>

**说明**: 获取从当前科技产出速率下，研究指定节点需要的回合数。

| 参数名 | 类型 | 说明 |
|------|------|------|
| nodeType | `string` | 节点类型标识 |

**返回值**: `int` — 预计所需回合数，研究不可用时返回 `-1`。

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/tech-tree/model-tech-tree.js
// 获取节点研究回合数作为树网格显示数据
const turnsCallback = (nodeType) => {
    const player = Players.get(GameContext.localPlayerID);
    const turnsLeft = player ? player.Techs ? player.Techs.getTurnsForNode(nodeType) : 0 : 0;
    return turnsLeft;
};
```

```javascript
// 来源 modules/base-standard/ui-next/screens/choosers/tech-chooser/tech-chooser.js
// 获取科技选择器中节点的回合数
const playerTechs = player?.Techs;
const turns = playerTechs?.getTurnsForNode(nodeType) ?? -1;
```

</API>

<API id="player.Techs.getNodeCost"><h3>player.Techs.getNodeCost(nodeType)</h3>

**说明**: 获取研究指定节点需要的科技值总量。

| 参数名 | 类型 | 说明 |
|------|------|------|
| nodeType | `string` | 节点类型标识 |

**返回值**: `int` — 科技值成本，不可用时返回 `null`。

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/tech-tree/model-tech-tree.js
// 获取节点科技值成本用于树网格显示
const techs = localPlayer.Techs;
if (!techs) {
    return null;
}
const cost = techs.getNodeCost(nodeType);
```

```javascript
// 来源 modules/base-standard/ui-next/screens/choosers/tech-chooser/tech-chooser.js
// 获取科技选择器中节点的成本
const playerTechs = player?.Techs;
const cost = playerTechs?.getNodeCost(nodeType) ?? -1;
```

</API>

<API id="player.Techs.isNodeUnlocked"><h3>player.Techs.isNodeUnlocked(nodeType)</h3>

**说明**: 检查指定科技节点是否已解锁。

| 参数名 | 类型 | 说明 |
|------|------|------|
| nodeType | `string` | 节点类型标识（如 `"NODE_TECH_AQ_AGRICULTURE"`） |

**返回值**: `bool` — 已解锁返回 `true`。

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/advice/advice-support.js
// 检查科技是否已解锁以提供建议
if (playerTechs.isNodeUnlocked(techName)) {
    // 该科技已解锁，可提供建
}
```

```javascript
// 来源 modules/base-standard/ui-next/screens/victories/victories-screen-model.js
// 检查特定科技是否已完成
const rocketryResearched = playerTechs.isNodeUnlocked("NODE_TECH_MO_ROCKETRY");
```

</API>

<API id="player.Techs.getAllAvailableNodeTypes"><h3>player.Techs.getAllAvailableNodeTypes()</h3>

**说明**: 获取当前玩家所有可研究的科技节点类型列表。

**参数**: 无

**返回值**: `array` — 节点类型字符串数组。

**使用示例**:

```javascript
// 来源 modules/base-standard/ui-next/screens/choosers/tech-chooser/tech-chooser.js
// 获取所有可用科技节点并构建选择器列表
const available = player?.Techs?.getAllAvailableNodeTypes?.();
if (!available) return out;
const activeNodeType = getActiveNodeType(player);
for (const nodeType of available) {
    const isActiveResearch = nodeType === activeNodeType;
    const node = buildTechNodeData(player, nodeType, isActiveResearch);
    if (node) out.push(node);
}
```

</API>

<API id="Game.ProgressionTrees.getTree"><h3>Game.ProgressionTrees.getTree(playerID, treeType)</h3>

**说明**: 获取指定玩家在指定树上的完整运行时对象。配合 `player.Techs.getTreeType()` 使用。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 玩家 ID |
| treeType | `string` | 树类型标识（由 `player.Techs.getTreeType()` 获得） |

**返回值**: `object` — 树运行时对象，包含：
- `nodes`: 节点数组，每个节点含 `nodeType`、`state`、`depthUnlocked`、`progress` 等
- `activeNodeIndex`: 当前正在研究的节点在 `nodes` 数组中的索引
- `playerId`: 所属玩家 ID

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/tutorial/tutorial-support.js
// 获取科技树并检查节点解锁状态
const techs = player.Techs;
const techTreeType = techs.getTreeType();
const techTree = Game.ProgressionTrees.getTree(playerId, techTreeType);
if (techTree) {
    const hasUnlocked = techTree.nodes.some(callback);
}
```

```javascript
// 来源 modules/base-standard/ui/sub-system-dock/panel-sub-system-dock.js
// 获取当前活跃研究节点
const techs = localPlayer.Techs;
const techTreeType = techs.getTreeType();
const treeObject = Game.ProgressionTrees.getTree(localPlayerID, techTreeType);
```

</API>

<API id="Game.ProgressionTrees.getNode"><h3>Game.ProgressionTrees.getNode(playerID, nodeType)</h3>

**说明**: 获取指定玩家在指定节点上的运行时数据对象。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 玩家 ID |
| nodeType | `string` | 节点类型标识 |

**返回值**: `object` — 节点运行时数据，包含 `nodeType`、`state`、`depthUnlocked`、`progress`、`unlockIndices` 等属性。

**使用示例**:

```javascript
// 来源 modules/base-standard/ui-next/screens/choosers/tech-chooser/tech-chooser.js
// 获取节点数据，提取解锁信息和图标
const nodeData = Game.ProgressionTrees.getNode(player.id, nodeType);
const nodeDef = GameInfo.ProgressionTreeNodes.lookup(nodeType);
if (!nodeDef || !nodeData) return null;
for (const idx of nodeData.unlockIndices) {
    const unlockInfo = GameInfo.ProgressionTreeNodeUnlocks[idx];
    // 处理解锁内容
}
```
</API>

<API id="Game.ProgressionTrees.getNodeState"><h3>Game.ProgressionTrees.getNodeState(playerID, nodeType)</h3>

**说明**: 获取节点状态枚举值，用于判断节点是否可研究、已解锁等。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 玩家 ID |
| nodeType | `string` | 节点类型标识 |

**返回值**: `int` — `ProgressionTreeNodeState` 枚举值。

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/tree-grid/tree-grid.js
// 判断节点各状态用于渲染科技树卡片
const nodeState = Game.ProgressionTrees.getNodeState(this._player, structureNodeData.nodeType);
const card = {
    isCurrent: nodeState === ProgressionTreeNodeState.NODE_STATE_IN_PROGRESS,
    isCompleted: nodeState === ProgressionTreeNodeState.NODE_STATE_FULLY_UNLOCKED,
};
```
</API>