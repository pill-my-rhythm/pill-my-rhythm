import React, { useState, useEffect, useReducer, createContext } from "react";
import { get } from "./Api";
import { loginReducer } from "./reducer";

export const UserStateContext = createContext<any>(null);
export const DispatchContext = createContext<any>(null);

interface DispatcherProps {
  children: React.ReactNode;
}

const Dispatcher: React.FunctionComponent<DispatcherProps> = ({ children }) => {
  // useReducer 훅을 통해 userState 상태와 dispatch함수를 생성함.
  const [userState, dispatch] = useReducer(loginReducer, {
    user: null,
  });
  // 아래의 fetchCurrentUser 함수가 실행된 다음에 컴포넌트가 구현되도록 함.
  // 아래 코드를 보면 isFetchCompleted 가 true여야 컴포넌트가 구현됨.
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);

  const fetchCurrentUser = async () => {
    try {
      // 이전에 발급받은 토큰이 있다면, 이를 가지고 유저 정보를 받아옴.
      sessionStorage.getItem("userToken");
      // * 백에서 GET 보내주면 맞춰서 수정해야함
      const res = await get("user/current");
      const currentUser = res.data;

      console.log("# currentUser", currentUser);
      // dispatch 함수를 통해 로그인 성공 상태로 만듦.
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: currentUser,
      });
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
    return <span> Loading..</span>;
  }

  return (
    <DispatchContext.Provider value={dispatch}>
      <UserStateContext.Provider value={userState}>{children}</UserStateContext.Provider>
    </DispatchContext.Provider>
  );
};

export default Dispatcher;
