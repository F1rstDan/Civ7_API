---
title: Districts 区域
doc_type: object
summary: 城区管理全局对象，负责区域获取、建造物查询、位置管理。
primary_scope:
  - Districts
  - district
related_scope:
  - GameInfo.Districts
  - Players.Districts
  - player.Districts
  - city.Districts
source:
  - TunerPanels/Districts.ltp
  - modules/base-standard/ui-next/tooltips/plot-tooltip/plot-tooltip.js
  - modules/base-standard/ui/interface-modes/support-city-decoration.js
  - modules/base-standard/ui/tuner-input/tuner-input.js
  - modules/base-standard/ui/district/district-health-manager.js
doc_update: 2026-06-10
---

# Districts 区域

城区管理全局对象，用于获取区域、查询建造物、管理区域位置。引擎直接注入，无需手动 import 引入。

```javascript
// 快速示例：获取区域基本信息
// 来源 TunerPanels/Districts.ltp
const district = Districts.get(districtId);
console.log(district.type, district.cityId, district.location);
console.log(district.isQuarter, district.isUniqueQuarter);
```

## 全局方法（共 5 个）

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Districts.get</API> | id | `District` \| `undefined` | 根据 ID 获取城区对象 |
| <API>Districts.getAtLocation</API> | location | `District` \| `undefined` | 获取指定位置的城区 |
| <API>Districts.getFreeConstructible</API> | plotCoord, playerID | `object` \| `-1` | 获取空闲的可建造物槽位 |
| <API>Districts.getLocations</API> | districtIDs | `array<PlotCoord>` | 获取城区占据的所有地块位置 |
| <API>Districts.getIdAtLocation</API> | location | `ComponentID` | 获取指定位置的城区 ID |

## District 实例属性

District 实例对象（通过 `Districts.get()` 获取）包含以下属性：

```javascript
// 来源 TunerPanels/Districts.ltp
// District 实例基本属性与状态
const district = Districts.get(districtId);

// 基本属性
district.id;               // 区域组件 ID (ComponentID)
district.location;         // 坐标 {x, y}
district.type;             // 类型哈希
district.cityId;           // 所属城市 ComponentID
district.originalOwner;    // 原始所有者玩家 ID
district.controllingPlayer; // 当前控制者玩家 ID

// 状态属性
district.isQuarter;        // 是否为街区
district.isUniqueQuarter;  // 是否为独特街区
district.isUrbanCore;      // 是否为城市核心
district.isDefensible;     // 是否可防御
```

## District 实例方法

District 实例提供以下方法用于查询建造物和管理生命值：

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>district.getConstructibleIds</API> |  | `array<ComponentID>` | 获取所有建造物 ID |
| <API>district.getConstructibleIdsOfClass</API> | className | `array<ComponentID>` | 按类别获取建造物 ID |
| <API>district.getConstructibleIdsOfType</API> | typeHash | `array<ComponentID>` | 按类型哈希获取建造物 ID |
| <API>district.getMaxDamage</API> |  | `int` | 获取最大生命值 |
| <API>district.getDamage</API> |  | `int` | 获取当前伤害值（扣血量） |
| <API>district.changeDamage</API> | delta | `void` | 改变伤害值（正数扣血，负数治疗） |
| <API>district.setContested</API> | isContested, controllingPlayer | `void` | 设置争夺状态 |

## 子系统

### Players.Districts 玩家全局子系统

通过 `Players.Districts.get(playerID)` 获取玩家区域管理器：

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Players.Districts.get</API> | playerID | `PlayerDistricts` \| `undefined` | 获取玩家区域管理器 |

### player.Districts 玩家实例子系统

通过 `player.Districts` 获取该玩家的区域管理器：

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>player.Districts.getDistrictIds</API> |  | `array<ComponentID>` | 获取玩家所有城区 ID |
| <API>player.Districts.getDistrictHealth</API> | location | `int` | 获取指定位置城区当前生命值 |
| <API>player.Districts.getDistrictMaxHealth</API> | location | `int` | 获取指定位置城区最大生命值 |
| <API>player.Districts.getDistrictIsBesieged</API> | location | `boolean` | 判断指定位置城区是否被包围 |

