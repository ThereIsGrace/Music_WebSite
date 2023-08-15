import {atom, selector} from "recoil";

export const showLoadingAtom = atom({
  key: "showLoadingPopularRaccoon",
  default: true,
});

export const productsAtom = atom({
  key: "products",
  default: [],
});

export const productsExcludeIdAtom = atom({
  key: "productsExcludeId",
  default: [],
});

export const isLoadingSelector = selector({
  key: "productsIsLoading",
  get: ({get}) => {
    const stores = get(productsAtom);
    return stores.length === 0;
  },
});

export const errorSelector = selector({
  key: "productsError",
  get: ({get}) => {
    const stores = get(productsAtom);
    if (stores.length === 0) {
      return "Error fetching stores";
    } else {
      return null;
    }
  },
});

export const popularSongsAtom = atom({
  key: "popularSongs",
  default: [],
});

export const popularSongsExcludeIdAtom = atom({
  key: "popularSongsExcludeId",
  default: [],
});
