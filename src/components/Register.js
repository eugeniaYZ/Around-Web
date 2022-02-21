import React from 'react';
import {Button, Form, Input} from 'antd'

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 16,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

function Register(props) {
    // const {handleLoggedIn} = props;
    const [form] = Form.useForm();//在干什么？？？？？
    const onFinish = (values) => {
        const {username, password} = values;
        //fetch vs axios
        //consider use util.js to organize communication with BE

    };

    return (
        <Form
            name='register' className='register' onFinish={onFinish}
            {...formItemLayout} form={form}//在干什么？？？？？
        >
            <Form.Item
                name='username' label='Username'
                rules={[{required: true, message: 'Please input your username'}]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name='password' label='Password'
                rules={[{required: true, message: 'Please input your password'}]}
                hasFeedback //在干什么？？？
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                name='confirm' label='Confirm Password'
                dependencies={['password']} hasFeedback
                rules={[
                    {required: true, message: 'Please input your password'},
                    ({getFieldValue}) => ({//({}) =>({})这个结构是啥????
                        validator(rule, value) {
                            if (!value || getFieldValue('password') ===value) {
                                return Promise.resolve();
                            }
                            return Promise.reject('Passwords do not match!');
                        },
                    }), //({}) =>({})这个结构是啥????
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
                <Button type='primary' shape='round' htmlType='submit' className='register-button'>
                    Register
                </Button>
            </Form.Item>
        </Form>
    );
}
export default Register;