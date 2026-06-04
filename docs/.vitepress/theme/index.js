import DefaultTheme from 'vitepress/theme'
import ApiModal from './components/ApiModal.vue'
import Layout from './components/Layout.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('API', ApiModal)
  }
}
