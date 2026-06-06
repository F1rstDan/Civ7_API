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
  - modules/core/ui/utilities/diplomacy-utilities.js
  - modules/base-standard/ui/action/panel-action.js
  - modules/core/ui/context-manager/context-manager.js
  - modules/base-standard/ui/interface-modes/interface-mode-default.js
  - modules/core/ui/input/hotkey-manager.js
  - modules/base-standard/ui/civilopedia/screen-civilopedia.js
  - modules/base-standard/ui/root-game.js
  - modules/base-standard/ui/city-banners/city-banner-manager.js
  - modules/base-standard/ui/tutorial/tutorial-support.js
  - modules/base-standard/ui/interface-modes/support-unit-map-decoration.js
  - modules/core/ui/utilities/utilities-databinding.js
doc_update: 2026-06-06
---

# globals 全局工具对象

引擎直接注入的全局工具对象，无需 `import`，在脚本中直接使用。本页聚合了 4 个小型全局对象，每个对象 API 较少，不适合独立成页。

## 快速示例

```javascript
// 来源 modules/base-standard/ui/action/panel-action.js
// 发送回合结束并获取本地玩家 ID
if (!GameContext.hasSentTurnComplete()) {
  GameContext.sendTurnComplete();
}

// 来源 modules/core/ui/utilities/utilities-data.js
// 数据库查询示例
const results = Database.query("gamecore", "SELECT * FROM Units WHERE Owner = ?", playerId);
```

## GameContext — 游戏上下文

提供当前游戏会话的上下文信息，如本地玩家 ID、回合控制、暂停/退出请求。

| 属性 | 类型 | 说明 |
|------|------|------|
| <API>GameContext.localPlayerID</API> | `int` | 本地玩家 ID（热座模式下会变化） |
| <API>GameContext.localObserverID</API> | `int` | 本地观察者 ID（多用于外交关系判断） |

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>GameContext.hasSentTurnComplete</API> | — | `bool` | 是否已发送回合完成 |
| <API>GameContext.sendTurnComplete</API> | — | `void` | 发送回合完成 |
| <API>GameContext.sendUnreadyTurn</API> | — | `void` | 发送回合未就绪（取消回合完成） |
| <API>GameContext.hasSentTurnUnreadyThisTurn</API> | — | `bool` | 本回合是否已发送取消 |
| <API>GameContext.hasSentRetire</API> | — | `bool` | 是否已发送退出请求 |
| <API>GameContext.sendRetireRequest</API> | — | `void` | 发送退出游戏请求 |
| <API>GameContext.sendPauseRequest</API> | pause | `void` | 发送暂停/恢复请求 |

```javascript
// 来源 modules/core/ui/utilities/diplomacy-utilities.js
// 使用 localObserverID 判断外交关系
if (playerDiplomacy.isAtWarWith(GameContext.localObserverID)) {
  relationshipIcon = UI.getIconCSS("PLAYER_RELATIONSHIP_AT_WAR", "PLAYER_RELATIONSHIP");
}

// 来源 modules/base-standard/ui/action/panel-action.js
// 发送回合完成
if (!GameContext.hasSentTurnComplete()) {
  GameContext.sendTurnComplete();
}

// 来源 modules/base-standard/ui-next/screens/pause-menu/pause-menu-model.js
// 退出游戏并暂停
GameContext.sendRetireRequest();
GameContext.sendPauseRequest(true);
```

## Database — 数据库查询

提供数据库级别的工具方法，如字符串哈希和 SQL 查询。

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Database.makeHash</API> | str | `int` | 字符串转哈希值 |
| <API>Database.query</API> | dbName, sql, ...params | `array` | 执行数据库 SQL 查询 |

```javascript
// 来源 modules/base-standard/ui/unit-actions/unit-actions.js
// 使用哈希值判断核武器类型
parameters.Type = Database.makeHash("WMD_NUCLEAR_DEVICE");

// 来源 modules/core/ui/utilities/utilities-data.js
// 执行数据库查询
const results = Database.query(this.dbName, sql);
```

