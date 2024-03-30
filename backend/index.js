const express = require("express");
const cors = require("cors");
const { sequelize } = require("./database");
const routes = require("./api/routes")
const port = 3010;

const app = express()
const corsOptions = {
    origin: "http://localhost:3000"
}

app.use(express.json())
app.use(cors(corsOptions))
app.use("/api", routes)
    
app.get('*', (request, response) => {
    response.send("Hello from get")
})

sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log("---" + port + "---");
    });
});