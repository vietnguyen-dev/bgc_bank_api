import express from "express";
//authorization into backend
import { hasApiKey, verifyKey, verifyAdminKey } from "../middleware/auth/api-keys";

import clubMemberRouter from "../middleware/data/club-members";
import reasonsRouter from '../middleware/data/reasons';
import { getStatistics } from '../middleware/data/statistics'


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//verifying api keys, rate limiting, size limiting, 
app.use(hasApiKey, verifyKey)
//add caching to club members and reasons
app.use('/club-members',  clubMemberRouter)
// app.use('/users', userRouter)
app.use('/reasons', reasonsRouter)

//statistics for clubs
app.get('/statistics/:club_id', getStatistics)

// app.listen(port, () => {
//   console.log(`BGC Bank API listening at http://localhost:${port}`);
// });

export default app