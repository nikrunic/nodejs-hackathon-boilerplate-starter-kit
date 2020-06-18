import React from 'react'
import { Form, Input, Button, Typography} from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons'
import './BlockComponentsStyles.less'
import WorkingPeople from '../public/images/WorkingPeople'

const { Text } = Typography;

export default function InviteLinkBlock() {
    //TODO(tramakarov): Implement onFinish actions
    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    return(
        <React.Fragment>
            <div className='background'>
                <div className='inner-content'>
                    <div>
                        <Text className='heading'>Enter Code</Text>
                    </div>
                    <Text className='text-20px'>To sync with colleagues</Text>
                    <div className='margin-top-20px'>
                        <Form
                            name="invite-code-form"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <Form.Item
                                className='no-wrap'
                                name="code"
                                rules={[{ required: true, message: 'Enter code here please' }]}
                            >
                                <Input placeholder="Code" className='no-wrap text-20px' size='large'/>
                            </Form.Item>
                            &nbsp;&nbsp;&nbsp;
                            <Form.Item className='no-wrap'>
                                <Button type="primary" htmlType="submit" className='button-blue no-wrap' size='large' icon={<ArrowRightOutlined />}/>
                            </Form.Item>
                        </Form>
                    </div>
                    <div className='icon-wrapper'>
                        <WorkingPeople />
                    </div>
                </div>
            </div>
        </React.Fragment>
    )

}