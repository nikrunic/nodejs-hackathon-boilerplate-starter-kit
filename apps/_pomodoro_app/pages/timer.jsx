import React from "react";
import socketIOClient from "socket.io-client";
import Layout from '../components/Layout'
import TimerComponent from '../components/TimerComponent'

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
            showTime: true
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

        if (this.state.minutes === -1) {
            if (this.state.timerType === 'WORK') {
                if (this.state.laps === 3) {
                    this.setState({
                        laps: 0,
                        timerType: TimerTypes.LONG_REST,
                        minutes: 30,
                        seconds: 0,
                        nextPeriodLength: 25
                    })
                }
                else {
                    this.setState({
                        laps: this.state.laps + 1,
                        timerType: TimerTypes.REST,
                        minutes: 5,
                        seconds: 0,
                        nextPeriodLength: 25
                    })
                }
            } else {
                this.setState({
                    timerType: TimerTypes.WORK,
                    minutes: 25,
                    seconds: 0,
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

    render() {
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
        );
    }
}

export default Timer

