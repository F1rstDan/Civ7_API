---
title: Online 在线服务
doc_type: other
summary: 在线服务全局对象，涵盖社交（好友/屏蔽/邀请）、用户档案（奖励/徽章）、元进程（传说之路/挑战/纪念品）、活动事件、促销推广、每日消息和成就系统。
primary_scope:
  - Online
related_scope:
  - Network
  - Configuration
source:
  - modules/core/ui/shell/main-menu/main-menu.js
  - modules/core/ui/shell/mp-staging/model-mp-friends.js
  - modules/core/ui/shell/mp-staging/mp-friends-options.js
  - modules/core/ui/shell/mp-staging/mp-player-options.js
  - modules/core/ui/shell/mp-staging/mp-friends.js
  - modules/core/ui/shell/mp-staging/mp-report.js
  - modules/core/ui/shell/main-menu/main-menu-carousel-model.js
  - modules/core/ui/shell/events/screen-events.js
  - modules/core/ui/shell/live-event-logic/live-event-logic.js
  - modules/core/ui/shell/create-panels/leader-select-model.js
  - modules/core/ui/shell/create-panels/memento-editor.js
  - modules/core/ui/shell/collection/collection-content.js
  - modules/core/ui/shell/gift-notifications/giftbox-popup.js
  - modules/core/ui/profile-page/screen-profile-page.js
  - modules/core/ui/profile-header/profile-header.js
  - modules/core/ui/rewards-notifications/rewards-notification-manager.js
  - modules/core/ui/utilities/utilities-liveops.js
  - modules/core/ui/social-notifications/social-notifications-manager.js
  - modules/core/ui/mp-chat/send-to-panel.js
  - modules/core/ui/progression-header/progression-header.js
  - modules/base-standard/ui/legends-manager/legends-manager.js
  - modules/base-standard/ui/pause-event-rules/screen-pause-event-rules.js
  - modules/base-standard/ui/tutorial/tutorial-support.js
  - modules/base-standard/ui/tutorial/tutorial-manager.js
  - modules/base-standard/ui-next/screens/pause-menu/pause-menu-model.js
  - modules/core/ui-next/screens/create-game/memento-select-model.js
  - modules/core/ui/shell/mp-landing/mp-landing-new.js
  - modules/core/ui/shell/mp-browser/mp-browser-new.js
  - modules/core/ui/shell/mp-primary-account-select/mp-primary-account-select.js
  - modules/core/ui/shell/store-launcher/2k-code-redemption.js
  - modules/core/ui/shell/store-launcher/screen-dlc-viewer.js
  - modules/core/ui/options/options.js
doc_update: 2026-06-06
---

# Online 在线服务

在线服务全局对象，提供与 2K 账号体系、社交系统、元进程（MetaProgression）、活动事件、促销推广和成就相关的 API。引擎直接注入，无需手动 import 引入。

## 快速示例

```javascript
// 来源 modules/core/ui/shell/main-menu/main-menu.js
// 检查元进程（纪念品）支持和活动事件状态
if (Online.Metaprogression.supportsMemento()) {
  // 显示纪念品相关 UI
}
const liveReqs = Online.LiveEvent.isLiveEventActive() && Network.isMetagamingAvailable();
```

```javascript
// 来源 modules/core/ui/shell/mp-staging/model-mp-friends.js
// 获取好友列表和社交通知
const friendsNum = Online.Social.getFriendCount(FriendListTypes.Immediate);
const friendInfo = Online.Social.getFriendInfoByIndex(i, FriendListTypes.Immediate);
const notifications = Online.Social.getNotifications();
```

```javascript
// 来源 modules/core/ui/profile-page/screen-profile-page.js
// 获取用户档案和奖励
const currentProfile = Online.UserProfile.getUserProfileData();
const isOfflineMemento = !Network.supportsSSO() && Online.Metaprogression.supportsMemento();
```

## 属性与方法

### 子系统总览

| 子系统 | 说明 |
|--------|------|
| `Online.Social` | 社交系统 — 好友、屏蔽、邀请、通知、举报 |
| `Online.UserProfile` | 用户档案 — 奖励、徽章、显示名称、平台档案 |
| `Online.Metaprogression` | 元进程 — 传说之路、挑战、纪念品（Memento） |
| `Online.LiveEvent` | 活动事件 — 限时活动、事件标记、配置键 |
| `Online.Promo` | 促销推广 — 主菜单轮播、2K 商店、广告交互 |
| `Online.MOTD` | 每日消息 — 主菜单每日通知 |
| `Online.Achievements` | 成就系统 — 基础/领袖 XP、挑战完成、奖励解锁 |

