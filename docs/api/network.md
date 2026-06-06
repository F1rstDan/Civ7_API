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
  - modules/core/ui/utilities/utilities-liveops.js
  - modules/base-standard/ui-next/screens/pause-menu/pause-menu-model.js
  - modules/core/ui/mp-chat/screen-mp-chat.js
  - modules/core/ui/mp-chat/send-to-panel.js
  - modules/core/ui/profile-header/profile-header.js
  - modules/core/ui/system-message/system-message-manager.js
  - modules/base-standard/ui/automation/automation-base-play-game.js
  - modules/base-standard/ui/action/panel-action.js
  - modules/core/ui/shell/mp-shell-logic/mp-shell-logic.js
  - modules/core/ui/shell/main-menu/main-menu.js
  - modules/core/ui/save-load/model-save-load.js
  - modules/core/ui/shell/mp-staging/model-mp-staging-new.js
  - modules/core/ui/options/options.js
  - TunerPanels/Reflection.ltp
doc_update: 2026-06-06
---

# Network 网络

网络和多人游戏相关 API。引擎直接注入，无需手动 import 引入。涵盖账号认证、权限检查、法律文件、多人游戏管理、存档、聊天等功能。

## 快速示例

```javascript
// 来源 modules/core/ui/utilities/utilities-network.js
// 检查登录状态和网络连接权限
const isOnline = Network.isConnectedToNetwork() && Network.isConnectedToSSO() && Network.isLoggedIn();
const blockInfo = Network.getBlockedAccessInfo(DNAPermissionType.PLAY_ONLINE);
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
const bResult = Network.loadGame(loadParams, ServerType.SERVER_TYPE_NONE);
Network.hostGame(serverType);
```

## 属性与方法

| 属性 | 类型 | 说明 |
|------|------|------|
| `Network.networkVersion` | `string` | 当前网络版本号 |
| `Network.lastMismatchVersion` | `string` | 上次不匹配的远端版本号 |

### 认证与账号

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Network.supportsSSO</API> | — | `bool` | 是否支持单点登录 |
| <API>Network.isLoggedIn</API> | — | `bool` | 是否已登录 |
| <API>Network.isConnectedToSSO</API> | — | `bool` | 是否连接到 SSO |
| <API>Network.isConnectedToNetwork</API> | — | `bool` | 是否连接到网络 |
| <API>Network.isAuthenticated</API> | — | `bool` | 是否已认证 |
| <API>Network.isConnecting</API> | — | `bool` | 是否正在连接中 |
| <API>Network.isFullAccountLinked</API> | — | `bool` | 完整账号是否已关联 |
| <API>Network.isAccountLinked</API> | — | `bool` | 账号是否已关联 |
| <API>Network.isAccountComplete</API> | — | `bool` | 账号是否完整 |
| <API>Network.isChildAccount</API> | — | `bool` | 是否为子账号 |
| <API>Network.isTeenAccount</API> | — | `bool` | 是否为青少年账号 |
| <API>Network.isBanned</API> | — | `bool` | 是否被封禁 |
| <API>Network.getBanInfo</API> | — | `string` | 获取封禁信息 |
| <API>Network.getLocal1PPlayerName</API> | — | `string` | 获取本地单人玩家名 |
| <API>Network.getLocalHostingPlatform</API> | — | `string` | 获取本地主机平台 |
| <API>Network.triggerNetworkCheck</API> | isUserInput | `object` | 触发网络检查，返回检查结果 |
| <API>Network.tryConnect</API> | force | `void` | 尝试连接网络 |
| <API>Network.attemptLogin</API> | — | `void` | 尝试登录 |
| <API>Network.canDisplayQRCode</API> | — | `bool` | 是否可以显示二维码 |
| <API>Network.sendParentalStatusQuery</API> | — | `void` | 发送家长状态查询 |

### 权限与访问

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Network.getBlockedAccessInfo</API> | permissionType | `object` | 获取被阻止的访问信息，返回 `{reason, locKey}` |
| <API>Network.isMetagamingAvailable</API> | — | `bool` | 元游戏是否可用 |
| <API>Network.hasCommunicationsPrivilege</API> | checkBan | `bool` | 是否有通信权限 |
| <API>Network.hasAccessUGCPrivilege</API> | checkBan | `bool` | 是否有 UGC 访问权限 |
| <API>Network.hasCrossPlayPrivilege</API> | — | `bool` | 是否有跨平台权限 |
| <API>Network.canDisablePromotions</API> | — | `bool` | 是否可禁用促销功能 |
| <API>Network.hasPromoInteractivity</API> | — | `bool` | 是否有促销互动 |
| <API>Network.isChildOnlinePermissionsGranted</API> | — | `bool` | 子账号在线权限是否已授权 |

