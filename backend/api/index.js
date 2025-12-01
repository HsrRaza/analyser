import express from "express";
import cors from "cors";


import uploadRes from "../routes/upload.route.js";

const app = express();

// CORS FIX
app.use(
  cors({
    origin:'*',
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.get("/", (req, res)=>{
res.send("hellow")
})

// Routes

app.use("/api", uploadRes);

// Export the Express app so serverless platforms (Vercel) can use it.
// Do NOT call `app.listen()` here — use `server.js` for local development.
export default app;
