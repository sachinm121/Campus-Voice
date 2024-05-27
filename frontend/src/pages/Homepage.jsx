// import React from "react";
// import { Link } from "react-router-dom";
// import hostelGirl from "../assets/image/hostelGirl.jpg";
// import hostelBoy  from "../assets/image/hostelBoy2.jpg"
// import Button from "../components/Homepage/Button";
// import Card from "../components/Homepage/Card";
// import "./Homepage.css"
// import Navbar from "../components/Navbar";

// const Homepage = () => {
//   return (
//     <div className="flex flex-col justify-center items-center">
//       {/* Section1 */}
//       {/* <Navbar/> */}
//       <div className="flex flex-col border-solid border-2 border-pink-800 mt-1 w-full md:w-11/12 justify-center items-center">
//         <div className="flex flex-col md:flex-row items-center justify-around gap-8 px-5 md:px-10 lg:px-20">
//           <div className="w-full md:w-[48%] ml-16 text1">
//             <div>
//               <Link to={"/contactus"}>
//                 <div className="text-white flex flex-row gap-2 bg-gray-900 border-solid border-2 border-gray-700 text-center rounded-full justify-center w-fit py-1 px-3 hover:scale-95 transition-all duration-200">
//                   More Info - <div className="text-blue-500">Contact Us</div>
//                 </div>
//               </Link>
//             </div>
//             <div className="text-4xl font-semibold mt-4 w-full md:w-[50%]">
//               Empower Your College Experience
//             </div>
//             <div className="mt-4 text-gray-900 w-full md:w-[80%]">
//               Address issues and enhance your campus life with CampusVoice, the
//               streamlined college complaint system designed for efficiency and
//               clarity.
//             </div>

//             <div className="flex flex-row gap-5 mt-4">
//               <Button
//                 children={"Get Started"}
//                 active={true}
//                 linkto={"/signup"}
//               />
//               <Button
//                 children={"Learn More"}
//                 active={true}
//                 linkto={"/signup"}
//               />
//             </div>
//           </div>
//           <div className="w-full md:w-[60%] mt-4 md:mt-0">
//             <img
//               src={hostelGirl}
//               className="w-full h-auto md:w-[700px] md:h-[600px]"
//               alt="Hostel Girl"
//             ></img>
//           </div>
//         </div>
//       </div>

//       {/* Section2 */}
//       <div className="flex flex-col my-4 items-center">
//         {/* <div className="text-3xl font-bold">Impact at a Glance</div> */}
//         <div className="text-3xl font-bold">Our Impact</div>
//         <div className="text-[16px] px-4 text-center text-gray-600 w-full md:w-[85%] mt-3">
//           Transparently resolving student issues for a more conducive
//           educational environment. Take a look at how we make a difference.
//         </div>

//         <div className="flex flex-col rounded-md gap-5 mt-3 md:flex-row  md:justify-between md:gap-16 md:px-5 md:p-6">
//           {/* <div className="border-solide border-2 border-pink-600 px-24 py-5 rounded-md text-center shadow-lg shadow-pink-500">
//             <div className="text-4xl">2500</div>
//             <p>Complaints</p>
//           </div>
//           <div className="border-solide border-2 border-pink-600 px-24 py-5 rounded-md text-center  shadow-lg shadow-pink-500">
//             <div className="text-4xl">1990</div>
//             <p>Solved</p>
//           </div>
//           <div className="border-solide border-2 border-pink-600 px-24 py-5 rounded-md text-center shadow-lg shadow-pink-500">
//             <div className="text-4xl">79.6%</div>
//             <p>Satisfaction</p>
//           </div> */}

//           <Card value={"2500"} text={"Complaints"} />
//           <Card value={"1190"} text={"Solved"} />
//           <Card value={"79.6%"} text={"Satisfaction"} />
//         </div>
//       </div>

//       {/* Section3 */}
//       <div className="bg-gray-900 text-white w-11/12 flex flex-row justify-center mt-5 mb-10 p-10 items-center">
//           <div>
//             <div className="text-4xl font-bold">System Features</div>
//             <p className="w-[50%] mt-4 text-gray-400 text-xl">Explore the power tools and services offered by CampuseVoice to enhance the way complaints are addressed</p>
//           </div>
//           <div>
//               <img src={hostelBoy} className="w-[500px]" />
//           </div>
//       </div>
//     </div>
//   );
// };

