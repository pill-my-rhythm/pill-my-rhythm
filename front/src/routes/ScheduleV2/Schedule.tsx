import styled from "styled-components";

const Wrapper = styled.div`
  background-color: #fff;
`;

const TopWrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  padding: 0 48px;
  padding-top: 100px;
  background-color: navy;
`;

const CalendarWrapper = styled(Wrapper)`
  width: 30%;
  margin-right: 60px;
`;

const TaskWrapper = styled(Wrapper)`
  background-color: pink;
  width: 55%;
`;

const SubscribeWrapper = styled(Wrapper)`
  width: 20%;
  background-color: grey;
`;

const Schedule = () => {
  return (
    <TopWrapper>
      <CalendarWrapper>캘린더, 체크리스트 영역</CalendarWrapper>
      <TaskWrapper>하루 영양제 영역</TaskWrapper>
      <SubscribeWrapper>구독 버튼, 기타 컴포넌트 영역</SubscribeWrapper>
    </TopWrapper>
  );
};

export default Schedule;
