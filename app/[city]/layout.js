import React from "react";

const layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 pt-4 px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
};

export default layout;
