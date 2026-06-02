---
title: Diplomacy
---

# Diplomacy

外交系统 API。

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `hasMet` | player1, player2 | `bool` | 两个玩家是否已见面 |
| `isAtWarWith` | player1, player2 | `bool` | 是否处于战争状态 |
| `canMakePeaceWith` | player1, player2 | `bool` | 是否可以和谈 |
| `getWarData` | player1, player2 | `object` | 获取战争数据 |
| `getCompletionData` | eventID | `object` | 获取事件完成数据 |
| `getDiplomaticEventData` | eventID | `object` | 获取外交事件数据 |
| `getPlayerEvents` | playerID | `array` | 获取玩家的外交事件 |
| `getJointEvents` | player1, player2 | `array` | 获取联合事件 |
| `getSupportingPlayersWithBonusEnvoys` | eventID | `array` | 获取支持方玩家 |
| `getOpposingPlayersWithBonusEnvoys` | eventID | `array` | 获取反对方玩家 |
| `getInfluenceForNextSupport` | eventID | `int` | 获取下一次支持所需影响力 |
| `modifyByGameSpeed` | value | `int` | 按游戏速度修改数值 |
| `getAgendaNames` | playerID | `array` | 获取议程名称 |
| `isProjectCanceled` | projectID | `bool` | 项目是否已取消 |
| `getProjectDataForUI` | projectID | `object` | 获取项目 UI 数据 |
