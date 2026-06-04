---
title: Game 核心对象
---

# Game 核心对象

游戏核心状态对象。提供当前游戏的运行时信息和管理功能。从不通过 import 引入，引擎直接注入。

```javascript
// 来源 modules/base-standard/ui/system-bar/panel-system-bar.js
// 获取当前时代与回合数
const age = Game.age;
const turn = Game.turn;
const dateStr = Game.getTurnDate();
```

## 属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `age` | `int` | 当前时代编号 |
| `turn` | `int` | 当前回合数 |

## 方法列表（共 10 个）

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Game.getHash</API> | — | `int` | 获取游戏哈希值 |
| <API>Game.getTurnDate</API> | — | `string` | 获取当前回合日期字符串 |
| <API>Game.randomRange</API> | min, max | `int` | 生成指定范围的随机整数 |
| <API>Game.isRunning</API> | — | `bool` | 游戏是否正在运行 |
| <API>Game.cancel</API> | — | `void` | 取消当前操作 |
| <API>Game.start</API> | — | `void` | 启动游戏 |
| <API>Game.setDebugUiVisiblity</API> | visible | `void` | 设置调试 UI 可见性 |
| <API>Game.getDebugUiVisiblity</API> | — | `bool` | 获取调试 UI 可见性 |
| <API>Game.getBenchmarkType</API> | — | `string` | 获取基准测试类型 |
| <API>Game.setLightweightGraphPosition</API> | pos | `void` | 设置轻量图位置 |

## 子对象/子系统

Game 对象内部包含以下子系统：

| 子系统 | 说明 |
|--------|------|
| `PlayerOperations` | 玩家操作管理 |
| `Notifications` | 通知管理 |
| `Diplomacy` | 外交管理 |
| `AgeProgressManager` | 时代进度管理器 |
| `CityOperations` | 城市操作管理 |
| `UnitOperations` | 单位操作管理 |
| `ProgressionTrees` | 科技/文化树管理 |
| `UnitCommands` | 单位命令管理 |
| `IndependentPowers` | 独立势力管理 |
| `CityCommands` | 城市命令管理 |
| `VictoryManager` | 胜利管理器 |
| `DiplomacyDeals` | 外交交易管理 |
| `DiplomacySessions` | 外交会话管理 |
| `Unlocks` | 解锁管理 |
| `Resources` | 资源管理 |
| `CrisisManager` | 危机管理器 |
| `Religion` | 宗教管理 |
| `Culture` | 文化管理 |
| `CityStates` | 城邦管理 |
| `EconomicRules` | 经济规则 |
| `Combat` | 战斗管理 |
| `Summary` | 游戏摘要 |
| `PlacementRules` | 放置规则 |

### AgeProgressManager 子系统

时代进度跟踪器，管理时代进展点数和里程碑。

```javascript
// 来源 modules/base-standard/ui/action/panel-action.js
// 获取当前时代进度与上限
const curProgress = Game.AgeProgressManager.getCurrentAgeProgressionPoints();
const maxProgress = Game.AgeProgressManager.getMaxAgeProgressionPoints();

// 来源 modules/base-standard/ui/age-rankings/model-age-rankings.js
// 检查里程碑完成情况并获取点数
if (Game.AgeProgressManager.isMilestoneComplete(milestoneType)) {
  const points = Game.AgeProgressManager.getMilestoneProgressionPoints(milestoneType);
}

// 来源 modules/base-standard/ui/legends-report/screen-legends-report.js
// 检查是否可以过渡到下一时代
const canTransition = Game.AgeProgressManager.canTransitionToNextAge(GameContext.localPlayerID);
```

| 方法 | 说明 |
|------|------|
| `getMaxAgeProgressionPoints()` | 获取时代最大进度点数 |
| `getCurrentAgeProgressionPoints()` | 获取当前时代进度点数 |
| `isMilestoneComplete(id)` | 检查里程碑是否完成 |
| `getMilestoneProgressionPoints(id)` | 获取里程碑进度点数 |
| `canTransitionToNextAge(playerID)` | 是否可以转换到下一时代 |
| `isFinalAge` | 是否为最终时代 |
| `isAgeOver` | 时代是否已结束 |
| `isExtendedGame` | 是否为延长游戏 |
| `ageCountdownStarted` | 倒计时是否已开始 |
| `getAgeCountdownLength` | 获取倒计时长度 |

---

*来源：modules/base-standard/ui/system-bar/panel-system-bar.js、modules/base-standard/ui/action/panel-action.js、modules/base-standard/ui/age-rankings/model-age-rankings.js、modules/base-standard/ui/legends-report/screen-legends-report.js、TunerPanels/Notifications.ltp、TunerPanels/VictoriesDefeats.ltp、modules/base-standard/ui/benchmark/screen-benchmark.js*

<API id="Game.getHash" title="Game.getHash()">

**说明**: 获取当前游戏的哈希值，用于唯一标识游戏状态。

**参数**: 无

**返回值**: `int`

**使用示例**:

