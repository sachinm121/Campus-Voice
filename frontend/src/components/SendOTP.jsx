import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Button, message, Spin } from "antd";
import sendotp from "./../assets/image/otpsend.jpg";
import {jwtDecode} from "jwt-decode"

const SendOTP = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();

  const handleChange = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("enter");
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:4000/api/v1/auth/sendotp",
        { email }
      );
      setLoading(false);
      const { success } = response.data;
      if (success) {
        // navigate to signup page after OTP is sent
        navigator("/signup", { state: { email: email } });
        // Show success toast if OTP is sent successfully
        message.success("OTP sent successfully");
      } else {
        // Show error toast if OTP sending fails
        setLoading(false);
        message.error("Error occured");
      }
    } catch (error) {
      // Show error toast for network errors or other issues
      console.error("Error Sending OTP: ");
      setLoading(false);
      // message.error("Error Occured");

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // Set the backend error message if available
        message.error(error.response.data.message);
      } else {
        console.error("API: Error Sending OTP: ", error);
      }
    }
  };

  return (
    <div className="mt-3 w-full h-[88vh] flex flex-col items-center px-1 gap-5 md:gap-16 lg:flex-row lg:gap-2 md:px-0 lg:px-5">
      <div className="absolute top-2">{loading && <Spin />}</div>

      <div className="flex flex-col items-center gap-3">
        <div className="flex justify-center">
          <img src={sendotp} alt="" className="rounded-lg w-72 h-72 md:w-[32rem] md:h-[32rem] lg:w-[28rem] lg:h-[28rem]" />
        </div>
        <p className="text-gray-500 text-center md:text-[30px] w-[80%] md:mb-2 lg:w-[80%]">
          We will send you <strong>One Time Password </strong>on you email for
          verification
        </p>
      </div>
      <div className="flex flex-col items-center w-full">
        <form
          onSubmit={handleSubmit}
          className="w-[80%] flex flex-col items-start justify-center gap-5 md:w-[78%]"
        >
          <h2 className="text-2xl w-full font-semibold md:text-4xl">
            Enter your college email
          </h2>
          <input
            type="email"
            value={email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 md:text-4xl lg:text-4xl"
            required
          />
          <Button
            htmlType="submit"
            type="primary"
            loading={loading}
            className="h-9 md:w-48 md:h-16 md:text-[30px] md:font-semibold"
          >
            Send OTP
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SendOTP;