### 法律文件

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Network.getLegalDocuments</API> | placementName | `array` | 获取法律文件列表 |
| <API>Network.areAllLegalDocumentsConfirmed</API> | — | `bool` | 所有法律文件是否已确认 |
| <API>Network.hasProgressedPastLegalDocs</API> | — | `bool` | 是否已通过法律文档流程 |
| <API>Network.loadOfflineLegalDocs</API> | — | `void` | 加载离线法律文档 |

### 多人游戏

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Network.hostGame</API> | serverType | `void` | 主持游戏 |
| <API>Network.startMultiplayerGame</API> | — | `void` | 开始多人游戏 |
| <API>Network.joinMultiplayerGame</API> | id | `void` | 加入多人游戏 |
| <API>Network.joinMultiplayerRoom</API> | id | `void` | 加入多人游戏房间 |
| <API>Network.leaveMultiplayerGame</API> | — | `void` | 离开多人游戏 |
| <API>Network.restartGame</API> | — | `void` | 重新开始游戏 |
| <API>Network.toggleMultiplayerPause</API> | — | `void` | 切换多人游戏暂停 |
| <API>Network.forceResync</API> | — | `void` | 强制重新同步 |
| <API>Network.toggleLocalPlayerStartReady</API> | — | `void` | 切换本地玩家准备状态 |
| <API>Network.isPlayerStartReady</API> | id | `bool` | 玩家是否准备开始 |
| <API>Network.getHostPlayerId</API> | — | `int` | 获取主机玩家 ID |
| <API>Network.getJoinCode</API> | — | `string` | 获取加入码 |
| <API>Network.getServerType</API> | — | `string` | 获取服务器类型 |
| <API>Network.getNumPlayers</API> | — | `int` | 获取玩家数量 |
| <API>Network.isPlayerConnected</API> | id | `bool` | 玩家是否连接 |
| <API>Network.kickVotePlayer</API> | id, yesVote, reason | `void` | 投票踢出玩家 |
| <API>Network.prepareConfigurationForHosting</API> | serverType | `void` | 准备主持配置 |
| <API>Network.acceptInvite</API> | joinCode | `void` | 接受多人游戏邀请 |
| <API>Network.declineInvite</API> | joinCode | `void` | 拒绝多人游戏邀请 |

### 多人暂停

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Network.getNumWantPausePlayers</API> | — | `int` | 获取想暂停的玩家数 |
| <API>Network.getWantPausePlayerName</API> | — | `string` | 获取想暂停的玩家名 |

### 存档

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Network.loadGame</API> | loadParams, serverType | `bool` | 加载游戏存档 |
| <API>Network.saveGame</API> | params | `void` | 保存游戏 |
| <API>Network.deleteGame</API> | params | `void` | 删除游戏存档 |
| <API>Network.syncGame</API> | params | `void` | 同步游戏存档 |
| <API>Network.loadAgeTransition</API> | params | `void` | 加载时代过渡存档 |
| <API>Network.resolveConflict</API> | params | `void` | 解决存档冲突 |
| <API>Network.getSaveConflictFileName</API> | — | `string` | 获取存档冲突文件名 |
| <API>Network.cloudSavesEnabled</API> | — | `bool` | 云存档是否启用 |
| <API>Network.getLocalCrossPlay</API> | — | `bool` | 获取本地跨平台设置 |
| <API>Network.hasCrossPlatformSaveSupport</API> | — | `bool` | 是否支持跨平台存档 |
| <API>Network.isAtMaxSaveCount</API> | params | `bool` | 是否达到最大存档数 |

### 聊天

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Network.sendChat</API> | msg, targetType, targetID | `void` | 发送聊天消息 |
| <API>Network.getChatHistory</API> | — | `array` | 获取聊天历史 |
| <API>Network.getChatTargets</API> | — | `array` | 获取聊天目标列表 |
| <API>Network.getUnreadChatLength</API> | — | `int` | 获取未读聊天数 |
| <API>Network.readChat</API> | — | `void` | 标记聊天已读 |
| <API>Network.isPlayerMuted</API> | playerID | `bool` | 玩家是否被静音 |
| <API>Network.setPlayerMuted</API> | playerID, muted | `void` | 设置玩家静音状态 |

