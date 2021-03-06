import React from "react";
import { useSetRecoilState } from "recoil";
import { del, get } from "../../Api";
import { end, start, supplementAtom } from "../../atoms";
import { supInfo } from "./DayItem";

interface supProps {
  info: supInfo;
}

function SupItem({ info }: supProps) {
  const setSupplements = useSetRecoilState(supplementAtom);
  const handleDelete = async () => {
    await del(`schedule/daily-supplement/${info.pk_plan_id}`);
    await get(`schedule/?start=${new Date(start)}&finish=${new Date(end)}`).then((res) => {
      setSupplements(res.data.dailySupplement);
    });
  };
  return (
    <li onClick={handleDelete} className="cursor-pointer text-sm">
      {info.Supplement.name}
    </li>
  );
}

export default React.memo(SupItem);
