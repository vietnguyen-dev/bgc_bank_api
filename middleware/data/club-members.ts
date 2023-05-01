import express from 'express'
import { Request, Response } from 'express';

import db from '../utils/pg';

const clubMemberRouter = express.Router()

clubMemberRouter.get('/:club_id', async (req: Request, res: Response) => {
    try {
        const { rows } = await db.query('SELECT * FROM vw_club_members WHERE club_id = $1', [req.params.club_id])
        res.status(200).send(rows)
    }
    catch(err) {
        console.log(err, 'in get club members')
        res.status(500).send(`Error trying to get club members where club id is ${req.params.id}`)
    }
})

clubMemberRouter.post('/:club_id', async (req: Request, res: Response) => {
    try {
        const { rows } = await db.query('INSERT INTO club_members SELECT * FROM vw_club_members WHERE club_id = $1', [req.params.club_id])
        res.status(200).send(rows)
    }
    catch(err) {
        console.log(err, 'in get club members')
        res.status(500).send(`Error trying to get club members where club id is ${req.params.id}`)
    }
})

export default clubMemberRouter