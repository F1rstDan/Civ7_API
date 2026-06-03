---
title: Social 社交
---

# Social 社交

社交功能 API。

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `getPlayerFriendID_Network` | playerID | `string` | 获取玩家网络好友 ID |
| `isUserBlocked` | userID | `bool` | 用户是否被封禁 |
| `isUserFriendOnPlatform` | userID | `bool` | 用户是否为平台好友 |
| `rejectFriendRequest` | userID | `void` | 拒绝好友请求 |
| `viewProfile` | userID | `void` | 查看用户资料 |
| `sendFriendRequest` | userID | `void` | 发送好友请求 |
| `isUserFriend` | userID | `bool` | 是否为好友 |
| `refreshFriendList` | — | `void` | 刷新好友列表 |
| `getFriendCount` | — | `int` | 获取好友数量 |
| `unblockUser` | userID | `void` | 解除封禁 |
| `acceptFriendRequest` | userID | `void` | 接受好友请求 |
| `removeFriend` | userID | `void` | 删除好友 |
| `blockUser` | userID | `void` | 封禁用户 |
| `inviteFriendToGame` | userID | `void` | 邀请好友加入游戏 |
| `searchFriendList` | query | `array` | 搜索好友列表 |
