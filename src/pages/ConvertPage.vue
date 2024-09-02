<template>
  <div class="page-convert">
    <form @submit.prevent>
      <ConversionRow
        :currencies="availableCurrencies"
        v-model:currency="currencyFrom"
        v-model:amount="amountFrom"
        :error="errorFrom"
        @update:amount="(a) => handleAmountChange(a, 'from')"
      />
      <ConversionRow
        :currencies="availableCurrencies"
        v-model:currency="currencyTo"
        v-model:amount="amountTo"
        :error="errorTo"
        @update:amount="(a) => handleAmountChange(a, 'to')"
      />
    </form>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRatesStore } from "@/stores/rates";
import ConversionRow from "@/components/ConversionRow.vue";

const ratesStore = useRatesStore();

const availableCurrencies = computed(() => ratesStore.appCurrency);

const currencyFrom = ref("rub");
const currencyTo = ref("usd");
const amountFrom = ref("");
const amountTo = ref("");
const errorFrom = ref("");
const errorTo = ref("");

const ERROR_MESSAGE = "Пожалуйста, введите число";

const validateAmount = (amount, field) => {
  const isInvalid = isNaN(amount);
  const errorField = field === "from" ? errorFrom : errorTo;

  errorField.value = isInvalid ? ERROR_MESSAGE : "";
  return !isInvalid;
};

const setAmount = (inputAmount, outputAmount, rate) => {
  outputAmount.value = (inputAmount.value * rate).toFixed(2);
};

const convertCurrency = (fromOrTo) => {
  const rateKey =
    fromOrTo === "from"
      ? `${currencyFrom.value}-${currencyTo.value}`
      : `${currencyTo.value}-${currencyFrom.value}`;

  const rate = ratesStore.rates[rateKey];

  if (fromOrTo === "from") {
    setAmount(amountFrom, amountTo, rate);
  } else {
    setAmount(amountTo, amountFrom, rate);
  }
};

const handleAmountChange = (amount, field) => {
  if (!validateAmount(amount, field)) return;
  convertCurrency(field);
};

watch(
  [() => currencyFrom.value, () => currencyTo.value],
  ([newFromVal, newToVal], [oldFromVal, oldToVal]) => {
    if (newFromVal !== oldFromVal) {
      if (newFromVal !== oldToVal) {
        currencyFrom.value = newFromVal;
        convertCurrency("to");
      } else {
        currencyTo.value = oldFromVal;
        convertCurrency("from");
      }
    } else {
      if (newToVal !== oldFromVal) {
        currencyTo.value = newToVal;
        convertCurrency("from");
      } else {
        currencyFrom.value = oldToVal;
        convertCurrency("to");
      }
    }
  }
);
</script>

<style lang="scss" scoped>
.page-convert {
  display: flex;
  justify-content: center;
  max-width: 700px;
  margin: 48px auto;
}
</style>
