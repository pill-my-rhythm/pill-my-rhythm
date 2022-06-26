import React from "react";
import Draggable from "devextreme-react/draggable";
import styled from "styled-components";
import { get } from "../../Api";

const draggingGroupName = "appointmentsGroup";
const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 8px;
  padding: 15px 24px 15px 24px;
  background-color: white;
  font-size: 14px;
`;

const DateLabel = styled.label`
  background-color: transparent;
`;

interface taskProps {
  task: { text: string };
}

function DayItem({ task }: taskProps) {
  const onItemDragStart = (e: any) => {
    e.itemData = e.fromData;
  };

  const onItemDragEnd = (e: any) => {
    if (e.toData) {
      e.cancel = true;
    }
  };

  const handleClick = async () => {
    await get(`bookmark`).then((res) => console.log(res));
  };
  return (
    <Draggable clone={true} group={draggingGroupName} data={task} onDragStart={onItemDragStart} onDragEnd={onItemDragEnd}>
      <DateLabel htmlFor={`modal-${task.text}`} className="modal-button cursor-pointer max-w-xs" onClick={handleClick}>
        <Card>{task.text}</Card>
      </DateLabel>

      <input type="checkbox" id={`modal-${task.text}`} className="modal-toggle" />
      <label htmlFor={`modal-${task.text}`} className="modal cursor-pointer">
        <label className="modal-box" htmlFor="">
          <h3 className="text-lg font-bold">{task.text}</h3>
          <p className="py-4">description</p>
        </label>
      </label>
    </Draggable>
  );
}

export default React.memo(DayItem);
