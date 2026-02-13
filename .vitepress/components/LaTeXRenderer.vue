<template>
  <!-- 分两种模式：纯公式渲染 / 文本混排渲染 -->
  <div 
    class="latex-renderer"
    :class="{ 'inline': mode === 'inline', 'block': mode === 'block' }"
    ref="latexContainer"
  ></div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import katex from 'katex'
// 引入KaTeX的样式（必须，否则公式排版会乱）
import 'katex/dist/katex.min.css'

// 接收外部传参
const props = defineProps({
  // 渲染内容：可以是纯LaTeX公式，也可以是包含$...$的小说文本
  content: {
    type: String,
    required: true
  },
  // 渲染模式：
  // inline = 行内混排（解析文本中的$...$），block = 单独块级公式
  mode: {
    type: String,
    default: 'inline',
    validator: (v) => ['inline', 'block'].includes(v)
  },
  // 是否开启公式换行（仅block模式生效）
  displayMode: {
    type: Boolean,
    default: true
  }
})

const latexContainer = ref(null)

// 核心渲染函数
const renderLatex = () => {
  if (!latexContainer.value) return
  
  let html = ''
  if (props.mode === 'block') {
    // 块级公式：直接渲染纯LaTeX
    html = katex.renderToString(props.content, {
      displayMode: props.displayMode,
      throwOnError: false, // 容错：公式写错不崩溃，只显示原文本
      errorColor: '#ff4444' // 错误公式标红
    })
  } else {
    // 行内模式：解析文本中的$...$为LaTeX，其余保留普通文本
    html = props.content.replace(
      /\$(.*?)\$/g, // 匹配$包裹的行内公式
      (_, latex) => {
        try {
          return katex.renderToString(latex, {
            displayMode: false,
            throwOnError: false,
            errorColor: '#ff4444'
          })
        } catch (e) {
          return `$${latex}$` // 渲染失败则还原原文本
        }
      }
    )
  }
  
  latexContainer.value.innerHTML = html
}

// 初始化渲染 + 监听内容变化重新渲染
onMounted(renderLatex)
watch([() => props.content, () => props.mode], renderLatex)
</script>

<style scoped>
/* 行内公式：和文本对齐 */
.inline {
  display: inline;
  line-height: 1.6; /* 适配小说文本行高 */
}
/* 块级公式：居中展示，和文本分开 */
.block {
  display: block;
  text-align: center;
  margin: 16px 0;
  font-size: 1.1em;
}
/* 修复KaTeX和小说文本的样式兼容 */
.latex-renderer {
  font-family: inherit;
}
</style>