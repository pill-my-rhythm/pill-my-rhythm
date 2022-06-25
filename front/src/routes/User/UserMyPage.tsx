import React, { useContext, useState, useEffect } from "react";
import { UserStateContext } from "../../Dispatcher";
import { put } from "../../Api";

const UserMyPage = () => {
  const userState = useContext(UserStateContext);
  const userInfo = userState.user?.userInfo;
  console.log("userState.user?.userInfo", userInfo);

  const userName = userInfo.user_name;
  const useremail = userInfo.email;
  const [myPage, setMyPage] = useState({
    password: "",
    gender: userInfo.gender,
    age_range: userInfo.age_range,
    job: userInfo.job,
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [editMode, setEditMode] = useState(false);

  console.log("#myPage", myPage);

  const handleMyPageEdit = (name: string, value: string) => {
    setMyPage((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await put("user/update-info", {
        ...myPage,
      });
      const EditedUser = res.data;
      setMyPage(EditedUser);
      setEditMode(false);
    } catch (error) {
      console.log("MyPage#error", error);
    }
  };

  // 비밀번호가 4글자 이상인지 여부를 확인함.
  const isPasswordValid = myPage.password.length >= 8 || myPage.password.length === 0;

  // 비밀번호와 확인용 비밀번호가 일치하는지 여부를 확인함.
  const isPasswordSame = myPage.password === confirmPassword;

  const ages = ["10대", "20대", "30대", "40대", "50대", "60대 이상"];
  const jobs = ["교육", "제조", "디자인", "개발", "서비스", "기타"];

  useEffect(() => {
    setEditMode(false);
  }, [setEditMode]);

  return !editMode ? (
    <div className="min-h-full flex py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full space-y-8">
        <div>
          <h2 className="mt-6 mb-3 text-3xl font-extrabold text-gray-900">My Page</h2>
          <hr />
          <p className="m-3 text-sm text-gray-600">정보수정</p>
        </div>
        <div>
          <p className="m-3">이름 : {userInfo.user_name}</p>
          <p className="m-3">이메일 : {userInfo.email}</p>
          <p className="m-3">성별 : {userInfo.gender}</p>
          <p className="m-3">연령대 : {userInfo.age_range}</p>
          <p className="m-3">직업군 : {userInfo.job}</p>
        </div>
        <button
          type="button"
          className="group relative w-2/5 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          onChange={() => setEditMode(true)}
        >
          정보수정
        </button>
      </div>
    </div>
  ) : (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">My Page</h2>
          <p className="m-3 text-sm text-gray-600">정보수정</p>
        </div>
        <div className="grid place-content-stretch">
          <form className="m-2 items-center" onSubmit={handleSubmit}>
            <div>
              <label>
                <input className="input input-bordered input-error w-full max-w-md m-2" type="text" placeholder={userName} disabled />
              </label>
            </div>
            <div>
              <label>
                <input className="input w-full max-w-md m-2" type="text" placeholder={useremail} disabled />
              </label>
            </div>
            <div>
              <label>
                {isPasswordValid ? (
                  <input
                    className="input w-full max-w-md m-2"
                    type="password"
                    name="password"
                    value={myPage.password}
                    placeholder="비밀번호 (8글자 이상 12글자 이하)"
                    onChange={(e) => handleMyPageEdit("password", e.target.value)}
                  />
                ) : (
                  <input
                    className="input input-bordered input-error w-full max-w-md m-2"
                    type="password"
                    name="password"
                    value={myPage.password}
                    placeholder="비밀번호 (8글자 이상 12글자 이하)"
                    onChange={(e) => handleMyPageEdit("password", e.target.value)}
                  />
                )}
              </label>
            </div>
            <div>
              <label>
                {isPasswordSame ? (
                  <input className="input w-full max-w-md m-2" type="password" value={confirmPassword} placeholder="비밀번호확인" onChange={(e) => setConfirmPassword(e.target.value)} />
                ) : (
                  <>
                    {" "}
                    <input
                      className="input input-bordered input-error w-full max-w-md m-2"
                      type="password"
                      value={confirmPassword}
                      placeholder="비밀번호확인"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <br />
                    <p className="m-2 text-sm text-red-400">비밀번호가 일치하지 않습니다.</p>
                  </>
                )}
              </label>
            </div>
            <div>
              <label>
                <select className="select select-bordered w-full max-w-md m-2" value={myPage.gender} name="gender" onChange={(e) => handleMyPageEdit("gender", e.target.value)}>
                  <option value="성별" disabled>
                    성별
                  </option>
                  <option value="M">남성</option>
                  <option value="F">여성</option>
                </select>
              </label>
            </div>
            <div>
              <label>
                <select className="select select-bordered w-full max-w-md m-2" value={myPage.age_range} name="age_range" onChange={(e) => handleMyPageEdit("age_range", e.target.value)}>
                  <option value="연령대" disabled>
                    연령대
                  </option>
                  {ages.map((pr) => (
                    <option key={pr}>{pr}</option>
                  ))}
                </select>
              </label>
            </div>
            <div>
              <label>
                <select className="select select-bordered w-full max-w-md m-2" value={myPage.job} name="job" onChange={(e) => handleMyPageEdit("job", e.target.value)}>
                  <option value="직업군" disabled>
                    직업군
                  </option>
                  {jobs.map((pr) => (
                    <option key={pr}>{pr}</option>
                  ))}
                </select>
              </label>
            </div>
            <div>
              <label className="flex items-center justify-center mt-6">
                <button
                  type="submit"
                  className="group relative w-3/5 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                  disabled={!isPasswordSame}
                >
                  정보 수정 완료
                </button>
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default UserMyPage;
