const PORT = 3000;
import express from 'express';
import { json } from 'body-parser'

import {currentUserRouter} from './routes/current-user'
import {signInRouter} from './routes/signin'
import {signOutRouter} from './routes/signout'
import {signUpRouter} from './routes/signup'
import { errorHandler } from './middlewares/error-handler';

const app = express();

app.use(json())

app.use(currentUserRouter)
app.use(signInRouter)
app.use(signOutRouter)
app.use(signUpRouter)

app.use(errorHandler)

app.listen(PORT, ()=>  {
    console.log(`Listening on port ${PORT}..!`);
})