// export default Homepage;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import hostelGirl from "../assets/image/hostelGirl.jpg";
import hostelBoy from "../assets/image/hostelBoy2.jpg";
import Button from "../components/Homepage/Button";
import Card from "../components/Homepage/Card";
import "./Homepage.css";
import Navbar from "../components/Navbar";
import { IoBagSharp } from "react-icons/io5";
import { IoMdMail } from "react-icons/io";
import { FaBell } from "react-icons/fa";
import { FaFireFlameCurved } from "react-icons/fa6";
import { MdWatchLater } from "react-icons/md";
import { BsCloudyFill } from "react-icons/bs";
import Footer from "../components/Homepage/Footer";
import axios from "axios";

const Homepage = ({ token, profileDetails }) => {
  const [complaintData, setComplaintData] = useState();

  // Fetch complaints based on user role
  useEffect(() => {
    const fetchedComplaints = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/complaint/getAllComplaints"
        );

        if (response && response.data) {
          // Check if response and response.data are defined
          const { success, complaints } = response.data;
          if (success) {
            setComplaintData(complaints);
            console.log(complaints);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchedComplaints();
  }, []);
  // console.log("Complaint Data:", complaintData.length)
  // const solved = 0
  // const noComplaints = complaintData.length;

  return (
    <div className="flex flex-col justify-center items-center">
      {/* Section1 */}
      {/* <Navbar/> */}
      <div className="w-[100%] lg:w-11/12">
        <div className="flex flex-col items-center justify-center w-full px-4 md:flex-row gap-5 ">
          <div className=" w-[98%]">
            <div>
             {profileDetails.role === "Student" && <Link to={"/contactus"}>
                <div className="text-white flex flex-row gap-2 bg-gray-900 border-solid border-2 border-gray-700 text-center rounded-full justify-center w-fit py-1 px-3 hover:scale-95 transition-all duration-200 md:text-[20px]">
                  More Info - <div className="text-blue-500">Contact Us</div>
                </div>
              </Link>}
            </div>

            <div className="text-4xl font-momo font-bold mt-4 w-full md:w-[50%] md:text-[56px] md:leading-[60px]">
              Welcome to Campus Voice
            </div>
            <div className="mt-4 sm:text-gray-800 w-[96%] md:text-[24px] md:font-semibold">
              Your comprehensive college complaint management system. Create an
              account to start managing your complaints or log in to view your
              dashboard.
            </div>

            {!token && (
              <div className="flex flex-row gap-5 mt-4">
                <Button
                  children={"Get Started"}
                  active={true}
                  linkto={"/sendotp"}
                />
                <Button
                  children={"Learn More"}
                  active={true}
                  linkto={"/sendotp"}
                />
              </div>
            )}
          </div>

          <div className="w-full md:w-[80%] mt-4 md:mt-0">
            <img
              src={hostelGirl}
              className="w-full h-auto md:w-[700px] md:h-[600px]"
              alt="Hostel Girl"
            ></img>
          </div>
        </div>
      </div>

      {/* Section2 */}
      <div className="flex flex-col my-4 items-center lg:w-11/12">
        {/* <div className="text-3xl font-bold">Impact at a Glance</div> */}
        <div className="text-3xl font-bold md:text-6xl">Our Impact</div>
        <div className="text-[16px] px-4 text-center text-gray-500 w-full mt-3 md:text-[24px] md:font-semibold">
          Transparently resolving student issues for a more conducive
          educational environment. Take a look at how we make a difference.
        </div>

        <div className="flex flex-col rounded-md gap-7 mt-6 md:flex-row lg:flex lg:gap-36">
          <Card value={`${19}`} text={"Complaints"} tag={"plus"} />
          <Card value={`${10}`} text={"Solved"} tag={"plus"} />
          <Card
            value={`${(10 / 19) * 100}`}
            text={"Satisfaction"}
            tag={"percent"}
          />
        </div>
      </div>

      {/* Section3 */}
      <div className="bg-gray-900 rounded-sm text-white flex flex-col gap-4 justify-center mt-5 mb-10 p-5 items-center lg:flex lg:flex-row lg:w-11/12">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 items-left">
            <div className="text-4xl font-bold text-gray-200 md:text-5xl">
              System Features
            </div>
            <p className="w-[98%] text-gray-300 md:text-[24px]">
              We prioritize user experience by providing easy navigation,
              efficient tracking, and secure complaint management.
            </p>

            {!token && <Button
              children={"Discover More"}
              active={true}
              linkto={"/sendotp"}
            />}
          </div>

          <div className="flex flex-col gap-3 text-gray-300  md:text-[24px]">
            <div className="flex gap-4 items-baseline">
              <p>
                <IoBagSharp />
              </p>
              <div>
                <p className="font-semibold">Easy Tracking</p>
                <p className="text-[14px]">
                  Stay updated with real-time status changes on all your
                  complaints, ensuring you're always in the loop.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-baseline">
              <p>
                <IoMdMail />
              </p>
              <div>
                <p className="font-semibold">Secure Login</p>
                <p className="text-[14px]">
                  Protect your privacy with our secure sign-up and login system,
                  keeping all your personal information safe.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-baseline">
              <p>
                <FaBell />
              </p>
              <div>
                <p className="font-semibold">Admin Control</p>
                <p className="text-[14px]">
                  Full administrative functionality to oversee complaint status,
                  student information, and manage service providers.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <img src={hostelBoy} className="w-[500px] md:w-[700px]" />
        </div>
      </div>

      {/* Section4 */}
      <div className="bg-gray-900 rounded-sm text-white flex flex-col gap-4 justify-center mt-5 mb-10 p-5 items-center lg:flex lg:items-start lg:w-11/12">
        <div className="flex flex-col gap-4 lg:flex lg:flex-row">
          <div className="flex flex-col gap-3">
            <div className="text-4xl font-bold text-gray-200 md:text-5xl">
              Key Features
            </div>
            <p className="w-[98%] text-gray-300 md:text-[24px]">
              Dive deeper into the features that make Campus Voice a reliable
              and user-friendly complaint management system.
            </p>
            {!token && (
              <Button
                children={"More Details"}
                active={true}
                linkto={"/sendotp"}
              />
            )}
          </div>

          <div className="flex flex-col gap-3 text-gray-300  md:text-[24px] md:flex md:flex-row lg:flex lg:flex-row lg:flex-wrap lg:w-[60%]">
            <div className="flex flex-col gap-2 items-baseline">
              <p>
                <FaFireFlameCurved />
              </p>
              <div>
                <p className="font-semibold">User Reports</p>
                <p className="text-[14px]">
                  Create a detailed complaint with our user-friendly reporting
                  tools and track its progress towards resolution.
                </p>
              </div>
            </div>
            <div className="flex-col flex gap-2 items-baseline">
              <p>
                <MdWatchLater />
              </p>
              <div>
                <p className="font-semibold">Admin Insight</p>
                <p className="text-[14px]">
                  Admin Insight Administrators can easily access student info,
                  update complaint statuses, and add service providers within
                  the platform.
                </p>
              </div>
            </div>
            <div className="flex flex-col  gap-2 items-baseline">
              <p>
                <BsCloudyFill />
              </p>
              <div>
                <p className="font-semibold">Provider Access</p>
                <p className="text-[14px]">
                  Service providers have targeted access to complaints relevant
                  to their services, allowing for efficient resolution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section5 */}
      <div className="flex flex-col justify-center items-start p-5 gap-3 lg:w-11/12">
        <div className="text-black text-4xl font-extrabold md:text-6xl">
          FAQs
        </div>
        <p className=" md:text-[24px]">
          Get your questions answered right from the get-go and understand how
          our system can work for you.
        </p>
        <div className="flex flex-col gap-5  lg:flex lg:flex-row lg:gap-8 lg:w[50%]">
          <div className="flex flex-col gap-4  lg:w-[70%]">
            <div className="flex flex-col">
              <p className="font-semibold text-[18px]  md:text-[24px]">
                How do I report a new complaint?{" "}
              </p>
              <p className=" md:text-[22px]">
                Simply log in to your account, navigate to the complaint
                section, and fill out the complaint submission form.
              </p>
            </div>

            <div>
              <p className="font-semibold text-[18px]  md:text-[24px]">
                Can I track the status of my complaint?{" "}
              </p>
              <p className=" md:text-[22px]">
                Yes, once logged in, you'll find an up-to-date status of each
                complaint you've submitted in your dashboard.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4 lg:w-[70%]">
            <div className="flex flex-col">
              <p className="font-semibold text-[18px]  md:text-[24px]">
                What is the response time for a complaint?{" "}
              </p>
              <p className=" md:text-[22px]">
                Typical response times vary, but service providers aim to
                address complaints within 72 hours.
              </p>
            </div>

            <div>
              <p className="font-semibold text-[18px]  md:text-[24px]">
                Who can access my complaints?{" "}
              </p>
              <p className=" md:text-[22px]">
                Only relevant administrators and service providers assigned to
                your complaint can view the details for resolution.
              </p>
            </div>
          </div>
        </div>
      </div>
      <hr className=" bg-black" />

      {/*footer */}
      <Footer />
    </div>
  );
};

export default Homepage;
