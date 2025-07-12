import { Router } from "express"
import {
    createQuestion
} from "../controllers/question.controller.js"
import { verifyJWT } from "../middlewares/auth.middlewares.js"


const router = Router()

router.route("/createQuestion").post(verifyJWT,createQuestion);

export default router 