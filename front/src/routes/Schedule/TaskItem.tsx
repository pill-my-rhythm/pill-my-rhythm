import React from "react";
import Draggable from "devextreme-react/draggable";
import styled from "styled-components";

const draggingGroupName = "appointmentsGroup";
const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 7px;
  padding: 10px 10px;
  background-color: white;
`;

interface taskProps {
  task: { text: string };
}

function TaskItem({ task }: taskProps) {
  const onItemDragStart = (e: any) => {
    e.itemData = e.fromData;
  };
  const onItemDragEnd = (e: any) => {
    if (e.toData) {
      e.cancel = true;
    }
  };
  return (
    <Draggable clone={true} group={draggingGroupName} data={task} onDragStart={onItemDragStart} onDragEnd={onItemDragEnd}>
      <Card>{task.text}</Card>
    </Draggable>
  );
}

export default React.memo(TaskItem);
