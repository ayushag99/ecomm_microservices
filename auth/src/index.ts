const PORT = 3000;
import express from 'express';
import { json } from 'body-parser'

const app = express();

app.use(json())

app.get("/",(req,res)=>{
    res.status(200).send("Authintication service is healthy and running");
})

app.get("/api/users/currentuser", (req,res)=>{
    res.send("hi there!");
})

app.listen(PORT, ()=>  {
    console.log(`Listening on port ${PORT}..!`);
})