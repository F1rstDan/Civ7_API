---
title: Districts
---

# Districts

城区管理全局对象。

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `get` | id | `District` | 根据 ID 获取城区对象 |
| `getAtLocation` | location | `District` | 获取指定位置的城区 |
| `lookup` | type | `object` | 根据类型查询城区定义 |
| `getFreeConstructible` | districtID | `object` | 获取空闲的可建造物 |
| `getLocations` | districtID | `array` | 获取城区的所有位置 |
| `getIdAtLocation` | location | `int` | 获取指定位置的城区 ID |
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

### 常用 GameInfo 表

```javascript
GameInfo.Districts;        // 区域定义表
GameInfo.Constructibles;   // 建筑/改良/奇观定义表
```

---

*来源：Districts.ltp*
