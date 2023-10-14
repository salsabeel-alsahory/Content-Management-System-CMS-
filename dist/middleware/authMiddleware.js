"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const userdb_1 = require("../db/entities/userdb");
dotenv_1.default.config();
const authenticate = async (req, res, next) => {
    const token = req.headers["authorization"] || "";
    let validToken;
    try {
        validToken = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY || "");
    }
    catch (error) {
    }
    if (validToken) {
        let decoded = jsonwebtoken_1.default.decode(token, { json: true });
        const user = await userdb_1.User.findOneBy({ email: decoded?.email });
        res.locals.user = user;
        next();
    }
    else {
        res.status(401).send("you are unauthorized");
    }
};
exports.authenticate = authenticate;
