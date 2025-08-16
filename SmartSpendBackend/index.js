import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRouter from './routes/auth.js';
import { verifySession } from './middleware/verifySession.js';
import { connectMongo } from "./lib/mongo.js";


await connectMongo();
const app = express();
app.use(cors({
  origin: process.env.CLIENT_ORIGIN,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.get("/health", (_req,res)=> res.json({ok: true}));

app.use("/auth", authRouter)

app.get("/api/me",verifySession, (req, res)=>{
  res.json({user: {uid: req.user.uid, email:req.user.email || null}})
})





app.listen(process.env.PORT || 3000, () => {
  console.log(`✅ Backend escuchando en http://localhost:${process.env.PORT || 3000}`);
});