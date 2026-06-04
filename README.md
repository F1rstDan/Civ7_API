# Civ7 Mod API 文档站

文明7 Mod 开发 API 参考文档。从官方游戏文件中自动提取所有可用的全局 API、方法、事件和数据表。

**在线文档，直接体验：[https://f1rstdan.github.io/Civ7_API/](https://f1rstdan.github.io/Civ7_API/)**

## 离线文档如何自行部署

### 方式一：双击启动（推荐小白使用）

双击项目根目录下的 **`!启动文明7文档站.bat`**，等待几秒后浏览器会自动打开。

### 方式二：命令行启动

```bash
# 首次使用需要安装依赖
npm install

# 启动开发服务器（支持热更新）
npm run dev

# 或者构建静态文件后预览
npm run build
npx vitepress preview docs
```

启动后访问 http://localhost:5173

## 项目结构

```
Civ7_API/
├── docs/                        # 文档源文件
│   ├── .vitepress/config.js     # VitePress 配置（侧边栏、搜索）
│   ├── index.md                 # 首页
│   ├── api/                     # API 文档页面（共 45 个）
│   │   ├── game.md              # Game 对象
│   │   └── ...                  # 更多API页面
│   └── data/                    # JSON 数据文件
│       ├── constants.json       # 常量与枚举数据
│       └── ...                  # 其他 JSON 数据
├── PLAN.md                      # 项目建设计划
├── UPDATE-WORKFLOW.md           # 游戏更新后的文档同步流程
├── GOAL-PROMPT.md               # AI 长期任务提示词
├── !启动文明7文档站.bat          # 双击启动脚本
└── package.json
```

## 更新文档

当文明7发布新版本后，按 `UPDATE-WORKFLOW.md` 中的流程更新：

1. 检查源文件变动（git diff 或文件修改时间）
2. 提取新增/变更的 API
3. 更新文档页面
4. 重新构建站点

详细流程见 [UPDATE-WORKFLOW.md](./UPDATE-WORKFLOW.md)

## 技术栈

- **VitePress** - 静态站点生成器
- **本地搜索** - 无需外部服务
- **Markdown** - 文档格式

## 源文件位置

官方游戏文件位于：`D:\Games Design\Civ7_mod\.官方变动\modules\`

TunerPanels 调试面板位于：`D:\Games Design\Civ7_mod\.官方变动\TunerPanels\`

## 许可

本文档仅供个人 Mod 开发参考使用。
