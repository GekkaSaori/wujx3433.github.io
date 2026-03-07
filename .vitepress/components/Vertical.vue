<script setup lang="ts">
import { Content } from 'vitepress';

</script>

<template>
  <div class="vertical-layout-container">
    <Content />
  </div>
</template>

<style scoped>
/* 竖排布局容器：覆盖整个文档内容区域 */
.vertical-layout-container {
  font-family: "Noto Serif SC", serif;
  font-optical-sizing: auto;
  font-weight: 300 !important;
  font-style: normal !important;
  font-size: 17px !important;
  writing-mode: vertical-rl; /* 核心：从右到左竖排（中文传统） */
  text-orientation: upright; /* 文字直立，不旋转 */
  width: 100%;
  max-width: 800px; /* 适配默认文档宽度 */
  margin: 0 auto; /* 居中 */
  padding: 20px 0;
  line-height: 1.8 !important; /* 竖排行高，提升可读性 */
  letter-spacing: 1px; /* 字间距，避免拥挤 */
}

/* 竖排段落适配：取消默认 margin，调整间距 */
.vertical-layout-container p {
  margin: 0;
  margin-right: 10px; /* 段落之间的间距（竖排是左右间距） */
  white-space: nowrap; /* 防止标点单独换行 */
}

.vertical-layout-container h1 {
  font-weight: 700;
  font-size: 200%;
}

/* 暗黑模式适配 */
:global(html.dark) .vertical-layout-container {
  color: #ddd;
}

/* 移动端适配：缩小间距，适配小屏幕 */
@media (max-width: 768px) {
  .vertical-layout-container {
    padding: 10px 0;
    line-height: 1.6;
    letter-spacing: 0.5px;
  }
  .vertical-layout-container p {
    margin-right: 5px;
  }
}
</style>