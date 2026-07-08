import {useState} from "react";
import API from "../api/axios";


function ExpenseForm({refresh}){


const [expense,setExpense]=useState({

title:"",
amount:"",
category:""

});



const addExpense=async(e)=>{


e.preventDefault();


try{


await API.post(
"/expenses/add",
expense
);


alert("Expense Added");


setExpense({

title:"",
amount:"",
category:""

});


window.location.reload();



}

catch(error){

console.log(error);

}


};




return(

<form

onSubmit={addExpense}

className="bg-white text-black p-6 rounded-xl mt-10 space-y-4"

>


<h2 className="text-2xl font-bold">

Add Expense 💸

</h2>



<input

className="border p-2 w-full"

placeholder="Title"

value={expense.title}

onChange={(e)=>

setExpense({

...expense,

title:e.target.value

})

}

/>



<input

className="border p-2 w-full"

placeholder="Amount"

type="number"

value={expense.amount}

onChange={(e)=>

setExpense({

...expense,

amount:e.target.value

})

}

/>



<input

className="border p-2 w-full"

placeholder="Category"

value={expense.category}

onChange={(e)=>

setExpense({

...expense,

category:e.target.value

})

}

/>



<button

className="bg-black text-white p-3 w-full rounded"

>

Add Expense

</button>


</form>


)

}


export default ExpenseForm;