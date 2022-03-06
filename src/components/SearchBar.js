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
        props.handleSearch({
            type:searchType,
            keyword:value,
        })
    };

    const changeSearchType = e => {
        const newSearchType = e.target.value;
        setSearchType(newSearchType);
        setError('');

        if (newSearchType===SEARCH_KEY.all){ // newSearchType ok, searchType won't update until function finish
            props.handleSearch({
                type:searchType,
                keyword:'',
            })
        }
    }

    return (
        <div className='search-bar'>
            <Search
                placeholder='put something here to start...'
                enterButton='search'
                onSearch={handleSearch}
                disabled={searchType===SEARCH_KEY.all}
            />
            <p className='error-msg'>{error}</p>
            <Radio.Group
                className='search-type-group'
                onChange={changeSearchType}
                value={searchType}
            >
                <Radio value={SEARCH_KEY.all}>All</Radio>
                <Radio value={SEARCH_KEY.keyword}>Keyword</Radio>
                <Radio value={SEARCH_KEY.user}>User</Radio>
            </Radio.Group>
        </div>
    );
}

export default SearchBar;