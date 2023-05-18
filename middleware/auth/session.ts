import session, { SessionOptions } from "express-session";
import RedisStore from "connect-redis";
import dotenv from 'dotenv'

import redisClient from "../utils/redis";

dotenv.config()

const redisStore = new RedisStore({
    client: redisClient,
});

const environment = process.env.NODE_ENV === process.env.PROD_ENV

const sessionOptions: SessionOptions = {
    name: process.env.SESSION_NAME,
    secret: `${process.env.SESSION_SECRET}`,
    resave: false,
    store:  redisStore,
    saveUninitialized: false,
    proxy: true,
    cookie: { 
      httpOnly: environment ? true : false,
      secure: environment ? true : false,
      // one day
      //1000 ms * 60 seconds * 60 minutes * 24 hours
      maxAge: 1000 * 60 * 60 * 24 
    },
}

const appSession = session(sessionOptions)

// redisClient.on('connect', () => console.log('Redis Client: Connected!'));
// redisClient.on('error', err => console.log('Redis Client: Error', err));

export default appSession