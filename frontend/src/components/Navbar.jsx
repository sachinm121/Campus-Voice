// import React, { useEffect, useState } from "react";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";
// import Cookies from "js-cookie";
// import "./Navbar.css";

// const Navbar = () => {
//   const [showMenu, setShowMenu] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track user's authentication status
//   const [profile, setProfile] = useState({
//     id: "",
//     email: "",
//     role: "",
//     serviceProviderRole: "",
//     image: "",
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//     // Check if JWT token exists in cookie
//     const token = Cookies.get("token");
//     if (token) {
//       // Decode the token to extract user information
//       const decodedToken = jwtDecode(token);

//       // set Profile data
//       setProfile({
//         ...decodedToken,
//       });

//       // console.log("Profile", profile);

//       // Check if the token is expired
//       const currentTime = Date.now() / 1000; // Convert milliseconds to seconds
//       if (decodedToken.exp > currentTime) {
//         setIsLoggedIn(true);
//       } else {
//         // Token expired, clear cookie and set isLoggedIn to false
//         Cookies.remove("token");
//         setIsLoggedIn(false);
//         navigate("/login")
//       }
//     } else {
//       setIsLoggedIn(false);
//     }
//   }, []);

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 768) {
//         setShowMenu(false);
//       }
//     };

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   });

//   const toggleMenu = () => {
//     setShowMenu(!showMenu);
//   };

//   const handleOutSideClick = (event) => {
//     if(!event.target.closest("#options") && !event.target.closest("#profile")){
//       setShowMenu(false);
//     }
//   }

//   useEffect(() => {
//     document.addEventListener("click", handleOutSideClick)
//     return (
//       document.addEventListener("click", handleOutSideClick)
//     )
//   })

//   // Function to handle user logout
//   const handleLogout = () => {
//     // Clear JWT token from cookie
//     Cookies.remove("token");
//     // Set isLoggedIn state to false
//     setIsLoggedIn(false);
//     navigate("/login")
//   };

//   const clicked = () => {
//     navigate("/addcomplaint");
//   };

//   return (
//     <div>
//       <nav className="w-full flex flex-row items-center h-5 px-4 py-10">
//         <div className="md:hidden text-3xl mr-5" id="profile">
//           <button onClick={toggleMenu} >☰</button>
//         </div>
//         <NavLink to="/" className="text-4xl font-bold text-lime-600 mr-10 logo">
//           CampusVoice
//         </NavLink>
//         <div className="w-[80%] flex flex-row items-center justify-between">
//           <div
//             className={`flex flex-row gap-[2vw] text-black text-xl font-bold links`}
//           >
//             <Link to="/">Home</Link>
//             <Link to="/contactus">ContactUs</Link>
//             {isLoggedIn && <Link to="/showComplaints">Complaint</Link>}
//             {!isLoggedIn && <Link to="/sendotp">Sign Up</Link>}
//             {!isLoggedIn && <Link to="/login">Login</Link>}
//             {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
//           </div>
//           { isLoggedIn &&
//             <div className="w-[50px] h-[50px] absolute right-6">
//               <img
//                 className="w-full h-full rounded-full border-2 border-solid border-black"
//                 src={profile.image}
//               />
//             </div>
//           }
//         </div>
//       </nav>
//       {showMenu && <div className="md:hidden w-[320px] h-[180px] bg-gray-400 rounded-sm absolute left-4 flex flex-col p-4 gap-4" id="options">
//         <Link to="/">Home</Link>
//         {!isLoggedIn && <Link to="/contactus">ContactUs</Link>}
//         {isLoggedIn && <Link to="/showComplaints">Complaint</Link>}

//         <div className="flex flex-row justify-around">
//           {!isLoggedIn && <Link className="bg-blue-700 p-2 text-[16px] text-white font-bold rounded-md w-24 text-center" to="/sendotp">Sign Up</Link>}
//           {!isLoggedIn && <Link className="bg-blue-700 p-2 text-[16px] text-white font-bold rounded-md w-24 text-center" to="/login">Login</Link>}
//         </div>
//         {isLoggedIn && (
//           <button className="bg-blue-700 p-2 text-center text-[16px] text-white font-bold rounded-md w-24" onClick={handleLogout}>
//             Logout
//           </button>
//         )}
//       </div>}
//     </div>
//   );
// };

// export default Navbar;

