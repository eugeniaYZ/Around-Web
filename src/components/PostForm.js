import React, {forwardRef} from 'react';
import {Form, Input, Upload} from 'antd';
import {InboxOutlined} from '@ant-design/icons';

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 }
};


const PostForm = forwardRef((props, formRef) => {
    const normFile = e => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };//!!!!!

    return (
        <Form
            name='validate_other'
            {...formItemLayout}
            ref={formRef}
        >
            <Form.Item
                name='description'
                label='Message'
                rules={[
                    {
                        required: true,
                        message: 'Please input your post'
                    }
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name='uploadPost'
                valuePropName='fileList'
                getValueFromEvent={normFile}///!!!!!
                noStyle
                rules={[
                    {
                        required: true,
                        message: 'Please select an image/video!'
                    }
                ]}
            >
                <Upload.Dragger name='files' beforeUpload={()=>false}>
                    {/*beforeUpload!!!!*/}
                    <p className='ant-upload-drag-icon'>
                        <InboxOutlined />
                    </p>
                    <p className='ant-upload-text'>
                        Click or drag file to this area to upload
                    </p>
                </Upload.Dragger>
            </Form.Item>
        </Form>
    );
});

export default PostForm;