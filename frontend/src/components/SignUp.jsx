import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { message, Spin } from "antd";
import singupImg from "../assets/image/signup.jpg"

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    password: "",
    confirmPassword: "",
  });
  const navigator = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  if (location.state && location.state.email) {
    formData.email = location.state.email;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:4000/api/v1/auth/signup",
        formData
      );
      setLoading(false);
      const { success } = response.data;
      console.log(response.data);
      if (success) {
        // Signup successful, redirect to login page
        navigator("/login");
        // Show success toast
        message.success("User Sign up successfully");
      } else {
        // Handle signup failure (show error message)
        setLoading(false);
      }
    } catch (error) {
      // Handle network errors or other issues
      message.error(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center md:gap-0 lg:flex-row lg:px-36 lg:justify-between">
      <div className="absolute top-5 left-[700px]">{loading && <Spin />}</div>

      <img className="w-56 h-56 md:w-96 md:h-96" src={singupImg} alt="" />
      <div className="max-w-md bg-white rounded-lg overflow-hidden shadow-2xl p-6 w-[90%]">
        <h2 className="text-2xl font-semibold mb-4 md:text-3xl md:font-bold">Signup</h2>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          {/* Add input fields for name, email, password, role, etc. */}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
            minLength="2"
            maxLength="50"
            className="mb-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 md:text-xl"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="mb-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 md:text-xl"
          />

          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="Conatct Number"
            required
            className="mb-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 md:text-xl"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="mb-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 md:text-xl"
          />
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
            className="mb-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 md:text-xl"
          />

          <input
            type="text"
            name="otp"
            value={formData.otp}
            onChange={handleChange}
            placeholder="OTP"
            required
            className="mb-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 md:text-xl"
          />
          {/* Add more input fields as needed */}
          <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 md:text-2xl md:font-bold md:mt-2">Signup</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
