import React from 'react';
import '../css/SearchBar.css';
import SearchIcon from '@mui/icons-material/Search';
const SearchBar = () => {
    return (
        <div className="search-bar">
            <input type="text" placeholder="Search..." />
        
            <button type="submit"><SearchIcon/></button>
        </div>
    );
}

export default SearchBar;
