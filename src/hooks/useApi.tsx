import { useState, useEffect } from 'react';

type currencyTypes = "USD" | "EUR" | "GBP";

interface ICurrencyFormat {
  code: string;
  symbol: string;
  rate: string;
  description: string;
  rate_float: number;
}

type Bpi = { [K in currencyTypes]: ICurrencyFormat };


export default function useApi() {
  const [bpi, setBpi] = useState<Bpi[]>([]);
  const [conversionRate, setConversionRate] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          'https://api.coindesk.com/v1/bpi/currentprice.json'
        );
        const data = await res.json();
        setBpi(data.bpi)
        setConversionRate({
          eur: (data.bpi['EUR'].rate_float / data.bpi['USD'].rate_float),
          gbp: (data.bpi['GBP'].rate_float / data.bpi['USD'].rate_float)
        })
      } catch (e) {
        console.error(e)
      }
    }
    fetchData()

    setLoading(false);
  }, []);

  if (!loading) {
    localStorage.setItem('conversionRate', JSON.stringify(conversionRate));
  }

  return bpi;
}
