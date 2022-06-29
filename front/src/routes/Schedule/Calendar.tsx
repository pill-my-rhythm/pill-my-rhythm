import { useEffect } from "react";
import Scheduler, { AppointmentDragging, Editing } from "devextreme-react/scheduler";
import Draggable from "devextreme-react/draggable";
import ScrollView from "devextreme-react/scroll-view";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { del, get, post } from "../../Api";
import { start, end, appointmentsAtom, currentDate, dayHoursAtom, levelsAtom, supplementAtom, tasksAtom } from "../../atoms";
import styled from "styled-components";
import TaskItem from "./TaskItem";
import "devextreme/dist/css/dx.greenmist.css";
import "./Calendar.css";
import DayItem from "./DayItem";
import CheckList from "./CheckList";
import moment, { unitOfTime } from "moment";
import SupItem from "./SupItem";

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const DayWrapper = styled.div`
  height: auto;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 10%);
  padding: 10px 10px 0px 10px;
  width: 280px;
  border-radius: 10px;
  background-color: #fafafa;
  color: black;
`;

const ListWrapper = styled(DayWrapper)`
  transform: translate(-50%, 80%);
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

export interface Appointments {
  endDate: Date;
  startDate: Date;
  text: string;
  id: number;
}

export interface Supplements {
  Supplement: { name: string };
  createdAt: string;
  deletedAt: null;
  fk_supplement_id: number;
  fk_user_id: string;
  pk_plan_id: number;
  type: string;
  updatedAt: string;
}

export interface Levels {
  date: string;
  level: string;
}

const views: Array<Object> = [{ type: "week" }];
const draggingGroupName = "appointmentsGroup";

function Calendar() {
  const tasks = useRecoilValue(tasksAtom);
  const dayHour = useRecoilValue(dayHoursAtom);
  const [appointments, setAppointments] = useRecoilState<Array<Appointments>>(appointmentsAtom);
  const [supplements, setSupplements] = useRecoilState<Array<Supplements>>(supplementAtom);
  const setLevel = useSetRecoilState<Array<Levels>>(levelsAtom);

  const onCurrentDateChange = (e: any) => {
    let start = moment(e)
      .startOf("isoweek" as unitOfTime.StartOf)
      .format();
    let end = moment(e).isoWeekday("Sunday").format();
    get(`schedule/week?start=${new Date(start)}&finish=${new Date(end)}`).then((res) => {
      setLevel(res.data.checklist);
      setAppointments(
        [...res.data.schedule].map((data) => {
          return { text: data.to_do, startDate: data.start, endDate: data.finish, id: data.pk_schedule_id };
        }),
      );
    });
  };

  useEffect(() => {
    get(`schedule/?start=${new Date(start)}&finish=${new Date(end)}`).then((res) => {
      setLevel(res.data.checklist);
      setSupplements(res.data.dailySupplement);
      setAppointments(
        [...res.data.schedule].map((data) => {
          return { text: data.to_do, startDate: data.start, endDate: data.finish, id: data.pk_schedule_id };
        }),
      );
    });
  }, [setAppointments, setLevel, setSupplements]);

  const onAppointmentAdd = async (e: any) => {
    const index = tasks.indexOf(e.fromData);
    const dayIndex = dayHour.indexOf(e.fromData);
    if (index >= 0) {
      setAppointments((currentAppointment) => [...currentAppointment, e.itemData]);
      try {
        await post("schedule/create", {
          type: "B",
          start: new Date(e.itemData.startDate),
          finish: new Date(e.itemData.endDate),
          to_do: e.itemData.text,
        });
      } catch (err) {
        console.log("스케줄 생성 오류", err);
      }
    }

    if (dayIndex >= 0) {
      setAppointments((currentAppointment) => [...currentAppointment, e.itemData]);
      try {
        await post("schedule/create", {
          type: "S",
          start: new Date(e.itemData.startDate),
          finish: new Date(e.itemData.endDate),
          to_do: e.itemData.type,
        });
      } catch (err) {
        console.log("스케줄 생성 오류", err);
      }
    }
    await get(`schedule/?start=${new Date(start)}&finish=${new Date(end)}`).then((res) => {
      setAppointments(
        [...res.data.schedule].map((data) => {
          return { text: data.to_do, startDate: data.start, endDate: data.finish, id: data.pk_schedule_id };
        }),
      );
    });
  };

  const onAppointmentDeleting = async (e: any) => {
    e.cancel = true;
    const index = appointments.findIndex((appointments) => appointments.endDate === e.appointmentData.endDate);
    const appointmentsCopy = [...appointments];
    if (index >= 0) {
      appointmentsCopy.splice(index, 1);
      await del(`schedule/delete/${e.appointmentData.id}`);
      setAppointments([...appointmentsCopy]);
    }
  };

  const onListDragStart = (e: any) => {
    e.cancel = true;
  };

  const onAppointmentFormOpening = (e: any) => {
    e.cancel = true;
  };

  const renderDateCell = (data: { text: string; date: Date }) => {
    return <CheckList data={data} />;
  };

  return (
    <>
      <Wrapper>
        <ScrollView id="scroll">
          <Draggable id="list" data="dropArea" group={draggingGroupName} onDragStart={onListDragStart}>
            <ListTitle>Feed</ListTitle>
            <ListWrapper>
              {tasks.map((task) => (
                <TaskItem task={task} key={task.text} />
              ))}
            </ListWrapper>
            {dayHour.map((task) => (
              <DayItem task={task} key={task.text} />
            ))}
            <DayWrapper>
              {supplements.map((data: Supplements) => (
                <SupItem data={data} key={data.pk_plan_id} />
              ))}
            </DayWrapper>
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
          startDayHour={6}
          onAppointmentFormOpening={onAppointmentFormOpening}
          onAppointmentDeleting={onAppointmentDeleting}
          showAllDayPanel={false}
          dateCellRender={renderDateCell}
          firstDayOfWeek={1}
          onCurrentDateChange={onCurrentDateChange}
        >
          <Editing allowResizing={false} />
          <AppointmentDragging group={draggingGroupName} onAdd={onAppointmentAdd} />
        </Scheduler>
      </ScheduleWrapper>
    </>
  );
}

export default Calendar;
