import {useEffect, useState} from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import {app} from "@/firebase/app";
import {getFirestore, getDoc, doc, collection, getDocs, query, limit} from "firebase/firestore";
import {errorSelector, isLoadingSelector, productsAtom, productsExcludeIdAtom} from "@/components/_atom/aboutRendering";
import axios from "axios";

export function useProducts(excludeId, limitCount = 99) {
  const [productsState, setProductsState] = useRecoilState(!excludeId ? productsAtom : productsExcludeIdAtom);
  const isLoading = useRecoilValue(isLoadingSelector);
  const error = useRecoilValue(errorSelector);
  const [data, setdata] = useState('')
  const [customData, setCustomData] = useState('')
  useEffect(() => {
      axios.get('/api/goods/list')
          .then(response => {console.log(response.data); setProductsState(response.data); console.log('???Dfsdfsdfjkl'+productsState)})
          .catch(error => console.log(error));
  }, []);

  return {isLoading, error, productsState};
}