## InterfaceMode — 界面模式

管理当前界面模式，支持模式切换、检查、处理器注册和参数获取。

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>InterfaceMode.getCurrent</API> | — | `string` | 获取当前模式名 |
| <API>InterfaceMode.isInInterfaceMode</API> | modeName | `bool` | 检查是否在指定模式 |
| <API>InterfaceMode.isInDefaultMode</API> | — | `bool` | 检查是否在默认模式 |
| <API>InterfaceMode.switchTo</API> | modeName, ...args | `void` | 切换到指定模式 |
| <API>InterfaceMode.switchToDefault</API> | — | `void` | 切换回默认模式 |
| <API>InterfaceMode.addHandler</API> | name, handler | `void` | 注册界面模式处理器 |
| <API>InterfaceMode.getParameters</API> | — | `object` | 获取当前模式的参数 |
| <API>InterfaceMode.allowsHotKeys</API> | — | `bool` | 检查当前模式是否允许快捷键 |
| <API>InterfaceMode.startup</API> | — | `void` | 启动界面模式系统 |

```javascript
// 来源 modules/age-antiquity/ui/tutorial/tutorial-items-antiquity.js
// 检查当前界面模式并切换
if (InterfaceMode.getCurrent() == "INTERFACEMODE_CITY_PRODUCTION") {
  // 在城市生产界面
}
InterfaceMode.switchTo("INTERFACEMODE_TUTORIAL_START", { lazyInit: true });
InterfaceMode.switchToDefault();

// 来源 modules/base-standard/ui/interface-modes/interface-mode-default.js
// 注册默认界面模式处理器
InterfaceMode.addHandler("INTERFACEMODE_DEFAULT", new DefaultInterfaceMode());

// 来源 modules/core/ui/input/hotkey-manager.js
// 检查是否允许快捷键
if (InterfaceMode.allowsHotKeys()) {
  window.dispatchEvent(new CustomEvent("hotkey-" + inputActionName));
}

// 来源 modules/base-standard/ui/root-game.js
// 启动界面模式系统
InterfaceMode.startup();
```

## ComponentID — 组件 ID 工具

用于创建、比较、转换和调试组件 ID 的工具方法。

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>ComponentID.isMatch</API> | id1, id2 | `bool` | 比较两个 ID |
| <API>ComponentID.isValid</API> | id | `bool` | 检查 ID 是否有效 |
| <API>ComponentID.isInvalid</API> | id | `bool` | 检查 ID 是否无效 |
| <API>ComponentID.toLogString</API> | id | `string` | ID 转日志字符串 |
| <API>ComponentID.toString</API> | id | `string` | ID 转字符串 |
| <API>ComponentID.toBitfield</API> | id | `int` | ID 转位域值（用于 Map 键） |
| <API>ComponentID.getInvalidID</API> | — | `object` | 获取无效 ID |
| <API>ComponentID.fromString</API> | str | `object` | 字符串转 ComponentID |
| <API>ComponentID.make</API> | playerId, type, id | `object` | 构造 ComponentID |

