import { atom } from "recoil";

export const productListAtom = atom({
    key: "productListAtom",
    default: []
});

export const pageNumAtom2 = atom({
    key: "pageNumAtom2",
    default: 1,
  });

  export const totalItemCountAtom = atom({
    key: "totalItemCountAtom",
    default: 0,
  });

  export const largeAtom = atom({
    key: "largeAtom",
    default: "",
  });

  export const priceAtom = atom({
    key: "priceAtom",
    default: "",
  });

  export const standardAtom = atom({
    key: "standardAtom",
    default: "",
  });

  export const filterTypeAtom = atom({
    key: "filterTypeAtom",
    default: '전체',
  });

  export const filterHasTypeAtom = atom({
    key: "filterHasTypeAtom",
    default: false,
  });

  export const filterPriceAtom = atom({
    key: "filterPriceAtom",
    default: '전체',
  });

  export const filterCriteriaAtom = atom({
    key: "filterCriteriaAtom",
    default: '신상품순',
  });

  export const reloadCriteriaAtom = atom({
    key: "relodCriteriaAtom",
    default: '',
  });
