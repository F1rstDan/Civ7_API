---
title: Social 社交
doc_type: other
summary: 社交功能 API 参考，通过 `Online.Social` 访问，包括好友管理、封禁、邀请、平台集成等功能。
primary_scope:
  - Online.Social
related_scope:
  - Network
source:
  - modules/core/ui/shell/mp-staging/model-mp-friends.js
  - modules/core/ui/shell/mp-staging/mp-friends-options.js
  - modules/core/ui/shell/mp-staging/mp-friends.js
  - modules/core/ui/shell/mp-staging/mp-player-options.js
  - modules/core/ui/shell/mp-staging/model-mp-staging-new.js
  - modules/core/ui/mp-chat/send-to-panel.js
  - modules/core/ui/shell/mp-staging/mp-search.js
doc_update: 2026-06-06
---

# Social 社交

社交功能 API，通过 `Online.Social` 全局对象访问，提供好友管理、封禁、邀请、平台集成等功能。

```javascript
// 来源 modules/core/ui/shell/mp-staging/mp-friends-options.js
// 检查好友状态、发送请求、接受邀请
if (!Online.Social.isUserFriend(friendId)) {
  if (!Online.Social.isUserBlocked(friendId, false)) {
    Online.Social.sendFriendRequest(friendId);
  }
}
Online.Social.acceptFriendRequest(friendId);
```

## 方法

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Online.Social.getPlayerFriendID_Network</API> | playerID | `string` | 获取玩家网络好友 ID |
| <API>Online.Social.isUserBlocked</API> | userID, platSpecific | `bool` | 用户是否被封禁 |
| <API>Online.Social.isUserFriendOnPlatform</API> | userID, listType | `bool` | 用户是否为平台好友 |
| <API>Online.Social.rejectFriendRequest</API> | userID | `void` | 拒绝好友请求 |
| <API>Online.Social.viewProfile</API> | networkID, t2gpID | `void` | 查看用户资料 |
| <API>Online.Social.sendFriendRequest</API> | userID | `void` | 发送好友请求 |
| <API>Online.Social.isUserFriend</API> | userID | `bool` | 是否为好友 |
| <API>Online.Social.refreshFriendList</API> | — | `void` | 刷新好友列表 |
| <API>Online.Social.getFriendCount</API> | listType | `int` | 获取好友数量 |
| <API>Online.Social.unblockUser</API> | userID | `void` | 解除封禁 |
| <API>Online.Social.acceptFriendRequest</API> | userID | `void` | 接受好友请求 |
| <API>Online.Social.removeFriend</API> | userID | `void` | 删除好友 |
| <API>Online.Social.blockUser</API> | userID | `void` | 封禁用户 |
| <API>Online.Social.inviteFriendToGame</API> | userID | `void` | 邀请好友加入游戏 |
| <API>Online.Social.searchFriendList</API> | query | `void` | 搜索好友列表 |

## 相关全局对象

| 对象 | 说明 |
|------|------|
| `Network` | 网络底层 API，与 `Online.Social` 配合使用 |

<API id="Online.Social.getPlayerFriendID_Network"><h3>Online.Social.getPlayerFriendID_Network(playerID)</h3>

**说明**: 获取指定玩家的网络好友 ID（第一方平台）。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 玩家 ID |

**返回值**: `string`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/mp-staging/mp-player-options.js
// 获取玩家的第一方平台好友 ID
this.networkFriendID = Online.Social.getPlayerFriendID_Network(playerID);
```

</API>
<API id="Online.Social.isUserBlocked"><h3>Online.Social.isUserBlocked(userID, platSpecific)</h3>

**说明**: 检查用户是否被封禁。

| 参数名 | 类型 | 说明 |
|------|------|------|
| userID | `string` | 用户 ID |
| platSpecific | `bool` | 是否平台特定 |

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/mp-staging/mp-friends-options.js
// 检查好友是否被封禁，再决定是否显示添加好友按钮
if (!Online.Social.isUserFriend(friendId)) {
  if (!Online.Social.isUserBlocked(friendId, false)) {
    this.setButtonActivate(2 /* ADD_FRIEND_REQUEST */, true);
  }
}
```

</API>
<API id="Online.Social.isUserFriendOnPlatform"><h3>Online.Social.isUserFriendOnPlatform(userID, listType)</h3>

**说明**: 检查用户是否为平台好友（可指定列表类型）。

| 参数名 | 类型 | 说明 |
|------|------|------|
| userID | `string` | 用户 ID |
| listType | `FriendListTypes` | 好友列表类型（如 `FriendListTypes.Immediate`） |

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/mp-staging/mp-friends.js
// 判断用户是否在指定好友列表类型中
if (friendId1p && Online.Social.isUserFriendOnPlatform(friendId1p, FriendListTypes.Immediate)) {
  // 用户是平台好友
}
```

</API>
<API id="Online.Social.rejectFriendRequest"><h3>Online.Social.rejectFriendRequest(userID)</h3>

**说明**: 拒绝好友请求。

| 参数名 | 类型 | 说明 |
|------|------|------|
| userID | `string` | 用户 ID |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/mp-staging/mp-friends-options.js
// 拒绝好友请求
Online.Social.rejectFriendRequest(twoKId);
```

