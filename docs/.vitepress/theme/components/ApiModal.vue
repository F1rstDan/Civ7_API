<template>
  <span
    v-if="isTrigger"
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

const hasTitle = computed(() => !!props.title)
const isTrigger = computed(() => !hasTitle.value)

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
  if (!isTrigger.value && contentRef.value) {
    const id = props.id || ''
    const title = props.title || id
    if (id && contentRef.value.innerHTML) {
      modalStore.register(id, title, contentRef.value.innerHTML)
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
