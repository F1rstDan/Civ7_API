<template>
  <span
    v-if="!isContentBlock"
    ref="triggerRef"
    class="api-trigger"
    @click="handleClick"
  >
    <slot />
  </span>
  <div v-else ref="contentRef" style="display:none">
    <slot />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { modalStore } from '../store'

const props = defineProps({
  id: { type: String, default: '' },
  title: { type: String, default: '' }
})

const triggerRef = ref(null)
const contentRef = ref(null)

const isContentBlock = computed(() => !!props.id)

function getTriggerId() {
  if (props.id) return props.id
  if (triggerRef.value) {
    let text = triggerRef.value.textContent.trim()
    text = text.replace(/^`+|`+$/g, '')
    return text
  }
  return ''
}

function handleClick() {
  const id = getTriggerId()
  if (id && modalStore.contentMap[id]) {
    modalStore.show(id)
  }
}

onMounted(() => {
  if (isContentBlock.value && contentRef.value) {
    const id = props.id || ''
    let title = props.title
    let html = contentRef.value.innerHTML

    // Extract title from first h3 in slot if not explicitly provided
    if (!title) {
      const h3 = contentRef.value.querySelector('h3')
      if (h3) {
        title = h3.textContent.trim()
        h3.remove()
        html = contentRef.value.innerHTML
      }
    }

    title = title || id
    if (id && html) {
      modalStore.register(id, title, html)
    }
  }
})
</script>

<style scoped>
.api-trigger {
  color: var(--vp-c-brand-1);
  text-decoration: underline;
  text-decoration-style: dotted;
  cursor: pointer;
  font-family: var(--vp-font-family-mono);
  font-size: 0.9em;
}
.api-trigger:hover {
  color: var(--vp-c-brand-2);
}
</style>