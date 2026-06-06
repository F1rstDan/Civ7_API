---
title: 全局工具对象
doc_type: other
summary: 引擎直接注入的全局工具对象聚合参考，包括 GameContext（游戏上下文）、Database（数据库查询）、InterfaceMode（界面模式管理）、ComponentID（组件 ID 工具）。这些对象无需 import，引擎全局可用。
primary_scope:
  - GameContext
  - Database
  - InterfaceMode
  - ComponentID
related_scope: []
source:
  - modules/age-antiquity/ui/tutorial/tutorial-items-antiquity.js
  - modules/base-standard/ui/unit-actions/unit-actions.js
  - modules/core/ui/utilities/utilities-data.js
  - modules/core/ui/utilities/utilities-image.js
  - modules/base-standard/ui-next/screens/hotseat/hotseat-curtain.js
  - modules/base-standard/ui-next/screens/pause-menu/pause-menu-model.js
doc_update: 2026-06-06
---

# globals 全局工具对象

引擎直接注入的全局工具对象，无需 `import`，在脚本中直接使用。本页聚合了 4 个小型全局对象，每个对象 API 较少，不适合独立成页。

## 快速示例

```javascript
// 来源 modules/age-antiquity/ui/tutorial/tutorial-items-antiquity.js
// 获取本地玩家对象，判断单位归属
const player = Players.get(GameContext.localPlayerID);
if (unit.owner == GameContext.localPlayerID) {
  // 属于本地玩家的单位
}
```

## GameContext — 游戏上下文

提供当前游戏会话的上下文信息，如本地玩家 ID。

| 属性 | 类型 | 说明 |
|------|------|------|
| <API>GameContext.localPlayerID</API> | `int` | 本地玩家 ID（热座模式下会变化） |

> **未验证前提**：`GameContext.localObserverID`（本地观察者 ID）在源码中未找到实际调用，暂不列入方法表。

```javascript
// 来源 modules/age-antiquity/ui/tutorial/tutorial-items-antiquity.js
// 获取本地玩家 ID，用于获取玩家对象
const player = Players.get(GameContext.localPlayerID);
```

## Database — 数据库查询

提供数据库级别的工具方法，如字符串哈希。

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Database.makeHash</API> | str | `int` | 字符串转哈希值 |

> **未验证前提**：`Database.query`（数据库查询）在源码中未找到实际调用，暂不列入方法表。

```javascript
// 来源 modules/base-standard/ui/unit-actions/unit-actions.js
// 使用哈希值判断核武器类型
parameters.Type = Database.makeHash("WMD_NUCLEAR_DEVICE");
```

## InterfaceMode — 界面模式

管理当前界面模式，支持模式切换和检查。

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>InterfaceMode.getCurrent</API> | — | `string` | 获取当前模式名 |
| <API>InterfaceMode.isInInterfaceMode</API> | modeName | `bool` | 检查是否在指定模式 |
| <API>InterfaceMode.isInDefaultMode</API> | — | `bool` | 检查是否在默认模式 |
| <API>InterfaceMode.switchTo</API> | modeName, ...args | `void` | 切换到指定模式 |
| <API>InterfaceMode.switchToDefault</API> | — | `void` | 切换回默认模式 |

> **未验证前提**：`InterfaceMode.addHandler`（添加模式处理器）在源码中未找到实际调用，暂不列入方法表。

```javascript
// 来源 modules/age-antiquity/ui/tutorial/tutorial-items-antiquity.js
// 检查当前界面模式并切换
if (InterfaceMode.getCurrent() == "INTERFACEMODE_CITY_PRODUCTION") {
  // 在城市生产界面
}
InterfaceMode.switchTo("INTERFACEMODE_TUTORIAL_START", { lazyInit: true });
InterfaceMode.switchToDefault();
```

## ComponentID — 组件 ID 工具

