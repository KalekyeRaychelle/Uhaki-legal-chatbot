import React from 'react'
import { IconSearch } from '@tabler/icons-react';
import '../Styles/SearchBar.css'
const SearchBar = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory
}) => {
  return (
    <div className='search-bar'>
      <div className='search-toggle'>
        <input
          type="text"
          placeholder="Search acts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button><IconSearch size={16} /></button>
      </div>
      <div className='floatCircle'>
      <button
        onClick={() => setSelectedCategory('all')}
        className={selectedCategory === 'all' ? 'active' : ''}
      >
        All
      </button>

      <button
        onClick={() => setSelectedCategory('employment')}
        className={selectedCategory === 'employment' ? 'active' : ''}
      >
        Employment
      </button>

      <button
        onClick={() => setSelectedCategory('property')}
        className={selectedCategory === 'property' ? 'active' : ''}
      >
        Tenants
      </button>

      <button
        onClick={() => setSelectedCategory('family')}
        className={selectedCategory === 'family' ? 'active' : ''}
      >
        Family
      </button>

      <button
        onClick={() => setSelectedCategory('business')}
        className={selectedCategory === 'business' ? 'active' : ''}
      >
        Business
      </button>
    </div>
        </div>
  )
}

export default SearchBar
