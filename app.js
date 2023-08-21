const express = require("express");
const mongoose = require("mongoose");

const userRouter = require("./routers/userRouter").router;

const app = express();
app.use(express.json());

app.use("/users", userRouter);

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