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
  margin-inline-start: 0.4em; /* 段落之间的间距 */
  margin-inline-end: 0.4em;
  white-space: normal;
  padding-inline-start: 2em; /*另起一行空两格*/
  /* break-inside: avoid;*/
  line-height: 1.5em;
  margin-block: 1em;
}

.vertical-layout-container h1{
  line-height: 2em;
  font-weight: 800;
  font-size: 38px;
  margin-inline-start: 12px;
  letter-spacing: 0.4em;
  /* break-inside: avoid; /* 禁止标题跨列 */
}

.vertical-layout-container h2{
  line-height: 1.8em;
  font-weight: 700;
  font-size: 28px;
  margin-inline-start: 12px;
  letter-spacing: 5px;
  /* break-inside: avoid; /* 禁止标题跨列 */
}

.vertical-layout-container h3{
  line-height: 1.8em;
  font-weight: 600;
  font-size: 24px;
  margin-inline-start: 12px;
  letter-spacing: 5px;
  /* break-inside: avoid; /* 禁止标题跨列 */
}

.vertical-layout-container h4{
  line-height: 1.8em;
  font-weight: 500;
  font-size: 20px;
  margin-inline-start: 12px;
  letter-spacing: 5px;
  /* break-inside: avoid; /* 禁止标题跨列 */
}

.vertical-layout-container h5{
  line-height: 1.8em;
  font-weight: 400;
  font-size: 18px;
  margin-inline-start: 12px;
  letter-spacing: 5px;
  /* break-inside: avoid; /* 禁止标题跨列 */
}

/* 竖排布局容器：覆盖整个文档内容区域 */
.vertical-layout-container {
  max-height: calc(100vh - 200px); /*继承template高度减去导航栏高度*/
  height: 100%;/*兜底*/
  column-width: 40em;
  column-count: auto;
  column-gap: 2em;
  column-fill: auto;
  white-space: normal;
  word-break: normal;
  overflow-x: auto; 
  overflow-y: auto; 
  font-family: "Noto Serif SC", serif;
  font-feature-settings: "vert" on, "vrt2" on;
  font-optical-sizing: auto;
  writing-mode: vertical-rl; /* 核心：从右到左竖排（中文传统） */
  text-orientation: mixed; /* 文字直立，不旋转 */
  max-width: calc(100vh - 20px); /* 适配默认文档宽度 */
  width: 100%;
  margin: 0 auto; /* 居中 */
  padding: 20px 0;
  letter-spacing: 2px; /* 字间距，避免拥挤 */

    /* 浅米色背景+细微纹理渐变（模拟纸张质感） */
  background-color: #f9f7f3;
  background-image: 
    linear-gradient(90deg, rgba(0,0,0,0.01) 1px, transparent 1px),
    linear-gradient(rgba(0,0,0,0.01) 1px, transparent 1px);
  background-size: 20px 20px; /* 纹理密度，可调整 */
  /* 容器内边距，让内容不贴边 */
  padding-inline: 1em;
  border-radius: 4px; /* 轻微圆角，更柔和 */
  break-inside: avoid;
}

/*单页底色*/
.vertical-layout-container > * {
  /* 单页底色（比容器稍浅） */
  background-color: #fffbf5;
  /* 轻微阴影，模拟书页立体感 */
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  /* 单页内边距，避免文字贴边 */
  padding-inline: 1.5em;
  padding-block: 1em;
  /* 轻微圆角 */
  border-radius: 2px;
}

/* 暗黑模式适配在custom.css里 */

/* 移动端适配：缩小间距，适配小屏幕 */
@media (max-width: 768px) {
  .vertical-layout-container {
    padding: 10px 0;
    line-height: 1.6;
    letter-spacing: 0.5px;
    column-width: 16em; /* 移动端列宽更小，适配屏幕 */
    column-gap: 2em;
    max-height: calc(100vh - 150px); /* 减少导航栏高度占比 */
  }
  .vertical-layout-container p {
    margin-inline-start: 0.8em;
    margin-inline-end: 0.8em;
    padding-inline-start: 1.5em; /* 移动端空两格缩小 */
  }
}
</style>