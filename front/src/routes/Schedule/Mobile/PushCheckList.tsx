/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unreachable */

// 사용자가 브라우저 혹은 모바일에서 webpush 클릭해 넘어온 화면
// webpush data에 jwt_token값 들어 있음
// 해당 jwt_token이랑 체크리스트 선택값으로 체크리스트 생성하도록 backend에 요청

import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import axios from "axios";
import { tasksAtom } from "../../../atoms";

const TodoWrapper = styled.div`
  display: flex;
  text-align: left;
  color: black;
  padding: 10px;
`;

const Checklist = () => {
  const queryString = new URLSearchParams(window.location.search);
  let jwtToken = queryString.get("jwt");

  const tasks = useRecoilValue(tasksAtom);
  const [checkedItems, setCheckedItems]: any = useState([]);

  const checkedItemHandler = (checked: boolean, id: string) => {
    if (checked) {
      setCheckedItems([...checkedItems, id]);
    } else {
      // 체크 해제
      setCheckedItems(checkedItems.filter((el: any) => el !== id));
    }
  };

  let today: string;
  const now = new Date();
  const month = `${now.getUTCMonth() + 1}`.length === 1 ? "0" + `${now.getUTCMonth() + 1}` : now.getUTCMonth() + 1; //months from 1-12
  const day = now.getUTCDate();
  const year = now.getUTCFullYear();
  today = year + "-" + month + "-" + day;

  const submit = async () => {
    console.log("checklist submit function");
    console.log(tasks);
    const result = tasks.map((el: any) => (checkedItems.includes(el.text) ? true : false));
    console.log(result);

    const checklistData = { date: today, one: result[0], two: result[1], three: result[2], four: result[3], five: result[4], six: result[5] };
    console.log(checklistData);

    // 체크리스트 항목 정보 DB에 추가
    await axios
      .post(`${process.env.REACT_APP_MODE}:${process.env.REACT_APP_BACK_PORT}/checklist/create`, checklistData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then(() => {
        alert("오늘의 체크리스트 작성이 완료되었습니다.");
      });
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Today's Checklist</h2>
          <br />
          <p className="mt-2 text-center text-sm text-gray-600">{today}</p>
        </div>
        <div>
          {/* <label className="modal-box max-w-xs" htmlFor=""> */}
          {tasks.map((task) => (
            <TodoWrapper key={task.text}>
              <input
                type="checkbox"
                className="checkbox checkbox-sm checkbox-primary mr-3"
                onChange={(e) => {
                  checkedItemHandler(e.currentTarget.checked, task.text);
                }}
                checked={checkedItems.includes(task.text) ? true : false}
              />
              {task.text}
            </TodoWrapper>
          ))}
          <button className="btn btn-primary" onClick={() => submit()}>
            제출
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checklist;
