---
title: Network
---

# Network

网络和多人游戏相关 API。涵盖账号、连接、存档、多人游戏管理等。

```javascript
const loggedIn = Network.isLoggedIn();
const platform = Network.getLocalHostingPlatform();
```

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `supportsSSO` | — | `bool` | 是否支持单点登录 |
| `getLocalHostingPlatform` | — | `string` | 获取本地主机平台 |
| `isLoggedIn` | — | `bool` | 是否已登录 |
| `isConnectedToSSO` | — | `bool` | 是否连接到 SSO |
| `isMetagamingAvailable` | — | `bool` | 元游戏是否可用 |
| `getBlockedAccessInfo` | — | `object` | 获取被阻止的访问信息 |
| `isFullAccountLinked` | — | `bool` | 完整账号是否已关联 |
| `isConnectedToNetwork` | — | `bool` | 是否连接到网络 |
| `loadGame` | slot | `void` | 加载游戏存档 |
| `saveGame` | slot | `void` | 保存游戏 |
| `isPlayerMuted` | playerID | `bool` | 玩家是否被静音 |
| `setPlayerMuted` | playerID, muted | `void` | 设置玩家静音状态 |
| `isAccountComplete` | — | `bool` | 账号是否完整 |
| `isAccountLinked` | — | `bool` | 账号是否已关联 |
| `hostGame` | options | `void` | 主持游戏 |
| `leaveMultiplayerGame` | — | `void` | 离开多人游戏 |
| `startMultiplayerGame` | — | `void` | 开始多人游戏 |
| `joinMultiplayerGame` | id | `void` | 加入多人游戏 |
| `isPlayerStartReady` | id | `bool` | 玩家是否准备开始 |
| `getHostPlayerId` | — | `int` | 获取主机玩家 ID |
| `getJoinCode` | — | `string` | 获取加入码 |
| `getServerType` | — | `string` | 获取服务器类型 |
| `isAuthenticated` | — | `bool` | 是否已认证 |
| `isChildAccount` | — | `bool` | 是否为子账号 |
| `isBanned` | — | `bool` | 是否被封禁 |
| `getLocal1PPlayerName` | — | `string` | 获取本地单人玩家名 |
| `triggerNetworkCheck` | — | `void` | 触发网络检查 |
| `sendChat` | msg | `void` | 发送聊天消息 |
| `getChatHistory` | — | `array` | 获取聊天历史 |
| `kickVotePlayer` | id | `void` | 投票踢出玩家 |
| `isPlayerConnected` | id | `bool` | 玩家是否连接 |
| `toggleLocalPlayerStartReady` | — | `void` | 切换本地玩家准备状态 |
