import React from 'react';

const ProductTable = ({ products, sortConfig, handleSort }) => {
  return (
    <div className="box table-container">
      {products.length === 0 ? (
        <p data-cy="NoMatchingMessage">No products matching selected criteria</p>
      ) : (
        <table data-cy="ProductTable" className="table is-striped is-narrow is-fullwidth">
          <thead>
            <tr>
              {['id', 'name', 'category', 'owner'].map((key) => (
                <th key={key}>
                  <span className="is-flex is-flex-wrap-nowrap">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                    <a href="#/" onClick={() => handleSort(key)} className="icon">
                      <i
                        data-cy="SortIcon"
                        className={`fas ${
                          sortConfig.key === key
                            ? sortConfig.direction === 'ascending'
                              ? 'fa-sort-up'
                              : 'fa-sort-down'
                            : 'fa-sort'
                        }`}
                      />
                    </a>
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr data-cy="Product" key={product.id}>
                <td data-cy="ProductId" className="has-text-weight-bold">
                  {product.id}
                </td>
                <td data-cy="ProductName">{product.name}</td>
                <td data-cy="ProductCategory">
                  {product.category.icon} - {product.category.title}
                </td>
                <td
                  data-cy="ProductUser"
                  className={product.owner.sex === 'm' ? 'has-text-link' : 'has-text-danger'}
                >
                  {product.owner.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductTable;