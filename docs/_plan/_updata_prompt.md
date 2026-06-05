
```
列出`docs/api/`文件夹下没有更新日期（YAML元数据：doc_update）的todo文档。
然后派出子Agent使用`/doc-format`SKILL整改这些文档，严格使用这样的提示词`使用 /doc-format 整改 `docs/api/xxxx.md`文档是否符合文档规范，缺少代码示例时搜索源码补全。`
然后每个文档整改完都在todo列表上确定。
```

```
使用 /doc-format 整改 `docs/api/xxxx.md`文档是否符合文档规范，缺少代码示例时搜索源码补全。
```


- [] /doc-format 更新成 /doc-update
- [] 增加流程：格式刷：只改文档的格式
- [] 添加流程：补全：查找，搜寻可能遗漏的API
- [] 添加流程：验证：检查API是否正确
- [] doc_type 分类