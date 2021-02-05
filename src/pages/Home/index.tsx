import React, { useState, useEffect } from 'react';

import CurrencyButton from '../../components/CurrencyButton';
import { CurrencyBox, Container } from './styles';

const Home: React.FC = () => {

  type currencyTypes = "USD" | "EUR" | "GBP";

  interface ICurrencyFormat {
    code: string;
    symbol: string;
    rate: string;
    description: string;
    rate_float: number;
  }


  type Bpi = { [K in currencyTypes]: ICurrencyFormat };

  const [bit, setBit] = useState<Bpi[]>([]);
  const [currency, setCurrency] = useState(['USD', 'EUR', 'GBP']);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        'https://api.coindesk.com/v1/bpi/currentprice.json'
      );
      const data = await res.json();
      setBit(data.bpi)
      setLoading(false)
    }
    fetchData()
  }, [])

  const currency_symbols = {
    'USD': '$',
    'EUR': '€',
    'GBP': '£'
  };

  return (
    <div>
      {loading ? (
        <h1>Loading</h1>
      ) : (
          <Container>
            <h1>BitCoin Vision</h1>
            <CurrencyBox>
              {currency.map(e => (
                <CurrencyButton>
                  <h1>{bit[e].code}</h1>
                  <h2>{currency_symbols[e]}  {bit[e].rate}</h2>
                </CurrencyButton>))}
            </CurrencyBox>
          </Container>
        )
      }
    </div >
  )
}

export default Home;