### city.Districts 城市子系统

通过 `city.Districts` 获取该城市的区域管理器：

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>city.Districts.getIds</API> |  | `array<ComponentID>` \| `undefined` | 获取城市所有城区 ID |
| <API>city.Districts.getIdsOfType</API> | districtType | `array<ComponentID>` | 按单一类型获取城区 ID |
| <API>city.Districts.getIdsOfTypes</API> | districtTypes | `array<ComponentID>` | 按多种类型获取城区 ID |
| <API>city.Districts.removeDistrict</API> | districtID | `void` | 移除指定城区 |

## GameInfo 关联表

```javascript
GameInfo.Districts;        // 区域定义表
GameInfo.Constructibles;   // 建筑/改良/奇观定义表
```

```javascript
// 来源 TunerPanels/Districts.ltp
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
| id | `ComponentID` | 城区 ID |

**返回值**: `District` \| `undefined`

**使用示例**:

```javascript
// 来源 TunerPanels/Districts.ltp
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
| location | `PlotCoord` | 坐标 `{x, y}` |

**返回值**: `District` \| `undefined`

**使用示例**:

```javascript
// 来源 TunerPanels/Districts.ltp
// 根据坐标获取城区
const district = Districts.getAtLocation({ x: 10, y: 20 });
```

</API>
<API id="Districts.getFreeConstructible"><h3>Districts.getFreeConstructible(plotCoord, playerID)</h3>

**说明**: 获取指定地块上空闲的可建造物槽位。无空闲时返回 `-1`。

| 参数名 | 类型 | 说明 |
|------|------|------|
| plotCoord | `PlotCoord` | 地块坐标 `{x, y}` |
| playerID | `int` | 玩家 ID |

**返回值**: `object` \| `-1`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui-next/tooltips/plot-tooltip/plot-tooltip.js
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
| districtIDs | `array<ComponentID>` | 城区 ID 数组 |

**返回值**: `array<PlotCoord>`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/interface-modes/support-city-decoration.js
// 获取城区占据的所有地块坐标
const districtIdsRural = city.Districts.getIdsOfType(DistrictTypes.RURAL);
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
| location | `PlotCoord` | 坐标 `{x, y}` |

**返回值**: `ComponentID`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/tuner-input/tuner-input.js
// 根据坐标查询城区 ID
const districtId = Districts.getIdAtLocation(loc);
if (districtId && districtId.owner !== -1 && districtId.id !== -1) {
  console.log(districtId);
}
```

</API>

<API id="district.getConstructibleIds"><h3>district.getConstructibleIds()</h3>

**说明**: 获取该区域内所有建造物（建筑、改良）的组件 ID 列表。

| 参数名 | 类型 | 说明 |
|------|------|------|
| 无 | | |

**返回值**: `array<ComponentID>`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/tuner-input/tuner-input.js
// 销毁区域内所有建造物
const district = Districts.getAtLocation(loc);
if (district) {
  const constructibleIds = district.getConstructibleIds();
  for (const id of constructibleIds) {
    const args = { Kind: "CONSTRUCTIBLE", Owner: id.owner, LocalID: id.id };
    Game.PlayerOperations.sendRequest(localPlayerID, "DESTROY_ELEMENT", args);
  }
}
```

</API>
<API id="district.getConstructibleIdsOfClass"><h3>district.getConstructibleIdsOfClass(className)</h3>

**说明**: 按类别获取该区域内建造物的组件 ID 列表。常见类别：`BUILDING`、`IMPROVEMENT`。

| 参数名 | 类型 | 说明 |
|------|------|------|
| className | `string` | 建造物类别名称 |

**返回值**: `array<ComponentID>`

**使用示例**:

```javascript
// 来源 TunerPanels/Districts.ltp
// 列出区域内所有建筑
for (const instanceId of district.getConstructibleIdsOfClass("BUILDING")) {
  const instance = Constructibles.get(instanceId);
  if (instance) {
    console.log(instance.type);
  }
}
```

</API>
<API id="district.getConstructibleIdsOfType"><h3>district.getConstructibleIdsOfType(typeHash)</h3>

