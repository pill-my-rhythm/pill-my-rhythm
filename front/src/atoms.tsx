import moment, { unitOfTime } from "moment";
import { atom, selector } from "recoil";
import { Appointments, Levels, Supplements } from "./routes/Schedule/Calendar";
import { get } from "./Api";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const currentDate = new Date(moment().format());
export let start = moment()
  .startOf("isoweek" as unitOfTime.StartOf)
  .format();
export let end = moment().isoWeekday("Sunday").format();

export const supplementAtom = atom<Supplements[]>({
  key: "supplements",
  default: [],
});

export const tasksAtom = atom({
  key: "task",
  default: [
    {
      text: "매일 같은 시간에 기상하기",
      type: "B",
    },
    {
      text: "낮에 하루 한 번 이상 산책하기",
      type: "B",
    },
    {
      text: "규칙적인 식사하기",
      type: "B",
    },
    {
      text: "틈틈이 운동하기",
      type: "B",
    },
    {
      text: "매일 같은 시간에 취침하기",
      type: "B",
    },
  ],
});

export const checkListAtom = atom({
  key: "checkList",
  default: [
    {
      text: "매일 같은 시간에 기상하기",
    },
    {
      text: "낮에 하루 한 번 이상 산책하기",
    },
    {
      text: "규칙적인 식사하기",
    },
    {
      text: "틈틈이 운동하기",
    },
    {
      text: "매일 같은 시간에 취침하기",
    },
    {
      text: "스케쥴러에 등록한 영양제 챙겨먹기",
    },
  ],
});

export const dayHoursAtom = atom({
  key: "dayHour",
  default: [
    {
      text: "아침",
      type: "B",
    },
    {
      text: "점심",
      type: "L",
    },
    {
      text: "저녁",
      type: "D",
    },
  ],
});

export const appointmentsAtom = atom<Appointments[]>({
  key: "appointment",
  default: [],
});

export const levelsAtom = atom<Levels[]>({
  key: "level",
  default: [],
});

export const LoginState = atom<boolean>({
  key: "LoginState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const CurrentuserState = atom({
  key: "user",
  default: selector({
    key: "user/get",
    get: async () => {
      const token = sessionStorage.getItem("userToken");
      if (!token) return null;

      try {
        const res = await get("user/current");
        const currentUser = res.data;
        return currentUser;
      } catch (error: any) {
        sessionStorage.removeItem("userToken");
        console.error(`in User Recoil: ${error.message}`);
        return null;
      }
    },
  }),
  effects_UNSTABLE: [persistAtom],
});
