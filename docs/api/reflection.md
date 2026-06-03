---
title: Reflection 调试反射
---

# Reflection 调试反射

ReflectionArchives 是文明7的调试反射系统，允许检查游戏对象的内部状态。

> 来源：Reflection.ltp

## ReflectionArchives 全局对象

```javascript
// 来源 Reflection.ltp
// 获取根级档案
ReflectionArchives.getGame();           // 游戏档案
ReflectionArchives.getMap();            // 地图档案
ReflectionArchives.getPlayers();        // 玩家档案

// 按组件 ID 获取档案
ReflectionArchives.getByComponentID(componentId);

// 设置详细值显示
ReflectionArchives.showVerboseValues;
ReflectionArchives.setVerboseValues(true);
```

## 档案对象 API

```javascript
// 来源 Reflection.ltp
let archive = ReflectionArchives.getByComponentID(cityId);

// 子档案
let children = archive.getChildren();   // 获取子档案数组
// 每个 child: {typeStr, id: {id}}
let child = archive.getChild(index);    // 获取指定子档案
let parent = archive.getParent();       // 获取父档案

// 成员信息
archive.memberCount;                     // 成员数量
let member = archive.getMember(index);   // 获取成员
// member.id, member.name

// 成员值
archive.getMemberValueString(memberId);  // 获取成员值字符串
archive.getLastAnalysisString();         // 获取最后分析字符串

// 哈希
archive.getMembersHash();               // 获取成员哈希
archive.getMemberValueHash(memberId);   // 获取成员值哈希

// 修改（调试用）
archive.setMemberToDesync(memberId);
archive.scrambleMemberValue(memberId);
archive.setMemberToLogHash(memberId, true);
```

## Network 调试

```javascript
// 来源 Reflection.ltp
Network.testHashing(0);     // 测试哈希
Network.testHashing(1);     // 测试哈希（模式1）
```

## UI 调试

```javascript
// 来源 Reflection.ltp
UI.setClipboardText(str);   // 复制文本到剪贴板
```

---

*来源：Reflection.ltp*