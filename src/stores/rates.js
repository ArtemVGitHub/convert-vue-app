import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useRatesStore = defineStore("rates", () => {
  const appCurrency = ["rub", "usd", "eur"];

  const rates = ref({});

  const fetchRates = async () => {
    try {
      const response = await axios.get(
        "https://status.neuralgeneration.com/api/currency"
      );
      const fetchedRates = response.data;
      rates.value = Object.keys(fetchedRates)
        .filter((pair) => {
          const [fromCurrency, toCurrency] = pair.split("-");
          return (
            appCurrency.includes(fromCurrency) &&
            appCurrency.includes(toCurrency)
          );
        })
        .reduce((acc, pair) => {
          acc[pair] = fetchedRates[pair];
          return acc;
        }, {});
    } catch (error) {
      console.error("Ошибка при загрузке курсов валют:", error);
    }
  };

  return { appCurrency, rates, fetchRates };
});
