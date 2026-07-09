const OpenAI = require("openai");

const Income = require("../models/Income");
const Expense = require("../models/Expense");


// OpenAI setup
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});


console.log(
    "OpenAI Key Loaded:",
    process.env.OPENAI_API_KEY ? "YES" : "NO"
);



const analyzeFinance = async (req, res) => {

    try {

        const income = await Income.find({
            user: req.user._id
        });


        const expenses = await Expense.find({
            user: req.user._id
        });



        const totalIncome = income.reduce(
            (sum, i) => sum + i.amount,
            0
        );


        const totalExpense = expenses.reduce(
            (sum, e) => sum + e.amount,
            0
        );



        const prompt = `

You are FinSight AI, a personal finance assistant.

Analyze the user's monthly financial data.

Currency: Indian Rupees (₹)

Monthly Income:
₹${totalIncome}

Total Expenses:
₹${totalExpense}

Expenses Data:
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



        const result =
            await openai.chat.completions.create({

                model: "gpt-4.1-mini",

                messages: [

                    {
                        role: "system",
                        content:
                            "You are FinSight AI, an AI powered personal finance advisor."
                    },

                    {
                        role: "user",
                        content: prompt
                    }

                ]

            });



        const response =
            result.choices[0].message.content;



        res.json({

            analysis: response

        });


    }

    catch (error) {


        console.log(
            "AI ERROR FULL:",
            error
        );


        res.status(500).json({

            message: "AI failed",

            error: error.message

        });


    }


};



module.exports = {

    analyzeFinance

};