### Online.Social 社交

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Online.Social.getFriendCount</API> | listType | `int` | 获取好友列表数量 |
| <API>Online.Social.getFriendInfoByIndex</API> | index, listType | `object` | 按索引获取好友信息 |
| <API>Online.Social.isUserFriend</API> | friendId | `bool` | 是否为好友 |
| <API>Online.Social.isUserFriendOnPlatform</API> | friendId, listType | `bool` | 指定平台是否为好友 |
| <API>Online.Social.isUserPendingFriend</API> | friendId | `bool` | 是否有待处理好友请求 |
| <API>Online.Social.hasFriendInviteFromUser</API> | friendId | `bool` | 是否收到该用户的好友邀请 |
| <API>Online.Social.isUserBlocked</API> | friendId, platSpecific | `bool` | 是否已屏蔽该用户 |
| <API>Online.Social.isPlayerBlocked</API> | playerID | `bool` | 是否已屏蔽该游戏内玩家 |
| <API>Online.Social.sendFriendRequest</API> | friendID | `void` | 发送好友请求 |
| <API>Online.Social.acceptFriendRequest</API> | friendId | `void` | 接受好友请求 |
| <API>Online.Social.rejectFriendRequest</API> | friendId | `void` | 拒绝好友请求 |
| <API>Online.Social.removeFriend</API> | friendId | `void` | 移除好友 |
| <API>Online.Social.blockUser</API> | friendID | `void` | 屏蔽用户 |
| <API>Online.Social.unblockUser</API> | friendID | `void` | 取消屏蔽用户 |
| <API>Online.Social.blockPlayer</API> | playerID | `void` | 屏蔽玩家 |
| <API>Online.Social.unblockPlayer</API> | playerID | `void` | 取消屏蔽玩家 |
| <API>Online.Social.inviteFriendToGame</API> | friendID | `void` | 邀请好友加入游戏 |
| <API>Online.Social.acceptGameInvite</API> | gamertag | `void` | 接受游戏邀请 |
| <API>Online.Social.declineGameInvite</API> | gamertag | `void` | 拒绝游戏邀请 |
| <API>Online.Social.searchFriendList</API> | userName | `void` | 搜索好友列表 |
| <API>Online.Social.getFriendSearchResults</API> | — | `array` | 获取好友搜索结果 |
| <API>Online.Social.getMaxFriendSearchResults</API> | — | `int` | 获取最大好友搜索结果数 |
| <API>Online.Social.getRichPresence</API> | friendID, key | `string` | 获取好友的 Rich Presence 信息 |
| <API>Online.Social.getRecentlyMetPlayers</API> | — | `array` | 获取最近遇到的玩家 |
| <API>Online.Social.getNotifications</API> | — | `array` | 获取社交通知 |
| <API>Online.Social.getNotificationJoins</API> | — | `array` | 获取通知加入信息 |
| <API>Online.Social.getMaxNotifications</API> | — | `int` | 获取最大通知数 |
| <API>Online.Social.anyUnreadSocialNotifications</API> | — | `bool` | 是否有未读社交通知 |
| <API>Online.Social.setReadSocialNotifications</API> | — | `void` | 标记社交通知为已读 |
| <API>Online.Social.refreshFriendList</API> | — | `void` | 刷新好友列表 |
| <API>Online.Social.getPlayerFriendID_Network</API> | playerID | `string` | 获取玩家的 Network 平台好友 ID |
| <API>Online.Social.getPlayerFriendID_T2GP</API> | playerID | `string` | 获取玩家的 T2GP 平台好友 ID |
| <API>Online.Social.canViewProfileWithLobbyPlayerId</API> | playerID | `bool` | 能否通过大厅玩家 ID 查看档案 |
| <API>Online.Social.canViewProfileWithFriendId</API> | friendId1p, friendIdT2gp | `bool` | 能否通过好友 ID 查看档案 |
| <API>Online.Social.viewProfile</API> | nativeId, t2gpId | `void` | 查看玩家档案 |
| <API>Online.Social.reportUser</API> | userId, reason, message | `void` | 举报用户 |
| <API>Online.Social.reportMultiplayerRoom</API> | roomId, userId, reason, message | `void` | 举报多人房间 |
| <API>Online.Social.getReportingReasonsPlayer</API> | playerID | `array` | 获取玩家举报原因列表 |
| <API>Online.Social.activateOverlayToUserGeneratedContent</API> | subscriptionId | `void` | 激活 UGC 内容覆盖层 |

### Online.UserProfile 用户档案

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Online.UserProfile.getUserProfileData</API> | — | `object` | 获取当前用户档案数据 |
| <API>Online.UserProfile.getMyDisplayName</API> | — | `string` | 获取当前用户显示名称 |
| <API>Online.UserProfile.getOthersUserProfile</API> | friendId, platformUsername | `object` | 获取其他用户的档案 |
| <API>Online.UserProfile.updateUserProfile</API> | profile | `void` | 更新用户档案 |
| <API>Online.UserProfile.getPlatformUserProfilesData</API> | — | `array` | 获取平台用户档案列表 |
| <API>Online.UserProfile.getRewardEntries</API> | — | `array` | 获取所有奖励条目 |
| <API>Online.UserProfile.getNewlyUnlockedItems</API> | — | `array` | 获取新解锁的奖励物品 |
| <API>Online.UserProfile.clearNewlyUnlockedItems</API> | — | `void` | 清除新解锁物品标记 |
| <API>Online.UserProfile.isRewardUnlocked</API> | name | `bool` | 是否已解锁指定奖励 |
| <API>Online.UserProfile.getUnlockableRewardTypeIDString</API> | rewardType | `string` | 获取奖励类型 ID 字符串 |
| <API>Online.UserProfile.getRewardsEnabledConfiguration</API> | — | `bool` | 奖励功能是否启用 |
| <API>Online.UserProfile.getRewardsAutoPopupEnabledConfiguration</API> | — | `bool` | 奖励自动弹窗是否启用 |

### Online.Metaprogression 元进程

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Online.Metaprogression.supportsMemento</API> | — | `bool` | 是否支持纪念品系统 |
| <API>Online.Metaprogression.getLegendPathsData</API> | — | `array` | 获取传说之路数据 |
| <API>Online.Metaprogression.getMementosData</API> | — | `array` | 获取纪念品数据 |
| <API>Online.Metaprogression.getMementoSlotData</API> | — | `array` | 获取纪念品槽位元数据 |
| <API>Online.Metaprogression.getEquippedMementos</API> | playerID | `array` | 获取指定玩家已装备的纪念品 |
| <API>Online.Metaprogression.getChallengeData</API> | — | `array` | 获取挑战数据 |
| <API>Online.Metaprogression.getChallengeCategoryData</API> | category | `object` | 获取挑战分类数据 |
| <API>Online.Metaprogression.isPlayingActiveEvent</API> | — | `bool` | 是否正在游玩活动事件 |
| <API>Online.Metaprogression.canResetPrimaryAccount</API> | — | `bool` | 是否可以重置主账号选择 |
| <API>Online.Metaprogression.resetPrimaryAccountSelection</API> | — | `void` | 重置主账号选择 |
| <API>Online.Metaprogression.setSeenMemento</API> | mementoTypeId | `void` | 标记纪念品为已查看 |

### Online.LiveEvent 活动事件

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Online.LiveEvent.isLiveEventActive</API> | — | `bool` | 是否有活动事件活跃 |
| <API>Online.LiveEvent.getCurrentLiveEvent</API> | — | `string` | 获取当前活动事件名称 |
| <API>Online.LiveEvent.getActiveLiveEventKey</API> | — | `string` | 获取活跃活动事件键 |
| <API>Online.LiveEvent.getLiveEventGameFlag</API> | — | `bool` | 获取活动事件游戏标记 |
| <API>Online.LiveEvent.setLiveEventGameFlag</API> | — | `void` | 设置活动事件游戏标记 |
| <API>Online.LiveEvent.clearLiveEventGameFlag</API> | — | `void` | 清除活动事件游戏标记 |
| <API>Online.LiveEvent.getLiveEventConfigKeys</API> | — | `array` | 获取活动事件配置键列表 |
| <API>Online.LiveEvent.clearLiveEventConfigKeys</API> | — | `void` | 清除活动事件配置键 |
| <API>Online.LiveEvent.getEndDateofCurrentLiveEvent</API> | — | `string` | 获取当前活动事件结束日期 |

