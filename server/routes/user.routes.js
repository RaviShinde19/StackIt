import { Router } from "express"
import {
    registerUser,
    loginUser
} from "../controllers/user.controller.js"
import { upload } from "../middlewares/upload.middleware.js"
import { verifyJWT } from "../middlewares/auth.middlewares.js"


const router = Router()

//Register and Login Routes
router.route("/register").post(
    upload.single("profilePic"),registerUser
);
router.route("/login").post(loginUser)

//Secured Routes

export default router 
