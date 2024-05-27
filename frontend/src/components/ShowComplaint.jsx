// import React, { useEffect, useState, useRef } from "react";
// import Cookies from "js-cookie";
// import { jwtDecode } from "jwt-decode";
// import { MdOutlineEdit } from "react-icons/md";
// import { MdDelete } from "react-icons/md";
// import {
//   Form,
//   Table,
//   Modal,
//   Button,
//   Select,
//   Input,
//   message,
//   Spin,
//   Upload,
// } from "antd";
// import { UploadOutlined } from "@ant-design/icons";
// import axios from "axios";
// import "./ShowComplaint.css";
// import { useForm } from "antd/es/form/Form";
// import { Doughnut } from "react-chartjs-2";
// import DashBoard from "./DashBoard";

// const { TextArea } = Input;

// const ShowComplaint = () => {
//   const [editable, setEditable] = useState(null);
//   const [allComplaints, setAllComplaints] = useState([]);
//   const [selectedStudent, setSelectedStudent] = useState([]);
//   const [studentDetailsModal, setStudentDetailsModal] = useState(false);
//   const [complaintImageModal, setComplaintImageModal] = useState(false);
//   const [complaintImage, setComplaintImage] = useState("");
//   const [formModal, setFormModal] = useState(false);
//   const [token, setToken] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [form] = Form.useForm();
//   const [change, setChange] = useState(0);
//   const [statuses, setStatuses] = useState()
//   const [profile, setProfile] = useState({
//     id: "",
//     email: "",
//     role: "",
//     serviceProviderRole: "",
//     image: "",
//   });

//   // Check if JWT token exists in cookie and decode it to extract user information
//   useEffect(() => {
//     const token = Cookies.get("token");
//     if (token) {
//       setToken(token);
//       const decodedToken = jwtDecode(token);
//       setProfile({ ...decodedToken });
//     }
//   }, []);

//   // Fetch complaints based on user role
//   useEffect(() => {
//     const fetchedComplaints = async () => {
//       try {
//         let response;
//         if (profile.role === "Student") {
//           response = await axios.get(
//             "http://localhost:4000/api/v1/complaint/studentComplaints",
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           );
//         } else if (profile.role === "Admin") {
//           response = await axios.get(
//             "http://localhost:4000/api/v1/complaint/adminComplaints",
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           );
//         } else if (profile.role === "ServiceProvider") {
//           response = await axios.get(
//             "http://localhost:4000/api/v1/complaint/serviceProviderComplaints",
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           );
//         }

//         if (response && response.data) {
//           // Check if response and response.data are defined
//           const { success, complaints } = response.data;
//           if (success) {
//             setAllComplaints(complaints);
//             // Use the callback function form of setAllComplaints
//             setAllComplaints(prevComplaints => {
//               const Pending = prevComplaints.filter(complaint => complaint.status === "Pending");
//               const Rejected = prevComplaints.filter(complaint => complaint.status === "Rejected");
//               const Solved = prevComplaints.filter(complaint => complaint.status === "Solved");
//               const Processing = prevComplaints.filter(complaint => complaint.status === "Processing");
//               setStatuses([Pending, Rejected, Solved, Processing]);
//               // console.log("Statuses", statuses)
//               return prevComplaints; // Return the unchanged state
//             });
//           }
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchedComplaints();
//   }, [profile, change]);

//   // Handle complaint status (e.g., Accept, Reject, Solve)
//   const handleStatus = async (id, status) => {
//     // changeStatusByAdmin
//     try {
//       let response;
//       if (status === "Processing") {
//         response = await axios.post(
//           "http://localhost:4000/api/v1/complaint/changeStatusByAdmin",
//           {
//             complaintId: id,
//             status: status,
//           },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//       } else if (status === "Rejected") {
//         response = await axios.post(
//           "http://localhost:4000/api/v1/complaint/changeStatusByAdmin",
//           {
//             complaintId: id,
//             status: status,
//           },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//       } else if (status === "Solved") {
//         response = await axios.post(
//           "http://localhost:4000/api/v1/complaint/changeStatusByServiceProvider",
//           {
//             complaintId: id,
//             status: status,
//           },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//       }

//       if (response.data.success) {
//         message.success(response.data.message);
//         setChange(!change);
//       }
//     } catch (error) {
//       if (
//         error.response &&
//         error.response.data &&
//         error.response.data.message
//       ) {
//         message.error(error.response.data.message);
//       }
//     }
//   };