### Online.Promo 促销推广

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Online.Promo.isPromoReady</API> | — | `bool` | 推广数据是否已就绪 |
| <API>Online.Promo.hasFetchPromotionFailed</API> | — | `bool` | 推广数据获取是否失败 |
| <API>Online.Promo.reloadPromos</API> | — | `void` | 重新加载推广数据 |
| <API>Online.Promo.getPlacementUIData</API> | placement | `array` | 获取指定位置的推广 UI 数据 |
| <API>Online.Promo.getPromosForPlacement</API> | placement | `array` | 获取指定位置的推广列表 |
| <API>Online.Promo.shouldPromoDisplayOwnership</API> | — | `bool` | 是否应显示推广物品的拥有状态 |
| <API>Online.Promo.interactWithPromo</API> | action, promoId, location, index | `void` | 与推广内容交互 |
| <API>Online.Promo.telemetryPromoAction</API> | action, promoId, location, index, destination | `void` | 记录推广遥测操作 |
| <API>Online.Promo.checkPromoUIData</API> | placement, promoId | `void` | 检查推广 UI 数据 |
| <API>Online.Promo.viewPromo</API> | promoId | `void` | 查看推广详情 |
| <API>Online.Promo.getPromoCarouselAutoSlideTime</API> | — | `int` | 获取推广轮播自动滑动时间 |

### Online.MOTD 每日消息

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Online.MOTD.getAllMOTDHeaders</API> | — | `array` | 获取所有每日消息标题 |
| <API>Online.MOTD.getMOTD</API> | title | `string` | 获取指定标题的每日消息内容 |

### Online.Achievements 成就

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Online.Achievements.getGainedFoundationXP</API> | — | `int` | 获取已获得的基础经验值 |
| <API>Online.Achievements.getGainedLeaderXP</API> | category | `int` | 获取指定领袖分类的经验值 |
| <API>Online.Achievements.getCompletedFoundationChallengeData</API> | — | `array` | 获取已完成的基础挑战数据 |
| <API>Online.Achievements.getCompletedLeaderChallengeData</API> | category | `array` | 获取已完成的领袖挑战数据 |
| <API>Online.Achievements.getUnlockedRewards</API> | — | `array` | 获取已解锁的奖励列表 |
| <API>Online.Achievements.getAvaliableRewardsForLiveEvent</API> | eventName | `array` | 获取活动事件可用的奖励 |

## 相关全局对象

| 对象 | 说明 |
|------|------|
| [`Network`](network.md) | 网络和多人游戏，`Network.supportsSSO()` 常用于判断在线/离线模式 |
| [`Configuration`](configuration.md) | 用户和游戏配置，教程等级、多人设置等 |

<API id="Online.Social.getFriendCount"><h3>Online.Social.getFriendCount(listType)</h3>

**说明**: 获取指定类型的好友列表数量。

| 参数名 | 类型 | 说明 |
|------|------|------|
| listType | `FriendListTypes` | 好友列表类型（`Immediate` / `Blocked`） |

**返回值**: `int`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/mp-staging/model-mp-friends.js
// 获取好友数量和屏蔽用户数量
const friendsNum = Online.Social.getFriendCount(FriendListTypes.Immediate);
const blockedPlayersNum = Online.Social.getFriendCount(FriendListTypes.Blocked);
```

</API>
<API id="Online.Social.getFriendInfoByIndex"><h3>Online.Social.getFriendInfoByIndex(index, listType)</h3>

**说明**: 按索引获取好友或屏蔽用户的信息。

| 参数名 | 类型 | 说明 |
|------|------|------|
| index | `int` | 列表索引 |
| listType | `FriendListTypes` | 好友列表类型 |

**返回值**: `object` — 包含 `friendID1P`、`friendIDT2gp`、`displayName` 等字段

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/mp-staging/model-mp-friends.js
// 遍历好友列表获取信息
const friendInfo = Online.Social.getFriendInfoByIndex(i, FriendListTypes.Immediate);
const statusDetails = Online.Social.getRichPresence(friendInfo.friendID1P, "civPresence");
```

</API>
<API id="Online.Social.isUserFriend"><h3>Online.Social.isUserFriend(friendId)</h3>

**说明**: 检查指定用户是否在好友列表中。

| 参数名 | 类型 | 说明 |
|------|------|------|
| friendId | `string` | 好友 ID |

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/mp-staging/mp-player-options.js
// 判断是否显示添加好友选项
if (this.networkFriendID == "" || Online.Social.isUserFriend(this.networkFriendID)) {
  // 隐藏添加好友按钮
}
```

</API>
<API id="Online.Social.isUserBlocked"><h3>Online.Social.isUserBlocked(friendId, platSpecific)</h3>

**说明**: 检查指定用户是否已被屏蔽。

| 参数名 | 类型 | 说明 |
|------|------|------|
| friendId | `string` | 好友 ID |
| platSpecific | `bool` | 是否仅检查特定平台 |

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/mp-staging/mp-friends-options.js
// 检查用户屏蔽状态
if (!Online.Social.isUserBlocked(friendId, false)) {
  // 显示发送好友请求选项
}
```

</API>
<API id="Online.Social.sendFriendRequest"><h3>Online.Social.sendFriendRequest(friendID)</h3>

**说明**: 向指定用户发送好友请求。

| 参数名 | 类型 | 说明 |
|------|------|------|
| friendID | `string` | 目标用户 ID |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/mp-staging/mp-friends-options.js
// 发送好友请求
Online.Social.sendFriendRequest(friendID);
```

</API>
<API id="Online.Social.acceptFriendRequest"><h3>Online.Social.acceptFriendRequest(friendId)</h3>

**说明**: 接受来自指定用户的好友请求。

| 参数名 | 类型 | 说明 |
|------|------|------|
| friendId | `string` | 好友 ID |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/mp-staging/mp-friends-options.js
// 接受好友请求
Online.Social.acceptFriendRequest(this.friendIdT2gp);
```

</API>
<API id="Online.Social.rejectFriendRequest"><h3>Online.Social.rejectFriendRequest(friendId)</h3>

**说明**: 拒绝来自指定用户的好友请求。

| 参数名 | 类型 | 说明 |
|------|------|------|
| friendId | `string` | 好友 ID |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/mp-staging/mp-friends-options.js
// 拒绝好友请求
Online.Social.rejectFriendRequest(twoKId);
```

</API>
<API id="Online.Social.removeFriend"><h3>Online.Social.removeFriend(friendId)</h3>

**说明**: 从好友列表中移除指定用户。

| 参数名 | 类型 | 说明 |
|------|------|------|
| friendId | `string` | 好友 ID |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/mp-staging/mp-friends-options.js
// 移除好友
Online.Social.removeFriend(this.friendIdT2gp);
```

