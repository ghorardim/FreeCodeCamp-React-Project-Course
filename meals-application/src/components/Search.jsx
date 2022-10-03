import React, { useState } from 'react';
import { useGlobalContext } from '../context';
const Search = () => {
  return (
    <header className="search-container">
      <form>
        <input
          type="text"
          placeholder="type favorite meal"
          className="form-input"
        />
        <button type="submit" className="btn">
          search
        </button>
        <button type="btn" className="btn btn-hipster">
          suprise me !
        </button>
      </form>
    </header>
  );
};

export default Search;