import dotenv from "dotenv";
import { listen } from "./src/app.js";

dotenv.config();

const port = process.env.PORT || 3000;
listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
