import 'bootstrap/dist/css/bootstrap.css'

// Next wrap the components in appp
// We have defined our custom app component
const App = ({ Component, pageProps }) => {
    return <Component {...pageProps} />
}

export default App;