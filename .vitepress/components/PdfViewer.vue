<script setup lang="ts">
import { ref, onMounted, watch } from "vue";

const props = defineProps({
  url: { type: String, required: true },
  scale: { type: Number, default: 1 },
  pdfjsVersion: { type: String, default: "4.0.379" }, // 稳定版本
});

const canvasRef = ref<HTMLCanvasElement | null>(null);
const pdfDoc = ref<any>(null);
const pageNum = ref(1);
const pageCount = ref(0);
const error = ref<string | null>(null);

let pdfjsLib: any = null;

async function loadPdfJs() {
  if (pdfjsLib) {
    console.log("PDF.js already loaded");
    return pdfjsLib;
  }
  try {
    console.log("Loading PDF.js script...");
    await new Promise<void>((resolve, reject) => {
      const script = document.createElement("script");
      script.src = `/pdfjs/pdf.min.js`; // 使用本地文件
      script.onload = () => {
        console.log("PDF.js script loaded");
        resolve();
      };
      script.onerror = () => reject(new Error("Failed to load PDF.js script"));
      document.head.appendChild(script);
    });
    pdfjsLib = (window as any).pdfjsLib;
    if (!pdfjsLib) {
      throw new Error("pdfjsLib is not defined after loading script");
    }
    console.log("Setting workerSrc...");
    pdfjsLib.GlobalWorkerOptions.workerSrc = `/pdfjs/pdf.worker.min.js`;
    console.log("PDF.js initialized successfully");
    return pdfjsLib;
  } catch (err) {
    console.error("Error in loadPdfJs:", err);
    throw new Error("Error loading PDF.js: " + err.message);
  }
}

async function renderPage(num: number) {
  if (!pdfDoc.value || !canvasRef.value) {
    error.value = "PDF document or canvas is not available";
    return;
  }
  try {
    const page = await pdfDoc.value.getPage(num);
    const viewport = page.getViewport({ scale: props.scale });
    const canvas = canvasRef.value;
    const context = canvas.getContext("2d");
    if (!context) {
      error.value = "Failed to get 2D context for canvas";
      return;
    }
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    await page.render({ canvasContext: context, viewport }).promise;
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
    console.log("Loading PDF from:", props.url);
    const pdfjsLib = await loadPdfJs();
    pdfDoc.value = await pdfjsLib.getDocument(props.url).promise;
    pageCount.value = pdfDoc.value.numPages;
    pageNum.value = 1;
    error.value = null;
    await renderPage(pageNum.value);
  } catch (err) {
    error.value = "Error loading PDF: " + err.message;
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

onMounted(loadPdf);

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
    <div v-if="!pdfDoc && !error">加载 PDF 中...</div>
    <div v-else-if="error" class="error">加载 PDF 失败: {{ error }}</div>
    <canvas v-else ref="canvasRef"></canvas>
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