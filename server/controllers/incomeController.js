const Income=require("../models/Income");


// ADD INCOME

const addIncome=async(req,res)=>{


try{


const {
source,
amount
}=req.body;



const income=await Income.create({

user:req.user._id,

source,

amount

});


res.status(201).json({

message:"Income Added",

income

});


}

catch(error){

res.status(500).json({

error:error.message

});

}

};




// GET INCOME


const getIncome=async(req,res)=>{


try{


const income=
await Income.find({

user:req.user._id

});


res.json(income);



}

catch(error){

res.status(500).json({

error:error.message

});


}


};



module.exports={

addIncome,
getIncome

}