const Income=require("../models/Income");
const Expense=require("../models/Expense");



const getDashboard=async(req,res)=>{


try{


// Get income data

const income=await Income.find({

user:req.user._id

});



// Get expense data

const expenses=await Expense.find({

user:req.user._id

});



// Total Income

const totalIncome=income.reduce(

(sum,item)=>sum+item.amount,

0

);



// Total Expense


const totalExpense=expenses.reduce(

(sum,item)=>sum+item.amount,

0

);



// Balance


const balance=

totalIncome-totalExpense;



// Savings Percentage


const savingsRate=

totalIncome===0?

0:

((balance/totalIncome)*100).toFixed(2);



// Category Analysis


const category={};


expenses.forEach((item)=>{


if(category[item.category]){

category[item.category]+=item.amount;

}

else{

category[item.category]=item.amount;

}


});



res.json({

totalIncome,

totalExpense,

balance,

savingsRate,

category

});



}

catch(error){


res.status(500).json({

error:error.message

});


}



}



module.exports={

getDashboard

}