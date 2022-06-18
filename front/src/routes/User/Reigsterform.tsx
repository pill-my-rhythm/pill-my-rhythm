import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { post } from "../../Api";

function RegisterForm() {
  const navigate = useNavigate();

  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState("");
  //useState로 password 상태를 생성함.
  const [password, setPassword] = useState("");
  //useState로 confirmPassword 상태를 생성함.
  const [confirmPassword, setConfirmPassword] = useState("");
  //useState로 name 상태를 생성함.
  const [name, setName] = useState("");
  const [gender, setGender] = useState("M");
  const [ageRange, setAgeRange] = useState("10대");
  const [job, setJob] = useState("교육");

  //이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
  const validateEmail = (email: string) => {
    return email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  };

  //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
  const isEmailValid = validateEmail(email);
  // 비밀번호가 4글자 이상인지 여부를 확인함.
  const isPasswordValid = password.length >= 8;
  // 비밀번호와 확인용 비밀번호가 일치하는지 여부를 확인함.
  const isPasswordSame = password === confirmPassword;
  // 이름이 2글자 이상인지 여부를 확인함.
  const isNameValid = name.length >= 2;

  // 위 4개 조건이 모두 동시에 만족되는지 여부를 확인함.
  const isFormValid = isEmailValid && isPasswordValid && isPasswordSame && isNameValid;

  const handleSubmit: React.FormEventHandler<HTMLFormElement> | undefined = async (e) => {
    e.preventDefault();

    try {
      // "user/register" 엔드포인트로 post요청함.
      await post("user/register", {
        user_name: name,
        email: email,
        password: password,
        gender: gender,
        age_range: ageRange,
        job: job,
      });

      // 로그인 페이지로 이동함.
      navigate("/login");
    } catch (err) {
      console.log("회원가입에 실패하였습니다.", err);
    }
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up</h2>
          <p className="m-3 text-center text-sm text-gray-600"> 회원 가입을 환영합니다.</p>
        </div>
        <div className="grid place-content-stretch">
          <form className="m-2 items-center" onSubmit={handleSubmit}>
            <div>
              <label>
                <input className="input w-full max-w-md m-2" type="text" value={name} placeholder="이름" onChange={(e) => setName(e.target.value)} />
              </label>
            </div>
            <div>
              <label>
                <input className="input w-full max-w-md m-2" type="text" value={email} placeholder="이메일" onChange={(e) => setEmail(e.target.value)} />
              </label>
            </div>
            <div>
              <label>
                <input className="input w-full max-w-md m-2" type="password" value={password} placeholder="비밀번호" onChange={(e) => setPassword(e.target.value)} />
              </label>
            </div>
            <div>
              <label>
                <input className="input w-full max-w-md m-2" type="password" value={confirmPassword} placeholder="비밀번호확인" onChange={(e) => setConfirmPassword(e.target.value)} />
              </label>
              <br />
              {!isPasswordSame && <p className="m-2 text-sm text-red-400">비밀번호가 일치하지 않습니다.</p>}
            </div>
            <div>
              <label>
                <select className="select select-bordered w-full max-w-md m-2" value={gender} onChange={(e) => setGender(e.target.value)}>
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
                <select className="select select-bordered w-full max-w-md m-2" value={ageRange} onChange={(e) => setAgeRange(e.target.value)}>
                  <option value="연령대" disabled>
                    연령대
                  </option>
                  <option>10대</option>
                  <option>20대</option>
                  <option>30대</option>
                  <option>40대</option>
                  <option>50대</option>
                  <option>60대 이상</option>
                </select>
              </label>
            </div>
            <div>
              <label>
                <select className="select select-bordered w-full max-w-md m-2" value={job} onChange={(e) => setJob(e.target.value)}>
                  <option value="직업군" disabled>
                    직업군
                  </option>
                  <option>교육</option>
                  <option>제조</option>
                  <option>디자인</option>
                  <option>개발</option>
                  <option>서비스</option>
                  <option>기타</option>
                </select>
              </label>
            </div>
          </form>
          <div>
            <label className="flex items-center justify-center mt-6">
              <button
                type="submit"
                className="group relative w-3/5 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                disabled={!isFormValid}
              >
                가입 완료
              </button>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
