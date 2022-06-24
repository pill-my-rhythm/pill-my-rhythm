import React, { useState } from "react";
import styled from "styled-components";
import { post } from "../../Api";

const DateLabel = styled.label`
  background-color: transparent;
`;

const TodoWrapper = styled.div`
  display: flex;
  text-align: left;
  color: black;
  padding: 10px;
`;

const CheckListTitle = styled.h1`
  font-size: 26px;
  margin-bottom: 10px;
`;

const CheckListBtn = styled.button`
  width: 30%;
  margin-top: 20px;
`;

interface CheckListProp {
  data: {
    date: Date;
    text: string;
  };
  index: number;
  tasks: { text: string }[];
}

const CheckList = ({ data, index, tasks }: CheckListProp) => {
  const [checkedInputs, setCheckedInputs]: any = useState([]);

  const changeHandler = (checked: boolean, id: string) => {
    if (checked) {
      setCheckedInputs([...checkedInputs, id]);
    } else {
      // 체크 해제
      setCheckedInputs(checkedInputs.filter((el: string) => el !== id));
    }
  };

  const handleSubmit = async () => {
    const result = tasks.map((el: any) => (checkedInputs.includes(el.text) ? true : false));
    const offset = new Date().getTimezoneOffset() * 60000;
    const current = new Date(data.date.getTime() - offset);
    const checkListDate = current.toISOString().substring(0, 10);

    await post("checklist/create", {
      date: checkListDate,
      one: result[0],
      two: result[1],
      three: result[2],
      four: result[3],
      five: result[4],
      six: result[5],
    });
  };
  return (
    <>
      <DateLabel htmlFor={`modal-${data.text}`} className="modal-button cursor-pointer">
        {data.text}
      </DateLabel>
      <input type="checkbox" id={`modal-${data.text}`} className="modal-toggle" />
      <label htmlFor={`modal-${data.text}`} className="modal cursor-pointer">
        <label className="modal-box max-w-xs" htmlFor="">
          <CheckListTitle>{data.text}</CheckListTitle>
          {tasks.map((task, index) => (
            <TodoWrapper key={index}>
              <input
                id={task.text}
                type="checkbox"
                className="checkbox checkbox-sm checkbox-primary mr-3"
                onChange={(e) => {
                  changeHandler(e.currentTarget.checked, task.text);
                }}
                checked={checkedInputs.includes(task.text) ? true : false}
              />
              {task.text}
            </TodoWrapper>
          ))}
          <CheckListBtn onClick={handleSubmit} className="btn btn-primary">
            제출
          </CheckListBtn>
        </label>
      </label>
    </>
  );
};

export default CheckList;
