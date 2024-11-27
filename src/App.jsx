import React, { useState } from 'react';
import './App.scss';

import FilterByUser from './api/components/FilterByUser';
import SearchField from '../src/api/components/SearchField';
import FilterByCategory from '../src/api/components/FilterByCategory';
import ResetFilters from '../src/api/components/ResetFilters';
import ProductTable from '../src/api/components/ProductTable';

import productsFromServer from './api/products';
import categoriesFromServer from './api/categories';
import usersFromServer from './api/users';

const prepareProducts = (products, categories, users) =>
  products.map((product) => {
    const category = categories.find((cat) => cat.id === product.categoryId);
    const owner = users.find((user) => user.id === category.ownerId);

    return {
      ...product,
      category,
      owner,
    };
  });

export const App = () => {
  const [products, setProducts] = useState(
    prepareProducts(productsFromServer, categoriesFromServer, usersFromServer)
  );

  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const filteredProducts = products.filter((product) => {
    const matchesUser =
      !selectedUser || product.owner.id === selectedUser.id;
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category.id);
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesUser && matchesCategory && matchesSearch;
  });

  const sortProducts = (products, sortConfig) => {
    if (!sortConfig.key) return products;
    return [...products].sort((a, b) => {
      const order = sortConfig.direction === 'ascending' ? 1 : -1;
      if (a[sortConfig.key] < b[sortConfig.key]) return -1 * order;
      if (a[sortConfig.key] > b[sortConfig.key]) return 1 * order;
      return 0;
    });
  };

  const sortedProducts = sortProducts(filteredProducts, sortConfig);

  const resetFilters = () => {
    setSelectedUser(null);
    setSelectedCategories([]);
    setSearchTerm('');
    setSortConfig({ key: null, direction: null });
  };

  const toggleCategory = (categoryId) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(categoryId)
        ? prevSelected.filter((id) => id !== categoryId)
        : [...prevSelected, categoryId]
    );
  };

  const handleSort = (key) => {
    setSortConfig((prevSort) => {
      if (prevSort.key === key) {
        if (prevSort.direction === 'ascending') {
          return { key, direction: 'descending' };
        } else if (prevSort.direction === 'descending') {
          return { key: null, direction: null };
        }
      }
      return { key, direction: 'ascending' };
    });
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="title" data-cy="Title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <FilterByUser
              users={usersFromServer}
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
            />

            <SearchField
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />

            <FilterByCategory
              categories={categoriesFromServer}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              toggleCategory={toggleCategory}
            />

            <ResetFilters resetFilters={resetFilters} />
          </nav>
        </div>

        <ProductTable
          products={sortedProducts}
          sortConfig={sortConfig}
          handleSort={handleSort}
        />
      </div>
    </div>
  );
};

export default App;