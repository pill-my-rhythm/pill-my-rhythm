import React from "react";
import { useSetRecoilState } from "recoil";
import { del, get } from "../../Api";
import { end, start, supplementAtom } from "../../atoms";
import { Supplements } from "./Calendar";

interface supProps {
  data: Supplements;
}

function SupItem({ data }: supProps) {
  const setSupplements = useSetRecoilState(supplementAtom);
  const handleDelete = async () => {
    await del(`schedule/daily-supplement/${data.pk_plan_id}`);
    await get(`schedule/?start=${new Date(start)}&finish=${new Date(end)}`).then((res) => {
      setSupplements(res.data.dailySupplement);
    });
  };
  return <div onClick={handleDelete}>{data.Supplement.name}</div>;
}

export default React.memo(SupItem);
