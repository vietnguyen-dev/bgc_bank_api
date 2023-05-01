import express from "express";

import { hasApiKey, verifyKey } from "../middleware/auth/auth";

import clubMemberRouter from "../middleware/data/club-members";
import userRouter from "../middleware/data/users";

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use(hasApiKey, verifyKey)

app.use('/club-members', clubMemberRouter)
app.use('/users', userRouter)

app.listen(port, () => {
  console.log(`BGC Bank API listening at http://localhost:${port}`);
});