```javascript
// 来源 modules/core/ui/utilities/utilities-data.js
// 判断贸易路线是否经过某城市
if (ComponentID.isMatch(route.leftCityID, cityId)) {
  return Cities.get(route.leftCityID);
}

// 来源 modules/base-standard/ui/interface-modes/support-unit-map-decoration.js
// 检查 ID 是否无效
if (ComponentID.isInvalid(this.unitID)) {
  console.warn("UnitMapDecorationSupport - Invalid unit ID in update()");
  return;
}

// 来源 modules/base-standard/ui/city-banners/city-banner-manager.js
// 转换 ID 为位域和字符串
const cityBanner = this.banners.get(ComponentID.toBitfield(data.targetCity));
banner.setAttribute("city-id", ComponentID.toString(cityComponentID));

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

<API id="GameContext.localObserverID"><h3>GameContext.localObserverID</h3>

**说明**：获取本地观察者 ID，多用于外交关系判断。

**返回值**: `int` — 本地观察者 ID

**使用示例**:

```javascript
// 来源 modules/core/ui/utilities/diplomacy-utilities.js
// 判断与本地观察者的外交关系
if (playerDiplomacy.isAtWarWith(GameContext.localObserverID)) {
  relationshipIcon = UI.getIconCSS("PLAYER_RELATIONSHIP_AT_WAR", "PLAYER_RELATIONSHIP");
}
```

</API>

<API id="GameContext.hasSentTurnComplete"><h3>GameContext.hasSentTurnComplete()</h3>

**说明**：检查是否已发送回合完成。

**参数**: 无

**返回值**: `bool` — 是否已发送回合完成

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/action/panel-action.js
// 检查是否已发送回合完成，未发送则发送
if (!GameContext.hasSentTurnComplete()) {
  GameContext.sendTurnComplete();
}
```

</API>

<API id="GameContext.sendTurnComplete"><h3>GameContext.sendTurnComplete()</h3>

**说明**：发送回合完成，结束当前回合。

**参数**: 无

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/action/panel-action.js
// 发送回合完成
GameContext.sendTurnComplete();
```

</API>

<API id="GameContext.sendUnreadyTurn"><h3>GameContext.sendUnreadyTurn()</h3>

**说明**：发送回合未就绪，取消之前发送的回合完成。

**参数**: 无

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/action/panel-action.js
// 取消回合完成
GameContext.sendUnreadyTurn();
```

</API>

<API id="GameContext.hasSentTurnUnreadyThisTurn"><h3>GameContext.hasSentTurnUnreadyThisTurn()</h3>

**说明**：检查本回合是否已发送未就绪（取消回合完成）。

**参数**: 无

**返回值**: `bool` — 是否已发送未就绪

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/action/panel-action.js
// 自动结束回合判断
if (Configuration.getUser().isAutoEndTurn == true && !GameContext.hasSentTurnUnreadyThisTurn()) {
  // 自动结束回合
}
```

</API>

<API id="GameContext.hasSentRetire"><h3>GameContext.hasSentRetire()</h3>

**说明**：检查是否已发送退出/退休请求。

**参数**: 无

**返回值**: `bool` — 是否已发送退出请求

**使用示例**:

```javascript
// 来源 modules/core/ui/context-manager/context-manager.js
// 检查游戏是否仍活跃
const isCinematic = DisplayQueueManager.activeDisplays.some((request) => request.category === "Cinematic");
return !isCinematic && !GameContext.hasSentRetire();
```

</API>

<API id="GameContext.sendRetireRequest"><h3>GameContext.sendRetireRequest()</h3>

**说明**：发送退出游戏请求。

**参数**: 无

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui-next/screens/pause-menu/pause-menu-model.js
// 退出游戏
GameContext.sendRetireRequest();
```

</API>

<API id="GameContext.sendPauseRequest"><h3>GameContext.sendPauseRequest(pause)</h3>

**说明**：发送暂停或恢复游戏的请求。

| 参数名 | 类型 | 说明 |
|------|------|------|
| pause | `bool` | `true` 暂停游戏，`false` 恢复游戏 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui-next/screens/pause-menu/pause-menu-model.js
// 退出游戏后暂停
GameContext.sendRetireRequest();
GameContext.sendPauseRequest(true);
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

<API id="Database.query"><h3>Database.query(dbName, sql, ...params)</h3>

**说明**：执行数据库 SQL 查询，返回结果数组。

| 参数名 | 类型 | 说明 |
|------|------|------|
| dbName | `string` | 数据库名称，如 `"gamecore"` |
| sql | `string` | SQL 查询语句 |
| ...params | `any` | 可选，SQL 参数绑定 |

