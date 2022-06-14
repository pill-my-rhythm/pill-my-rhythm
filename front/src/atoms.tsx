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
