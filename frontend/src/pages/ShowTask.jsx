import React, { useEffect, useState } from "react";
import Nav from "../features/Nav";
import { Link, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ShowTask = () => {
  const { id } = useParams();
  console.log(id);
  const [taskData, setTaskData] = useState(null);
  const [status, setStatus] = useState(null);
  const [userdata, setUserData] = useState({
    message: "",
    user: {
      id: "",
      name: "",
      email: "",
    },
  });

  async function cngTaskStatus() {
    try {
      const res = await fetch(`/api/tasks/status/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ status }), // sending state value
      });

      // const data = await res.json();
      if (res.ok) {
        // console.log("Status updated:", data);
        toast.success("Status updated successfully");
      } else {
        // console.error("Failed to update status:", data.message);
        toast.error('Failed to update status');
        console.log(res.status)
      }
    } catch (error) {
      console.error(error.message);
      toast.error(error.message || "can't change your task status.try again.");
    }
  }
  async function Task() {
    try {
      const res = await fetch(`/api/tasks/showTask/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!res.ok) return toast.error("Response not ok: ", res.status);
      const data = await res.json();
      // console.log(data);
      toast.success("Task fetch success");
      return data;
    } catch (error) {
      console.error(error);
      toast.error(error.message || "can't fetch your task.try again.");
    }
  }

  useEffect(() => {
    try {
      async function callUserData() {
        const res = await fetch("/api/dashboard", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (res.status === 401 || res.status === 403) {
          console.log(res);
          navigate("/login"); // 👈 redirect to login if not authorized
        }
        const data = await res.json();
        console.log(data);
        setUserData({
          message: data.message,
          user: {
            id: data.data._id,
            name: data.data.name,
            email: data.data.email,
          },
        });
      }
      callUserData();
    } catch (error) {
      console.log("error on fetching upserData ", error);
    }
  }, []);

  useEffect(() => {
    (async () => {
      let data = await Task();
      setTaskData(data);
    })();
  }, []);

  if (!taskData) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="min-h-screen bg-gray-200">
      <ToastContainer position="top-right" autoClose={3000} />
      <Nav data={userdata} />
      <div className="relative max-w-lg md:max-w-3xl lg:max-w-11/12 h-fit md:h-[700px] bg-white mx-auto -mt-16 z-20 p-6 rounded-xl shadow-md mb-10">
        <div className="w-full flex justify-between py-5 items-center">
          <h2 className="text-xl md:text-3xl font-bold">Task Details</h2>
          <div className="flex gap-2 md:gap-5 items-center">
            <button className="cursor-pointer flex gap-1 items-center bg-[#ffca4d73] text-[#ff9d00] px-3 py-2 rounded-lg text-sm md:text-2xl font-medium">
              <img src="/assets/edit.png" alt="img" />
              Edit Task
            </button>
            <Link
              to={"/dashboard"}
              className="bg-[#60e5ae] font-normal capitalize text-sm md:text-2xl px-3 py-3 rounded-lg"
            >
              back
            </Link>
          </div>
        </div>
        <hr className="text-gray-200" />
        {/* task details part */}
        <div className="mt-10 h-full flex gap-5 md:gap-10">
          {/* task img ico */}
          <div className="max-h-full inline-block">
            <img
              src="/assets/taskIco.svg"
              alt="img"
              className="w-[5rem] md:w-[4rem]"
            />
          </div>
          {/* full task part */}
          <div className="h-full w-full relative">
            <h1 className="text-2xl md:text-3xl lg:text-5xl font-medium">
              {taskData.task.title || "Task Title"}
            </h1>
            <p className="w-full mt-5 font-serif text-sm md:text-lg lg:text-2xl ">
              {taskData.task.description}
              {console.log(taskData)}
            </p>

            <select
              name="status"
              id="status"
              className="mt-5 outline-0 border-gray-300 border-2 px-3 md:px-5 py-1 md:py-2 capitalize rounded-lg text-sm md:text-lg"
              onChange={(e) => setStatus(e.target.value)}
            >
              <option hidden>all status</option>
              <option value="ongoing">ongoing</option>
              <option value="pending">pending</option>
              <option value="collaborative">collaborative task</option>
              <option value="done">done</option>
            </select>

            <div className="w-full justify-end flex gap-5 md:gap-10 mt-8">
              <button className="bg-red-200 px-5 py-3 rounded-lg font-normal text-red-500 text-lg cursor-pointer">
                Delete Task
              </button>
              <button
                className="bg-green-300 px-5 py-3 rounded-lg font-normal cursor-pointer"
                onClick={cngTaskStatus}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowTask;
