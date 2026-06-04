<template>
  <div v-if="hasSources" class="source-refs">
    <h2 id="源文件引用" tabindex="-1">
      源文件引用
      <a class="header-anchor" href="#源文件引用" aria-hidden="true">​</a>
    </h2>
    <ul>
      <li v-for="src in frontmatter.source" :key="src">
        <code>{{ src }}</code>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'

const { frontmatter } = useData()

const hasSources = computed(() => {
  const src = frontmatter.value.source
  return Array.isArray(src) && src.length > 0
})
</script>

<style scoped>
.source-refs {
  margin-top: 48px;
  padding-top: 24px;
  border-top: 1px solid var(--vp-c-divider);
}

.source-refs h2 {
  font-size: 1.25em;
  margin-bottom: 12px;
  color: var(--vp-c-text-1);
}

.source-refs ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.source-refs li {
  padding: 2px 0;
}

.source-refs code {
  font-family: var(--vp-font-family-mono);
  font-size: 0.875em;
  color: var(--vp-c-text-2);
}
</style>
