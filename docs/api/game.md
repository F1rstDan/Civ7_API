---
title: Game 核心对象
doc_type: object-api
summary: 游戏核心状态对象，提供当前游戏的运行时信息和管理功能，包含 Benchmark 子系统的入口。
primary_scope:
  - Game
related_scope:
  - Benchmark.Game
source:
  - TunerPanels/Notifications.ltp
  - TunerPanels/WorldUnits.ltp
  - TunerPanels/Player.ltp
  - modules/base-standard/ui/system-bar/panel-system-bar.js
  - modules/base-standard/ui/benchmark/screen-benchmark.js
  - modules/base-standard/ui/automation/automation-base-benchmark-game.js
  - modules/base-standard/ui/action/panel-action.js
  - modules/base-standard/ui/age-rankings/model-age-rankings.js
  - modules/base-standard/ui/legends-report/screen-legends-report.js
---

# Game 核心对象

游戏核心状态对象。提供当前游戏的运行时信息和管理功能。引擎直接注入，无需手动 import 引入。

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

```javascript
// 来源 TunerPanels/Player.ltp
// 通过 age 查询当前时代定义
const currentAge = GameInfo.Ages.lookup(Game.age);

// 来源 modules/base-standard/ui/system-bar/panel-system-bar.js
// 在系统栏显示当前回合数
turnNumberElement.textContent = Locale.compose("LOC_ACTION_PANEL_CURRENT_TURN", Game.turn);
```

## 方法列表（共 3 个）

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Game.getHash</API> | — | `int` | 获取游戏哈希值 |
| <API>Game.getTurnDate</API> | — | `string` | 获取当前回合日期字符串 |
| <API>Game.isIDMatch</API> | a, b | `bool` | 比较两个 ID 是否匹配 |

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

### Benchmark.Game 子系统

Benchmark 自动化测试中使用的 Game 子对象。源码中仅以 `Benchmark.Game.xxx()` 形式出现，未发现独立的 `Game.xxx()` 直接调用。

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Benchmark.Game.randomRange</API> | min, max | `int` | 生成指定范围的随机整数 |
| <API>Benchmark.Game.isRunning</API> | — | `bool` | 游戏是否正在运行 |
| <API>Benchmark.Game.cancel</API> | — | `void` | 取消当前 Benchmark 操作 |
| <API>Benchmark.Game.start</API> | startParams | `void` | 启动 Benchmark 游戏 |
| <API>Benchmark.Game.setDebugUiVisiblity</API> | visible | `void` | 设置调试 UI 可见性 |
| <API>Benchmark.Game.getDebugUiVisiblity</API> | — | `bool` | 获取调试 UI 可见性 |
| <API>Benchmark.Game.getBenchmarkType</API> | — | `string` | 获取基准测试类型 |
| <API>Benchmark.Game.setLightweightGraphPosition</API> | rect | `void` | 设置轻量图表位置 |

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

<API id="Game.isIDMatch" title="Game.isIDMatch(a, b)">

**说明**: 比较两个 ID 是否匹配，用于在 Tuner 面板中判断选中项是否与列表项一致。

| 参数名 | 类型 | 说明 |
|------|------|------|
| a | `int` | 第一个 ID |
| b | `int` | 第二个 ID |

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 TunerPanels/WorldUnits.ltp
// 判断选中的单位是否与列表项匹配
if (Game.isIDMatch(g_TunerState.WorldUnitsPanel.selectedUnit, unitId) == false) {
  g_TunerState.WorldUnitsPanel.selectedUnit = unitId;
}
```

**来源**: TunerPanels/WorldUnits.ltp

</API>

<API id="Benchmark.Game.randomRange" title="Benchmark.Game.randomRange(min, max)">

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

<API id="Benchmark.Game.isRunning" title="Benchmark.Game.isRunning()">

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

<API id="Benchmark.Game.cancel" title="Benchmark.Game.cancel()">

**说明**: 取消当前正在执行的 Benchmark 操作。通过 `Benchmark.Game.cancel()` 调用。

**参数**: 无

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/benchmark/screen-benchmark.js
// 关闭 Benchmark 时取消运行中的游戏
if (Benchmark.Game.isRunning()) {
  Benchmark.Game.cancel();
}
```

**来源**: modules/base-standard/ui/benchmark/screen-benchmark.js

</API>

<API id="Benchmark.Game.start" title="Benchmark.Game.start(startParameters)">

**说明**: 启动 Benchmark 游戏。通过 `Benchmark.Game.start(startParameters)` 调用。

| 参数名 | 类型 | 说明 |
|------|------|------|
| startParameters | `object` | Benchmark 启动参数对象 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/automation/automation-base-benchmark-game.js
// 启动 Benchmark 游戏并禁用世界输入
Benchmark.Game.start(startParameters);
ViewManager.isWorldInputAllowed = false;
```

**来源**: modules/base-standard/ui/automation/automation-base-benchmark-game.js

</API>

<API id="Benchmark.Game.setDebugUiVisiblity" title="Benchmark.Game.setDebugUiVisiblity(visible)">

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

<API id="Benchmark.Game.getDebugUiVisiblity" title="Benchmark.Game.getDebugUiVisiblity()">

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

<API id="Benchmark.Game.getBenchmarkType" title="Benchmark.Game.getBenchmarkType()">

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

<API id="Benchmark.Game.setLightweightGraphPosition" title="Benchmark.Game.setLightweightGraphPosition(rect)">

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