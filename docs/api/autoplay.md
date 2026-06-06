---
title: Autoplay 自动播放
doc_type: other
summary: Autoplay 全局对象控制文明7的自动播放/观察模式，支持状态查询、玩家切换和 AI 控制。
primary_scope:
  - Autoplay
related_scope:
  - Automation
source:
  - TunerPanels/Autoplay.ltp
  - modules/base-standard/ui/automation/automation-base-play-game.js
  - modules/base-standard/ui/automation/automation-test-benchmark-ai.js
  - modules/base-standard/ui/automation/automation-base-benchmark-game.js
doc_update: 2026-06-06
---

# Autoplay 自动播放

Autoplay 全局对象控制文明7的自动播放/观察模式。引擎直接注入，无需手动 import 引入。常用于自动化测试、基准测试和观察模式。

```javascript
// 来源 TunerPanels/Autoplay.ltp
// 激活自动播放，运行 10 回合后返回
Autoplay.setTurns(10);
Autoplay.setActive(true);
```

## 属性与方法

| 属性(4) | 类型 | 说明 |
|------|------|------|
| `Autoplay.isActive` | `bool` | 是否激活自动播放 |
| `Autoplay.turns` | `int` | 剩余回合数 |
| `Autoplay.returnAsPlayer` | `int` | 返回时控制的玩家 ID |
| `Autoplay.observeAsPlayer` | `int` | 观察的玩家 ID |

| 方法(8) | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Autoplay.setActive</API> | active: `bool` | `void` | 激活/停用自动播放 |
| <API>Autoplay.setTurns</API> | turns: `int` | `void` | 设置回合数（-1 为无限制） |
| <API>Autoplay.setPause</API> | pause: `bool` | `void` | 暂停/恢复自动播放 |
| <API>Autoplay.setReturnAsPlayer</API> | playerId: `int` | `void` | 设置返回时控制的玩家 |
| <API>Autoplay.setObserveAsPlayer</API> | playerId: `int` | `void` | 设置观察的玩家 |
| <API>Autoplay.setAsLocalPlayer</API> | playerId: `int` | `void` | 设为本地玩家 |
| <API>Autoplay.setAsAI</API> | playerId: `int` | `void` | 设为 AI 控制 |
| <API>Autoplay.setAsHuman</API> | playerId: `int` | `void` | 设为人类控制 |

## Automation 检查

```javascript
// 来源 TunerPanels/Autoplay.ltp
// 在设置 Autoplay 前检查 Automation 是否活跃，避免冲突
if (typeof Automation == 'undefined' || Automation.isActive == false) {
  Autoplay.setTurns(10);
}
```

## 典型场景

```javascript
// 来源 modules/base-standard/ui/automation/automation-base-play-game.js
// 自动化测试中启动观察模式
Autoplay.setTurns(turnCount);
Autoplay.setReturnAsPlayer(0);
Autoplay.setObserveAsPlayer(observeAs);
Autoplay.setActive(true);
```

```javascript
// 来源 modules/base-standard/ui/automation/automation-test-benchmark-ai.js
// 基准测试中设置 AI 自动播放并暂停
Autoplay.setTurns(this.TURN_TARGET);
Autoplay.setReturnAsPlayer(GameContext.localPlayerID);
Autoplay.setObserveAsPlayer(GameContext.localPlayerID);
Autoplay.setActive(true);
Autoplay.setPause(true);
```

```javascript
// 来源 modules/base-standard/ui/automation/automation-base-benchmark-game.js
// 停止时清理 Autoplay 状态
if (typeof Autoplay != "undefined") {
  Autoplay.setActive(false);
  Autoplay.setPause(false);
}
```

<API id="Autoplay.setActive"><h3>Autoplay.setActive(active)</h3>

**说明**: 激活或停用自动播放模式。激活后游戏自动进行回合。

| 参数名 | 类型 | 说明 |
|------|------|------|
| active | `bool` | `true` 激活，`false` 停用 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 TunerPanels/Autoplay.ltp
// 通过布尔控件切换自动播放状态
Autoplay.setActive(Boolean(value));
```

</API>

<API id="Autoplay.setTurns"><h3>Autoplay.setTurns(turns)</h3>

**说明**: 设置自动播放的回合数。传入 `-1` 表示无限制运行。

| 参数名 | 类型 | 说明 |
|------|------|------|
| turns | `int` | 回合数，`-1` 为无限制 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 TunerPanels/Autoplay.ltp
// 设置回合数，无限制或具体数值
Autoplay.setTurns(-1);           // 无限制
Autoplay.setTurns(Number(10));   // 10 回合
```

</API>

<API id="Autoplay.setPause"><h3>Autoplay.setPause(pause)</h3>

**说明**: 暂停或恢复自动播放。暂停后游戏不再自动推进回合。

| 参数名 | 类型 | 说明 |
|------|------|------|
| pause | `bool` | `true` 暂停，`false` 恢复 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/automation/automation-test-benchmark-ai.js
// 基准测试启动时暂停，等待环境就绪后恢复
Autoplay.setPause(true);   // 暂停
Autoplay.setPause(false);  // 恢复
```

</API>

<API id="Autoplay.setReturnAsPlayer"><h3>Autoplay.setReturnAsPlayer(playerId)</h3>

**说明**: 设置自动播放结束后返回控制的玩家 ID。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerId | `int` | 玩家 ID |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 TunerPanels/Autoplay.ltp
// 从选择列表中设置返回玩家
Autoplay.setReturnAsPlayer(Number(selection));
```

</API>

<API id="Autoplay.setObserveAsPlayer"><h3>Autoplay.setObserveAsPlayer(playerId)</h3>

**说明**: 设置自动播放期间观察的玩家 ID。`-1` 表示无玩家，`1000` 表示观察者。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerId | `int` | 玩家 ID，`-1` 为无玩家，`1000` 为观察者 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 TunerPanels/Autoplay.ltp
// 从选择列表中设置观察玩家
Autoplay.setObserveAsPlayer(Number(selection));
```

</API>

<API id="Autoplay.setAsLocalPlayer"><h3>Autoplay.setAsLocalPlayer(playerId)</h3>

**说明**: 将指定玩家设为本地玩家（人类控制）。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerId | `int` | 玩家 ID |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 TunerPanels/Autoplay.ltp
// 强制将选中玩家设为本地玩家
Autoplay.setAsLocalPlayer(g_TunerState.AutoplayPanel.selectedReturnAsPlayer);
```

</API>

<API id="Autoplay.setAsAI"><h3>Autoplay.setAsAI(playerId)</h3>

**说明**: 将指定玩家设为 AI 控制。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerId | `int` | 玩家 ID |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 TunerPanels/Autoplay.ltp
// 将选中玩家设为 AI 控制
Autoplay.setAsAI(g_TunerState.AutoplayPanel.selectedReturnAsPlayer);
```

</API>

<API id="Autoplay.setAsHuman"><h3>Autoplay.setAsHuman(playerId)</h3>

**说明**: 将指定玩家设为人类控制。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerId | `int` | 玩家 ID |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 TunerPanels/Autoplay.ltp
// 将选中玩家设为人类控制
Autoplay.setAsHuman(g_TunerState.AutoplayPanel.selectedReturnAsPlayer);
```

</API>