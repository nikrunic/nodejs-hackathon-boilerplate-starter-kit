import React from 'react'
import Header from './Header'

export default function Layout({ children, home }) {
    return (
        <div className="container">
            <Header/>
            <main>{children}</main>
        </div>
    )
}