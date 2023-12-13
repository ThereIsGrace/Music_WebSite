import {atom} from "recoil";

export const boardAtom = atom({
  key: "boardAtom",
  default: [],
});

export const pageNumAtom = atom({
  key: "pageNumAtom",
  default: 1,
});

export const totalItemCountAtom = atom({
  key: "totalItemCountAtom",
  default: 0,
});
