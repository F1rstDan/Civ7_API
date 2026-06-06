---
title: Notifications 通知
doc_type: object
summary: 通知系统，负责通知的发送、查询、关闭和阻塞状态管理。
primary_scope:
  - Game.Notifications
related_scope:
  - GameInfo.Notifications
source:
  - TunerPanels/Notifications.ltp
  - modules/base-standard/ui/action/panel-action.js
  - modules/base-standard/ui/notification-train/panel-notification-train.js
  - modules/base-standard/ui/notification-train/model-notification-train.js
doc_update: 2026-06-06
---

# Game.Notifications 通知

通知系统 API，通过 `Game.Notifications` 访问。负责通知的发送、查询、关闭、激活和阻塞状态管理。通知定义表见 `GameInfo.Notifications`。

```javascript
// 来源 Notifications.ltp
// 获取玩家通知并遍历输出消息
let notificationIDs = Game.Notifications.getIdsForPlayer(playerId);
for (const id of notificationIDs) {
  let notification = Game.Notifications.find(id);
  let message = Game.Notifications.getMessage(id);
  console.log(message);
}
```

## 方法列表（共 14 个）

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Game.Notifications.send</API> | args, playerID | `void` | 发送通知给指定玩家 |
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

### GameInfo.Notifications 表

```javascript
// 来源 Notifications.ltp
// 遍历通知定义表获取名称和消息
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

**使用示例**:

```javascript
// 来源 Notifications.ltp
// 根据 ID 查找通知并获取其属性
let pNotification = Game.Notifications.find(id);
if (pNotification != null) {
  let notificationTypeName = Game.Notifications.getTypeName(pNotification.Type);
  let addedOnTurn = pNotification.AddedOnTurn;
  let targetId = pNotification.Target;
}
```

</API>
<API id="Game.Notifications.getTypeName"><h3>Game.Notifications.getTypeName(typeID)</h3>

**说明**: 获取通知类型名称。

| 参数名 | 类型 | 说明 |
|------|------|------|
| typeID | `int` | 通知类型 ID |

**返回值**: `string`

**使用示例**:

```javascript
// 来源 Notifications.ltp
// 获取通知类型名称
let notificationTypeName = Game.Notifications.getTypeName(pNotification.Type);
```

</API>
<API id="Game.Notifications.getType"><h3>Game.Notifications.getType(typeID)</h3>

**说明**: 获取通知类型对象。

| 参数名 | 类型 | 说明 |
|------|------|------|
| typeID | `int` | 通知类型 ID |

**返回值**: `object`

**使用示例**:

```javascript
// 来源 panel-action.js
// 获取通知类型用于判断
const type = Game.Notifications.getType(notificationId);
```

</API>
<API id="Game.Notifications.getIdsForPlayer"><h3>Game.Notifications.getIdsForPlayer(playerID)</h3>

**说明**: 获取玩家的通知 ID 列表。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 玩家 ID |

**返回值**: `int[]`

**使用示例**:

```javascript
// 来源 Notifications.ltp
// 获取玩家所有通知 ID
let notificationIDs = Game.Notifications.getIdsForPlayer(g_TunerSelectedPlayer);
for (const id of notificationIDs) {
  let pNotification = Game.Notifications.find(id);
}
```

</API>
<API id="Game.Notifications.dismiss"><h3>Game.Notifications.dismiss(id)</h3>

**说明**: 关闭指定通知。

| 参数名 | 类型 | 说明 |
|------|------|------|
| id | `int` | 通知 ID |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 panel-notification-train-mobile.js
// 关闭通知
Game.Notifications.dismiss(notificationId);
```

</API>
<API id="Game.Notifications.getEndTurnBlockingType"><h3>Game.Notifications.getEndTurnBlockingType(id)</h3>

**说明**: 获取回合结束阻塞类型。

| 参数名 | 类型 | 说明 |
|------|------|------|
| id | `int` | 通知 ID |

**返回值**: `int`

**使用示例**:

