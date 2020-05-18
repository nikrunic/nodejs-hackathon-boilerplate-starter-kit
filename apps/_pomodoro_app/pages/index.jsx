import { Button } from 'antd'
import Link from "next/link";
import Layout from '../components/Layout'

function HomePage () {
    return (
        <Layout>
            <div className="HomePage">
                <h1> Pomodoro! </h1>
                <Link href={'/timer'}> Timer </Link>
            </div>
        </Layout>
    )
}

export default HomePage
