import React from "react";
import Scheduler, { AppointmentDragging } from "devextreme-react/scheduler";
import Draggable from "devextreme-react/draggable";
import ScrollView from "devextreme-react/scroll-view";
import { useRecoilState } from "recoil";
import { appointmentsAtom, tasksAtom } from "../../atoms";
import styled from "styled-components";
import "devextreme/dist/css/dx.greenmist.css";
import ListItem from "./TaskItem";

let now = new Date();
const currentDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
const views = [{ type: "day", intervalCount: 7 }];
const draggingGroupName = "appointmentsGroup";

function Calendar() {
  const [tasks, setTasks] = useRecoilState(tasksAtom);
  const [appointments, setAppointments] = useRecoilState(appointmentsAtom);

  const onAppointmentAdd = (e) => {
    // index : 움직인 item의 index 값
    // e.itemData : 움직인 item의 정보
    // tasks : 리스트 아이템
    // appointments : 캘린더에 움직여진 item의 정보
    const index = tasks.indexOf(e.fromData);
    console.log(e.itemData);
    const tasksCopy = [...tasks];
    const appointmentsCopy = [...appointments];
    if (index >= 0) {
      tasksCopy.splice(index, 0);
      appointmentsCopy.push(e.itemData);
      setAppointments([...appointmentsCopy]);
      setTasks([...tasksCopy]);
    }
  };

  const onListDragStart = (e) => {
    e.cancel = true;
  };

  const onAppointmentFormOpening = (e) => {
    e.cancel = true;
  };

  return (
    <React.Fragment>
      <ScrollView id="scroll">
        <Draggable id="list" data="dropArea" group={draggingGroupName} onDragStart={onListDragStart}>
          {tasks.map((task) => (
            <ListItem task={task} key={task.text} />
          ))}
        </Draggable>
      </ScrollView>
      <Scheduler
        timeZone="Asia/Seoul"
        id="scheduler"
        dataSource={appointments}
        views={views}
        defaultCurrentDate={currentDate}
        height={600}
        startDayHour={8}
        onAppointmentFormOpening={onAppointmentFormOpening}
      >
        <AppointmentDragging group={draggingGroupName} onAdd={onAppointmentAdd} />
      </Scheduler>
    </React.Fragment>
  );
}

export default Calendar;
