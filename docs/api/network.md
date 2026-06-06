---
title: Network 网络
doc_type: other
summary: 网络和多人游戏相关 API 参考，涵盖账号认证、连接管理、存档、多人游戏和聊天功能。
primary_scope:
  - Network
related_scope:
  - Social
  - Modding
source:
  - modules/core/ui/utilities/utilities-network.js
  - modules/base-standard/ui-next/screens/pause-menu/pause-menu-model.js
  - modules/core/ui/mp-chat/screen-mp-chat.js
  - modules/core/ui/mp-chat/send-to-panel.js
  - modules/core/ui/profile-header/profile-header.js
  - modules/core/ui/utilities/utilities-liveops.js
  - modules/core/ui/system-message/system-message-manager.js
  - modules/base-standard/ui/automation/automation-base-play-game.js
  - modules/base-standard/ui/action/panel-action.js
  - TunerPanels/Reflection.ltp
doc_update: 2026-06-05
---

# Network 网络

网络和多人游戏相关 API。涵盖账号、连接、存档、多人游戏管理等。

## 快速示例

```javascript
// 来源 modules/core/ui/utilities/utilities-network.js
// 检查登录状态和主机平台
const loggedIn = Network.isLoggedIn();
const platform = Network.getLocalHostingPlatform();
```

```javascript
// 来源 modules/core/ui/mp-chat/screen-mp-chat.js
// 发送和获取聊天消息
Network.sendChat(message, targetType, targetID);
Network.getChatHistory()?.forEach((data) => onChat(data));
```

```javascript
// 来源 modules/base-standard/ui/automation/automation-base-play-game.js
// 加载和主持游戏
const bResult = Network.loadGame(loadParams, serverType);
Network.hostGame(runServerType);
```

```javascript
// 来源 modules/core/ui/profile-header/profile-header.js
// 检查网络连接状态
const isConnected = Network.isConnectedToNetwork() && Network.isConnectedToSSO() && Network.isLoggedIn();
const blockedInfo = Network.getBlockedAccessInfo(DNAPermissionType.PLAY_ONLINE);
```

## 方法列表（共 32 个）

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `supportsSSO` | — | `bool` | 是否支持单点登录 |
| `getLocalHostingPlatform` | — | `string` | 获取本地主机平台 |
| `isLoggedIn` | — | `bool` | 是否已登录 |
| `isConnectedToSSO` | — | `bool` | 是否连接到 SSO |
| `isMetagamingAvailable` | — | `bool` | 元游戏是否可用 |
| `getBlockedAccessInfo` | permissionType | `object` | 获取被阻止的访问信息 |
| `isFullAccountLinked` | — | `bool` | 完整账号是否已关联 |
| `isConnectedToNetwork` | — | `bool` | 是否连接到网络 |
| `loadGame` | loadParams, serverType | `bool` | 加载游戏存档 |
| `saveGame` | slot | `void` | 保存游戏 |
| `isPlayerMuted` | playerID | `bool` | 玩家是否被静音 |
| `setPlayerMuted` | playerID, muted | `void` | 设置玩家静音状态 |
| `isAccountComplete` | — | `bool` | 账号是否完整 |
| `isAccountLinked` | — | `bool` | 账号是否已关联 |
| `hostGame` | serverType | `void` | 主持游戏 |
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
| `triggerNetworkCheck` | isUserInput | `bool` | 触发网络检查 |
| `sendChat` | msg, targetType, targetID | `void` | 发送聊天消息 |
| `getChatHistory` | — | `array` | 获取聊天历史 |
| `kickVotePlayer` | id | `void` | 投票踢出玩家 |
| `isPlayerConnected` | id | `bool` | 玩家是否连接 |
| `toggleLocalPlayerStartReady` | — | `void` | 切换本地玩家准备状态 |

## 源码中确认的额外方法

以下方法在源码中有使用，但尚未在主方法列表中记录：

| 方法 | 说明 | 来源 |
|------|------|------|
| `canDisablePromotions` | 是否可禁用升级 | `options.js` |
| `hasCrossPlayPrivilege` | 是否有跨平台权限 | `options.js` |
| `restartGame` | 重新开始游戏 | `pause-menu-model.js` |
| `getLegalDocuments` | 获取法律文件 | `utilities-network.js` |
| `areAllLegalDocumentsConfirmed` | 所有法律文件是否已确认 | `utilities-network.js` |
| `getChatTargets` | 获取聊天目标 | `screen-mp-chat.js` |
| `getUnreadChatLength` | 获取未读聊天数 | `screen-mp-chat.js` |
| `readChat` | 标记聊天已读 | `screen-mp-chat.js` |
| `openURLFromType` | 根据类型打开 URL | `fxs-link.js` |
| `acceptInvite` | 接受邀请 | `system-message-manager.js` |
| `declineInvite` | 拒绝邀请 | `system-message-manager.js` |
| `isChildOnlinePermissionsGranted` | 子账号在线权限是否已授权 | `profile-header.js` |
| `toggleMultiplayerPause` | 切换多人游戏暂停 | `panel-action.js` |
| `forceResync` | 强制重新同步 | `automation-base-play-game.js` |
| `testHashing` | 测试哈希 | `Reflection.ltp` |

## 属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `networkVersion` | `string` | 当前网络版本号 |
| `lastMismatchVersion` | `string` | 上次不匹配的远端版本号 |

## 相关全局对象

| 对象 | 说明 |
|------|------|
| [`Social`](social.md) | 社交系统，好友列表、邀请管理 |
| [`Modding`](modding.md) | 模组系统，下载和管理模组 |