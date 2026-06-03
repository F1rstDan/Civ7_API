# API 弹窗功能 — 完整实施方案

> 本文档是自包含的执行指南，交给任何 AI 即可直接实施。

---

## 一、功能目标

在现有的 VitePress API 文档中，为每个 API 方法添加**点击弹窗**功能：

1. 文档页面中的方法名（如表格中的 `Players.get`）显示为**可点击的高亮链接**
2. 点击后弹出一个**居中弹窗（Modal）**，包含：详细说明、参数表格、返回值、使用示例（带代码高亮）、来源标注
3. 支持 ESC 键关闭、点击遮罩关闭
4. **所有数据都写在 `.md` 文件中**，不使用外部 JSON 文件或 Markdown-it 插件
5. 语法尽量精简：触发器用 `<API>方法名</API>`，内容块用 `<API id="..." title="...">`

---

## 二、技术原理

### 2.1 整体架构

```
┌──────────────────────────────────────────────────────┐
│  docs/api/*.md                                        │
│                                                       │
│  ┌─────────────────────────────┐                     │
│  │ 表格中：                     │                     │
│  │ | <API>Players.get</API>            │ ← 触发器（可点击）   │
│  │ | playerID | ...            │   插槽文本 = id      │
│  └─────────────────────────────┘                     │
│                                                       │
│  ┌─────────────────────────────┐                     │
│  │ <API id="Players.get"               │ ← 内容块（隐藏）    │
│  │   title="Players.get(id)">  │   需要 id + title   │
│  │                             │                     │
│  │   说明、参数、示例 ...       │                     │
│  │   （Markdown 自由书写）      │                     │
│  │                             │                     │
│  </API>                        │                     │
│  └─────────────────────────────┘                     │
└──────────────────────────────────────────────────────┘
          │ 触发器点击                    │ 内容注册
          ▼                               ▼
┌──────────────────────────────────────────────────────┐
│  modalStore (共享响应式状态)                           │
│  contentMap: { "Players.get" -> { title, html } }            │
└──────────────────────────────────────────────────────┘
          │ show()
          ▼
┌──────────────────────────────────────────────────────┐
│  ModalOverlay.vue (通过 Layout.vue 自动挂载)          │
│  ┌──────────────────────────────────────────┐        │
│  │  半透明遮罩                               │        │
│  │  ┌──────────────────────────────────┐    │        │
│  │  │  标题栏 + 关闭按钮                │    │        │
│  │  │  ─────────────────────────────── │    │        │
│  │  │  内容（v-html，含代码高亮）        │    │        │
│  │  └──────────────────────────────────┘    │        │
│  └──────────────────────────────────────────┘        │
└──────────────────────────────────────────────────────┘
```

### 2.2 组件角色分工

| 组件 | 角色 | 行为 |
|------|------|------|
| `API`（即 ApiModal.vue） | 万能组件 | 有 `title` 属性 -> **内容块**（隐藏，向 store 注册 HTML）<br>无 `title` 属性 -> **触发器**（可点击链接，插槽文本即 id） |
| `ModalOverlay` | 弹窗渲染器 | 监听 store，`visible=true` 时用 Teleport 渲染弹窗 |
| `modalStore` | 共享状态 | 响应式对象，存储已注册内容块和弹窗状态 |

### 2.3 数据流

```
页面加载
  -> VitePress 解析 .md，Vue 组件被编译
  -> 内容块 <API> 的 onMounted 触发
  -> 将插槽 innerHTML 注册到 modalStore.contentMap

用户点击触发器
  -> <API> 读取插槽文本作为 id，调用 modalStore.show(id)
  -> store 查找 contentMap[id]
  -> visible=true，ModalOverlay 渲染弹窗

用户关闭弹窗
  -> ESC / 点击遮罩 / 点击关闭按钮
  -> modalStore.hide()
```

### 2.4 关键技术细节

