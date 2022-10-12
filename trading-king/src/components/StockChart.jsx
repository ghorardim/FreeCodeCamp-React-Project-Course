import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

export default function StockChart({ chartData, symbol }) {
  const [dateFormat, setDateFormat] = useState('24h');
  const { day, week, year } = chartData;
  const [color, setColor] = useState('');

  const determineTimeFormat = () => {
    switch (dateFormat) {
      case '24h':
        return day;
      case '7d':
        return week;
      case '1y':
        return year;
      default:
        return day;
    }
  };

  const handleColor = () => {
    let data = determineTimeFormat(dateFormat);
    return data.length > 0 && data[data.length - 1].y - data[0].y > 0 ? '#26C281' : '#ed3419';
  };

  const options = {
    colors: [color],
    title: {
      text: symbol,
      align: 'center',
      style: {
        fontSize: '24px',
      },
    },
    chart: {
      id: 'stock data',
      animations: {
        speed: 1300,
      },
    },
    xaxis: {
      type: 'datetime',
      labels: {
        datetimeUTC: true,
      },
    },
    tooltip: {
      x: {
        format: 'MMM dd HH:MM',
      },
    },
  };
  const series = [
    {
      name: symbol,
      data: determineTimeFormat(),
    },
  ];

  const renderButtonSelect = (button) => {
    const classes = 'btn m-1 ';
    if (button === dateFormat) {
      return classes + 'btn-primary';
    } else {
      return classes + 'btn-outline-primary';
    }
  };

  const handleDataView = (dateFormat) => {
    setDateFormat(dateFormat);
    setColor(handleColor());
  };

  useEffect(() => {
    if (day) setColor(handleColor());
  }, [day]);

  return (
    <div className="mt-5 p-4 shadow-sm bg-white">
      <Chart options={options} series={series} type="area" width="100%" />
      <div>
        <button className={renderButtonSelect('24h')} onClick={() => handleDataView('24h')}>
          24h
        </button>
        <button className={renderButtonSelect('7d')} onClick={() => handleDataView('7d')}>
          7d
        </button>
        <button className={renderButtonSelect('1y')} onClick={() => handleDataView('1y')}>
          1y
        </button>
      </div>
    </div>
  );
}