import { useContext, useState } from "react";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { hToken, setHToken, gToken, setGToken } = useContext(AppContext);
  const navigate = useNavigate();

  const [state, setState] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // console.log("Form data:", { name, email, role, password });

    try {
      if (state === "Sign Up") {
        if (!name || !email || !role || !password) {
          toast.error("All fields are required");
          return;
        }
        // Handle Sign Up
        const { data } = await axios.post(
          "http://localhost:5000/api/user/register",
          {
            name,
            email,
            role,
            password,
          }
        );

        if (data.success) {
          toast.success(data.message);
          setEmail("");
          setPassword("");
          setName("");
          setRole("");
          setState("Login");
        } else {
          toast.error(data.message);
        }
      } else {
        // Handle Login
        const { data } = await axios.post(
          "http://localhost:5000/api/user/login",
          {
            email,
            password,
          }
        );

        if (data.success) {
          if (data.user.role === "host") {
            localStorage.setItem("hToken", data.token);
            setHToken(data.token); // Save Host Token
            navigate("/host");
          } else {
            localStorage.setItem("gToken", data.token);
            setGToken(data.token); // Save Guest Token
            navigate("/");
          }
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message); // Fixed typo here
      console.log(error); // Log the error for debugging purposes
    }
  };

  return gToken || hToken ? (
    <>
      <p>you are loged in</p>
    </>
  ) : (
    <form className="min-h-[80vh] flex items-center" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold text-primary">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p>
          Please {state === "Sign Up" ? "sign up" : "login"} to book a property
        </p>
        {state === "Sign Up" && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              className="border bg-zinc-200 rounded w-full p-2 mt-1"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            className="border bg-zinc-200 rounded w-full p-2 mt-1"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        {state === "Sign Up" && (
          <div className="w-full">
            <p>Role</p>
            <select
              className="border bg-zinc-200 rounded px-3 py-2 w-full"
              onChange={(e) => setRole(e.target.value)}
              value={role}
            >
              <option value="">Select</option>
              <option value="guest">Guest</option>
              <option value="host">Host</option>
            </select>
          </div>
        )}
        <div className="w-full">
          <p>Password</p>
          <input
            className="border bg-zinc-200 rounded w-full p-2 mt-1"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <button
          className="bg-primary text-white w-full py-2 rounded-md text-base"
          type="submit"
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>
        {state === "Sign Up" ? (
          <p>
            Already have an account?
            <span
              onClick={() => setState("Login")}
              className="text-primary cursor-pointer underline"
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create a new account?
            <span
              onClick={() => setState("Sign Up")}
              className="text-primary cursor-pointer underline"
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
