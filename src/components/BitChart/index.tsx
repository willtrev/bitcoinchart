import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

import { formatedDate } from '../../util/formatedDate';

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
    const getChartData = async () => {
      const request = 'https://api.coindesk.com/v1/bpi/historical/close.json?start=' + formatedDate(true) + '&end=' + formatedDate(false);
      const res = await fetch(request);
      const data = await res.json();
      const categories = Object.keys(data.bpi)
      const values: number[] = Object.values(data.bpi)
      const usdValues = values.map(e => e.toFixed(2))
      const eurValues = values.map(e => (e * currencyRate.eur).toFixed(2))
      const gbpValues = values.map(e => (e * currencyRate.gbp).toFixed(2))
      setChartData({
        labels: categories,
        datasets: [
          {
            label: 'Bitcoin price in USD',
            data: usdValues,
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: '#4bc0c0'
          },
          {
            label: 'Bitcoin price in EUR',
            data: eurValues,
            fill: false,
            lineTension: 0.1,
            backgroundColor: '#943737',
            borderColor: '#da5353'
          },
          {
            label: 'Bitcoin price in GBP',
            data: gbpValues,
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
