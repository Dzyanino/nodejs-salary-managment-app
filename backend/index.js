import express from "express";

const app = express()
const port = 8081

app.listen(port, () => {
    console.log("Hello form 8081");
})

app.get('/', (request, response) => {
    response.send("Hello from get")
})