import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Converter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [exchangeRate, setExchangeRate] = useState(null);
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    axios.get('https://open.er-api.com/v6/latest/USD')
      .then(response => {
        const currencyData = response.data;
        setCurrencies([...Object.keys(currencyData.rates)]);
      });
  }, []);

  useEffect(() => {
    if (fromCurrency && toCurrency) {
      axios.get(`https://open.er-api.com/v6/latest/${fromCurrency}`)
        .then(response => {
          const currencyData = response.data;
          setExchangeRate(currencyData.rates[toCurrency]);
        });
    }
  }, [fromCurrency, toCurrency]);

  const convertCurrency = () => {
    if (exchangeRate) {
      return (amount * exchangeRate).toFixed(2);
    }
    return '0.00';
  };

  return (
    <div>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(parseFloat(e.target.value))}
      />
      <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
        {currencies.map(currency => (
          <option key={currency} value={currency}>{currency}</option>
        ))}
      </select>
      <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
        {currencies.map(currency => (
          <option key={currency} value={currency}>{currency}</option>
        ))}
      </select>
      <p>Converted Amount: {convertCurrency()}</p>
    </div>
  );
};

export default Converter;
