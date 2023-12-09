/// <reference path="globals.d.ts" />
import express, { Express, Request, Response, NextFunction} from "express";
import { connect, disconnect } from "mongoose";
import cors from 'cors';


import { signin, signup } from "./controllers/userController";
import { auth } from "./middlewares/auth";

import userRouter from "./routers/userRouter";
import shelterRouter from "./routers/shelterRouter";
import petRouter from "./routers/petRouter";
import addressRouter from "./routers/addressRouter";

const app : Express = express();

app.use(express.json());

app.post("/signup", signup);
app.post("/signin", signin);

app.use(auth);

app.use("/users", userRouter);
app.use("/shelters", shelterRouter);
app.use("/pets", petRouter);
app.use("/address", addressRouter);


app.use(cors());
app.use(express.urlencoded({ extended: true }))


app.use("/uploads", express.static(__dirname + "/uploads"))
app.use((req : Request, res : Response, next: NextFunction) => {
    console.log(req.body);
    console.log(req.headers);
    next()
})

async function main() {
    
    try{
        await connect("mongodb://127.0.0.1:27017/pets");
        app.listen(3000);
        console.log("Сервер ожидает подключения...");
    }
    catch(err) {
        return console.log(err);
    }
}

main()

process.on("SIGINT", async() => {
      
    await disconnect();
    console.log("Приложение завершило работу");
    process.exit();

});