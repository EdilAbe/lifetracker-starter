import Express from "express";
import cors from "cors";
import morgan from "morgan";
import authRouter from "./routes/auth.js";

//const express = require("express");
const app = Express();
const port = 3000;

app.use("/auth", authRouter);
app.use(cors());
app.use(morgan("tiny"));
app.use(Express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.send("Good post");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
