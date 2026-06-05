---
title: Notifications 通知
doc_type: object-api
summary: 通知系统，负责通知的发送、查询、关闭和阻塞状态管理。
primary_scope:
  - Game.Notifications
related_scope:
  - GameInfo.Notifications
source:
  - TunerPanels/Notifications.ltp
---

# Notifications 通知

通知系统 API，通过 `Game.Notifications` 访问。

```javascript
// 快速示例：获取玩家通知
// 来源 Notifications.ltp
let notificationIDs = Game.Notifications.getIdsForPlayer(playerId);
for (const id of notificationIDs) {
  let notification = Game.Notifications.find(id);
  let message = Game.Notifications.getMessage(id);
  console.log(message);
}
```

## 方法列表（共 13 个）

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Game.Notifications.find</API> | id | `object` | 根据 ID 查找通知 |
| <API>Game.Notifications.getTypeName</API> | typeID | `string` | 获取通知类型名称 |
| <API>Game.Notifications.getType</API> | typeID | `object` | 获取通知类型 |
| <API>Game.Notifications.getIdsForPlayer</API> | playerID | `int[]` | 获取玩家的通知 ID 列表 |
| <API>Game.Notifications.dismiss</API> | id | `void` | 关闭通知 |
| <API>Game.Notifications.getEndTurnBlockingType</API> | id | `int` | 获取回合结束阻塞类型 |
| <API>Game.Notifications.activate</API> | id | `void` | 激活通知 |
| <API>Game.Notifications.findEndTurnBlocking</API> | playerID | `object` | 查找回合结束阻塞通知 |
| <API>Game.Notifications.getSummary</API> | id | `string` | 获取通知摘要 |
| <API>Game.Notifications.getMessage</API> | id | `string` | 获取通知消息 |
| <API>Game.Notifications.getBlocksTurnAdvancement</API> | id | `bool` | 是否阻止回合推进 |
| <API>Game.Notifications.canUserDismissNotification</API> | id | `bool` | 用户是否可以关闭通知 |
| <API>Game.Notifications.getSeverity</API> | id | `int` | 获取通知严重程度 |

## TunerPanel 补充：Notifications 完整 API（来源 Notifications.ltp）

### Game.Notifications 发送通知

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
// 遍历通知定义
for (const item of GameInfo.Notifications) {
  let name = Locale.compose(item.NotificationType);
  let message = Locale.compose(item.Message);
}
```

---

<API id="Game.Notifications.find"><h3>Game.Notifications.find(id)</h3>

**说明**: 根据 ID 查找通知对象。

| 参数名 | 类型 | 说明 |
|------|------|------|
| id | `int` | 通知 ID |

**返回值**: `object` \| `undefined`

</API>
<API id="Game.Notifications.getTypeName"><h3>Game.Notifications.getTypeName(typeID)</h3>

**说明**: 获取通知类型名称。

| 参数名 | 类型 | 说明 |
|------|------|------|
| typeID | `int` | 通知类型 ID |

**返回值**: `string`

</API>
<API id="Game.Notifications.getType"><h3>Game.Notifications.getType(typeID)</h3>

**说明**: 获取通知类型对象。

| 参数名 | 类型 | 说明 |
|------|------|------|
| typeID | `int` | 通知类型 ID |

**返回值**: `object`

</API>
<API id="Game.Notifications.getIdsForPlayer"><h3>Game.Notifications.getIdsForPlayer(playerID)</h3>

**说明**: 获取玩家的通知 ID 列表。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 玩家 ID |

**返回值**: `int[]`

</API>
<API id="Game.Notifications.dismiss"><h3>Game.Notifications.dismiss(id)</h3>

**说明**: 关闭指定通知。

| 参数名 | 类型 | 说明 |
|------|------|------|
| id | `int` | 通知 ID |

**返回值**: `void`

</API>
<API id="Game.Notifications.getEndTurnBlockingType"><h3>Game.Notifications.getEndTurnBlockingType(id)</h3>

**说明**: 获取回合结束阻塞类型。

| 参数名 | 类型 | 说明 |
|------|------|------|
| id | `int` | 通知 ID |

**返回值**: `int`

</API>
<API id="Game.Notifications.activate"><h3>Game.Notifications.activate(id)</h3>

**说明**: 激活指定通知。

| 参数名 | 类型 | 说明 |
|------|------|------|
| id | `int` | 通知 ID |

**返回值**: `void`

</API>
<API id="Game.Notifications.findEndTurnBlocking"><h3>Game.Notifications.findEndTurnBlocking(playerID)</h3>

**说明**: 查找回合结束阻塞通知。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 玩家 ID |

**返回值**: `object` \| `undefined`

</API>
<API id="Game.Notifications.getSummary"><h3>Game.Notifications.getSummary(id)</h3>

**说明**: 获取通知摘要。

| 参数名 | 类型 | 说明 |
|------|------|------|
| id | `int` | 通知 ID |

**返回值**: `string`

</API>
<API id="Game.Notifications.getMessage"><h3>Game.Notifications.getMessage(id)</h3>

**说明**: 获取通知消息内容。

| 参数名 | 类型 | 说明 |
|------|------|------|
| id | `int` | 通知 ID |

**返回值**: `string`

</API>
<API id="Game.Notifications.getBlocksTurnAdvancement"><h3>Game.Notifications.getBlocksTurnAdvancement(id)</h3>

**说明**: 检查通知是否阻止回合推进。

| 参数名 | 类型 | 说明 |
|------|------|------|
| id | `int` | 通知 ID |

**返回值**: `bool`

</API>
<API id="Game.Notifications.canUserDismissNotification"><h3>Game.Notifications.canUserDismissNotification(id)</h3>

**说明**: 检查用户是否可以关闭通知。

| 参数名 | 类型 | 说明 |
|------|------|------|
| id | `int` | 通知 ID |

**返回值**: `bool`

</API>
<API id="Game.Notifications.getSeverity"><h3>Game.Notifications.getSeverity(id)</h3>

**说明**: 获取通知严重程度。

| 参数名 | 类型 | 说明 |
|------|------|------|
| id | `int` | 通知 ID |

**返回值**: `int`

</API>