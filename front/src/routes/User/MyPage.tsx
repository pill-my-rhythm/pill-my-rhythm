import React, { useContext, useState } from "react";
import { UserStateContext } from "../../Dispatcher";
import { put } from "../../Api";

const MyPage = () => {
  const userState = useContext(UserStateContext);

  const [myPage, setMyPage] = useState({
    password: userState.user?.password,
    gender: userState.user?.gender,
    ageRange: userState.user?.ageRange,
    job: userState.user?.job,
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  console.log("MyPageUserState", userState);
  console.log("MyPageToken", userState.user?.accessToken);

  const handleMyPageEdit = (name, value) => {
    setMyPage((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // if (window.confirm(`"${form.school}, ${form.major}, ${form.position}" 상태로 학력을 수정하시겠습니까?`)) {
      const res = await put("/user/upadate-info", {
        accessToken: userState.user?.accessToken,
        ...myPage,
      });
      const EditedUser = res.data;
      setMyPage(EditedUser);
    } catch (error) {
      console.log("MyPage#error", error);
    }
  };

  // 비밀번호가 4글자 이상인지 여부를 확인함.
  const isPasswordValid = password.length >= 8;

  // 비밀번호와 확인용 비밀번호가 일치하는지 여부를 확인함.
  const isPasswordSame = password === confirmPassword;

  return <img className="w-screen" src="https://blog.kakaocdn.net/dn/lYHux/btrE4nVMvMo/Hn1wvs9Mgf7m7m2oo4boB0/img.png" alt="목업 데이터" />;
};
export default MyPage;
