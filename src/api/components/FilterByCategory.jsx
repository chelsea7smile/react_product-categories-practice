import React from 'react';

const FilterByCategory = ({ categories, selectedCategories, setSelectedCategories, toggleCategory }) => {
  return (
    <div className="panel-block is-flex-wrap-wrap">
      <a
        href="#/"
        data-cy="AllCategories"
        onClick={() => setSelectedCategories([])}
        className={selectedCategories.length === 0 ? 'button is-success' : 'button is-outlined'}
      >
        All
      </a>
      {categories.map((category) => (
        <a
          data-cy="Category"
          href="#/"
          key={category.id}
          onClick={() => toggleCategory(category.id)}
          className={`button ${selectedCategories.includes(category.id) ? 'is-info' : ''}`}
        >
          {category.title}
        </a>
      ))}
    </div>
  );
};

export default FilterByCategory;