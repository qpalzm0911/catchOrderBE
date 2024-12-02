import express from "express";
import logger from "morgan";
// import authController from "./src/controller/authController.js";
import menuController from "./src/controller/menuController.js";
import orderController from "./src/controller/orderController.js"
import cors from "cors";
import session from "./src/db/session.js";
import {initDB} from "./src/db/connection.js";
import tableController from "./src/controller/tableController.js";

const app = express();

// app.use(session);

app.use(cors({
    origin : ["http://localhost:3000", "*"],
    credential: true,
}))

app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({extended: true}))

// app.use("/api/auth", authController);
app.use("/api/menu", menuController);
app.use("/api/order", orderController);
app.use("/api/table", tableController);

// app.use(errorHandler);

app.listen(4000, async () => {
    await initDB();

    console.log("4000포트에서 서버 실행중");
});