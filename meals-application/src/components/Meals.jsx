import { useGlobalContext } from '../context';
const Meals = () => {
  const { meals } = useGlobalContext();
  console.log(meals);
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
            />
            <footer>
              <h5>{title}</h5>
              <button className="like-btn">click me</button>
            </footer>
          </article>
        );
      })}
    </section>
  );
};

export default Meals;