**说明**: 按类型哈希获取该区域内建造物的组件 ID 列表。

| 参数名 | 类型 | 说明 |
|------|------|------|
| typeHash | `number` | 建造物类型哈希 |

**返回值**: `array<ComponentID>`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/tuner-input/tuner-input.js
// 销毁区域内特定类型的建造物
const constructibleIds = district.getConstructibleIdsOfType(buildingType);
constructibleIds.forEach((elem) => {
  const args = { Kind: "CONSTRUCTIBLE", Owner: elem.owner, LocalID: elem.id };
  Game.PlayerOperations.sendRequest(localPlayerID, "DESTROY_ELEMENT", args);
});
```

</API>
<API id="district.getMaxDamage"><h3>district.getMaxDamage()</h3>

**说明**: 获取区域的最大生命值。

| 参数名 | 类型 | 说明 |
|------|------|------|
| 无 | | |

**返回值**: `int`

**使用示例**:

```javascript
// 来源 TunerPanels/Districts.ltp
// 计算当前剩余生命值
const district = Districts.get(selectedDistrict);
const districtMaxHealth = district.getMaxDamage;
const districtHealth = districtMaxHealth - district.getDamage;
console.log(`${districtHealth}/${districtMaxHealth}`);
```

</API>
<API id="district.getDamage"><h3>district.getDamage()</h3>

**说明**: 获取区域当前伤害值（即已损失的血量）。剩余生命值 = 最大生命值 - 当前伤害。

| 参数名 | 类型 | 说明 |
|------|------|------|
| 无 | | |

**返回值**: `int`

**使用示例**:

```javascript
// 来源 TunerPanels/Districts.ltp
// 计算当前剩余生命值
const maxHealth = district.getMaxDamage;
const currentDamage = district.getDamage;
const remainingHealth = maxHealth - currentDamage;
```

</API>
<API id="district.changeDamage"><h3>district.changeDamage(delta)</h3>

**说明**: 改变区域的伤害值。正数增加伤害（扣血），负数减少伤害（治疗）。

| 参数名 | 类型 | 说明 |
|------|------|------|
| delta | `int` | 伤害变化量 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 TunerPanels/Districts.ltp
// 给区域增加 10 点伤害（扣 10 血）
district.changeDamage(10);

// 治疗区域 10 点伤害（回 10 血）
district.changeDamage(-10);
```

</API>
<API id="district.setContested"><h3>district.setContested(isContested, controllingPlayer)</h3>

**说明**: 设置区域的争夺状态。当区域被敌方占领但归属仍有争议时使用。

| 参数名 | 类型 | 说明 |
|------|------|------|
| isContested | `boolean` | 是否处于争夺中 |
| controllingPlayer | `int` | 当前控制者玩家 ID |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/district/district-health-manager.js
// 区域易主时更新争夺状态
if (district.owner != district.controllingPlayer) {
  district.setContested(true, district.controllingPlayer);
} else {
  district.setContested(false, district.owner);
}
```

</API>

<API id="Players.Districts.get"><h3>Players.Districts.get(playerID)</h3>

**说明**: 获取指定玩家的区域管理器 (`PlayerDistricts`)。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 玩家 ID |

**返回值**: `PlayerDistricts` \| `undefined`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui-next/tooltips/plot-tooltip/helpers.js
// 获取地块所在区域的生命值信息
const playerID = GameplayMap.getOwner(location.x, location.y);
const playerDistricts = Players.Districts.get(playerID);
if (playerDistricts) {
  const currentHealth = playerDistricts.getDistrictHealth(location);
  const maxHealth = playerDistricts.getDistrictMaxHealth(location);
}
```

</API>

<API id="player.Districts.getDistrictIds"><h3>player.Districts.getDistrictIds()</h3>

**说明**: 获取该玩家所有城区的组件 ID 列表。

| 参数名 | 类型 | 说明 |
|------|------|------|
| 无 | | |

