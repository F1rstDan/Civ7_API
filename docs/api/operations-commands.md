---
title: Operations & Commands 操作命令
---

# Operations & Commands 操作命令

游戏操作和命令 API。用于查询和执行城市、单位、玩家的操作。

## CityOperations

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `canStart` | cityID, operationID | `bool` | 城市是否可以开始操作 |
| `sendRequest` | cityID, operationID | `void` | 发送城市操作请求 |
| `canStartQuery` | cityID, operationID | `bool` | 查询是否可以开始操作 |

## CityCommands

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `canStart` | cityID, commandID | `bool` | 城市是否可以执行命令 |
| `sendRequest` | cityID, commandID | `void` | 发送城市命令请求 |
| `canStartQuery` | cityID, commandID | `bool` | 查询是否可以执行命令 |

## UnitOperations

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `canStart` | unitID, operationID | `bool` | 单位是否可以开始操作 |
| `sendRequest` | unitID, operationID | `void` | 发送单位操作请求 |
| `forEach` | callback | `void` | 遍历所有操作 |
| `canStartAny` | unitID | `bool` | 单位是否可以开始任何操作 |
| `lookup` | type | `object` | 根据类型查询操作 |

## UnitCommands

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `canStart` | unitID, commandID | `bool` | 单位是否可以执行命令 |
| `sendRequest` | unitID, commandID | `void` | 发送单位命令请求 |
| `lookup` | type | `object` | 根据类型查询命令 |
| `forEach` | callback | `void` | 遍历所有命令 |

## PlayerOperations

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `sendRequest` | playerID, operationID | `void` | 发送玩家操作请求 |
| `canStart` | playerID, operationID | `bool` | 玩家是否可以开始操作 |
