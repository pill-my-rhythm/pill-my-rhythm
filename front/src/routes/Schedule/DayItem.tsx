// 임시 컴포넌트 (코드 정리 X)

import React from "react";
import Draggable from "devextreme-react/draggable";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { dayHoursAtom } from "../../atoms";

const draggingGroupName = "appointmentsGroup";
const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 8px;
  padding: 15px 24px 15px 24px;
  background-color: white;
  font-size: 14px;
  /* margin: 0 auto; */
`;

const DateLabel = styled.label`
  background-color: transparent;
`;

interface taskProps {
  task: { text: string };
}

function DayItem({ task }: taskProps) {
  const dayHour = useRecoilValue(dayHoursAtom);
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
      <DateLabel htmlFor="my-modal-4" className="modal-button cursor-pointer max-w-xs">
        <Card>{task.text}</Card>
      </DateLabel>

      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box" htmlFor="">
          <h3 className="text-lg font-bold">Title</h3>
          <p className="py-4">description</p>
        </label>
      </label>
    </Draggable>
  );
}

export default React.memo(DayItem);
