import { atom } from "recoil";

export const orderPageNumAtom = atom({
    key: "orderPageNumAtom",
    default: 0,
  });

export const orderTotalItemCountAtom = atom({
    key: "orderTotalItemCountAtom",
    default: 0,
});
