import React from "react";
import Scheduler, { AppointmentDragging } from "devextreme-react/scheduler";
import Draggable from "devextreme-react/draggable";
import ScrollView from "devextreme-react/scroll-view";
import { useRecoilState } from "recoil";
import { appointmentsAtom, tasksAtom } from "../../atoms";
import styled from "styled-components";
import "devextreme/dist/css/dx.light.css";

const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 7px;
  padding: 10px 10px;
  background-color: white;
`;

let now = new Date();
const currentDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
const views = [{ type: "day", intervalCount: 7 }];
const draggingGroupName = "appointmentsGroup";

function Calendar() {
  const [tasks, setTasks] = useRecoilState(tasksAtom);
  const [appointments, setAppointments] = useRecoilState(appointmentsAtom);

  const onAppointmentRemove = (e) => {
    const index = appointments.indexOf(e.itemData);
    if (index >= 0) {
      appointments.splice(index, 1);
      tasks.push(e.itemData);
      setAppointments({
        tasks: [...tasks],
        appointments: [...appointments],
      });
    }
  };

  const onAppointmentAdd = (e) => {
    const index = tasks.indexOf(e.fromData);
    console.log(e.itemData);
    const tasksCopy = [...tasks];
    const appointmentsCopy = [...appointments];
    if (index >= 0) {
      tasksCopy.splice(index, 1);
      appointmentsCopy.push(e.itemData);
      setAppointments([...appointmentsCopy]);
      setTasks([...tasksCopy]);
    }
  };
  const onListDragStart = (e) => {
    e.cancel = true;
  };
  const onItemDragStart = (e) => {
    e.itemData = e.fromData;
  };
  const onItemDragEnd = (e) => {
    if (e.toData) {
      e.cancel = true;
    }
  };

  return (
    <React.Fragment>
      <ScrollView id="scroll">
        <Draggable id="list" data="dropArea" group={draggingGroupName} onDragStart={onListDragStart}>
          {tasks.map((task) => (
            <Draggable
              key={task.text}
              className="item dx-card dx-theme-text-color dx-theme-background-color"
              clone={true}
              group={draggingGroupName}
              data={task}
              onDragStart={onItemDragStart}
              onDragEnd={onItemDragEnd}
            >
              <Card>{task.text}</Card>
            </Draggable>
          ))}
        </Draggable>
      </ScrollView>
      <Scheduler timeZone="Asia/Seoul" id="scheduler" dataSource={appointments} views={views} defaultCurrentDate={currentDate} height={600} startDayHour={8}>
        <AppointmentDragging group={draggingGroupName} onRemove={onAppointmentRemove} onAdd={onAppointmentAdd} />
      </Scheduler>
    </React.Fragment>
  );
}

export default Calendar;
