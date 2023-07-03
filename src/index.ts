import express from "express";
import dotenv from 'dotenv';
import cors from 'cors'

import { hasApiKey, verifyKey } from "../middleware/auth/api-keys";

import clubMemberRouter from "../middleware/data/club-members";
import reasonsRouter from '../middleware/data/reasons';
import clubsRouter from "../middleware/data/clubs";
import { getStatistics } from '../middleware/data/statistics'

dotenv.config();


const app = express();

const port = process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use(hasApiKey, verifyKey)
app.use('/club-members',  clubMemberRouter)
app.use('/reasons', reasonsRouter)
app.use('/', clubsRouter)

//statistics for clubs
app.get('/statistics/:club_id', getStatistics)

app.listen(port, () => {
  console.log(`BGC Bank API listening at http://localhost:${port}`);
});