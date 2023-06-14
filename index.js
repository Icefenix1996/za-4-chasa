import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';

import { registerValidation} from './validations/auth.js';

import UserModel from '/models/User.js';

mongoose
.connect('mongodb+srv://englisheniks:1234567qwer@cluster0.xewzjjd.mongodb.net/?retryWrites=true&w=majority')
.then(() => console.log('DB ok'))
.catch((err) => console.log('DB error', err));

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
res.send('Hello World!');
});
app.post('/auth/register',registerValidation, (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
    return res.status(400).json(errors.array());
    }
const doc = new UserModel({
email: req.body.email,
fullName: req.body.fullName,
avatarUrl: req.body.avatarUrl,
passwordHash: req.body.passwordHash,
});
res.json({
success:true,
});
});

app.listen(4444, (err) => {
if(err) {
return console.log(err);
}

console.log('Server OKr');
});