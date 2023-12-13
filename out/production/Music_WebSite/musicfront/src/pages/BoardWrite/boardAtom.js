import { atom } from "recoil";

export const postContentAtom = atom({
    key: "postContentAtom",
    default: "",
  });


export const titleAtom = atom({
  key: "titleAtom",
  default: ""
});

export const boardUpdateAtom = atom({
  key: "boardUpdateAtom",
  default: ""
});