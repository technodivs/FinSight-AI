const { GoogleGenerativeAI } =
require("@google/generative-ai");


const Income=require("../models/Income");
const Expense=require("../models/Expense");


const genAI =
new GoogleGenerativeAI(
process.env.GEMINI_API_KEY
);



const analyzeFinance=async(req,res)=>{


try{


const income=
await Income.find({
user:req.user._id
});


const expenses=
await Expense.find({
user:req.user._id
});



const totalIncome=
income.reduce(
(sum,i)=>sum+i.amount,
0
);


const totalExpense=
expenses.reduce(
(sum,e)=>sum+e.amount,
0
);



const prompt=`

You are FinSight AI, a personal finance assistant.

Analyze the user's monthly financial data.

Currency: Indian Rupees (₹)

Monthly Income:
₹${totalIncome}

Expenses:
${JSON.stringify(expenses)}

Provide:

1. Financial Health Score /100

2. Spending Summary

3. Category-wise analysis

4. Detect overspending

5. Suggest realistic monthly savings

6. Suggest 50-30-20 budgeting plan

7. Give 3 personalized improvement tips

Rules:
- Assume income is monthly
- Keep advice practical for Indian users
- Do not provide risky investment recommendations
- Keep response beginner friendly

`;


const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash"
});



const result =
await model.generateContent(prompt);


const response =
result.response.text();



res.json({

analysis:response

});



}

catch(error){


res.status(500).json({

error:error.message

});


}


}


module.exports={

analyzeFinance

}