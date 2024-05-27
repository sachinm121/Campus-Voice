// import React, { useState } from "react";
// import Modal from "react-modal";
// import { IoMdClose } from "react-icons/io";

// const AddComplaint = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     complaintType: "",
//     complaint: "",
//     complaintImage: "",
//   });
//   const [preview, setPreview] = useState("https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg")

//   const openModal = () => {
//     setIsOpen(true);
//   };

//   const closeModal = () => {
//     setIsOpen(false);
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setPreview(formData.complaintImage)
//   };


//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form submitted:", formData);
//     setFormData({
//       complaintType: "",
//       complaint: "",
//       complaintImage: "",
//     });
//     closeModal();
//   };

//   return (
//     <div className="flex justify-center items-center mt-[20%]">
//       <button onClick={openModal}>Click Here to Admit Your Complaint</button>
//       <Modal
//         isOpen={isOpen}
//         onRequestClose={closeModal}
//         className="w-[50%] h-[50%] bg-gray-500 absolute left-[30%] top-[30%]"
//       >
//         <button
//           onClick={closeModal}
//           className="absolute top-3 right-3 text-3xl hover:bg-red-500 hover:text-white text-black"
//         >
//           <IoMdClose />
//         </button>
//         <h2>Complaint Details</h2>
//         <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-3">
//           <select name="complaintType" value={formData.complaintType} onChange={handleChange}>
//             <option>Complaint Type</option>
//             <option value="Maintenance">Maintenance</option>
//             <option value="Safety and Security">Safety and Security</option>
//             <option value="Food">Food</option>
//           </select>

//           <textarea
//             name="complaint"
//             value={formData.complaint}
//             onChange={handleChange}
//             placeholder="Complaint"
//             required
//           ></textarea>
//           <input
//             name="complaintImage"
//             type="file"
//             value={formData.complaintImage}
//             onChange={handleChange}
//             placeholder="Complaint Image"
//           />
//           <img className="w-[100px] h-[100px]" src={preview} />
//           <p>Preview</p>
//           <button type="submit">Submit</button>
//         </form>
//       </Modal>
//     </div>
//   );
// };

// export default AddComplaint;


import React, { useState } from 'react';
import Model from "react-modal";
import {IoMdClose} from "react-icons/io";

const AddComplaint = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    complaintType: "",
    complaint: "",
    complaintImage: ""
  })

  const [preview, setPreview] = useState("");

  const closeModel = () => {
    setIsOpen(false);
    setPreview("")
  }

  const openModel = () => {
    setIsOpen(true);
  }

  const handleChange = (e) => {
    
    // const [name, value] = e.target;
    
    // setFormData({
    //   ...formData, [name]: value
    // })
    console.log("target", e)
    const { name, value, files } = e.target;

    if (name === "complaintImage" && files && files[0]) {
      // If the target is the file input and it has files, set the preview image
      const imageURL = URL.createObjectURL(files[0]);
      setPreview(imageURL);
      setFormData({ ...formData, [name]: files[0] });
    } else {
      // For other inputs, just update the form data
      setFormData({ ...formData, [name]: value });
    }
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("FormData" , formData);
    closeModel();
  }
  return (
    <div className='flex justify-center items-center mt-[20%]'>
      <button onClick={openModel}>Click Here to Admit Your Complaint</button>
      <Model
        isOpen={isOpen}
        onRequestClose={closeModel}
        className="w-[50%] h-[50%] bg-gray-500 absolute left-[30%] top-[30%]"
      >
        <button 
          onClick={closeModel}
          className='absolute top-3 right-3 text-3xl hover:bg-red-500 hover:text-white  text-black'
        >
          <IoMdClose />
        </button>

        <h2 className='mb-6'>Complaint Form</h2>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 mt-3'>
          <select name='complaintType' value={formData.complaintType} onChange={handleChange}>
            <option value="">Complaint Type</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Safety and Security">Safety and Security</option>
            <option value="Food">Food</option>
          </select>

          <textarea name='complaint' value={formData.complaint} onChange={handleChange} placeholder='Write Your Complaint' required>
          </textarea>

          <input
            name='complaintImage'
            type='file'
            // value={formData.complaintImage}
            onChange={handleChange}
            // accept='image/*'
            required
          />

          {
            preview && <img className='w-[100px] h-[100px]' src={preview} alt='preview' />
          }
          <p>Preview</p>
          <button type='submit'>Submit</button>
        </form>
      </Model>
    </div>
  )
}

export default AddComplaint