import express, { json, urlencoded } from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import bikesRouter from "./routes/bikes.router.js";
import mailRouter from "./routes/mails.router.js";
import userRouter from "./routes/users.router.js";
import rentalRouter from "./routes/rentals.router.js";

const app = express();
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

// These two lines replicate the behavior of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Correctly serve static files
app.use("/img", express.static(path.join(__dirname, "public/img")));
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

app.use("/api", bikesRouter);
app.use("/api", mailRouter);
app.use("/api", userRouter);
app.use("/api", rentalRouter);

function listen(port, callback) {
  app.listen(port, callback);
}
export { app, listen };
