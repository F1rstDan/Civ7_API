---
title: Visibility 可见性
---

# Visibility 可见性

Visibility 全局对象管理地图的可见性和迷雾系统。

> 来源：Districts.ltp、Map.ltp、Player.ltp

## Visibility 全局对象

```javascript
// 来源 Districts.ltp、Player.ltp
Visibility.changeVisibilityCountForPlots(playerId, count, plotIndexArray);
// 为指定玩家改变一组地块的可见性计数（+1 可见，-1 隐藏）

Visibility.areAnyPlotsVisible(playerId, plotIndexArray);
// 检查一组地块中是否有任何可见

Visibility.revealAllPlots(playerId);
// 揭示所有地块（永久可见）
```

## 使用示例

```javascript
// 来源 Districts.ltp — 揭示区域周围地块并查看
let district = Districts.get(districtId);
let aPlots = GameplayMap.getPlotIndicesInRadius(district.location.x, district.location.y, 1);
if (Visibility.areAnyPlotsVisible(GameContext.localPlayerID, aPlots) == false) {
  Visibility.changeVisibilityCountForPlots(GameContext.localPlayerID, 1, aPlots);
}
Camera.lookAtPlot(district.location);

// 来源 Map.ltp — 揭示所有地块
Visibility.revealAllPlots(GameContext.localPlayerID);

// 来源 Player.ltp — 揭示指定区域
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

*来源：Districts.ltp、Map.ltp、Player.ltp*