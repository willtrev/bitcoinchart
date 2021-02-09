import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

import apiResponse from '../../utils/apiResponse';
import formatedDate from '../../utils/formatedDate';

const BitChart: React.FC = () => {

  const [chartData, setChartData] = useState({});
  // eslint-disable-next-line
  const [currencyRate, setCurrencyRate] = useState(() => {
    const rate = localStorage.getItem('conversionRate');
    if (rate) {
      return JSON.parse(rate);
    }
  });


  useEffect(() => {
    const dataValues = (data: {}) => {
      const values: number[] = Object.values(data);

      const allValues = {
        usdValues: values.map(usdValue => usdValue.toFixed(2)),
        eurValues: values.map(usdValue => (usdValue * currencyRate.eur).toFixed(2)),
        gbpValues: values.map(usdValue => (usdValue * currencyRate.gbp).toFixed(2))
      };

      return allValues;
    }

    const getChartData = async () => {
      const historicalData = await apiResponse(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${formatedDate(true)}&end=${formatedDate(false)}`)

      const categories = Object.keys(historicalData);

      const historicalDataValues = dataValues(historicalData);

      setChartData({
        labels: categories,
        datasets: [
          {
            label: 'Bitcoin price in USD',
            data: historicalDataValues.usdValues,
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: '#4bc0c0'
          },
          {
            label: 'Bitcoin price in EUR',
            data: historicalDataValues.eurValues,
            fill: false,
            lineTension: 0.1,
            backgroundColor: '#943737',
            borderColor: '#da5353'
          },
          {
            label: 'Bitcoin price in GBP',
            data: historicalDataValues.gbpValues,
            fill: false,
            lineTension: 0.1,
            backgroundColor: '#929437',
            borderColor: '#d1da53'
          }
        ],

      })
    }

    getChartData()
  }, [currencyRate])

  return (
    <div>
      <Line data={chartData} width={1000} height={500} />
    </div>
  );
}

export default BitChart;
