import express from "express";
import dotenv from 'dotenv';
import cors from 'cors'

import { hasApiKey, verifyKey } from "../middleware/auth/api-keys";

import clubMemberRouter from "../middleware/data/club-members";
import reasonsRouter from '../middleware/data/reasons';
import { getStatistics } from '../middleware/data/statistics'

dotenv.config();


const app = express();

const port = process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const corsOptions ={
  origin: process.env.APP_URL, 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(hasApiKey, verifyKey)
app.use('/club-members',  clubMemberRouter)
app.use('/reasons', reasonsRouter)

//statistics for clubs
app.get('/statistics/:club_id', getStatistics)

app.listen(port, () => {
  console.log(`BGC Bank API listening at http://localhost:${port}`);
});