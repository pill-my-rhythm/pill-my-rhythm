import { atom, selector } from "recoil";
import { Appintments } from "./routes/Schedule/Calendar";

export const tasksAtom = atom({
  key: "task",
  default: [
    {
      text: "1",
    },
    {
      text: "2",
    },
    {
      text: "3",
    },
    {
      text: "4",
    },
    {
      text: "5",
    },
  ],
});

export const appointmentsAtom = atom<Appintments[]>({
  key: "appointment",
  default: [],
});
