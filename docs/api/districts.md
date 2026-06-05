---
title: Districts 区域
doc_type: object
summary: 城区管理全局对象，负责区域获取、建造物查询、位置管理。
primary_scope:
  - Districts
  - district
related_scope:
  - GameInfo.Districts
  - player.Districts
source:
  - TunerPanels/Districts.ltp
  - modules/base-standard/ui-next/tooltips/plot-tooltip/plot-tooltip.js
  - modules/base-standard/ui/interface-modes/support-city-decoration.js
  - modules/base-standard/ui/tuner-input/tuner-input.js
doc_update: 2026-06-05
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

## 方法（共 5 个）

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Districts.get</API> | id | `District` | 根据 ID 获取城区对象 |
| <API>Districts.getAtLocation</API> | location | `District` | 获取指定位置的城区 |
| <API>Districts.getFreeConstructible</API> | plotCoord, playerID | `object` | 获取空闲的可建造物 |
| <API>Districts.getLocations</API> | districtIDs | `array` | 获取城区的所有位置 |
| <API>Districts.getIdAtLocation</API> | location | `int` | 获取指定位置的城区 ID |

## 实例属性

District 实例对象包含以下属性：

```javascript
// 来源 Districts.ltp
// District 实例基本属性与状态
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

## 子系统

### player.Districts 子系统

```javascript
// 来源 Districts.ltp
// 遍历玩家管辖的所有城区
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

```javascript
// 来源 Districts.ltp
// 根据区域类型哈希查询区域定义
const info = GameInfo.Districts.lookup(district.type);
if (info != null) {
  console.log(info.DistrictType);
}
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
<API id="Districts.getFreeConstructible"><h3>Districts.getFreeConstructible(plotCoord, playerID)</h3>

**说明**: 获取指定地块上空闲的可建造物槽位。无空闲时返回 `-1`。

| 参数名 | 类型 | 说明 |
|------|------|------|
| plotCoord | `object` | 地块坐标 `{x, y}` |
| playerID | `int` | 玩家 ID |

**返回值**: `object` \| `-1`

**使用示例**:

```javascript
// 来源 plot-tooltip.js
// 查询地块上可建造的空闲槽位
const freeConstructible = Districts.getFreeConstructible(plotCoord, GameContext.localPlayerID);
if (freeConstructible !== -1) {
  console.log(freeConstructible);
}
```

</API>
<API id="Districts.getLocations"><h3>Districts.getLocations(districtIDs)</h3>

**说明**: 获取城区占据的所有地块位置。

| 参数名 | 类型 | 说明 |
|------|------|------|
| districtIDs | `array` | 城区 ID 数组 |

**返回值**: `array`

**使用示例**:

```javascript
// 来源 support-city-decoration.js
// 获取城区占据的所有地块坐标
const districtIdsRural = cityDistricts.getIdsOfType(DistrictTypes.RURAL);
const locations = Districts.getLocations(districtIdsRural);
if (locations.length > 0) {
  console.log(locations);
}
```

</API>
<API id="Districts.getIdAtLocation"><h3>Districts.getIdAtLocation(location)</h3>

**说明**: 获取指定位置的城区 ID。

| 参数名 | 类型 | 说明 |
|------|------|------|
| location | `object` | 坐标 `{x, y}` |

**返回值**: `int`

**使用示例**:

```javascript
// 来源 tuner-input.js
// 根据坐标查询城区 ID
const districtId = Districts.getIdAtLocation(loc);
if (districtId && districtId.owner !== -1 && districtId.id !== -1) {
  console.log(districtId);
}
```

</API>