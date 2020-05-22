import React from 'react'
import { Row, Col, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons';
import './TimerComponent.less'
import TimerTemplate from './TimerTemplate'
import Rest from '../public/images/Rest'
import Work from '../public/images/Work'

const spinIcon = <LoadingOutlined style={{ fontSize: 128 }} spin />;

export default function TimerComponent(props) {
    if (props.timerType !== undefined) {

    return(
        <div className="display-container">
            <Row>
                <Col span={12}>
                    <div className="timer-template">
                        <TimerTemplate
                            timer={props.timer}
                            isPaused={props.isPaused}
                            showTime={props.showTime}
                            timerType={props.timerType}
                            nextPeriodLength={props.nextPeriodLength}
                            onPauseTimer={() => props.onPauseTimer()}
                        />
                    </div>
                </Col>
                <Col span={12}>
                    {props.timerType === 'REST'? <Rest/> : <Work/>}
                </Col>
            </Row>
        </div>
    )
    } else {
        return (
            <div className="spin">
                <Spin indicator={spinIcon}/>
            </div>
        )
    }
}