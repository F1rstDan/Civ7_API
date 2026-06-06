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
doc_update: 2026-06-05
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

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `Online.Social.getPlayerFriendID_Network` | playerID | `string` | 获取玩家网络好友 ID |
| `Online.Social.isUserBlocked` | userID, platSpecific | `bool` | 用户是否被封禁 |
| `Online.Social.isUserFriendOnPlatform` | userID, listType | `bool` | 用户是否为平台好友 |
| `Online.Social.rejectFriendRequest` | userID | `void` | 拒绝好友请求 |
| `Online.Social.viewProfile` | networkID, t2gpID | `void` | 查看用户资料 |
| `Online.Social.sendFriendRequest` | userID | `void` | 发送好友请求 |
| `Online.Social.isUserFriend` | userID | `bool` | 是否为好友 |
| `Online.Social.refreshFriendList` | — | `void` | 刷新好友列表 |
| `Online.Social.getFriendCount` | listType | `int` | 获取好友数量 |
| `Online.Social.unblockUser` | userID | `void` | 解除封禁 |
| `Online.Social.acceptFriendRequest` | userID | `void` | 接受好友请求 |
| `Online.Social.removeFriend` | userID | `void` | 删除好友 |
| `Online.Social.blockUser` | userID | `void` | 封禁用户 |
| `Online.Social.inviteFriendToGame` | userID | `void` | 邀请好友加入游戏 |
| `Online.Social.searchFriendList` | query | `array` | 搜索好友列表 |