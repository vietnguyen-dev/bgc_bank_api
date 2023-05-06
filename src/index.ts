import http from 'http'
import express from "express";
//authorization into app
import { hasApiKey, verifyKey, verifyAdminKey } from "../middleware/auth/api-keys";

//data associcated with users
import clubMemberRouter from "../middleware/data/club-members";
import userRouter from "../middleware/data/users";

//creating sessions
import appSession from '../middleware/auth/session'

// import { createAdminKey, createKey } from '../scripts/create-key';

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(appSession);

//login
//logout

app.use('/club-members', hasApiKey, verifyKey, clubMemberRouter)
app.use('/users', hasApiKey, verifyKey, userRouter)


//reasons
//stats

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
