import React from "react";
import socketIOClient from "socket.io-client";
import Layout from '../components/Layout'
import TimerComponent from '../components/TimerComponent'
import TimerForm from '../components/TimerForm'
import { message } from 'antd';

// TODO(toplenboren): remove hardcoded ENDPOINT value
// TODO(tramakarov): add time sync with server
const ENDPOINT = "http://127.0.0.1:3001";
const TimerTypes = {"WORK":"WORK", "REST":"REST", "LONG_REST": "REST"}



class Timer extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            timerType: undefined,
            laps: 0,
            isPaused: false,
            minutes: -1,
            seconds: 0,
            nextPeriodLength: -1,
            showTime: true,
            workLength: -1,
            shortBreakLength: -1,
            longBreakLength: -1,
        }
    }

    updateTimer() {
        if (this.state.isPaused) {
            this.setState({showTime: !this.state.showTime})
            return
        }
        if (this.state.timerType !== undefined && !this.state.isPaused) {
            this.setState({seconds: this.state.seconds === 0 ? 59 : this.state.seconds - 1})
            if (this.state.seconds === 59) {
                this.setState({minutes: this.state.minutes - 1})
            }
        }

        if (this.state.minutes === -1 && this.state.timerType !== undefined) {
            if (this.state.timerType === 'WORK') {
                if (this.state.laps === 3) {
                    this.setState({
                        laps: 0,
                        timerType: TimerTypes.LONG_REST,
                        minutes: 0,
                        seconds: 15,
                        nextPeriodLength: 25
                    })
                }
                else {
                    this.setState({
                        laps: this.state.laps + 1,
                        timerType: TimerTypes.REST,
                        minutes: 0  ,
                        seconds: 3,
                        nextPeriodLength: 25
                    })
                }
            } else {
                this.setState({
                    timerType: TimerTypes.WORK,
                    minutes: 0,
                    seconds: 5,
                    nextPeriodLength: this.state.laps === 3 ? 30 : 5
                })
            }
        }
    }

    componentDidMount() {
        var counter = setInterval(() => this.updateTimer(), 1000);
    }

    stringifyTime() {
        const seconds = this.state.seconds < 10 ? '0' + this.state.seconds : this.state.seconds
        return this.state.minutes + ":" + seconds
    }

    pauseTimer() {
        this.setState({isPaused : !this.state.isPaused, showTime: true})
    }

    showError = (text) => message.error(text);

    startTimer(props) {
        if (props.workLength === undefined || props.shortBreakLength === undefined || props.longBreakLength === undefined) {
            this.showError('Set up periods length, please')
        } else {
            this.setState({
                timerType: 'WORK',
                minutes: props.workLength,
                nextPeriodLength: props.shortBreakLength,
                workLength: props.workLength,
                shortBreakLength: props.shortBreakLength,
                longBreakLength: props.longBreakLength,
            })
        }
    }

    getRepresentationByState() {
        if (this.state.timerType === undefined) {
            return (
                <Layout>
                    <TimerForm onFinish={(props) => (this.startTimer(props))}/>
                </Layout>
                )
        } else {
            return (
                <Layout>
                    <TimerComponent
                        timer={this.stringifyTime()}
                        isPaused={this.state.isPaused}
                        showTime={this.state.showTime}
                        timerType={this.state.timerType}
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

export default Timer
