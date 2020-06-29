import React from 'react'
import PomodoroIcon from '../public/icons/PomodoroIcon'
import { Divider } from 'antd'
import './Header.less'
import Link from 'next/link'



export default function Header() {
    return(
        <React.Fragment>
            <div className="header_icon">
                <Link href="/">
                    <PomodoroIcon/>
                </Link>
            </div>
            <Divider className="header_divider"/>
        </React.Fragment>
    )
}