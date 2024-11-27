import React from 'react';

const SearchField = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="panel-block">
      <p className="control has-icons-left has-icons-right">
        <input
          data-cy="SearchField"
          type="text"
          className="input"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <span className="icon is-right">
            <button
              data-cy="ClearButton"
              type="button"
              className="delete"
              onClick={() => setSearchTerm('')}
            />
          </span>
        )}
      </p>
    </div>
  );
};

export default SearchField;