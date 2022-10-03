import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AppContext = React.createContext();
const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?f=a';
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';

const AppProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchMeals = async (url) => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      const { data } = response;
      setMeals(data.meals ? data.meals : []);
    } catch (e) {
      console.log(e.response);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchMeals(allMealsUrl);
  }, []);
  return (
    <AppContext.Provider value={{ meals, loading }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };

export const useGlobalContext = () => {
  return useContext(AppContext);
};
