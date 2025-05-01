import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    onSearch(value); // Pass the search term to the parent component
  };

  return (
    <div className="mb-4">
      <div className="input-group">
        <span className="input-group-text">
          <i className="bi bi-search"></i>
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Search users by name..."
          value={searchInput}
          onChange={handleChange}
          aria-label="Search users"
        />
        {searchInput && (
          <button 
            className="btn btn-outline-secondary" 
            type="button"
            onClick={() => {
              setSearchInput('');
              onSearch('');
            }}
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;