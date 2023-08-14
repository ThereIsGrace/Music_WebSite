import {atom} from "recoil";

export const recordAtom = atom({
  key: "recordAtom",
  default: {},
});

export const boardIdAtom = atom({
  key: "boardIdAtom",
  default: "",
});
