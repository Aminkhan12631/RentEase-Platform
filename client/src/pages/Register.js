import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register(){

const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const navigate = useNavigate();

const handleRegister = async () =>{
console.log("Register button clicked");
try{

const res = await fetch("https://rentease-backend.onrender.com/api/auth/signup",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
name,
email,
password
})

});

const data = await res.json();

if(res.ok){

alert("User Registered Successfully 🎉");

navigate("/login");

}else{

alert(data.message);

}

}catch(error){

console.log(error);

}

};

return(

<div className="min-h-screen flex items-center justify-center bg-gray-100">

<div className="bg-white p-8 rounded-xl shadow w-96">

<h1 className="text-2xl font-bold mb-6">
Register
</h1>

<input
type="text"
placeholder="Name"
className="border p-3 w-full mb-4 rounded"
onChange={(e)=>setName(e.target.value)}
/>

<input
type="email"
placeholder="Email"
className="border p-3 w-full mb-4 rounded"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Password"
className="border p-3 w-full mb-4 rounded"
onChange={(e)=>setPassword(e.target.value)}
/>

<button
onClick={handleRegister}
className="bg-black text-white w-full py-3 rounded"
>
Register
</button>

</div>

</div>

);

}

export default Register;
