import { userState } from "../atoms";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const useLoginCheck = () => {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  //   console.log("Loginuser", user);

  useEffect(() => {
    if (user.length === 0) {
      navigate("/login");
      alert("로그인 후 이용해주세요!");
    }
  });
};
