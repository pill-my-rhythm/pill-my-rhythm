import React from "react";
import Draggable from "devextreme-react/draggable";
import styled from "styled-components";

const draggingGroupName = "appointmentsGroup";
const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 8px;
  padding: 15px 24px 15px 24px;
  background-color: white;
  font-size: 14px;
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
      <li>
        <span className="block border-l pl-4 -ml-px border-transparent hover:border-slate-400 dark:hover:border-slate-500 text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300">
          {task.text}
        </span>
      </li>
    </Draggable>
  );
}

export default React.memo(TaskItem);
