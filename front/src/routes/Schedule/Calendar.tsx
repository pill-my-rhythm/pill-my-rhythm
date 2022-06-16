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
  margin: 20px;
  width: 240px;
`;

const Title = styled.h2`
  margin-left: 270px;
  margin-bottom: 40px;
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
      <b style={{ color: "green", fontWeight: "bold" }}>
        <button>{data.text}</button>
      </b>
    );
  };

  return (
    <React.Fragment>
      <Wrapper>
        <ScrollView id="scroll">
          <Draggable id="list" data="dropArea" group={draggingGroupName} onDragStart={onListDragStart}>
            {tasks.map((task) => (
              <ListItem task={task} key={task.text} />
            ))}
          </Draggable>
        </ScrollView>
      </Wrapper>
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
    </React.Fragment>
  );
}

export default Calendar;