</API>
<API id="Online.Social.blockUser"><h3>Online.Social.blockUser(friendID)</h3>

**说明**: 屏蔽指定用户。

| 参数名 | 类型 | 说明 |
|------|------|------|
| friendID | `string` | 目标用户 ID |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/mp-staging/mp-friends-options.js
// 屏蔽用户
Online.Social.blockUser(friendID);
```

</API>
<API id="Online.Social.unblockUser"><h3>Online.Social.unblockUser(friendID)</h3>

**说明**: 取消屏蔽指定用户。

| 参数名 | 类型 | 说明 |
|------|------|------|
| friendID | `string` | 目标用户 ID |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/mp-staging/model-mp-friends.js
// 取消屏蔽用户
Online.Social.unblockUser(friendID);
```

</API>
<API id="Online.Social.blockPlayer"><h3>Online.Social.blockPlayer(playerID)</h3>

**说明**: 屏蔽指定游戏内玩家。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 玩家 ID |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/mp-staging/mp-player-options.js
// 根据屏蔽状态切换
if (Online.Social.isPlayerBlocked(playerID)) {
  Online.Social.unblockPlayer(playerID);
} else {
  Online.Social.blockPlayer(playerID);
}
```

</API>
<API id="Online.Social.unblockPlayer"><h3>Online.Social.unblockPlayer(playerID)</h3>

**说明**: 取消屏蔽指定游戏内玩家。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 玩家 ID |

**返回值**: `void`

</API>
<API id="Online.Social.inviteFriendToGame"><h3>Online.Social.inviteFriendToGame(friendID)</h3>

**说明**: 邀请好友加入当前游戏。

| 参数名 | 类型 | 说明 |
|------|------|------|
| friendID | `string` | 好友 ID |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/mp-staging/model-mp-friends.js
// 邀请好友加入游戏
Online.Social.inviteFriendToGame(friendID);
```

</API>
<API id="Online.Social.acceptGameInvite"><h3>Online.Social.acceptGameInvite(gamertag)</h3>

**说明**: 接受来自指定玩家的游戏邀请。

| 参数名 | 类型 | 说明 |
|------|------|------|
| gamertag | `string` | 玩家 Gamertag |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/mp-staging/mp-friends-options.js
// 接受游戏邀请
Online.Social.acceptGameInvite(this.gamertagT2gp);
```

</API>
<API id="Online.Social.declineGameInvite"><h3>Online.Social.declineGameInvite(gamertag)</h3>

**说明**: 拒绝来自指定玩家的游戏邀请。

| 参数名 | 类型 | 说明 |
|------|------|------|
| gamertag | `string` | 玩家 Gamertag |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/mp-staging/mp-friends-options.js
// 拒绝游戏邀请
Online.Social.declineGameInvite(this.gamertagT2gp);
```

</API>
<API id="Online.Social.searchFriendList"><h3>Online.Social.searchFriendList(userName)</h3>

**说明**: 按用户名搜索好友列表。

| 参数名 | 类型 | 说明 |
|------|------|------|
| userName | `string` | 搜索的用户名 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/mp-staging/mp-search.js
// 搜索好友
Online.Social.searchFriendList(userName);
```

</API>
<API id="Online.Social.getFriendSearchResults"><h3>Online.Social.getFriendSearchResults()</h3>

**说明**: 获取好友搜索的结果列表。

**参数**: 无

**返回值**: `array`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/mp-staging/model-mp-friends.js
// 遍历搜索结果
const searchResults = Online.Social.getFriendSearchResults();
for (let i = 0; i < Math.min(searchResults.length, Online.Social.getMaxFriendSearchResults()); ++i) {
  // 处理搜索结果
}
```

</API>
<API id="Online.Social.getRichPresence"><h3>Online.Social.getRichPresence(friendID, key)</h3>

**说明**: 获取好友的 Rich Presence 信息，如游戏状态等。

| 参数名 | 类型 | 说明 |
|------|------|------|
| friendID | `string` | 好友 ID |
| key | `string` | 信息键，如 `"civPresence"` |

**返回值**: `string`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/mp-staging/model-mp-friends.js
// 获取好友的 Civ 游戏状态
const statusDetails = Online.Social.getRichPresence(friendInfo.friendID1P, "civPresence");
```

</API>
<API id="Online.Social.getNotifications"><h3>Online.Social.getNotifications()</h3>

**说明**: 获取社交通知列表。

**参数**: 无

**返回值**: `array`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/mp-staging/model-mp-friends.js
// 获取并处理社交通知
const notifications = Online.Social.getNotifications();
```

</API>
<API id="Online.Social.anyUnreadSocialNotifications"><h3>Online.Social.anyUnreadSocialNotifications()</h3>

**说明**: 检查是否有未读社交通知。

**参数**: 无

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 modules/core/ui/profile-header/profile-header.js
// 检查未读社交通知
Online.Social.anyUnreadSocialNotifications();
```

</API>
<API id="Online.Social.setReadSocialNotifications"><h3>Online.Social.setReadSocialNotifications()</h3>

**说明**: 将所有社交通知标记为已读。

**参数**: 无

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/social-notifications/social-notifications-manager.js
// 标记社交通知已读
Online.Social.setReadSocialNotifications();
```

</API>
<API id="Online.Social.refreshFriendList"><h3>Online.Social.refreshFriendList()</h3>

**说明**: 刷新好友列表。

**参数**: 无

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/profile-header/profile-header.js
// 刷新好友列表
Online.Social.refreshFriendList();
```

</API>
<API id="Online.Social.getPlayerFriendID_Network"><h3>Online.Social.getPlayerFriendID_Network(playerID)</h3>

**说明**: 获取指定玩家的 Network 平台好友 ID。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 游戏内玩家 ID |

**返回值**: `string`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/mp-staging/model-mp-staging-new.js
// 获取两种平台的好友 ID
const nativeId = Online.Social.getPlayerFriendID_Network(playerID);
const t2gpId = Online.Social.getPlayerFriendID_T2GP(playerID);
Online.Social.viewProfile(nativeId, t2gpId);
```

</API>
<API id="Online.Social.getPlayerFriendID_T2GP"><h3>Online.Social.getPlayerFriendID_T2GP(playerID)</h3>

**说明**: 获取指定玩家的 T2GP 平台好友 ID。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 游戏内玩家 ID |

**返回值**: `string`

</API>
<API id="Online.Social.canViewProfileWithLobbyPlayerId"><h3>Online.Social.canViewProfileWithLobbyPlayerId(playerID)</h3>

