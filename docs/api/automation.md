---
title: Automation 自动化
doc_type: object-api
summary: 游戏自动化测试框架全局对象，负责测试参数管理、日志输出、自动化生命周期控制以及存档操作。
primary_scope:
  - Automation
related_scope:
  - Benchmark.Automation
source:
  - modules/base-standard/ui/automation/automation-base-play-game.js
  - modules/base-standard/ui/automation/automation-test-support.js
  - modules/base-standard/ui/automation/automation-test-transition.js
  - modules/base-standard/ui/automation/automation-test-load-game.js
  - modules/base-standard/ui/automation/automation-test-benchmark-graphics.js
  - modules/base-standard/ui/automation/automation-base-benchmark-game.js
  - modules/core/ui/shell/main-menu/main-menu.js
  - modules/core/ui/context-manager/context-manager.js
  - TunerPanels/Autoplay.ltp
---

# Automation 自动化

游戏自动化测试框架全局对象。用于基准测试、自动游玩（Autoplay）和自动化测试脚本的生命周期管理。

## 快速示例

```javascript
// 来源 modules/base-standard/ui/automation/automation-base-play-game.js
// 使用 Automation 进行测试参数读写和日志输出
Automation.log("Test started");
const turns = Automation.getParameter("CurrentTest", "Turns", 100);
Automation.setParameter("CurrentTest", "HasStarted", 1);
Automation.log("Turns: " + turns);
Automation.sendTestComplete("PlayGame");
```

## 方法

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Automation.log</API> | message | `void` | 输出自动化日志 |
| <API>Automation.logDivider</API> | — | `void` | 输出日志分隔线 |
| <API>Automation.getParameter</API> | context, name, defaultValue? | `any` | 获取测试参数 |
| <API>Automation.setParameter</API> | context, name, value | `void` | 设置测试参数 |
| <API>Automation.getLocalParameter</API> | name, defaultValue? | `any` | 获取本地参数 |
| <API>Automation.setLocalParameter</API> | name, value | `void` | 设置本地参数 |
| <API>Automation.start</API> | — | `void` | 启动自动化流程 |
| <API>Automation.stop</API> | — | `void` | 停止自动化流程 |
| <API>Automation.pause</API> | bPause, options? | `void` | 暂停/恢复自动化 |
| <API>Automation.sendTestComplete</API> | name? | `void` | 发送测试完成信号 |
| <API>Automation.setScriptHasLoaded</API> | name | `void` | 标记脚本已加载完成 |
| <API>Automation.generateSaveName</API> | — | `string` | 生成存档文件名 |
| <API>Automation.getLastGeneratedSaveName</API> | — | `string` | 获取最后生成的存档名 |
| <API>Automation.copyAutosave</API> | turn, fileName | `void` | 复制指定回合的自动存档 |

## 属性

| 属性 | 类型 | 说明 |
|------|------|------|
| <API>Automation.isActive</API> | `bool` | 自动化流程是否正在运行 |
| <API>Automation.isPaused</API> | `bool` | 自动化流程是否已暂停 |

## 相关全局对象

| 对象 | 说明 |
|------|------|
| `Benchmark.Automation` | 基准测试专用自动化子对象，提供 `Benchmark.Automation.start()` 和 `Benchmark.Automation.stop()` 用于图形/AI 基准测试 |

## 源文件引用

- `modules/base-standard/ui/automation/automation-base-play-game.js`
- `modules/base-standard/ui/automation/automation-test-support.js`
- `modules/base-standard/ui/automation/automation-test-transition.js`
- `modules/base-standard/ui/automation/automation-test-load-game.js`
- `modules/base-standard/ui/automation/automation-test-benchmark-graphics.js`
- `modules/base-standard/ui/automation/automation-base-benchmark-game.js`
- `modules/core/ui/shell/main-menu/main-menu.js`
- `modules/core/ui/context-manager/context-manager.js`
- `TunerPanels/Autoplay.ltp`

---

<API id="Automation.log" title="Automation.log(message)">

**说明**: 输出一条自动化日志，用于测试脚本的调试和状态跟踪。

