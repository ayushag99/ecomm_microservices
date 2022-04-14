const PORT = 3000;
import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser'

import { currentUserRouter } from './routes/current-user'
import { signInRouter } from './routes/signin'
import { signOutRouter } from './routes/signout'
import { signUpRouter } from './routes/signup'
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();

app.use(json())

app.use(currentUserRouter)
app.use(signInRouter)
app.use(signOutRouter)
app.use(signUpRouter)

app.all('*', () => { throw new NotFoundError() });

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}..!`);
})