import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ExpenseForm from "../components/ExpenseForm";
import IncomeForm from "../components/IncomeForm";
import {
PieChart,
Pie,
Cell,
Tooltip,
ResponsiveContainer
} from "recharts";

import {useEffect,useState} from "react";
import API from "../api/axios";


function Dashboard(){

const navigate = useNavigate();
const [data,setData]=useState(null);
const [ai,setAi]=useState("");
const [expenses,setExpenses]=useState([]);


const COLORS = [
"#00C49F",
"#FF8042",
"#0088FE",
"#FFBB28",
"#AA66CC"
];


// Dashboard data
const getDashboard=async()=>{

try{

const res=await API.get(
"/dashboard"
);

setData(res.data);

}

catch(error){

console.log(error);

}
finally{

setLoading(false);

}

};

const getExpenses=async()=>{


try{


const res=
await API.get(
"/expenses"
);


setExpenses(
res.data
);


}

catch(error){

console.log(error);

}
finally{
 setLoading(false);
}


};


// Gemini AI
const analyzeFinance=async()=>{


try{


const res=await API.get(
"/ai/analyze"
);


setAi(
res.data.analysis
);


}

catch(error){

console.log(error);

}

};
const deleteExpense=async(id)=>{


try{


await API.delete(
`/expenses/delete/${id}`
);


alert("Deleted");


getDashboard();

getExpenses();


}

catch(error){

console.log(error);

}


};




useEffect(() => {

 const token = localStorage.getItem("token");

 if(!token){
   navigate("/");
   return;
 }

 getDashboard();
 getExpenses();

}, []);



if(!data){

return(

<h1 className="text-center mt-20">

Loading...

</h1>

)

}





return(

<div className="min-h-screen bg-gray-950 text-white">


<Navbar/>


<div className="p-10">


<h1 className="text-4xl font-bold mb-10">

FinSight AI Dashboard 🚀

</h1>



<div className="grid grid-cols-3 gap-6">


<div className="bg-green-600 p-6 rounded-xl">

<h2>Total Income</h2>

<p className="text-3xl font-bold">

₹{data.totalIncome}

</p>

</div>



<div className="bg-red-600 p-6 rounded-xl">

<h2>Total Expense</h2>

<p className="text-3xl font-bold">

₹{data.totalExpense}

</p>

</div>



<div className="bg-blue-600 p-6 rounded-xl">

<h2>Savings</h2>

<p className="text-3xl font-bold">

₹{data.balance}

</p>

</div>


</div>
<IncomeForm refresh={getDashboard}/>
<ExpenseForm refresh={getDashboard}/>
<div className="bg-white text-black p-6 rounded-xl mt-10">


<h2 className="text-2xl font-bold mb-5">

Recent Expenses

</h2>


{

expenses.map((item)=>(


<div

key={item._id}

className="flex justify-between border-b p-3"

>


<span>

{item.title}

</span>



<span>

{item.category}

</span>



<span>

₹{item.amount}

</span>



<button

onClick={()=>deleteExpense(item._id)}

className="bg-red-600 text-white px-3 py-1 rounded"

>

Delete

</button>


</div>


))

}


</div>





<div className="mt-10 bg-white text-black p-6 rounded-xl">


<h2 className="text-2xl font-bold mb-5">

Category Spending

</h2>


<div className="h-72">


<ResponsiveContainer>


<PieChart>


<Pie

data={
Object.entries(data.category)
.map(([name,value])=>({

name,
value

}))
}


dataKey="value"

nameKey="name"

outerRadius={100}

label

>


{
Object.entries(data.category)
.map((_,index)=>(


<Cell

key={index}

fill={
COLORS[index % COLORS.length]
}

/>


))

}


</Pie>


<Tooltip/>


</PieChart>


</ResponsiveContainer>


</div>


</div>






<div className="mt-10 bg-purple-700 p-6 rounded-xl">


<h2 className="text-2xl font-bold">

AI Financial Advisor 🤖

</h2>



<button

onClick={analyzeFinance}

className="bg-white text-black px-5 py-3 rounded mt-5"

>

Analyze My Spending ✨

</button>



<p className="mt-5 whitespace-pre-line">

{ai}

</p>



</div>





</div>


</div>

)

}


export default Dashboard;