用于创建、比较和调试组件 ID 的工具方法。

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>ComponentID.isMatch</API> | id1, id2 | `bool` | 比较两个 ID |
| <API>ComponentID.isValid</API> | id | `bool` | 检查 ID 是否有效 |
| <API>ComponentID.toLogString</API> | id | `string` | ID 转日志字符串 |
| <API>ComponentID.getInvalidID</API> | — | `object` | 获取无效 ID |
| <API>ComponentID.fromString</API> | str | `object` | 字符串转 ComponentID |
| <API>ComponentID.make</API> | playerId, type, id | `object` | 构造 ComponentID |

> **未验证前提**：`ComponentID.toBitfield`（ID 转位域）、`ComponentID.isInvalid`（检查 ID 是否无效）在源码中未找到实际调用，暂不列入方法表。

```javascript
// 来源 modules/core/ui/utilities/utilities-data.js
// 判断贸易路线是否经过某城市
if (ComponentID.isMatch(route.leftCityID, cityId)) {
  return Cities.get(route.leftCityID);
}

// 来源 modules/core/ui/utilities/utilities-image.js
// 输出 ID 日志
console.error("Failed attempt to get a unit icon for unit cid: ", ComponentID.toLogString(componentID));
```

---

<API id="GameContext.localPlayerID"><h3>GameContext.localPlayerID</h3>

**说明**：获取本地玩家 ID，在热座模式下会随着当前操作玩家而变化。

**返回值**: `int` — 本地玩家 ID

**使用示例**:

```javascript
// 来源 modules/age-antiquity/ui/tutorial/tutorial-items-antiquity.js
// 获取本地玩家对象
const player = Players.get(GameContext.localPlayerID);
```

</API>

<API id="Database.makeHash"><h3>Database.makeHash(str)</h3>

**说明**：将字符串转换为数据库哈希值，用于类型比较和查询。

| 参数名 | 类型 | 说明 |
|------|------|------|
| str | `string` | 要哈希的字符串 |

**返回值**: `int` — 哈希值

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/unit-actions/unit-actions.js
// 使用哈希值判断核武器类型
parameters.Type = Database.makeHash("WMD_NUCLEAR_DEVICE");
```

</API>

<API id="InterfaceMode.getCurrent"><h3>InterfaceMode.getCurrent()</h3>

**说明**：获取当前界面模式名称。

**参数**: 无

**返回值**: `string` — 当前模式名（如 `"INTERFACEMODE_CITY_PRODUCTION"`）

**使用示例**:

```javascript
// 来源 modules/age-antiquity/ui/tutorial/tutorial-items-antiquity.js
// 检查当前是否在城市生产界面
if (InterfaceMode.getCurrent() == "INTERFACEMODE_CITY_PRODUCTION") {
  // 在城市生产界面
}
```

</API>

<API id="InterfaceMode.isInInterfaceMode"><h3>InterfaceMode.isInInterfaceMode(modeName)</h3>

**说明**：检查当前是否在指定的界面模式中。

| 参数名 | 类型 | 说明 |
|------|------|------|
| modeName | `string` | 模式名称，如 `"INTERFACEMODE_DIPLOMACY_HUB"` |

**返回值**: `bool` — 是否在指定模式中

**使用示例**:

```javascript
// 来源 modules/age-antiquity/ui/tutorial/tutorial-items-antiquity.js
// 检查是否在外交中心界面
if (InterfaceMode.isInInterfaceMode("INTERFACEMODE_DIPLOMACY_HUB")) {
  // 在外交界面中
}
```

</API>

<API id="InterfaceMode.isInDefaultMode"><h3>InterfaceMode.isInDefaultMode()</h3>

**说明**：检查当前是否在默认界面模式中。

**参数**: 无

**返回值**: `bool` — 是否在默认模式中

**使用示例**:

```javascript
// 来源 modules/age-antiquity/ui/tutorial/tutorial-items-antiquity.js
// 如果在默认模式则设置输入上下文，否则切回默认模式
InterfaceMode.isInDefaultMode() ? Input.setActiveContext(InputContext.World) : InterfaceMode.switchToDefault();
```

</API>

<API id="InterfaceMode.switchTo"><h3>InterfaceMode.switchTo(modeName, ...args)</h3>

**说明**：切换到指定的界面模式。

| 参数名 | 类型 | 说明 |
|------|------|------|
| modeName | `string` | 目标模式名称，如 `"INTERFACEMODE_TUTORIAL_START"` |
| ...args | `any` | 可选参数，如 `{ lazyInit: true }` |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/age-antiquity/ui/tutorial/tutorial-items-antiquity.js
// 切换到教程开始界面模式
InterfaceMode.switchTo("INTERFACEMODE_TUTORIAL_START", { lazyInit: true });
```

