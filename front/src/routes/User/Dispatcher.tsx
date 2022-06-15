import React, { useState, useEffect, useReducer, createContext } from "react";
import { post, get } from "../../Api";
import App from "../../App";
import { loginReducer } from "../../reducer";
import jwtDecode from "jwt-decode";

export const UserStateContext = createContext(null);
export const DispatchContext = createContext<any>(null);

function Dispatcher() {
  // useReducer 훅을 통해 userState 상태와 dispatch함수를 생성함.
  const [userState, dispatch] = useReducer(loginReducer, {
    user: null,
  });

  // 아래의 fetchCurrentUser 함수가 실행된 다음에 컴포넌트가 구현되도록 함.
  // 아래 코드를 보면 isFetchCompleted 가 true여야 컴포넌트가 구현됨.
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);

  const fetchCurrentUser = React.useCallback(async () => {
    try {
      // 이전에 발급받은 토큰이 있다면, 이를 가지고 유저 정보를 받아옴.
      const userToken: any = sessionStorage.getItem("userToken");
      const jwtDecoded: any = jwtDecode(userToken);
      const userId = jwtDecoded.userId;
      const res = await get("users", userId);
      const currentUser = res.data;
      // dispatch 함수를 통해 로그인 성공 상태로 만듦.
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: currentUser,
      });

      console.log("%c sessionStorage에 토큰 있음.", "color: #d93d1a;");
    } catch {
      console.log("%c SessionStorage에 토큰 없음.", "color: #d93d1a;");
    }
    // fetchCurrentUser 과정이 끝났으므로, isFetchCompleted 상태를 true로 바꿔줌
    setIsFetchCompleted(true);
  };

  // useEffect함수를 통해 fetchCurrentUser 함수를 실행함.
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  if (!isFetchCompleted) {
    return "loading...";
  }

  return (
    <DispatchContext.Provider value={dispatch}>
      <UserStateContext.Provider value={userState} />
      <App />
    </DispatchContext.Provider>
  );
}

export default Dispatcher;
