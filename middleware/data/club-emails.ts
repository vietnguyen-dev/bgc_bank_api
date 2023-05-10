import {Request, Response} from 'express'
import db from '../utils/pg'

export const isValidEmail = async (req: Request, res: Response) => {
    try {   
        const email = req.params.email
        const query = 'SELECT email FROM club_emails WHERE email = $1'
        const { rows } = await db.query(query, [email])
        if (rows.length > 0 && rows[0].email === email) {
            res.status(400).send(false)
        }
        else {
            res.status(400).send(false)
        }
    }
    catch(err) {
        console.error(err)
    }
}