import { atom } from "recoil";

export const recentPageNumAtom = atom({
    key: "recentPageNumAtom",
    default: 1,
  });

export const totalSongAtom = atom({
    key: "totalSongAtom",
    default: 0
});

export const songPageNumAtom = atom({
    key: "songPageNumAtom",
    default: 0
});

export const hoverAtom = atom({
    key: "hoverAtom",
    default: false
});
