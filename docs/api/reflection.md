---
title: ReflectionArchives 调试反射
doc_type: other
summary: ReflectionArchives 是文明7的调试反射系统，允许检查游戏对象的内部状态。
primary_scope:
  - ReflectionArchives
  - archive
related_scope:
  - Network
  - UI
source:
  - TunerPanels/Reflection.ltp
  - TunerPanels/Cities.ltp
  - TunerPanels/Districts.ltp
  - TunerPanels/Units.ltp
doc_update: 2026-06-06
---

# ReflectionArchives 调试反射

ReflectionArchives 是文明7的调试反射系统，允许检查游戏对象的内部状态。由 Live Tuner 在运行时注入，不含 JS 模块源码——所有 API 均来自 `TunerPanels/Reflection.ltp` 面板定义。

## 快速示例

```javascript
// 来源 TunerPanels/Reflection.ltp
// 获取根级档案并查看成员
const archive = ReflectionArchives.getGame();
const memberCount = archive.memberCount;
for (let i = 0; i < memberCount; ++i) {
  const member = archive.getMember(i);
  console.log(member.id, member.name);
}
```

```javascript
// 来源 TunerPanels/Reflection.ltp
// 按组件 ID 获取档案并检查子档案
const archive = ReflectionArchives.getByComponentID(cityId);
const children = archive.getChildren();
for (const child of children) {
  console.log(child.typeStr, child.id.id);
}
```

## 属性与方法

| 属性 | 类型 | 说明 |
|------|------|------|
| `ReflectionArchives.showVerboseValues` | `bool` | 是否显示详细值 |

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>ReflectionArchives.getGame</API> | — | `Archive` | 获取游戏档案 |
| <API>ReflectionArchives.getMap</API> | — | `Archive` | 获取地图档案 |
| <API>ReflectionArchives.getPlayers</API> | — | `Archive` | 获取玩家档案 |
| <API>ReflectionArchives.getByComponentID</API> | componentId | `Archive` | 按组件 ID 获取档案 |
| <API>ReflectionArchives.setVerboseValues</API> | enabled | `void` | 设置详细值显示 |

## 档案实例的属性与方法

`ReflectionArchives` 的 `getGame()`、`getMap()`、`getPlayers()`、`getByComponentID()` 等方法返回档案实例，其结构如下：

```javascript
// 来源 TunerPanels/Reflection.ltp
// 档案实例的结构和使用方式
const archive = ReflectionArchives.getByComponentID(cityId);
// archive.typeStr          — 类型字符串
// archive.id               — 对象 ID {owner, id}
// archive.memberCount      — 成员数量
console.log(archive.typeStr, archive.id.owner, archive.id.id);
```

| 属性 | 类型 | 说明 |
|------|------|------|
| `archive.typeStr` | `string` | 类型字符串 |
| `archive.id` | `object` | 对象 ID，包含 `owner` 和 `id` |
| `archive.memberCount` | `int` | 成员数量 |

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `archive.getChildren()` | — | `array` | 获取子档案数组，每个元素 `{typeStr, id: {id}}` |
| `archive.getChild(index)` | `int` | `Archive` | 获取指定索引的子档案 |
| `archive.getParent()` | — | `Archive` | 获取父档案 |
| `archive.getMember(index)` | `int` | `object` | 获取成员对象 `{id, name}` |
| `archive.getMemberValueString(memberId)` | `int` | `string` | 获取成员值字符串 |
| `archive.getLastAnalysisString()` | — | `string` | 获取最后分析字符串 |
| `archive.getMembersHash()` | — | `int` | 获取成员哈希 |
| `archive.getMemberValueHash(memberId)` | `int` | `int` | 获取成员值哈希 |
| `archive.setMemberToDesync(memberId)` | `int` | `void` | 设置成员为不同步（调试用） |
| `archive.scrambleMemberValue(memberId)` | `int` | `void` | 扰乱成员值（调试用） |
| `archive.setMemberToLogHash(memberId, enabled)` | `int`, `bool` | `void` | 设置成员记录哈希（调试用） |

## 相关调试接口

```javascript
// 来源 TunerPanels/Reflection.ltp
// 测试哈希同步
Network.testHashing(0);
```

```javascript
// 来源 TunerPanels/Reflection.ltp
// 复制文本到剪贴板
UI.setClipboardText(str);
```

## 相关全局对象

| 对象 | 说明 |
|------|------|
| `Network` | 网络系统，`testHashing()` 用于调试同步 |
| `UI` | UI 系统，`setClipboardText()` 用于复制调试信息 |

<API id="ReflectionArchives.getGame"><h3>ReflectionArchives.getGame()</h3>

**说明**: 获取游戏级档案，用于检查游戏全局状态。

**参数**: 无

**返回值**: `Archive`

**使用示例**:

```javascript
// 来源 TunerPanels/Reflection.ltp
// 获取游戏档案
const archive = ReflectionArchives.getGame();
```

</API>

<API id="ReflectionArchives.getMap"><h3>ReflectionArchives.getMap()</h3>

**说明**: 获取地图级档案，用于检查地图全局状态。

**参数**: 无

**返回值**: `Archive`

**使用示例**:

```javascript
// 来源 TunerPanels/Reflection.ltp
// 获取地图档案
const archive = ReflectionArchives.getMap();
```

</API>

<API id="ReflectionArchives.getPlayers"><h3>ReflectionArchives.getPlayers()</h3>

**说明**: 获取玩家级档案，用于检查玩家全局状态。

**参数**: 无

**返回值**: `Archive`

**使用示例**:

```javascript
// 来源 TunerPanels/Reflection.ltp
// 获取玩家档案
const archive = ReflectionArchives.getPlayers();
```

</API>

<API id="ReflectionArchives.getByComponentID"><h3>ReflectionArchives.getByComponentID(componentId)</h3>

**说明**: 按组件 ID 获取对应的档案对象。在 Cities、Districts、Units 等多个面板中被广泛使用。

| 参数名 | 类型 | 说明 |
|------|------|------|
| componentId | `int` | 组件 ID（如城市 ID、区域 ID、单位 ID 等） |

**返回值**: `Archive`

**使用示例**:

```javascript
// 来源 TunerPanels/Cities.ltp
// 按组件 ID 获取档案
const archive = ReflectionArchives.getByComponentID(cityId);
```

</API>

<API id="ReflectionArchives.setVerboseValues"><h3>ReflectionArchives.setVerboseValues(enabled)</h3>

**说明**: 设置是否显示详细值。开启后成员值会输出更详细的信息。

| 参数名 | 类型 | 说明 |
|------|------|------|
| enabled | `bool` | 是否启用详细值显示 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 TunerPanels/Reflection.ltp
// 开启详细值显示
ReflectionArchives.setVerboseValues(true);
```

</API>