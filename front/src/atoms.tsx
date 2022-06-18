import { atom, selector } from "recoil";
import { Appintments } from "./routes/Schedule/Calendar";

export const tasksAtom = atom({
  key: "task",
  default: [
    {
      text: "생체리듬1",
    },
    {
      text: "생체리듬2",
    },
    {
      text: "생체리듬3",
    },
    {
      text: "생체리듬4",
    },
    {
      text: "생체리듬5",
    },
  ],
});

export const appointmentsAtom = atom<Appintments[]>({
  key: "appointment",
  default: [],
});
