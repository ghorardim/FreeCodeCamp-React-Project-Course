import { useState, useEffect } from 'react';
import finnHub from '../apis/finnHub';
export const AutoComplete = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const res = await finnHub.get('search', {
          params: {
            q: search,
          },
        });
        if (isMounted) setResults(res.data.result);
      } catch (error) {}
    };
    if (search) fetchData();
    else setResults([]);
    return () => (isMounted = false);
  }, [search]);
  const renderDropdown = () => {
    const dropDownClass = results.length > 0 ? 'show' : null;
    return (
      <ul
        className={`dropdown-menu ${dropDownClass}`}
        style={{
          height: '500px',
          overflowY: 'scroll',
          overflowX: 'hidden',
          cursor: 'pointer',
        }}>
        {results.map((stock) => {
          return (
            <li key={stock.symbol}className="dropdown-item">
              {stock.description} ({stock.symbol})
            </li>
          );
        })}
      </ul>
    );
  };
  return (
    <div className="w-50 p-5 rounded mx-auto">
      <div className="form-floating dropdown">
        <input
          style={{ backgroundColor: 'rgba(145, 158, 171, 0.04)' }}
          id="search"
          type="text"
          className="form-control"
          placeholder="Search"
          autoComplete="off"
          value={search}
          onChange={(e) => setSearch(e.target.value)}></input>
        <label htmlFor="search">Search</label>
        {renderDropdown()}
      </div>
    </div>
  );
};
