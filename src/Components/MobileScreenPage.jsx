import React from "react";
import { Monitor } from "lucide-react";

const MobileScreenPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white text-center p-6">
      <Monitor className="w-16 h-16 mb-6 text-blue-400 animate-pulse" />
      <h1 className="text-2xl font-semibold mb-2">
        Larger Screen Required
      </h1>
      <p className="text-gray-300 max-w-xs text-sm">
        Kindly move to a desktop or tablet device for the best experience.
      </p>
    </div>
  );
};

export default MobileScreenPage;
