import * as dotenv from "dotenv";
dotenv.config({path: "./config.env"});

import express from "express";
import cors from "cors";
import {recordRoutes} from "./routes/record";
import * as dbo from "./db/conn";

console.log(process.env.PORT);
const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(recordRoutes);


app.get("/", (req, res) => {
    res.send("Hello world! LOL");
});

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) {
        console.error(err);
    }
  });
  console.log(`Server is running on port: ${port}`);
});