import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { get, post } from "../../Api";
import { end, start, supplementAtom } from "../../atoms";
import { supInfo } from "./DayItem";

export interface infoProps {
  info: supInfo;
  task: { text: string; type: string };
}

function Supplements({ info, task }: infoProps) {
  const setSupplements = useSetRecoilState(supplementAtom);
  const handleCardClick = async () => {
    try {
      await post("schedule/daily-supplement", {
        type: task.type,
        fk_supplement_id: info.fk_supplement_id,
      });
    } catch (error: any) {
      if (error.response.data.message) {
        alert(error.response.data.message);
      }
    }
    await get(
      `schedule/?start=${new Date(start)}&finish=${new Date(end)}`
    ).then((res) => {
      setSupplements(res.data.dailySupplement);
    });
  };

  return (
    <>
      <div
        className="bg-white rounded-xl cursor-pointer"
        onClick={handleCardClick}
      >
        <div className="md:flex">
          <div className="md:shrink-0">
            <img
              className="h-36 w-full object-cover rounded-xl"
              src={info.Supplement.img_link}
              alt="약 이미지"
            />
          </div>
          <div className="pl-8 self-center">
            <p className="uppercase tracking-wide text-sm text-teal-500 font-semibold">
              {info.Supplement.company}
            </p>
            <p className="block mt-1 text-base font-medium text-black">
              {info.Supplement.name}
            </p>
            <p className="mt-2 text-slate-500 text-[15px]">
              {info.Supplement.how_to_eat}
            </p>
          </div>
        </div>
      </div>
      <div className="divider" />
    </>
  );
}

export default Supplements;
