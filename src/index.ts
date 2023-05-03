import express from "express";
import session from "express-session";
//authorization into app
import { hasApiKey, verifyKey } from "../middleware/auth/api-keys";

//data associcated with users
import clubMemberRouter from "../middleware/data/club-members";
import userRouter from "../middleware/data/users";

//creating sessions
import appSession from '../middleware/auth/session'

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(appSession);

app.use(hasApiKey, verifyKey)
//also has session

//login
//logout
//forgot password

app.use('/club-members', clubMemberRouter)
app.use('/users', userRouter)

//reasons
//stats



app.listen(port, () => {
  console.log(`BGC Bank API listening at http://localhost:${port}`);
});
