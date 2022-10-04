import React, { useState } from 'react';
import { useGlobalContext } from '../context';
const Search = () => {
  const [text, setText] = useState('');
  const { setSearchTerm, fetchRandomMeal } = useGlobalContext();
  function handleChange(e) {
    console.log(e.target.value);
    setText(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (text) {
      setSearchTerm(text);
    }
  }

  const handleRandomMeal = () => {
    setSearchTerm('')
    setText('')
    fetchRandomMeal()
  }


  return (
    <header className="search-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="type favorite meal"
          className="form-input"
          onChange={handleChange}
          value={text}
        />
        <button type="submit" className="btn">
          search
        </button>
        <button type="btn" className="btn btn-hipster" onClick={handleRandomMeal}>
          suprise me !
        </button>
      </form>
    </header>
  );
};

export default Search;