**说明**: 检查是否可以通过大厅玩家 ID 查看档案。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 玩家 ID |

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/mp-staging/model-mp-staging-new.js
// 判断是否可查看档案
return Online.Social.canViewProfileWithLobbyPlayerId(playerID);
```

</API>
<API id="Online.Social.canViewProfileWithFriendId"><h3>Online.Social.canViewProfileWithFriendId(friendId1p, friendIdT2gp)</h3>

**说明**: 检查是否可以通过好友 ID 查看档案。

| 参数名 | 类型 | 说明 |
|------|------|------|
| friendId1p | `string` | 第一方平台好友 ID |
| friendIdT2gp | `string` | T2GP 平台好友 ID |

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/mp-staging/mp-friends-options.js
// 判断是否可查看好友档案
if (Online.Social.canViewProfileWithFriendId(this.friendId1p, this.friendIdT2gp)) {
  // 显示查看档案按钮
}
```

</API>
<API id="Online.Social.viewProfile"><h3>Online.Social.viewProfile(nativeId, t2gpId)</h3>

**说明**: 打开指定玩家的档案页面。

| 参数名 | 类型 | 说明 |
|------|------|------|
| nativeId | `string` | Network 平台好友 ID |
| t2gpId | `string` | T2GP 平台好友 ID |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/mp-staging/mp-friends-options.js
// 查看好友档案
Online.Social.viewProfile(this.friendId1p, this.friendIdT2gp);
```

</API>
<API id="Online.Social.reportUser"><h3>Online.Social.reportUser(userId, reason, message)</h3>

**说明**: 举报指定用户。

| 参数名 | 类型 | 说明 |
|------|------|------|
| userId | `string` | 被举报用户 ID |
| reason | `string` | 举报原因 |
| message | `string` | 举报附加消息 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/mp-staging/mp-report.js
// 举报用户
Online.Social.reportUser(this.reportUserId, this.reportReason, message);
```

</API>
<API id="Online.Social.reportMultiplayerRoom"><h3>Online.Social.reportMultiplayerRoom(roomId, userId, reason, message)</h3>

**说明**: 举报多人游戏房间。

| 参数名 | 类型 | 说明 |
|------|------|------|
| roomId | `string` | 房间 ID |
| userId | `string` | 被举报用户 ID |
| reason | `string` | 举报原因 |
| message | `string` | 举报附加消息 |

**返回值**: `void`

</API>
<API id="Online.Social.getReportingReasonsPlayer"><h3>Online.Social.getReportingReasonsPlayer(playerID)</h3>

**说明**: 获取可用于举报指定玩家的原因列表。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 玩家 ID |

**返回值**: `array`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/mp-staging/mp-player-options.js
// 获取举报原因列表
const reasons = Online.Social.getReportingReasonsPlayer(playerID);
```

</API>
<API id="Online.Social.activateOverlayToUserGeneratedContent"><h3>Online.Social.activateOverlayToUserGeneratedContent(subscriptionId)</h3>

**说明**: 激活 UGC（用户生成内容）覆盖层，通常用于查看模组详情。

| 参数名 | 类型 | 说明 |
|------|------|------|
| subscriptionId | `string` | 订阅 ID |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui-next/screens/pause-menu/pause-menu.js
// 打开模组的 UGC 覆盖层
Online.Social.activateOverlayToUserGeneratedContent(addon.subscriptionId);
```

</API>
<API id="Online.UserProfile.getUserProfileData"><h3>Online.UserProfile.getUserProfileData()</h3>

**说明**: 获取当前用户的完整档案数据，包含 `BadgeId`、显示名称、等级等信息。

**参数**: 无

**返回值**: `object`

**使用示例**:

```javascript
// 来源 modules/core/ui/profile-page/screen-profile-page.js
// 获取用户档案并读取徽章
const currentProfile = Online.UserProfile.getUserProfileData();
const { BadgeId } = currentProfile;
```

</API>
<API id="Online.UserProfile.getMyDisplayName"><h3>Online.UserProfile.getMyDisplayName()</h3>

**说明**: 获取当前用户的显示名称。

**参数**: 无

**返回值**: `string`

**使用示例**:

```javascript
// 来源 modules/core/ui/utilities/utilities-liveops.js
// 获取当前用户显示名
const twoKName = Online.UserProfile.getMyDisplayName();
```

</API>
<API id="Online.UserProfile.getOthersUserProfile"><h3>Online.UserProfile.getOthersUserProfile(friendId, platformUsername)</h3>

**说明**: 获取其他用户的档案数据。

| 参数名 | 类型 | 说明 |
|------|------|------|
| friendId | `string` | 好友 ID |
| platformUsername | `string` | 平台用户名 |

**返回值**: `object`

**使用示例**:

```javascript
// 来源 modules/core/ui/utilities/utilities-liveops.js
// 获取他人的用户档案
Online.UserProfile.getOthersUserProfile(friendId, platformUsername);
```

</API>
<API id="Online.UserProfile.updateUserProfile"><h3>Online.UserProfile.updateUserProfile(profile)</h3>

**说明**: 更新当前用户的档案数据。

| 参数名 | 类型 | 说明 |
|------|------|------|
| profile | `object` | 要更新的档案对象 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/utilities/utilities-liveops.js
// 更新用户档案
Online.UserProfile.updateUserProfile(cachedPlayerProfile);
```

</API>
<API id="Online.UserProfile.getPlatformUserProfilesData"><h3>Online.UserProfile.getPlatformUserProfilesData()</h3>

**说明**: 获取所有平台用户的档案数据列表，用于主账号选择界面。

**参数**: 无

**返回值**: `array`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/mp-primary-account-select/mp-primary-account-select.js
// 获取平台用户档案
const profiles = Online.UserProfile.getPlatformUserProfilesData();
```

</API>
<API id="Online.UserProfile.getRewardEntries"><h3>Online.UserProfile.getRewardEntries()</h3>

**说明**: 获取所有奖励条目的列表。

**参数**: 无

**返回值**: `array`

**使用示例**:

```javascript
// 来源 modules/core/ui/rewards-notifications/rewards-notification-manager.js
// 获取所有奖励条目
const allRewards = Online.UserProfile.getRewardEntries();
const newItems = Online.UserProfile.getNewlyUnlockedItems();
```

</API>
<API id="Online.UserProfile.getNewlyUnlockedItems"><h3>Online.UserProfile.getNewlyUnlockedItems()</h3>

**说明**: 获取新解锁的奖励物品列表。

**参数**: 无

