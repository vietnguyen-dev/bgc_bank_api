import express from 'express';
import { Request, Response } from "express";

import db from '../utils/pg';

const clubsRouter = express.Router();

clubsRouter.get('/', async (req: Request,res: Response) => {
    try {
        const { rows } = await db.query('SELECT * FROM clubs;')
        res.status(200).send(rows)
        
    }
    catch(err) {
        console.error(`Error trying to get reasons for clubs`)
        res.status(500).send('Error trying to fetch clubs')
    }
})

export default clubsRouter