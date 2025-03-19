import {Router} from 'express';
import *  as userController from '../controllers/userController.js';

const router = Router();


router.get("/all-users", userController.getAllUsers);
router.post("/signup", userController.signUp);
router.post("/signin", userController.signIn);
router.get("/fetch-profile/:id", userController.getUserProfile);
router.put("/update-profile/:id", userController.updateUserProfile);
router.delete("/delete-profile/:id", userController.deleteUserProfile);



export default router;