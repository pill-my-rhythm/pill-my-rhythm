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

function TaskItem({ task }) {
  const onItemDragStart = (e) => {
    e.itemData = e.fromData;
  };
  const onItemDragEnd = (e) => {
    if (e.toData) {
      e.cancel = true;
    }
  };
  return (
    <Draggable
      key={task.text}
      className="item dx-card dx-theme-text-color dx-theme-background-color"
      clone={true}
      group={draggingGroupName}
      data={task}
      onDragStart={onItemDragStart}
      onDragEnd={onItemDragEnd}
    >
      <Card>{task.text}</Card>
    </Draggable>
  );
}

export default React.memo(TaskItem);
