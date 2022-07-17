import PRModal from "../_shared/PRModal";
import { Result } from "./SupSearch";
import { AfterContent, CardWrap, ImgWrapper, InfoWrapper, SupName, Tag } from "./SupStyled";

interface CardProp {
  data: Result;
}

function SupCard({ data }: CardProp) {
  return (
    <CardWrap>
      <ImgWrapper>
        <figure>
          <img className="w-48 m-6 rounded-lg" src={data.img_link} alt="pills" />
        </figure>
      </ImgWrapper>
      <InfoWrapper>
        <SupName>{data.name}</SupName>
        <Tag>{data.company}</Tag>
      </InfoWrapper>
      <AfterContent>
        <label htmlFor={`modal-${data.name}`} className="btn modal-button btn-active btn-ghost">
          더 알아보기
        </label>
        <PRModal pr={data} />
      </AfterContent>
    </CardWrap>
  );
}

export default SupCard;
