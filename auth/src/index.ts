const PORT = 3000;
import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser'
import mongoose from 'mongoose';
import cookieSession  from 'cookie-session';
import config from 'config';

import { currentUserRouter } from './routes/current-user'
import { signInRouter } from './routes/signin'
import { signOutRouter } from './routes/signout'
import { signUpRouter } from './routes/signup'
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();

// Traffic is beig proxied to this app by nginx
// To inform express that it is behind the proxt and 
// To make express trust the data that is coming from a proxy
app.set('trust proxy', true);


app.use(json())
app.use(
    cookieSession({
        signed: false, 
        secure: true
    })
)

app.use(currentUserRouter)
app.use(signInRouter)
app.use(signOutRouter)
app.use(signUpRouter)

app.all('*', () => { throw new NotFoundError() });

app.use(errorHandler)



// 
// 
// START SCRIPT => connect to DB  & start the application
// 
// 

const start = async () => {
    if (!process.env.JWT_KEY){
        throw new Error("JWT_KEY not found")
    }
    try {
        await mongoose.connect(config.get("database.url"))
        console.log("Connected to Database");
    }
    catch (err) {
        console.log(err);
    }

    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}..!`);
    })
}
start()


