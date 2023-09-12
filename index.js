import express from "express";
import dotenv from "dotenv";
import router from "./routes/restaurant.routes.js";
import "./database/db.init.js";
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => res.send("Welcome to the Restaurant API"));
app.use("/api/v1", router);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