**返回值**: `array`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/main-menu/main-menu.js
// 检查是否有新奖励显示
this.bShowRewardsScreen = Online.UserProfile.getNewlyUnlockedItems().length > 0;
```

</API>
<API id="Online.UserProfile.clearNewlyUnlockedItems"><h3>Online.UserProfile.clearNewlyUnlockedItems()</h3>

**说明**: 清除新解锁物品的标记，通常用于关闭奖励弹窗后。

**参数**: 无

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/rewards-notifications/rewards-notification-manager.js
// 清除新物品标记
Online.UserProfile.clearNewlyUnlockedItems();
```

</API>
<API id="Online.UserProfile.isRewardUnlocked"><h3>Online.UserProfile.isRewardUnlocked(name)</h3>

**说明**: 检查指定奖励是否已解锁。

| 参数名 | 类型 | 说明 |
|------|------|------|
| name | `string` | 奖励名称 |

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/create-panels/leader-select-model.js
// 检查纪念品是否已解锁
if (!Online.UserProfile.isRewardUnlocked(mementoName) || isLocked) {
  // 显示锁定状态
}
```

</API>
<API id="Online.UserProfile.getUnlockableRewardTypeIDString"><h3>Online.UserProfile.getUnlockableRewardTypeIDString(rewardType)</h3>

**说明**: 获取奖励类型的 ID 字符串，如 `"UNLOCKABLEREWARD_TYPE_BANNER"`。

| 参数名 | 类型 | 说明 |
|------|------|------|
| rewardType | `int` | 奖励类型枚举值 |

**返回值**: `string`

**使用示例**:

```javascript
// 来源 modules/core/ui/profile-page/screen-profile-page.js
// 判断是否为横幅类型奖励
if (Online.UserProfile.getUnlockableRewardTypeIDString(rewardType) == "UNLOCKABLEREWARD_TYPE_BANNER") {
  // 横幅特殊处理
}
```

</API>
<API id="Online.UserProfile.getRewardsEnabledConfiguration"><h3>Online.UserProfile.getRewardsEnabledConfiguration()</h3>

**说明**: 检查奖励功能是否在配置中启用。

**参数**: 无

**返回值**: `bool`

</API>
<API id="Online.UserProfile.getRewardsAutoPopupEnabledConfiguration"><h3>Online.UserProfile.getRewardsAutoPopupEnabledConfiguration()</h3>

**说明**: 检查奖励自动弹窗是否在配置中启用。

**参数**: 无

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/main-menu/main-menu.js
// 检查自动弹窗配置
if (Online.UserProfile.getRewardsAutoPopupEnabledConfiguration()) {
  // 显示奖励弹窗
}
```

</API>
<API id="Online.Metaprogression.supportsMemento"><h3>Online.Metaprogression.supportsMemento()</h3>

**说明**: 检查当前平台是否支持纪念品（Memento）系统。纪念品是元进程中的可装备物品。

**参数**: 无

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/main-menu/main-menu.js
// 根据纪念品支持状态显示不同 UI
if (Online.Metaprogression.supportsMemento()) {
  // 显示纪念品相关 UI
} else {
  // 隐藏纪念品相关 UI
}
```

</API>
<API id="Online.Metaprogression.getLegendPathsData"><h3>Online.Metaprogression.getLegendPathsData()</h3>

**说明**: 获取传说之路数据，包含各领袖的进度信息。

**参数**: 无

**返回值**: `array`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/create-panels/leader-select-model.js
// 获取传说之路数据
const legendsPaths = Online.Metaprogression.getLegendPathsData();
```

</API>
<API id="Online.Metaprogression.getMementosData"><h3>Online.Metaprogression.getMementosData()</h3>

**说明**: 获取所有纪念品数据。

**参数**: 无

**返回值**: `array`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/create-panels/memento-editor.js
// 获取纪念品数据
this.mementosData = Online.Metaprogression.getMementosData();
```

</API>
<API id="Online.Metaprogression.getMementoSlotData"><h3>Online.Metaprogression.getMementoSlotData()</h3>

**说明**: 获取纪念品槽位的元数据，包括各槽位的解锁状态。

**参数**: 无

**返回值**: `array`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/create-panels/leader-select-model.js
// 获取纪念品槽位元数据
const mementoSlotMetadata = Online.Metaprogression.getMementoSlotData();
```

</API>
<API id="Online.Metaprogression.getEquippedMementos"><h3>Online.Metaprogression.getEquippedMementos(playerID)</h3>

**说明**: 获取指定玩家当前装备的纪念品列表。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 玩家 ID |

**返回值**: `array`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/diplomacy-actions/panel-diplomacy-actions.js
// 获取指定玩家的已装备纪念品
const mementosData = Online.Metaprogression.getEquippedMementos(DiplomacyManager.selectedPlayerID);
```

</API>
<API id="Online.Metaprogression.getChallengeData"><h3>Online.Metaprogression.getChallengeData()</h3>

**说明**: 获取所有挑战数据。

**参数**: 无

**返回值**: `array`

**使用示例**:

```javascript
// 来源 modules/core/ui/profile-page/screen-profile-page.js
// 遍历挑战数据
Online.Metaprogression.getChallengeData().forEach((item) => {
  // 处理每个挑战
});
```

</API>
<API id="Online.Metaprogression.getChallengeCategoryData"><h3>Online.Metaprogression.getChallengeCategoryData(category)</h3>

**说明**: 获取指定挑战分类的详细数据。

| 参数名 | 类型 | 说明 |
|------|------|------|
| category | `string` | 挑战分类标识 |

**返回值**: `object`

**使用示例**:

```javascript
// 来源 modules/core/ui/profile-page/screen-profile-page.js
// 获取挑战分类数据
const categoryData = Online.Metaprogression.getChallengeCategoryData(item.challengeCategory);
```

</API>
<API id="Online.Metaprogression.isPlayingActiveEvent"><h3>Online.Metaprogression.isPlayingActiveEvent()</h3>

**说明**: 检查当前是否正在游玩活动事件游戏。活动事件游戏中教程和部分 UI 可能被禁用。

**参数**: 无

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/tutorial/tutorial-manager.js
// 活动事件中跳过教程
if (Online.Metaprogression.isPlayingActiveEvent()) {
  return; // 不显示教程
}
```

</API>
<API id="Online.Metaprogression.canResetPrimaryAccount"><h3>Online.Metaprogression.canResetPrimaryAccount()</h3>

**说明**: 检查是否可以重置主账号选择。

