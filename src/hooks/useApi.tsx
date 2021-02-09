import { useState, useEffect } from 'react';

import apiResponse from '../utils/apiResponse';

export type currencyTypes = "USD" | "EUR" | "GBP";

interface ICurrencyFormat {
  code: string;
  symbol: string;
  rate: string;
  description: string;
  rate_float: number;
}

type Bpi = { [key in currencyTypes]: ICurrencyFormat };


export default function useApi() {
  const [bpi, setBpi] = useState<Bpi>({} as Bpi);
  const [conversionRate, setConversionRate] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setBpiAndConversionRate = (bpiData: Bpi) => {
      setBpi(bpiData);
      setConversionRate({
        eur: (bpiData.EUR.rate_float / bpiData.USD.rate_float),
        gbp: (bpiData.GBP.rate_float / bpiData.USD.rate_float)
      });
    }

    async function fetchData() {
      const bpiData = await apiResponse('https://api.coindesk.com/v1/bpi/currentprice.json');

      setBpiAndConversionRate(bpiData);
    }
    fetchData();
    setLoading(false);
  }, []);

  if (!loading) {
    localStorage.setItem('conversionRate', JSON.stringify(conversionRate));
  }

  return bpi;
}
