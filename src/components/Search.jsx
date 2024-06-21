import React from 'react';

const Search = ({ setSearchTerm }) => {
  return (
    <div className='w-full flex justify-center  py-2'>
        <input
      className='rounded-xl border-none outline-none  bg-transparent'
      type="text"
      placeholder="Search Pokémon..."
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    </div>
  );
};

export default Search;
