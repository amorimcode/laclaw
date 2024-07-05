import Image from "next/image";
import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex items-center justify-center">
        <Image
          src="/logo.svg"
          alt="Loading..."
          width={180}
          height={180}
          className="animate-pulse"
        />
      </div>
    </div>
  );
};

export default Loading;
