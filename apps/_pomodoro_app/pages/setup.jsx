import React from 'react'
import { Form, InputNumber, Button, Space } from 'antd'
import Text from 'antd/lib/typography/Text'
import { ArrowRightOutlined } from '@ant-design/icons'
import Layout from '../components/Layout'


export default function Setup() {
    //TODO(tramakarov): Implement onFinish actions
    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return(
        <Layout>
            <div className='wrapper padding-40px'>
                <Text className='text-30px black'>Set up timer periods in minutes</Text>
            </div>
            <Form
                name="invite-code-form"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <div className='wrapper'>
                    <div className='text-24px'>
                        Work
                        <Form.Item
                            className='text-24px'
                            name="work"
                            rules={[{ required: true, message: 'Set up this period please' }]}
                            initialValue={25}
                        >
                            <InputNumber defaultValue={25} size="large" min={1} max={60} className='text-20px' />
                        </Form.Item>
                    </div>

                    <div className='text-24px'>
                        Break
                        <Form.Item
                            className='text-24px'
                            name="break"
                            rules={[{ required: true, message: 'Set up this period please' }]}
                            initialValue={5}
                        >
                            <InputNumber size="large" min={1} max={60} defaultValue={5} className='text-20px' />
                        </Form.Item>
                    </div>

                    <div className='text-24px'>
                        Big break
                        <Form.Item
                            className='text-24px'
                            name="bigBreak"
                            rules={[{ required: true, message: 'Set up this period please' }]}
                            initialValue={30}
                        >
                            <InputNumber size="large" min={1} max={60} defaultValue={30} className='text-20px' />
                        </Form.Item>
                    </div>

                    <Form.Item className='align-bottom'>
                        <Button type="primary" htmlType="submit" className='button-blue' size='large' icon={<ArrowRightOutlined />}/>
                    </Form.Item>
                </div>
            </Form>
        </Layout>
    )
}