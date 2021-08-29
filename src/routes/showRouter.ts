import express from "express";
import { ShowController } from "../controller/ShowController";
import { UserController } from "../controller/UserController";
import { bandRouter } from "./bandRouter";


export const showRouter = express.Router();

const showController = new ShowController;

showRouter.put("/create", showController.createShow);