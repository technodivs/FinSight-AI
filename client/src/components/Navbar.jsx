import {useNavigate} from "react-router-dom";


function Navbar(){


const navigate=useNavigate();



const logout=()=>{


localStorage.removeItem(
"token"
);


navigate(
"/login"
);


};




return(

<div className="bg-black text-white p-5 flex justify-between items-center">


<h1 className="text-2xl font-bold">

FinSight AI 💰

</h1>



<button

onClick={logout}

className="bg-red-600 px-5 py-2 rounded"

>

Logout

</button>



</div>

)


}



export default Navbar;