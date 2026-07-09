import {useState} from "react";
import API from "../api/axios";
import {useNavigate} from "react-router-dom";


function Register(){


const navigate=useNavigate();


const [form,setForm]=useState({

name:"",
email:"",
password:""

});



const handleSubmit=async(e)=>{

e.preventDefault();


try{


await API.post(
"/auth/register",
form
);


alert("Account Created");


navigate("/");


}

catch(error){

alert(error.response.data.message);

}

};




return(

<div className="h-screen flex items-center justify-center bg-gray-950">


<form 
onSubmit={handleSubmit}

className="bg-white p-8 rounded-xl w-96 space-y-4"
>


<h1 className="text-3xl font-bold">

Create Account

</h1>


<input

className="border p-2 w-full"

placeholder="Name"

onChange={(e)=>

setForm({

...form,

name:e.target.value

})

}

/>



<input

className="border p-2 w-full"

placeholder="Email"

onChange={(e)=>

setForm({

...form,

email:e.target.value

})

}

/>



<input

className="border p-2 w-full"

placeholder="Password"

type="password"

onChange={(e)=>

setForm({

...form,

password:e.target.value

})

}

/>



<button

className="bg-black text-white p-2 w-full"

>

Register

</button>



</form>


</div>

)


}


export default Register;