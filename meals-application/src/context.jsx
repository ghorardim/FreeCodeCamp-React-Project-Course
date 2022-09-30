import React, { useContext, useEffect } from 'react';
import axios from 'axios';

const AppContext = React.createContext();
const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?f=a';
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';

const AppProvider = ({ children }) => {
  const fetchMeals = async (url) => {
    try {
      const response = await axios(url);
      const {data} = response;
      console.log(data);
    } catch (e) {
      console.log(e.response);
    }
  };
  useEffect(() => {
    fetchMeals(allMealsUrl);
  }, []);
  return ( 
    <AppContext.Provider value={{ allMealsUrl }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };

export const useGlobalContext = () => {
  return useContext(AppContext);
};
