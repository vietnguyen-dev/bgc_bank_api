import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt'
import dotenv from 'dotenv';

import db from '../middleware/utils/pg'

dotenv.config()

export async function createAdminKey() {
    const key = uuidv4()
    console.log('Admin', key)
    const saltRounds = parseInt(process.env.SALT_ROUNDS!)
    const hashedKey= await bcrypt.hash(key, saltRounds);
    const query = 'INSERT INTO api_keys (clearance, key) VALUES ($1, $2) RETURNING *;'
    await db.query(query, [process.env.ADMIN_REQUEST_FIELD, hashedKey])
}

export async function createKey() {
    const key = uuidv4()
    console.log('Actual',key)
    const saltRounds = parseInt(process.env.SALT_ROUNDS!)
    const hashedKey= await bcrypt.hash(key, saltRounds);
    const query = 'INSERT INTO api_keys (clearance, key) VALUES ($1, $2) RETURNING *;'
    await db.query(query, [process.env.ACTUAL_REQUEST_FIELD, hashedKey])
}