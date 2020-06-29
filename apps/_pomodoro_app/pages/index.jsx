import React from 'react'
import Layout from '../components/Layout'
import './index.less'
import StartTimerIndexBlock from '../components/StartTimerIndexBlock'
import InviteLinkBlock from '../components/InviteLinkBlock'
import Text from 'antd/lib/typography/Text'
import Head from 'next/head'

export default function Home() {
    return(
        <Layout justifyCenter={false}>
            <Head>
                <title>Pomodoro</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className='wrapper padding-40px'>
                <Text className='text-30px black'>Online-timer for pomodoro technique</Text>
            </div>
            <div className='wrapper'>
                <StartTimerIndexBlock/>
                <InviteLinkBlock/>
            </div>

            <div className='margin-top-70px'>
                <p>
                    <Text className='h2 black'>Concentrate on your tasks with pomodoro technique</Text>
                </p>
                <div>
                    <Text className='text-20px'>Cut your tasks in 25 minute intervals with 5 minute breaks. After 4 repeats take a longer break for 30 minute. </Text>
                    <br/>
                    <Text className='text-20px'>Do it easy with our timer. Also you can share it with your friends and colleagues ― to make work more fun! </Text>
                </div>
            </div>
        </Layout>
    )
}