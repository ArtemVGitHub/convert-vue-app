<template>
  <LayoutDefault />
</template>

<script setup>
import { onMounted } from "vue";
import LayoutDefault from "@/layouts/LayoutDefault.vue";
import { useRatesStore } from "@/stores/rates";

const { fetchRates } = useRatesStore();

onMounted(() => {
  fetchRates();
});
</script>
