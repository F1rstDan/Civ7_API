<template>
  <ClientOnly>
    <Teleport to="body">
      <div
        v-if="store.visible"
        class="modal-overlay"
        @click.self="store.hide()"
        tabindex="0"
        ref="overlayRef"
      >
        <div class="modal-container">
          <div class="modal-header">
            <h3 class="modal-title">{{ currentContent?.title || '' }}</h3>
            <button class="modal-close" @click="store.hide()">✕</button>
          </div>
          <div class="modal-body" v-html="currentContent?.html || ''"></div>
        </div>
      </div>
    </Teleport>
  </ClientOnly>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { modalStore } from '../store'

const store = modalStore
const overlayRef = ref(null)

const currentContent = computed(() => {
  if (store.currentId && store.contentMap[store.currentId]) {
    return store.contentMap[store.currentId]
  }
  return null
})

watch(() => store.visible, async (visible) => {
  if (visible) {
    await nextTick()
    overlayRef.value?.focus()
  }
})

function onKeydown(e) {
  if (e.key === 'Escape' && store.visible) {
    store.hide()
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  outline: none;
}
.modal-container {
  background: var(--vp-c-bg);
  border-radius: 8px;
  max-width: 640px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid var(--vp-c-divider);
  position: sticky;
  top: 0;
  background: var(--vp-c-bg);
  z-index: 1;
}
.modal-title {
  margin: 0;
  font-family: var(--vp-font-family-mono);
  font-size: 1rem;
  font-weight: 600;
}
.modal-close {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: var(--vp-c-text-2);
  padding: 4px 8px;
  border-radius: 4px;
  line-height: 1;
}
.modal-close:hover {
  background: var(--vp-c-default-soft);
  color: var(--vp-c-text-1);
}
.modal-body {
  padding: 20px;
}
.modal-body :deep(table) {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9em;
}
.modal-body :deep(th),
.modal-body :deep(td) {
  padding: 6px 10px;
  border: 1px solid var(--vp-c-divider);
  text-align: left;
}
.modal-body :deep(th) {
  background: var(--vp-c-default-soft);
  font-weight: 600;
}
.modal-body :deep(pre) {
  border-radius: 6px;
  overflow-x: auto;
}
</style>
