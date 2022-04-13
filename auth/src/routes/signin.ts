import express from 'express';

const router = express.Router();

router.post('/api/users/signin', (req,res) => {
    res.send("TEST")
})

export {router as signInRouter}; 