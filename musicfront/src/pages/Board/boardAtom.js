import {atom} from "recoil";

export const boardAtom = atom({
  key: "boardAtom",
  default: [],
});

export const pageAtom = atom({
  key: "pageAtom",
  default: 0,
});
