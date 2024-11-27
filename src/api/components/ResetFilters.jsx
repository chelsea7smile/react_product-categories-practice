import React from 'react';

const ResetFilters = ({ resetFilters }) => (
  <div className="panel-block">
    <a
      data-cy="ResetAllButton"
      href="#/"
      className="button is-link is-outlined is-fullwidth"
      onClick={resetFilters}
    >
      Reset all filters
    </a>
  </div>
);

export default ResetFilters;