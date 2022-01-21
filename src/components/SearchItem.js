import React from 'react';

export const SearchItem = ({ search, setSearch, handleSearch }) => {
  return (
    <form className='searchForm' onSubmit={handleSearch}>
        <label htmlFor='search'>search</label>
        <input
            id='search'
            type='text'
            role='searchbox'
            placeholder='search items'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
    </form>
  );
};