### 游戏列表

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Network.initGameList</API> | serverType | `void` | 初始化游戏列表 |
| <API>Network.refreshGameList</API> | — | `void` | 刷新游戏列表 |
| <API>Network.getGameListEntry</API> | id | `object` | 获取游戏列表条目 |

### 工具

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Network.lobbyTypeFromNamedLobbyType</API> | name | `int` | 从命名大厅类型获取大厅类型 |
| <API>Network.serverTypeFromNamedLobbyType</API> | name | `int` | 从命名大厅类型获取服务器类型 |
| <API>Network.hasCapability</API> | capability | `bool` | 是否有指定能力 |
| <API>Network.openURLFromType</API> | type | `void` | 根据类型打开 URL |
| <API>Network.testHashing</API> | value | `void` | 测试哈希（调试用） |

## 相关全局对象

| 对象 | 说明 |
|------|------|
| [`Social`](social.md) | 社交系统，好友列表、邀请管理 |
| [`Modding`](modding.md) | 模组系统，下载和管理模组 |

<API id="Network.supportsSSO"><h3>Network.supportsSSO()</h3>

**说明**: 检测当前平台是否支持单点登录（SSO）。不支持 SSO 的平台（如 GameCenter）通常走离线模式。

**参数**: 无

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 modules/core/ui/utilities/utilities-liveops.js
// 根据 SSO 支持切换在线/离线逻辑
if (Network.supportsSSO()) {
  // 在线逻辑：Metadata、LiveEvent 等
} else {
  // 离线逻辑：仅 Memento 等
}
```

</API>
<API id="Network.isLoggedIn"><h3>Network.isLoggedIn()</h3>

**说明**: 检测当前用户是否已登录。通常与 `isConnectedToNetwork` 和 `isConnectedToSSO` 组合使用判断在线状态。

**参数**: 无

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 modules/core/ui/profile-header/profile-header.js
// 组合判断在线状态
return Network.isConnectedToNetwork() && Network.isConnectedToSSO() && Network.isLoggedIn();
```

</API>
<API id="Network.isConnectedToSSO"><h3>Network.isConnectedToSSO()</h3>

**说明**: 检测是否已连接到 SSO 服务。与 `isConnectedToNetwork` 不同，此方法仅检查 SSO 层连接。

**参数**: 无

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/endgame/screen-endgame.js
// 检查 SSO 连接和平台类型
const shouldShowLegendsReport = Network.isConnectedToSSO() && Network.getLocalHostingPlatform() != HostingType.HOSTING_TYPE_GAMECENTER;
```

</API>
<API id="Network.isConnectedToNetwork"><h3>Network.isConnectedToNetwork()</h3>

**说明**: 检测设备是否连接到网络（底层网络连通性检查）。

**参数**: 无

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/main-menu/main-menu.js
// 检查网络连通性
if (Network.isConnectedToNetwork()) {
  // 执行在线操作
}
```

</API>
<API id="Network.getBlockedAccessInfo"><h3>Network.getBlockedAccessInfo(permissionType)</h3>

**说明**: 获取指定权限的阻止访问信息。返回对象包含 `reason`（`BlockedAccessReason` 枚举）和 `locKey`（本地化提示文本 key）。

| 参数名 | 类型 | 说明 |
|------|------|------|
| permissionType | `DNAPermissionType` | 权限类型，如 `DNAPermissionType.PLAY_ONLINE` |

**返回值**: `{reason: BlockedAccessReason, locKey: string}`

**使用示例**:

```javascript
// 来源 modules/core/ui/utilities/utilities-network.js
// 检查在线游玩权限是否被阻止
const blockInfo = Network.getBlockedAccessInfo(DNAPermissionType.PLAY_ONLINE);
if (blockInfo.reason !== BlockedAccessReason.NONE) {
  // 显示阻止提示 Dialog
  console.log(blockInfo.locKey);
}
```

</API>
<API id="Network.triggerNetworkCheck"><h3>Network.triggerNetworkCheck(isUserInput)</h3>

**说明**: 触发一次网络状态检查。返回检查结果对象，包含 `networkResult` 字段。

| 参数名 | 类型 | 说明 |
|------|------|------|
| isUserInput | `bool` | 是否为用户主动触发的检查 |

**返回值**: `{networkResult: NetworkResult, ...}`

