import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import { csvRouter } from "./controllers/csv-router";

const PORT = 3000;
const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use("/api", [csvRouter]);
app.listen(PORT);
console.log("Up in " + PORT);
