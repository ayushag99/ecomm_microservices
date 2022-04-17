import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser'
import cookieSession  from 'cookie-session';

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


export {app};