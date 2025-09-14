<script setup lang="ts">
import { shallowRef, ref, onMounted, watch, nextTick } from "vue";
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs'; // 使用 legacy 版本

const props = defineProps({
  url: { type: String, required: true }, // PDF 文件路径
  scale: { type: [Number, String], default: 1 }, // 接受 Number 或 String
  pdfjsVersion: { type: String, default: "5.4.149" }, // 当前版本
});

const canvasRef = shallowRef<HTMLCanvasElement | null>(null);
const pdfDoc = shallowRef<any>(null);
const pageNum = ref(1);
const pageCount = ref(0);
const error = ref<string | null>(null);

async function renderPage(num: number) {
  console.log("Rendering page", num, "pdfDoc:", !!pdfDoc.value, "canvas:", !!canvasRef.value);
  if (!pdfDoc.value || !canvasRef.value) {
    error.value = "PDF document or canvas is not available";
    return;
  }
  try {
    const page = await pdfDoc.value.getPage(num);
    //const viewport = page.getViewport({ scale: typeof props.scale === 'string' ? parseFloat(props.scale) : props.scale });
    const scale = 1.0;
    const viewport = page.getViewport({ scale });
    const outputScale = window.devicePixelRatio || 1;
    const canvas = canvasRef.value;
    const context = canvas.getContext("2d");
    if (!context) {
      error.value = "Failed to get 2D context for canvas";
      return;
    }
    canvas.width = Math.floor(viewport.width * outputScale);
    canvas.height = Math.floor(viewport.height * outputScale);
    canvas.style.width = Math.floor(viewport.width) + "px";
    canvas.style.height = Math.floor(viewport.height) + "px";
    const transform = outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null;
    //await page.render({ canvasContext: context, viewport, transform }).promise;
    const renderContext = {
    canvasContext: context,
    transform,
    viewport,
  };
  page.render(renderContext);
    error.value = null;
  } catch (err) {
    error.value = "Error rendering page: " + err.message;
    console.error("Error in renderPage:", err);
  }
}

async function loadPdf() {
  try {
    if (!props.url) {
      error.value = "PDF URL is empty or invalid";
      return;
    }
    console.log("Attempting to load PDF from:", props.url);
    pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.mjs";
    const loadingTask = pdfjsLib.getDocument(props.url);
    console.log("Loading task created:", loadingTask);
    pdfDoc.value = await loadingTask.promise;
    console.log("PDF document loaded, pages:", pdfDoc.value.numPages, "pdfDoc.value:", pdfDoc.value);
    pageCount.value = pdfDoc.value.numPages;
    pageNum.value = 1;
    error.value = null;
    await renderPage(pageNum.value);
  } catch (err) {
    error.value = "Error loading PDF: " + (err.message || 'Unknown error');
    console.error("Error in loadPdf:", err);
  }
}

function nextPage() {
  if (pageNum.value >= pageCount.value) return;
  pageNum.value++;
  renderPage(pageNum.value);
}

function prevPage() {
  if (pageNum.value <= 1) return;
  pageNum.value--;
  renderPage(pageNum.value);
}

onMounted(async () => {
  console.log("Component mounted, canvasRef:", !!canvasRef.value);
  await nextTick();
  console.log("DOM ready, canvasRef:", !!canvasRef.value);
  await loadPdf();
});

watch(() => props.url, async (newUrl, oldUrl) => {
  if (newUrl !== oldUrl) {
    if (pdfDoc.value) {
      pdfDoc.value.destroy();
      pdfDoc.value = null;
    }
    await loadPdf();
  }
});
</script>

<template>
  <div class="pdf-viewer">
    <client-only>
      <canvas ref="canvasRef"></canvas>
      <div v-if="!pdfDoc && !error">加载 PDF 中...</div>
      <div v-else-if="error" class="error">加载 PDF 失败: {{ error }}</div>
    </client-only>
    <div class="controls" v-if="pdfDoc">
      <button @click="prevPage" :disabled="pageNum <= 1">上一页</button>
      <span>第 {{ pageNum }}/{{ pageCount }} 页</span>
      <button @click="nextPage" :disabled="pageNum >= pageCount">下一页</button>
    </div>
  </div>
</template>

<style scoped>
.pdf-viewer {
  text-align: center;
  margin: 1rem 0;
}
canvas {
  border: 1px solid #ccc;
  margin: 0 auto;
  display: block;
}
.controls {
  margin-top: 0.5rem;
}
button {
  margin: 0 0.5rem;
  padding: 0.3rem 0.8rem;
}
.error {
  color: red;
  margin-bottom: 1rem;
}
</style>