import { atom, selector } from "recoil";
import { Appintments } from "./routes/Schedule/Calendar";

export const tasksAtom = atom({
  key: "task",
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
      text: "스케쥴러에 등록한 영양제 챙겨먹기",
    },
    {
      text: "매일 같은 시간에 취침하기",
    },
  ],
});

export const appointmentsAtom = atom<Appintments[]>({
  key: "appointment",
  default: [],
});