1. **Markdown 插槽**：VitePress 先将 .md 渲染为 HTML（含代码高亮），再作为 Vue 插槽传入。弹窗中的代码块**自动获得 Shiki 高亮**。
2. **隐藏内容块**：`display:none` 渲染在 DOM 中，`onMounted` 时通过 `ref.innerHTML` 捕获 HTML 存入 store。
3. **插槽文本作为 id**：触发器模式下，组件通过 `ref.value.textContent` 读取 id，无需手动传 `id` 属性。**不要在 `<API>` 内部加反引号**，否则 textContent 包含反引号字符导致 id 不匹配。推荐直接用 `<API>Players.get</API>`。
4. **SSR 兼容**：ModalOverlay 用 `<ClientOnly>` 包裹 Teleport。

---

## 三、文件清单

### 新建 5 个文件

| 文件路径 | 用途 |
|----------|------|
| `docs/.vitepress/theme/store.js` | 共享响应式状态 |
| `docs/.vitepress/theme/components/ApiModal.vue` | 触发器 + 内容块（注册为 `<API>`） |
| `docs/.vitepress/theme/components/ModalOverlay.vue` | 弹窗渲染 |
| `docs/.vitepress/theme/components/Layout.vue` | 自动挂载 ModalOverlay |
| `docs/.vitepress/theme/index.js` | 主题入口 |

### 改造 45 个 Markdown 文件

为每个需要弹窗的 API 方法添加 `<API>` 标签。不需要修改 `config.js`。

---

## 四、组件架构

### 4.1 组件树

```
index.js (主题入口)
  └─ Layout.vue (包装默认 Layout，slot 插入 ModalOverlay)
       ├─ ModalOverlay.vue (Teleport to="body"，监听 modalStore)
       └─ [页面内容中的 <API> 组件]
            ├─ ApiModal.vue (有 title → 内容块，隐藏)
            └─ ApiModal.vue (无 title → 触发器，可点击)
```

### 4.2 数据流

```
store.js (modalStore: reactive)
  ├─ contentMap: { "Players.get" → { title, html } }  ← ApiModal.onMounted 注册
  ├─ visible: bool                                       ← 触发器 onClick 设为 true
  ├─ show(id) → ModalOverlay 渲染弹窗
  └─ hide()  → ESC / 遮罩 / 关闭按钮
```

### 4.3 文件列表

| 文件 | 职责 |
|------|------|
| `theme/store.js` | 响应式状态：contentMap、visible、show/hide/register |
| `theme/components/ApiModal.vue` | 双模式组件：有 `title` 属性=隐藏内容块注册；无 `title`=可点击触发器 |
| `theme/components/ModalOverlay.vue` | 弹窗 UI：Teleport to body、ESC 关闭、遮罩关闭、v-html 内容 |
| `theme/components/Layout.vue` | 包装默认 Layout，slot `#layout-bottom` 中挂载 ModalOverlay |
| `theme/index.js` | 主题入口：注册 `<API>` 组件，设置 Layout |

### 4.4 ApiModal.vue 核心逻辑

**模式判定**：
- 有 `title` 属性 + 插槽内容 → 内容块模式：`<div style="display:none"><slot /></div>`
- 否则 → 触发器模式：`<span class="api-trigger" @click=...><slot /></span>`

**id 来源**（优先级）：
1. `props.id`（自闭合 `<API id="..."/>` 或包裹 `<API id="...">...</API>`）
2. `slotRef.value.textContent.trim()`（从插槽文本读取，推荐不加反引号）
3. 防御性去除首尾反引号：`.replace(/^\x60+|\x60+$/g, "")`

**关键实现细节**：
- 内容块在 `onMounted` 中通过 `ref.innerHTML` 捕获已编译的 HTML（含 Shiki 代码高亮）存入 store
- 触发器点击时用 `getTriggerId()` 获取 id，调用 `modalStore.show(id)`
- ModalOverlay 内部用 `<ClientOnly>` + `<Teleport to="body">` 渲染弹窗，SSR 安全

> 完整代码见项目仓库 `docs/.vitepress/theme/` 目录。此处只描述架构和关键逻辑。
## 五、Markdown 改造指南

