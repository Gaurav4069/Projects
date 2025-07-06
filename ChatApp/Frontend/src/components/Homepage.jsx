import React from "react";
import Sidebar from "./Sidebar";
import MessageContainer from "./MessageContainer";

function Homepage() {
  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-500">
      <Sidebar />
      <MessageContainer />
    </div>
  );
}

export default Homepage;
