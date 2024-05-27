import React, { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import {message} from "antd";
import loginImg from ".././assets/image/login.jpg"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const changeHandle = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, // Remove the square brackets around e.target.value
    });
  };

  const submitHandle = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/auth/login",
        formData
      );

      const { success, token } = response.data;

      if (success && token) {
        Cookies.set("token", token, { expires: 1 });
        message.success(response.data.message)
        window.location.replace("/");
      } else {
        alert(
          "Login failed, Please check your email and password and try again"
        );
      }
    } catch (error) {
      console.error("Error login in:", error);
      if(error.response && error.response.data && error.response.data.message){
        message.error(error.response.data.message)
      }
    }
  };
  return (
    <div className="w-full h-screen flex flex-col items-center gap-10 lg:flex-row lg:px-16 lg:justify-between">
      <img src={loginImg} alt="" className="rounded-md w-56 md:w-[60%] lg:w-[40%]" />
      <div className="border-2 border-gray-400 border-solid p-4 w-[80%] md:w-[70%] lg:w-[40%] shadow-lg shadow-gray-600">
        <h2 className="text-4xl mb-5">Login Form</h2>
        <form className="flex flex-col gap-5" onSubmit={submitHandle}>
          <input
            className="p-[10px] mt-[10px] rounded-md border border-[#ccc] border-solid"
            type="email"
            name="email"
            value={formData.email}
            onChange={changeHandle}
            placeholder="Email"
            required
          />
          <input
          className="p-[10px] mt-[10px] rounded-md border border-[#ccc] border-solid"
            type="password"
            name="password"
            value={formData.password}
            onChange={changeHandle}
            placeholder="Password"
            required
          />
          <button className="bg-blue-700 p-2 text-[16px] text-white font-bold rounded-md w-24 text-center" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;