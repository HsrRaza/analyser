import express from "express";
import cors from "cors";


import uploadRes from "../routes/upload.route.js";

const app = express();

// CORS FIX
app.use(
  cors({
    origin: '*', // Allow all origins (NOT recommended for production)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: false
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// app.get("/", (req, res)=>{
// res.send("hello")
// })

// Routes

app.use("/api", uploadRes);

// Export the Express app so serverless platforms (Vercel) can use it.
// Do NOT call `app.listen()` here — use `server.js` for local development.
export default app;
