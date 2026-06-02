# Civ7 API 文档更新流程

> 本文档指导「当文明7官方发布更新后，如何同步更新 API 文档」。执行更新前请先阅读 PLAN.md。

---

## 1. 触发条件

当以下任一情况发生时，应启动更新流程：
- 文明7 发布了新版本补丁
- 新的 DLC / 资料片模块被添加到 modules/ 目录
- 用户发现已有 API 文档有误，需要修正

---

## 2. 更新前准备

### 2.1 确认源文件变动

源文件位于：D:\Games Design\Civ7_mod\.官方变动\modules\

**如果源文件已通过 git 管理**：

`powershell
# 查看自上次更新以来哪些文件发生了变动
cd "D:\Games Design\Civ7_mod\.官方变动"
git diff --name-status HEAD~1 -- modules/

# 查看具体某类文件的变动
git diff --stat HEAD~1 -- modules/core/ui/utilities/

# 查看某个具体文件的变更内容
git diff HEAD~1 -- modules/base-standard/maps/map-utilities.js
`

**如果源文件未通过 git 管理**：
1. 让用户手动说明哪些模块/目录有变动
2. 或者对比文件修改时间来筛选近期变动的文件

`powershell
# 列出最近 30 天内修改过的 JS 文件
Get-ChildItem -Path "D:\Games Design\Civ7_mod\.官方变动\modules" -Recurse -File -Include "*.js" |
  Where-Object { $_.LastWriteTime -gt (Get-Date).AddDays(-30) } |
  Select-Object FullName, LastWriteTime |
  Sort-Object LastWriteTime -Descending
`

### 2.2 确定影响范围

根据变动文件路径，判断影响哪些 API 大类：

| 变动路径 | 影响的 API 文档 |
|---------|---------------|
| core/ui/utilities/*.js | utilities.md |
| core/ui/components/*.js | ui-components.md |
| core/ui/input/*.js | engine.md (事件), utilities.md |
| ase-standard/maps/*.js | gameplay-map.md |
| ase-standard/scripts/*.js | gameplay-map.md, 游戏逻辑相关 |
| ase-standard/ui/**/*.js | 各功能模块文档 |
| ge-*/scripts/*.js | 该时代专属 API |
| core/ui/context-manager/*.js | component.md |

---

## 3. 更新执行流程

### 步骤 1：差异分析

对每个变动文件，执行以下操作：

1. **新增的函数/方法**：搜索 unction , =>, .prototype. 等关键词
2. **删除的函数/方法**：对比旧版本确认是否真的被移除
3. **修改的函数签名**：参数数量或调用方式是否变化
4. **新增的事件**：搜索 ngine.on(" 新出现的事件名
5. **新增的全局 API 调用**：搜索 GameplayMap., GameInfo. 等新方法

`powershell
# 示例：搜索一个文件中所有 GameplayMap 的方法调用
Select-String -Path "path\to\file.js" -Pattern "GameplayMap\.(\w+)" -AllMatches |
  ForEach-Object { $_.Matches } | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
`

### 步骤 2：更新 JSON 数据

根据差异分析结果，更新对应的 docs/data/*.json 文件：

- **新增 API**：按 PLAN.md 第 4 节的 Schema 添加新条目，status 设为 "inferred"
- **删除 API**：将对应条目的 status 改为 "deprecated"，不要直接删除（保留历史记录）
- **修改 API**：更新参数/返回值/描述，status 改为 "inferred"（需要重新验证）
- **新增模块**：创建新的 JSON 文件和对应的 Markdown 页面

### 步骤 3：更新 Markdown 页面

同步更新 docs/api/*.md 文件，确保新增的 API 在页面上可见。

### 步骤 4：验证

1. 启动 VitePress 开发服务器：
px vitepress dev docs
2. 检查新增/修改的 API 在页面上正确显示
3. 检查搜索功能能找到新增的 API
4. 检查侧边栏导航没有断链

### 步骤 5：记录更新日志

在项目根目录维护一个 CHANGELOG.md：

`markdown
## [日期] - 游戏版本 X.X.X
- 新增：XX 个 API 条目
- 更新：XX 个 API 条目
- 弃用：XX 个 API 条目
- 新增模块：XX
- 来源变动文件：XX 个
`

---

## 4. 更新策略选择

### 策略 A：全量扫描（大版本更新）

适用于：DLC 发布、大版本补丁（如 1.1 → 1.2）

1. 重新扫描整个 modules/ 目录
2. 用 g 搜索所有全局 API 的新用法
3. 对比旧 JSON 数据，找出新增/变更
4. 更新所有受影响的文档页面

### 策略 B：定向更新（小补丁）

适用于：热修复、小版本补丁

1. 只关注 git diff 或文件修改时间显示变动的文件
2. 只更新受影响的 JSON 和 Markdown
3. 不做全量扫描

### 策略 C：新增模块（DLC）

适用于：新 DLC 添加了新模块目录

1. 扫描新模块的目录结构
2. 提取新模块中的 API
3. 创建新的 JSON 文件和 Markdown 页面
4. 更新侧边栏导航

---

## 5. 常见问题处理

### Q: 发现已有文档的参数描述有误怎么办？
直接修正 JSON 中的 description 字段，并将 status 改为 "verified"（如果已确认）或 "inferred"（如果只是更好的推断）。

### Q: 某个 API 在新版本中行为变了但签名没变怎么办？
在 JSON 条目的 
otes 字段中记录行为变化，附上版本号。

`json
{
  "notes": "v1.2 起返回值改为包含方向信息的新对象结构"
}
`

### Q: 新增了一个全新的全局对象怎么办？
1. 在 docs/data/ 下创建新的 JSON 文件
2. 在 docs/api/ 下创建新的 Markdown 页面
3. 更新 docs/.vitepress/config.js 的侧边栏配置
4. 更新 PLAN.md 第 2.3 节的全局 API 表格

### Q: 源文件中的代码难以理解怎么办？
在 JSON 条目中设置 "status": "unverified"，并在 
otes 中说明不确定的地方。后续可通过游戏内测试或查阅社区资料来确认。

---

## 6. 更新检查清单

每次更新完成后，确认以下事项：

- [ ] 变动文件已全部分析
- [ ] 新增 API 已录入 JSON（status = inferred）
- [ ] 已删除 API 已标记 deprecated
- [ ] 已修改 API 已更新参数/描述
- [ ] Markdown 页面已同步更新
- [ ] VitePress 站点可正常启动
- [ ] 搜索功能正常
- [ ] CHANGELOG.md 已更新
