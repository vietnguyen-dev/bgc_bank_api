import express from "express";
//authorization into backend
import { hasApiKey, verifyKey, verifyAdminKey } from "../middleware/auth/api-keys";

//creating sessions
import appSession from '../middleware/auth/session'

//user authentication
import { userLogin, userExists, userLogout, checkSession, alreadyLoggedIn } from '../middleware/auth/login';

//data associcated with users
import clubMemberRouter from "../middleware/data/club-members";
import userRouter from "../middleware/data/users";
import reasonsRouter from '../middleware/data/reasons';
import { getStatistics } from '../middleware/data/statistics'
import { isValidEmail } from '../middleware/data/club-emails';

// import { createAdminKey, createKey } from '../scripts/create-key';

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//adding sessions
app.use(appSession);

//verifying api keys, rate limiting, size limiting, 
app.use(hasApiKey, verifyKey, checkSession)

//login
app.post('/login', alreadyLoggedIn, userExists, userLogin)

//logout
app.post('/logout', userLogout)

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


app.listen(port, () => {
  console.log(`BGC Bank API listening at http://localhost:${port}`);
});
