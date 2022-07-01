import React, { useState } from "react";
import Draggable from "devextreme-react/draggable";
import styled from "styled-components";
import { get } from "../../Api";
import Supplements from "./Supplements";
import { useRecoilState } from "recoil";
import { supplementAtom } from "../../atoms";
import SupItem from "./SupItem";
import img from "../../assets/tab.png";

const draggingGroupName = "appointmentsGroup";

const Card = styled.div`
  border-radius: 0.5rem;
  margin-bottom: 8px;
  padding: 15px 15px;
  background-color: white;
`;

const DateLabel = styled.label`
  background-color: transparent;
`;

interface taskProps {
  task: { text: string; type: string };
}

export interface supInfo {
  Supplement: {
    caution?: string;
    company?: string;
    function?: string;
    how_to_eat?: string;
    img_link?: string;
    link?: string;
    name: string;
    pk_supplement_id?: number;
    raw?: string;
    shape?: string;
    update_date?: number;
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
  const [supplements, setSupplements] = useRecoilState(supplementAtom);

  const supType = supplements.filter((data) => data.type === task.type);
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
    <>
      <Draggable clone={true} group={draggingGroupName} data={task} onDragStart={onItemDragStart} onDragEnd={onItemDragEnd}>
        <DateLabel htmlFor={`modal-${task.text}`} className="modal-button cursor-pointer max-w-xs" onClick={handleClick}>
          <Card className="bg-white rounded-xl shadow-md">
            <span className="group flex items-center lg:text-sm lg:leading-6 font-medium text-black flex justify-between">
              {/* <div className="mr-4 rounded-md ring-1 ring-slate-900/5 shadow-sm group-hover:shadow group-hover:ring-slate-900/10 dark:ring-0 dark:shadow-none dark:group-hover:shadow-none dark:group-hover:highlight-white/10 group-hover:shadow-teal-200 dark:group-hover:bg-teal-500 dark:bg-slate-800 dark:highlight-white/5"> */}
              {/* <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none">
                  <path d="m6 9 6-3 6 3v6l-6 3-6-3V9Z" className="fill-teal-100 group-hover:fill-teal-200 dark:fill-slate-400" />
                  <path d="m6 9 6 3v7l-6-3V9Z" className="fill-teal-300 group-hover:fill-teal-400 dark:group-hover:fill-teal-300 dark:fill-slate-500" />
                  <path d="m18 9-6 3v7l6-3V9Z" className="fill-teal-400 group-hover:fill-teal-500 dark:group-hover:fill-teal-400 dark:fill-slate-600" />
                </svg> */}

              {/* </div> */}
              <div> {task.text}</div>
              <div>
                <img width="20" height="20" src="https://i.ibb.co/jZp3SQ3/tab.png" alt="약 이미지" />
              </div>
            </span>
          </Card>
        </DateLabel>

        <input type="checkbox" id={`modal-${task.text}`} className="modal-toggle" />
        <label htmlFor={`modal-${task.text}`} className="modal cursor-pointer">
          <label className="modal-box" htmlFor="">
            <h3 className="text-lg text-black font-semibold mb-1">{task.text}</h3>

            {supplementInfo.map((info: supInfo) => (
              <Supplements info={info} task={task} key={info.pk_plan_id} />
            ))}
          </label>
        </label>
      </Draggable>

      <ul role="list" className="marker:text-teal-400 list-disc pl-8 space-y-3 text-slate-500 mb-2">
        {supType.map((info: supInfo) => (
          <SupItem key={info.pk_plan_id} info={info} />
        ))}
      </ul>
    </>
  );
}

export default React.memo(DayItem);
