---
title: Players API
---

# Players

玩家数据访问的全局对象。

```javascript
const players = Players.getEverAlive();
for (const player of players) {
  if (player.isHuman) {
    console.log(player.civilizationType);
  }
}
```

## Player 对象常用属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | int | 玩家 ID |
| `isHuman` | bool | 是否为人类玩家 |
| `civilizationType` | int | 文明类型哈希值 |
| `leaderType` | int | 领袖类型哈希值 |
| `culture` | int | 文化值 |
| `science` | int | 科技值 |
| `gold` | int | 金币 |
| `faith` | int | 信仰值 |
| `influence` | int | 影响力 |
| `trade` | int | 贸易值 |
| `diplomacy` | object | 外交对象 |

## 方法列表（共 19 个）

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `getEverAlive` | — | `Player[]` | 获取所有曾经存活的玩家数组 |
| `getAlive` | — | `Player[]` | 获取当前存活的玩家数组 |
| `getAliveIds` | — | `int[]` | 获取当前存活玩家的 ID 数组 |
| `getAliveMajorIds` | — | `int[]` | 获取存活的主要文明玩家 ID 数组 |
| `getWasEverAliveMajorIds` | — | `int[]` | 获取曾经存活的主要文明玩家 ID 数组 |
| `getNumAliveHumans` | — | `int` | 获取存活的人类玩家数量 |
| `get` | id | `Player` | 根据 ID 获取玩家对象 |
| `isAlive` | id | `bool` | 玩家是否存活 |
| `isHuman` | id | `bool` | 玩家是否为人类 |
| `isAI` | id | `bool` | 玩家是否为 AI |
| `isParticipant` | id | `bool` | 玩家是否为参与者 |
| `isValid` | id | `bool` | 玩家 ID 是否有效 |
| `entries` | — | `array` | 获取所有玩家条目 |
| `filter` | callback | `array` | 过滤玩家 |
| `forEach` | callback | `void` | 遍历所有玩家 |
| `includes` | id | `bool` | 是否包含指定玩家 |
| `some` | callback | `bool` | 是否有玩家满足条件 |
| `sort` | callback | `array` | 排序玩家数组 |
| `push` | player | `void` | 添加玩家 |
---
title: Players API
---

# Players

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
