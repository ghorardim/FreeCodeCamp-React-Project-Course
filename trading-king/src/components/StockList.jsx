import { useState, useEffect } from 'react';
import finnHub from '../apis/finnHub';

export const StockList = () => {
  const [stock, setStock] = useState([]);
  const [watchList, setWatchList] = useState(['GOOGL', 'MSFT', 'AMZN']);
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const responses = await Promise.all(
          watchList.map((watch) => {
            return finnHub.get('quote', {
              params: {
                symbol: watch,
              },
            });
          })
        );
        console.log(responses);
        if (isMounted) setStock(responses);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    return () => (isMounted = false);
  }, [watchList]);
  return <div>StockList</div>;
};