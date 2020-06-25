import React from 'react'
import { Typography, Button } from 'antd';
import './TimerTemplate.less'
import { CaretRightOutlined, PauseOutlined } from '@ant-design/icons'
import { WORK } from '../pages/timer/[id]'


const { Text } = Typography;

function getNextPeriodString(isPaused, period, length) {
    if(!isPaused)
    {
        return period === WORK
            ? "Next: " + length + " minute break"
            : "Next: " + length + " minute work"
    } else {
        return "Paused"
    }
}

function getHeading(period) {
    return period === WORK
        ? "Work!"
        : "Break!"
}

function getTimeStyle(showTime, period) {
    if(showTime) {
        return period===WORK ? "time_work" : "time_rest"
    } else {
        return "time_pause"
    }
}

export default function TimerTemplate(props) {
    return(
        <React.Fragment>
            <div className='wrapper-vertical'>
                <Text className="heading">{getHeading(props.period)}</Text>
                <Text
                    className={getTimeStyle(props.showTime, props.period)}
                >
                    {props.timer}
                </Text>
                <Text className="next">
                    {getNextPeriodString(props.isPaused, props.period, props.nextPeriodLength)}
                </Text>
                <Button
                    size={'large'}
                    className="pause-button"
                    icon={props.isPaused ? <CaretRightOutlined /> : <PauseOutlined />}
                    onClick={() => props.onPauseTimer()}
                >
                    {props.isPaused ? "Start" : "Pause"}
                </Button>
            </div>
        </React.Fragment>
    )
}