const express=require("express");


const {

analyzeFinance

}=require("../controllers/aiController");


const protect=require("../middleware/authMiddleware");


const router=express.Router();



router.get(
"/analyze",
protect,
analyzeFinance
);



module.exports=router;