**返回值**: `array` — 查询结果数组

**使用示例**:

```javascript
// 来源 modules/core/ui/utilities/utilities-data.js
// 执行数据库查询
const results = Database.query(this.dbName, sql);
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

<API id="InterfaceMode.addHandler"><h3>InterfaceMode.addHandler(name, handler)</h3>

**说明**：注册界面模式处理器。每个界面模式需要注册一个处理器对象，定义进入、退出、更新等行为。

| 参数名 | 类型 | 说明 |
|------|------|------|
| name | `string` | 模式名称，如 `"INTERFACEMODE_DEFAULT"` |
| handler | `object` | 模式处理器实例 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/interface-modes/interface-mode-default.js
// 注册默认界面模式处理器
InterfaceMode.addHandler("INTERFACEMODE_DEFAULT", new DefaultInterfaceMode());
```

</API>

<API id="InterfaceMode.getParameters"><h3>InterfaceMode.getParameters()</h3>

**说明**：获取当前界面模式的参数对象，用于在模式切换时传递上下文数据。

**参数**: 无

**返回值**: `object` — 当前模式的参数对象

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/civilopedia/screen-civilopedia.js
// 保存当前模式上下文以便返回
this.previousModeContext = InterfaceMode.getParameters();
```

</API>

<API id="InterfaceMode.allowsHotKeys"><h3>InterfaceMode.allowsHotKeys()</h3>

**说明**：检查当前界面模式是否允许快捷键操作。

**参数**: 无

**返回值**: `bool` — 是否允许快捷键

**使用示例**:

```javascript
// 来源 modules/core/ui/input/hotkey-manager.js
// 检查当前模式是否允许快捷键，允许则发送快捷键事件
if (InterfaceMode.allowsHotKeys()) {
  window.dispatchEvent(new CustomEvent("hotkey-" + inputActionName));
}
```

</API>

<API id="InterfaceMode.startup"><h3>InterfaceMode.startup()</h3>

**说明**：启动界面模式系统，在游戏初始化时调用。

**参数**: 无

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/root-game.js
// 游戏初始化时启动界面模式系统
engine.call("setSnapshotEnabled", false);
InterfaceMode.startup();
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

<API id="ComponentID.isInvalid"><h3>ComponentID.isInvalid(id)</h3>

**说明**：检查 ComponentID 是否无效，等同于 `!ComponentID.isValid(id)`。

| 参数名 | 类型 | 说明 |
|------|------|------|
| id | `object` | 要检查的 ID |

**返回值**: `bool` — 是否无效

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/interface-modes/support-unit-map-decoration.js
// 检查 ID 是否无效，无效则提前返回
if (ComponentID.isInvalid(this.unitID)) {
  console.warn("UnitMapDecorationSupport - Invalid unit ID in update()");
  return;
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

<API id="ComponentID.toString"><h3>ComponentID.toString(id)</h3>

**说明**：将 ComponentID 转换为字符串表示，常用于 DOM 属性赋值。

| 参数名 | 类型 | 说明 |
|------|------|------|
| id | `object` | 要转换的 ID |

**返回值**: `string` — 字符串表示

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/city-banners/city-banner-manager.js
// 将 ComponentID 转为字符串用于 DOM 属性
banner.setAttribute("city-id", ComponentID.toString(cityComponentID));
```

</API>

<API id="ComponentID.toBitfield"><h3>ComponentID.toBitfield(id)</h3>

**说明**：将 ComponentID 转换为位域整数值，常用于 Map 键值索引。

| 参数名 | 类型 | 说明 |
|------|------|------|
| id | `object` | 要转换的 ID |

**返回值**: `int` — 位域值

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/city-banners/city-banner-manager.js
// 使用位域值作为 Map 键查找对应 Banner
const cityBanner = this.banners.get(ComponentID.toBitfield(data.targetCity));
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