import React, { useEffect, useState } from "react";
import Nav from "../features/Nav";
import fileLogo from "/assets/file.svg";
import NoTaskFound from "../features/NoTaskFound";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [data, updateData] = useState({
    tasks: [],
    currentPage: 1,
    totalPages: 0,
    totalTasks: 0,
  });

  const [userdata, setUserData] = useState({
    message: "",
    user: {
      id: "",
      name: "",
      email: "",
    },
  });

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
          console.log(res)
          navigate("/login"); // 👈 redirect to login if not authorized
        }
        const data = await res.json();
        console.log(data)
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
    // move this outside useEffect
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/tasks/viewAll", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const apiData = await response.json();

      updateData({
        tasks: apiData.tasks || [],
        currentPage: apiData.currentPage || 1,
        totalPages: apiData.totalPages || 0,
        totalTasks: apiData.totalTasks || 0,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      updateData({
        tasks: [],
        currentPage: 1,
        totalPages: 0,
        totalTasks: 0,
      });
    }
  };

  async function deleteTask(id) {
    try {
      const res = await fetch(`/api/tasks/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (res.ok) {
        toast.success("Task deleted successfully!");
        fetchData();
      } else {
        const error = await res.json();
        toast.error(error.message || "Failed to delete task.");
      }
    } catch (err) {
      toast.error("Something went wrong.");
      console.error(err);
    }
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="min-h-screen bg-gray-200">
        <Nav data={userdata} />
        <div className="relative max-w-11/12 md:max-w-3xl lg:max-w-11/12 h-[600px] md:h-[700px] bg-white mx-auto -mt-16 z-20 p-6 rounded-xl shadow-md">
          <div className="flex w-full justify-between">
            {/* all task and dropdown part */}
            <h3 className="font-semibold text-1xl md:text-3xl ">
              All Task List
            </h3>
            <div className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4 lg:gap-8 flex-nowrap">
              <div>
                <select
                  name="category"
                  id="category"
                  className="outline-0 border-gray-300 border-2 px-0.5 md:px-5 py-2 md:py-2 rounded-lg text-sm md:text-lg"
                >
                  <option value="" disabled selected hidden>
                    Select task category
                  </option>
                  <option value="arts" className="capitalize">
                    arts and carft
                  </option>
                  <option value="nature" className="capitalize">
                    nature
                  </option>
                  <option value="family" className="capitalize">
                    family
                  </option>
                  <option value="sport" className="capitalize">
                    sport
                  </option>
                  <option value="friends" className="capitalize">
                    friends
                  </option>
                  <option value="meditation" className="capitalize"></option>
                </select>
              </div>
              <div>
                <select
                  name="status"
                  id="status"
                  className="outline-0 border-gray-300 border-2 px-3 md:px-5 py-1 md:py-2 capitalize rounded-lg text-sm md:text-lg"
                >
                  <option value="all">all task</option>
                  <option value="ongoing">ongoing</option>
                  <option value="pending">pending</option>
                  <option value="collaborative">collaborative task</option>
                  <option value="done">done</option>
                </select>
              </div>
              <button onClick={()=>{navigate('/newtask')}} className="capitalize bg-[#60E5AE] px-4 py-2 rounded-lg flex gap-2 cursor-pointer">
                {" "}
                <img src={fileLogo} alt="img"/> add new Task
              </button>
            </div>
          </div>
          {/* task list part */}
          {data.totalTasks !== 0 ? (
            <div className="w-full grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3  h-[400px] md:h-[570px] mt-10 mb-4 ">
              {/* card */}
              {data.tasks.map((task) => {
                return (
                  <div className="card w-12/12 md:w-12/12  rounded-2xl shadow-lg shadow-gray-300 h-[200px]">
                    <div
                      key={task._id}
                      className="flex justify-between px-3 py-2"
                    >
                      <div className="flex items-center gap-4">
                        <img src="/assets/taskIco.svg" alt="taskimg" />
                        <h3 className="text-xl font-semibold capitalize cursor-pointer">
                          {task.title}
                        </h3>
                      </div>
                      <img
                        className="cursor-pointer"
                        src="/assets/trash.svg"
                        alt="trashimg"
                        onClick={() => {
                          deleteTask(task._id);
                        }}
                      />
                    </div>
                    <div className="w-full pl-15 pr-2">
                      <p className="text-gray-500">
                        {task.description.slice(0, 50) + " ...."}
                      </p>
                    </div>
                    <div className="flex justify-between items-center px-5 mt-5">
                      <div className="flex gap-2 items-center">
                        <img src="/assets/calendar.svg" alt="callender" />
                        <p>
                          {new Date(task.createdAt).toLocaleDateString(
                            undefined,
                            {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </div>
                      <p className="capitalize">• {task.status}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <NoTaskFound />
          )}
        </div>
      </div>
    </>
  );
};
export default Dashboard;
