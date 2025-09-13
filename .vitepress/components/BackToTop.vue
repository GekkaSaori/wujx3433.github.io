<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const visible = ref(false)

const handleScroll = () => {
  visible.value = window.scrollY > 300
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <button
    v-show="visible"
    @click="scrollToTop"
    class="back-to-top"
  >
    ⬆ 回到顶部
  </button>
</template>

<style scoped>
.back-to-top {
  position: fixed;
  right: 1.5rem;
  bottom: 1.5rem;
  padding: 0.5rem 0.75rem;
  background: #cfa3da;
  color: #fff;
  border-radius: 6px;
  cursor: pointer;
  border: none;
  font-size: 14px;
  transition: opacity 0.3s;
}
.back-to-top:hover {
  opacity: 0.85;
}
</style>