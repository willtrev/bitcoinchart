import { useState, useEffect } from 'react';

import BitChart from '../../components/BitChart';
import CurrencyButton from '../../components/CurrencyButton';

import formatPrice from '../../utils/formatPrice';

import { CurrencyBox, Container, LoadingContainer } from './styles';

import loadingGif from '../../assets/loadingGif.gif';

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
        <LoadingContainer>
          <img src={loadingGif} alt='loading' />
          <h2>Loading...</h2>
        </LoadingContainer>

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
