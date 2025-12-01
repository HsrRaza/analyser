import express from "express";
import cors from "cors";


import uploadRes from "./routes/upload.route.js";

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

// 🚀 IMPORTANT: Do NOT use app.listen()
// Vercel will handle the server for you.
app.listen(4000, ()=>{
    console.log("server is listing ");
    
})
export default app;
