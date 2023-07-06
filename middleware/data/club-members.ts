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
        const sortField = req.query.sortField
        const sortDirection = req.query.sortDirection
        
        let baseQuery = `SELECT * FROM vw_club_members WHERE club_id = $1`
        let baseOrder = `ORDER BY id ASC`
        let limitOffset = `LIMIT $2 OFFSET $3;`

        let finalQuery = ''
        if (sortDirection && sortField) {
            finalQuery = `${baseQuery} ORDER BY ${sortField} ${sortDirection} ${limitOffset}`
            if (sortField === 'grade') {
                const newOrder = `
                    CASE
                    WHEN grade = 'K' THEN 0
                    WHEN grade = '1' THEN 1
                    WHEN grade = '2' THEN 2
                    WHEN grade = '3' THEN 3
                    WHEN grade = '4' THEN 4
                    WHEN grade = '5' THEN 5
                    ELSE 6
                        END ${sortDirection}`
                finalQuery = `${baseQuery} ORDER BY ${newOrder} ${limitOffset}`
            }
        }
        else {
            finalQuery = `${baseQuery} ${baseOrder} ${limitOffset}`
        }
        console.log(finalQuery)
        const { rows } = await db.query(finalQuery, [clubId, pageSize, offset])
        res.status(200).send(rows)
    }
    catch(err) {
        console.log(err, 'in get club members')
        res.status(500).send(`Error trying to get club members where club id is ${req.params.club_id}`)
    }
})

clubMemberRouter.get('/:club_id/:club_member_id', async (req: Request, res: Response) => {
    try {
        const { rows } = await db.query('SELECT * FROM club_members WHERE club_id = $1 AND id = $2 LIMIT 1;', [req.params.club_id, req.params.club_member_id])
        res.status(200).send(rows[0])
    }
    catch(err) {
        console.log(err, 'in get club members')
        res.status(500).send(`Error trying to get club members where club id is ${req.params.id}`)
    }
})

const examplePostClubMember = {
    "firstName": "Hello",
    "lastName": '5',
    'grade': '3',
    'club_id': 1
}

//since club member data is derived from user data, no need to prevent existing user because already exists
clubMemberRouter.post('/', async (req: Request, res: Response) => {
    try {
        console.log(req.body)
        const newClubMember = Object.values(req.body)
        console.log(newClubMember)
        const { rows } = await db.query('INSERT INTO club_members (first_name, last_name, grade, club_id) VALUES ($1, $2, $3, $4) RETURNING *;', newClubMember)
        res.status(200).send(rows)
    }
    catch(err) {
        console.log(err, 'in get club members')
        res.status(500).send(`Error trying to post club members where club id is ${req.params.id}`)
    }
})

const examplePutClubMember = {
    "id": 4,
    "first_name": "Athena",
    "last_name": "Cline",
    "amount": 0,
    "grade": "K",
    "club_id": 1,
    "search_vector": "'athena':1 'cline':2 'k':3"
  }

// only thing we should be updating is the amount
clubMemberRouter.put('/:club_member_id', async (req: Request, res: Response) => {
    try {
        console.log(req.body)
        const newClubMember = Object.values(req.body)
        const query = `UPDATE club_members SET amount = $1, club_id = $2 WHERE id = $3 RETURNING *;`
        const { rows } = await db.query(query, [req.body.amount, req.body.clubId, req.body.id])
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