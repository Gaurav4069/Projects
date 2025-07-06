import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

//axios is used to handle the request and response from the backend and react hot toast is used to send the notification

function Signup() {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

 const navigate = useNavigate()
 
  const handleCheckbox = (gender) => {
    setUser({ ...user, gender });
  };




  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/user/register",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message)
      }

    } catch (error) {
      toast.error(error.response.data.message)

      console.log(error)
    }







    setUser({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    });
  };

  return (
    <>
      <div className="font-[sans-serif] bg-white max-w-4xl flex items-center mx-auto md:h-5/6 p-4">
        <div className="grid md:grid-cols-3 items-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden">
          <div className="max-md:order-1 flex flex-col justify-center space-y-16 max-md:mt-16 min-h-full bg-gradient-to-r from-gray-900 to-gray-700 lg:px-8 px-4 py-4">
            <div>
              <h4 className="text-white text-lg font-semibold">
                Create Your Account
              </h4>
              <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">
                Welcome to our registration page! Get started by creating your
                account.
              </p>
            </div>
            <div>
              <h4 className="text-white text-lg font-semibold">
                Simple & Secure Registration
              </h4>
              <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">
                Our registration process is designed to be straightforward and
                secure. We prioritize your privacy and data security.
              </p>
            </div>
          </div>

          <form
            onSubmit={onSubmitHandler}
            className="md:col-span-2 w-full py-6 px-6 sm:px-16"
          >
            <div className="mb-6">
              <h3 className="text-gray-800 text-2xl font-bold">
                Create an account
              </h3>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Full Name
                </label>
                <input
                  value={user.fullName}
                  onChange={(e) =>
                    setUser({ ...user, fullName: e.target.value })
                  }
                  name="fullname"
                  type="text"
                  required
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Username
                </label>
                <input
                  value={user.username}
                  onChange={(e) =>
                    setUser({ ...user, username: e.target.value })
                  }
                  name="username"
                  type="text"
                  required
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                  placeholder="Enter username"
                />
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Password
                </label>
                <input
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  name="password"
                  type="password"
                  required
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                  placeholder="Enter password"
                />
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Confirm Password
                </label>
                <input
                  value={user.confirmPassword}
                  onChange={(e) =>
                    setUser({ ...user, confirmPassword: e.target.value })
                  }
                  name="confirmPassword"
                  type="password"
                  required
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                  placeholder="Confirm password"
                />
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <input
                    checked={user.gender === "male"}
                    onChange={() => handleCheckbox("male")}
                    id="male"
                    name="gender"
                    type="radio"
                    value="male"
                    required
                    className="h-4 w-4 shrink-0 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  />
                  <label htmlFor="male" className="ml-2 text-sm text-gray-800">
                    Male
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    checked={user.gender === "female"}
                    onChange={() => handleCheckbox("female")}
                    id="female"
                    name="gender"
                    type="radio"
                    value="female"
                    required
                    className="h-4 w-4 shrink-0 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="female"
                    className="ml-2 text-sm text-gray-800"
                  >
                    Female
                  </label>
                </div>
              </div>
            </div>
            <Link to="/login" className="font-light text-blue-500">
              Already have an account?????
            </Link>

            <div className="!mt-5">
              <button
                type="submit"
                className="w-full py-3 px-4 tracking-wider text-sm rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
