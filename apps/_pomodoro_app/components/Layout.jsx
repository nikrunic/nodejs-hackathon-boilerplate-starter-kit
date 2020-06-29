import React from 'react'
import Header from './Header'

export default function Layout({ children, home }) {
    return (
        <div className="container">
            <Header/>
            <div className="page-content">
                <main>{children}</main>
            </div>
        </div>
    )
}