<template>
  <Layout>
    <template #doc-bottom>
      <ModalOverlay />
    </template>
  </Layout>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme'
import ModalOverlay from './ModalOverlay.vue'

const { Layout } = DefaultTheme
</script>
