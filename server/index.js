const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const expenseRoutes=require("./routes/expenseRoutes");
const incomeRoutes=require("./routes/incomeRoutes");
const dashboardRoutes=require("./routes/dashboardRoutes");
const aiRoutes=require("./routes/aiRoutes");


// Connect Database
connectDB();


const app = express();


// Middlewares
app.use(cors({
    origin:[
        "https://finsight-ai-68rn.onrender.com",
        "http://localhost:5173",
        "http://localhost:5177"
    ],
    credentials:true
}));
app.use(express.json());


// Test Route
app.get("/", (req,res)=>{

    res.send("FinSight AI Backend Running");

});


// Routes

app.use(
    "/api/auth",
    authRoutes
);


app.use(
    "/api/expenses",
    expenseRoutes
);
app.use(
"/api/income",
incomeRoutes
);
app.use(

"/api/dashboard",

dashboardRoutes

);
app.use(
"/api/ai",
aiRoutes
);



const PORT = process.env.PORT || 5000;


app.listen(PORT,()=>{

    console.log(`Server running on ${PORT}`);

});