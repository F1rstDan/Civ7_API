---
title: ProgressionTrees 科技文化树
---

# ProgressionTrees 科技文化树

管理科技树与文化树的节点解锁、状态查询和树结构遍历。

## 快速示例

```javascript
// 来源 TunerPanels/Player.ltp
// 获取玩家的科技树对象，遍历所有节点
const player = Players.get(g_TunerState.PlayerPanel.selectedPlayer);
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

## 方法列表

### Game.ProgressionTrees（游戏运行时）

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>ProgressionTrees.getNode</API> | playerID, nodeType | `object` | 获取指定玩家指定节点的运行时数据（含 `state`、`depthUnlocked` 等） |
| <API>ProgressionTrees.getTree</API> | playerID, treeType | `object` | 获取指定玩家的树对象（含 `nodes` 数组、`activeNodeIndex`、`playerId`） |
| <API>ProgressionTrees.getTreeStructure</API> | treeType | `array` | 获取树的结构定义（含 `nodeType`、`connectedNodeTypes` 等） |
| <API>ProgressionTrees.getNodeState</API> | playerID, nodeType | `int` | 获取节点状态，返回 `ProgressionTreeNodeState` 枚举值 |
| <API>ProgressionTrees.canEverUnlock</API> | playerID, nodeType | `{isLocked}` | 检查节点是否因传说路径等原因被永久锁定 |
| <API>ProgressionTrees.hasLegendUnlocked</API> | playerID, nodeType | `{isLocked}` | 检查节点是否因传说未解锁而锁定 |
| <API>ProgressionTrees.getLegendAttributeNodeLockedString</API> | playerID, nodeType | `string` | 获取传说锁定提示的本地化键 |
| <API>ProgressionTrees.revealTree</API> | treeType, playerID | `void` | 对指定玩家揭示整棵科技/文化树 |

### GameInfo.ProgressionTrees（静态数据）

| 属性/方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>ProgressionTrees.lookup</API> | treeType | `object` | 按 `ProgressionTreeType` 查找树定义（返回 `Name`、`AgeType`、`SystemType` 等） |
| <API>ProgressionTrees.find</API> | predicate | `object` | 按条件查找树定义 |
| `GameInfo.ProgressionTrees` | — | 可迭代 | 遍历所有树定义 |

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
| `GameInfo.ProgressionTrees` | 树定义表 |
| `GameInfo.ProgressionTreeNodes` | 树节点定义表 |

## 相关全局对象

| 对象 | 说明 |
|------|------|
| `player.Techs` | 玩家科技子系统，`getTreeType()` 获取当前科技树类型 |
| `player.Culture` | 玩家文化子系统，`getAvailableTrees()` 获取可用文化树列表 |
| `GameInfo.ProgressionTreeNodes` | 静态节点数据（`Name`、`Description`、`ProgressionTree` 等） |

## 源文件引用

- `TunerPanels/Player.ltp`
- `modules/base-standard/ui/tree-grid/tree-grid.js`
- `modules/base-standard/ui/tutorial/tutorial-support.js`
- `modules/base-standard/ui/tutorial/tutorial-items-all-ages.js`
- `modules/base-standard/ui/tech-tree/model-tech-tree.js`
- `modules/base-standard/ui/culture-tree/model-culture-tree.js`
- `modules/base-standard/ui/production-chooser/production-chooser-helpers.js`
- `modules/base-standard/ui/tech-civic-complete/screen-tech-civic-complete.js`
- `modules/base-standard/ui/attribute-trees/model-attribute-trees.js`
- `modules/base-standard/ui/sub-system-dock/panel-sub-system-dock.js`
- `modules/base-standard/ui-next/screens/choosers/tech-chooser/tech-chooser.js`
- `modules/base-standard/ui-next/screens/choosers/culture-chooser/culture-chooser.js`
---

<API id="ProgressionTrees.getNode" title="ProgressionTrees.getNode(playerID, nodeType)">

**说明**: 获取指定玩家在指定节点上的运行时数据对象。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 玩家 ID |
| nodeType | `string` | 节点类型标识（如 `"NODE_CIVIC_AQ_SYNCRETISM_CHOICE"`） |

**返回值**: `object` — 节点运行时数据，包含 `nodeType`、`state`、`depthUnlocked` 等属性。

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/tech-civic-complete/screen-tech-civic-complete.js
// 根据静态数据获取运行时节点对象
const node = Game.ProgressionTrees.getNode(
    GameContext.localPlayerID,
    this.popupData.node.ProgressionTreeNodeType
);
```

