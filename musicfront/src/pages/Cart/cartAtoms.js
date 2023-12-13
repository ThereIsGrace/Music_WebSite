import { atom } from "recoil";

export const cartPageNumAtom = atom({
    key: "cartPageNumAtom",
    default: 0,
  });

export const cartTotalItemCountAtom = atom({
    key: "cartTotalItemCountAtom",
    default: 0,
});

export const receiverNameAtom = atom({
    key: "receiverNameAtom",
    default: '',
})

export const receiverNameVisibleAtom = atom({
    key: "receiverNameVisibleAtom",
    default: false 
})

export const receiverMobileVisibleAtom = atom({
  key: "receiverMobileVisibleAtom",
  default: false 
})

export const receiverAddressVisibleAtom = atom({
  key: "receiverAddressVisibleAtom",
  default: false 
})
  