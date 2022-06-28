import React from "react";
import { Link } from "react-router-dom";

const QRHeader = () => {
  return (
    <div className="navbar flex-col md:flex-row w-full bg-base-100 sticky top-0 z-40 shadow-md">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          <img src="https://blog.kakaocdn.net/dn/bro2IW/btrEji2iHDE/gJHWwqC1zfOCxRpv2cOwP0/img.png" alt="icon" width={30} height={30} className="mr-2" />
          Pill my rhythm
        </Link>
      </div>
    </div>
  );
};
export default QRHeader;
