import React, {Component} from 'react';
import {Button, Modal, message} from 'antd';
import axios from 'axios';
import PostForm from './PostForm';
import {BASE_URL, TOKEN_KEY} from '../constants';
import {EditOutlined} from '@ant-design/icons';

class CreatePostButton extends Component {
    state={
        visible:false,
        confirmLoading: false,
    }
    showModal = ()=>{
        this.setState({visible: true})
    }
    handleOk = () => {
        this.setState({
            confirmLoading: true,
        })
        //step1: get file and message
        //step2: send uploading req to the server
        //step3: analyze the response
        this.form
            .validateFields()
            .then(form=>{
                console.log('form ->', form);
                const {description, uploadPost} = form;
                const {type, originFileObj} = uploadPost[0];
                const postType = type.match(/^(image|video)/g)[0];
                console.log(type,originFileObj,postType);
                if(postType) {
                    let formData = new FormData();//????
                    formData.append('message', description);
                    formData.append('media_file', originFileObj);

                    const opt = {
                        method: 'POST',
                        url: `${BASE_URL}/upload`,
                        headers: {'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`},
                        data: formData,
                    };
                    axios(opt)
                        .then(res => {
                            if (res.status === 200) {
                                message.success('Post uploaded');
                                this.form.resetFields();
                                this.handleCancel();
                                this.props.onShowPost(postType);
                                this.setState({confirmLoading: false});
                            }
                        })
                        .catch(err => {
                            message.error('failed to upload post');
                            console.log('failed to upload post', err.message);
                        })
                }
            })
            .catch(err => {
                console.log('error in validating form: ', err.message);
            })
    }
    handleCancel = ()=>{
        this.setState({visible:false})
    }
    render() {
        return (
            <div>
                <Button className='new-post' icon = {<EditOutlined/>} onClick={this.showModal}>
                    New Post
                </Button>
                <Modal
                    title='Create New Post'
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    okText='Create'
                    confirmLoading={this.state.confirmLoading}
                    onCancel={this.handleCancel}
                >
                    <PostForm ref={
                        refInstance => {
                            console.log(refInstance);
                            this.form = refInstance;
                            return this.form
                        }
                    }/>
                </Modal>
            </div>
        );
    }
}

export default CreatePostButton;