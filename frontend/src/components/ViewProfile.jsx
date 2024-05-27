import React, { useEffect, useState } from "react";
import { Button,Spin } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const ViewProfile = ({ profileDetails, token }) => {
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);
  const [change, setChange] = useState(false);
  const [formData, setFormData] = useState({
    name: profileDetails && profileDetails.name,
    email: profileDetails && profileDetails.email,
    contactNumber: profileDetails && profileDetails.contactNumber,
    role: profileDetails && profileDetails.role,
    hostel:
      (profileDetails.studentDetails && profileDetails.studentDetails.hostel) ||
      "",
    roomNo:
      (profileDetails.studentDetails && profileDetails.studentDetails.roomNo) ||
      "",
    registrationNo:
      (profileDetails.studentDetails &&
        profileDetails.studentDetails.registrationNo) ||
      "",
    branch:
      (profileDetails.studentDetails && profileDetails.studentDetails.branch) ||
      "",
    serviceProviderRole:
      (profileDetails.serviceProviderDetails &&
        profileDetails.serviceProviderDetails.serviceProviderRole) ||
      "",
  });

  const imageHandleChange = (e) => {
    setImage(e.target.files[0]);
  };

  const uploadImage = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", image);
      
      const response = await axios.post(
        "http://localhost:4000/api/v1/auth/profileupdate",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if(response.data.success){
        setLoading(false);
        setChange(!change)
      }
    } catch (error) {
      setLoading(false);
      console.error("Error uploading image:", error);
    }
  };

  const profileHandleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const profileSubmitHandler = async (e) => {
    e.preventDefault();
    // Handle form submission here

    try {
      setLoading(true)
      const response = await axios.post(
        "http://localhost:4000/api/v1/auth/profileupdate",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if(response.data.success){
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error updating data:", error);
    }
  };

  useEffect(() => {

  }, [image, change])

  return (
    <div className="pt-5 flex flex-col items-center gap-10 mb-5">
      {loading && <Spin className="absolute top-16" />}
      <div className="w-[90%] flex flex-col gap-3 border-2 pt-3">
        <h1 className="text-[20px] font-bold pl-5">Profile Picture</h1>
        <hr />
        <div className="flex flex-col gap-3 items-center">
          <img
            className="w-40 h-40 rounded-full"
            src={profileDetails.image}
            alt=""
          />
          <p>JPG or PNG no larger than 5MB</p>
          <form
            onSubmit={uploadImage}
            className="flex flex-col gap-3 my-5 justify-center"
          >
            <input type="file" name="image" onChange={imageHandleChange} />
            <Button type="primary" htmlType="submit">
              Upload new image
            </Button>
          </form>
        </div>
      </div>
      <div className="w-[90%] flex flex-col gap-3 border-2 pt-3">
        <h1 className="text-[20px] font-bold pl-5">Account Details</h1>
        <hr />
        <form onSubmit={profileSubmitHandler} className="flex flex-col p-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col">
              <label htmlFor="name" className="font-bold">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                name="name"
                onChange={profileHandleChange}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="font-bold">
                Email
              </label>
              <input
                type="text"
                id="email"
                value={formData.email}
                name="email"
                onChange={profileHandleChange}
                disabled
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="contactNumber" className="font-bold">
                Contact Number
              </label>
              <input
                type="text"
                id="contactNumber"
                value={formData.contactNumber}
                name="contactNumber"
                onChange={profileHandleChange}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="role" className="font-bold">
                Role
              </label>
              <input
                type="text"
                id="role"
                value={formData.role}
                name="role"
                onChange={profileHandleChange}
                disabled
              />
            </div>

            {profileDetails.role === "Student" && (
              <>
                <div className="flex flex-col">
                  <label htmlFor="hostel" className="font-bold">
                    Hostel
                  </label>
                  <input
                    type="text"
                    id="hostel"
                    value={formData.hostel}
                    name="hostel"
                    onChange={profileHandleChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="roomNo" className="font-bold">
                    Room No
                  </label>
                  <input
                    type="text"
                    id="roomNo"
                    value={formData.roomNo}
                    name="roomNo"
                    onChange={profileHandleChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="role" className="font-bold">
                    Registeration No.
                  </label>
                  <input
                    type="text"
                    id="registrationNo"
                    value={formData.registrationNo}
                    name="registrationNo"
                    onChange={profileHandleChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="role" className="font-bold">
                    Branch
                  </label>
                  <input
                    type="text"
                    id="branch"
                    value={formData.branch}
                    name="branch"
                    onChange={profileHandleChange}
                  />
                </div>
              </>
            )}
            {profileDetails.role === "ServiceProvider" && (
              <div className="flex flex-col">
                <label htmlFor="serviceProviderRole" className="font-bold">
                  Service Provider Role
                </label>
                <input
                  type="text"
                  id="serviceProviderRole"
                  value={formData.serviceProviderRole}
                  name="serviceProviderRole"
                  onChange={profileHandleChange}
                />
              </div>
            )}
          </div>
          {/* Add other form fields here */}
          <Button type="primary" htmlType="submit" className="mt-5">
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ViewProfile;
