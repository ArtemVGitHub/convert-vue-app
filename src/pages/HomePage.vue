<template>
  <div class="page-home">
    <ul v-if="filteredRates.length" class="rate-list">
      <li v-for="(rate, index) in filteredRates" :key="index" class="rate-item">
        <span class="label">1</span> {{ rate.from.toUpperCase() }} =
        <span class="label">{{ rate.value?.toFixed(2) }}</span>
        {{ rate.to.toUpperCase() }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRatesStore } from "@/stores/rates";

const ratesStore = useRatesStore();

const filteredRates = computed(() => {
  const pairsToShow = ["usd-rub", "eur-rub"];
  return pairsToShow
    .map((pair) => {
      const [from, to] = pair.split("-");
      return {
        from,
        to,
        value: ratesStore.rates[pair],
      };
    })
    .filter((rate) => rate.value !== undefined); // Исключаем пары, для которых нет значений
});
</script>

<style lang="scss" scoped>
.page-home {
  display: flex;
  justify-content: center;
  max-width: 700px;
  margin: 48px auto;

  .rate-list {
    padding: 0;
    margin: 0;
    list-style-type: none;
    text-align: center;

    .rate-item {
      margin-bottom: 8px;

      .label {
        font-size: 1.25em;
        font-weight: bold;
        color: var(--primary-color);
      }
    }
  }
}
</style>
