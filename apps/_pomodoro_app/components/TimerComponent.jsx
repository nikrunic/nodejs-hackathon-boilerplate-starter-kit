import React from 'react'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons';
import './TimerComponent.less'
import TimerTemplate from './TimerTemplate'
import Rest from '../public/images/Rest'
import Work from '../public/images/Work'

const spinIcon = <LoadingOutlined style={{ fontSize: 128 }} spin />;

export default function TimerComponent(props) {
    if (props.timerType !== undefined) {
    return(
        <div className="wrapper">
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
            <div className='image'>
                {props.timerType === 'REST'? <Rest/> : <Work/>}
            </div>
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