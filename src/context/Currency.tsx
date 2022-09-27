import { createContext, useEffect, useState } from "react";

export const CurrencyContext = createContext(
  {} as {
    selectedCurrency: string;
    setCurrency: (currency: string) => void;
  }
);

// TODO get local storage working properly

export const CurrencyProvider = ({ children }) => {
  const [selectedCurrency, setSelectedCurrency] = useState("usd");

  useEffect(() => {
    const currency = localStorage.getItem("currency");
    if (currency) {
      setSelectedCurrency(currency);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("currency", selectedCurrency);
  }, [selectedCurrency]);

  return (
    <CurrencyContext.Provider
      value={{ selectedCurrency, setCurrency: setSelectedCurrency }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};
