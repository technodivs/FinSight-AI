import {useState} from "react";
import API from "../api/axios";
import {useNavigate} from "react-router-dom";


function Login(){

const navigate=useNavigate();


const [form,setForm]=useState({

email:"",
password:""

});


const handleSubmit=async(e)=>{

e.preventDefault();


try{

const res = await API.post(
"/auth/login",
form
);

console.log("LOGIN RESPONSE:", res.data);

localStorage.setItem(
"token",
res.data.token
);


alert("Login Successful");


navigate("/dashboard");


}

catch(error){

alert(
error.response.data.message
);

}


};



return(

<div className="h-screen bg-gray-950 flex items-center justify-center">


<form

onSubmit={handleSubmit}

className="bg-white p-8 rounded-xl w-96 space-y-5"

>


<h1 className="text-3xl font-bold">

Login

</h1>



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

type="password"

placeholder="Password"

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

Login

</button>
<p className="text-center text-sm">

New user?

<span
onClick={() => navigate("/register")}
className="text-blue-600 cursor-pointer ml-1"
>
Create Account
</span>

</p>


</form>


</div>

)

}


export default Login;