**返回值**: `array<ComponentID>`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/district/district-health-manager.js
// 遍历玩家所有城区创建血条
const pDistricts = player.Districts;
for (const districtId of pDistricts.getDistrictIds()) {
  const district = Districts.get(districtId);
  if (district) {
    createDistrictHealthBar(district);
  }
}
```

</API>
<API id="player.Districts.getDistrictHealth"><h3>player.Districts.getDistrictHealth(location)</h3>

**说明**: 获取指定位置城区的当前生命值。

| 参数名 | 类型 | 说明 |
|------|------|------|
| location | `PlotCoord` | 地块坐标 `{x, y}` |

**返回值**: `int`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui-next/tooltips/plot-tooltip/helpers.js
// 获取区域生命值信息
const currentHealth = playerDistricts.getDistrictHealth(location);
const maxHealth = playerDistricts.getDistrictMaxHealth(location);
```

</API>
<API id="player.Districts.getDistrictMaxHealth"><h3>player.Districts.getDistrictMaxHealth(location)</h3>

**说明**: 获取指定位置城区的最大生命值。

| 参数名 | 类型 | 说明 |
|------|------|------|
| location | `PlotCoord` | 地块坐标 `{x, y}` |

**返回值**: `int`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/district/district-health-manager.js
// 更新血条显示
const currentHealth = playerDistricts.getDistrictHealth(district.location);
const maxHealth = playerDistricts.getDistrictMaxHealth(district.location);
const progress = Math.min(1, currentHealth / maxHealth);
healthBar.updateDistrictHealth(progress.toString());
```

</API>
<API id="player.Districts.getDistrictIsBesieged"><h3>player.Districts.getDistrictIsBesieged(location)</h3>

**说明**: 判断指定位置城区是否处于被包围状态。

| 参数名 | 类型 | 说明 |
|------|------|------|
| location | `PlotCoord` | 地块坐标 `{x, y}` |

**返回值**: `boolean`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui-next/tooltips/plot-tooltip/helpers.js
// 检查区域是否被包围并显示提示
const isUnderSiege = playerDistricts.getDistrictIsBesieged(location);
if (isUnderSiege) {
  showSiegeIndicator(location);
}
```

</API>

<API id="city.Districts.getIds"><h3>city.Districts.getIds()</h3>

**说明**: 获取该城市所有城区的组件 ID 列表。

| 参数名 | 类型 | 说明 |
|------|------|------|
| 无 | | |

**返回值**: `array<ComponentID>` \| `undefined`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/city-banners/city-banner-manager.js
// 遍历城市所有城区
for (const districtId of city.Districts.getIds()) {
  const district = Districts.get(districtId);
  updateBannerForDistrict(district);
}
```

</API>
<API id="city.Districts.getIdsOfType"><h3>city.Districts.getIdsOfType(districtType)</h3>

**说明**: 按单一类型获取该城市城区的组件 ID 列表。

| 参数名 | 类型 | 说明 |
|------|------|------|
| districtType | `number` | 区域类型哈希（如 `DistrictTypes.RURAL`） |

**返回值**: `array<ComponentID>`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/interface-modes/support-city-decoration.js
// 获取城市所有农村区域
const districtIdsRural = city.Districts.getIdsOfType(DistrictTypes.RURAL);
const locations = Districts.getLocations(districtIdsRural);
```

</API>
<API id="city.Districts.getIdsOfTypes"><h3>city.Districts.getIdsOfTypes(districtTypes)</h3>

**说明**: 按多种类型数组获取该城市城区的组件 ID 列表。

| 参数名 | 类型 | 说明 |
|------|------|------|
| districtTypes | `array<number>` | 区域类型哈希数组 |

**返回值**: `array<ComponentID>`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/interface-modes/support-city-decoration.js
// 获取城市所有城区（城市中心 + 城区）
const districtIdsUrban = city.Districts.getIdsOfTypes([
  DistrictTypes.URBAN,
  DistrictTypes.CITY_CENTER
]);
```

</API>
<API id="city.Districts.removeDistrict"><h3>city.Districts.removeDistrict(districtID)</h3>

**说明**: 从城市中移除指定城区。

| 参数名 | 类型 | 说明 |
|------|------|------|
| districtID | `ComponentID` | 要移除的城区 ID |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/base-standard/maps/map-utilities.js
// 移除城市中的指定区域
city.Districts?.removeDistrict(districtID);
```

</API>