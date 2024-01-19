import React from 'react';
import { FaSearch } from 'react-icons/fa';

const ConversionSearch = () => {
    return (
        <div className="w">
            <div className="search">
                <input type="text" className="searchTerm" placeholder="What are you looking for?" />
                <button type="submit" className="searchButton">
                    <FaSearch />
                </button>
            </div>
        </div>
    );
};

export default ConversionSearch;