**使用示例**:

```javascript
// 来源 modules/core/ui/utilities/utilities-network.js
// 触发网络检查并判断结果
const result = Network.triggerNetworkCheck(isUserInput);
const isConnectedToNetwork = result.networkResult != NetworkResult.NETWORKRESULT_NO_NETWORK;
```

</API>
<API id="Network.getLocalHostingPlatform"><h3>Network.getLocalHostingPlatform()</h3>

**说明**: 获取当前本地主机平台类型。返回 `HostingType` 枚举值，如 `HOSTING_TYPE_STEAM`、`HOSTING_TYPE_EOS` 等。

**参数**: 无

**返回值**: `string`（`HostingType` 枚举）

**使用示例**:

```javascript
// 来源 modules/core/ui/utilities/utilities-network.js
// 获取本地平台类型
const localPlatform = Network.getLocalHostingPlatform();
const platformIcon = platformIcons.get(localPlatform);
```

</API>
<API id="Network.loadGame"><h3>Network.loadGame(loadParams, serverType)</h3>

**说明**: 加载游戏存档并启动游戏。返回是否成功加载。

| 参数名 | 类型 | 说明 |
|------|------|------|
| loadParams | `object` | 加载参数，包含存档位置、类型等信息 |
| serverType | `ServerType` | 服务器类型，如 `ServerType.SERVER_TYPE_NONE` |

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/automation/automation-base-benchmark-game.js
// 加载存档并启动游戏
const bResult = Network.loadGame(loadParams, ServerType.SERVER_TYPE_NONE);
```

</API>
<API id="Network.saveGame"><h3>Network.saveGame(params)</h3>

**说明**: 保存当前游戏。参数为包含存档位置、类型、文件名等信息的对象。

| 参数名 | 类型 | 说明 |
|------|------|------|
| params | `object` | 存档参数 `{Location, LocationCategories, Type, FileName, SaveFileType}` |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/save-load/model-save-load.js
// 保存游戏到指定位置
Network.saveGame({
  Location: saveLocation,
  LocationCategories: SaveLocationCategories.NORMAL,
  Type: saveType,
  FileName: fileName,
  SaveFileType: saveFileType
});
```

</API>
<API id="Network.hostGame"><h3>Network.hostGame(serverType)</h3>

**说明**: 以主持人身份创建并开始多人游戏。

| 参数名 | 类型 | 说明 |
|------|------|------|
| serverType | `ServerType` | 服务器类型 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/automation/automation-base-play-game.js
// 以指定服务器类型主持游戏
Network.hostGame(ServerType.SERVER_TYPE_NONE);
```

</API>
<API id="Network.sendChat"><h3>Network.sendChat(msg, targetType, targetID)</h3>

**说明**: 发送聊天消息到指定目标。

| 参数名 | 类型 | 说明 |
|------|------|------|
| msg | `string` | 聊天消息内容 |
| targetType | `ChatTargetTypes` | 聊天目标类型（全局/队伍/私聊） |
| targetID | `int` | 目标玩家 ID（私聊时使用） |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/mp-chat/screen-mp-chat.js
// 发送聊天消息
Network.sendChat(this.markupMessage, targetType, targetID);
```

</API>
<API id="Network.getChatHistory"><h3>Network.getChatHistory()</h3>

**说明**: 获取聊天历史记录数组。返回 `null` 或 `undefined` 时表示无历史。

**参数**: 无

**返回值**: `array` | `null`

**使用示例**:

```javascript
// 来源 modules/core/ui/mp-chat/screen-mp-chat.js
// 遍历聊天历史
Network.getChatHistory()?.forEach((data) => this.onMultiplayerChat(data, false));
```

</API>
<API id="Network.getLegalDocuments"><h3>Network.getLegalDocuments(placementName)</h3>

**说明**: 获取指定位置的法律文件列表。用于显示需要用户确认的法律条款。

| 参数名 | 类型 | 说明 |
|------|------|------|
| placementName | `string` | 法律文件放置位置名称，如 `LegalDocsPlacementAcceptName` |

**返回值**: `array` | `null`

**使用示例**:

```javascript
// 来源 modules/core/ui/utilities/utilities-network.js
// 获取法律文件并检查是否已确认
const legalDocuments = Network.getLegalDocuments(LegalDocsPlacementAcceptName);
if (legalDocuments && legalDocuments.length > 0) {
  if (!Network.areAllLegalDocumentsConfirmed()) {
    // 显示法律文件确认界面
  }
}
```

