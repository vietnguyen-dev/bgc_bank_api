import express from 'express';
import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import dotenv from 'dotenv';

import db from '../utils/pg';

dotenv.config()

const userRouter = express.Router();

userRouter.get('/', async (req: Request,res: Response) => {
    res.send('what are you looking at?')
})

const hashPassword = async (password: string) => {
    const saltRounds = parseInt(process.env.SALT_ROUNDS!)
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}



const exampleForPostUser = {
    "firstName": "Tadeo",
    "lastName": "Martinez:",
    "username": "tmartinez99",
    "email": "tmartinez99@gmail.com",
    "password": "iamcool99",
    "userRoleId": 1,
    "clubId": 1
}

const checkExistingUser = async (email: string) => {
    const { rows } = await db.query('SELECT * FROM users WHERE email = $1;', [email]);
    if (rows.length > 0) {
        return true
    }
    else {
        return false
    }
}

userRouter.post('/', async (req: Request,res: Response) => {
    try {
        // const { firstName, lastName, username, email, password, userRoleId, clubId } = req.body
        const doesUserExist = await checkExistingUser(req.body.email);
        if (doesUserExist) {
            res.status(409).send('User already exists with this email')
        }
        else {
            const hashedPassword = await hashPassword(req.body.password)
            const newUserData = req.body
            newUserData['password'] = hashedPassword
            const userDataNewPassword = Object.values(newUserData)
            const { rows } = await db.query('INSERT INTO users (first_name, last_name, username, email, password, user_role_id, club_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;', userDataNewPassword )
            const newUser = rows[0]
            delete newUser.password
            res.status(200).send(newUser)
        }
    }
    catch(err) {
        console.log(err, 'error trying to add a new user')
        res.status(400).send('unable to create user')
    }
})

userRouter.put('/:id', async (req: Request,res: Response) => {

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