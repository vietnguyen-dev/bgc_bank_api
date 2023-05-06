import express from 'express';
import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import dotenv from 'dotenv';
import crypto from "crypto";

import db from '../utils/pg';
import { sendConfirmEmail } from '../utils/email';

import { iClubEmail } from '../../interfaces/iClubEmail';
import { iUser } from '../../interfaces/iUser';

dotenv.config();

const userRouter = express.Router();

userRouter.get('/', async (req: Request,res: Response) => {
    res.send('what are you looking at?')
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


const preventExistingUser = async () => {

}

userRouter.post('/', async (req: Request,res: Response) => {
    try {
        const hashedPassword = await hashValue(req.body.password)
        const newUserData = req.body
        newUserData['password'] = hashedPassword
        const userDataWithNewPassword = Object.values(newUserData)
        console.log(userDataWithNewPassword)
        const query = 'INSERT INTO users (first_name, last_name, username, password, club_email_id, user_role_id, club_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;'
        const { rows } = await db.query(query, userDataWithNewPassword )
        if (rows.length > 0) {
            console.log(rows[0])
            res.status(200).send('Successfully created user!')
        }
        else {
            res.status(500).send('Error when trying to create user')
        }
    }
    catch(err) {
        console.log(err, 'error trying to add a new user')
        res.status(400).send('unable to create user')
    }
})


//for updating password
userRouter.put('/', async (req: Request,res: Response) => { 
    try {

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