### 5.1 触发器（表格中）

**推荐写法**：插槽文本即 id，最简语法

```markdown
| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| <API>Players.get</API> | playerID | `PlayerLibrary` | 根据 ID 获取玩家对象 |
| <API>Players.getAlive</API> | — | `PlayerLibrary[]` | 获取所有存活玩家 |
```

> **推荐不加反引号**。`<API>Players.get</API>` 的 textContent 就是 `Players.get`，与 id 直接匹配。如果在 `<API>` 内部加反引号（如 `` <API>`Players.get`</API> ``），textContent 会包含反引号字符，导致 id 不匹配。推荐直接用 `<API>Players.get</API>`。


### 5.2 内容块（页面底部）

````markdown
<API id="Players.get" title="Players.get(playerID)">

**说明**: 根据玩家 ID 获取 PlayerLibrary 对象。ID 无效时返回 `undefined`。

| 参数名 | 类型 | 说明 |
|------|------|------|
| playerID | `int` | 玩家 ID |

**返回值**: `PlayerLibrary` | `undefined`

**使用示例**:

```javascript
// 获取玩家对象并输出其领袖名称。
let player = Players.get(id);
if (player) {
  let leaderDef = GameInfo.Leaders.lookup(player.leaderType);
  console.log(Locale.compose(leaderDef.Name));
}
```

**来源**: Players.ltp - PopulateList

</API>
````

### 5.3 id 匹配规则

触发器的 id = 插槽纯文本。统一使用 `对象.方法名` 格式以避免重名。

| 触发器 | 内容块 id |
|--------|-----------|
| `<API>Players.get</API>` | `id="Players.get"` |
| `<API>GameplayMap.isWater</API>` | `id="GameplayMap.isWater"` |
| `<API>city.BuildQueue.addProgress</API>` | `id="city.BuildQueue.addProgress"` |

### 5.4 批量改造步骤

1. **表格**：将 `` `方法名` `` 替换为 `<API>`方法名`</API>`
2. **底部**：添加 `<API id="方法名" title="...">` 内容块
3. **内容来源**：优先搬现有"详细说明"段落，其次从 `.ltp`、`.js` 提取官方示例

---

## 六、执行步骤

| 步骤 | 操作 | 验证 |
|------|------|------|
| 1 | 创建 `docs/.vitepress/theme/components/` 目录 | 目录存在 |
| 2 | 创建 5 个文件（第四节代码） | 无语法错误 |
| 3 | `npx vitepress dev docs` | 站点正常，无控制台错误 |
| 4 | 改造 `players.md` 作为 Demo | 点击方法名弹出弹窗 |
| 5 | 逐步改造其余 .md 文件 | 所有 API 可点击 |
| 6 | `npx vitepress build docs` | 构建无错误 |

---

## 七、验证清单

| 验证项 | 方法 | 预期 |
|--------|------|------|
| 站点加载 | 浏览器打开 localhost:5173 | 正常，无错误 |
| 触发器渲染 | 检查表格方法名 | 蓝色虚线下划线链接 |
| 弹窗弹出 | 点击方法名 | 居中弹窗，含详情 |
| 弹窗内容 | 查看弹窗 | 说明、参数表、高亮代码 |
| ESC 关闭 | 按 ESC | 弹窗关闭 |
| 遮罩关闭 | 点击弹窗外 | 弹窗关闭 |
| 关闭按钮 | 点击 x | 弹窗关闭 |
| 暗色模式 | 切换主题 | 样式适配 |
| 移动端 | 缩小窗口 | 自适应 |
| 构建 | `npx vitepress build docs` | 无错误 |

---

## 附录：常见问题

**Q: 同 id 多个内容块？**
后注册覆盖先注册。确保每个 id 只有一个内容块。

**Q: 内容块放哪？**
建议页面底部。`display:none` 不影响布局。

**Q: 弹窗中能嵌入 Vue 组件吗？**
不能。`v-html` 不编译 Vue 模板。如需交互组件，需改用动态 slot 方案。