| 参数名 | 类型 | 说明 |
|------|------|------|
| message | `string` | 日志消息内容 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/automation/automation-base-play-game.js
// 在测试各阶段输出日志信息
Automation.log("Turn Ended: " + data.turn);
Automation.log("Autoplay complete");
```

</API>

<API id="Automation.logDivider" title="Automation.logDivider()">

**说明**: 输出一条日志分隔线，用于在日志中分隔不同的测试阶段。

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/automation/automation-test-support.js
// 在测试开始前输出分隔线和测试名称
Automation.log("Running Test: " + curTestName);
Automation.logDivider();
Automation.log("Test info...");
```

</API>

<API id="Automation.getParameter" title="Automation.getParameter(context, name, defaultValue?)">

**说明**: 获取指定上下文中的测试参数值。通常用于读取自动化测试配置（如回合数、地图大小等）。

| 参数名 | 类型 | 说明 |
|------|------|------|
| context | `string` | 参数上下文，通常为 `"CurrentTest"` |
| name | `string` | 参数名称 |
| defaultValue | `any` | 可选，默认值，参数不存在时返回 |

**返回值**: `any` — 参数值，不存在且无默认值时返回 `null`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/automation/automation-base-benchmark-game.js
// 读取测试参数，支持默认值
const includeFileExtension = Automation.getParameter("CurrentTest", "FileExtension", false);
const turnCount = Automation.getParameter("CurrentTest", "Turns");
if (turnCount !== null) {
  Automation.log(turnCount + " Turns specified!");
}
```

</API>

<API id="Automation.setParameter" title="Automation.setParameter(context, name, value)">

**说明**: 设置指定上下文中的测试参数值。用于在测试脚本运行期间动态更新配置。

| 参数名 | 类型 | 说明 |
|------|------|------|
| context | `string` | 参数上下文，通常为 `"CurrentTest"` |
| name | `string` | 参数名称 |
| value | `any` | 参数值 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/automation/automation-base-play-game.js
// 动态更新测试参数
Automation.setParameter("CurrentTest", "Turns", turnsRemaining);
Automation.setParameter("CurrentTest", "HasStarted", 1);
```

</API>

<API id="Automation.getLocalParameter" title="Automation.getLocalParameter(name, defaultValue?)">

**说明**: 获取本地参数值。本地参数在脚本生命周期内持久，不随测试上下文重置。

| 参数名 | 类型 | 说明 |
|------|------|------|
| name | `string` | 参数名称 |
| defaultValue | `any` | 可选，默认值，参数不存在时返回 |

**返回值**: `any` — 参数值

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/automation/automation-test-load-game.js
// 检查本地标记判断是否首次运行
if (Automation.getLocalParameter("loadGame_firstRun")) {
  const turnCount = Automation.getParameter("CurrentTest", "Turns");
}
```

</API>

<API id="Automation.setLocalParameter" title="Automation.setLocalParameter(name, value)">

**说明**: 设置本地参数值。用于在测试脚本中维护跨步骤的状态标记。

| 参数名 | 类型 | 说明 |
|------|------|------|
| name | `string` | 参数名称 |
| value | `any` | 参数值 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/automation/automation-test-load-game.js
// 设置本地状态标记，控制测试流程分支
Automation.setLocalParameter("loadGame_firstRun", false);
Automation.setLocalParameter("loadGame_firstRun", true);
```

</API>

<API id="Automation.start" title="Automation.start()">

**说明**: 启动自动化流程。调用后自动化测试框架开始运行。

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/main-menu/main-menu.js
// 在主菜单加载完成后启动自动化
Loading.runWhenFinished(() => {
  Automation.start();
});
```

</API>

<API id="Automation.stop" title="Automation.stop()">

**说明**: 停止自动化流程。调用后自动化测试框架停止运行并清理资源。此方法为 C++ 原生实现，通常由框架内部调用，不直接在测试脚本中使用。

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/automation/automation-test-support.js
// 框架在自动化完成时调用 setActive(false) 清理状态
// Automation.stop() 由 C++ 引擎在测试结束时自动触发
Automation.setActive(false);
```

</API>

<API id="Automation.pause" title="Automation.pause(bPause, options?)">

**说明**: 暂停或恢复自动化流程。暂停时可指定等待事件或超时时间。

