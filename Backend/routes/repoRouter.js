import {Router} from 'express';
import *  as repoController from '../controllers/repoController.js';



const repoRouter = Router();



repoRouter.post("/create-repository", repoController.createRepository);
repoRouter.get("/all-repositories", repoController.getAllRepositories);
repoRouter.get("/fetch/:id", repoController.fetchRepositoryById);
repoRouter.get("/name/:name", repoController.fetchRepositoryByName);
repoRouter.get("/user/:userId", repoController.fetchRepositoriesForCurrentUser);
repoRouter.put("/update/:id", repoController.updateRepositoryById);
repoRouter.patch("/toggle/:id", repoController.toggleVisibilityById);
repoRouter.delete("/delete/:id", repoController.deleteRepositoryById);






export default repoRouter;