// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import './custom.css'
import BackToTop from '../components/BackToTop.vue'
import PdfViewer from '../components/PdfViewer.vue'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'layout-bottom': () => h(BackToTop)  // 回到顶部
    })
  },
  enhanceApp({ app }) {
    app.component('PdfViewer', PdfViewer);
  },
} satisfies Theme
