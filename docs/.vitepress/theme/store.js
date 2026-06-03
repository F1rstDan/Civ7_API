import { reactive } from 'vue'

export const modalStore = reactive({
  contentMap: {},
  visible: false,
  currentId: null,

  register(id, title, html) {
    this.contentMap[id] = { title, html }
  },

  show(id) {
    this.currentId = id
    this.visible = true
  },

  hide() {
    this.visible = false
    this.currentId = null
  }
})