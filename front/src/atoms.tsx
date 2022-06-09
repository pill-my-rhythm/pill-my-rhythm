import { atom, selector } from "recoil";

export const listState = atom({
  key: "list",
  default: ["a", "b", "c", "d", "e", "f"],
});
