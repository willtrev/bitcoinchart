import React, { useState, useEffect } from 'react';
import { formatPrice } from '../../util/formatPrice';

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
  const [loading, setLoading] = useState(true);

  const currency = ['USD', 'EUR', 'GBP'];

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

  return (
    <div>
      {loading ? (
        <h1>Loading</h1>
      ) : (
          <Container>
            <h1>BitCoin Vision</h1>
            <p>Select your currency:</p>
            <CurrencyBox>
              {currency.map(e => (
                <CurrencyButton key={bit[e].code}>
                  <h1>{bit[e].code}</h1>
                  <h2>{formatPrice(bit[e].rate_float, bit[e].code)}</h2>

                </CurrencyButton>))}
            </CurrencyBox>
          </Container>
        )
      }
    </div >
  )
}

export default Home;
