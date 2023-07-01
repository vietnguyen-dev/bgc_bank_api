import express from 'express';
import { Request, Response, RequestHandler } from "express";

import db from '../utils/pg';


export const getStatistics: RequestHandler = async (req: Request, res: Response) => {
    try {
        const clubId = req.params.club_id
        const query = 'SELECT average, total, zero_amount_count from vw_statistics WHERE id = $1;'
        const { rows } = await db.query(query, [clubId])
        const statistics = rows.map(row => ({
            average: parseInt(row.average),
            total: parseInt(row.total),
          }));
        res.send(statistics[0])
    }
    catch (err) {
        console.error(err, 'Error trying to get statistics')
        res.status(400).send('Error trying to get statistics')
    }
}