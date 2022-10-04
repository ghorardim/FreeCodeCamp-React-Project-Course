import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AppContext = React.createContext();
const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';

const AppProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const selectMeal = (idMeal, favoriteMeal) => {
    console.log(idMeal);
    let meal;
    meal = meals.find((meal) => meal.idMeal === idMeal);
    setSelectedMeal(meal);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const fetchMeals = async (url) => {
    setLoading(true);
    console.log('url: ', url);
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
    fetchMeals(randomMealUrl);
  };
  useEffect(() => {
    fetchMeals(allMealsUrl + 'a');
  }, []);
  useEffect(() => {
    if (searchTerm) fetchMeals(`${allMealsUrl}${searchTerm}`);
  }, [searchTerm]);
  const addToFavorites = (idMeal) => {
    const alreadyFavorite = favorites.find((meal) => meal.idMeal === idMeal);
    if (alreadyFavorite) return;
    const meal = meals.find((meal) => meal.idMeal === idMeal);
    const updatedFavorites = [...favorites, meal];
    setFavorites(updatedFavorites);
  };
  const removeFromFavorites = (idMeal) => {
    const updatedFavorites = favorites.filter((meal) => meal.idMeal !== idMeal);
    setFavorites(updatedFavorites);
  };
  return (
    <AppContext.Provider
      value={{
        meals,
        loading,
        setSearchTerm,
        fetchRandomMeal,
        showModal,
        setShowModal,
        selectMeal,
        selectedMeal,
        closeModal,
        favorites,
        addToFavorites,
        removeFromFavorites
      }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };

export const useGlobalContext = () => {
  return useContext(AppContext);
};
