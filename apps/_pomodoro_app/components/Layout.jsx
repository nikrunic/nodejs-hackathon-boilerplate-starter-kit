import React from 'react'
import Header from './Header'

export default function Layout(props) {
    if (props.justifyCenter === false) {
        return (
            <div className="container">
                <Head>
                    <link rel="icon" type="image/x-icon" href="/brand/favicon.ico" />
                </Head>
                <Header/>
                <main>{props.children}</main>
            </div>
        )
    } else {
        return (
            <div className="container">
                <Header/>
                <div className="page-content">
                    <main>{props.children}</main>
                </div>
            </div>
        )
    }
}