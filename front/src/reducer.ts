export function loginReducer(userState: any, action: { type: any; payload: any }) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      console.log("%c로그인!", "color: #d93d1a;");
      return {
        ...userState,
        user: action.payload,
      };
    case "LOGOUT":
      console.log("%c로그아웃!", "color: #d93d1a;");
      return {
        ...userState,
        user: null,
      };
    default:
      return userState;
  }
}
