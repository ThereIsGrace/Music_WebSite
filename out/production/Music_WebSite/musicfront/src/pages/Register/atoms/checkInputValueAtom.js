import {atom} from "recoil";

export const emailVisibleAtom = atom({
  key: "emailVisibleAtom",
  default: false,
});

export const idVisibleAtom = atom({
  key: "idVisibleAtom",
  default: false,
});

export const passwordVisibleAtom = atom({
  key: "passwordVisibleAtom",
  default: false,
});

export const passwordConfirmVisibleAtom = atom({
  key: "passwordConfirmVisibleAtom",
  default: false,
});

export const nameVisibleAtom = atom({
  key: "nameVisibleAtom",
  default: false,
});

export const mobileVisibleAtom = atom({
  key: "mobileConfirmVisibleAtom",
  default: false,
});

export const modalAtom = atom({
  key: "modalAtom",
  default: false,
});

export const modalTextAtom = atom({
  key: "modalTextAtom",
  default: "",
});
