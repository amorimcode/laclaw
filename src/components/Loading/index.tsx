import Image from "next/image";
import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Image
        src="/logo.svg"
        alt="Loading..."
        className="animate-spin-slow opacity-50 max-w-xs"
      />
    </div>
  );
};

export default Loading;