//   // Define table columns
//   const columns = [
//     {
//       title: "ComplaintType",
//       dataIndex: "complaintType",
//     },
//     {
//       title: "Complaint",
//       dataIndex: "complaint",
//     },
//     {
//       title: "ComplaintImage",
//       dataIndex: "complaintImage",
//       render: (text, record) => (
//         <Button onClick={() => showComplaintImage(true, record.complaintImage)}>
//           Photo
//         </Button>
//       ),
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//     },
//     {
//       title: "StudentDetails",
//       render: (text, record) => (
//         <Button onClick={() => handleStudentDetails(record.sid)}>
//           View Student Details
//         </Button>
//       ),
//     },
//     {
//       title: "Actions",
//       render: (text, record) => (
//         <div className="flex gap-2 text-white">
//           {profile.role === "Admin" && (
//             <Button
//               type="primary"
//               onClick={() => handleStatus(record._id, "Processing")}
//               disabled={
//                 record.status === "Processing" ||
//                 record.status === "Rejected" ||
//                 record.status === "Solved"
//               }
//             >
//               Accept
//             </Button>
//           )}
//           {profile.role === "Admin" && (
//             <Button
//               danger
//               onClick={() => handleStatus(record._id, "Rejected")}
//               disabled={
//                 record.status === "Processing" ||
//                 record.status === "Rejected" ||
//                 record.status === "Solved"
//               }
//             >
//               Reject
//             </Button>
//           )}

//           {/* Edit complaint button */}
//           {profile.role === "Student" && (
//             <Button
//               type="primary"
//               disabled={
//                 record.status === "Processing" ||
//                 record.status === "Rejected" ||
//                 record.status === "Solved"
//               }
//               onClick={() => {
//                 setEditable(record);
//                 console.log("Record", editable);
//                 setFormModal(true);
//               }}
//             >
//               <MdOutlineEdit />
//             </Button>
//           )}
//           {profile.role === "Student" && (
//             <Button
//               danger
//               onClick={() => handleDelete(record._id)}
//               disabled={
//                 record.status === "Processing" ||
//                 record.status === "Rejected" ||
//                 record.status === "Solved"
//               }
//             >
//               <MdDelete />
//             </Button>
//           )}

//           {profile.role === "ServiceProvider" && (
//             <Button
//               type="primary"
//               onClick={() => handleStatus(record._id, "Solved")}
//               disabled={record.status === "Solved"}
//             >
//               Solve
//             </Button>
//           )}
//         </div>
//       ),
//     },
//   ];

//   // Handle form submission
//   const handleSubmit = async (values) => {
//     console.log("complaint values:", values);
//     try {
//       setLoading(true);

//       let response;
//       if (editable) {
//         // formDataToSend.append("complaintId", editable._id);
//         response = await axios.post(
//           "http://localhost:4000/api/v1/complaint/update",
//           {
//             ...values,
//             complaintId: editable._id,
//           },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               // Ensure that the Content-Type header is set to multipart/form-data
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );
//         setEditable(null);
//       } else {
//         response = await axios.post(
//           "http://localhost:4000/api/v1/complaint/create",
//           values,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               // Ensure that the Content-Type header is set to multipart/form-data
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );
//       }

//       if (response && response.data) {
//         const { success } = response.data;
//         if (success) {
//           message.success(response.data.message);
//           form.resetFields();
//           // window.location.reload();
//           setChange(!change)
//         } else {
//           message.error("Error");
//         }
//       }
//     } catch (error) {
//       console.log("Error", error);
//       message.error(error.response.data.message);
//     } finally {
//       setLoading(false);
//       setFormModal(false);
//     }
//   };

//   // Delete complaint
//   const handleDelete = async (id) => {
//     try {
//       setLoading(true);
//       const response = await axios.post(
//         "http://localhost:4000/api/v1/complaint/delete",
//         { complaintId: id },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const { success } = response.data;
//       if (success) {
//         setChange(!change);
//         setLoading(false);
//         message.success(response.data.message);
//       }
//     } catch (error) {
//       setLoading(false);
//       message.error(error.response.data.message);
//     }
//   };

//   // Open modal to show student details
//   const handleStudentDetails = (studentDetails) => {
//     setSelectedStudent(studentDetails);
//     setStudentDetailsModal(true);
//   };

//   // Open modal to show complaint image
//   const showComplaintImage = (flag, complaintImage) => {
//     setComplaintImage(complaintImage);
//     setComplaintImageModal(flag);
//   };

//   // Open or close complaint form modal
//   const handleFormModal = (flag) => {
//     if (!flag) {
//       setEditable(null);
//       window.location.reload();
//     }
//     setFormModal(flag);
//   };

