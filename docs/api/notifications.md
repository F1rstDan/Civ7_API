---
title: Notifications
---

# Notifications

通知系统 API。

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `find` | id | `object` | 根据 ID 查找通知 |
| `getTypeName` | typeID | `string` | 获取通知类型名称 |
| `getType` | typeID | `object` | 获取通知类型 |
| `getIdsForPlayer` | playerID | `int[]` | 获取玩家的通知 ID 列表 |
| `dismiss` | id | `void` | 关闭通知 |
| `getEndTurnBlockingType` | id | `int` | 获取回合结束阻塞类型 |
| `activate` | id | `void` | 激活通知 |
| `findEndTurnBlocking` | playerID | `object` | 查找回合结束阻塞通知 |
| `getSummary` | id | `string` | 获取通知摘要 |
| `getMessage` | id | `string` | 获取通知消息 |
| `getBlocksTurnAdvancement` | id | `bool` | 是否阻止回合推进 |
| `canUserDismissNotification` | id | `bool` | 用户是否可以关闭通知 |
| `getSeverity` | id | `int` | 获取通知严重程度 |
