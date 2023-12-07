import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import usersRoutes from "./routes/users.js";
import compression from "compression";
import mongoose from "mongoose";
import bannerRoutes from "./routes/banner.js";

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(cors())
app.use(compression());

mongoose.connect('mongodb://127.0.0.1/students',{
   // useNewUrlPaser:true,
    useUnifiedTopology:true,
   // useCreateIndex:true
}).then(()=>{console.log("connection")}).catch((e)=>{
    console.log("not connection",e)

})
app.use('/banner', bannerRoutes);

app.use("/users", usersRoutes);
app.get("/", (req, res) => res.send("Welcome to the Users API"));
app.all("*", (req, res) =>res.send("You've tried reaching a route that doesn't exist."));

app.listen(PORT, () =>console.log(`Server running on port: http://localhost:${PORT}`));