//   // Set row class name based on complaint status
//   const getRowClassName = (record) => {
//     switch (record.status) {
//       case "Pending":
//         return "pending-row";
//       case "Processing":
//         return "processing-row";
//       case "Solved":
//         return "solved-row";
//       case "Rejected":
//         return "rejected-row";
//       default:
//         return "";
//     }
//   };

  

//   return (
//     <div className="table-container">
//       {loading && <Spin />}
//       <hr />
//       {profile.role === "Student" && (
//         <div className="w-[100%] flex flex-row justify-end items-center px-10 my-5">
//           <Button type="primary" onClick={() => handleFormModal(true)}>
//             Add Complaint
//           </Button>
//         </div>
//       )}
//       <hr />

//       {profile.role === "Admin" && <div className="analytics p-10">
//        <DashBoard status={statuses}/>
//       </div>
// }
//       <div className="table-responsive">
//         <Table
//           columns={columns}
//           dataSource={allComplaints}
//           rowClassName={getRowClassName}
//           rowKey="_id"
//           pagination= {{pageSize:5}}
//           className="w-[100%]"
//         />
//       </div>
//       {/* Modal to show student details */}
//       <Modal
//         title="Student Details"
//         open={studentDetailsModal}
//         onCancel={() => setStudentDetailsModal(false)}
//         footer={null}
//       >
//         {selectedStudent && (
//           <div>
//             <p>Name: {selectedStudent.name}</p>
//             <p>Contact No. : {selectedStudent.contactNumber}</p>
//           </div>
//         )}
//       </Modal>

//       {/* Modal to show complaint image */}
//       <Modal
//         title="Complaint Image"
//         open={complaintImageModal}
//         onCancel={() => setComplaintImageModal(false)}
//         footer={null}
//       >
//         {complaintImage ? (
//           <img src={complaintImage} alt="Complaint" />
//         ) : (
//           <div>No Image Found</div>
//         )}
//       </Modal>

//       {/* Modal for adding new complaint */}
//       <Modal
//         title={editable ? "Edit Complaint" : "Add Complaint"}
//         open={formModal}
//         onCancel={() => handleFormModal(false)}
//         footer={null}
//       >

//         <Form
//           form={form}
//           name="complaint-form"
//           onFinish={handleSubmit}
//           layout="vertical"
//           initialValues={editable && editable}
//         >
//           <Form.Item
//             name="complaintType"
//             label="Complaint Type"
//             rules={[{ message: "Please enter your contact number" }]}
//           >
//             <Select>
//               <Select.Option value="Maintenance">Maintenance</Select.Option>
//               <Select.Option value="Safety and Security">Safety and Security</Select.Option>
//               <Select.Option value="Food">Food</Select.Option>
//             </Select>
//           </Form.Item>

//           <Form.Item
//             name="complaint"
//             label="Type Your Complaint"
//             rules={[{ message: "Please enter your hostel" }]}
//           >
//             <TextArea 
//               rows={4}
//             />
//           </Form.Item>

//           <Form.Item name="complaintImage" label="Complaint Image">
//             <Upload maxCount={1} beforeUpload={() => false} fileList={[]}>
//               <Button icon={<UploadOutlined />}>Click to Upload</Button>
//             </Upload>
//           </Form.Item>

//           <Form.Item>
//             <Button type="primary" htmlType="submit" loading={loading}>
//                {/* Submit */}
//                {editable ? "Update" :"Submit"}
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default ShowComplaint;

