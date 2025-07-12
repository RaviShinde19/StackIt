import { Router } from "express"
import {
    createAnswer
} from "../controllers/answer.controller.js"
import { verifyJWT } from "../middlewares/auth.middlewares.js"


const router = Router()

router.route("/createAnswer").post(verifyJWT,createAnswer);

export default router 