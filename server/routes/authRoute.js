import {Router} from "express";

import authController from "../controllers/authController.js";


const AuthRoute = new Router()

AuthRoute.post('/register', authController.register)
AuthRoute.post('/login', authController.login)
AuthRoute.post('/getMe', authController.checkMe, authController.getMe)






export default AuthRoute