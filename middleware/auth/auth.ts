import { Request, Response, NextFunction } from "express";
import dotenv from 'dotenv';
import db from "../utils/pg";

dotenv.config();


export const checkIfUser = (req: Request, res:Response, next: NextFunction) => { 
    
}

export const correctPassword = (req: Request, res:Response, next: NextFunction) => { 
  
}

export const Login = (req: Request, res:Response, next: NextFunction) => { 
 
}

export const logout = (req: Request, res:Response, next: NextFunction) => { 
 
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