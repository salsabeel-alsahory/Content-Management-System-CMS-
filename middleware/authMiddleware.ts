import Express from "express"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
import { User } from "../db/entities/userdb"
dotenv.config()

const authenticate = async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {

    const token = req.headers["authorization"] || ""
    let validToken;
    try {
        validToken = jwt.verify(token, process.env.SECRET_KEY || "")
    } catch (error) {

    }

    if (validToken) {
        let decoded = jwt.decode(token, { json: true })
        const user = await User.findOneBy({ email: decoded?.email })
        res.locals.user = user
        next()
    } else {
        res.status(401).send("you are unauthorized")
    }

}

export { authenticate }