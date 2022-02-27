import React, {useState} from 'react';
import {Input, Radio} from 'antd';
import {SEARCH_KEY} from '../constants';

const {Search} = Input;

function SearchBar(props) {

    const [searchType, setSearchType] = useState(SEARCH_KEY.all);
    const [error, setError] = useState('');

    const handleSearch = value => {
        if (searchType !== SEARCH_KEY.all && value === '') {
            setError('Please input your search text');
            return;
        }
        setError('');
    };

    const changeSearchType = e => {
        setSearchType(e.target.value);
        setError('');
    }

    return (
        <div className='search-bar'>
            <Search
                placeholder="input search text"
                enterButton="Search"
                size="large"
                onSearch={handleSearch}
                disabled={searchType===SEARCH_KEY.all}
            />
            <p className='error-msg'>{error}</p>
            <Radio.Group
                className='search-type-group'
                onChange={changeSearchType}
                value={searchType}>
                <Radio value={SEARCH_KEY.all}>All</Radio>
                <Radio value={SEARCH_KEY.keyword}>Keyword</Radio>
                <Radio value={SEARCH_KEY.user}>User</Radio>
            </Radio.Group>
        </div>
    );
}

export default SearchBar;