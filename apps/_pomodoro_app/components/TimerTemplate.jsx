import React, { useState } from 'react'
import { Row, Popover, Typography } from 'antd';
import './TimerTemplate.less'
import { CloseOutlined } from '@ant-design/icons'


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
    const [popoverVisible, setPopoverVisible] = useState(true);
    const popoverContent = (
        <>
            Click on time to pause timer &nbsp;
            <CloseOutlined style={{"color": "#1890ff"}} onClick={() => setPopoverVisible(false)}/>
        </>
    )
    return(
        <React.Fragment className="template_container">
            <Row>
                <Text className="heading">{getHeading(props.timerType)}</Text>
            </Row>
            <Row>
                <Popover visible={popoverVisible} content={popoverContent} >
                    <Text
                        className={getTimeStyle(props.showTime, props.timerType)}
                        onClick={() => props.onPauseTimer()}
                    >
                        {props.timer}
                    </Text>
                </Popover>
            </Row>
            <Row>
                <Text className="next">{getNextPeriodString(props.isPaused, props.timerType, props.nextPeriodLength)}</Text>
            </Row>
        </React.Fragment>
    )
}