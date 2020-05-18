import React from 'react'
import PomodoroIcon from '../public/icons/PomodoroIcon'
import { Divider } from 'antd'
import './Header.less'


export default function Header() {
    return(
        <React.Fragment>
            <div className="header_icon">
                <PomodoroIcon/>
            </div>
            <Divider className="header_divider"/>
        </React.Fragment>
    )
}