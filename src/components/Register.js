import React from 'react';
import {Button, Form, Input, message} from 'antd'
import {BASE_URL} from '../constants'
import axios from 'axios'

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
        const opt = {
            method: 'POST',
            url: `${BASE_URL}/signup`,
            data: {
                username: username,
                password: password
            },
            headers: {'content-type': 'application/json'}
        };
        axios(opt)
            .then( res => {
                if (res.status ===200) {
                    message.success('Registration succeed');
                    props.history.push('/login');
                    //history 来自BrowserRouter component, 类似stack
                    // push vs. replace 都是压栈，push不会replace
                }
            }).catch(err => {
                message.info('Registration failed',err.message)
        })
        //fetch vs axios
        //consider use util.js to organize communication with BE

    };

    return (
        <Form
            name='register' className='register' onFinish={onFinish}
            {...formItemLayout}
            form={form}// form - array of func
            //Form control instance created by Form.useForm(). Automatically created when not provided
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
                hasFeedback //specifies the validation status icon
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                name='confirm' label='Confirm Password'
                dependencies={['password']}
                hasFeedback
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
                    // (form => {})
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