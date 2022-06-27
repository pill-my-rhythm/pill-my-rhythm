import styled from "styled-components";
import { post } from "../../Api";

const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 8px;
  padding: 15px 24px 15px 24px;
  background-color: #d2dae2;
  font-size: 14px;
  cursor: pointer;
`;

interface infoProps {
  info: any;
  task: { text: string; type: string };
}

function Supplements({ info, task }: infoProps) {
  const handleCardClick = async () => {
    // await post("schedule/daily-supplement", {
    //   type: task.type,
    //   fk_supplement_id: info.fk_supplement_id,
    // });
  };
  return <Card onClick={handleCardClick}>{info.Supplement.name}</Card>;
}

export default Supplements;
