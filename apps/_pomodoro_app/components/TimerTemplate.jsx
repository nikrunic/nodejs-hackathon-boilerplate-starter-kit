import React from 'react'
import { Typography, Button } from 'antd';
import './TimerTemplate.less'
import { CaretRightOutlined, PauseOutlined } from '@ant-design/icons'
import { WORK } from '../pages/[id]'


const { Text } = Typography;

function getNextPeriodString(isPaused, timerType, length) {
    if(!isPaused)
    {
        return timerType === WORK
            ? "Next: " + length + " minute break"
            : "Next: " + length + " minute work"
    } else {
        return "Paused"
    }
}

function getHeading(timerType) {
    return timerType === WORK
        ? "Work!"
        : "Break!"
}

function getTimeStyle(showTime, timerType) {
    if(showTime) {
        return timerType===WORK ? "time_work" : "time_rest"
    } else {
        return "time_pause"
    }
}

export default function TimerTemplate(props) {
    return(
        <React.Fragment>
            <div className='wrapper-vertical'>
                <Text className="heading">{getHeading(props.timerType)}</Text>
                <Text
                    className={getTimeStyle(props.showTime, props.timerType)}
                >
                    {props.timer}
                </Text>
                <Text className="next">
                    {getNextPeriodString(props.isPaused, props.timerType, props.nextPeriodLength)}
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