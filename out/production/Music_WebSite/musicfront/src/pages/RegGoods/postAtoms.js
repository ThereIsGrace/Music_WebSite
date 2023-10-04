import {atom} from "recoil";

/* 이미지 */
export const imagesAtom = atom({
  key: "imagesAtom",
  default: [],
});

/* 이미지 리스트 */
export const imageListAtom = atom({
  key: "imageListAtom",
  default: [],
});

/* 상품명 */
export const pnameAtom = atom({
  key: "pnameAtom",
  default: ""
});

/* 가격 */
export const priceAtom = atom({
  key: "priceAtom",
  default: ""
});

/* 수량 */
export const quantityAtom = atom({
  key: "quantityAtom",
  default: ""
});

/* 제목 */
export const postTitleAtom = atom({
  key: "postTitleAtom",
  default: "",
});

/* 우편 */
export const addressAtom = atom({
  key: "addressAtom",
  default: "",
});

/* 팝업 */
export const postcodePopupAtom = atom({
  key: "postcodePopupAtom",
  default: null,
});

/* 내용 */
export const postContentAtom = atom({
  key: "postContentAtom",
  default: "",
});
