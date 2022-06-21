import React, { useEffect } from "react";
import Scheduler, { AppointmentDragging } from "devextreme-react/scheduler";
import Draggable from "devextreme-react/draggable";
import ScrollView from "devextreme-react/scroll-view";
import { useRecoilState, useRecoilValue } from "recoil";
import { get, post } from "../../Api";
import { appointmentsAtom, dayHoursAtom, tasksAtom } from "../../atoms";
import styled from "styled-components";
import TaskItem from "./TaskItem";
import "devextreme/dist/css/dx.greenmist.css";
import "./Calendar.css";
import DayItem from "./DayItem";

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const DayWrapper = styled.div`
  height: auto;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0%);
  padding: 10px 10px 0px 10px;
  width: 280px;
  border-radius: 10px;
  background-color: #fafafa;
  color: black;
`;

const ListWrapper = styled(DayWrapper)`
  transform: translate(-50%, 60%);
`;

const ScheduleWrapper = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  padding: 100px 50px 0px 50px;
  width: 75%;
`;

const Title = styled.h2`
  padding-bottom: 20px;
`;

const ListTitle = styled.h3`
  text-align: left;
  padding: 40px 0px 20px 50px;
  font-size: 24px;
  font-weight: 700;
`;

const DateLabel = styled.label`
  background-color: transparent;
`;

const TodoWrapaper = styled.div`
  display: flex;
  text-align: left;
  color: black;
  padding: 10px;
`;

export interface Appointments {
  allDay: boolean;
  endDate: Date;
  startDate: Date;
  text: string;
}

let now = new Date();
const currentDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
const views: Array<Object> = [{ type: "week" }];
const draggingGroupName = "appointmentsGroup";

function Calendar() {
  const tasks = useRecoilValue(tasksAtom);
  const dayHour = useRecoilValue(dayHoursAtom);
  const [appointments, setAppointments] = useRecoilState<Array<Appointments>>(appointmentsAtom);
  const start = "2022-06-20";
  const finish = "2022-06-26";
  // console.log(views);
  useEffect(() => {
    get(`schedule?start=${start}&finish=${finish}`).then((res) => console.log(res.data));
  }, []);

  const onAppointmentAdd = async (e: any) => {
    // index : 움직인 item의 index 값
    // e.itemData : 움직인 item의 정보
    // tasks : 리스트 아이템
    // appointments : 캘린더에 움직여진 item의 정보
    // e.cancel = true;
    const index = tasks.indexOf(e.fromData);
    if (index >= 0) {
      setAppointments((currentAppointment) => [...currentAppointment, e.itemData]);
      try {
        await post("schedule/create", {
          type: "B",
          start: e.itemData.startDate,
          finish: e.itemData.endDate,
          to_do: e.itemData.text,
        });
      } catch (err) {
        console.log("스케줄 생성 오류", err);
      }
    }
    // console.log(e.itemData.endDate, e.itemData.startDate, e.itemData.text);
  };

  const onAppointmentDeleting = (e: any) => {
    e.cancel = true;
    const index = appointments.findIndex((appointments) => appointments.endDate === e.appointmentData.endDate);
    const appointmentsCopy = [...appointments];
    if (index >= 0) {
      appointmentsCopy.splice(index, 1);
      setAppointments([...appointmentsCopy]);
    }
  };

  const onListDragStart = (e: any) => {
    e.cancel = true;
  };

  const onAppointmentFormOpening = (e: any) => {
    e.cancel = true;
  };

  const renderDateCell = (data: { text: string }, index: number) => {
    // console.log(data, index);
    return (
      <>
        <DateLabel htmlFor="my-modal-4" className="modal-button cursor-pointer">
          {data.text}
        </DateLabel>
        <input type="checkbox" id="my-modal-4" className="modal-toggle" />
        <label htmlFor="my-modal-4" className="modal cursor-pointer">
          <label className="modal-box max-w-xs" htmlFor="">
            {tasks.map((task) => (
              <TodoWrapaper key={task.text}>
                <input type="checkbox" className="checkbox checkbox-sm checkbox-primary mr-3" />
                {task.text}
              </TodoWrapaper>
            ))}
          </label>
        </label>
      </>
    );
  };

  return (
    <React.Fragment>
      <Wrapper>
        <ScrollView id="scroll">
          <Draggable id="list" data="dropArea" group={draggingGroupName} onDragStart={onListDragStart}>
            <ListTitle>Feed</ListTitle>
            <ListWrapper>
              {tasks.map((task) => (
                <TaskItem task={task} key={task.text} />
              ))}
            </ListWrapper>
            {/* 문제 나는 모달 부분 */}
            {/* <DayWrapper>
              {dayHour.map((task) => (
                <DayItem task={task} key={task.text} />
              ))}
            </DayWrapper> */}
          </Draggable>
        </ScrollView>
      </Wrapper>
      <ScheduleWrapper>
        <Title className="text-3xl font-extrabold text-gray-900">Scheduler</Title>
        <Scheduler
          timeZone="Asia/Seoul"
          id="scheduler"
          dataSource={appointments}
          views={views}
          defaultCurrentDate={currentDate}
          defaultCurrentView="week"
          height={600}
          startDayHour={8}
          onAppointmentFormOpening={onAppointmentFormOpening}
          onAppointmentDeleting={onAppointmentDeleting}
          showAllDayPanel={false}
          dateCellRender={renderDateCell}
          firstDayOfWeek={1}
        >
          <AppointmentDragging group={draggingGroupName} onAdd={onAppointmentAdd} />
        </Scheduler>
      </ScheduleWrapper>
    </React.Fragment>
  );
}

export default Calendar;
