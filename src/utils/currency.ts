import { CURRENCY_LIST, CURRENCY_SYMBOLS } from "@/constants/coingecko";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const formatLabel = (price: number, currency: string) => {
  const decimalPlaces = CURRENCY_LIST.includes(currency) ? 2 : 8;

  const symbol = CURRENCY_SYMBOLS[currency.toUpperCase()];

  if (!symbol) {
    return `${price.toLocaleString(undefined, {
      maximumFractionDigits: decimalPlaces,
    })} ${currency.toUpperCase()}`;
  }

  return `${symbol}${price.toLocaleString(undefined, {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  })}`;
};

export default formatLabel;
