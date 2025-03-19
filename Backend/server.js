import yargs from "yargs"; // This module allow us to read the command from the terminal
import { hideBin } from "yargs/helpers"; // This module allow us to read the command from the terminal

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
import bodyParser from "body-parser";
import http from "http";

import { Server } from "socket.io";

import router from "./routes/mainRouter.js";




import  {initRepository}  from "./controllers/init.js";
import {addFile}  from "./controllers/add.js";
import {commitRepo} from "./controllers/commit.js";
import { pushRepo } from "./controllers/push.js";
import { pullRepo } from "./controllers/pull.js";
import { revertRepo } from "./controllers/revert.js";

yargs(hideBin(process.argv))
  .command("start", "Start the server", {}, startServer)
  .command("init", "To initialize a repository", {}, initRepository)
  .command("add <file>", "Add a file to the repository", (yargs) => {
    yargs.positional("file", {
      describe: "The file to add",
      type: "string",
    });
  }, (argv) => {
    addFile(argv.file);
  })
  .command("commit <message>", "Commit the files", (yargs)=>{
    yargs.positional("message", {
      describe: "The commit message",
      type: "string",
    });
  }, (argv) => {
    commitRepo(argv.message);
  })
  .command("push", "Push the files to the remote repository", {}, pushRepo)
  .command("pull", "Pull the files from the remote repository", {}, pullRepo)
  .command("revert <commitId>", "Revert the last commit", (yargs)=>{
    yargs.positional("commitId", {
      describe: "The commit id to revert",
      type: "string",
    });
  }, revertRepo)
  .demandCommand(1, "You need at least one command before moving on")
  .help().argv;


function startServer(){
  const app = express();
  const port = process.env.PORT || 3000;

  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));


  const mongo_url = process.env.MONGO_URL;

  mongoose.connect(mongo_url)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error("Error in connecting to the database", err);
  });

  // app.get("/", (req, res) => {
  //   res.send("Hello World");
  // });

  app.use("/", router);

  let user = "test";

  const httpServer = http.createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("join-room", (userId) => {
      user = userId;
      console.log("====");
      console.log(user);
      console.log("====");
      socket.join(userId);

    });
  });


  const db = mongoose.connection;
  db.once("open", async() => {
    console.log("Connected to the database");
  });


  httpServer.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

};
