// import { Request, Response, NextFunction, RequestHandler } from "express";
// import dotenv from 'dotenv';
// import bcrypt from 'bcrypt'
// import { v4 as uuid } from 'uuid';

// import db from "../utils/pg";
// import redisClient from "../utils/redis";

// import { iUser } from "../../interfaces/iUser";

// dotenv.config();

// export interface CustomRequest extends Request {
//   requestingUser?: iUser;
//   // sessionID? :string;
//   Session?: {
//       sid?: string,
//       uid?: number
//   }
// }

// //   doesnt include session in request?
// declare module 'express-session' {
//   export interface SessionData {
//     sid: string;
//     uid: number
//   }
// }

// export const checkFields: RequestHandler = (req: CustomRequest, res:Response, next: NextFunction) => { 
//   try { 
//     const usernameExists = req.body.hasOwnProperty('username')
//     const passwordExists = req.body.hasOwnProperty('password')
//     if (usernameExists && passwordExists) {
//       next()
//     }
//     else {
//       res.status(409).send('needs to have both username and password fields')
//     }
//   }
//   catch(err) {
//     console.error(err)
//     res.status(501).send('server not able to process request because of missing fields')
//   }
// }

// export const alreadyLoggedIn: RequestHandler = async (req: CustomRequest, res:Response, next: NextFunction) => { 
//   try {
//     if (req.sessionID || req.session.sid) {
//       const data = await redisClient.get(`sess:${req.sessionID}`)
//       if (data) {
//         const parsed = JSON.parse(data)
//         if (parsed.sid = req.session.sid) {
//           res.status(400).send('already logged in on another device')
//         }
//       }
//       else {
//         next()
//       }
//     }
//     else {
//       next()
//     }
//   }
//   catch(err){
//     res.status(502).send('Errir seeing if you are logged in')
//   }
// }

// //1. check if they acutally exists
// export const userExists: RequestHandler = async (req: CustomRequest, res:Response, next: NextFunction) => {
//   try {
//     const { username } = req.body
//     const query = `SELECT id, name, username, club_email_id, club_id FROM vw_staff WHERE username = $1 ORDER BY id ASC LIMIT 1;`
//     const { rows } = await db.query(query, [username]) 
//     if (rows.length > 0 && rows.length === 1) {
//         //this will pass down the results to the correctPasswordForUser middleware
//         req.requestingUser =  rows[0]
//         next()
//     }
//     else {
//         res.status(400).send('User Does not exists')
//     }
//   }
//   catch(err){
//     res.status(503).send('Errir seeing if you are logged in')
//   }
// }

// // 2. check if they have the correct password
// export const correctPasswordForUser: RequestHandler = async (req: CustomRequest, res:Response, next: NextFunction) => {
//   try {
//     const match = await bcrypt.compare(req.body.password as string, req?.requestingUser?.password as string)
//     if (match) {
//         next()
//     } 
//     else {
//         res.status(400).send('Incorrect Password')
//     }
//   }
//   catch(err) {
//     console.error(err)
//     res.status(504).send('missing field')
//   }
// }

// //3. log the user in
// export const userLogin: RequestHandler = async (req: CustomRequest, res:Response, next: NextFunction) => {
//   try {
//     const sid = uuid()
//     //creates record in redis with session id with session store
//     req.session.sid = sid
//     req.session.uid = req.requestingUser?.id
//     const user = req.requestingUser
//     delete user?.password
//     res.status(200).send(user)
//   }
//   catch(err) {
//     console.error(err)
//     res.status(505).send('missing field')
//   }
// }


// export const userLogout: RequestHandler = async (req: CustomRequest, res:Response, next: NextFunction) => {
//   req.session.destroy(() => {
//       console.log('session destroyed')
//   })
//   res.status(200).send('logout successful')
// }

// //middleware for all requests to check if the user has a session id
// export const checkSession: RequestHandler = async (req: CustomRequest, res:Response, next: NextFunction) => {
//   const loginPaths = [ '/login', '/logout' ] 
//   const resetPasswordPath = req.method === 'PUT' && req.url.includes('/users')
//   const resetPasswordPath2 = req.method === 'GET' && req.url.includes('/users')
//   const availablePath = loginPaths.includes(req.url) || resetPasswordPath || resetPasswordPath2
//   if (availablePath) {
//       next()
//   }
//   else {
//       if (req.session.sid && req.sessionID) {
//         const data = await redisClient.get(`sess:${req.sessionID}`);
//         if (data) {
//           const parsed = JSON.parse(data)
//           if (parsed.sid === req.session.sid) {
//             next()
//             console.log(req.requestingUser)
//           }
//           else {
//             res.status(400).send('Error trying to login')
//           }
//         }
//         else {
//           res.status(400).send('Session has expired')
//         }
//       }
//       else {
//           res.status(400).json({ message: 'not in a session, action not permiteed'})
//       }
//   }
// }
