---
title: Engine API
---

# Engine

引擎核心对象，主要用于事件系统和数据绑定。

```javascript
engine.whenReady.then(() => {
  console.log('引擎就绪');
});

engine.on('CityAddedToMap', (data) => {
  console.log('城市添加到地图', data);
}, this);

engine.off('CityAddedToMap', this.cityAddedToMapListener);
```

## 方法列表（共 14 个）

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `on` | eventName, callback, context | `void` | 注册事件监听器 |
| `off` | eventName, callback | `void` | 移除事件监听器 |
| `trigger` | eventName, ...args | `void` | 手动触发事件 |
| `call` | method, ...args | `any` | 调用引擎方法 |
| `whenReady` | — | `Promise` | 引擎就绪的 Promise |
| `createJSModel` | name, model | `void` | 创建 JS 数据绑定模型 |
| `synchronizeModels` | — | `void` | 同步数据绑定模型 |
| `updateWholeModel` | name, model | `void` | 更新整个模型 |
| `reloadLocalization` | — | `void` | 重新加载本地化文本 |
| `BindingsReady` | — | `bool` | 数据绑定是否就绪 |
| `AddOnHandler` | event, handler | `void` | 添加事件处理器（别名） |
| `RemoveOnHandler` | event, handler | `void` | 移除事件处理器（别名） |
| `addDataBindEventListner` | event, listener | `void` | 添加数据绑定事件监听 |
| `registerBindingAttribute` | name, handler | `void` | 注册自定义绑定属性 |

## 事件系统

`engine.on()` 是 Mod 开发中最常用的 API。所有事件详见 [事件列表](/api/events)。
