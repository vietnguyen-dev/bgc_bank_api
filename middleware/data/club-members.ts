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

const examplePostClubMember = {
    userId: 3,
    clubId: 1
}

//since club member data is derived from user data, no need to prevent existing user because already exists
clubMemberRouter.post('/', async (req: Request, res: Response) => {
    try {
        const newClubMember = Object.values(req.body)
        const { rows } = await db.query('INSERT INTO club_members (user_id, club_id) VALUES ($1, $2);', newClubMember)
        res.status(200).send(rows)
    }
    catch(err) {
        console.log(err, 'in get club members')
        res.status(500).send(`Error trying to get club members where club id is ${req.params.id}`)
    }
})

export default clubMemberRouter