import { AfterContent, CardWrap, ImgWrapper, InfoWrapper, SupName, Tag } from "./SupStyled";

function SupCard() {
  return (
    <CardWrap>
      <ImgWrapper>
        <img src="https://shopping-phinf.pstatic.net/main_2841914/28419146556.20220331093751.jpg" alt="" />
      </ImgWrapper>
      <InfoWrapper>
        <Tag>#우리바이오(주)</Tag>
        <SupName>하루틴 루테인 알티지(rTG) 오메가3</SupName>
      </InfoWrapper>
      <AfterContent>
        <button className="btn btn-primary">구매하기</button>
      </AfterContent>
    </CardWrap>
  );
}

export default SupCard;
