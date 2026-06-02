---
title: Automation
---

# Automation

自动化测试框架 API。用于基准测试和自动化流程。

```javascript
Automation.log("Test started");
const param = Automation.getParameter("mapSize");
```

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `log` | message | `void` | 输出自动化日志 |
| `getParameter` | name | `any` | 获取自动化参数 |
| `setLocalParameter` | name, value | `void` | 设置本地参数 |
| `getLocalParameter` | name | `any` | 获取本地参数 |
| `setParameter` | name, value | `void` | 设置参数 |
| `setScriptHasLoaded` | — | `void` | 标记脚本已加载 |
| `sendTestComplete` | name | `void` | 发送测试完成信号 |
| `getLastGeneratedSaveName` | — | `string` | 获取最后生成的存档名 |
| `pause` | — | `void` | 暂停自动化 |
| `start` | — | `void` | 启动自动化 |
| `stop` | — | `void` | 停止自动化 |
| `isActive` | — | `bool` | 自动化是否活跃 |
| `logDivider` | — | `void` | 输出分隔线 |