**参数**: 无

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/main-menu/main-menu.js
// 动态添加重置选项
...Online.Metaprogression.canResetPrimaryAccount() ? [resetPrimaryOption] : [],
```

</API>
<API id="Online.Metaprogression.resetPrimaryAccountSelection"><h3>Online.Metaprogression.resetPrimaryAccountSelection()</h3>

**说明**: 重置主账号选择，清除当前选择的主账号。

**参数**: 无

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/main-menu/main-menu.js
// 重置主账号
Online.Metaprogression.resetPrimaryAccountSelection();
```

</API>
<API id="Online.Metaprogression.setSeenMemento"><h3>Online.Metaprogression.setSeenMemento(mementoTypeId)</h3>

**说明**: 标记指定纪念品为已查看（用于"NEW"标记消除）。

| 参数名 | 类型 | 说明 |
|------|------|------|
| mementoTypeId | `string` | 纪念品类型 ID |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui-next/screens/create-game/memento-select-model.js
// 标记纪念品为已查看
Online.Metaprogression.setSeenMemento(memento.mementoTypeId);
```

</API>
<API id="Online.LiveEvent.isLiveEventActive"><h3>Online.LiveEvent.isLiveEventActive()</h3>

**说明**: 检查是否有活动事件当前活跃。通常与 `Network.isMetagamingAvailable()` 组合使用。

**参数**: 无

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/main-menu/main-menu.js
// 检查活动事件是否可用
const liveReqs = Online.LiveEvent.isLiveEventActive() && Network.isMetagamingAvailable();
```

</API>
<API id="Online.LiveEvent.getCurrentLiveEvent"><h3>Online.LiveEvent.getCurrentLiveEvent()</h3>

**说明**: 获取当前活动事件的名称。

**参数**: 无

**返回值**: `string`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/events/screen-events.js
// 获取当前活动事件名称
if (Online.LiveEvent.getCurrentLiveEvent() != "") {
  const currentEventPrefix = "LOC_" + Online.LiveEvent.getCurrentLiveEvent();
}
```

</API>
<API id="Online.LiveEvent.getActiveLiveEventKey"><h3>Online.LiveEvent.getActiveLiveEventKey()</h3>

**说明**: 获取当前活跃活动事件的关键键值。

**参数**: 无

**返回值**: `string`

</API>
<API id="Online.LiveEvent.getLiveEventGameFlag"><h3>Online.LiveEvent.getLiveEventGameFlag()</h3>

**说明**: 获取活动事件游戏标记，用于判断当前游戏是否为活动事件游戏。

**参数**: 无

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/tutorial/tutorial-support.js
// 活动事件中禁用教程
const isTutorialDisabled = Online.LiveEvent.getLiveEventGameFlag();
```

</API>
<API id="Online.LiveEvent.setLiveEventGameFlag"><h3>Online.LiveEvent.setLiveEventGameFlag()</h3>

**说明**: 设置活动事件游戏标记，标记当前游戏为活动事件游戏。

**参数**: 无

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/events/screen-events.js
// 标记为活动事件游戏
Online.LiveEvent.setLiveEventGameFlag();
```

</API>
<API id="Online.LiveEvent.clearLiveEventGameFlag"><h3>Online.LiveEvent.clearLiveEventGameFlag()</h3>

**说明**: 清除活动事件游戏标记。

**参数**: 无

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/main-menu/main-menu.js
// 清除活动事件标记
Online.LiveEvent.clearLiveEventGameFlag();
Online.LiveEvent.clearLiveEventConfigKeys();
```

</API>
<API id="Online.LiveEvent.getLiveEventConfigKeys"><h3>Online.LiveEvent.getLiveEventConfigKeys()</h3>

**说明**: 获取活动事件的配置键列表。

**参数**: 无

**返回值**: `array`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/live-event-logic/live-event-logic.js
// 获取活动事件配置键
const keys = Online.LiveEvent.getLiveEventConfigKeys();
```

</API>
<API id="Online.LiveEvent.clearLiveEventConfigKeys"><h3>Online.LiveEvent.clearLiveEventConfigKeys()</h3>

**说明**: 清除活动事件配置键。

**参数**: 无

**返回值**: `void`

</API>
<API id="Online.LiveEvent.getEndDateofCurrentLiveEvent"><h3>Online.LiveEvent.getEndDateofCurrentLiveEvent()</h3>

**说明**: 获取当前活动事件的结束日期。

**参数**: 无

**返回值**: `string`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/pause-event-rules/screen-pause-event-rules.js
// 获取活动结束日期
endDate: Network.supportsSSO() ? Online.LiveEvent.getEndDateofCurrentLiveEvent() : ""
```

</API>
<API id="Online.Promo.isPromoReady"><h3>Online.Promo.isPromoReady()</h3>

**说明**: 检查推广数据是否已加载就绪。

**参数**: 无

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/main-menu/main-menu-carousel-model.js
// 检查推广数据是否就绪
if (!Online.Promo.isPromoReady()) {
  return;
}
```

</API>
<API id="Online.Promo.hasFetchPromotionFailed"><h3>Online.Promo.hasFetchPromotionFailed()</h3>

**说明**: 检查推广数据获取是否失败。

**参数**: 无

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/main-menu/main-menu-carousel-model.js
// 获取失败时重新加载
if (Online.Promo.hasFetchPromotionFailed()) {
  Online.Promo.reloadPromos();
}
```

</API>
<API id="Online.Promo.reloadPromos"><h3>Online.Promo.reloadPromos()</h3>

**说明**: 重新加载推广数据。

**参数**: 无

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/options/options.js
// 重新加载推广
Online.Promo.reloadPromos();
```

</API>
<API id="Online.Promo.getPlacementUIData"><h3>Online.Promo.getPlacementUIData(placement)</h3>

**说明**: 获取指定位置的推广 UI 数据，用于主菜单轮播等。

| 参数名 | 类型 | 说明 |
|------|------|------|
| placement | `string` | 推广位置标识，如 `"mainmenu_primary"` |

**返回值**: `array`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/main-menu/main-menu-carousel-model.js
// 获取主菜单推广数据
const data = Online.Promo.getPlacementUIData("mainmenu_primary");
```

</API>
<API id="Online.Promo.getPromosForPlacement"><h3>Online.Promo.getPromosForPlacement(placement)</h3>

**说明**: 获取指定位置的推广列表。

| 参数名 | 类型 | 说明 |
|------|------|------|
| placement | `string` | 推广位置标识，如 `"2kstore"` |

**返回值**: `array`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/collection/collection-content.js
// 获取 2K 商店推广
Online.Promo.getPromosForPlacement("2kstore");
```

</API>
<API id="Online.Promo.shouldPromoDisplayOwnership"><h3>Online.Promo.shouldPromoDisplayOwnership()</h3>

**说明**: 检查是否应显示推广物品的拥有状态（已拥有/未拥有）。

**参数**: 无

**返回值**: `bool`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/collection/collection-content.js
// 根据配置决定是否显示拥有状态
owned: Online.Promo.shouldPromoDisplayOwnership() ? promo.owned : false
```

