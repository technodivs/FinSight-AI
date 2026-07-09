const { GoogleGenAI } = require("@google/genai");

const Income = require("../models/Income");
const Expense = require("../models/Expense");


const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});


console.log(
"Gemini Key:",
process.env.GEMINI_API_KEY ? "YES" : "NO"
);



const analyzeFinance = async(req,res)=>{

try{


const income =
await Income.find({
user:req.user._id
});


const expenses =
await Expense.find({
user:req.user._id
});





const totalIncome =
income.reduce(
(sum,i)=>sum+i.amount,
0
);


const totalExpense =
expenses.reduce(
(sum,e)=>sum+e.amount,
0
);

const prompt = `

You are FinSight AI, a personal finance assistant.

Analyze this user's finance.

Income: ₹${totalIncome}

Expense: ₹${totalExpense}

Expenses:
${JSON.stringify(expenses)}

Give:
1. Financial score /100
2. Spending summary
3. Overspending areas
4. Savings advice
5. 50-30-20 plan
6. 3 improvement tips

Indian user.
Simple language.

`;

const result =
await ai.models.generateContent({

model:"gemini-2.5-flash",

contents:prompt

});


res.json({

analysis: result.text

});



}

catch(error){

console.log("AI ERROR:", error);

res.status(500).json({

message:"AI failed",
error:error.message

});

}

}


module.exports={
analyzeFinance
};