---
name: api-extractor
description: Civ7 游戏模块 API 提取与编译工作流。当需要从源码文件（js.map, ltp）提取原始 AST 接口并编译为结构化 civ7_api.json时使用。适用于在源码改变时重建或同步 API 字典。
---

# Civ7 API 提取与精筛编译工作流指南

本技能指导 AI 代理如何自动执行 Civ7 游戏模块 API 的提取、分类、过滤和编译流程。

## 工作流决策树

```
[开始] -> 运行粗筛模式 (--draft) 
        -> 运行过滤器合并脚本 (init_filter.js)
        -> 检查 api_filter.json 中的 "unknown"
           ├── 为空 -> 运行精筛编译 (--compile) -> [编译成功]
           └── 非空 -> 研判并清空未知分类 -> 运行精筛编译 -> [编译成功]
```

---

## 核心执行步骤

在项目根目录下，顺序执行以下命令来完成完整的 API 提取和编译流程：

### 步骤 1：原始接口粗筛 (Draft Mode)
运行 AST 分析器粗筛模式，抓取所有潜在的接口、宿主接收器及类结构：
```bash
node scripts/extract_civ7_api.js --draft
```
* **输出文件**：生成粗筛全量接口 [raw_completions.json](../../../docs/data/raw_completions.json) 以及待分类对象名称表 [raw_names.json](../../../docs/data/raw_names.json)。

### 步骤 2：过滤器增量合并 (Filter Merge)
运行过滤器增量合并脚本：
```bash
node scripts/init_filter.js
```
* **输出文件**：增量更新 [api_filter.json](../../../docs/data/api_filter.json)，将新发现的对象与已有分类合并，未识别的对象放入 `unknown` 隔离区。

### 步骤 3：解决未分类对象 (Resolve Unknowns)
打开 [api_filter.json](../../../docs/data/api_filter.json) 并检查 `"unknown"` 数组。如果该数组非空，代理（你）必须进行研判，将里面的对象剪切分配到以下五个大类中，确保 `"unknown"` 数组最终为空：

1. **`globals`**（顶层全局管理器/单例白名单）：精筛时直接输出在最终 API 顶层 `globals` 下的对象（如 `Players`、`Units`）。
2. **`instances`**（宿主实例关系映射）：定义局部宿主变量（如 `player`）与其全局管理器获取路径（如 `Players.get(playerId)`）的字典。
3. **`enums`**（顶层常量与枚举白名单）：成员将被编译并合并输出在顶层 `enums` 下的对象（如 `YieldTypes`）。
4. **`ui_components`**（UI组件黑名单）：需要丢弃的 UI 视图、面板或数据模型（如 `LeaderSelectModel`）。
5. **`ignored`**（引擎底层/辅助工具黑名单）：需要丢弃的辅助工具、无用引擎对象或第三方依赖库（如 `FireTuner`）。
6. **`unknown`**（暂存隔离区）：必须为空 `[]` 才能通过编译。

### 步骤 4：终极精筛编译 (Compile Mode)
运行编译器精筛编译模式：
```bash
node scripts/extract_civ7_api.js --compile
```
* **行为机制**：如果 `unknown` 数组非空，精筛编译将立即熔断报错。若正常通过，脚本将自动过滤 UI/忽略噪声，动态推导并挂载全局管理器与实例的级联绑定关系，剔除数组通用方法干扰，并输出格式化数据。
* **输出文件**：生成最终的层级化 API 字典 [civ7_api.json](../../../docs/data/civ7_api.json)。

---

## 编译结果验证规范

编译生成 [civ7_api.json](../../../docs/data/civ7_api.json) 后，应按以下指标验证正确性：
1. `instances` 字典下包含完整的 7 个实例接口：`player`、`unit`、`city`、`district`、`constructible`、`army`、`plot`。
2. 全局管理器 `Armies`、`Districts`、`Constructibles` 的 `instances` 属性下自动注入了正确的双向级联获取路径。
3. 实例对象（如 `unit`）下的子系统级联（如 `unit.Combat`、`unit.Health`）完整保留在 `sub_objects` 节点中。
