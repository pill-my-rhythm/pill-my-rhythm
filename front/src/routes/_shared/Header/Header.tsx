import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { UserStateContext, DispatchContext } from "../../../Dispatcher";
import { del } from "../../../Api";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);

  const [mobile, setMobile] = useState<Boolean>(false);

  // 전역상태에서 user가 null이 아니라면 로그인 성공 상태임.
  const isLogin = !!userState.user;

  // 모바일 체크 함수
  const checkParams = () => {
    const currentParams = location.pathname;
    // console.log("params", currentParams);
    if (currentParams === "/m/subscribe" || "/m/checklist") {
      setMobile(true);
    } else setMobile(false);
  };

  // 로그아웃 클릭 시 실행되는 함수
  const logout: React.MouseEventHandler<HTMLButtonElement> = async () => {
    try {
      await del("user/logout");
      // console.log("# Logout success", data);

      // * sessionStorage 에 저장했던 JWT 토큰을 삭제함.
      sessionStorage.removeItem("userToken");

      // * dispatch 함수를 이용해 로그아웃함.
      await dispatch({ type: "LOGOUT" });
      // * 로그아웃 알림!
      alert("로그아웃 완료!");
      // * 기본 페이지로 돌아감.
      navigate("/");
    } catch (err) {
      alert("로그아웃에 실패했습니다.");
      console.log("# Logout Error", err);
    }
  };

  const MoveLogin = () => {
    alert("로그인 후 이용해주세요!");
    navigate("/login");
  };

  const ControlMyPage = () => {
    if (isLogin) {
      navigate("/mypage");
    } else {
      MoveLogin();
    }
  };

  useEffect(() => {
    checkParams();
  }, [location]);

  return !mobile ? (
    <div className="navbar flex-col md:flex-row w-full bg-base-100 sticky top-0 z-40 shadow-md justify-center items-center">
      <div className="flex">
        <Link to="/" className="btn btn-ghost normal-case text-xl flex">
          <img src="https://blog.kakaocdn.net/dn/bro2IW/btrEji2iHDE/gJHWwqC1zfOCxRpv2cOwP0/img.png" alt="icon" width={30} height={30} className="mr-2" />
          Pill my rhythm
        </Link>
      </div>
    </div>
  ) : (
    <div className="navbar flex-row w-full bg-base-100 sticky top-0 z-40 shadow-md">
      <div className="flex-1 justify-between">
        <div className="flex-none md:hidden">
          <ul className="flex menu menu-horizontal p-0 text-center">
            <li tabIndex={0}>
              <button className="btn btn-square btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              {!isLogin ? (
                <ul className="p-2 bg-base-100">
                  <li className="font-bold">
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/pillmyrhythmpillmyrhythm">About Pmr</Link>
                  </li>
                  <li>
                    <Link to="/">Search</Link>
                  </li>
                  <li>
                    <Link to="/schedule">Scheduler</Link>
                  </li>
                  <li>
                    <button onClick={ControlMyPage}>My Page</button>
                  </li>
                </ul>
              ) : (
                <ul className="p-2 bg-base-100">
                  <li>
                    <Link to="/pillmyrhythm">About Pmr</Link>
                  </li>
                  <li>
                    <Link to="/">Search</Link>
                  </li>
                  <li>
                    <Link to="/schedule">Scheduler</Link>
                  </li>
                  <li>
                    <button onClick={ControlMyPage}>My Page</button>
                  </li>
                  <li>
                    <button onClick={logout}>Logout</button>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          <img src="https://blog.kakaocdn.net/dn/bro2IW/btrEji2iHDE/gJHWwqC1zfOCxRpv2cOwP0/img.png" alt="icon" width={30} height={30} className="mr-2" />
          Pill my rhythm
        </Link>
      </div>
      <div className="md:flex hidden">
        <ul className="menu menu-horizontal p-0 text-center">
          <li>
            <Link to="/pillmyrhythm">About Pmr</Link>
          </li>
          <li>
            <Link to="/">Search</Link>
          </li>
          <li>
            <Link to="/schedule">Scheduler</Link>
          </li>
          {!isLogin ? (
            <li tabIndex={0}>
              <Link to="/login">
                Login
                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              </Link>
              <ul className="p-2 bg-base-100">
                <li>
                  <button onClick={ControlMyPage}>My Page</button>
                </li>
              </ul>
            </li>
          ) : (
            <li tabIndex={0}>
              <button onClick={ControlMyPage}>
                My Page
                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              </button>
              <ul className="p-2 bg-base-100">
                <li>
                  <button className="px-8" onClick={logout}>
                    Logout
                  </button>
                </li>
              </ul>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};
export default Header;
