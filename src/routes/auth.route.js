import express from "express"
import { customerSignIn, customerSignUp, signIn, signUp } from "../controllers/auth.controller.js"

const routes = express.Router()
routes.post("/signUp", signUp)
routes.get("/signIn", signIn)
routes.post("/customerSignUp", customerSignUp)
routes.get("/customerSignIn", customerSignIn)

export default routes
