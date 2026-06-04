<template>
  <div v-if="hasSources" class="source-refs vp-doc">
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
