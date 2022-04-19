import buildClient from "../api/buildClient"

const LandingPage = ({ currentUser }) => {
    console.log(currentUser)
    return <div>My Landing Page</div>
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