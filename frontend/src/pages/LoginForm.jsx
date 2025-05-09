import React, { useEffect, useState } from "react";
import loginImage from "/assets/login.png";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Add this import for eye icons
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility

  useEffect(() => {
    async function ckAuth() {
      try {
        const res = await fetch("/api/auth/login", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const data = await res.json();
        console.log(data);
        data.redirect ? navigate(data.redirect) : "";
      } catch (error) {
        console.error("Auth status error: ", error);
      }
    }
    ckAuth();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        throw new Error(data.message || "Login Failed");
      }
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible); // Toggle the password visibility state
  };

  return (
    <div className="min-h-screen flex bg-white">
      <div className="basis-[55%] hidden md:block">
        <img
          src={loginImage}
          alt="Login"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="basis-full md:basis-[45%] flex items-center justify-center px-6 bg-white">
        <div className="w-full max-w-md">
          <form
            className="space-y-7 bg-white p-6 rounded-2xl shadow-2xl"
            onSubmit={handleLogin}
          >
            <div className="text-center">
              <h1 className="text-2xl font-bold">Login</h1>
              <p className="text-gray-500 mt-1 text-sm">
                Welcome back, please enter your details to log in.
              </p>
            </div>

            <div className="text-left">
              <label htmlFor="email" className="block mb-2 text-sm font-medium">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="email3222@gm.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="text-left">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"} // Toggle between text and password based on state
                  id="password"
                  placeholder="********"
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility} // Toggle visibility when clicked
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {passwordVisible ? (
                    <AiFillEyeInvisible className="text-gray-500" />
                  ) : (
                    <AiFillEye className="text-gray-900" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <a
                href="/reset-password"
                className="text-gray-500 hover:underline"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-[#60E5AE] text-white rounded-xl hover:bg-green-500 transition duration-300"
            >
              Log In
            </button>

            <p className="text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-[#667085] hover:underline">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
