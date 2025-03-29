import { createContext, useState, useEffect } from 'react';

export const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('USD');
  const [exchangeRate, setExchangeRate] = useState(1); // Default NGN to NGN

  useEffect(() => {
    const fetchExchangeRate = async () => {
      if (currency === 'NGN') {
        try {
            const API_KEY = import.meta.env.VITE_CURRENCY_API_KEY;
            const res = await fetch(`https://api.currencyapi.com/v3/latest?apikey=${API_KEY}&base_currency=USD&currencies=NGN`);
          const data = await res.json();

          if (data && data.data && data.data.NGN) {
            setExchangeRate(data.data.NGN.value);
          } else {
            console.error("Could not get NGN rate from CurrencyAPI", data);
            setExchangeRate(1);
          }
        } catch (err) {
          console.error("CurrencyAPI Error:", err);
          setExchangeRate(1);
        }
      } else {
        setExchangeRate(1); // No conversion needed for USD
      }
    };

    fetchExchangeRate();
  }, [currency]);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, exchangeRate }}>
      {children}
    </CurrencyContext.Provider>
  );
};