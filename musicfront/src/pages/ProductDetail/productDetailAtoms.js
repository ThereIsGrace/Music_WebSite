import {atom} from "recoil";

export const productIdAtom = atom({
    key: "productIdAtom",
    default: 0
});

export const productAtom = atom({
    key: "productAtom",
    default: {}
});

export const productPageNumAtom = atom({
    key: "productPageNumAtom",
    default: 0
});

export const productTotalItemCountAtom = atom({
    key: "productTotalItemsCountAtom",
    default: 0
});

export const reviewListMoreAtom = atom({
    key: "reviewListMoreAtom",
    default: []
});

export const reviewListMainAtom = atom({
    key: "reviewListMainAtom",
    default: []
});

export const productUserAtom = atom({
    key: "productUserAtom",
    default: {}
});

export const thumbAtom = atom({
    key: "thumbAtom",
    default: [0, 0, 0, 0, 0]
});

export const checkItemsAtom = atom({
    key: "checkItemsAtom",
    default: []
});

export const modalChangeAtom = atom({
    key: "modalChangeAtom",
    default: 0
});
