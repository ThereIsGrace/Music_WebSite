import styled from "styled-components";
import { FiDelete } from "react-icons/fi";
import { Image } from "@/components";
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa6";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import { useEffect, useState } from "react";
import { ImageModal } from "./ImageModal";
import { ReviewFirstModal } from "@/components/Modal/ReviewFirstModal";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalChangeAtom, productUserAtom, reviewListMoreAtom } from "./productDetailAtoms";
import axios from "axios";
import { SERVER_URL } from "@/constants";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Cookies } from "react-cookie";
import axiosInstance from "@/axios_interceptor/axios_interceptor";
import { LoginModal } from "@/components/Modal/LoginModal";

export const ImageModal2 = ({setModalOpen, review, setImageModalOpen, setReview, disable, getReviewListMain, setReviewListMain}) => {
    const [number, setNumber] = useState(0);
    const [reviewFirstModalOpen, setReviewFirstModalOpen] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [user, setUser] = useRecoilState(productUserAtom);
    const [reviewNumber, setReviewNumber] = useState(review.heartList.length);
    console.log(review, 'imageModal2');
    const [modalChange, setModalChange] = useRecoilState(modalChangeAtom);
    const [newReview, setNewReview] = useState({});
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    useEffect(()=>{setReviewNumber(review.heartList.length)},[review]);
    const cookies = new Cookies();
    const loginStatus = cookies.get('ILOGIN') === 'Y';

    const getNewReview = () => {
        if (loginStatus){
            axiosInstance.get(SERVER_URL + 'review/reviewModal/' + review.r_id + `?userId=${user.id}`)
            .then(res => {setNewReview(res.data); setReviewNumber(res.data.heartList.length); res.data.userChecked === 0 ? setClicked(false) : setClicked(true)})
            .catch(err => console.log(err))
        }else {
            axiosInstance.get(SERVER_URL + 'review/reviewModal/' + review.r_id)
            .then(res => {setNewReview(res.data); setReviewNumber(res.data.heartList.length); res.data.userChecked === 0 ? setClicked(false) : setClicked(true)})
            .catch(err => console.log(err))
        }
    }



    useEffect(()=>{getNewReview()},[]);

    useEffect(()=>{},[clicked]);
    
    const makeBasicClick = () => {
        const cookies = new Cookies();
        if (cookies.get('ILOGIN') === 'Y'){
            if (review.userChecked !== 0){
                setClicked(true);
            }
        }
        enableScroll();
    }

    const addClick = () => {
        if (loginStatus){
            if (clicked){
                setClicked(false);
                setReviewNumber(prev => prev - 1);
                axiosInstance.get(SERVER_URL + 'heart/delete/' + review.r_id)
                .then(res => console.log('성공'))
                .catch(err => console.error(err))
                setModalChange(prev => prev + 1)
                enableScroll();
            }else {
                setClicked(true);
                setReviewNumber(prev => prev + 1);
                axiosInstance.get(SERVER_URL + 'heart/add/' + review.r_id)
                .then(res => console.log('성공'))
                .catch(err => console.error(err));
                setModalChange(prev => prev + 1);
                enableScroll();
            }
        }else {
            setLoginModalOpen(true);
        }
        enableScroll();
    }

    useEffect(()=>{
        makeBasicClick();
    },[])
    useEffect(()=>{},[clicked]);
    useEffect(()=>{},[reviewFirstModalOpen]);
    useEffect(()=>{},[review, reviewNumber]);
    useEffect(()=>{
        console.log(review, 'review 확인하기');
    },[])

    useEffect(()=>{},[loginModalOpen]);

    const ModalDelete = () => {
        setModalOpen(false);
        scrollAgain();
        enableScroll();
    }

    const changeToImageModal = () => {
        setModalOpen(false);
        scrollAgain();
        enableScroll();
        setImageModalOpen(true);
    }

    const clickNumber = (e) => {
        setNumber(e.target.id);
        enableScroll();
    }

    var keys = {37: 1, 38: 1, 39: 1, 40: 1};
 
    function preventDefault(e) {
      e.preventDefault();
    }
   
    function preventDefaultForScrollKeys(e) {
      if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
      }
    }
    const scrollAgain = () => {
      document.body.style.overflow = "unset";
    }
  // modern Chrome requires { passive: false } when adding event
  var supportsPassive = false;
  try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
      get: function () { supportsPassive = true; }
    }));
  } catch(e) {}
   
  var wheelOpt = supportsPassive ? { passive: false } : false;
  var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
    function disableScroll() {
      window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
      window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
      window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
      window.addEventListener('keydown', preventDefaultForScrollKeys, false);
      document.body.style.overflow = "hidden";
    }

    function enableScroll() {
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
        window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
        window.removeEventListener('touchmove', preventDefault, wheelOpt);
        window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
    }



    useEffect(() =>{}, [number]);

    return(
        <>
            <Container>
                <div className="background-dark"></div>
                <div tabindex="0" className="tab-zero"></div>
                <div className="modal-container">
                    <div className="modal-root">
                        <div className="modal-background">
                            <header className="modal-header">
                                <span className="header-title">사진 후기</span>
                                <button className="delete-button" onClick={ModalDelete}><FiDelete></FiDelete></button>
                            </header>
                            <div className="modal-content">
                                <div className="content-box">
                                    <div className='all-images'>
                                        <div className="image-section">
                                            <Image src={review.reviewImagesList[number].url} style={{cursor: 'pointer'}}></Image>
                                        </div>
                                        <div className='sub-image-section'>
                                            
                                            {review.reviewImagesList.map((image,i) => 
                                                <>
                                                    <div className='box-position'>
                                                        <Image src={image.url} key={i} id={i} onClick={clickNumber} style={{cursor: 'pointer', borderRadius: '10px'}}></Image>
                                                        <div className='gray-box' style={{display: i == number ? 'block' : 'none'}}>
                                                            <div style={{position: 'relative', top: '35%', color: 'white', fontWeight: 'bold'}}>V</div>
                                                        </div>
                                                    </div> 
                                                </>
                                            )}
                                            
                                        </div>

                                    </div>

                                    <div className="text-section">
                                        <div className="review-title">
                                            <span className="review-username">{review.user.username}</span>
                                        </div>
                                        <div className="product-position-section">
                                            <div className="product-name-section">
                                                <span className="product-name">상품 이름</span>
                                            </div>
                                            <div className="product-text-description">
                                                <p className="text-review">
                                                    <div dangerouslySetInnerHTML={{__html: review.content}}></div>
                                                </p>
                                            </div>
                                            <footer className="bottom-footer">
                                                <span className="date">{review.regidate}</span>
                                                <button className="help-button">
                                                    <span className="thumb-image">
                                                    {
                                                        clicked? <FaThumbsUp id={newReview.r_id} onClick={addClick} ></FaThumbsUp> :<FaRegThumbsUp id={newReview.r_id} onClick={addClick}/>
                                                    }
                                                    </span>
                                                    <span>도움돼요</span>
                                                    <span>{reviewNumber}</span>
                                                </button>
                                            </footer>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="button-section">
                                <button className="button-custom" onClick={changeToImageModal}>사진 목록 보기</button>
                            </div>
                        </div>

                    </div>
                </div>
                {reviewFirstModalOpen && <ReviewFirstModal setModalOpen={setReviewFirstModalOpen} />}
                {loginModalOpen && <LoginModal setModalOpen={setLoginModalOpen}></LoginModal>}
            </Container>
        </>
    )
}

