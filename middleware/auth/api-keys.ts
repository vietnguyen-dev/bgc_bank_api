import { Request, Response, NextFunction } from "express";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt'
import db from "../utils/pg";

dotenv.config();

export const hasApiKey = (req: Request, res:Response, next: NextFunction) => { 
    const key = req.header('x-api-key')
    if (key) {
        next()
    }
    else {
        res.status(400).json({ message: 'Invalid Request, no Key'})
    }
  }

export const verifyKey = async (req: Request, res:Response, next: NextFunction) => { 
    try {
        const { rows } = await db.query('SELECT * FROM api_keys WHERE clearance = $1', [process.env.ACTUAL_REQUEST_FIELD])
        const key = req.header('x-api-key')
        const comparison = await bcrypt.compare(key!, rows[0].key)
        if (comparison) {
            next()
        }
        else {
            res.status(401).send('Invalid Key')
        }
    }
    catch(err) {
        res.status(500).send('Error trying to verify API Key')
    }
}