// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 6969;
const routes = require('./api/routes')
var cors = require("cors");

app.use(cors())
app.use(express.json());
app.use("/api", routes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to CS Gang's Server");
});


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export { app }