const Container = styled.div`
    position: fixed;
    z-index: 1300;
    inset: 0px;

    & .background-dark {
        opacity: 1;
        transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        position: fixed;
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
        inset: 0px;
        background-color: rgba(0,0,0,0.3);
        -webkit-tap-highlight-color: transparent;
        z-index: -1;
    }

    & .tab-zero {
        box-sizing: border-box;
        margin: 0;
    }

    & .box-position {
        position: relative;
        display: flex;


        & img {
            margin-right: 10px;
        }
    }

    & .modal-container {
        opacity: 1;
        transition: opacity 225ms cubic-bezier(0.4,0,0.2,1) 0ms;
        height: 100%;
        outline: 0px;
        display: flex;
        -webkit-box-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        align-items: center;
    }

    & .modal-root {
        box-shadow: none;
        display: flex;
        overflow: hidden;
        flex-direction: column;
        max-width: none;
        width: 954px;
        background: transparent;
        color: rgba(0,0,0,0.87);
        transition: box-shadow 300ms cubic-bezier(0.4,0,0.2,1) 0ms;
        border-radius: 4px;
        margin: 32px;
        position: relative;
    }

    & .modal-background {
        width: 800px;
        margin: 0px auto;
        background-color: rgb(255, 255, 255);
        border-radius: 12px;
    }

    & .modal-header {
        display: flex;
        -webkit-box-pack: justify;
        justify-content: space-between;
        -webkit-box-align: center;
        align-items: center;
        padding-bottom: 8px;
        margin: 29px 30px 20px;
        border-bottom: 1px solid rgb(244, 244, 244);
        letter-spacing: -1px;
        vertical-align: middle;
    }

    & .header-title {
        display: inline;
        padding: 0px;
        font-weight: 500;
        font-size: 24px;
        line-height: 30px;
        letter-spacing: -0.5px;
        color: rgb(51, 51, 51);
        vertical-align: baseline;
    }

    & .gray-box {
        position: absolute;
        top: 0;
        left: 0;
        width: 50px;
        height: 50px;
        background-color: rgba(85,85,85,0.5);
        border-radius: 10px;
        text-align: center;
        display: flex;
        align-items: center;

    }

    & .delete-button {
        display: inline-block;
        width: 32px;
        height: 32px;
        margin-top: 1px;
    }

    & .modal-content {
        flex: 1 1 auto;
        padding: 0px 30px 30px;
        overflow: hidden;
    }

    & .content-box {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr auto;
        gap: 20px;
    }

    & .image-section {
        display: flex;
        flex-direction: column;
        gap: 10px;

        & img {
            width: 300px;
            height: 300px;
            border-radius: 10px;
            margin: 0;
            padding: 0;
        }
    }

    & .sub-image-section {
        width: 300px;
        height: 60px;
        margin-top: 10px;
        display: flex;
        gap: 10px;
        
        & img {
            width: 50px;
            height: 50px;
            margin: 0;
            padding: 0;
            object-fit: cover;
        }

    }




    & .all-images {
        display: flex;
        flex-direction: column;
    }

    & .text-section {
        width: 343px;
        overflow: hidden;
    }

    & .button-custom {
        display: flex;
        -webkit-box-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        align-items: center;
        width: 168px;
        height: 56px;
        margin: 0px auto;
        border: 1px solid rgb(211, 211, 211);
        border-radius: 3px;
        font-weight: 500;
        font-size: 16px;
        line-height: 20px;
        color: rgb(51, 51, 51);
        margin-bottom: 10px;
    }

    & .review-title {
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        margin-bottom: 11px;
    }

    & .review-username {
        margin-top: 2px;
        font-weight: 500;
    }

    & .product-position-section {
        position: relative;
    }

    & .product-name-section {
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        gap: 3px;
    }

    & .product-name {
        padding-top: 2px;
        font-weight: 400;
        font-size: 12px;
        line-height: 16px;
        color: rgb(153, 153, 153);
        display: -webkit-box;
        overflow: hidden;
        word-break: break-all;
        white-space: normal;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }

    & .product-text-description {
        max-height: 343px;
        margin-top: 10px;
        overflow: hidden scroll;
    }

    & .product-text-description {
        max-height: 343px;
        margin-top: 10px;
        overflow: hidden auto;
    }

    & .text-review {
        word-break: break-word;
        white-space: pre-wrap;
        font-weight: 400;
        font-size: 14px;
        line-height: 19px;
        color: rgb(51, 51, 51);
    }

    & .bottom-footer {
        display: flex;
        -webkit-box-pack: justify;
        justify-content: space-between;
        -webkit-box-align: center;
        align-items: center;
        width: 100%;
        padding-top: 14px;
    }

    & .date {
        font-size: 12px;
        line-height: 16px;
        color: rgb(153, 153, 153);
    }

    & .help-button {
        display: flex;
        -webkit-box-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        align-items: center;
        min-width: 88px;
        height: 32px;
        padding: 0px 13px 0px 11px;
        border: 1px solid rgb(226, 226, 226);
        border-radius: 20px;
        font-size: 12px;
        line-height: 20px;
        color: rgb(153, 153, 153);
    }

    & .fa-reg-thumbs-up {
        margin-right: 4px;
    }

    & .prev-button {
        position: absolute;
        top: 0px;
        left: 0px;
        bottom: 0px;
        background-color: transparent;
    }

    & button {
        overflow: visible;
        border: none;
    }

    & .next-button {
        position: absolute;
        top: 0px;
        right: 0px;
        bottom: 0px;
        background-color: transparent;
    } 

    & .prev-image {
        width: 22px;
        height: 43px;
    }
`;