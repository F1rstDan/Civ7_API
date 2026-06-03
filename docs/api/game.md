---
title: Game 核心对象
---

# Game 核心对象

游戏核心状态对象。提供当前游戏的运行时信息和管理功能。

```javascript
const age = Game.age;
const turn = Game.turn;
const maxPoints = Game.AgeProgressManager.getMaxAgeProgressionPoints();
```

## 属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `age` | int | 当前时代编号 |
| `turn` | int | 当前回合数 |
| `PlayerOperations` | object | 玩家操作管理 |
| `Notifications` | object | 通知管理 |
| `Diplomacy` | object | 外交管理 |
| `AgeProgressManager` | object | 时代进度管理器 |
| `CityOperations` | object | 城市操作管理 |
| `UnitOperations` | object | 单位操作管理 |
| `ProgressionTrees` | object | 科技/文化树管理 |
| `UnitCommands` | object | 单位命令管理 |
| `IndependentPowers` | object | 独立势力管理 |
| `CityCommands` | object | 城市命令管理 |
| `VictoryManager` | object | 胜利管理器 |
| `DiplomacyDeals` | object | 外交交易管理 |
| `DiplomacySessions` | object | 外交会话管理 |
| `Unlocks` | object | 解锁管理 |
| `Resources` | object | 资源管理 |
| `CrisisManager` | object | 危机管理器 |
| `Religion` | object | 宗教管理 |
| `Culture` | object | 文化管理 |
| `CityStates` | object | 城邦管理 |
| `EconomicRules` | object | 经济规则 |
| `Combat` | object | 战斗管理 |
| `Summary` | object | 游戏摘要 |
| `PlacementRules` | object | 放置规则 |

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `getHash` | — | `int` | 获取游戏哈希值 |
| `getTurnDate` | — | `string` | 获取当前回合日期字符串 |
| `randomRange` | min, max | `int` | 生成指定范围的随机整数 |
| `isRunning` | — | `bool` | 游戏是否正在运行 |
| `cancel` | — | `void` | 取消当前操作 |
| `start` | — | `void` | 启动游戏 |
| `setDebugUiVisiblity` | visible | `void` | 设置调试 UI 可见性 |
| `getDebugUiVisiblity` | — | `bool` | 获取调试 UI 可见性 |
| `getBenchmarkType` | — | `string` | 获取基准测试类型 |
| `setLightweightGraphPosition` | pos | `void` | 设置轻量图位置 |

## AgeProgressManager 子对象

| 方法 | 说明 |
|------|------|
| `getMaxAgeProgressionPoints()` | 获取时代最大进度点数 |
| `getCurrentAgeProgressionPoints()` | 获取当前时代进度点数 |
| `isMilestoneComplete(id)` | 检查里程碑是否完成 |
| `getMilestoneProgressionPoints(id)` | 获取里程碑进度点数 |
| `canTransitionToNextAge()` | 是否可以转换到下一时代 |
