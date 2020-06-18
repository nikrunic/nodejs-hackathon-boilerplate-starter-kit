import React from "react";
import Layout from '../components/Layout'
import TimerComponent from '../components/TimerComponent'
import { Spin } from 'antd'
// TODO(toplenboren): remove hardcoded ENDPOINT value
export const WORK = 'WORK'
export const BREAK = 'BREAK'
export const BIG_BREAK = 'BREAK'
const ENDPOINT = "http://127.0.0.1:3001";



class Timer extends React.Component {
    //TODO(tramakarov): Replace constructor with fetching data from server
    constructor (props) {
        super(props)
        this.state = {
            timerType: WORK,
            laps: 0,
            isPaused: true,
            minutes: 25,
            seconds: 0,
            nextPeriodLength: 5,
            showTime: true,
            workLength: 25,
            shortBreakLength: 5,
            longBreakLength: 30,
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
                        timerType: BIG_BREAK,
                        minutes: 0,
                        seconds: 15,
                        nextPeriodLength: 25
                    })
                }
                else {
                    this.setState({
                        laps: this.state.laps + 1,
                        timerType: BREAK,
                        minutes: 0  ,
                        seconds: 3,
                        nextPeriodLength: 25
                    })
                }
            } else {
                this.setState({
                    timerType: BIG_BREAK,
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


    getRepresentationByState() {
        if (this.state.timerType === undefined) {
            return (
                <Spin />
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