import dotenv from 'dotenv'; //lib
//to load environment variables from .env file based on 
// NODE_ENV environment variable
dotenv.config({
    path: process.env.NODE_ENV
        ? `.env.${process.env.NODE_ENV}`
        : '.env'
});