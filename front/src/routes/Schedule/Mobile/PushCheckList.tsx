/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unreachable */

// 사용자가 브라우저 혹은 모바일에서 webpush 클릭해 넘어온 화면
// webpush data에 jwt_token값 들어 있음
// 해당 jwt_token이랑 체크리스트 선택값으로 체크리스트 생성하도록 backend에 요청

// import React from "react";
// import axios from "axios";
// import styled from "styled-components";

// const TodoWrapper = styled.div`
//   display: flex;
//   text-align: left;
//   color: black;
//   padding: 10px;
// `;

// interface CheckListProp {
//   data: { text: string };
//   index: number;
//   tasks: { text: string }[];
// }

const Checklist = () => {
  //   const queryString = new URLSearchParams(window.location.search);
  //   let jwtToken = queryString.get("jwt");
  //   console.log(jwtToken);
  //   const submit = async () => {
  //     console.log("checklist submit function");
  //     // 체크리스트 항목 정보 DB에 추가
  //     await axios
  //       .post(
  //         `${process.env.REACT_APP_MODE}:${process.env.REACT_APP_BACK_PORT}/checklist/create`,
  //         { device_token: subscription },
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${jwtToken}`,
  //           },
  //         },
  //       )
  //       .then(() => {
  //         alert("오늘의 체크리스트 작성이 완료되었습니다.");
  //       });
  //   };
  return (
    <>
      {/* <DateLabel htmlFor={`modal-${data.text}`} className="modal-button cursor-pointer">
          {data.text}
        </DateLabel> */}
      <input type="checkbox" id={`modal-${data.text}`} className="modal-toggle" />
      <label htmlFor={`modal-${data.text}`} className="modal cursor-pointer">
        <label className="modal-box max-w-xs" htmlFor="">
          {tasks.map((task) => (
            <TodoWrapper key={task.text}>
              <input type="checkbox" className="checkbox checkbox-sm checkbox-primary mr-3" />
              {task.text}
            </TodoWrapper>
          ))}
        </label>
        <button className="btn btn-primary" onClick={() => submit()}>
          제출
        </button>
      </label>
    </>
  );
};

export default Checklist;
