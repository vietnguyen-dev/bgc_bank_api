import express from 'express';
import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import dotenv from 'dotenv';

import db from '../utils/pg';
import { sendConfirmEmail } from '../utils/email';

import { iUser } from '../../interfaces/iUser';

dotenv.config();
const userRouter = express.Router();

//used as first step of forget password process
userRouter.get('/', async (req: Request,res: Response) => {
    try {
        const { email, username } = req.body
        const query = 'SELECT * FROM vw_staff WHERE email = $1 AND username = $2 LIMIT 1'
        const { rows } = await db.query(query, [email, username])
        if (rows.length > 0) {
            res.status(200).send(true)
        }
        else {
            res.status(100).send(false)
        }
    }
    catch(err) {
        res.status(500).send('Error tryring to confirm user')
    }
})

const hashValue = async (password: string) => {
    const saltRounds = parseInt(process.env.SALT_ROUNDS!)
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

  const exampleForPostUser = {
    "firstName": "Tadeo",
    "lastName": "Martinez:",
    "username": "tmartinez99",
    "password": "iamcool99",
    "clubEmailId": 1,
    "userRoleId": 1,
    "clubId": 1
}


const preventExistingUser = async (username: string) => {
    try {
        const query = `SELECT * FROM users WHERE username = $1 LIMIT 1;`
        const { rows } = await db.query<iUser[]>(query, [username])
        if (rows.length > 0) {
            return true
        }
        else {
            return false
        }
    }
    catch(err) {
        return err
    }
}

userRouter.post('/', async (req: Request,res: Response) => {
    try {
        const doesUserExist= await preventExistingUser(req.body.username)
        if (doesUserExist) {
            res.status(409).send('User with this username already exists')
        }
        else {
            const hashedPassword: string = await hashValue(req.body.password)
            const newUserData = req.body
            newUserData['password'] = hashedPassword
            const userDataWithNewPassword = Object.values(newUserData)
            console.log(userDataWithNewPassword)
            const query = 'INSERT INTO users (first_name, last_name, username, password, club_email_id, user_role_id, club_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;'
            const { rows } = await db.query<iUser[]>(query, userDataWithNewPassword )
            if (rows.length > 0) {
                console.log(rows[0])
                res.status(200).send('Successfully created user!')
            }
            else {
                res.status(500).send('Error when trying to create user')
            }
        }
    }
    catch(err) {
        console.log(err, 'error trying to add a new user')
        res.status(400).send('unable to create user')
    }
})

userRouter.put('/send-confirmation', async (req: Request,res: Response) => { 
    try {
        //create code and expire date
        const code = Math.floor(Math.random() * 900000) + 100000;
        const date = new Date();
        // Add 10 minutes to the date object
        date.setMinutes(date.getMinutes() + 10);
        // Convert the date to a string in PostgreSQL timestamp with time zone format
        const postgresTimestampWithTimeZone = date.toISOString().replace('T', ' ').replace('Z', ' UTC');
        //update in database
        const query = 'UPDATE users SET pw_reset_code = $1, pw_reset_expire = $2 WHERE username = $3 RETURNING *'
        const { rows } = await db.query(query, [code, postgresTimestampWithTimeZone, req.body.username])
        console.log(rows[0])
        if (rows.length > 0) {
            // send confirmation email
            await sendConfirmEmail(code, rows[0].first_name, req.body.email as string)
            res.status(200).send("Email Confirmation sent")
        }
    }
    catch(err) {
        console.log(err)
        res.status(400).send("error trying to send confirmation code")
    }
})

userRouter.put('/confirm-code/:id/:code', async (req: Request,res: Response) => { 
    try {
        const codeSent = req.params.code
        const userId = req.params.id
        const query = 'SELECT pw_reset_code, pw_reset_expire FROM users WHERE id = $1 LIMIT 1'
        const date = new Date();
        const { rows } = await db.query(query, [userId])
        if (rows.length > 0) {
            const codeCompare = rows[0].pw_reset_code === codeSent.toString()
            const dateCompare = date < rows[0].pw_reset_expire
            if (codeCompare && dateCompare) {
                res.status(200).send(true)
            }
            else {
                res.status(401).send(false)
            }
        }
        else {
            res.status(403).send('invalid confirmation code')
            console.log('error happening')
        }
    }
    catch(err) {
        console.log(err)
        res.status(400).send("error trying to send confirmation code")
    }
})  

//for actually updating password
userRouter.put('/:id', async (req: Request,res: Response) => { 
    try {
       //db. update password with new one and encrypt it
    }
    catch (err) {

    }
})

userRouter.delete('/:id', async (req: Request,res: Response) => {
    try {
        const { rows } = await db.query('UPDATE users SET date_deleted = NOW() WHERE id = $1 RETURNING *;', [req.params.id])
        if (rows.length > 0) {
            res.status(200).send('user was deleted')
        }
        else {
            res.status(400).send('unable to delete user')
        }
    }
    catch(err) {
        res.status(400).send('unable to delete user')
    }
})

export default userRouter   