import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {recordRoutes} from "./routes/record";

dotenv.config({path: "./config.env"})
const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json())
app.use(recordRoutes)


app.get("/", (req, res) => {
    res.send("Hello world! LOL");
});

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
})