import UserModel from "../models/UserModel.js";
import validator from "validator"

export const registrationIssues = async function (req, res){

    const email = req.body.email
    const name = req.body.name

    const userExist = await UserModel.findOne({email})
    const nameExist = await UserModel.findOne({name})

    if (userExist){
        res.status(409).json({message: 'Email is already registered', errorReason: 'Email'})
        return true
    }
    if (nameExist){
        res.status(409).json({message: 'Name is already registered', errorReason: 'Name'})
        return true
    }
    if (!req.body.name) {
        res.status(400).json({message: 'Name is missing'})
        return true
    }
    if (!req.body.email) {
        res.status(400).json({message: 'Email is missing'})
        return true
    }
    if (!req.body.password) {
        res.status(400).json({message: 'Password is missing'})
        return true
    }
    if (!validator.isEmail(email)) {
        res.status(400).json({message: `${email} is not valid email`})
        return true
    }

}
