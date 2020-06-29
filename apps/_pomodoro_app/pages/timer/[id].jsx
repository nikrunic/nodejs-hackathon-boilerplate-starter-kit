import React from "react";
import Layout from '../../components/Layout'
import TimerComponent from '../../components/TimerComponent'
import { Spin, Typography } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import io from 'socket.io-client'
import { withRouter } from 'next/router'
import Head from 'next/head'

const { Paragraph } = Typography;

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
            this.state.socket.emit('check')
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

        if (this.state.minutes <= 0 && this.state.seconds <= 1) {
            this.state.socket.emit('check')
        }
    }

    componentDidMount() {
        var counter = setInterval(() => this.updateTimer(), 1000);
        const sock = io(ENDPOINT, {query: `timer=${this.state.id}`})
        this.setState({socket: sock})
        sock.on('timer', (data) => {this.parseTimerState(data)})
    }

    stringifyTime() {
        const seconds = this.state.seconds < 10 ? '0' + this.state.seconds : this.state.seconds
        return this.state.minutes + ":" + seconds
    }

    pauseTimer() {
        if (this.state.isPaused) {
            this.state.socket.emit('start')
        } else {
            this.state.socket.emit('pause')
        }
        this.setState({isPaused : !this.state.isPaused, showTime: true})
    }

    getTimerHead() {
        if (this.state.isPaused) {
            return "Paused..."
        } else {
            return this.state.period==WORK ? "Work!" : "Break!"
        }
    }


    getRepresentationByState() {
        //TODO(tramakarov): Move styles to .less
        if (this.state.period === null) {
            const antIcon = <LoadingOutlined style={{ fontSize: 32 }} spin />
            return (
                <Layout>
                    <Head>
                        <title>Connecting...</title>
                        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    </Head>
                    <div style={{'display': 'flex', 'align-items': 'center'}}>
                        <Spin style={{'margin': 'auto'}} tip={'Connecting...'} indicator={antIcon}/>
                    </div>
                </Layout>
            )
        } if (this.state.minutes < 0) {
            const antIcon = <LoadingOutlined style={{ fontSize: 20 }} spin />
            return(
                <Layout>
                    <Head>
                        <title>Uh oh...</title>
                        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    </Head>
                    <div className='text-30px padding-left-50px' style={{'margin-top': '100px'}}>
                        Uh oh...
                    </div>
                    <div className='text-20px padding-left-50px'>
                        Server connection is lost. Trying to reconnect&nbsp;
                        <Spin style={{'margin': 'auto'}} indicator={antIcon}/>
                    </div>
                </Layout>
            )
        }
        else {
            return (
                <Layout>
                    <Head>
                        <title>{this.stringifyTime()} — {this.getTimerHead()}</title>
                        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    </Head>
                    <TimerComponent
                        timer={this.stringifyTime()}
                        isPaused={this.state.isPaused}
                        showTime={this.state.showTime}
                        period={this.state.period}
                        nextPeriodLength={this.state.nextPeriodLength}
                        onPauseTimer={() => this.pauseTimer()}
                    />
                    <div style={{'display': 'flex', 'align-items': 'center'}}>
                        <div style={{'margin': 'auto'}} className='text-24px'>
                            Your timer code — <Paragraph copyable style={{'display': 'inline-block'}}>{this.state.id}</Paragraph>
                        </div>
                    </div>
                </Layout>
            )
        }
    }

    render() {
        return this.getRepresentationByState()
    }
}

export default withRouter(Timer)

/**
 * An indicator function that tells next not to use static optimization in order to make query populated
 * more: https://nextjs.org/docs/routing/dynamic-routes#caveats
 * @return {Promise<{}>}
 */
export async function getServerSideProps() {
    return { props: {} }
}