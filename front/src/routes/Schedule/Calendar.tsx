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
import Subscribe from "./Subscribe";

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
      } catch (error: any) {
        if (error.response.data.message) {
          alert(error.response.data.message);
        }
      }

      try {
        await get(`schedule/?start=${new Date(start)}&finish=${new Date(end)}`).then((res) => {
          setAppointments(
            [...res.data.dailySupplement, ...res.data.schedule].map((data) => {
              return { text: data.to_do, startDate: data.start, endDate: data.finish, id: data.pk_schedule_id };
            }),
          );
        });
      } catch (error) {
        console.log(error);
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
      } catch (error: any) {
        if (error.response.data.message) {
          alert(error.response.data.message);
        }
      }

      try {
        await get(`schedule/?start=${new Date(start)}&finish=${new Date(end)}`).then((res) => {
          setAppointments(
            [...res.data.dailySupplement, ...res.data.schedule].map((data) => {
              return { text: data.to_do, startDate: data.start, endDate: data.finish, id: data.pk_schedule_id };
            }),
          );
        });
      } catch (error) {
        console.log(error);
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
    <div className="overflow-hidden">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="hidden lg:block fixed z-20 inset-0 top-[3.8125rem] left-[max(0px,calc(50%-45rem))] right-auto w-[19.5rem] pb-10 px-8 overflow-y-auto">
          <Subscribe />
          <nav className="lg:text-sm lg:leading-6 relative top-[3.8125rem]">
            <ScrollView id="scroll">
              <Draggable id="list" data="dropArea" group={draggingGroupName} onDragStart={onListDragStart}>
                <ul>
                  {dayHour.map((task) => (
                    <DayItem task={task} key={task.text} />
                  ))}
                  <li className="mt-12 lg:mt-8">
                    <h5 className="mb-8 lg:mb-3 font-semibold text-slate-900 dark:text-slate-200">생채리듬 Todo</h5>
                    <ul className="space-y-6 lg:space-y-2 border-l border-slate-100 dark:border-slate-800">
                      {tasks.map((task) => (
                        <TaskItem task={task} key={task.text} />
                      ))}
                    </ul>
                  </li>
                </ul>
                {/* {tasks.map((task) => (
                  <TaskItem task={task} key={task.text} />
                ))}

                {supplements.map((data: Supplements) => (
                  <SupItem data={data} key={data.pk_plan_id} />
                ))} */}
              </Draggable>
            </ScrollView>
          </nav>
        </div>
        <div className="lg:pl-[19.5rem]">
          <main className="max-w-3xl mx-auto relative z-20 pt-10 xl:max-w-none">
            <header id="header" className="mb-10 md:flex md:items-start">
              <div className="flex-auto max-w-4xl">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200">Scheduler</h1>
                <p className="mt-4 text-base text-slate-700 dark:text-slate-400">PMR 스케쥴러로 영양제 일정관리를 간편하게 시작해보세요.</p>
              </div>
            </header>
            <section className="mb-16 relative">
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
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
