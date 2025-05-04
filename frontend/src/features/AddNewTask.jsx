import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddNewTask = () => {
  const navigate = useNavigate();

  const [userdata, setUserData] = useState({
    message: "",
    user: {
      id: "",
      name: "",
      email: "",
    },
  });

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
  });

  useEffect(() => {
    const callUserData = async () => {
      try {
        const res = await fetch("/api/dashboard", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!res.ok) {
          if (res.status === 401 || res.status === 403) {
            navigate("/login");
          }
          return;
        }

        const data = await res.json();

        setUserData({
          message: data.message,
          user: {
            id: data.data._id,
            name: data.data.name,
            email: data.data.email,
          },
        });
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    callUserData();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const addNewTask = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.category || !formData.description) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch("/api/tasks/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Task created successfully!");
        setFormData({ title: "", category: "", description: "" });
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        toast.error(data.message || "Failed to create task.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-200">
      <ToastContainer />
      <Nav data={userdata} />

      <div className="relative max-w-lg md:max-w-3xl lg:max-w-11/12 h-auto bg-white mx-auto -mt-16 z-20 p-6 rounded-xl shadow-md">
        <div className="w-full flex justify-between">
          <h1 className="capitalize text-2xl font-medium">add your new task</h1>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-[#60E5AE] active:bg-green-500 cursor-pointer px-10 py-3 capitalize text-lg rounded-lg"
          >
            back
          </button>
        </div>

        <form className="mt-5" onSubmit={addNewTask}>
          <label htmlFor="title" className="font-medium mt-5 mb-1 block">
            Task Name
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter Your Task Name"
            className="border-2 border-gray-200 px-5 py-2 w-full rounded-lg outline-0"
          />

          <label htmlFor="category" className="font-medium mt-5 mb-1 block">
            Select Task Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="capitalize w-full border-2 border-gray-300 px-5 py-2 outline-0 text-gray-600"
          >
            <option value="" hidden>
              select a category
            </option>
            <option value="arts and carts">craft</option>
            <option value="nature">nature</option>
            <option value="sports">sport</option>
            <option value="friends">friends</option>
            <option value="meditation">meditation</option>
            <option value="others">others</option>
          </select>

          <label htmlFor="description" className="font-medium mt-5 mb-1 block">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter Task Description"
            className="border-2 border-gray-200 px-5 py-2 w-full rounded-lg outline-0"
          />

          <button
            type="submit"
            className="w-full text-center mt-10 bg-[#60E5AE] py-3 text-xl rounded-lg cursor-pointer active:bg-green-300 font-medium"
          >
            Add To Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewTask;