| 参数名 | 类型 | 说明 |
|------|------|------|
| bPause | `bool` | `true` 暂停，`false` 恢复 |
| options | `object` | 可选，暂停选项（`time` 超时毫秒、`event` 等待事件名） |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/automation/automation-test-support.js
// 暂停自动化并等待指定时间
const pauseOptions = {};
const pauseTime = Automation.getParameter("CurrentTest", "Time", 0);
if (pauseTime !== null) {
  pauseOptions.time = pauseTime;
}
Automation.pause(true, pauseOptions);

// 恢复自动化
if (Automation.isActive && Automation.isPaused == true) {
  Automation.pause(false);
}
```

</API>

<API id="Automation.sendTestComplete" title="Automation.sendTestComplete(name?)">

**说明**: 发送测试完成信号，通知自动化框架当前测试已结束。

| 参数名 | 类型 | 说明 |
|------|------|------|
| name | `string` | 可选，完成的测试名称标识 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/automation/automation-base-play-game.js
// 发送带名称的测试完成信号
Automation.sendTestComplete("PlayGame");

// 来源 modules/base-standard/ui/automation/automation-test-save-runtime-database.js
// 无参数发送完成信号
Automation.sendTestComplete();
```

</API>

<API id="Automation.setScriptHasLoaded" title="Automation.setScriptHasLoaded(name)">

**说明**: 标记当前自动化测试脚本已加载完成。通常在脚本文件末尾调用。

| 参数名 | 类型 | 说明 |
|------|------|------|
| name | `string` | 脚本名称标识 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/automation/automation-test-benchmark-graphics.js
// 脚本加载完成后通知框架
Automation.setScriptHasLoaded("automation-test-benchmark-graphics");
```

</API>

<API id="Automation.generateSaveName" title="Automation.generateSaveName()">

**说明**: 生成一个自动化测试用的存档文件名。

**返回值**: `string` — 生成的存档文件名

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/automation/automation-test-support.js
// 生成存档名并保存游戏
const saveGame = {};
saveGame.FileName = Automation.generateSaveName();
saveGame.Location = SaveLocations.LOCAL_STORAGE;
Network.saveGame(saveGame);
```

</API>

<API id="Automation.getLastGeneratedSaveName" title="Automation.getLastGeneratedSaveName()">

**说明**: 获取最后一次由 `generateSaveName` 生成的存档文件名。用于存档后重新加载场景。

**返回值**: `string` — 存档文件名

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/automation/automation-test-load-game.js
// 获取上次生成的存档名并加载该存档
const loadGame = {};
loadGame.FileName = Automation.getLastGeneratedSaveName();
loadGame.Location = SaveLocations.LOCAL_STORAGE;
loadGame.Type = SaveTypes.SINGLE_PLAYER;
Network.loadGame(loadGame, ServerType.SERVER_TYPE_NONE);
```

</API>

<API id="Automation.copyAutosave" title="Automation.copyAutosave(turn, fileName)">

**说明**: 复制指定回合的自动存档为新文件。用于时代转换等需要回溯存档的场景。

| 参数名 | 类型 | 说明 |
|------|------|------|
| turn | `int` | 要复制的自动存档所在回合 |
| fileName | `string` | 目标存档文件名 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/automation/automation-test-transition.js
// 复制时代转换前的自动存档
Automation.copyAutosave(Game.turn - 3, "AutomationTransitionSave.Civ7Save");
```

</API>

<API id="Automation.isActive" title="Automation.isActive">

**说明**: 布尔属性，指示自动化流程是否正在运行。常用于在游戏逻辑中跳过自动化模式下不需要的 UI 行为。

**类型**: `bool`

**使用示例**:

```javascript
// 来源 TunerPanels/Autoplay.ltp
// 在自动化模式下跳过手动设置
if (typeof Automation == 'undefined' || Automation.isActive == false) {
  Autoplay.setTurns(Number(value));
}
```

```javascript
// 来源 modules/core/ui/context-manager/context-manager.js
// 自动化模式下跳过 UI 通知
if (playerId == GameContext.localPlayerID && !Automation.isActive) {
  UI.showNotification(notificationData);
}
```

</API>

<API id="Automation.isPaused" title="Automation.isPaused">

**说明**: 布尔属性，指示自动化流程是否处于暂停状态。

**类型**: `bool`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/automation/automation-test-support.js
// 检查暂停状态后恢复自动化
if (Automation.isActive && Automation.isPaused == true) {
  Automation.pause(false);
  Automation.sendTestComplete("PauseGame");
}
```

</API>