---
title: Automation 自动化
---

# Automation 自动化

游戏自动化测试框架全局对象。用于基准测试、自动游玩（Autoplay）和自动化测试脚本的生命周期管理。

## 快速示例

```javascript
// 来源 automation-base-play-game.js
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
| <API>Automation.getLocalParameter</API> | name | `any` | 获取本地参数 |
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

*来源：automation-base-play-game.js、automation-test-support.js、automation-test-transition.js、Autoplay.ltp*

---

<API id="Automation.log" title="Automation.log(message)">

**说明**: 输出一条自动化日志，用于测试脚本的调试和状态跟踪。

| 参数名 | 类型 | 说明 |
|------|------|------|
| message | `string` | 日志消息内容 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 automation-base-play-game.js
Automation.log("Turn Ended: " + data.turn);
Automation.log("Autoplay complete");
```

**来源**: automation-base-play-game.js

</API>

<API id="Automation.logDivider" title="Automation.logDivider()">

**说明**: 输出一条日志分隔线，用于在日志中分隔不同的测试阶段。

**返回值**: `void`

**使用示例**:

```javascript
// 来源 automation-test-support.js
Automation.log("Running Test: " + curTestName);
Automation.logDivider();
Automation.log("Test info...");
```

**来源**: automation-test-support.js

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
// 来源 automation-base-benchmark-game.js
const includeFileExtension = Automation.getParameter("CurrentTest", "FileExtension", false);
const turnCount = Automation.getParameter("CurrentTest", "Turns");
if (turnCount !== null) {
  Automation.log(turnCount + " Turns specified!");
}
```

**来源**: automation-base-benchmark-game.js、automation-base-play-game.js

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
// 来源 automation-base-play-game.js
Automation.setParameter("CurrentTest", "Turns", turnsRemaining);
Automation.setParameter("CurrentTest", "HasStarted", 1);
```

**来源**: automation-base-play-game.js

</API>

<API id="Automation.getLocalParameter" title="Automation.getLocalParameter(name)">

**说明**: 获取本地参数值。本地参数在脚本生命周期内持久，不随测试上下文重置。

| 参数名 | 类型 | 说明 |
|------|------|------|
| name | `string` | 参数名称 |

**返回值**: `any` — 参数值

**使用示例**:

```javascript
// 来源 automation-test-load-game.js
if (Automation.getLocalParameter("loadGame_firstRun")) {
  const turnCount = Automation.getParameter("CurrentTest", "Turns");
}
```

**来源**: automation-test-load-game.js

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
// 来源 automation-test-load-game.js
Automation.setLocalParameter("loadGame_firstRun", false);
Automation.setLocalParameter("loadGame_firstRun", true);
```

**来源**: automation-test-load-game.js

</API>

<API id="Automation.start" title="Automation.start()">

**说明**: 启动自动化流程。调用后自动化测试框架开始运行。

**返回值**: `void`

**使用示例**:

```javascript
// 来源 main-menu.js
Loading.runWhenFinished(() => {
  Automation.start();
});
```

**来源**: main-menu.js

</API>

<API id="Automation.stop" title="Automation.stop()">

**说明**: 停止自动化流程。调用后自动化测试框架停止运行并清理资源。

**返回值**: `void`

**使用示例**:

```javascript
// 来源 automation-test-support.js
// 在测试脚本的 stop 回调中调用
stop() {
  this.clearListeners();
  RestoreUserConfigOptions();
}
```

**来源**: automation-test-support.js

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
// 来源 automation-test-support.js
const pauseOptions = {};
const pauseTime = Automation.getParameter("CurrentTest", "Time", 0);
if (pauseTime !== null) {
  pauseOptions.time = pauseTime;
}
Automation.pause(true, pauseOptions);

// 恢复
if (Automation.isActive && Automation.isPaused == true) {
  Automation.pause(false);
}
```

**来源**: automation-test-support.js

</API>

<API id="Automation.sendTestComplete" title="Automation.sendTestComplete(name?)">

**说明**: 发送测试完成信号，通知自动化框架当前测试已结束。

| 参数名 | 类型 | 说明 |
|------|------|------|
| name | `string` | 可选，完成的测试名称标识 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 automation-base-play-game.js
Automation.sendTestComplete("PlayGame");

// 来源 automation-test-load-game.js
Automation.sendTestComplete();
```

**来源**: automation-base-play-game.js、automation-test-load-game.js

</API>

<API id="Automation.setScriptHasLoaded" title="Automation.setScriptHasLoaded(name)">

**说明**: 标记当前自动化测试脚本已加载完成。通常在脚本文件末尾调用。

| 参数名 | 类型 | 说明 |
|------|------|------|
| name | `string` | 脚本名称标识 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 automation-test-benchmark-graphics.js
Automation.setScriptHasLoaded("automation-test-benchmark-graphics");
```

**来源**: automation-test-benchmark-graphics.js

</API>

<API id="Automation.generateSaveName" title="Automation.generateSaveName()">

**说明**: 生成一个自动化测试用的存档文件名。

**返回值**: `string` — 生成的存档文件名

**使用示例**:

```javascript
// 来源 automation-test-support.js
const saveGame = {};
saveGame.FileName = Automation.generateSaveName();
saveGame.Location = SaveLocations.LOCAL_STORAGE;
Network.saveGame(saveGame);
```

**来源**: automation-test-support.js

</API>

<API id="Automation.getLastGeneratedSaveName" title="Automation.getLastGeneratedSaveName()">

**说明**: 获取最后一次由 `generateSaveName` 生成的存档文件名。用于存档后重新加载场景。

**返回值**: `string` — 存档文件名

**使用示例**:

```javascript
// 来源 automation-test-load-game.js
const loadGame = {};
loadGame.FileName = Automation.getLastGeneratedSaveName();
loadGame.Location = SaveLocations.LOCAL_STORAGE;
loadGame.Type = SaveTypes.SINGLE_PLAYER;
Network.loadGame(loadGame, ServerType.SERVER_TYPE_NONE);
```

**来源**: automation-test-load-game.js

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
// 来源 automation-test-transition.js
Automation.copyAutosave(Game.turn - 3, "AutomationTransitionSave.Civ7Save");
```

**来源**: automation-test-transition.js

</API>

<API id="Automation.isActive" title="Automation.isActive">

**说明**: 布尔属性，指示自动化流程是否正在运行。常用于在游戏逻辑中跳过自动化模式下不需要的 UI 行为。

**类型**: `bool`

**使用示例**:

```javascript
// 来源 Autoplay.ltp
if (typeof Automation == 'undefined' || Automation.isActive == false) {
  Autoplay.setTurns(Number(value));
}
```

```javascript
// 来源 context-manager.js
if (playerId == GameContext.localPlayerID && !Automation.isActive) {
  UI.showNotification(notificationData);
}
```

**来源**: Autoplay.ltp、context-manager.js

</API>

<API id="Automation.isPaused" title="Automation.isPaused">

**说明**: 布尔属性，指示自动化流程是否处于暂停状态。

**类型**: `bool`

**使用示例**:

```javascript
// 来源 automation-test-support.js
if (Automation.isActive && Automation.isPaused == true) {
  Automation.pause(false);
  Automation.sendTestComplete("PauseGame");
}
```

**来源**: automation-test-support.js

</API>
