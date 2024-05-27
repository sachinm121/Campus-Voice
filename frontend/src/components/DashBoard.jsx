import React from "react";
import AnalyticCard from "./AnalyticCard";

const DashBoard = ({allComplaints}) => {
  console.log("All Complaints:", allComplaints)
  const noComplaint = allComplaints.length;
  const pending = allComplaints.filter(complaint => complaint.status === "Pending")
  const processing = allComplaints.filter(complaint => complaint.status === "Processing")
  const rejected = allComplaints.filter(complaint => complaint.status === "Rejected")
  const solved = allComplaints.filter(complaint => complaint.status === "Solved")
  console.log("Pending Complaints", pending)
  return (
    <div>
      <div className="flex flex-col gap-3 md:flex-row md:flex-wrap md:justify-center lg:gap-16">
        <AnalyticCard title={"Pending"} count={pending.length} percentage={`${((pending.length/noComplaint)*100).toFixed(2)}%`} color={"#b8fef9"}/>
        <AnalyticCard title={"Processing"} count={processing.length} percentage={`${((processing.length/noComplaint)*100).toFixed(2)}%`}/>
        <AnalyticCard title={"Solved"} count={solved.length} percentage={`${((solved.length/noComplaint)*100).toFixed(2)}%`}/>
        <AnalyticCard title={"Rejected"} count={rejected.length} percentage={`${((rejected.length/noComplaint)*100).toFixed(2)}%`}/>
      </div>
    </div>
  );
};

export default DashBoard;