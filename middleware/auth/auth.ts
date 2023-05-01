import { Request, Response, NextFunction } from "express";
import session from "express-session";
import dotenv from 'dotenv';
import db from "../utils/pg";

dotenv.config();

//API KEYS
//1. 
export const hasApiKey = async (req: Request, res:Response, next: NextFunction) => { 
    const key = req.header('x-api-key')
    if (key) {
        next()
    }
    else {
        res.status(400).json({ message: 'Invalid Request, no Key'})
    }
  }

//2. 
export const verifyKey = async (req: Request, res:Response, next: NextFunction) => { 
    try {
        const { rows } = await db.query('SELECT * FROM api_keys WHERE clearance = $1', [process.env.ACTUAL_REQUEST_FIELD])
        const key = req.header('x-api-key')
        if (rows[0].key === key) {
            next()
        }
        else {
            res.status(401).send('Key not verified')
        }
    }
    catch(err) {
        res.status(500).send('Error trying to verify API Key')
    }
}

// const appsession = session({

// })