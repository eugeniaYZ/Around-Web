import React from 'react';
import {Form, Input, Button, message, Col, Row} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom'
import axios from 'axios'
import {BASE_URL} from '../constants'

function Login(props) {
    const {handleLogin} = props;

    const onFinish = (values) => {
        const {username, password} = values;
        const opt = {
            method:'POST',
            url: `${BASE_URL}/signin`,
            data: {
                username: username,
                password: password
            },
            header: {'Content-Type': 'application/json'}
        };
        axios(opt)
            .then(response => {
            if (response.status ===200) {
                const {data} = response;
                handleLogin(data, username);
                message.success('Login succeed')
            }
        })
            .catch(err => {
                console.log('login failed: ', err.message);
                message.error('Login failed')
            });
        //fetch vs axios
        //consider use util.js to organize communication with BE
    };

    return (
        <Form name='normal_login' className='login-form' onFinish={onFinish}>
            <Form.Item
                name='username'
                rules={[{required: true, message: 'Please input your username'}]}
            >
                <Input
                    prefix={<UserOutlined className='site-form-item-icon' />}
                    placeholder='Username'
                />
            </Form.Item>
            <Form.Item
                name='password'
                rules={[{required: true, message: 'Please input your password'}]}
            >
                <Input.Password
                    prefix={<LockOutlined className='site-form-item-icon' />}
                    placeholder='Password'
                    type='password'
                />
            </Form.Item>
            <Form.Item>
                <Row justify='space-around' align='middle'>
                    <Col>
                        <Button type='primary' htmlType='submit' className='login-form-button'>
                            Log in
                        </Button>
                    </Col>
                    <Col>
                        <span className='direct-to-register'>
                            or <Link className='link-to-register' to='/register'>register now!</Link>
                        </span>
                    </Col>
                </Row>
            </Form.Item>
        </Form>
    );
}

export default Login;