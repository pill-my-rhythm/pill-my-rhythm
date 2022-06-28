import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { get, post } from "../../Api";
import { end, start, supplementAtom } from "../../atoms";
import { supInfo } from "./DayItem";

const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 8px;
  padding: 15px 24px 15px 24px;
  background-color: #d2dae2;
  font-size: 14px;
  cursor: pointer;
`;

interface infoProps {
  info: supInfo;
  task: { text: string; type: string };
}

function Supplements({ info, task }: infoProps) {
  const setSupplements = useSetRecoilState(supplementAtom);
  const handleCardClick = async () => {
    await post("schedule/daily-supplement", {
      type: task.type,
      fk_supplement_id: info.fk_supplement_id,
    });
    await get(`schedule/?start=${new Date(start)}&finish=${new Date(end)}`).then((res) => {
      setSupplements(res.data.dailySupplement);
    });
  };
  return <Card onClick={handleCardClick}>{info.Supplement.name}</Card>;
}

export default Supplements;
