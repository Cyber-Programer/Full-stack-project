import React, { useState } from "react";
import signup from "/assets/signup.png";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link } from 'react-router-dom';


export default function SignupForm() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [confurmPassword, setconfurmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible); // Toggle the password visibility state
  };
  return (
    <div className="min-h-screen flex bg-white">
      <div className="basis-[50%] hidden lg:block">
        <img src={signup} alt="img" className="w-full h-full object-cover" />
      </div>
      <div className="basis-full lg:basis-[50%] flex items-center justify-center px-6 bg-white">
        <div className="w-full max-w-lg">
          <form
            action=""
            className="space-y-7 bg-white p-6 rounded-2xl shadow-2xl"
          >
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-2">Sign Up</h1>
              <p className="text-sm font-light">
                To Create Account,Please Fill i the from Below
              </p>
            </div>
            <div className=" flex flex-col">
              <label htmlFor="text" className="mb-2 font-medium">
                Full Name
              </label>
              <input
                className="border-2 rounded-2xl px-3 py-2 border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setname(e.target.value)}
                placeholder="full name..."
                required
              />
            </div>
            <div className=" flex flex-col">
              <label htmlFor="text" className="mb-2 font-medium">
                Email Adders
              </label>
              <input
                className="border-2 rounded-2xl px-3 py-2 border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                placeholder="yourmail@gmail.com"
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
            <div className="text-left">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium"
              >
                Confurm Passowrd
              </label>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"} // Toggle between text and password based on state
                  id="password"
                  placeholder="********"
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={confurmPassword}
                  onChange={(e) => setconfurmPassword(e.target.value)}
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
            <input
              type="submit"
              value="Sign Up"
              className="w-full bg-green-500 py-3 text-lg font-normal text-white hover:bg-green-600 rounded-2xl"
            />
            <span className="text-sm text-gray-300 text-center w-full inline-block">
              Already have an account?{" "}
              <Link to="/login" className="font-bold text-gray-500 hover:underline">
                Log in
              </Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}
