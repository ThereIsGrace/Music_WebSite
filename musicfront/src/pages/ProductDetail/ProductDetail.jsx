import {Header, Footer, StoreButton} from "@/components"; // UpBotton
import {useParams} from "react-router-dom";
import {UseProductDetail} from "@/pages/ProductDetail";
import {Helmet} from "react-helmet-async";
import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "@/constants";
import { useRecoilState } from "recoil";
import { checkItemsAtom, modalChangeAtom, productAtom, productIdAtom, productPageNumAtom, productTotalItemCountAtom, productUserAtom, thumbAtom, userAtom } from "./productDetailAtoms";
import axiosInstance from "@/axios_interceptor/axios_interceptor";
import { Cookies } from "react-cookie";



export function ProductDetail() {
  const {id} = useParams();
  const [product, setProduct] = useState({});
  const [attention, setAttention] = useState(false);
  const [changed, setChanged] = useState(id);
  const [user, setUser] = useRecoilState(productUserAtom);
  const [reviewListEight, setReviewListEight] = useState([]);
  const [reviewListMain, setReviewListMain] = useState([]);
  const [pageNum, setPageNum] = useRecoilState(productPageNumAtom);
  const [totalItemCount, setTotalItemCount] = useRecoilState(productTotalItemCountAtom);
  const [pname, setPname] = useState('');
  const [userThumbs, setUserThumbs] = useRecoilState(thumbAtom);
  const [userCheck, setUserCheck] = useRecoilState(checkItemsAtom);
  const [clicked, setClicked] = useState([]);
  const [modalChange, setModalChange] = useRecoilState(modalChangeAtom);
  const location = window.location;
  const str = location.pathname;
  const numbering = str.replace("/productDetail/", "");
  const cookies = new Cookies();
  const loginStatus = cookies.get('ILOGIN') === 'Y';
  useEffect(()=>{
    setModalChange(0);
  },[]);

  const makeThumbs = (list) => {
      let mainReviewLength = list.length;
      let newThumbs = [];
      for (var i = 0; i < mainReviewLength; i++){
          newThumbs.push(list[i].heartList.length);
      }
      setUserThumbs(newThumbs);
  }

  const basicClick = (list) => {
    let mainReviewLength = list.length;
    let newThumbs = [];
    for (var i = 0; i < mainReviewLength; i++){
      if (list[i].userChecked !== 0){
        newThumbs.push(list[i].r_id);
      }  
    }
    setClicked(newThumbs);
  }

  function attentionProductList(object) {
    let attentionList = JSON.parse(localStorage.getItem('atlist'));
    if(attentionList){
      let newAttentionList = attentionList.filter(attention => attention.goodsNo !== object.goodsNo);
      if (object){
        newAttentionList.push(object);
        localStorage.setItem('atlist', JSON.stringify(newAttentionList));
      }
    }else{
      attentionList = [];
      if (Object.keys(product).length !== 0){
        attentionList.push(product);
        localStorage.setItem('atlist', JSON.stringify(attentionList));
      }
    }
  }

  const getUser = () => {
    const cookies = new Cookies();
    if (cookies.get('ILOGIN') === 'Y'){
      axiosInstance.get(SERVER_URL + 'user/userInfo')
      .then(response => { setUser(response.data.data); getReviewListMain(response.data.data.id); getReviewListEight(response.data.data.id)})
      .catch(err => console.error(err))
    }
  }

  
  const getProductDetail = () => {
    axios.get(SERVER_URL + 'product/detail/' + numbering)
    .then(response => { setProduct(response.data); setPname(response.data.pname)})
    .catch();
  }

  const getReviewListEight = (userId) => {
    if (loginStatus){
      axios.get(SERVER_URL + 'reviewlist/eight/' + numbering + `?userId=${userId}`)
      .then(response => { setReviewListEight(response.data);})
      .catch(err => console.log(err));

    }else {
      axios.get(SERVER_URL + 'reviewlist/eight/' + numbering)
      .then(response => { setReviewListEight(response.data);})
      .catch(err => console.log(err));
    }
  }

  const getReviewListMain = (userId) => {
    if (loginStatus){
      axios.get(SERVER_URL + 'reviewlist/main/' + numbering + `?page=${pageNum}&userId=${userId}`)
      .then(response => { setReviewListMain(response.data.content); setTotalItemCount(response.data.totalElements); makeThumbs(response.data.content); basicClick(response.data.content)})
      .catch(err => console.log(err))

    }else {
      axios.get(SERVER_URL + 'reviewlist/main/' + numbering + `?page=${pageNum}`)
      .then(response => { setReviewListMain(response.data.content); setTotalItemCount(response.data.totalElements); makeThumbs(response.data.content); basicClick(response.data.content)})
      .catch(err => console.log(err))
    }

  }



  useEffect(()=>{
    if (loginStatus){
      getUser();
      getProductDetail();
      getReviewListEight();
    }else {
      getProductDetail();
      getReviewListEight();
      getReviewListMain();
    }

  },[]);

  useEffect(()=>{
    if (loginStatus){
      getUser();
      getReviewListEight();
    }else {
      getReviewListEight();
    }

  },[modalChange])

  useEffect(()=>{},[userThumbs, clicked]);

  useEffect(()=>{
    getUser();
  },[pageNum])

  
  useEffect(() => {
    if (Object.keys(product).length !== 0){
      attentionProductList(product);
      setAttention(true);
  }},[product]);

  useEffect(() => {
    
  },[user,reviewListEight, reviewListMain]);

  useEffect(()=>{
    console.log(id, 'params');
    if (id !== changed){
      window.location.reload();
    }
  },[id]);

  useEffect(()=>{
    
  },[pageNum]);








  return (
    <div className="ProductDetail">
      <Helmet>
        <title>MusicCat 상품 상세페이지</title>
        <meta name="description" content="뮤직 커뮤니티 사이트" />
        <meta name="keywords" content="음악, 커뮤니티" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:site_name" content="MusicCat" />
        <meta property="og:locale" content="ko-KR" />
        <meta property="og:title" content="MusicCat 상품 상세페이지" />
        <meta property="og:url" content="" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="" />
        <meta property="og:description" content="뮤직 커뮤니티 사이트" />
      </Helmet>
      <Header />
      <UseProductDetail product={product} user={user} reviewListEight={reviewListEight}  setReviewListMain={setReviewListMain} reviewListMain={reviewListMain} pname={pname} userThumbs={userThumbs} getReviewListMain={getReviewListMain}/>
      <StoreButton attention={attention}/>
      <Footer />
    </div>
  );
}
