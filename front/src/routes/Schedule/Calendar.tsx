import React from "react";
import Scheduler, { AppointmentDragging } from "devextreme-react/scheduler";
import Draggable from "devextreme-react/draggable";
import ScrollView from "devextreme-react/scroll-view";
import { useRecoilState } from "recoil";
import { appointmentsAtom, tasksAtom } from "../../atoms";
import styled from "styled-components";
import "devextreme/dist/css/dx.greenmist.css";
import ListItem from "./TaskItem";
import "./Calendar.css";

const Wrapper = styled.div`
  padding: 20px 30px 20px 30px;
  margin: 20px;
  width: 240px;
  /* background: #3eb8b0; */
  /* border-radius: 5px; */
`;

let now = new Date();
const currentDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
const views: Array<Object> = [{ type: "day", intervalCount: 7 }];
const draggingGroupName = "appointmentsGroup";

function Calendar() {
  const [tasks, setTasks] = useRecoilState(tasksAtom);
  const [appointments, setAppointments] = useRecoilState<Array<Object>>(appointmentsAtom);

  const onAppointmentAdd = (e: any) => {
    // index : 움직인 item의 index 값
    // e.itemData : 움직인 item의 정보
    // tasks : 리스트 아이템
    // appointments : 캘린더에 움직여진 item의 정보
    const index = tasks.indexOf(e.fromData);
    const tasksCopy = [...tasks];
    const appointmentsCopy = [...appointments];
    if (index >= 0) {
      tasksCopy.splice(index, 0);
      appointmentsCopy.push(e.itemData);
      setAppointments([...appointmentsCopy]);
      setTasks([...tasksCopy]);
    }
  };

  // const onAppointmentDeleting = (e: any) => {
  //   const index = appointments.indexOf(e.itemData);
  //   console.log(appointments, index);
  //   // const appointmentsCopy = [...appointments];
  //   // if (index >= 0) {
  //   //   appointmentsCopy.splice(index, 1);
  //   //   setAppointments([...appointmentsCopy]);
  //   // }
  // };

  const onListDragStart = (e: any) => {
    e.cancel = true;
  };

  const onAppointmentFormOpening = (e: any) => {
    e.cancel = true;
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
      <Scheduler
        timeZone="Asia/Seoul"
        id="scheduler"
        dataSource={appointments}
        views={views}
        defaultCurrentDate={currentDate}
        height={600}
        startDayHour={8}
        onAppointmentFormOpening={onAppointmentFormOpening}
        // onAppointmentDeleting={onAppointmentDeleting}
        showAllDayPanel={false}
      >
        <AppointmentDragging group={draggingGroupName} onAdd={onAppointmentAdd} />
      </Scheduler>
    </React.Fragment>
  );
}

export default Calendar;
