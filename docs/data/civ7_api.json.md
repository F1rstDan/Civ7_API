# Civ7 API 字典数据结构 (civ7_api.json) 使用手册

本文档用于详细解释 [civ7_api.json](civ7_api.json) 字典文件的内部节点结构、各字段的含义及其在 Civ7 模块开发中的实际应用作用。

[civ7_api.json](civ7_api.json) 是由 Civ7 API 提取器通过 AST 语法分析并经过严格的黑名单过滤、实例映射推导后编译生成的层级化元数据字典，为 IDE 自动补全、API 文档生成以及语义校验提供统一的基础数据源。

---

## 一、 顶层节点概述

该 JSON 文件包含以下四个顶层基础节点：
1. **`version`**：数值类型，代表当前字典文件的数据结构版本（例如 `3.2`）。
2. **`globals`**：对象类型，容纳所有顶层全局管理器和单例对象的接口定义。
3. **`instances`**：对象类型，定义运行时通过方法获取的局部实例对象接口（如 `unit`、`player`）。
4. **`enums`**：对象类型，容纳游戏内所有的常量与枚举定义。

---

## 二、 节点结构详解

### 1. `globals` (全局对象)
本节点下挂载的每一个键代表一个可以在全局作用域中直接引用的管理器名（如 `Players`、`Units`、`Armies` 等）。其属性结构如下：

```json
"globals": {
  "管理器名称 (如 Armies)": {
    "methods": {
      "方法名称 (如 get)": {
        "params": ["参数名1", "参数名2"],
        "return_type": "返回值类型 (可选)"
      }
    },
    "properties": {
      "属性名称": {
        "type": "属性类型"
      }
    },
    "instances": {
      "实例类型名称": "获取实例的级联调用链"
    },
    "sub_objects": {
      "全局下属子系统组件名": {
        "methods": {},
        "properties": {}
      }
    }
  }
}
```

* **字段作用解释**：
  * **`methods`**：该全局管理器直接提供的方法集合。包含形参名列表 `params`（按顺序排列）和可选的返回值类型 `return_type`。
  * **`properties`**：该全局管理器直接挂载的静态属性或底层配置变量类型。
  * **`instances`**：**核心级联字段**。声明了通过该全局管理器获取对应实例的接口路径（例如：`Armies.instances` 包含 `"army": "Armies.get(unit.armyId)"`），为代码提示和级联展开提供逻辑映射。
  * **`sub_objects`**：该全局管理器的子模块或附属系统组件（如 `Game.Culture`）。只有在源码中直接通过 `Game.Culture.xxx` 调用、且不属于黑名单的二级大写组件才会被保留在此处。

---

### 2. `instances` (实例对象)
本节点定义运行时各种核心实例（如 `player`、`unit`、`city`、`district`、`constructible`、`army`、`plot`）上可用的方法、属性及挂载子系统。其属性结构如下：

```json
"instances": {
  "实例名称 (如 unit)": {
    "methods": {
      "实例方法 (如 isDead)": {
        "params": [],
        "return_type": "boolean"
      }
    },
    "properties": {
      "实例属性 (如 id)": {
        "type": "number"
      }
    },
    "sub_objects": {
      "实例关联二级子系统 (如 Combat)": {
        "methods": {
          "子系统方法 (如 getStrength)": { "params": [] }
        },
        "properties": {}
      }
    }
  }
}
```

* **字段作用解释**：
  * **`methods` / `properties`**：直接在实例对象（如通过 `const unit = Units.get(id)` 拿到的 `unit` 变量）上可直接调用或读取的成员列表，已自动过滤了 JS 数组原生方法的干扰噪音。
  * **`sub_objects`**：挂载在当前实例下的二级大写子系统组件（例如 `unit.Combat`、`player.Treasury`）。它完整记录了游戏核心规则组件内部的接口规范。在精筛编译时，只要该子系统名字未落入顶层黑名单，均在此处默认予以保留。

---

### 3. `enums` (常量与枚举)
本节点汇总了游戏运行时所需的所有参数类型、状态常量、键名定义等枚举列表。其属性结构如下：

```json
"enums": {
  "枚举或伪全局对象名称 (如 YieldTypes)": {
    "members": {
      "键名 (如 YIELD_GOLD)": "对应的值或 null"
    },
    "description": "关于该枚举用途的中文或英文简要注释 (可选)"
  }
}
```

* **字段作用解释**：
  * **`members`**：枚举内部的各常量字段及其键值映射。如果是通过大写全局对象转换而来的常量集，则其值默认为 `null`。
  * **`description`**：该常量的用途说明，由源码中的 JSDoc 注释块启发式提取而来。

---

## 三、 使用手册及典型应用场景

### 1. API 补全对比与查漏补缺
在维护 API 页面文档（如 `.md` 文档）时，通过以下步骤进行比对补全：
1. 读取文档的 `primary_scope`（例如 `Units`）。
2. 在 `civ7_api.json` 的 `globals.Units` 下获取所有方法和属性，或在 `instances.unit` 下获取其所有实例接口。
3. 比对文档方法表，迅速提取出未添加的接口作为补全候选。
4. 在源码中确认这些候选接口的真实用法并生成代码示例。

### 2. 自动生成模板与快速校验
在新建某个 Scope 的 API 页面时：
1. 从 `civ7_api.json` 的 `globals` 或 `instances` 下直接复制出该 Scope 对应的全部 `methods` 和 `properties`，以此作为文档的方法骨架；
2. 确保页面底部的 `<API>` 内容块与字典内的接口定义保持参数个数与返回类型的一致性。
