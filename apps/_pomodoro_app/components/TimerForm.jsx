import React from 'react'
import {Modal, Button, Input, Typography, InputNumber, Form, Alert, Row, Col, TimePicker} from 'antd';
import './TimerForm.less'
import moment from 'moment';

const { Title, Paragraph, Text } = Typography;

export default function TimerForm(props) {
    return (
        <div>
            <Title level={2}>Set up periods length</Title>
            <Form
                name="periods-length"
                onFinish={props.onFinish}
                onFinishFailed={props.onFinishFailed}
            >
                <Row>
                    <Col span={6} className='timer-form-text'>
                        <Form.Item
                            label="Work"
                            className='timer-form-text'
                            name="workLength"
                        >
                            <InputNumber
                                className='timer-form-text'
                                size="medium"
                                defaultValue={25}
                                min={1}
                                max={60}
                                formatter={value => `${value}m`}
                                parser={value => value.replace('m', '')}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={6} className='timer-form-text'>
                        <Form.Item
                            label="Break"
                            className='timer-form-text'
                            name="shortBreakLength"
                        >
                            <InputNumber
                                className='timer-form-text'
                                size="medium"
                                defaultValue={5}
                                min={1}
                                max={60}
                                formatter={value => `${value}m`}
                                parser={value => value.replace('m', '')}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={6} className='timer-form-text'>
                        <Form.Item
                            label="Big break"
                            className='timer-form-text'
                            name="longBreakLength"
                        >
                            <InputNumber
                                className='timer-form-text'
                                size="medium"
                                defaultValue={30}
                                min={1}
                                max={60}
                                formatter={value => `${value}m`}
                                parser={value => value.replace('m', '')}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="timer-form-button"
                            >
                                Start
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}