```javascript
// 来源 TunerPanels/Notifications.ltp
// 将字符串哈希后用于通知类型标识
args.Type = Game.getHash(sel);
```

**来源**: TunerPanels/Notifications.ltp

</API>

<API id="Game.getTurnDate" title="Game.getTurnDate()">

**说明**: 获取当前回合对应的日期/年份字符串，用于 UI 显示。

**参数**: 无

**返回值**: `string`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/system-bar/panel-system-bar.js
// 在系统栏显示当前回合日期
turnAgeElement.textContent = Game.getTurnDate();

// 来源 modules/base-standard/ui/cinematic/screen-cinematic-placard.js
// 过场动画字幕显示年份
const subtitle = Game.getTurnDate();
```

**来源**: modules/base-standard/ui/system-bar/panel-system-bar.js、modules/base-standard/ui/cinematic/screen-cinematic-placard.js

</API>

<API id="Game.randomRange" title="Game.randomRange(min, max)">

**说明**: 生成指定范围内的随机整数（含 min、max）。Benchmark 模式下通过 `Benchmark.Game.randomRange()` 调用。

| 参数名 | 类型 | 说明 |
|------|------|------|
| min | `int` | 最小值（含） |
| max | `int` | 最大值（含） |

**返回值**: `int`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/automation/automation-test-benchmark-graphics.js
// Benchmark 模式下随机选择城市
const selection = Benchmark.Game.randomRange(0, this.cities.length - 1);

// 随机生成坐标
const x = Benchmark.Game.randomRange(0, gridWidth - 1);
const y = Benchmark.Game.randomRange(Y_PADDING, gridHeight - Y_PADDING - 1);
```

**来源**: modules/base-standard/ui/automation/automation-test-benchmark-graphics.js

</API>

<API id="Game.isRunning" title="Game.isRunning()">

**说明**: 检查游戏是否正在运行。Benchmark 模式下通过 `Benchmark.Game.isRunning()` 调用。

**参数**: 无

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/benchmark/screen-benchmark.js
// 检查 Benchmark 游戏运行状态
if (Benchmark.Game.isRunning()) {
  // 执行基准测试逻辑
}
```

**来源**: modules/base-standard/ui/benchmark/screen-benchmark.js

</API>

<API id="Game.cancel" title="Game.cancel()">

**说明**: 取消当前正在执行的操作。

**参数**: 无

**返回值**: `void`

</API>

<API id="Game.start" title="Game.start()">

**说明**: 启动游戏。

**参数**: 无

**返回值**: `void`

</API>

<API id="Game.setDebugUiVisiblity" title="Game.setDebugUiVisiblity(visible)">

**说明**: 设置调试 UI 的可见性。实际通过 `Benchmark.Game.setDebugUiVisiblity()` 调用。

| 参数名 | 类型 | 说明 |
|------|------|------|
| visible | `bool` | 是否可见 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/extras/screen-extras.js
// 进入 Benchmark 模式时隐藏调试 UI
Benchmark.Game.setDebugUiVisiblity(false);
```

**来源**: modules/core/ui/shell/extras/screen-extras.js

</API>

<API id="Game.getDebugUiVisiblity" title="Game.getDebugUiVisiblity()">

**说明**: 获取调试 UI 的当前可见性。实际通过 `Benchmark.Game.getDebugUiVisiblity()` 调用。

**参数**: 无

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/benchmark/screen-benchmark.js
// 检查调试 UI 是否可见，决定是否打开 Benchmark 屏幕
if (!Benchmark.Game.getDebugUiVisiblity() && openBenchmarkScreen == void 0) {
  // 不打开
}
```

**来源**: modules/base-standard/ui/benchmark/screen-benchmark.js

</API>

<API id="Game.getBenchmarkType" title="Game.getBenchmarkType()">

**说明**: 获取当前基准测试类型。实际通过 `Benchmark.Game.getBenchmarkType()` 调用。

**参数**: 无

**返回值**: `string`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/benchmark/screen-benchmark.js
// 根据 Benchmark 类型判断是否为图形测试
isGraphicsBenchmark = Benchmark.Game.getBenchmarkType() == GameBenchmarkType.GRAPHICS;
```

**来源**: modules/base-standard/ui/benchmark/screen-benchmark.js

</API>

<API id="Game.setLightweightGraphPosition" title="Game.setLightweightGraphPosition(pos)">

**说明**: 设置轻量图（Benchmark 图表）的显示位置。实际通过 `Benchmark.Game.setLightweightGraphPosition()` 调用。

| 参数名 | 类型 | 说明 |
|------|------|------|
| x | `int` | X 坐标 |
| y | `int` | Y 坐标 |
| width | `int` | 宽度 |
| height | `int` | 高度 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/benchmark/screen-benchmark.js
// 设置 Benchmark 轻量图表位置
Benchmark.Game.setLightweightGraphPosition(rect.x, rect.y, rect.width, rect.height);
```

**来源**: modules/base-standard/ui/benchmark/screen-benchmark.js

</API>