</API>
<API id="Network.getJoinCode"><h3>Network.getJoinCode()</h3>

**说明**: 获取当前多人游戏的加入码。其他玩家可通过此加入码加入游戏。

**参数**: 无

**返回值**: `string`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui-next/screens/pause-menu/pause-menu-model.js
// 复制加入码到剪贴板
UI.setClipboardText(Network.getJoinCode());
```

</API>
<API id="Network.leaveMultiplayerGame"><h3>Network.leaveMultiplayerGame()</h3>

**说明**: 离开当前多人游戏。在创建游戏失败、取消等待等场景中调用。

**参数**: 无

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/mp-shell-logic/mp-shell-logic.js
// 离开多人游戏并通知主菜单
Network.leaveMultiplayerGame();
window.dispatchEvent(new MultiplayerJoinFailEvent("cancel"));
```

</API>
<API id="Network.isPlayerMuted"><h3>Network.isPlayerMuted(playerID)</h3>

**说明**: 检查指定玩家是否已被静音。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 玩家 ID |

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/mp-staging/model-mp-staging-new.js
// 检查玩家静音状态
const isMuted = Network.isPlayerMuted(curPlayerID);
```

</API>
<API id="Network.setPlayerMuted"><h3>Network.setPlayerMuted(playerID, muted)</h3>

**说明**: 设置指定玩家的静音状态。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 玩家 ID |
| muted | `bool` | 是否静音 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/mp-staging/model-mp-staging-new.js
// 切换玩家静音状态
Network.setPlayerMuted(mutePlayerID, mute);
engine.trigger("staging-mute-changed");
```

</API>
<API id="Network.kickVotePlayer"><h3>Network.kickVotePlayer(id, yesVote, reason)</h3>

**说明**: 对指定玩家发起投票踢出。

| 参数名 | 类型 | 说明 |
|------|------|------|
| id | `int` | 目标玩家 ID |
| yesVote | `bool` | 是否投赞成票 |
| reason | `KickVoteReasonType` | 踢出原因类型 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/mp-staging/model-mp-staging-new.js
// 投票踢出玩家
Network.kickVotePlayer(kickPlayerID, true, KickVoteReasonType.KICKVOTE_NONE);
```

</API>
<API id="Network.toggleMultiplayerPause"><h3>Network.toggleMultiplayerPause()</h3>

**说明**: 切换多人游戏的暂停状态。由游戏内操作面板触发。

**参数**: 无

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/action/panel-action.js
// 切换多人游戏暂停
Network.toggleMultiplayerPause();
```

</API>
<API id="Network.forceResync"><h3>Network.forceResync()</h3>

**说明**: 强制进行网络重新同步。在自动化测试中用于特定回合触发重同步。

**参数**: 无

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/automation/automation-base-play-game.js
// 在指定回合强制重同步
if (resyncTurnNumber == data.turn) {
  Network.forceResync();
}
```

</API>
<API id="Network.getServerType"><h3>Network.getServerType()</h3>

**说明**: 获取当前游戏的服务器类型。

**参数**: 无

**返回值**: `string`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui-next/screens/pause-menu/pause-menu-model.js
// 获取当前服务器类型
const configServerType = Network.getServerType();
```

</API>
<API id="Network.getHostPlayerId"><h3>Network.getHostPlayerId()</h3>

**说明**: 获取当前多人游戏的主机玩家 ID。

**参数**: 无

**返回值**: `int`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/mp-staging/model-mp-staging-new.js
// 判断是否为本地主机玩家
const isHost = Network.getHostPlayerId() == GameContext.localPlayerID;
```

</API>
<API id="Network.isPlayerConnected"><h3>Network.isPlayerConnected(id)</h3>

**说明**: 检查指定玩家是否已连接。

| 参数名 | 类型 | 说明 |
|------|------|------|
| id | `int` | 玩家 ID |

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/mp-staging/model-mp-staging-new.js
// 获取玩家连接状态
const isConnected = Network.isPlayerConnected(curPlayerID);
```

</API>
<API id="Network.isPlayerStartReady"><h3>Network.isPlayerStartReady(id)</h3>

**说明**: 检查指定玩家是否已准备开始游戏。

