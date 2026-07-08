const Expense=require("../models/Expense");


// ADD EXPENSE

const addExpense=async(req,res)=>{

try{

const {
title,
amount,
category
}=req.body;


const expense=await Expense.create({

user:req.user._id,

title,

amount,

category

});


res.status(201).json({

message:"Expense Added",

expense

});


}

catch(error){

res.status(500).json({

error:error.message

});

}

};




// GET EXPENSES


const getExpenses=async(req,res)=>{


try{


const expenses=
await Expense.find({

user:req.user._id

});


res.json(expenses);


}

catch(error){

res.status(500).json({

error:error.message

});

}

};




// DELETE EXPENSE


const deleteExpense=async(req,res)=>{


try{


const expense=
await Expense.findOneAndDelete({

_id:req.params.id,

user:req.user._id

});


if(!expense){

return res.status(404).json({

message:"Expense not found"

});

}


res.json({

message:"Expense Deleted"

});


}

catch(error){


res.status(500).json({

error:error.message

});


}


};



// EXPORT ALL FUNCTIONS

module.exports={

addExpense,
getExpenses,
deleteExpense

};