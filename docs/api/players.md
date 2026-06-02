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
