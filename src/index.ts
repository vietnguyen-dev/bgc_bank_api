import express, { Express } from "express";
//authorization into backend
import { hasApiKey, verifyKey, verifyAdminKey } from "../middleware/auth/api-keys";


//data associcated with users
import clubMemberRouter from "../middleware/data/club-members";
import userRouter from "../middleware/data/users";
import reasonsRouter from '../middleware/data/reasons';
import { getStatistics } from '../middleware/data/statistics'


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//adding sessions

//verifying api keys, rate limiting, size limiting, 
app.use(hasApiKey, verifyKey)
//add caching to club members and reasons
app.use('/club-members',  clubMemberRouter)
app.use('/users', userRouter)
app.use('/reasons', reasonsRouter)

//saving in vidfasdfasdfadf
app.get('/statistics/:club_id', getStatistics)

//new school year admin only

//admin use only, should refresh api keys occaionally
// app.post('/admin-use', async (req, res) => {
//   await createAdminKey()
//   await createKey()
//   res.send(200)
// })


// app.listen(port, () => {
//   console.log(`BGC Bank API listening at http://localhost:${port}`);
// });

export default app