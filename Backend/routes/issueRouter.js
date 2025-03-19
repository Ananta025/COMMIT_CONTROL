import {Router} from 'express';
import *  as issueController from '../controllers/issueController.js';

const issueRouter = Router();


issueRouter.post("/create-issue", issueController.createIssue);
issueRouter.put("/update/:id", issueController.updateIssueById);
issueRouter.delete("/delete/:id", issueController.deleteIssueById);
issueRouter.get("/all/:repoId", issueController.getAllIssuesByRepositoryId);
issueRouter.get("/:id", issueController.getIssueById);


export default issueRouter;