</API>
<API id="Online.Promo.interactWithPromo"><h3>Online.Promo.interactWithPromo(action, promoId, location, index)</h3>

**说明**: 与推广内容进行交互。

| 参数名 | 类型 | 说明 |
|------|------|------|
| action | `PromoAction` | 交互动作类型 |
| promoId | `string` | 推广 ID |
| location | `string` | 推广位置 |
| index | `int` | 推广索引 |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/main-menu/main-menu-carousel-model.js
// 与推广交互
Online.Promo.interactWithPromo(PromoAction.Interact, promoId, promoLocation, model.selectedCarouselIndex);
```

</API>
<API id="Online.Promo.telemetryPromoAction"><h3>Online.Promo.telemetryPromoAction(action, promoId, location, index, destination)</h3>

**说明**: 记录推广遥测数据。

| 参数名 | 类型 | 说明 |
|------|------|------|
| action | `PromoAction` | 遥测动作类型 |
| promoId | `string` | 推广 ID |
| location | `string` | 推广位置 |
| index | `int` | 推广索引 |
| destination | `string` | 交互目标 |

**返回值**: `void`

</API>
<API id="Online.Promo.checkPromoUIData"><h3>Online.Promo.checkPromoUIData(placement, promoId)</h3>

**说明**: 检查指定推广的 UI 数据。

| 参数名 | 类型 | 说明 |
|------|------|------|
| placement | `string` | 推广位置标识 |
| promoId | `string` | 推广 ID |

**返回值**: `void`

</API>
<API id="Online.Promo.viewPromo"><h3>Online.Promo.viewPromo(promoId)</h3>

**说明**: 查看推广详情。

| 参数名 | 类型 | 说明 |
|------|------|------|
| promoId | `string` | 推广 ID |

**返回值**: `void`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/main-menu/main-menu-carousel-model.js
// 查看推广详情
Online.Promo.viewPromo(model.selectedCarouselItem.promoId);
```

</API>
<API id="Online.Promo.getPromoCarouselAutoSlideTime"><h3>Online.Promo.getPromoCarouselAutoSlideTime()</h3>

**说明**: 获取推广轮播的自动滑动时间间隔（秒）。

**参数**: 无

**返回值**: `int`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/main-menu/main-menu-carousel-model.js
// 获取自动滑动时间
const secondsForAutomaticSlide = Online.Promo.getPromoCarouselAutoSlideTime();
```

</API>
<API id="Online.MOTD.getAllMOTDHeaders"><h3>Online.MOTD.getAllMOTDHeaders()</h3>

**说明**: 获取所有每日消息（Message of the Day）的标题列表。

**参数**: 无

**返回值**: `array`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/main-menu/main-menu.js
// 获取每日消息标题并随机显示一条
const titles = Online.MOTD.getAllMOTDHeaders();
const randIndex = Math.floor(Math.random() * titles.length);
const msg = Online.MOTD.getMOTD(titles[randIndex]);
```

</API>
<API id="Online.MOTD.getMOTD"><h3>Online.MOTD.getMOTD(title)</h3>

**说明**: 获取指定标题的每日消息内容。

| 参数名 | 类型 | 说明 |
|------|------|------|
| title | `string` | 消息标题 |

**返回值**: `string`

</API>
<API id="Online.Achievements.getGainedFoundationXP"><h3>Online.Achievements.getGainedFoundationXP()</h3>

**说明**: 获取已获得的基础（Foundation）经验值。

**参数**: 无

**返回值**: `int`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/legends-manager/legends-manager.js
// 获取基础经验值或领袖经验值
const gainedXP = item.legendPathLoc.includes("FOUNDATION")
  ? Online.Achievements.getGainedFoundationXP()
  : Online.Achievements.getGainedLeaderXP("CHALLENGE_CATEGORY_" + leaderName);
```

</API>
<API id="Online.Achievements.getGainedLeaderXP"><h3>Online.Achievements.getGainedLeaderXP(category)</h3>

**说明**: 获取指定领袖分类的已获得经验值。

| 参数名 | 类型 | 说明 |
|------|------|------|
| category | `string` | 挑战分类标识，如 `"CHALLENGE_CATEGORY_LEADER_NAME"` |

**返回值**: `int`

</API>
<API id="Online.Achievements.getCompletedFoundationChallengeData"><h3>Online.Achievements.getCompletedFoundationChallengeData()</h3>

**说明**: 获取已完成的基础挑战数据。

**参数**: 无

**返回值**: `array`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/legends-manager/legends-manager.js
// 获取已完成的基础挑战
const completedFoundationChallengeData = Online.Achievements.getCompletedFoundationChallengeData();
```

</API>
<API id="Online.Achievements.getCompletedLeaderChallengeData"><h3>Online.Achievements.getCompletedLeaderChallengeData(category)</h3>

**说明**: 获取指定领袖分类的已完成挑战数据。

| 参数名 | 类型 | 说明 |
|------|------|------|
| category | `string` | 挑战分类标识 |

**返回值**: `array`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/legends-manager/legends-manager.js
// 获取领袖挑战完成数据
const completedLeaderChallengeData = Online.Achievements.getCompletedLeaderChallengeData(
  "CHALLENGE_CATEGORY_" + leaderName
);
```

</API>
<API id="Online.Achievements.getUnlockedRewards"><h3>Online.Achievements.getUnlockedRewards()</h3>

**说明**: 获取已解锁的奖励列表。

**参数**: 无

**返回值**: `array`

**使用示例**:

```javascript
// 来源 modules/base-standard/ui/legends-manager/legends-manager.js
// 遍历已解锁奖励
Online.Achievements.getUnlockedRewards().forEach((challengereward) => {
  // 处理每个奖励
});
```

</API>
<API id="Online.Achievements.getAvaliableRewardsForLiveEvent"><h3>Online.Achievements.getAvaliableRewardsForLiveEvent(eventName)</h3>

**说明**: 获取指定活动事件可用的奖励列表。

| 参数名 | 类型 | 说明 |
|------|------|------|
| eventName | `string` | 活动事件名称 |

**返回值**: `array`

**使用示例**:

```javascript
// 来源 modules/core/ui/shell/events/screen-events.js
// 获取活动事件奖励
const rewardData = Online.Achievements.getAvaliableRewardsForLiveEvent(
  Online.LiveEvent.getCurrentLiveEvent()
);
```

</API>