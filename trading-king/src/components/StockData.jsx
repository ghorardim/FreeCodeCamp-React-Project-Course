import { useState, useEffect } from 'react';
import finnHub from '../apis/finnHub';

export const StockData = ({ symbol }) => {
  const [stockData, setStockData] = useState();
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      const response = await finnHub.get('/stock/profile2', {
        params: {
          symbol,
        },
      });
      setStockData(response.data);
    };
    if (isMounted) fetchData();

    /*
    /// practice fetch api......

    let baseUrl = new URL('https://finnhub.io');
    const TOKEN = 'ccv5heaad3iaeesdgdj0ccv5heaad3iaeesdgdjg';
    let url = new URL(`/api/v1/stock/profile2?token=${TOKEN}&symbol=${symbol}`, baseUrl);
    const fetchData = () => {
        const response = fetch(url);
        response.then((res) => res.json())
                .then((json) => console.log(json));
        console.log('response: ',response); // just promise
    };
    fetchData();
    */

    /*
    /// practice fetch api......

    let baseUrl = new URL('https://finnhub.io');
    const TOKEN = 'ccv5heaad3iaeesdgdj0ccv5heaad3iaeesdgdjg';
    let url = new URL(`/api/v1/stock/profile2?token=${TOKEN}&symbol=${symbol}`, baseUrl);
    const fetchData = async () => {
        const response = await fetch(url)
        .then((res) => res.json())
        .then((json) => json);
        console.log('response: ',response); // received data
    };
    if (isMounted) fetchData();
    */
    return () => (isMounted = false);
  }, [symbol]);
  return (
    <div>
      {stockData && (
        <div className="row border bg-white rounded shadow-sm p-4 mt-5">
          <div className="col">
            <div>
              <span className="fw-bold">name: </span>
              {stockData.name}
            </div>
            <div>
              <span className="fw-bold">country: </span>
              {stockData.country}
            </div>
            <div>
              <span className="fw-bold">ticker: </span>
              {stockData.ticker}
            </div>
          </div>
          <div className="col">
            <div>
              <span className="fw-bold">Exchange: </span>
              {stockData.exchange}
            </div>
            <div>
              <span className="fw-bold">Industry: </span>
              {stockData.finnhubIndustry}
            </div>
            <div>
              <span className="fw-bold">IPO: </span>
              {stockData.ipo}
            </div>
          </div>
          <div className="col">
            <div>
              <span className="fw-bold">MarketCap: </span>
              {stockData.marketCapitalization}
            </div>
            <div>
              <span className="fw-bold">Shares Outstanding: </span>
              {stockData.shareOutstanding}
            </div>
            <div>
              <span className="fw-bold">url: </span>
              <a href={stockData.weburl}>{stockData.weburl}</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};