import React from "react";
import Layout from '../../components/Layout'
import TimerComponent from '../../components/TimerComponent'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import io from 'socket.io-client'
import { withRouter } from 'next/router'

// TODO(toplenboren): remove hardcoded ENDPOINT value
export const WORK = 'WORK'
export const BREAK = 'BREAK'
export const BIG_BREAK = 'BREAK'
export const ENDPOINT = "http://127.0.0.1:3001";

class Timer extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            id: props.router.query.id,
            period: null,
            isPaused: null,
            minutes: null,
            seconds: null,
            nextPeriodLength: null,
            showTime: true,
            socket: null
        }
    }

    parseTimerState(data) {
        const minutes = Math.floor(data.time/60)
        const seconds = Math.floor(data.time%60)
        this.setState({
            isPaused: data.paused,
            minutes: minutes,
            seconds: seconds,
            nextPeriodLength: data.nextPeriodLength/60,
            period: data.period
        })
    }

    updateTimer() {
        if (this.state.period === null) {
            this.state.socket.emit('start')
            return
        }

        if (this.state.isPaused) {
            this.setState({showTime: !this.state.showTime})
            return
        }
        if (!this.state.isPaused) {
            this.setState({seconds: this.state.seconds === 0 ? 59 : this.state.seconds - 1})
            if (this.state.seconds === 59) {
                this.setState({minutes: this.state.minutes - 1})
            }
        }

        if (this.state.minutes === 0 && this.state.seconds <= 1) {
            this.socket.emit('check')
        }
    }

    componentDidMount() {
        var counter = setInterval(() => this.updateTimer(), 1000);
        const sock = io(ENDPOINT, {query: `timer=${this.state.id}`})
        this.setState({socket: sock})
        this.state.socket.on('timer', (data) => {this.parseTimerState(data)})
    }

    componentDidUpdate () {
        const sock = io(ENDPOINT, {query: `timer=${this.state.id}`})
        this.setState({socket: sock})
        this.state.socket.on('timer', (data) => {this.parseTimerState(data)})
    }

    stringifyTime() {
        const seconds = this.state.seconds < 10 ? '0' + this.state.seconds : this.state.seconds
        return this.state.minutes + ":" + seconds
    }

    pauseTimer() {
        this.setState({isPaused : !this.state.isPaused, showTime: true})
        this.state.socket.emit('pause')
    }


    getRepresentationByState() {
        //TODO(tramakarov): Move styles to .less
        if (this.state.period === null) {
            const antIcon = <LoadingOutlined style={{ fontSize: 32 }} spin />
            return (
                <Layout>
                    <div style={{'display': 'flex', 'align-items': 'center'}}>
                        <Spin style={{'margin': 'auto'}} tip={'Connecting...'} indicator={antIcon}/>
                    </div>
                </Layout>
            )
        } else {
            return (
                <Layout>
                    <TimerComponent
                        timer={this.stringifyTime()}
                        isPaused={this.state.isPaused}
                        showTime={this.state.showTime}
                        period={this.state.period}
                        nextPeriodLength={this.state.nextPeriodLength}
                        onPauseTimer={() => this.pauseTimer()}
                    />
                </Layout>
            )
        }
    }

    render() {
        return this.getRepresentationByState()
    }
}

export default withRouter(Timer)