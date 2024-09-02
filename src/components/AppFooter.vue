<template>
  <footer class="info">
    <span class="text">Курс валют на: {{ today }}</span>
  </footer>
</template>

<script setup>
const today = new Date().toLocaleDateString("ru-RU");
</script>

<style lang="scss" scoped>
.info {
  margin-top: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;

  .text {
    font-size: 0.875em;
    color: #676767;
  }
}
</style>
