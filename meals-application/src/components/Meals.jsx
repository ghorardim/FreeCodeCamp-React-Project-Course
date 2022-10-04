import { useGlobalContext } from '../context';
import { BsHandThumbsUp } from 'react-icons/bs';
const Meals = () => {
  const { meals, loading, selectMeal, addToFavorites } = useGlobalContext();
  console.log(meals);
  console.log(loading);
  if (loading) {
    return (
      <section className="section">
        <h4>Loading...</h4>
      </section>
    );
  }
  if (meals.length < 1) {
    return (
      <section className="section">
        <h4>No meals matched your search term. Please try again.</h4>
      </section>
    );
  }

  return (
    <section className="section-center">
      {meals.map((item) => {
        const { idMeal, strMeal: title, strMealThumb: image } = item;
        return (
          <article key={idMeal} className="single-meal">
            <img
              src={image}
              className="img"
              alt={title + 'image'}
              onClick={() => selectMeal(idMeal)}
            />
            <footer>
              <h5>{title}</h5>
              <button
                className="like-btn"
                onClick={() => addToFavorites(idMeal)}>
                <BsHandThumbsUp />
              </button>
            </footer>
          </article>
        );
      })}
    </section>
  );
};

export default Meals;
