import axios from "axios"

const LandingPage = ({ currentUser }) => {
    console.log(currentUser)
    return <div>My Landing Page</div>
}


// Fetch data with nextJS
// Make asyncronous calls
// Prepare data
LandingPage.getInitialProps = async ({ req }) => {
    // It receives ta request header very similar to express request
    // console.log(req.headers.cookie)
    if (typeof window === 'undefined') {
        // We are on server
        // Request should be made to the ingress-nginx
        try {
            const { data } = await axios.get(
                'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser', {
                headers: req.headers
            }
            )
            return data
        } catch (err) {
            console.log(err)
        }
    } else {
        // ON Browser
        // Request can be made to the browser
        try {
            const { data } = await axios.get('/api/users/currentuser')
            return data
        } catch (err) {
            console.log(err)
        }
    }
    return {}
}

export default LandingPage