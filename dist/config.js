"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv")); //lib
//to load environment variables from .env file based on 
// NODE_ENV environment variable
dotenv_1.default.config({
    path: process.env.NODE_ENV
        ? `.env.${process.env.NODE_ENV}`
        : '.env'
});
