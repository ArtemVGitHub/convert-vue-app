<template>
  <div class="container">
    <AppHeader />
    <main>
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  max-width: 1366px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  height: 100vh;
  height: 100dvh;
}
</style>
