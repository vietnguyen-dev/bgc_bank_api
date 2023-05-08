import { Request, Response, NextFunction, RequestHandler } from "express";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid';

import db from "../utils/pg";
import redisClient from "../utils/redis";

import { iUser } from "../../interfaces/iUser";


dotenv.config();

export interface CustomRequest extends Request {
  requestingUser?: iUser;
  // sessionID? :string;
  Session?: {
      sid?: string,
      uid?: number
  }
}

//   doesnt include session in request?
declare module 'express-session' {
  export interface SessionData {
    sid: string;
    uid: number
  }
}

export const alreadyLoggedIn: RequestHandler = async (req: CustomRequest, res:Response, next: NextFunction) => { 
  if (req.sessionID || req.session.sid) {
    const data = await redisClient.get(`sess:${req.sessionID}`)
    if (data) {
      const parsed = JSON.parse(data)
      if (parsed.sid = req.session.sid) {
        res.status(400).send('already logged in on another device')
      }
    }
    else {
      res.status(400).send('youre probably trying to session hijack')
    }
  }
  else {
    next()
  }
}

//1. check if they acutally exists
export const userExists: RequestHandler = async (req: CustomRequest, res:Response, next: NextFunction) => {
  const { username } = req.body

  //queries from postgres to see if user exists checking email or username
  //if user doesnt exist return error message
  const query = `SELECT id, username FROM vw_staff WHERE username = $1 ORDER BY id ASC;`
  const { rows } = await db.query(query, [username]) 
  if (rows.length > 0 && rows.length === 1) {
      //this will pass down the results to the correctPasswordForUser middleware
      req.requestingUser =  rows[0]
      console.log(req.requestingUser);
      next()
  }
  else {
      res.status(400).send('User Does not exists')
  }
}

// 2. check if they have the correct password
export const correctPasswordForUser: RequestHandler = async (req: CustomRequest, res:Response, next: NextFunction) => {
  const { password } = req.body

  const match = await bcrypt.compare(password as string, req?.requestingUser?.password as string)
  if (match) {
      next()
  } 
  else {
      res.status(400).send('Incorrect Password')
  }
}

//3. log the user in
export const userLogin: RequestHandler = async (req: CustomRequest, res:Response, next: NextFunction) => {
  
  const sid = uuid()
  //creates record in redis with session id with session store
  req.session.sid = sid
  req.session.uid = req.requestingUser?.id
  const user = req.requestingUser
  delete user?.password
  res.status(200).send(user)
}


export const userLogout: RequestHandler = async (req: CustomRequest, res:Response, next: NextFunction) => {
  req.session.destroy(() => {
      console.log('session destroyed')
      console.log(req.session)
      // redirect to login page once created app
      // res.redirect('/')
  })
  res.end()
}

//middleware for all requests to check if the user has a session id
export const checkSession: RequestHandler = async (req: CustomRequest, res:Response, next: NextFunction) => {
  const loginPaths = [ '/login', '/logout' ] 
  const isLoginPath = loginPaths.includes(req.url)
  if (isLoginPath) {
      next()
  }
  else {
      if (req.session.sid && req.sessionID) {
        const data = await redisClient.get(`sess:${req.sessionID}`);
        if (data) {
          const parsed = JSON.parse(data)
          if (parsed.sid === req.session.sid) {
            next()
            console.log(req.requestingUser)
          }
          else {
            res.status(400).send('Error trying to login')
          }
        }
        else {
          res.status(400).send('Session has expired')
        }
      }
      else {
          console.log(req.session)
          res.status(400).json({ message: 'not in a session, action not permiteed'})
      }
  }
}
