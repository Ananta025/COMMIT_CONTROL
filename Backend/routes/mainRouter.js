import {Router} from 'express';
import userRouter from './userRouter.js';
import repoRouter from './repoRouter.js';
import issueRouter from './issueRouter.js';


const router = Router();

router.get("/", (req, res) => {
    res.send("Hello World");
});

router.use("/user", userRouter);
router.use("/repo", repoRouter);
router.use("/issue", issueRouter);






export default router;