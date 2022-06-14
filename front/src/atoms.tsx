import { atom, selector } from "recoil";

interface IToDoState {
  [key: string]: string[];
}

export const listState = atom<IToDoState>({
  key: "list",
  default: {
    calendar: ["16"],
    to_do: ["a", "b", "c", "d", "e", "f"],
  },
});

export const tasksAtom = atom({
  key: "tasks",
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

export const appointmentsAtom = atom<Object[]>({
  key: "appointments",
  default: [],
});
