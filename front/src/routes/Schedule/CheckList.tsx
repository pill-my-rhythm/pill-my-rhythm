import styled from "styled-components";

const DateLabel = styled.label`
  background-color: transparent;
`;

const TodoWrapper = styled.div`
  display: flex;
  text-align: left;
  color: black;
  padding: 10px;
`;

interface CheckListProp {
  data: { text: string };
  index: number;
  tasks: { text: string }[];
}

const CheckList = ({ data, index, tasks }: CheckListProp) => {
  return (
    <>
      <DateLabel htmlFor={`modal-${data.text}`} className="modal-button cursor-pointer">
        {data.text}
      </DateLabel>
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
      </label>
    </>
  );
};

export default CheckList;
