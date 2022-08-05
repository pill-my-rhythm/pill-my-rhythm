import React from "react";
import Draggable from "devextreme-react/draggable";
import styled from "styled-components";

const draggingGroupName = "appointmentsGroup";
const Card = styled.div`
  border-radius: 0.5rem;
  margin-bottom: 8px;
  padding: 15px 15px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 10px -1px;
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
    <Draggable
      clone={true}
      group={draggingGroupName}
      data={task}
      onDragStart={onItemDragStart}
      onDragEnd={onItemDragEnd}
    >
      <Card className="bg-white rounded-xl">
        <span className="text-[14px] pl-2 -ml-px text-black">{task.text}</span>
      </Card>
    </Draggable>
  );
}

export default React.memo(TaskItem);
