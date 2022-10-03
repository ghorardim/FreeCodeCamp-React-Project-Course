import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AppContext = React.createContext();
const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';

const AppProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
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
  const fetchRandomMeal = () => {
    fetchMeals(randomMealUrl)
  }
  useEffect(() => {
    fetchMeals(allMealsUrl+'a');
  }, []);
  useEffect(() => {
    fetchMeals(`${allMealsUrl}${searchTerm}`);
  }, [searchTerm]);
  return (
    <AppContext.Provider value={{ meals, loading, setSearchTerm, fetchRandomMeal }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };

export const useGlobalContext = () => {
  return useContext(AppContext);
};
