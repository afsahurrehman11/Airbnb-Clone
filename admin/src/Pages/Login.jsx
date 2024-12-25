import { useContext, useState } from "react";
import { AdminContext } from "../Context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const { setAToken, backendUrl } = useContext(AdminContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const { data } = await axios.post(backendUrl + "/api/admin/login", {
      email,
      password,
    });
    if (data.success) {
      localStorage.setItem("aToken", data.token);
      setAToken(data.token);
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div>
      <form
        className="min-h-[80vh] flex items-center"
        onSubmit={onSubmitHandler}
      >
        <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[-340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
          <p className="text-2xl font-semibold m-auto">
            <span className="text-primary">Admin</span> Login
          </p>
          <div className="w-full">
            <p>Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              required
              className="border border-[#DADADA] rounded w-full p-2 mt-1"
            />
          </div>
          <div className="w-full">
            <p>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              required
              className="border border-[#DADADA] rounded w-full p-2 mt-1 "
            />
          </div>

          <button
            className="bg-primary w-full py-2 rounded-md text-base text-[#FFFFFF]"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
