import express from 'express'
import { Request, Response } from 'express';

import db from '../utils/pg';

const clubMemberRouter = express.Router()

clubMemberRouter.get('/:club_id', async (req: Request, res: Response) => {
    try {
        const pageSize = 10
        const page = parseInt(req.query.page as string) || 1 
        const offset = (page - 1) * pageSize;
        const clubId = req.params.club_id
        const { rows } = await db.query("SELECT * FROM vw_club_members WHERE club_id = $1 ORDER BY id ASC LIMIT $2 OFFSET $3;", [clubId, pageSize, offset])
        res.status(200).send(rows)
    }
    catch(err) {
        console.log(err, 'in get club members')
        res.status(500).send(`Error trying to get club members where club id is ${req.params.club_id}`)
    }
})

clubMemberRouter.get('/:club_id/:club_member_id', async (req: Request, res: Response) => {
    try {
        const { rows } = await db.query('SELECT * FROM club_members WHERE club_id = $1 AND id = $2;', [req.params.club_id, req.params.club_member_id])
        res.status(200).send(rows[0])
    }
    catch(err) {
        console.log(err, 'in get club members')
        res.status(500).send(`Error trying to get club members where club id is ${req.params.id}`)
    }
})

const examplePostClubMember = {
    "firstName": 3,
    "lastName": '5',
    'preferred_name': null,
    'grade': '3',
    'club_id': 1
}

//since club member data is derived from user data, no need to prevent existing user because already exists
clubMemberRouter.post('/', async (req: Request, res: Response) => {
    try {
        console.log(req.body)
        const newClubMember = Object.values(req.body)
        console.log(newClubMember)
        const { rows } = await db.query('INSERT INTO club_members (first_name, last_name, grade, amount, club_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;', newClubMember)
        res.status(200).send(rows)
    }
    catch(err) {
        console.log(err, 'in get club members')
        res.status(500).send(`Error trying to get club members where club id is ${req.params.id}`)
    }
})

// only thing we should be updating is the amount
clubMemberRouter.put('/:club_member_id', async (req: Request, res: Response) => {
    try {
        const amount = req.query.amount
        const memberId = req.params.club_member_id
        const query = `UPDATE club_members SET amount = amount + $1 WHERE id = $2 RETURNING *;`
        const { rows } = await db.query(query, [amount, memberId])
        res.status(200).send(rows)
    }
    catch(err) {
        console.log(err, 'in get club members')
        res.status(500).send(`Error trying to get club members where club id is ${req.params.id}`)
    }
})

clubMemberRouter.delete('/:club_member_id', async (req: Request, res: Response) => {
    try {
        const { rows } = await db.query('UPDATE club_members SET date_deleted = NOW() WHERE id = $1 RETURNING *;', [req.params.club_member_id])
        res.status(200).send(rows)
    }
    catch(err) {
        console.log(err, 'in get club members')
        res.status(500).send(`Error trying to get club members where club id is ${req.params.id}`)
    }
})

export default clubMemberRouter