```javascript
// 来源 panel-action.js
// 获取回合结束阻塞类型
const endTurnBlockingType = Game.Notifications.getEndTurnBlockingType(playerId);
```

</API>
<API id="Game.Notifications.activate"><h3>Game.Notifications.activate(id)</h3>

**说明**: 激活指定通知。

| 参数名 | 类型 | 说明 |
|------|------|------|
| id | `int` | 通知 ID |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 panel-action.js
// 激活通知
Game.Notifications.activate(notificationId);
```

</API>
<API id="Game.Notifications.findEndTurnBlocking"><h3>Game.Notifications.findEndTurnBlocking(playerID)</h3>

**说明**: 查找回合结束阻塞通知。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 玩家 ID |

**返回值**: `object` \| `undefined`

**使用示例**:

```javascript
// 来源 panel-action.js
// 查找回合结束阻塞通知
const endTurnBlockingType = Game.Notifications.getEndTurnBlockingType(playerID);
const endTurnBlockingNotificationId = Game.Notifications.findEndTurnBlocking(playerID, endTurnBlockingType);
```

</API>
<API id="Game.Notifications.getSummary"><h3>Game.Notifications.getSummary(id)</h3>

**说明**: 获取通知摘要。

| 参数名 | 类型 | 说明 |
|------|------|------|
| id | `int` | 通知 ID |

**返回值**: `string`

**使用示例**:

```javascript
// 来源 panel-notification-train.js
// 获取通知摘要
const summary = Game.Notifications.getSummary(notificationID);
```

</API>
<API id="Game.Notifications.getMessage"><h3>Game.Notifications.getMessage(id)</h3>

**说明**: 获取通知消息内容。

| 参数名 | 类型 | 说明 |
|------|------|------|
| id | `int` | 通知 ID |

**返回值**: `string`

**使用示例**:

```javascript
// 来源 panel-action.js
// 获取通知消息内容
const message = Game.Notifications.getMessage(notificationId);
```

</API>
<API id="Game.Notifications.getBlocksTurnAdvancement"><h3>Game.Notifications.getBlocksTurnAdvancement(id)</h3>

**说明**: 检查通知是否阻止回合推进。

| 参数名 | 类型 | 说明 |
|------|------|------|
| id | `int` | 通知 ID |

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 model-notification-train.js
// 检查通知是否阻止回合推进
if (Game.Notifications.getBlocksTurnAdvancement(id)) {
  // 该通知阻止回合推进
}
```

</API>
<API id="Game.Notifications.canUserDismissNotification"><h3>Game.Notifications.canUserDismissNotification(id)</h3>

**说明**: 检查用户是否可以关闭通知。

| 参数名 | 类型 | 说明 |
|------|------|------|
| id | `int` | 通知 ID |

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 panel-notification-train-mobile.js
// 检查用户是否可以关闭通知
if (Game.Notifications.canUserDismissNotification(notification)) {
  Game.Notifications.dismiss(notification);
}
```

</API>
<API id="Game.Notifications.getSeverity"><h3>Game.Notifications.getSeverity(id)</h3>

**说明**: 获取通知严重程度。

| 参数名 | 类型 | 说明 |
|------|------|------|
| id | `int` | 通知 ID |

**返回值**: `int`

**使用示例**:

```javascript
// 来源 panel-action.js
// 获取通知严重程度
severity: Game.Notifications.getSeverity(notificationId) ?? 0
```

</API>
<API id="Game.Notifications.send"><h3>Game.Notifications.send(args, playerID)</h3>

**说明**: 发送通知给指定玩家。`args` 为包含通知参数的对象，常用字段：`Type`（通知类型哈希）、`AlwaysAdd`（是否始终添加）。`playerID` 传入 `-2` 表示发送给本地玩家。

| 参数名 | 类型 | 说明 |
|------|------|------|
| args | `object` | 通知参数对象，含 `Type`、`AlwaysAdd` 等字段 |
| playerID | `int` | 目标玩家 ID，`-2` 表示本地玩家 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 Notifications.ltp
// 构造并发送通知给指定玩家或本地玩家
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

</API>