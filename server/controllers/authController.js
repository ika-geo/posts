import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt from "jsonwebtoken";

import UserModel from "../models/UserModel.js";

import {registrationIssues} from "../features/registrationIssues.js";
import {loginIssues} from "../features/loginIssues.js";
import {createAndSetTokens} from "../features/tokens.js";


dotenv.config()


const authController = {

    register: async function (req, res) {
        try {
            const issue = await registrationIssues(req, res)
            if (issue) {
                return
            }

            //crypt password
            const hashedPassword = await bcrypt.hash(req.body.password, 10)

            let user = {
                name: req.body.name, email: req.body.email, password: hashedPassword
            }
            let registeredUser = await new UserModel(user)
            await registeredUser.save()
            createAndSetTokens(res, registeredUser._id)
            let userResponse = {name:registeredUser.name, id:registeredUser._id}
            res.status(200).json({...userResponse, message:'User is created'})
        } catch (e) {
            res.status(500).json({message: 'Some error during registration, please try again'})
        }

    },

    login: async function (req, res) {
        try {
            const issue = loginIssues(req, res)
            if (issue) {
                return
            }

            const {email, password} = req.body

            const User = await UserModel.findOne({email:email})

            if (!User){
                return res.status(401).json({message: 'Username or password is incorrect', errorReason: 'email is not in database'})
            }
            const passwordIsRight = await bcrypt.compare(password, User.password)

            if (!passwordIsRight) {
                return res.status(401).json({message: 'Username or password is incorrect', errorReason: 'password is incorrect'})
            }

            createAndSetTokens(res, User._id)
            const response = {
                name: User.name,
                id: User._id
            }

            res.status(200).json(response)

        } catch (e) {
            res.status(500).json({message: 'Some error during login, please try again'})
        }
    },

    getMe: async function(req, res){
        try{
            const User = await UserModel.findById(req.userId)

            const response = {
                name: User.name,
                id: User._id
            }
            res.json(response)
        }
        catch (e) {
            console.log(e)
            res.status(500).json({message: 'Some error'})
        }
    },

    checkMe: async function (req, res, next) {
        try {
            const authorizationHeader = req.headers.authorization;

            if (!authorizationHeader) {
                return res.status(401).json({ message: 'Please log in', code: 'no authorization header' });
            }

            //try accessToken
            try{
                const token = authorizationHeader.replace('Bearer ', '');
                const accessToken = jwt.verify(token, process.env.JWT_SECRET_WORD);
                if (accessToken) {
                    req.userId = accessToken.id;
                    return next();
                }
            }
            catch (e) {
            }

            //try refreshToken
            try{
                const refreshTokenHeader = req.headers.refreshtoken
                const refreshToken = refreshTokenHeader.replace('Bearer ', '');
                if (!refreshToken) {
                    return res.status(401).json({ message: 'Please log in', code: 'no refresh header'});
                }
                const refreshTokenAccess = jwt.verify(refreshToken, process.env.JWT_SECRET_WORD);
                if (refreshTokenAccess) {
                    req.userId = refreshTokenAccess.id;
                    createAndSetTokens(res, refreshTokenAccess.id);
                    return next();
                }
            }
            catch (e) {
                console.log('refresh is outdated')
                return res.status(401).json({ message: 'Please log in', code:'Refresh token is outdated'});
            }
        }

        catch (e) {
            return res.status(500).json({message: 'some error', error: e})
        }
    }
}






export default authController