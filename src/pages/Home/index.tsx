import { useState, useEffect } from 'react';

import BitChart from '../../components/BitChart';
import CurrencyButton from '../../components/CurrencyButton';

import formatPrice from '../../utils/formatPrice';

import { CurrencyBox, Container } from './styles';

import useApi from '../../hooks/useApi';

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const currency = ['USD', 'EUR', 'GBP'];

  const bitcoinPriceIndex = useApi();

  useEffect(() => {
    if (Object.keys(bitcoinPriceIndex).length > 0) {
      setLoading(false)
    }
  }, [bitcoinPriceIndex])

  return (
    <div>
      {loading ? (
        <h1>Loading</h1>
      ) : (
          <Container>
            <h1>BitCoin Vision</h1>
            <CurrencyBox>
              {currency.map(currencyType => (
                <CurrencyButton key={bitcoinPriceIndex[currencyType].code}>
                  <h1>{bitcoinPriceIndex[currencyType].code}</h1>
                  <h2>{formatPrice(bitcoinPriceIndex[currencyType].rate_float, bitcoinPriceIndex[currencyType].code)}</h2>
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