```javascript
// 来源 modules/base-standard/ui/tutorial/tutorial-items-all-ages.js
// 按时代获取不同的 syncretism 节点
let syncretismNode;
if (currentAge?.AgeType == "AGE_ANTIQUITY") {
    syncretismNode = Game.ProgressionTrees.getNode(player.id, "NODE_CIVIC_AQ_SYNCRETISM_CHOICE");
} else if (currentAge?.AgeType == "AGE_EXPLORATION") {
    syncretismNode = Game.ProgressionTrees.getNode(player.id, "NODE_CIVIC_EX_SYNCRETISM_CHOICE");
} else {
    syncretismNode = Game.ProgressionTrees.getNode(player.id, "NODE_CIVIC_MO_SYNCRETISM_CHOICE");
}
```

**来源**: modules/base-standard/ui/tech-civic-complete/screen-tech-civic-complete.js、tutorial-items-all-ages.js

</API>

<API id="ProgressionTrees.getTree" title="ProgressionTrees.getTree(playerID, treeType)">

**说明**: 获取指定玩家在指定树上的完整运行时对象。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 玩家 ID |
| treeType | `string` | 树类型标识（如 `"TREE_TECH_ANTIQUITY"`） |

**返回值**: `object` — 树运行时对象，包含：
- `nodes`: 节点数组
- `activeNodeIndex`: 当前正在研究的节点索引
- `playerId`: 所属玩家 ID

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/tutorial/tutorial-support.js
// 获取玩家的科技树并遍历节点
const playerTechs = player.Techs;
const techTreeType = playerTechs.getTreeType();
const techTree = Game.ProgressionTrees.getTree(playerId, techTreeType);
if (techTree) {
    const hasUnlocked = techTree.nodes.some(callback);
}
```

```javascript
// 来源 modules/base-standard/ui/sub-system-dock/panel-sub-system-dock.js
// 获取当前活跃文化树及正在研究的节点
const culture = localPlayer.Culture;
const activeCultureTreeType = culture.getActiveTree();
const treeObject = Game.ProgressionTrees.getTree(localPlayerID, activeCultureTreeType);
if (treeObject && treeObject.activeNodeIndex >= 0) {
    const activeNode = treeObject.nodes[treeObject.activeNodeIndex];
}
```

**来源**: modules/base-standard/ui/tutorial/tutorial-support.js、panel-sub-system-dock.js

</API>

<API id="ProgressionTrees.getTreeStructure" title="ProgressionTrees.getTreeStructure(treeType)">

**说明**: 获取树的结构定义，返回所有节点的结构信息（含连接关系）。

| 参数名 | 类型 | 说明 |
|------|------|------|
| treeType | `string` | 树类型标识 |

**返回值**: `array` — 结构节点数组，每个元素含 `nodeType`、`connectedNodeTypes` 等属性。

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/tree-grid/tree-grid.js
// 获取树结构用于构建树形网格布局
const treeStructureNodes = Game.ProgressionTrees.getTreeStructure(this._sourceProgressionTree);
const contentTreeStructureNodes = treeStructureNodes.filter((structureNodeData) => {
    const contentVal = Game.ProgressionTrees.canEverUnlock(localPlayerID, structureNodeData.nodeType);
    return !contentVal.isLocked;
});
```

**来源**: modules/base-standard/ui/tree-grid/tree-grid.js

</API>

<API id="ProgressionTrees.getNodeState" title="ProgressionTrees.getNodeState(playerID, nodeType)">

**说明**: 获取节点状态枚举值，用于判断节点是否可研究、已解锁等。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 玩家 ID |
| nodeType | `string` | 节点类型标识 |

**返回值**: `int` — `ProgressionTreeNodeState` 枚举值。

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/production-chooser/production-chooser-helpers.js
// 判断节点是否可解锁
const CanPlayerUnlockNode = (nodeType, playerId) => {
    if (!nodeType) return false;
    const nodeState = Game.ProgressionTrees.getNodeState(playerId, nodeType);
    return nodeState >= ProgressionTreeNodeState.NODE_STATE_OPEN;
};
```

```javascript
// 来源 modules/base-standard/ui/tree-grid/tree-grid.js
// 判断节点各状态用于渲染
const nodeState = Game.ProgressionTrees.getNodeState(this._player, structureNodeData.nodeType);
const card = {
    isCurrent: nodeState === ProgressionTreeNodeState.NODE_STATE_IN_PROGRESS,
    isCompleted: nodeState === ProgressionTreeNodeState.NODE_STATE_FULLY_UNLOCKED,
};
```

**来源**: modules/base-standard/ui/production-chooser/production-chooser-helpers.js、tree-grid.js

</API>

<API id="ProgressionTrees.canEverUnlock" title="ProgressionTrees.canEverUnlock(playerID, nodeType)">

**说明**: 检查节点是否因传说路径等原因被永久锁定。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 玩家 ID |
| nodeType | `string` | 节点类型标识 |

**返回值**: `{isLocked: bool}` — `isLocked` 为 `true` 表示该节点无法解锁。

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/tree-grid/tree-grid.js
// 过滤掉永久锁定的节点
const contentVal = Game.ProgressionTrees.canEverUnlock(localPlayerID, structureNodeData.nodeType);
if (contentVal.isLocked) {
    lockedNodes.push(structureNodeData.nodeType);
}
```

