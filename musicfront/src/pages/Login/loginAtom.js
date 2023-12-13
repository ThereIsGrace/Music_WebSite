import { atom } from "recoil";

export const authorizationAtom = atom({
    key: "authorizationAtom",
    default: ""
  });

export const loggedInAtom = atom({
  key: "loggedInAtom",
  default: false
});


