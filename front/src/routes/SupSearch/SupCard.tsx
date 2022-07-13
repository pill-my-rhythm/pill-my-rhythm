import { Result } from "./SupSearch";
import { AfterContent, CardWrap, ImgWrapper, InfoWrapper, SupName, Tag } from "./SupStyled";

interface CardProp {
  data: Result;
}

function SupCard({ data }: CardProp) {
  return (
    <CardWrap>
      <ImgWrapper>
        <img src={data.img_link} alt="" />
      </ImgWrapper>
      <InfoWrapper>
        <Tag>{data.company}</Tag>
        <SupName>{data.name}</SupName>
      </InfoWrapper>
      <AfterContent>
        <button className="btn btn-primary">구매하기</button>
      </AfterContent>
    </CardWrap>
  );
}

export default SupCard;
