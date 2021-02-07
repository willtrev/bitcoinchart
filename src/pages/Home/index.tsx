import React, { useState, useEffect } from 'react';
import { formatPrice } from '../../util/formatPrice';

import CurrencyButton from '../../components/CurrencyButton';
import BitChart from '../../components/BitChart';
import { CurrencyBox, Container } from './styles';

import useApi from '../../hooks/useApi';

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const currency = ['USD', 'EUR', 'GBP'];

  const api = useApi();

  useEffect(() => {
    if (Object.keys(api).length > 0) {
      setLoading(false)
    }
  }, [api])

  return (
    <div>
      {loading ? (
        <h1>Loading</h1>
      ) : (
          <Container>
            <h1>BitCoin Vision</h1>
            <CurrencyBox>
              {currency.map(e => (
                <CurrencyButton key={api[e].code}>
                  <h1>{api[e].code}</h1>
                  <h2>{formatPrice(api[e].rate_float, api[e].code)}</h2>
                </CurrencyButton>))}
            </CurrencyBox>
            <BitChart />
          </Container>
        )
      }
    </div >
  )
}

export default Home;
