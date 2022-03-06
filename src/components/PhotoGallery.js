import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Gallery from 'react-grid-gallery';
import {message} from 'antd';
import axios from 'axios';
import {BASE_URL, TOKEN_KEY, USERNAME} from '../constants';


const captionStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    maxHeight: "240px",
    overflow: "hidden",
    position: "absolute",
    bottom: "0",
    width: "100%",
    color: "white",
    padding: "2px",
    fontSize: "90%"
};

const wrapperStyle = {
    display: "block",
    minHeight: "1px",
    width: "100%",
    border: "1px solid #ddd",
    overflow: "auto"
};

function PhotoGallery(props) {
    const [images, setImages] = useState(props.images);
    const [curImgIdx, setCurImgIdx] = useState(0);

    useEffect(()=>{setImages(props.images)},[props.images])

    const imageArr = images.map(image => {//how many times - this process?
        return {
            ...image,
            customOverlay: (
                <div style={captionStyle}>
                    <div>{`${image.user}: ${image.caption}`}</div>
                </div>
            )
        }}
    )

    const onCurrentImageChange = index => {
        setCurImgIdx(index)
    };

    const onDeleteImage = ()=> {
        // step1: get current selected image
        // step2: remove selected image from the array
        // step3: send delete req to the server
        // step4: analyze response from the server
        //      case1:success -> update display area
        //      case2:fail -> warning
        const curImage = images[curImgIdx];

        if( localStorage.getItem(USERNAME) === curImage.user) {
            if (window.confirm('Are you sure to delete the photo?')) {
                // const curImage = images[curImgIdx];
                const newImageArr = images.filter((img, index) => index !== curImgIdx);
                const opt = {
                    method: 'DELETE',
                    url: `${BASE_URL}/post/${curImage.postId}`,
                    headers: {'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`}
                };
                axios(opt)
                    .then(res => {
                        if (res.status === 200) {
                            setImages(newImageArr);
                            if(curImgIdx > newImageArr.length - 1) {
                                setCurImgIdx(curImgIdx - 1);
                            }
                        }
                    })
                    .catch(err => {
                        message.error('fetch post failed');
                        console.log('fetch post failed: ', err.message);
                    })
            }
        } else {window.confirm('You can not delete this message')}
    };

    return (
        <div style={wrapperStyle}>
            <Gallery
                images={imageArr}
                backdropClosesModal={true}
                enableImageSelection={false}
                currentImageWillChange={onCurrentImageChange}
                customControls={[
                    <button
                        style={{marginTop: "10px", marginLeft: "5px"}}
                        key="deleteImage"
                        onClick={onDeleteImage}
                    >Delete</button>
                ]}
            />
        </div>
    );
}

PhotoGallery.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            user:PropTypes.string.isRequired,
            caption: PropTypes.string.isRequired,
            src: PropTypes.string.isRequired,
            thumbnail: PropTypes.string.isRequired,
            thumbnailWidth: PropTypes.number.isRequired,
            thumbnailHeight: PropTypes.number.isRequired,
        })
    ).isRequired
};
export default PhotoGallery;