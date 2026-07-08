import {useState} from "react";
import API from "../api/axios";


function IncomeForm({refresh}){


const [income,setIncome]=useState({

source:"",
amount:""

});



const addIncome=async(e)=>{

e.preventDefault();


try{


await API.post(
"/income/add",
income
);


alert("Income Added");


setIncome({

source:"",
amount:""

});


refresh();


}

catch(error){

console.log(error);

}


};




return(

<form

onSubmit={addIncome}

className="bg-white text-black p-6 rounded-xl mt-10 space-y-4"

>


<h2 className="text-2xl font-bold">

Add Income 💰

</h2>


<input

className="border p-2 w-full"

placeholder="Source"

value={income.source}

onChange={(e)=>

setIncome({

...income,

source:e.target.value

})

}

/>


<input

className="border p-2 w-full"

type="number"

placeholder="Amount"

value={income.amount}

onChange={(e)=>

setIncome({

...income,

amount:e.target.value

})

}

/>



<button

className="bg-black text-white p-3 rounded w-full"

>

Add Income

</button>



</form>

)


}


export default IncomeForm;