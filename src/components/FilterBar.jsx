import React from "react";
import PropTypes from "prop-types"; 

const FilterBar = ({ filter, setFilter, theme }) => {
  return (
    <div className={`filter-bar ${theme}`}>
      {['all', 'completed', 'pending'].map((f) => (
        <button
          key={f}
          className={filter === f ? "active" : ""}
          onClick={() => setFilter(f)}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );
};

FilterBar.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
  theme: PropTypes.string, 
};

export default React.memo(FilterBar);
