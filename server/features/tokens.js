import jwt from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config()

export const createAndSetTokens = function (res, id){
    const accessToken = 'Bearer '+jwt.sign({ id:id }, process.env.JWT_SECRET_WORD, {expiresIn: '15m'}) // expires in 15 minute
    res.set({'Authorization':accessToken});
    const refreshToken = 'Bearer '+jwt.sign({ id:id }, process.env.JWT_SECRET_WORD, {expiresIn: '20d'}) // expires in 20 days
    res.cookie('Refreshtoken', refreshToken)
}