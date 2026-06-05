---
title: Visibility 可见性
doc_type: object-api
summary: Visibility 全局对象管理地图的可见性和迷雾系统，支持可见性计数变更、地块可见性检查和全图揭示。
primary_scope:
  - Visibility
related_scope:
  - GameplayMap
  - GameContext
  - Camera
source:
  - TunerPanels/Districts.ltp
  - TunerPanels/Map.ltp
  - TunerPanels/Player.ltp
---

# Visibility 可见性

Visibility 全局对象管理地图的可见性和迷雾系统。

## 方法列表（共 3 个）

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Visibility.changeVisibilityCountForPlots</API> | playerId, count, plotIndexArray | `void` | 为指定玩家改变一组地块的可见性计数（+1 可见，-1 隐藏） |
| <API>Visibility.areAnyPlotsVisible</API> | playerId, plotIndexArray | `bool` | 检查一组地块中是否有任何可见 |
| <API>Visibility.revealAllPlots</API> | playerId | `void` | 揭示所有地块（永久可见） |

## 使用示例

```javascript
// 来源 TunerPanels/Districts.ltp
// 揭示区域周围地块并查看
let district = Districts.get(districtId);
let aPlots = GameplayMap.getPlotIndicesInRadius(district.location.x, district.location.y, 1);
if (Visibility.areAnyPlotsVisible(GameContext.localPlayerID, aPlots) == false) {
  Visibility.changeVisibilityCountForPlots(GameContext.localPlayerID, 1, aPlots);
}
Camera.lookAtPlot(district.location);
```

```javascript
// 来源 TunerPanels/Map.ltp
// 揭示所有地块
Visibility.revealAllPlots(GameContext.localPlayerID);
```

```javascript
// 来源 TunerPanels/Player.ltp
// 揭示指定区域
let loc = GameplayMap.getLocationFromIndex(plotIndex);
let aPlots = GameplayMap.getPlotIndicesInRadius(loc.x, loc.y, 2);
Visibility.changeVisibilityCountForPlots(playerId, 1, aPlots);
```

## 相关 API

| API | 说明 | 来源 |
|-----|------|------|
| `WorldBuilder.MapPlots.setAllRevealed(playerId, true)` | 设置所有地块为已探索 | Map.ltp |
| `GameplayMap.getPlotIndicesInRadius(x, y, radius)` | 获取半径内地块索引 | Player.ltp |

---

<API id="Visibility.changeVisibilityCountForPlots"><h3>Visibility.changeVisibilityCountForPlots(playerId, count, plotIndexArray)</h3>

**说明**: 为指定玩家改变一组地块的可见性计数。+1 增加可见性，-1 减少可见性。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerId | `int` | 玩家 ID |
| count | `int` | 可见性变化量（+1 可见，-1 隐藏） |
| plotIndexArray | `int[]` | 地块索引数组 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 TunerPanels/Districts.ltp
// 揭示区域周围地块
let aPlots = GameplayMap.getPlotIndicesInRadius(district.location.x, district.location.y, 1);
Visibility.changeVisibilityCountForPlots(GameContext.localPlayerID, 1, aPlots);
```

</API>

<API id="Visibility.areAnyPlotsVisible"><h3>Visibility.areAnyPlotsVisible(playerId, plotIndexArray)</h3>

**说明**: 检查一组地块中是否有任何一个对指定玩家可见。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerId | `int` | 玩家 ID |
| plotIndexArray | `int[]` | 地块索引数组 |

**返回值**: `bool` — 是否有任何地块可见

**使用示例**:

```javascript
// 来源 TunerPanels/Districts.ltp
// 检查地块是否可见后再揭示
if (Visibility.areAnyPlotsVisible(GameContext.localPlayerID, aPlots) == false) {
  Visibility.changeVisibilityCountForPlots(GameContext.localPlayerID, 1, aPlots);
}
```

</API>

<API id="Visibility.revealAllPlots"><h3>Visibility.revealAllPlots(playerId)</h3>

**说明**: 永久揭示所有地块，使整个地图对指定玩家可见。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerId | `int` | 玩家 ID |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 TunerPanels/Map.ltp
// 揭示全部地块
Visibility.revealAllPlots(GameContext.localPlayerID);
```

</API>