require("express-async-errors");
require("dotenv").config();

const port = process.env.PORT || 3000;

const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);

const connectDB = require("./db/connect");
const router = require("./routes/productRoutes");

// routes
app.use("/api/v1/products",router);

app.get("/", (req, res, next) => {
    res.send("not found!!!");
});
app.use((err, req, res, next) => {
    res.send("hello world!!!");
});

async function start() {
    try {
        await connectDB(process.env.MONGO_URI);
        server.listen(port, () => console.log(`server is listening at ${port}`));
    }catch(error){
        console.log(error);
    }
}

start();
// require("./populate");