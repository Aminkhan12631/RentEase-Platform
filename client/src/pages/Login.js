import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {

    try{

      const res = await fetch("https://rentease-backend-hv56.onrender.com/api/auth/login",{

        method:"POST",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify({
          email,
          password
        })

      });

      const data = await res.json();

      console.log(data);
      console.log(data.user);

      if(res.ok){

        localStorage.setItem("token",data.token);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("user", JSON.stringify(data.user));

        alert("Login Successful 🎉");
        //window.location.reload();
        if(data.user.role.toLowerCase() === "admin"){
          navigate("/admin-dashboard");
        }else{
          navigate("/");
        }

      }else{

        alert(data.message);

      }

    }catch(error){

      console.log(error);

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow w-96">

        <h1 className="text-2xl font-bold mb-6">Login</h1>

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
        onClick={handleLogin}
        className="bg-black text-white w-full py-3 rounded"
        >
        Login
        </button>

      </div>

    </div>

  );
}

export default Login;
