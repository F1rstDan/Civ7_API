---
title: Districts 区域
doc_type: object-api
summary: 城区管理全局对象，负责区域获取、建造物查询、位置管理。
primary_scope:
  - Districts
related_scope:
  - GameInfo.Districts
  - player.Districts
source:
  - TunerPanels/Districts.ltp
---

# Districts 区域

城区管理全局对象，用于获取区域、查询建造物、管理区域位置。引擎直接注入，无需手动 import 引入。

```javascript
// 快速示例：获取区域基本信息
// 来源 Districts.ltp
const district = Districts.get(districtId);
console.log(district.type, district.cityId, district.location);
console.log(district.isQuarter, district.isUniqueQuarter);
```

## 方法列表（共 6 个）

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Districts.get</API> | id | `District` | 根据 ID 获取城区对象 |
| <API>Districts.getAtLocation</API> | location | `District` | 获取指定位置的城区 |
| <API>Districts.lookup</API> | type | `object` | 根据类型查询城区定义 |
| <API>Districts.getFreeConstructible</API> | districtID | `object` | 获取空闲的可建造物 |
| <API>Districts.getLocations</API> | districtID | `array` | 获取城区的所有位置 |
| <API>Districts.getIdAtLocation</API> | location | `int` | 获取指定位置的城区 ID |

## TunerPanel 补充：Districts 完整 API（来源 Districts.ltp）

### Districts 全局对象

```javascript
// 来源 Districts.ltp
const district = Districts.get(districtId);

// 基本属性
district.location;          // {x, y}
district.type;              // 类型哈希
district.cityId;            // 所属城市 ComponentID
district.originalOwner;     // 原始所有者

// 状态属性
district.isQuarter;         // 是否为街区
district.isUniqueQuarter;   // 是否为独特街区
district.isUrbanCore;       // 是否为城市核心
district.isDefensible;      // 是否可防御

// 生命值
district.getMaxDamage;      // 最大生命值
district.getDamage;         // 当前伤害
district.changeDamage(10);  // 改变伤害值（正数扣血，负数治疗）

// 建筑/改良
for (const id of district.getConstructibleIdsOfClass("BUILDING")) { /* ... */ }
for (const id of district.getConstructibleIdsOfClass("IMPROVEMENT")) { /* ... */ }
```

### player.Districts 子系统

```javascript
// 来源 Districts.ltp
const pDistricts = player.Districts;
for (const districtId of pDistricts.getDistrictIds()) {
  const district = Districts.get(districtId);
}
```

## GameInfo 关联表

```javascript
GameInfo.Districts;        // 区域定义表
GameInfo.Constructibles;   // 建筑/改良/奇观定义表
```

---

<API id="Districts.get"><h3>Districts.get(id)</h3>

**说明**: 根据 ID 获取城区对象。ID 无效时返回 `undefined`。

| 参数名 | 类型 | 说明 |
|------|------|------|
| id | `int` | 城区 ID |

**返回值**: `District` \| `undefined`

**使用示例**:

```javascript
// 来源 Districts.ltp
// 获取城区并读取基本属性
const district = Districts.get(districtId);
if (district) {
  console.log(district.type, district.cityId, district.location);
}
```

</API>
<API id="Districts.getAtLocation"><h3>Districts.getAtLocation(location)</h3>

**说明**: 获取指定位置的城区对象。

| 参数名 | 类型 | 说明 |
|------|------|------|
| location | `object` | 坐标 `{x, y}` |

**返回值**: `District` \| `undefined`

**使用示例**:

```javascript
// 来源 Districts.ltp
// 根据坐标获取城区
const district = Districts.getAtLocation({ x: 10, y: 20 });
```

</API>
<API id="Districts.lookup"><h3>Districts.lookup(type)</h3>

**说明**: 根据类型哈希查询城区定义。

| 参数名 | 类型 | 说明 |
|------|------|------|
| type | `int` | 类型哈希值 |

**返回值**: `object` \| `undefined`

</API>
<API id="Districts.getFreeConstructible"><h3>Districts.getFreeConstructible(districtID)</h3>

**说明**: 获取城区中空闲的可建造物槽位。

| 参数名 | 类型 | 说明 |
|------|------|------|
| districtID | `int` | 城区 ID |

**返回值**: `object` \| `undefined`

</API>
<API id="Districts.getLocations"><h3>Districts.getLocations(districtID)</h3>

**说明**: 获取城区占据的所有地块位置。

| 参数名 | 类型 | 说明 |
|------|------|------|
| districtID | `int` | 城区 ID |

**返回值**: `array`

</API>
<API id="Districts.getIdAtLocation"><h3>Districts.getIdAtLocation(location)</h3>

**说明**: 获取指定位置的城区 ID。

| 参数名 | 类型 | 说明 |
|------|------|------|
| location | `object` | 坐标 `{x, y}` |

**返回值**: `int`

</API>