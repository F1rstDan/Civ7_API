# Civ7 API 术语上下文 (CONTEXT)

本文档定义并规范了 Civ7 MOD 提取与文档生成中使用的领域模型术语。

## 领域词汇表 (Glossary)

### Globals (全局对象/全局管理器)
* **定义**：游戏控制台或执行上下文中直接注入的、全局可直接访问的单例对象或管理器（如 `Players`、`Units`、`GameplayMap`、`Game`、`Input`）。
* **职责**：它们负责提供系统级全局接口，或者通过 `get(id)` 等方法来生产/查询具体的实例。

### Instances (实例对象)
* **定义**：由全局管理器创建或管理的具体游戏实体实例（如 `player` 玩家实例、`unit` 单位实例、`city` 城市实例、`district` 区域实例、`army` 军队实例）。
* **职责**：它们拥有实例本身的属性（如单位的 `id`、`location`）和专属行为方法，并通常作为容器在其下挂载各个专注细分规则的子系统组件。

### Sub-systems / Components (子系统/组件)
* **定义**：挂载在全局对象或实例对象名下的二级细分子业务系统（如挂载在 `unit` 下的 `Health`、`Combat`；挂载在 `player` 下的 `Treasury`、`Culture`；挂载在全局 `Game` 下的 `CityOperations`、`ProgressionTrees`）。
* **职责**：它们将复杂的实体级行为解耦并封装，只负责该实体下特定领域的规则计算和修改（如 `unit.Health.getDamage()`）。

### Enums (常量/枚举)
* **定义**：各系统通用的静态枚举与常量类型字典（如 `YieldTypes`、`AgeType`），用于在传递参数和状态判定时提供具有强可读性的值。
