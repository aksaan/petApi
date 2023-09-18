const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const bodyParser = require('body-parser')

const userRouter = require("./routers/userRouter").router;
const shelterRouter = require("./routers/shelterRouter").router;
const petRouter = require("./routers/petRouter").router;

const app = express();
app.use(cors());
// app.use(express.urlencoded({ extended: true }))
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    console.log(req.body);
    console.log(req.headers);
    next()
})

app.use("/users", userRouter);
app.use("/shelters", shelterRouter);
app.use("/pets", petRouter);

async function main() {
    
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/pets");
        app.listen(3000);
        console.log("Сервер ожидает подключения...");
    }
    catch(err) {
        return console.log(err);
    }
}

main()