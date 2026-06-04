<template>
  <Layout>
    <template #doc-bottom>
      <SourceRefs />
      <ModalOverlay />
    </template>
  </Layout>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme'
import ModalOverlay from './ModalOverlay.vue'
import SourceRefs from './SourceRefs.vue'

const { Layout } = DefaultTheme
</script>
