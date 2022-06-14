// import React, { useState, useCallback, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import useInput from "./hooks/useInput";

// import { signup } from "./actions/User";
// import { RootState } from "./slices/User";

// const Signup = () => {
//   const [userName, onChangeUserName] = useInput("");
//   const [email, onChangeEmail] = useInput("");
//   const [password, onChangePassword] = useInput("");
//   const [gender, onChangeGender] = useInput("");
//   const [ageRange, onChangeAgeRange] = useInput("");
//   const [job, onChangeJob] = useInput("");

//   const [passwordCheck, setPasswordCheck] = useState("");
//   const [passwordError, setPasswordError] = useState(false);
//   const signupError = useSelector((state: RootState) => state.user.signupError);
//   const signupDone = useSelector((state: RootState) => state.user.signupDone);
//   const dispatch = useDispatch();

//   const onChangePasswordCheck = useCallback(
//     (e: { target: { value: React.SetStateAction<string> } }) => {
//       setPasswordCheck(e.target.value);
//       setPasswordError(e.target.value !== password);
//     },
//     [password],
//   );

//   const onSubmitForm = useCallback(
//     (e: { preventDefault: () => void }) => {
//       e.preventDefault();
//       // 비밀번호 한번 더 체크
//       if (password !== passwordCheck) {
//         return setPasswordError(true);
//       }
//       dispatch(
//         signup({
//           user_name: userName,
//           email: email,
//           password: password,
//           gender: gender,
//           age_range: ageRange,
//           job: job,
//         }),
//       );
//     },
//     [dispatch, userName, email, password, gender, ageRange, job, passwordCheck],
//   );
//   return (
//     <form onSubmit={onSubmitForm}>
//       <div>
//         <label>
//           <input type="text" value={userName} placeholder="닉네임" onChange={onChangeUserName} />
//         </label>
//       </div>
//       <div>
//         <label>
//           <input type="text" value={email} placeholder="이메일" onChange={onChangeEmail} />
//         </label>
//       </div>
//       <div>
//         <label>
//           <input type="password" value={password} placeholder="비밀번호" onChange={onChangePassword} />
//         </label>
//       </div>
//       <div>
//         <label>
//           <input type="password" value={passwordCheck} placeholder="비밀번호확인" onChange={onChangePasswordCheck} />
//         </label>
//         비밀번호가 일치하지 않습니다.
//       </div>
//       {signupError && { signupError }}
//       <button type="submit">가입완료</button>
//     </form>
//   );
// };

// export default Signup;
