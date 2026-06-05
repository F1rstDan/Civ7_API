---
title: 全局工具对象
doc_type: reference
summary: 全局工具函数和辅助对象参考，包括 GameContext、Database、InterfaceMode、ComponentID 等。
primary_scope:
  - globals
related_scope:
  - GameContext
  - Database
  - InterfaceMode
  - ComponentID
source:
  - 源码全局对象分析
---

# 全局工具对象

全局工具函数和辅助对象。从不通过 import 引入，引擎直接注入。

## GameContext — 游戏上下文

| 属性 | 类型 | 说明 |
|------|------|------|
| `localPlayerID` | `int` | 本地玩家 ID（热座模式下会变化） |
| `localObserverID` | `int` | 本地观察者 ID |

```javascript
// 来源 源码全局对象
// 获取本地玩家对象
const player = Players.get(GameContext.localPlayerID);
```

## Database — 数据库查询

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `makeHash` | str | `int` | 字符串转哈希值 |
| `query` | queryType, ...args | `array` | 执行数据库查询 |

```javascript
// 来源 源码全局对象
// 使用哈希值判断单位核心类别
const HASH = Database.makeHash('CORE_CLASS_MILITARY');
if (unit.coreClass == HASH) { /* 军事单位 */ }
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
// 来源 源码全局对象
// 检查当前界面模式
if (InterfaceMode.getCurrent() == 'INTERFACEMODE_CITY_PRODUCTION') {
  // 在城市生产界面
}
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