**来源**: modules/base-standard/ui/tree-grid/tree-grid.js

</API>

<API id="ProgressionTrees.hasLegendUnlocked" title="ProgressionTrees.hasLegendUnlocked(playerID, nodeType)">

**说明**: 检查节点是否因传说未解锁而处于锁定状态。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 玩家 ID |
| nodeType | `string` | 节点类型标识 |

**返回值**: `{isLocked: bool}` — `isLocked` 为 `true` 表示传说未解锁该节点。

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/tree-grid/tree-grid.js
// 检查传说锁定并获取提示文本
if (Game.ProgressionTrees.hasLegendUnlocked(this._player, structureNodeData.nodeType).isLocked) {
    lockedReason = Locale.compose(
        Game.ProgressionTrees.getLegendAttributeNodeLockedString(this._player, structureNodeData.nodeType)
    ) || "";
}
```

**来源**: modules/base-standard/ui/tree-grid/tree-grid.js

</API>

<API id="ProgressionTrees.getLegendAttributeNodeLockedString" title="ProgressionTrees.getLegendAttributeNodeLockedString(playerID, nodeType)">

**说明**: 获取因传说锁定而显示的本地化提示键。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 玩家 ID |
| nodeType | `string` | 节点类型标识 |

**返回值**: `string` — 本地化键，可用 `Locale.compose()` 解析。

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/tree-grid/tree-grid.js
// 获取传说锁定提示文本
const lockedReason = Locale.compose(
    Game.ProgressionTrees.getLegendAttributeNodeLockedString(this._player, structureNodeData.nodeType)
) || "";
```

**来源**: modules/base-standard/ui/tree-grid/tree-grid.js

</API>

<API id="ProgressionTrees.revealTree" title="ProgressionTrees.revealTree(treeType, playerID)">

**说明**: 对指定玩家揭示整棵科技/文化树（调试用，使所有节点可见）。

| 参数名 | 类型 | 说明 |
|------|------|------|
| treeType | `string` | 树类型标识 |
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

**来源**: TunerPanels/Player.ltp

</API>

<API id="ProgressionTrees.lookup" title="GameInfo.ProgressionTrees.lookup(treeType)">

**说明**: 按 `ProgressionTreeType` 查找静态树定义。

| 参数名 | 类型 | 说明 |
|------|------|------|
| treeType | `string` | 树类型标识 |

**返回值**: `object` — 树定义，含 `ProgressionTreeType`、`Name`、`AgeType`、`SystemType` 等属性。

**使用示例**:

```javascript
// 来源 TunerPanels/Player.ltp
// 查找树定义以获取节点列表
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
// 来源 modules/base-standard/ui/civilopedia/civilopedia-sidebar-panels.js
// 获取百科中的树名称
const progressionTree = GameInfo.ProgressionTrees.lookup(nodeInfo.ProgressionTree);
```

**来源**: TunerPanels/Player.ltp、modules/base-standard/ui/civilopedia/civilopedia-sidebar-panels.js

</API>

<API id="ProgressionTrees.find" title="GameInfo.ProgressionTrees.find(predicate)">

**说明**: 按条件查找静态树定义（如匹配属性树的 `ProgressionTreeType`）。

| 参数名 | 类型 | 说明 |
|------|------|------|
| predicate | `function` | 判定函数，接收树定义为参数 |

**返回值**: `object` — 首个满足条件的树定义，未找到则返回 `undefined`。

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/attribute-trees/model-attribute-trees.js
// 查找属性关联的树定义
const definition = GameInfo.ProgressionTrees.find((t) => {
    return t.ProgressionTreeType == attributeDef.ProgressionTreeType;
});
if (!definition) {
    console.warn("No definition for attribute: " + attributeDef.Name);
}
```

**来源**: modules/base-standard/ui/attribute-trees/model-attribute-trees.js

</API>