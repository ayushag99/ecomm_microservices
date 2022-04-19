import buildClient from "../api/buildClient"

const LandingPage = ({ currentUser }) => {
    return currentUser ? <h1>You are signed in </h1> : <h1>PLease login</h1>
}


// Fetch data with nextJS
// Make asyncronous calls
// Prepare data
LandingPage.getInitialProps = async (context) => {
    // It receives ta request header very similar to express request
    // console.log(req.headers.cookie)
    const client = buildClient(context)
    const { data } = await client.get('/api/users/currentuser')
    return data;
}

export default LandingPage