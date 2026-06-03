---
title: Notifications 通知
---

# Notifications 通知

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
## TunerPanel 补充：Notifications 完整 API（来源 Notifications.ltp）

### Game.Notifications

```javascript
// 来源 Notifications.ltp
// 发送通知
let args = {};
args.Type = Game.getHash(notificationType);
args.AlwaysAdd = true;
Game.Notifications.send(args, GameContext.localPlayerID);  // 发送给特定玩家
Game.Notifications.send(args, -2);  // 发送给本地玩家

// 查询通知
let notificationIDs = Game.Notifications.getIdsForPlayer(playerId);
for (const id of notificationIDs) {
  let notification = Game.Notifications.find(id);
  // notification.Type, notification.AddedOnTurn, notification.Target
  // notification.Dismissed, notification.Expired
  let typeName = Game.Notifications.getTypeName(notification.Type);
  let message = Game.Notifications.getMessage(id);
}

// 获取回合结束阻塞类型
Game.Notifications.getEndTurnBlockingType(playerId);
```

### GameInfo.Notifications 表

```javascript
// 来源 Notifications.ltp
for (const item of GameInfo.Notifications) {
  let name = Locale.compose(item.NotificationType);
  let message = Locale.compose(item.Message);
}
```

---

*来源：Notifications.ltp*
