// /* eslint-disable jsx-a11y/anchor-is-valid */
// /* eslint-disable no-unreachable */

// /* // ! 코치님 지금 아직 완성된 기능이 아니고 진행 사항 보고를 위해 커밋해둔 파일입니다. 코드 리뷰시 일단 넘어가셔도 괜찮을 것 같습니다 ㅠㅠ */

// import React, { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import * as Api from "../../Api";
// import { useRecoilState } from "recoil";

// const LoginForm = () => {
//   const navigate = useNavigate();
//   const dispatch = useContext(DispatchContext);

//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");

//   //이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
//   const validateEmail = (email: string) => {
//     return email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
//   };

//   //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
//   const isEmailValid = validateEmail(email);
//   // 비밀번호가 4글자 이상인지 여부를 확인함.
//   const isPasswordValid = password.length >= 4;
//   //
//   // 이메일과 비밀번호 조건이 동시에 만족되는지 확인함.
//   const isFormValid = isEmailValid && isPasswordValid;

//   const handleSubmit = async (e: { preventDefault: () => void }) => {
//     e.preventDefault();

//     try {
//       // "user/login" 엔드포인트로 post요청함.
//       const res = await Api.post("user/login", {
//         email,
//         password,
//       });
//       // 유저 정보는 response의 data임.
//       const user = res.data;
//       // JWT 토큰은 유저 정보의 token임.
//       const jwtToken = user.token;
//       // sessionStorage에 "userToken"이라는 키로 JWT 토큰을 저장함.
//       sessionStorage.setItem("userToken", jwtToken);
//       // dispatch 함수를 이용해 로그인 성공 상태로 만듦.
//       dispatch({
//         type: "LOGIN_SUCCESS",
//         payload: user,
//       });

//       // 기본 페이지로 이동함.
//       navigate("/", { replace: true });
//     } catch (err) {
//       console.log("로그인에 실패하였습니다.\n", err);
//     }
//   };

//   return (
//     <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
//           <p className="mt-2 text-center text-sm text-gray-600">
//             Or
//             <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
//               {"  "}Sign up
//             </a>
//           </p>
//         </div>
//         <form className="mt-8 space-y-6" action="#" method="POST">
//           <input type="hidden" name="remember" value="true" />
//           <div className="rounded-md shadow-sm -space-y-px">
//             <div>
//               <label htmlFor="email-address" className="sr-only">
//                 Email address
//               </label>
//               <input
//                 id="email-address"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Email address"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//             <div>
//               <label htmlFor="password" className="sr-only">
//                 Password
//               </label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 autoComplete="current-password"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//           </div>

//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
//               <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
//                 {" "}
//                 Remember me{" "}
//               </label>
//             </div>

//             <div className="text-sm">
//               <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
//                 {" "}
//                 Forgot your password?{" "}
//               </a>
//             </div>
//           </div>

//           <div>
//             <button
//               type="submit"
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               <span className="absolute left-0 inset-y-0 flex items-center pl-3">
//                 <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                   <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
//                 </svg>
//               </span>
//               Sign in
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };
// export default LoginForm;