import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import "./Navbar.css";
import { IoIosMenu } from "react-icons/io";
import { FaGreaterThan } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { TiUserAdd } from "react-icons/ti";
import { BiSolidUserDetail } from "react-icons/bi";
import axios from "axios";
import { Modal, Input, Button, Form, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ViewProfile from "./ViewProfile";

const Navbar = ({ setToken, setProfileDetails }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [token1, setToken1] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const [showProfile, setShowProfile] = useState(false);
  const [profile, setProfile] = useState({
    id: "",
    email: "",
    role: "",
    serviceProviderRole: "",
    image: "",
  });

  // useNavigate instance
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      // Set token for home
      setToken(token);

      // Set token for navbar
      setToken1(token1);

      // Decode the token
      const decodedToken = jwtDecode(token);
      setProfile({
        ...decodedToken,
      });
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp > currentTime) {
        setIsLoggedIn(true);
      } else {
        Cookies.remove("token");
        setIsLoggedIn(false);
        navigate("/login");
      }
    } else {
      setIsLoggedIn(false);
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const handleUserDetails = async () => {
      if (profile.id && profile.role) {
        const response = await axios.post(
          "http://localhost:4000/api/v1/auth/userdetails",
          { id: profile.id, role: profile.role }
        );

        if (response.data.success) {
          setUserDetails(response.data.userDetails);
          setProfileDetails(response.data.userDetails)
          console.log("User Details:", userDetails);
        }
      }
    };

    handleUserDetails();
  }, [profile]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  const handleOutSideClick = (event) => {
    if (
      !event.target.closest("#menuOptions") &&
      !event.target.closest("#menu")
    ) {
      setShowMenu(false);
    }

    if (
      !event.target.closest("#profileOptions") &&
      !event.target.closest("#profile")
    ) {
      setShowProfile(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutSideClick);
    return () => {
      document.removeEventListener("click", handleOutSideClick);
    };
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    setIsLoggedIn(false);
    navigate("/login");
  };
  return (
    <div>
      <nav className="w-full flex flex-row items-center h-5 px-4 py-10 lg:px-14">
        <div className="lg:hidden text-3xl mr-5" id="menu">
          <button onClick={toggleMenu}>
            <IoIosMenu />{" "}
          </button>
        </div>

        <NavLink to="/" className="text-4xl font-bold text-lime-600 mr-10 logo">
          CampusVoice
        </NavLink>

        <div className="flex flex-row items-center justify-between">
          <div
            className={`flex flex-row text-black text-xl font-bold links md:hidden lg:flex lg:gap-4 lg:items-center`}
          >
            <Link to="/">Home</Link>
            {isLoggedIn && profile.role === "Student" && (
              <Link to="/contactus">ContactUs</Link>
            )}
            {isLoggedIn && (
              <Link to="/showComplaints">
                {profile.role !== "Admin" ? "Complaint" : "Dashboard"}
              </Link>
            )}
            {!isLoggedIn && (
              <Link
                className="bg-blue-700 p-2 text-[16px] text-white font-bold rounded-md w-24 text-center"
                to="/sendotp"
              >
                Sign Up
              </Link>
            )}
            {!isLoggedIn && (
              <Link
                className="bg-blue-700 p-2 text-[16px] text-white font-bold rounded-md w-24 text-center"
                to="/login"
              >
                Login
              </Link>
            )}
            {/* {isLoggedIn && <button onClick={handleLogout}>Logout</button>} */}
          </div>

          {isLoggedIn && (
            <div className="w-[50px] h-[50px] absolute right-5 md:absolute md:right-6 lg:absolute lg:right-16">
              <img
                className="w-full h-full rounded-full border-2 border-solid border-black cursor-pointer"
                src={userDetails.image}
                onClick={() => toggleProfile()}
                id="profile"
              />
            </div>
          )}
        </div>
      </nav>
      {showMenu && (
        <div
          className="absolute top-20 left-5 w-40 md:w-56 md:h-40 flex-1 bg-gray-400 rounded-md p-4 z-10 flex flex-col gap-5 lg:hidden "
          id="menuOptions"
        >
          <Link to="/">Home</Link>
          {isLoggedIn && profile.role === "Student" && (
            <Link to="/contactus">ContactUs</Link>
          )}
          {isLoggedIn && (
            <Link to="/showComplaints">
              {profile.role !== "Admin" ? "Complaint" : "Dashboard"}
            </Link>
          )}
          <div className="flex flex-col gap-3 md:justify-around">
            {!isLoggedIn && (
              <Link
                className="bg-blue-700 p-2 text-[16px] text-white font-bold rounded-md w-24 text-center"
                to="/sendotp"
              >
                Sign Up
              </Link>
            )}
            {!isLoggedIn && (
              <Link
                className="bg-blue-700 p-2 text-[16px] text-white font-bold rounded-md w-24 text-center"
                to="/login"
              >
                Login
              </Link>
            )}
            {isLoggedIn && (
              <button
                className="bg-blue-700 p-2 text-center text-[16px] text-white font-bold rounded-md w-24"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}

      {showProfile && (
        <div
          className="absolute right-8 w-[270px] h-[190px] bg-zinc-200 z-10 flex flex-col items-start p-3 gap-5 rounded-md"
          id="profileOptions"
          style={{height: 'auto'}}
        >
          <div className="flex flex-row gap-3 items-center">
            <img
              className="w-[50px] h-[50px] rounded-full"
              src={userDetails.image}
              alt=""
            />
            <h1 className="text-[20px] font-bold">{userDetails.name}</h1>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              to={{ pathname: "/viewprofile", state: { data: userDetails } }}
            >
              <div className="flex flex-row items-center justify-between">
                <div className="flex gap-4">
                  <FaUser className="w-[20px] h-[20px] rounded-full" />
                  <p>Edit Profile</p>
                </div>
                {/* <FaGreaterThan /> */}
              </div>
            </Link>
            {userDetails.role === "Admin" && <Link to={{pathname: "/addnewuser", state:{data:token1}}}>
              <div className="flex flex-row items-center justify-between">
                <div className="flex gap-4">
                  <TiUserAdd className="w-[20px] h-[20px] rounded-full" />
                  <p>Add New User</p>
                </div>
                {/* <FaGreaterThan /> */}
              </div>
            </Link>}
          </div>
          {isLoggedIn && (
            <button
              className="bg-blue-700 p-2 text-[16px] text-white font-bold rounded-md w-24 text-center"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
