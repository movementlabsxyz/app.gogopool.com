import { useContext } from "react";

import { CurrencyContext } from "@/context/Currency";

const useSelectedCurrency = () => {
  const { selectedCurrency, setCurrency: setSelectedCurrency } =
    useContext(CurrencyContext);

  return { selectedCurrency, setSelectedCurrency };
};

export default useSelectedCurrency;
