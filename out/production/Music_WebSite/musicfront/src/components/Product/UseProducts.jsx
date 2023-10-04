import {useEffect} from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import {app} from "@/firebase/app";
import {getFirestore, getDoc, doc, collection, getDocs, query, limit} from "firebase/firestore";
import {errorSelector, isLoadingSelector, productsAtom, productsExcludeIdAtom} from "@/components/_atom/aboutRendering";

export function useProducts(excludeId, limitCount = 99) {
  const [productsState, setProductsState] = useRecoilState(!excludeId ? productsAtom : productsExcludeIdAtom);
  const isLoading = useRecoilValue(isLoadingSelector);
  const error = useRecoilValue(errorSelector);

  useEffect(() => {
    const db = getFirestore(app);
    const productsRef = collection(db, "Products");

    let q = query(productsRef, limit(limitCount));

    if (excludeId) {
      // excludeId를 제외하는 로직
    }

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
  }, [setProductsState, excludeId, limitCount]);

  return {isLoading, error, productsState};
}
