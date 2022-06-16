import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserStateContext, DispatchContext } from "../../../Dispatcher";

const Header = () => {
  const navigate = useNavigate();

  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);

  // 전역상태에서 user가 null이 아니라면 로그인 성공 상태임.
  const isLogin = !!userState.user;

  // 로그아웃 클릭 시 실행되는 함수
  const logout = () => {
    // sessionStorage 에 저장했던 JWT 토큰을 삭제함.
    sessionStorage.removeItem("userToken");
    // dispatch 함수를 이용해 로그아웃함.
    dispatch({ type: "LOGOUT" });
    // 기본 페이지로 돌아감.
    navigate("/");
  };

  return (
    <div className="navbar w-full bg-base-100 sticky top-0 z-40">
      <div className="flex-1">
        <a href="/" className="btn btn-ghost normal-case text-xl">
          <img src="https://blog.kakaocdn.net/dn/bro2IW/btrEji2iHDE/gJHWwqC1zfOCxRpv2cOwP0/img.png" alt="icon" width={30} height={30} className="mr-2" />
          Pill my rhythm
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
          <li>
            <a>Search</a>
          </li>
          <li>
            <a>Schedular</a>
          </li>
          <li>
            <a>Contact us</a>
          </li>
          <li tabIndex={0}>
            {!isLogin ? (
              <a href="/login">
                Login
                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              </a>
            ) : (
              <a onClick={logout}>Logout</a>
            )}
            <ul className="p-2 bg-base-100">
              <li>
                <a>My Page</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Header;
