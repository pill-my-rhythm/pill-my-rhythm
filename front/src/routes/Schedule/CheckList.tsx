import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { get, post } from "../../Api";
import { checkListAtom, end, levelsAtom, start } from "../../atoms";
import { Levels } from "./Calendar";

interface CheckListProp {
  data: {
    date: Date;
    text: string;
  };
}

interface ColorProp {
  color?: string;
}

const DateLabel = styled.label<ColorProp>`
  color: #000;
  background-color: ${(props) => {
    if (props.color === "red") {
      return "#fca5a5";
    } else if (props.color === "yellow") {
      return "#fef08a";
    } else if (props.color === "green") {
      return "#70df95";
    } else {
      return;
    }
  }};
  border-radius: 1rem;
  padding: 5px 10px;
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

const CheckListBtn = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 30%;
`;

const CheckList = ({ data }: CheckListProp) => {
  const [level, setLevel] = useRecoilState<Array<Levels>>(levelsAtom);
  const checkList = useRecoilValue(checkListAtom);
  const [checkedInputs, setCheckedInputs]: any = useState([]);

  const weekColorInfo = level.map((data) => {
    return { color: data.level, date: data.date.substring(8) };
  });

  const date = new Date(data.date).getDate().toString();
  const zeroFill = date.length < 2 ? `0${date}` : date;
  const color = weekColorInfo.find((day) => day.date === zeroFill)?.color;

  const changeHandler = (checked: boolean, id: string) => {
    if (checked) {
      setCheckedInputs([...checkedInputs, id]);
    } else {
      setCheckedInputs(checkedInputs.filter((el: string) => el !== id));
    }
  };

  const handleSubmit = async () => {
    const result = checkList.map((el: any) => (checkedInputs.includes(el.text) ? true : false));
    const offset = new Date().getTimezoneOffset() * 60000;
    const current = new Date(data.date.getTime() - offset);
    const checkListDate = current.toISOString().substring(0, 10);

    try {
      await post("checklist/create", {
        date: checkListDate,
        one: result[0],
        two: result[1],
        three: result[2],
        four: result[3],
        five: result[4],
        six: result[5],
      });
    } catch (error: any) {
      console.log(error);
      if (error.response.data.message) {
        alert(error.response.data.message);
      }
    }

    await get(`schedule/week?start=${new Date(start)}&finish=${new Date(end)}`).then((res) => {
      setLevel(res.data.checklist);
    });
  };
  return (
    <>
      <DateLabel htmlFor={`modal-${data.text}`} className="modal-button cursor-pointer" color={color}>
        {data.text}
      </DateLabel>
      <input type="checkbox" id={`modal-${data.text}`} className="modal-toggle" />
      <label htmlFor={`modal-${data.text}`} className="modal cursor-pointer">
        <label className="modal-box max-w-xs" htmlFor={`modal-${data.text}`}>
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
          <div className="modal-action">
            <CheckListBtn onClick={handleSubmit} className="btn btn-primary" htmlFor={`modal-${data.text}`}>
              제출
            </CheckListBtn>
          </div>
        </label>
      </label>
    </>
  );
};

export default CheckList;
