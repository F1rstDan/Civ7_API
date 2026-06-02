---
title: DiplomacyDeals
---

# DiplomacyDeals

外交交易管理 API。

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `sendWorkingDeal` | dealID | `void` | 发送当前交易 |
| `getWorkingDealItem` | dealID, index | `object` | 获取交易项目 |
| `addItemToWorkingDeal` | dealID, item | `void` | 添加交易项目 |
| `clearWorkingDeal` | dealID | `void` | 清除当前交易 |
| `getWorkingDeal` | dealID | `object` | 获取当前交易 |
| `getPossibleWorkingDealItems` | dealID | `array` | 获取可选交易项目 |
| `removeItemFromWorkingDeal` | dealID, index | `void` | 移除交易项目 |
| `getDealIds` | playerID | `int[]` | 获取交易 ID 列表 |
| `hasPendingDeal` | playerID | `bool` | 是否有待处理交易 |
