<script setup lang="ts">
import { Content } from 'vitepress';

</script>

<template>
  <div class="vertical-layout-container">
    <Content />
  </div>
</template>

<style>

/* 竖排段落适配：取消默认 margin，调整间距 */
.vertical-layout-container p {
  margin: 0;
  margin-right: 10px; /* 段落之间的间距（竖排是左右间距） */
  white-space: nowrap; /* 防止标点单独换行 */
}

.vertical-layout-container h1{
  line-height: 1.8em;
  font-weight: 800;
  font-size: 32px;
  /*font-feature-settings: ; IDK why it is not working */
}

.vertical-layout-container h2{
  line-height: 1.8em;
  font-weight: 700;
  font-size: 28px;
}

.vertical-layout-container h3{
  line-height: 1.8em;
  font-weight: 600;
  font-size: 24px;
}

.vertical-layout-container h4{
  line-height: 1.8em;
  font-weight: 500;
  font-size: 20px;
}

.vertical-layout-container h5{
  line-height: 1.8em;
  font-weight: 400;
  font-size: 18px;
}

/* 竖排布局容器：覆盖整个文档内容区域 */
.vertical-layout-container {
  overflow-y: auto;
  font-family: "Noto Serif TC", serif;
  font-feature-settings: "vert" on, "vrt2" on;
  font-optical-sizing: auto;
  writing-mode: vertical-rl; /* 核心：从右到左竖排（中文传统） */
  text-orientation: mixed; /* 文字直立，不旋转 */
  /* 这里用 upright 会导致包含标点在内的所有字符全部直立，寄 */
  width: 100%;
  max-width: 800px; /* 适配默认文档宽度 */
  margin: 0 auto; /* 居中 */
  padding: 20px 0;
  /* 这个地方不工作，继承了全局样式 line-height: 1.8em; /* 竖排行高，提升可读性 */ 
  letter-spacing: 1px; /* 字间距，避免拥挤 */
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