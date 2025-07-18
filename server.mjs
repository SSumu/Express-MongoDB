import "dotenv/config";
import express, { json } from "express";
import dbconnect from "./src/db/config.mjs";
import rootRouter from "./src/routes/index.mjs";

// console.log(process.env.MONGO_URL);

const server = express(); // Express executor
const PORT = process.env.PORT || 4001; // Port initialization

server.use(json()); // Registration of json. json directly register from the express.

// ROUTE CONNECT
server.use("/api/v1/", rootRouter); // Registration of rootRouter

dbconnect
  .then(() => {
    // db connect
    console.log("db connected.."); // This is not necessary because server will connect after the db was connected.
    server.listen(PORT, () => console.log(`server running... on port ${PORT}`)); // server connect will happen after db connect.
  })
  .catch((e) => console.log(e)); // Catch the error. e means error.
