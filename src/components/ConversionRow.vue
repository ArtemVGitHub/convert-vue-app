<template>
  <div class="conversion-row">
    <select v-model="localCurrency" @change="handleCurrencyChange">
      <option v-for="currency in currencies" :key="currency" :value="currency">
        {{ currency.toUpperCase() }}
      </option>
    </select>
    <input type="text" v-model="localAmount" @input="handleAmountInput" />
    <span v-if="error" class="error">{{ error }}</span>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  currencies: {
    type: Array,
    default: () => [],
  },
  currency: {
    type: String,
    default: "",
  },
  amount: {
    type: String,
    default: "",
  },
  error: {
    type: String,
    default: "",
  },
});

const emits = defineEmits(["update:currency", "update:amount"]);

const localCurrency = computed({
  get: () => props.currency,
  set: (value) => emits("update:currency", value),
});

const localAmount = computed({
  get: () => props.amount,
  set: (value) => emits("update:amount", value),
});
</script>

<style lang="scss" scoped>
.conversion-row {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  gap: 8px;

  select {
    padding: 8px;
  }

  input {
    width: 300px;
    padding: 8px;
  }

  .error {
    position: absolute;
    top: 110%;
    right: 0;
    color: red;
    font-size: 0.75em;
  }
}
</style>
