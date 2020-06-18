import React from 'react'
import './BlockComponentsStyles.less'
import { Button, Row, Col, Typography, Space } from 'antd'
import WorkingWoman from '../public/images/WorkingWoman'
import { useRouter } from 'next/router'

const { Text } = Typography;

export default function StartTimerIndexBlock(props) {
    //TODO(tramakarov): Implement routing
    const router = useRouter()
    const startTimer = () => {
        router.push('/TESTTIMER');
    }

    const setupTimer = () => {
        router.push('/setup')
    }

    return (
        <React.Fragment>
            <Row gutter={[50, 0]}>
                <Col>
                    <Row className='heading'>Start working</Row>
                    <Row gutter={[6, 0]}>
                        <Col className='tick'>✓</Col>
                        <Col className='text-24px'>
                            25 min for work
                        </Col>
                    </Row>
                    <Row gutter={[6, 0]}>
                        <Col className='tick'>✓</Col>
                        <Col className='text-24px'>
                            5 min for short break
                        </Col>
                    </Row>
                    <Row gutter={[6, 0]}>
                        <Col className='tick'>✓</Col>
                        <Col className='text-24px'>
                            Longer break after 4 laps
                        </Col>
                    </Row>
                    <div className='text-20px'>
                        <Button
                            className='button button-green white text-24px white letter-spacing'
                            size='large'
                            onClick={startTimer}
                        >
                            LET'S GO!
                        </Button>
                        <Button
                            type='link'
                            className='text-20px no-padding-left'
                            onClick={setupTimer}
                        >
                            or set up custom intervals
                        </Button>
                    </div>
                </Col>
                <Col>
                    <WorkingWoman/>
                </Col>
            </Row>
        </React.Fragment>
    )
}