| 参数名 | 类型 | 说明 |
|------|------|------|
| id | `int` | 玩家 ID |

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/mp-staging/model-mp-staging-new.js
// 检查本地玩家准备状态
const isReady = Network.isPlayerStartReady(GameContext.localPlayerID);
```

</API>
<API id="Network.toggleLocalPlayerStartReady"><h3>Network.toggleLocalPlayerStartReady()</h3>

**说明**: 切换本地玩家的准备状态。在多人游戏大厅中使用。

**参数**: 无

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/mp-staging/model-mp-staging-new.js
// 倒计时结束自动切换准备状态
if (!Network.isPlayerStartReady(GameContext.localPlayerID)) {
  Network.toggleLocalPlayerStartReady();
}
```

</API>
<API id="Network.startMultiplayerGame"><h3>Network.startMultiplayerGame()</h3>

**说明**: 开始多人游戏（在主机设置完成后调用）。

**参数**: 无

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/mp-host-setup/mp-hostsetup.js
// 主机点击开始游戏
Network.startMultiplayerGame();
```

</API>
<API id="Network.getChatTargets"><h3>Network.getChatTargets()</h3>

**说明**: 获取当前可用的聊天目标列表。返回数组包含各目标类型和 ID。

**参数**: 无

**返回值**: `array`

**使用示例**:

```javascript
// 来源 modules/core/ui/mp-chat/screen-mp-chat.js
// 获取当前聊天目标并查找队伍目标
const currentChatTargets = Network.getChatTargets();
const teamTarget = currentChatTargets.find(t => t.targetType == ChatTargetTypes.CHATTARGET_TEAM);
```

</API>
<API id="Network.getUnreadChatLength"><h3>Network.getUnreadChatLength()</h3>

**说明**: 获取未读聊天消息数量。

**参数**: 无

**返回值**: `int`

**使用示例**:

```javascript
// 来源 modules/core/ui/mp-chat/screen-mp-chat.js
// 更新未读消息按钮可见性
this.unreadButtonContainer.classList.toggle("hidden", !Network.getUnreadChatLength() && !this.forcedUnread);
```

</API>
<API id="Network.readChat"><h3>Network.readChat()</h3>

**说明**: 标记所有聊天消息为已读。

**参数**: 无

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/mp-chat/screen-mp-chat.js
// 滚动到底部时标记已读
Network.readChat();
this.forcedUnread = false;
```

</API>
<API id="Network.acceptInvite"><h3>Network.acceptInvite(joinCode)</h3>

**说明**: 接受多人游戏邀请。

| 参数名 | 类型 | 说明 |
|------|------|------|
| joinCode | `string` | 游戏加入码 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/system-message/system-message-manager.js
// 接受邀请加入游戏
Network.acceptInvite(joinCode);
```

</API>
<API id="Network.declineInvite"><h3>Network.declineInvite(joinCode)</h3>

**说明**: 拒绝多人游戏邀请。

| 参数名 | 类型 | 说明 |
|------|------|------|
| joinCode | `string` | 游戏加入码 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/system-message/system-message-manager.js
// 拒绝邀请
Network.declineInvite(joinCode);
```

</API>
<API id="Network.syncGame"><h3>Network.syncGame(params)</h3>

**说明**: 同步游戏存档到云端。

| 参数名 | 类型 | 说明 |
|------|------|------|
| params | `object` | 同步参数 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/save-load/screen-save-load.js
// 同步游戏存档
Network.syncGame({
  Location: saveLocation,
  Type: saveType,
  FileName: fileName
});
```

</API>
<API id="Network.restartGame"><h3>Network.restartGame()</h3>

**说明**: 重新开始当前游戏。

**参数**: 无

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui-next/screens/pause-menu/pause-menu-model.js
// 重新开始游戏
Network.restartGame();
```

</API>
<API id="Network.isMetagamingAvailable"><h3>Network.isMetagamingAvailable()</h3>

**说明**: 检查元游戏（MetaGame/Progression）功能是否可用。

**参数**: 无

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/endgame/screen-endgame.js
// 检查 SSO 和元游戏是否都可用
if (Network.supportsSSO() && Network.isMetagamingAvailable()) {
  // 显示元游戏相关内容
}
```

</API>
<API id="Network.testHashing"><h3>Network.testHashing(value)</h3>

**说明**: 测试哈希功能（调试用，仅在 Tuner 面板中使用）。

| 参数名 | 类型 | 说明 |
|------|------|------|
| value | `int` | 测试值 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 TunerPanels/Reflection.ltp
// 调试面板中测试哈希
Network.testHashing(0);
```

</API>