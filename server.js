import express from "express";
import colors from "colors";
import dotenv from "dotenv"
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import { loginController, registerController } from "./controllers/authController.js";


//configure env
dotenv.config();

//config db
connectDB();

//rest object
const app = express();

//middleware
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use("/api/v1/auth", authRoutes);

//rest api
app.get('/', (req, res)=>{
    res.send("<h1>Harshil Patel</h1>")
});

app.get('/login', loginController);
app.post('/register', registerController);


//PORT
const PORT = process.env.PORT || 8080;


app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`.bgCyan.white) 
});

export default app;
