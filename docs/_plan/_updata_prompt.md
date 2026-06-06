```
/doc-update 新建一个关于游戏内`科技`API的文档，科技，科技树等相关内容。文档就绪后添加到网站侧边栏中。
```


```
列出`docs/api/`文件夹下没有更新日期（YAML元数据：doc_update）的todo文档。
然后派出子Agent使用`/doc-format`SKILL整改这些文档，严格使用这样的提示词`使用 /doc-format 整改 `docs/api/xxxx.md`文档是否符合文档规范，缺少代码示例时搜索源码补全。`
然后每个文档整改完都在todo列表上确定。
```

```
使用 /doc-format 整改 `docs/api/xxxx.md`文档是否符合文档规范，缺少代码示例时搜索源码补全。
```