import React, { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { MdOutlineEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import {
  Form,
  Table,
  Modal,
  Button,
  Select,
  Input,
  message,
  Spin,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import "./ShowComplaint.css";
import { useForm } from "antd/es/form/Form";
import { Doughnut } from "react-chartjs-2";
import DashBoard from "./DashBoard";

const { TextArea } = Input;

const ShowComplaint = () => {
  const [editable, setEditable] = useState(null);
  const [allComplaints, setAllComplaints] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState([]);
  const [studentDetailsModal, setStudentDetailsModal] = useState(false);
  const [complaintImageModal, setComplaintImageModal] = useState(false);
  const [complaintImage, setComplaintImage] = useState("");
  const [formModal, setFormModal] = useState(false);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [change, setChange] = useState(0);
  const [statuses, setStatuses] = useState()
  const [profile, setProfile] = useState({
    id: "",
    email: "",
    role: "",
    serviceProviderRole: "",
    image: "",
  });

  // Check if JWT token exists in cookie and decode it to extract user information
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setToken(token);
      const decodedToken = jwtDecode(token);
      setProfile({ ...decodedToken });
    }
  }, []);

  // Fetch complaints based on user role
  useEffect(() => {
    const fetchedComplaints = async () => {
      try {
        let response;
        if (profile.role === "Student") {
          response = await axios.get(
            "http://localhost:4000/api/v1/complaint/studentComplaints",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } else if (profile.role === "Admin") {
          response = await axios.get(
            "http://localhost:4000/api/v1/complaint/adminComplaints",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } else if (profile.role === "ServiceProvider") {
          response = await axios.get(
            "http://localhost:4000/api/v1/complaint/serviceProviderComplaints",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }

        if (response && response.data) {
          // Check if response and response.data are defined
          const { success, complaints } = response.data;
          if (success) {
            setAllComplaints(complaints);
            // Use the callback function form of setAllComplaints
            setAllComplaints(prevComplaints => {
              const Pending = prevComplaints.filter(complaint => complaint.status === "Pending");
              const Rejected = prevComplaints.filter(complaint => complaint.status === "Rejected");
              const Solved = prevComplaints.filter(complaint => complaint.status === "Solved");
              const Processing = prevComplaints.filter(complaint => complaint.status === "Processing");
              setStatuses([Pending, Rejected, Solved, Processing]);
              // console.log("Statuses", statuses)
              return prevComplaints; // Return the unchanged state
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchedComplaints();
  }, [profile, change]);

  // Handle complaint status (e.g., Accept, Reject, Solve)
  const handleStatus = async (id, status) => {
    // changeStatusByAdmin
    try {
      let response;
      setLoading(true)
      if (status === "Processing") {
        response = await axios.post(
          "http://localhost:4000/api/v1/complaint/changeStatusByAdmin",
          {
            complaintId: id,
            status: status,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else if (status === "Rejected") {
        response = await axios.post(
          "http://localhost:4000/api/v1/complaint/changeStatusByAdmin",
          {
            complaintId: id,
            status: status,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else if (status === "Solved") {
        response = await axios.post(
          "http://localhost:4000/api/v1/complaint/changeStatusByServiceProvider",
          {
            complaintId: id,
            status: status,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      if (response.data.success) {
        setLoading(false);
        message.success(response.data.message);
        setChange(!change);
      }
    } catch (error) {
      setLoading(false);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        message.error(error.response.data.message);
      }
    }
  };

  // Define table columns
  const columns = [
    {
      title: "ComplaintType",
      dataIndex: "complaintType",
    },
    {
      title: "Complaint",
      dataIndex: "complaint",
    },
    {
      title: "ComplaintImage",
      dataIndex: "complaintImage",
      render: (text, record) => (
        <Button onClick={() => showComplaintImage(true, record.complaintImage)}>
          Photo
        </Button>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "StudentDetails",
      render: (text, record) => (
        <Button onClick={() => handleStudentDetails(record.sid)}>
          View Student Details
        </Button>
      ),
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div className="flex gap-2 text-white">
          {profile.role === "Admin" && (
            <Button
              type="primary"
              onClick={() => handleStatus(record._id, "Processing")}
              disabled={
                record.status === "Processing" ||
                record.status === "Rejected" ||
                record.status === "Solved"
              }
            >
              Accept
            </Button>
          )}
          {profile.role === "Admin" && (
            <Button
              danger
              onClick={() => handleStatus(record._id, "Rejected")}
              disabled={
                record.status === "Processing" ||
                record.status === "Rejected" ||
                record.status === "Solved"
              }
            >
              Reject
            </Button>
          )}

          {/* Edit complaint button */}
          {profile.role === "Student" && (
            <Button
              type="primary"
              disabled={
                record.status === "Processing" ||
                record.status === "Rejected" ||
                record.status === "Solved"
              }
              onClick={() => {
                setEditable(record);
                console.log("Record", editable);
                setFormModal(true);
              }}
            >
              <MdOutlineEdit />
            </Button>
          )}
          {profile.role === "Student" && (
            <Button
              danger
              onClick={() => handleDelete(record._id)}
              disabled={
                record.status === "Processing" ||
                record.status === "Rejected" ||
                record.status === "Solved"
              }
            >
              <MdDelete />
            </Button>
          )}

          {profile.role === "ServiceProvider" && (
            <Button
              type="primary"
              onClick={() => handleStatus(record._id, "Solved")}
              disabled={record.status === "Solved"}
            >
              Solve
            </Button>
          )}
        </div>
      ),
    },
  ];

  // Handle form submission
  const handleSubmit = async (values) => {
    console.log("complaint values:", values);
    try {
      setLoading(true);

      let response;
      if (editable) {
        // formDataToSend.append("complaintId", editable._id);
        response = await axios.post(
          "http://localhost:4000/api/v1/complaint/update",
          {
            ...values,
            complaintId: editable._id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              // Ensure that the Content-Type header is set to multipart/form-data
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setEditable(null);
      } else {
        response = await axios.post(
          "http://localhost:4000/api/v1/complaint/create",
          values,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              // Ensure that the Content-Type header is set to multipart/form-data
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      if (response && response.data) {
        const { success } = response.data;
        if (success) {
          message.success(response.data.message);
          form.resetFields();
          // window.location.reload();
          setChange(!change)
        } else {
          message.error("Error");
        }
      }
    } catch (error) {
      console.log("Error", error);
      message.error(error.response.data.message);
    } finally {
      setLoading(false);
      setFormModal(false);
    }
  };

  // Delete complaint
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:4000/api/v1/complaint/delete",
        { complaintId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { success } = response.data;
      if (success) {
        setChange(!change);
        setLoading(false);
        message.success(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      message.error(error.response.data.message);
    }
  };

  // Open modal to show student details
  const handleStudentDetails = (studentDetails) => {
    setSelectedStudent(studentDetails);
    setStudentDetailsModal(true);
  };

  // Open modal to show complaint image
  const showComplaintImage = (flag, complaintImage) => {
    setComplaintImage(complaintImage);
    setComplaintImageModal(flag);
  };

  // Open or close complaint form modal
  const handleFormModal = (flag) => {
    if (!flag) {
      setEditable(null);
      window.location.reload();
    }
    setFormModal(flag);
  };

  // Set row class name based on complaint status
  const getRowClassName = (record) => {
    switch (record.status) {
      case "Pending":
        return "pending-row";
      case "Processing":
        return "processing-row";
      case "Solved":
        return "solved-row";
      case "Rejected":
        return "rejected-row";
      default:
        return "";
    }
  };

  

  return (
    <div className="table-container">
      {loading && <Spin className="absolute left-[50%] top-7" />}
      <hr />
      {profile.role === "Student" && (
        <div className="w-[100%] flex flex-row justify-end items-center px-10 my-5">
          <Button type="primary" onClick={() => handleFormModal(true)}>
            Add Complaint
          </Button>
        </div>
      )}
      <hr />

      {profile.role === "Admin" && <div className="analytics p-10">
       <DashBoard allComplaints={allComplaints}/>
      </div>
}
      <div className="table-responsive">
        <Table
          columns={columns}
          dataSource={allComplaints}
          rowClassName={getRowClassName}
          rowKey="_id"
          pagination= {{pageSize:5}}
          className="w-[100%]"
        />
      </div>
      {/* Modal to show student details */}
      <Modal
        title="Student Details"
        open={studentDetailsModal}
        onCancel={() => setStudentDetailsModal(false)}
        footer={null}
      >
        {selectedStudent && (
          <div>
            <p>Name: {selectedStudent.name}</p>
            <p>Contact No. : {selectedStudent.contactNumber}</p>
          </div>
        )}
      </Modal>

      {/* Modal to show complaint image */}
      <Modal
        title="Complaint Image"
        open={complaintImageModal}
        onCancel={() => setComplaintImageModal(false)}
        footer={null}
      >
        {complaintImage ? (
          <img src={complaintImage} alt="Complaint" />
        ) : (
          <div>No Image Found</div>
        )}
      </Modal>

      {/* Modal for adding new complaint */}
      <Modal
        title={editable ? "Edit Complaint" : "Add Complaint"}
        open={formModal}
        onCancel={() => handleFormModal(false)}
        footer={null}
      >

        <Form
          form={form}
          name="complaint-form"
          onFinish={handleSubmit}
          layout="vertical"
          initialValues={editable && editable}
        >
          <Form.Item
            name="complaintType"
            label="Complaint Type"
            rules={[{ message: "Please enter your contact number" }]}
          >
            <Select>
              <Select.Option value="Maintenance">Maintenance</Select.Option>
              <Select.Option value="Safety and Security">Safety and Security</Select.Option>
              <Select.Option value="Food">Food</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="complaint"
            label="Type Your Complaint"
            rules={[{ message: "Please enter your hostel" }]}
          >
            <TextArea 
              rows={4}
            />
          </Form.Item>

          <Form.Item name="complaintImage" label="Complaint Image">
            <Upload maxCount={1} beforeUpload={() => false} fileList={[]}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
               {/* Submit */}
               {editable ? "Update" :"Submit"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ShowComplaint;