</API>

<API id="InterfaceMode.switchToDefault"><h3>InterfaceMode.switchToDefault()</h3>

**说明**：切换回默认界面模式。

**参数**: 无

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui-next/screens/hotseat/hotseat-curtain.js
// 切回默认模式
InterfaceMode.switchToDefault();
```

</API>

<API id="ComponentID.isMatch"><h3>ComponentID.isMatch(id1, id2)</h3>

**说明**：比较两个 ComponentID 是否相等。

| 参数名 | 类型 | 说明 |
|------|------|------|
| id1 | `object` | 第一个 ID |
| id2 | `object` | 第二个 ID |

**返回值**: `bool` — 是否匹配

**使用示例**:

```javascript
// 来源 modules/core/ui/utilities/utilities-data.js
// 判断贸易路线是否经过某城市
if (ComponentID.isMatch(route.leftCityID, cityId)) {
  return Cities.get(route.leftCityID);
}
```

</API>

<API id="ComponentID.isValid"><h3>ComponentID.isValid(id)</h3>

**说明**：检查 ComponentID 是否有效。

| 参数名 | 类型 | 说明 |
|------|------|------|
| id | `object` | 要检查的 ID |

**返回值**: `bool` — 是否有效

**使用示例**:

```javascript
// 来源 modules/base-standard/ui-next/tooltips/plot-tooltip/helpers.js
// 检查区域 ID 是否有效
if (district && ComponentID.isValid(districtId) && district.owner != district.controllingPlayer) {
  // 处理被占领区域
}
```

</API>

<API id="ComponentID.toLogString"><h3>ComponentID.toLogString(id)</h3>

**说明**：将 ComponentID 转换为可读的日志字符串，用于调试输出。

| 参数名 | 类型 | 说明 |
|------|------|------|
| id | `object` | 要转换的 ID |

**返回值**: `string` — 日志字符串

**使用示例**:

```javascript
// 来源 modules/core/ui/utilities/utilities-image.js
// 输出 ID 日志
console.error("Failed attempt to get a unit icon for unit cid: ", ComponentID.toLogString(componentID));
```

</API>

<API id="ComponentID.getInvalidID"><h3>ComponentID.getInvalidID()</h3>

**说明**：获取一个表示无效的 ComponentID 常量。

**参数**: 无

**返回值**: `object` — 无效 ID

**使用示例**:

```javascript
// 来源 modules/core/ui/utilities/utilities-databinding.js
// 获取无效 ID 作为默认值
return ComponentID.getInvalidID();
```

</API>

<API id="ComponentID.fromString"><h3>ComponentID.fromString(str)</h3>

**说明**：将字符串解析为 ComponentID 对象。

| 参数名 | 类型 | 说明 |
|------|------|------|
| str | `string` | 要解析的字符串 |

**返回值**: `object` — 解析后的 ComponentID

**使用示例**:

```javascript
// 来源 modules/core/ui/utilities/utilities-databinding.js
// 从字符串解析 ComponentID
return ComponentID.fromString(foundID);
```

</API>

<API id="ComponentID.make"><h3>ComponentID.make(playerId, type, id)</h3>

**说明**：通过玩家 ID、类型和 ID 构造 ComponentID 对象。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerId | `int` | 玩家 ID |
| type | `int` | 组件类型，如 `COMPONENTID_TYPE_CITY` |
| id | `int` | 组件 ID |

**返回值**: `object` — 构造的 ComponentID

**使用示例**:

```javascript
// 来源 modules/base-standard/ui-next/screens/victories/victories-screen-model.js
// 构造城市 ComponentID
const cityId = ComponentID.make(player.id, COMPONENTID_TYPE_CITY, score.id);
```

</API>