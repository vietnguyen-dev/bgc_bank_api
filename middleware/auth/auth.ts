import { Request, Response, NextFunction } from "express";
import session from "express-session";
import dotenv from 'dotenv';
import db from "../utils/pg";

dotenv.config();


export const checkIfUser = (req: Request, res:Response, next: NextFunction) => { 
    const key = req.header('x-api-key')
    if (key) {
        next()
    }
    else {
        res.status(400).json({ message: 'Invalid Request, no Key'})
    }
  }

  export const correctPassword = (req: Request, res:Response, next: NextFunction) => { 
    const key = req.header('x-api-key')
    if (key) {
        next()
    }
    else {
        res.status(400).json({ message: 'Invalid Request, no Key'})
    }
  }

  export const Login = (req: Request, res:Response, next: NextFunction) => { 
    const key = req.header('x-api-key')
    if (key) {
        next()
    }
    else {
        res.status(400).json({ message: 'Invalid Request, no Key'})
    }
  }

  export const logout = (req: Request, res:Response, next: NextFunction) => { 
    const key = req.header('x-api-key')
    if (key) {
        next()
    }
    else {
        res.status(400).json({ message: 'Invalid Request, no Key'})
    }
  }

  //middleware for all requests to check if the user has a session id
// export const checkSession = async (req: Request, res:Response, next: NextFunction) => {
//     console.log(req.session)
//     const loginPaths = [ '/user-login', '/user-logout' ] 
//     const isLoginPath = loginPaths.includes(req.url)
//     if (isLoginPath) {
//         next()
//     }
//     else {
//         if (req.session.sid) {
//             next()
//         }
//         else {
//             console.log(req.session)
//             res.status(400).json({ message: 'not in a session, action not permiteed'})
//         }
//     }
// }