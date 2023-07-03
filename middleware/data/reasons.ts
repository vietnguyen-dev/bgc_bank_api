import express from 'express';
import { Request, Response } from "express";

import db from '../utils/pg';

const reasonsRouter = express.Router();

reasonsRouter.get('/:club_member_id', async (req: Request,res: Response) => {
    try {
        const { rows } = await db.query('SELECT * FROM reasons WHERE club_member_id = $1 order by date_created DESC', [req.params.club_member_id])
        res.status(200).send(rows)
        
    }
    catch(err) {
        console.error(`Error trying to get reasons for club member id: ${req.params.club_member_id}`)
        res.status(500).send('Error trying to fetch reasons for club member')
    }
})

reasonsRouter.post('/:club_member_id', async (req: Request,res: Response) => {
    try {
        const newReason = Object.values(req.body)
        const { rows } = await db.query('INSERT INTO reasons (reason, club_member_id, amount_given, new_total) VALUES ($1, $2, $3, $4);', newReason)
        res.status(200).send(rows[0])
    }
    catch(err) {
        console.error(`Error trying to get reasons for club member id: ${req.params.club_member_id}`)
        res.status(500).send('Error trying to fetch reasons for club member')
    }
})

// reasonsRouter.put('/:reason_id', async (req: Request,res: Response) => {
//     try {
//         const { userId, grade } = req.body
//         const { rows } = await db.query('INSERT INTO club_members (user_id,grade) VALUES ($1, $2);', [userId, grade])
//         console.log(rows)
//         // else {
//         //     res.status(500).send(`Error trying to get club members where is ${req.params.id}`)
//         // }
//     }
//     catch(err) {
//         console.error(`Error trying to get reasons for club member id: ${req.params.club_member_id}`)
//         res.status(500).send('Error trying to fetch reasons for club member')
//     }
// })

// reasonsRouter.delete('/:reason_id', async (req: Request,res: Response) => {
//     try {
//         const { userId, grade } = req.body
//         const { rows } = await db.query('INSERT INTO club_members (user_id,grade) VALUES ($1, $2);', [userId, grade])
//         console.log(rows)
//         // else {
//         //     res.status(500).send(`Error trying to get club members where is ${req.params.id}`)
//         // }
//     }
//     catch(err) {
//         console.error(`Error trying to get reasons for club member id: ${req.params.club_member_id}`)
//         res.status(500).send('Error trying to fetch reasons for club member')
//     }
// })

export default  reasonsRouter