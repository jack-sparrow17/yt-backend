import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";

const app =express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

// to handle form / json data
app.use(express.json({linit:'16kb'}));

// to handle url data
app.use(express.urlencoded({extended: true,limit:'25kb'}));

// to handle asset folder
app.use(express.static('public'))

// to handle cookies
app.use(cookieParser())

// routes import
import userRouter from './routes/user.routes.js';

// routes declaration
app.use('/api/v1/users',userRouter);

export { app };