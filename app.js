import express from "express";
const PORT = 5000;
const app = express();
import { userRegisterValidation, errorMiddleware } from "./validator/index.js";

app.get("/", (req, res) => {
  res.send("<h1>Hello I am Suhail</h1>");
});

app.use(express.json());
app.post(
  "/api/user/register",
  userRegisterValidation(),
  errorMiddleware,
  (req, res) => {
    let clientData = req.body;
    res.status(200).json(clientData);
  }
);

app.use((req, res) => {
  res.status(200).json("Invalid Route");
});

app.listen(PORT, () => {
  console.log(`Sever is Running at PORT Number ${PORT}`);
});
