import React from 'react'
import { IconSearch } from '@tabler/icons-react';
import '../Styles/SearchBar.css'
const SearchBar = () => {
  return (
    <div className='search-bar'>
      <div className='search-toggle'>
        <input/>
        <button><IconSearch size={16} /></button>
      </div>
      <div className='floatCircle'>
        <button>All</button>
        <button>Employment</button>
        <button>Tenants</button>
        <button>Family</button>
        <button>Business</button>
      </div>
    </div>
  )
}

export default SearchBar
