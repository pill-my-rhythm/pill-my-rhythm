import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { post } from "../../Api";
import { checkListAtom } from "../../atoms";

const DateLabel = styled.label<ColorProp>`
  background-color: ${(props) => props.color};
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
  level: { level: string; date: string }[];
}

interface ColorProp {
  color?: string;
}

const CheckList = ({ data, level }: CheckListProp) => {
  const checkList = useRecoilValue(checkListAtom);
  const [checkedInputs, setCheckedInputs]: any = useState([]);

  const allDay = level.map((data) => {
    return { color: data.level, date: data.date.substring(8) };
  });
  const date = new Date(data.date).getDate().toString();
  const color = allDay.find((day) => day.date === date)?.color;

  const changeHandler = (checked: boolean, id: string) => {
    if (checked) {
      setCheckedInputs([...checkedInputs, id]);
    } else {
      // 체크 해제
      setCheckedInputs(checkedInputs.filter((el: string) => el !== id));
    }
  };

  const handleSubmit = async () => {
    const result = checkList.map((el: any) => (checkedInputs.includes(el.text) ? true : false));
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
      <DateLabel htmlFor={`modal-${data.text}`} className="modal-button cursor-pointer" color={color}>
        {data.text}
      </DateLabel>
      <input type="checkbox" id={`modal-${data.text}`} className="modal-toggle" />
      <label htmlFor={`modal-${data.text}`} className="modal cursor-pointer">
        <label className="modal-box max-w-xs" htmlFor="">
          <CheckListTitle>{data.text}</CheckListTitle>
          {checkList.map((task, index) => (
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
