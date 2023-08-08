import {useEffect} from "react";
import {atom, selector, useRecoilState, useRecoilValue} from "recoil";
import {app} from "@/firebase/app";
import {getFirestore, getDoc, doc, collection, getDocs, query, limit} from "firebase/firestore";

const productsAtom = atom({
  key: "products",
  default: [],
});

const isLoadingSelector = selector({
  key: "productsIsLoading",
  get: ({get}) => {
    const stores = get(productsAtom);
    return stores.length === 0;
  },
});

const errorSelector = selector({
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

export function useProducts(limitCount = 99) {
  const [productsState, setProductsState] = useRecoilState(productsAtom);
  const isLoading = useRecoilValue(isLoadingSelector);
  const error = useRecoilValue(errorSelector);

  useEffect(() => {
    const db = getFirestore(app);
    const productsRef = collection(db, "Products");

    let q = query(productsRef, limit(limitCount));

    getDocs(q).then((querySnapshot) => {
      const products = [];
      const queryPromises = [];

      querySnapshot.forEach((document) => {
        const product = {id: document.id, ...document.data()};
        const userId = product.userId;
        products.push(product);
        queryPromises.push(getDoc(doc(db, `users/${userId}`)));
      });

      Promise.all(queryPromises)
        .then((userDocs) => {
          const users = [];
          userDocs.forEach((doc) => {
            users.push({id: doc.id, ...doc.data()});
          });

          return users;
        })
        .then((users) => {
          return products.map((product) => {
            return {...product, ...users.find((user) => user.userId === product.userId), id: product.id};
          });
        })
        .then((processedProducts) => {
          const shuffledProducts = processedProducts.sort(() => Math.random() - 0.5);
          setProductsState(shuffledProducts);
        });
    });
  }, [setProductsState, limitCount]);

  return {isLoading, error, productsState};
}
