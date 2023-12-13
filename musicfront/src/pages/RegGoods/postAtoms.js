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

/* 메인 이미지 */
export const mainImageAtom = atom({
  key: "mainImageAtom",
  default: ""
});

/* 서브 이미지 */
export const subImageAtom = atom({
  key: "subImageAtom",
  default: ""
});

/* 메인 이미지 url */
export const mainImageUrlAtom = atom({
  key: "mainImageUrlAtom",
  default: ""
});

/* 서브 이미지 url */
export const subImageUrlAtom = atom({
  key: "subImageUrlAtom",
  default: ""
});

/* 타입 */
export const typeAtom = atom({
  key: "typeAtom",
  default: ""
});

/* 상품 설명 */
export const descriptionAtom = atom({
  key: "descriptionAtom",
  default: ""
});
