---
title: 全局工具对象
doc_type: data
summary: 全局工具函数和辅助对象参考，包括 GameContext、Database、InterfaceMode、ComponentID 等。
primary_scope:
  - globals
related_scope:
  - GameContext
  - Database
  - InterfaceMode
  - ComponentID
source:
  - modules/age-antiquity/ui/tutorial/tutorial-items-antiquity.js
  - modules/base-standard/ui/unit-actions/unit-actions.js
  - modules/core/ui/utilities/utilities-data.js
  - modules/core/ui/utilities/utilities-image.js
doc_update: 2026-06-05
---

# globals 全局工具对象

全局工具函数和辅助对象。从不通过 import 引入，引擎直接注入。

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

| 属性 | 类型 | 说明 |
|------|------|------|
| `localPlayerID` | `int` | 本地玩家 ID（热座模式下会变化） |
| `localObserverID` | `int` | 本地观察者 ID |

```javascript
// 来源 modules/age-antiquity/ui/tutorial/tutorial-items-antiquity.js
// 获取本地玩家对象
const player = Players.get(GameContext.localPlayerID);
```

## Database — 数据库查询

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `makeHash` | str | `int` | 字符串转哈希值 |
| `query` | queryType, ...args | `array` | 执行数据库查询 |

```javascript
// 来源 modules/base-standard/ui/unit-actions/unit-actions.js
// 使用哈希值判断核武器类型
parameters.Type = Database.makeHash("WMD_NUCLEAR_DEVICE");
```

## InterfaceMode — 界面模式

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `isInInterfaceMode` | modeName | `bool` | 检查是否在指定模式 |
| `switchTo` | modeName, ...args | `void` | 切换到指定模式 |
| `getCurrent` | — | `string` | 获取当前模式名 |
| `addHandler` | modeName, handler | `void` | 添加模式处理器 |
| `switchToDefault` | — | `void` | 切换回默认模式 |

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

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `isMatch` | id1, id2 | `bool` | 比较两个 ID |
| `isValid` | id | `bool` | 检查 ID 是否有效 |
| `toLogString` | id | `string` | ID 转日志字符串 |
| `toBitfield` | id | `int` | ID 转位域 |
| `getInvalidID` | — | `object` | 获取无效 ID |
| `isInvalid` | id | `bool` | 检查 ID 是否无效 |

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