import React from 'react'
import { Row, Col, Typography } from 'antd';
import './TimerTemplate.less'

const { Text } = Typography;
const TimerTypes = {"WORK":"WORK", "REST":"REST", "LONG_REST": "REST"}

function getNextPeriodString(isPaused, timerType, length) {
    if(!isPaused)
    {
        return timerType === TimerTypes.WORK
            ? "Next: " + length + " minute break"
            : "Next: " + length + " minute work"
    } else {
        return "Paused"
    }
}

function getHeading(timerType) {
    return timerType === TimerTypes.WORK
        ? "Work!"
        : "Break!"
}

function getTimeStyle(showTime, timerType) {
    if(showTime) {
        return timerType===TimerTypes.WORK ? "time_work" : "time_rest"
    } else {
        return "time_pause"
    }
}

export default function TimerTemplate(props) {
    return(
        <React.Fragment className="template_container">
            <Row>
                <Text className="heading">{getHeading(props.timerType)}</Text>
            </Row>
            <Row>
                <Text
                    className={getTimeStyle(props.showTime, props.timerType)}
                    onClick={() => props.onPauseTimer()}
                >
                    {props.timer}
                </Text>
            </Row>
            <Row>
                <Text className="next">{getNextPeriodString(props.isPaused, props.timerType, props.nextPeriodLength)}</Text>
            </Row>
        </React.Fragment>
    )
}