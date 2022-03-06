import React, {useState, useEffect} from 'react';
import {Tabs, message, Row, Col} from 'antd';
import axios from 'axios';

import SearchBar from './SearchBar';
import PhotoGallery from './PhotoGallery';
import CreatePostButton from './CreatePostButton';
import {SEARCH_KEY, BASE_URL, TOKEN_KEY} from '../constants';

const {TabPane} = Tabs;

function Home() {
    const [posts, setPosts] = useState([]);
    const [activeTab, setActiveTab] = useState('image')
    const [searchOption, setSearchOption] = useState({
        type: SEARCH_KEY.all,
        keyword: ''
    });

    useEffect(()=> {
        //didMount & didUpdate
        fetchPost(searchOption);
    }, [searchOption]);

    const handleSearch = (option) => {
        // const{type,keyword}=searchOption;
        // console.log('Home - handleSearch...')
        setSearchOption(option);
    }

    const fetchPost = option => {
        const {type, keyword} = option;
        console.log('fetchPost...', type, keyword);

        let url=``;
        if (type===SEARCH_KEY.all) {
            url = `${BASE_URL}/search`;
        } else if (type === SEARCH_KEY.user) {
            url = `${BASE_URL}/search?user=${keyword}`;
        } else if (type === SEARCH_KEY.keyword) {
            url = `${BASE_URL}/search?keywords=${keyword}`;
        }

        const opt = {
            method: 'GET',
            url: url,
            headers: {'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`}
        };
        axios(opt)
            .then(res=>{
                if (res.status === 200) {
                    setPosts(res.data);
                    console.log(res.data)
                }
            })
            .catch(err=>{
                message.error('Fetch posts failed')
                console.log('Fetch posts failed',err.message)
            })
    }

    const renderPosts = type => {
        // case 1 : posts is empty/not existed -> return
        // case 2: type === image -> render <PhotoGallery />
        // case 3: type === video -> render <video />
        if (!posts || posts.length === 0) {
            return <div>No data</div>
        }
        if (type === 'images') {
            // step1:filter all images
            // step2: check all required fields
            // step3: send images to PhotoGalley
            const imageArr = posts.filter(item => item.type==='image')
                .map((image)=>{
                    return {
                        postId: image.id,
                        src: image.url,
                        user: image.user,
                        caption: image.message,
                        thumbnail: image.url,
                        thumbnailWidth: 300,
                        thumbnailHeight: 200
                    };
                });
            return <PhotoGallery images={imageArr} />;
        } else if (type ==='videos') {
            return (
                <Row gutter={32}>
                    {posts.filter(post => post.type==='video')
                            .map(post => (
                                <Col span={8} key={post.url}>
                                    <video
                                    className='video-block'
                                    src={post.url}
                                    controls={true}
                                    />
                                    <p>
                                        {post.user}: {post.message}
                                    </p>
                                </Col>
                            ))}
                </Row>
            )
        }
    };

    const showPost = (type)=> {
        //inform Home to reload all posts, type depends on new post type image/video
        setActiveTab(type);
        setTimeout(() => {
            setSearchOption({type: SEARCH_KEY.all, keyword: ''})
        }, 3000);
    };

    const operations = <CreatePostButton onShowPost={showPost}/>

    return (
        <div className='home'>
            <SearchBar handleSearch={handleSearch}/>
            <div className='display'>
                <Tabs
                    defaultActiveKey="image"
                    activeKey={activeTab}
                    onChange={key=>{setActiveTab(key)}}
                    tabBarExtraContent={operations}
                >
                    <TabPane tab="Images" key="image">
                        {renderPosts('images')}
                    </TabPane>
                    <TabPane tab="Videos" key="video">
                        {renderPosts('videos')}
                    </TabPane>
                </Tabs>

            </div>
        </div>
    );
}

export default Home;