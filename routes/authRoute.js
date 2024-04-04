import express from "express";
import { loginController, registerController } from "../controllers/authController.js";


//router object
const router = express.Router();

//Routes
//Register || POST Method
router.post('/register', registerController)

//Register || POST Method
router.get('/login', loginController)

export default router;
