const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

const userRouter = require("./routers/userRouter").router;
const shelterRouter = require("./routers/shelterRouter").router;
const petRouter = require("./routers/petRouter").router;
const userRouter = require("./routers/addressRouter").router;

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json());


app.use("/uploads", express.static(__dirname + "/uploads"))
app.use((req, res, next) => {
    console.log(req.body);
    console.log(req.headers);
    next()
})

app.use("/users", userRouter);
app.use("/shelters", shelterRouter);
app.use("/pets", petRouter);
app.use("/address", addressRouter);

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