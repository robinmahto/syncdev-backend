import express from "express";

const app = express();

app.get('/', (req, res)=>{
    res.send("welcome back to syncdev")
});

app.listen(3500, ()=>{
    console.log("server running on 3500 port");
});