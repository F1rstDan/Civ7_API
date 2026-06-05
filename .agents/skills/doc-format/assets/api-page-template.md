---
title: 示例 对象名称
doc_type: object-api
summary: 一句话说明该文档覆盖的 API 范围。
primary_scope:
  - SomeAPI
related_scope:
  - GameInfo.SomeTable
source:
  - TunerPanels/Example.ltp
  - modules/base-standard/ui/example/example.js
doc_update: 2026-06-05
---

# 示例对象 对象名称

一句话说明该对象的定位和用途。用于 xxx 操作。引擎直接注入，无需手动 import 引入。

```javascript
// 快速示例：展示最常用的 1-3 个操作
// 来源 xxx.ltp
// 简要描述功能
const obj = SomeAPI.get(id);
if (obj) {
  console.log(obj.name);
}
```

## 方法列表（共 N 个）

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>SomeAPI.get</API> | id | `Object` | 根据 ID 获取对象 |
| <API>SomeAPI.forEach</API> | callback | `void` | 遍历所有对象 |
| <API>SomeAPI.getHash</API> | — | `int` | 获取对象哈希值 |

## 子对象/子系统

对象内部包含以下子系统：

| 子系统 | 说明 |
|--------|------|
| obj.SubA | 子系统 A 描述 |
| obj.SubB | 子系统 B 描述 |

### SubA 子系统

```javascript
// 来源 xxx.ltp
// 简要描述功能
const sub = obj.SubA;
sub.methodA(arg);
sub.methodB();
```

### SubB 子系统

```javascript
// 来源 xxx/xxx.js
// 简要描述功能
const sub = obj.SubB;
sub.methodC();
```

## 常用枚举

| 枚举 | 说明 |
|------|------|
| `EnumType.VALUE_A` | 值 A 说明 |
| `EnumType.VALUE_B` | 值 B 说明 |

## GameInfo 关联表

```javascript
GameInfo.SomeTable;    // 某定义表
GameInfo.OtherTable;   // 其他定义表
```

## 相关全局对象

| 对象 | 说明 |
|------|------|
| OtherAPI.method() | 用途说明 |

<API id="SomeAPI.get"><h3>SomeAPI.get(id)</h3>

**说明**: 根据 ID 获取对象。ID 无效时返回 `undefined`。

| 参数名 | 类型 | 说明 |
|------|------|------|
| id | `int` | 对象 ID |

**返回值**: `Object` | `undefined`

**使用示例**:

```javascript
// 来源 xxx/xxx.js
// 简要描述功能
const obj = SomeAPI.get(id);
if (obj) {
  console.log(obj.name);
}
```

</API>
<API id="SomeAPI.getHash"><h3>SomeAPI.getHash()</h3>

**说明**: 获取游戏哈希值。

**参数**: 无

**返回值**: `int`

**使用示例**:

```javascript
// 来源 xxx/xxx.js
// 简要描述功能
const obj = SomeAPI.getHash();
if (obj) {
  console.log(obj);
}
```

</API>
