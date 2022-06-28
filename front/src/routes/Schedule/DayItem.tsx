import React, { useState } from "react";
import Draggable from "devextreme-react/draggable";
import styled from "styled-components";
import { get } from "../../Api";
import Supplements from "./Supplements";

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
  task: { text: string; type: string };
}

export interface supInfo {
  Supplement: {
    caution: string;
    company: string;
    function: string;
    how_to_eat: string;
    img_link: string;
    link: string;
    name: string;
    pk_supplement_id: number;
    raw: string;
    shape: string;
    update_date: number;
  };
  createdAt: string;
  deletedAt: null;
  fk_supplement_id: number;
  fk_user_id: string;
  pk_plan_id: number;
  type: string;
  updatedAt: string;
}

function DayItem({ task }: taskProps) {
  const [supplementInfo, setSupplementInfo] = useState<supInfo[]>([]);
  const onItemDragStart = (e: any) => {
    e.itemData = e.fromData;
  };

  const onItemDragEnd = (e: any) => {
    if (e.toData) {
      e.cancel = true;
    }
  };

  const handleClick = async () => {
    await get(`bookmark`).then((res) => {
      setSupplementInfo(res.data);
    });
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

          {supplementInfo.map((info: supInfo) => (
            <Supplements info={info} task={task} key={info.createdAt} />
          ))}
        </label>
      </label>
    </Draggable>
  );
}

export default React.memo(DayItem);
