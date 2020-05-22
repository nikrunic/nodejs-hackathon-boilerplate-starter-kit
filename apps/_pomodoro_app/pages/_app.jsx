    import '../styles/global.less'
    import { Container } from 'next/app';
    import Head from 'next/head';

export default function App ({ Component, pageProps }) {
    return (
        <Container>
            <Head>
                <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>
                <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
                <link href="https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&family=Raleway:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
            </Head>
            <Component {...pageProps} />
        </Container>
    )
}
