---
title: Configuration API
---

# Configuration

游戏配置的全局对象。

```javascript
const mapName = Configuration.getMapValue("Name");
const gameSpeed = Configuration.getGameValue("GameSpeedType");
```

## 方法列表（共 10 个）

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `getGame` | — | `object` | 获取游戏配置对象 |
| `getGameValue` | key | `any` | 获取游戏配置值 |
| `getMap` | — | `object` | 获取地图配置对象 |
| `getMapValue` | key | `any` | 获取地图配置值 |
| `getPlayer` | id | `object` | 获取玩家配置对象 |
| `getUser` | — | `object` | 获取用户配置对象 |
| `getXRCamera` | — | `object` | 获取 XR 镜头配置 |
| `editGame` | key, value | `void` | 编辑游戏配置 |
| `editMap` | key, value | `void` | 编辑地图配置 |
| `editPlayer` | id, key, value | `void` | 编辑玩家配置 |
