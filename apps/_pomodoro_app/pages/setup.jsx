import React from 'react'
import { Form, InputNumber, Button, message } from 'antd'
import Text from 'antd/lib/typography/Text'
import { ArrowRightOutlined } from '@ant-design/icons'
import Layout from '../components/Layout'
import { postTimer } from '../components/TimerApi'
import { useRouter } from 'next/router'


export default function Setup() {
    const router = useRouter()
    const onFinish = values => {
        const intervalsJson = {
            break: values.break*60,
            workTime: values.workTime*60,
            bigBreak: values.bigBreak*60
        }
        const id = postTimer(intervalsJson)
        router.push(`/${id}`);
    };

    const onFinishFailed = errorInfo => {
        console.log(errorInfo)
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
                            name="workTime"
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