</API>
<API id="Online.Social.viewProfile"><h3>Online.Social.viewProfile(networkID, t2gpID)</h3>

**说明**: 查看用户资料。

| 参数名 | 类型 | 说明 |
|------|------|------|
| networkID | `string` | 第一方平台好友 ID |
| t2gpID | `string` | T2GP 平台好友 ID |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/mp-staging/model-mp-staging-new.js
// 通过玩家 ID 获取两个平台的好友 ID 后查看资料
const nativeId = Online.Social.getPlayerFriendID_Network(playerID);
const t2gpId = Online.Social.getPlayerFriendID_T2GP(playerID);
Online.Social.viewProfile(nativeId, t2gpId);
```

</API>
<API id="Online.Social.sendFriendRequest"><h3>Online.Social.sendFriendRequest(userID)</h3>

**说明**: 发送好友请求。

| 参数名 | 类型 | 说明 |
|------|------|------|
| userID | `string` | 目标用户 ID |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/mp-staging/model-mp-friends.js
// 发送好友请求
Online.Social.sendFriendRequest(friendID);
```

</API>
<API id="Online.Social.isUserFriend"><h3>Online.Social.isUserFriend(userID)</h3>

**说明**: 检查用户是否为好友。

| 参数名 | 类型 | 说明 |
|------|------|------|
| userID | `string` | 用户 ID |

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/mp-staging/mp-player-options.js
// 检查玩家是否已是好友，是则隐藏添加好友按钮
if (Online.Social.isUserFriend(this.networkFriendID)) {
  addPlatFriendButton.classList.add("hidden");
}
```

</API>
<API id="Online.Social.refreshFriendList"><h3>Online.Social.refreshFriendList()</h3>

**说明**: 刷新好友列表。

**参数**: 无

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/mp-staging/model-mp-friends.js
// 刷新好友列表
Online.Social.refreshFriendList();
```

</API>
<API id="Online.Social.getFriendCount"><h3>Online.Social.getFriendCount(listType)</h3>

**说明**: 获取指定列表类型的好友数量。

| 参数名 | 类型 | 说明 |
|------|------|------|
| listType | `FriendListTypes` | 好友列表类型 |

**返回值**: `int`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/mp-staging/model-mp-friends.js
// 遍历好友列表
const friendsNum = Online.Social.getFriendCount(FriendListTypes.Immediate);
for (let i = 0; i < friendsNum; ++i) {
  const friendInfo = Online.Social.getFriendInfoByIndex(i, FriendListTypes.Immediate);
}
```

</API>
<API id="Online.Social.unblockUser"><h3>Online.Social.unblockUser(userID)</h3>

**说明**: 解除对用户的封禁。

| 参数名 | 类型 | 说明 |
|------|------|------|
| userID | `string` | 用户 ID |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/mp-staging/model-mp-friends.js
// 解除封禁用户
Online.Social.unblockUser(friendID);
```

</API>
<API id="Online.Social.acceptFriendRequest"><h3>Online.Social.acceptFriendRequest(userID)</h3>

**说明**: 接受好友请求。

| 参数名 | 类型 | 说明 |
|------|------|------|
| userID | `string` | 用户 ID |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/mp-staging/mp-friends-options.js
// 接受好友请求
Online.Social.acceptFriendRequest(this.friendIdT2gp);
```

</API>
<API id="Online.Social.removeFriend"><h3>Online.Social.removeFriend(userID)</h3>

**说明**: 删除好友。

| 参数名 | 类型 | 说明 |
|------|------|------|
| userID | `string` | 用户 ID |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/mp-staging/mp-friends-options.js
// 删除好友
Online.Social.removeFriend(this.friendIdT2gp);
```

</API>
<API id="Online.Social.blockUser"><h3>Online.Social.blockUser(userID)</h3>

**说明**: 封禁用户。

| 参数名 | 类型 | 说明 |
|------|------|------|
| userID | `string` | 用户 ID |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/mp-staging/mp-friends-options.js
// 封禁用户
Online.Social.blockUser(friendID);
```

</API>
<API id="Online.Social.inviteFriendToGame"><h3>Online.Social.inviteFriendToGame(userID)</h3>

**说明**: 邀请好友加入游戏。

| 参数名 | 类型 | 说明 |
|------|------|------|
| userID | `string` | 好友 ID |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/mp-staging/model-mp-friends.js
// 邀请好友加入游戏
Online.Social.inviteFriendToGame(friendID);
```

</API>
<API id="Online.Social.searchFriendList"><h3>Online.Social.searchFriendList(query)</h3>

**说明**: 搜索好友列表。

| 参数名 | 类型 | 说明 |
|------|------|------|
| query | `string` | 搜索关键词 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/mp-staging/mp-search.js
// 按用户名搜索好友
Online.Social.searchFriendList(userName);
```

</API>