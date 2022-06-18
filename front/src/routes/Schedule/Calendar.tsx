import React from "react";
import Scheduler, { AppointmentDragging } from "devextreme-react/scheduler";
import Draggable from "devextreme-react/draggable";
import ScrollView from "devextreme-react/scroll-view";
import { useRecoilState, useRecoilValue } from "recoil";
import { appointmentsAtom, tasksAtom } from "../../atoms";
import styled from "styled-components";
import ListItem from "./TaskItem";
import "devextreme/dist/css/dx.greenmist.css";
import "./Calendar.css";

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const ListWrapper = styled.div`
  height: auto;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0%);
  padding: 10px 10px 10px 10px;
  width: 280px;
  border-radius: 10px;
  background-color: #fafafa;
  color: black;
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

export interface Appintments {
  allDay: boolean;
  endDate: Date;
  startDate: Date;
  text: string;
}

let now = new Date();
const currentDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
const views: Array<Object> = [{ type: "day", intervalCount: 7 }];
const draggingGroupName = "appointmentsGroup";

function Calendar() {
  const tasks = useRecoilValue(tasksAtom);
  const [appointments, setAppointments] = useRecoilState<Array<Appintments>>(appointmentsAtom);

  const onAppointmentAdd = (e: any) => {
    // index : 움직인 item의 index 값
    // e.itemData : 움직인 item의 정보
    // tasks : 리스트 아이템
    // appointments : 캘린더에 움직여진 item의 정보
    const index = tasks.indexOf(e.fromData);
    const appointmentsCopy = [...appointments];
    if (index >= 0) {
      appointmentsCopy.push(e.itemData);
      setAppointments([...appointmentsCopy]);
    }
  };

  const onAppointmentDeleting = (e: any) => {
    e.cancel = true;
    const index = appointments.findIndex((appointments) => appointments.text === e.appointmentData.text);
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
    return (
      <>
        <DateLabel onClick={() => console.log(data.text)} htmlFor="my-modal-4" className="modal-button cursor-pointer">
          {data.text}
        </DateLabel>
        <input type="checkbox" id="my-modal-4" className="modal-toggle" />
        <label htmlFor="my-modal-4" className="modal cursor-pointer">
          <label className="modal-box relative" htmlFor="">
            <h3 className="text-lg font-bold">Title</h3>
            <p className="py-4">description</p>
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
            <ListTitle>Todo</ListTitle>
            <ListWrapper>
              {tasks.map((task) => (
                <ListItem task={task} key={task.text} />
              ))}
            </ListWrapper>
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
          height={600}
          startDayHour={8}
          onAppointmentFormOpening={onAppointmentFormOpening}
          onAppointmentDeleting={onAppointmentDeleting}
          showAllDayPanel={false}
          dateCellRender={renderDateCell}
        >
          <AppointmentDragging group={draggingGroupName} onAdd={onAppointmentAdd} />
        </Scheduler>
      </ScheduleWrapper>
    </React.Fragment>
  );
}

export default Calendar;
