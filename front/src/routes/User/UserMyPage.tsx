import React, { useContext, useState, useEffect } from "react";
import { UserStateContext } from "../../Dispatcher";
import { useNavigate } from "react-router-dom";

const UserMyPage = () => {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  const userInfo = userState.user?.userInfo;
  console.log("userState.user?.userInfo", userInfo);

  const userName = userInfo.user_name;
  const useremail = userInfo.email;

  const [editMode, setEditMode] = useState(false);

  const MoveEditPage = () => {
    navigate("/mypage/edit");
  };

  useEffect(() => {
    setEditMode(false);
  }, [setEditMode]);

  return (
    <div className="min-h-full flex py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full space-y-8">
        <div>
          <h2 className="mt-6 mb-3 text-3xl font-extrabold text-gray-900">My Page</h2>
          <hr />
          <p className="m-3 text-sm text-gray-600">정보수정</p>
        </div>
        <div>
          <p className="m-3">이름 : {userName}</p>
          <p className="m-3">이메일 : {useremail}</p>
          <p className="m-3">성별 : {userInfo.gender}</p>
          <p className="m-3">연령대 : {userInfo.age_range}</p>
          <p className="m-3">직업군 : {userInfo.job}</p>
        </div>
        <button
          type="button"
          className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          onClick={MoveEditPage}
        >
          정보수정
        </button>
      </div>
    </div>
  );
};
export default UserMyPage;
