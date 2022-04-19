import 'bootstrap/dist/css/bootstrap.css'

import buildClient from "../api/buildClient"
import Header from '../components/header'


// Next wrap the components in appp
// We have defined our custom app component
const AppComponent = ({ Component, pageProps, currentUser }) => {

    return <div>
        <Header currentUser={currentUser} />
        <Component {...pageProps} />
    </div>
}

AppComponent.getInitialProps = async (appContext) => {
    // Params: context === {Component,ctx: {req,res}}
    const client = buildClient(appContext.ctx);
    const { data } = await client.get('/api/users/currentuser')

    let pageProps = {};
    if (appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx);
    }
    // current User in data
    return {
        pageProps,
        ...data
    }
}

export default AppComponent;