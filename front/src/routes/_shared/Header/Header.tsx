import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserStateContext, DispatchContext } from "../../../Dispatcher";
import { del } from "../../../Api";

const Header = () => {
  const navigate = useNavigate();

  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);

  // 전역상태에서 user가 null이 아니라면 로그인 성공 상태임.
  const isLogin = !!userState.user;

  // 로그아웃 클릭 시 실행되는 함수
  const logout: React.MouseEventHandler<HTMLButtonElement> | undefined = async () => {
    try {
      console.log("#user", userState.user);
      console.log("#user.accessToken", userState.user.accessToken);
      const user = userState.user;
      const accessToken = userState.user.accessToken;

      // ! delete 보내줌
      const data = await del(
        "user/logout",
        // {
        //   data: {
        //     accessToken,
        //   },
        // }
      );
      console.log("# Logout success", data);

      // sessionStorage 에 저장했던 JWT 토큰을 삭제함.
      sessionStorage.removeItem("userToken");
      // dispatch 함수를 이용해 로그아웃함.
      await dispatch({ type: "LOGOUT" });
      // 기본 페이지로 돌아감.
      navigate("/");
    } catch (err) {
      console.log("# Logout Error", err);
    }
  };

  return (
    <div className="navbar flex-col md:flex-row w-full bg-base-100 sticky top-0 z-40 shadow-md">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          <img src="https://blog.kakaocdn.net/dn/bro2IW/btrEji2iHDE/gJHWwqC1zfOCxRpv2cOwP0/img.png" alt="icon" width={30} height={30} className="mr-2" />
          Pill my rhythm
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
          <li>
            <Link to="/">Search</Link>
          </li>
          <li>
            <a>Schedular</a>
          </li>
          {/* // * 아직 미구현! */}
          <li>
            <Link to="/">Contact us</Link>
          </li>
          <li tabIndex={0}>
            {!isLogin ? (
              <Link to="/login">
                Login
                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              </Link>
            ) : (
              <button onClick={logout}>Logout</button>
            )}
            <ul className="p-2 bg-base-100">
              <li>
                <Link to="/mypage">My Page</Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Header;
