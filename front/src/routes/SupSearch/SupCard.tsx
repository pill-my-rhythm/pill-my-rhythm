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
        <Tag>{data.company}</Tag>
        <SupName>{data.name}</SupName>
      </InfoWrapper>
      <AfterContent>
        <label htmlFor={`modal-${data.name}`} className="btn modal-button btn-active btn-ghost">
          더 알아보기
        </label>
        <PRModal pr={data} key={data.pk_supplement_id} />
      </AfterContent>
    </CardWrap>
  );
}

export default SupCard;
