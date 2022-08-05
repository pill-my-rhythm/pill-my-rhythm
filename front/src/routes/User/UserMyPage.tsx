import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DispatchContext } from "../../Dispatcher";
import { get, put, del } from "../../Api";
import { Userdata } from "../Search/Result/RecommendationArea";
import { userState } from "../../atoms";
import { useSetRecoilState } from "recoil";

const UserMyPage = ({ Recoiluser, isLogin }: any) => {
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext);

  const setUserState = useSetRecoilState<Userdata>(userState);

  const userInfo = Recoiluser;
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

  // 현재 유저 정보를 가져옴
  const loadUserMypage = async () => {
    if (isLogin) {
      const res = await get("user/current");
      // console.log("@res.data의 currentuser", res.data);
      setUserState(res.data);
    }
  };

  const handleMyPageEdit = (name: string, value: string) => {
    setMyPage((prev) => ({ ...prev, [name]: value }));
  };

  // 회원 정보 수정
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await put("user/update-info", {
        ...myPage,
      });
      setMyPage(res.data);
      setEditMode(false);
    } catch (error) {
      alert(`${error}\n 회원정보 수정에 실패했습니다!`);
      console.log("MyPage#error", error);
    }
  };

  // 비밀번호가 4글자 이상인지 여부를 확인함.
  const isPasswordValid = myPage.password?.length >= 8 || myPage.password?.length === 0;

  // 비밀번호와 확인용 비밀번호가 일치하는지 여부를 확인함.
  const isPasswordSame = myPage.password === confirmPassword;

  // 탈퇴 문구가 일치하는지 확인함.
  const [withdrawSentence, setWithdrawSentence] = useState<string>("");
  const withdrawalValid = withdrawSentence === "GoodByeMyRhythm";

  const ages = ["10대", "20대", "30대", "40대", "50대", "60대 이상"];
  const jobs = ["교육", "제조", "디자인", "개발", "서비스", "기타"];

  // 회원 정보 업데이트 시, 데이터를 변환해서 가져와줌
  const translateGender = (e: string) => {
    if (e === "F") return "여성";
    else return "남성";
  };

  // 회원 정보 업데이트 취소 버튼 동작 함수
  const CancelEditMode = () => {
    setEditMode(false);
  };

  // 회원 탈퇴 기능
  const withdrawUser = async () => {
    try {
      await del("user/withdrawal");
      sessionStorage.removeItem("userToken");
      await dispatch({ type: "WITHDRAW" });
      alert("탈퇴에 성공했습니다. 안녕히가세요.");
      navigate("/");
    } catch (error) {
      alert(`${error}로 인해 회원탈퇴에 실패했습니다.`);
    }
  };

  useEffect(() => {
    loadUserMypage();
    setMyPage(myPage);
  }, [myPage, editMode]);

  return !editMode ? (
    <div className="min-h-full bg-gradient-to-tr from-[#7FDCDC] to-[#E3F2ED] flex justify-center pt-28 px-4 sm:px-6 lg:px-8">
      <div className="w-full md:w-[68.75rem] space-y-8">
        <div>
          <h2 className="mt-6 mb-3 text-3xl font-extrabold text-gray-900">My Page</h2>
          <hr />
          <p className="m-3 text-sm text-gray-600">회원 정보 수정 페이지 입니다.</p>
        </div>
        <div className="flex justify-center">
          <div className="card md:card-side bg-base-100 shadow-xl w-[56.25rem]">
            <figure>
              <img
                className="w-60 h-60 m-5"
                src="https://blog.kakaocdn.net/dn/QFwAO/btrEhqNXezp/jGBQWKKiN3pDmyFOosxe40/img.png"
                alt="영양제 아이콘"
              />
            </figure>
            <div className="card-body leading-normal justify-center">
              <div className="my-4 leading-loose">
                <h2 className="card-title">👑 {userInfo.user_name}님, 안녕하세요!</h2>
                <hr className="my-1 border border-teal-100" />
                <p>💊 이메일 : {userInfo.email}</p>
                <p>💊 성별 : {translateGender(userInfo.gender)}</p>
                <p>💊 연령대 : {userInfo.age_range}</p>
                <p>💊 직업군 : {userInfo.job}</p>
              </div>
              <div className="card-actions justify-end">
                <button
                  type="button"
                  className="btn group relative flex justify-center border border-transparent p-2 text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                  onClick={() => setEditMode(true)}
                >
                  정보수정
                </button>
                <label
                  htmlFor="withdraw-modal"
                  className="btn modal-button btn-warning group relative flex justify-center btn ml-5 mr-5 p-2 border border-transparent text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                  onClick={CancelEditMode}
                >
                  회원탈퇴
                </label>
                <input type="checkbox" id="withdraw-modal" className="modal-toggle" />
                <label htmlFor="withdraw-modal" className="modal cursor-pointer">
                  <label className="modal-box relative justify-center select-none" htmlFor="">
                    <h3 className="text-lg font-bold text-center py-4">정말 탈퇴하실 건가요...?😢</h3>
                    <p className="py-1 text-sm text-center">
                      Pill my rhythm에는 당신을 위해 준비한 서비스가 아직 많이 남아있어요!
                    </p>
                    <p className="py-1 text-sm text-center">
                      불편한 점은 Contact us를 통해 알려주시면 개선해보도록 노력할게요!
                    </p>
                    <p className="py-1 text-sm text-center">그래도 저희 서비스가 필요 없으시다면...</p>
                    <p className="py-1 text-red-500 font-bold text-center">GoodByeMyRhythm</p>
                    <p className="py-1 text-sm text-center">이라고 입력해주세요!</p>
                    <div className="flex flex-row justify-center items-center py-4">
                      <input
                        className="input m-2 border border-red-400"
                        type="text"
                        name="withdraw"
                        value={withdrawSentence}
                        placeholder="GoodByeMyRhythm"
                        onChange={(e) => setWithdrawSentence(e.target.value)}
                      />
                      {!withdrawalValid ? (
                        <button
                          className="btn btn-warning group relative flex justify-center btn ml-5 mr-5 p-2 border border-transparent text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                          disabled
                        >
                          회원탈퇴
                        </button>
                      ) : (
                        <button
                          className="btn btn-warning group relative flex justify-center btn ml-5 mr-5 p-2 border border-transparent text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                          onClick={withdrawUser}
                        >
                          회원탈퇴
                        </button>
                      )}
                    </div>
                  </label>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-full flex bg-gradient-to-tr from-[#7FDCDC] to-[#E3F2ED] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">My Page</h2>
          <hr className="my-3" />
          <p className="m-3 text-sm text-gray-600">회원 정보 수정 페이지 입니다.</p>
        </div>
        <div className="grid place-content-stretch">
          <form className="m-2 items-center" onSubmit={handleSubmit}>
            <div>
              <label>
                <input
                  className="input input-bordered input-error w-full max-w-md m-2"
                  type="text"
                  placeholder={userName}
                  disabled
                />
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
                  <input
                    className="input w-full max-w-md m-2"
                    type="password"
                    value={confirmPassword}
                    placeholder="비밀번호확인"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
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
                <select
                  className="select select-bordered w-full max-w-md m-2"
                  value={myPage.gender}
                  name="gender"
                  onChange={(e) => handleMyPageEdit("gender", e.target.value)}
                >
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
                <select
                  className="select select-bordered w-full max-w-md m-2"
                  value={myPage.age_range}
                  name="age_range"
                  onChange={(e) => handleMyPageEdit("age_range", e.target.value)}
                >
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
                <select
                  className="select select-bordered w-full max-w-md m-2"
                  value={myPage.job}
                  name="job"
                  onChange={(e) => handleMyPageEdit("job", e.target.value)}
                >
                  <option value="직업군" disabled>
                    직업군
                  </option>
                  {jobs.map((pr) => (
                    <option key={pr}>{pr}</option>
                  ))}
                </select>
              </label>
            </div>
            <div className="flex flex-wrap justify-center items-center py-2 px-4">
              <button
                type="submit"
                className="btn ml-5 mr-5 group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                disabled={!isPasswordSame}
              >
                정보수정 완료
              </button>
              <button className="btn ml-5 mr-5" onClick={CancelEditMode}>
                취소
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default UserMyPage;
