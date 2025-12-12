import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import GoogleButton from "../utils/googleButton.tsx";
const Login = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      if (!name || !email || !password) {
        toast.error("Please provide all the credentials");
        return;
      }

      if (password.length < 8) {
        toast.error("Password must be at least 8 characters");
        return;
      }

      const credentials = { name, email, password };

      const response = await axios.post(
        backendUrl + "/api/register",
        credentials
      );

      if (!response.data.success) {
        toast.error(response.data.message, { autoClose: 1000 });
        return;
      }

      toast.success(response.data.message, { autoClose: 1000 });
      localStorage.setItem("token", response.data.token);
      navigate("/explore");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error);
        toast.error(error.message, { autoClose: 1000 });
      } else {
        toast.error("An unknown error occurred please try again.", {
          autoClose: 1000,
        });
      }
    }
  };

  const login = async () => {
    try {
      if (!email || !password) {
        toast.error("Please provide all the credentials");
        return;
      }
      const credentials = { email, password };
      const response = await axios.post(backendUrl + "/api/login", credentials);
      if (!response.data.success) {
        toast.error(response.data.message, { autoClose: 1000 });
        return;
      } else {
        toast.success(response.data.message, { autoClose: 1000 });
        localStorage.setItem("token", response.data.token);
        navigate("/explore");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error);
        toast.error(error.message, { autoClose: 1000 });
      } else {
        toast.error("An unknown error occurred please try again.", {
          autoClose: 1000,
        });
      }
    }
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-[#001427] via-[#02263a] to-[#001827] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-[#071426]/80 backdrop-blur-sm border border-[#00D0A6]/10 rounded-2xl shadow-2xl p-8">
        <header className="text-center mb-6">
          <div className="inline-block mb-4">
            <div className="text-3xl font-bold bg-linear-to-r from-[#5B8CFF] to-[#00D0A6] bg-clip-text text-transparent">
              GapAtica
            </div>
          </div>
          <h1 className="text-white text-2xl font-semibold">Welcome back</h1>
          <p className="text-sm text-[#9FD6FF]">
            Login to your account to continue
          </p>
        </header>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (state === "Sign") register();
            else {
              login();
            }
          }}
          className="space-y-4"
        >
          {state === "Sign" && (
            <div>
              <label className="sr-only" htmlFor="name">
                Name
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                id="name"
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-lg bg-[#011826] border border-transparent placeholder-[#5fa7d9] text-[#e6f7ff] focus:outline-none focus:ring-2 focus:ring-[#00D0A6]/60"
              />
            </div>
          )}

          <div>
            <label className="sr-only" htmlFor="email">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
              placeholder="you@domain.com"
              className="w-full px-4 py-3 rounded-lg bg-[#011826] border border-transparent placeholder-[#5fa7d9] text-[#e6f7ff] focus:outline-none focus:ring-2 focus:ring-[#00D0A6]/60"
            />
          </div>

          <div>
            <label className="sr-only" htmlFor="password">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              type="password"
              placeholder="Your password"
              className="w-full px-4 py-3 rounded-lg bg-[#011826] border border-transparent placeholder-[#5fa7d9] text-[#e6f7ff] focus:outline-none focus:ring-2 focus:ring-[#00D0A6]/60"
            />
          </div>

          <div className="flex items-center justify-between text-sm text-[#9FD6FF]">
            <a className="text-[#5B8CFF] hover:underline" href="#">
              Forgot password?
            </a>
            {/* github and google login */}
            <div className="flex items-center justify-between gap-5.5 text-xl cursor-pointer">
              <FaGithub />
              <GoogleButton />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-linear-to-r from-[#5B8CFF] to-[#00D0A6] text-black font-semibold shadow-md hover:scale-[1.01] transition-transform"
            >
              {state === "Login" ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-[#9FD6FF]">
          <p>
            {state === "Login"
              ? "Don’t have an account ?"
              : "Have an account ?"}{" "}
            <a
              onClick={() => setState(state === "Login" ? "Sign" : "Login")}
              className="text-[#5B8CFF] hover:underline cursor-pointer"
            >
              {state === "Login"
                ? "Create an account"
                : "Login to your account"}
            </a>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
