
import styled from 'styled-components';
import test from "@/assets/Logo/kakao-login.png"
import { Image } from '@/components';
import { FiDelete } from "react-icons/fi";
import { useCallback, useEffect, useRef, useState } from 'react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { SERVER_URL } from '@/constants';
import Modal from "@mui/material/Modal";
import { useRecoilState } from 'recoil';
import { productUserAtom, reviewListMoreAtom } from './productDetailAtoms';
import { Cookies } from 'react-cookie';
export function ImageModal({setImageModalOpen, setModalOpen, setReview}) {
  const [reviewListMore, setReviewListMore] = useRecoilState(reviewListMoreAtom);
  const [user, setUser] = useRecoilState(productUserAtom);
  const cookies = new Cookies();
  const loginStatus = cookies.get('ILOGIN') === 'Y';

  const getReviewListMore = async ({pageParam}) => {
    const location = window.location;
    const str = location.pathname;
    const numbering = str.replace('/productDetail/', '');
    let result;
    if (loginStatus){
      result = await axios.get(SERVER_URL + 'reviewlist/more/' + numbering + `?page=` + pageParam + `&userId=${user.id}`)
    }else {
      result = await axios.get(SERVER_URL + 'reviewlist/more/' + numbering + `?page=` + pageParam)
    }
    
    setReviewListMore(prev => [...prev, ...result.data.content]);
    
    return {
    pageable: result.data.pageable,
    isLast: result.data.last
    };
  }
  const observerElem = useRef(null);
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['projects'],
    queryFn: getReviewListMore,
    initialPageParam: 0,
    getNextPageParam: (last) => {
      
      if(last.isLast) return undefined;
      return last.pageable.pageNumber + 1;
    },
  })


  const handleObserver = useCallback(
    (entries) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage]
  );

  useEffect(() => {
    const element = observerElem.current;

    let options = {
      root: null,
      rootMargin: "0px",
      threshold: 1,
    };

    const observer = new IntersectionObserver(handleObserver, options);
    if (element) observer.observe(element);
    return () => {
      if (element) observer.unobserve(element);
    };
  }, [fetchNextPage, hasNextPage, handleObserver]);
 
  const modalConfirm = () => {
    setImageModalOpen(false);
    scrollAgain();
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

  const changeToImageModal2 = () => {
    enableScroll();
    setImageModalOpen(false);
    setModalOpen(true);
    scrollAgain();
    
    
  }

  return (
    <>
      <Container>
      <div className="modal-root">
          <div className="back-root"></div>
          <div tabindex="0" className="boxsizing"></div>
          <div className="modal-container">
            <div className="modal-box">
              <div className="modal-box-line">
                <header className="modal-header">
                  <span className="modal-title">사진 후기 전체보기</span>
                  <button className="modal-button" onClick={modalConfirm}><FiDelete></FiDelete></button>
                </header>
                <div className="modal-content">
                  <div className="content-box">
                    
                    <div className="grid-box">
                      {
                        reviewListMore.map((review, index) => 
                          <>
                            <div className='images'>
                              <Image src={review.reviewImagesList[0].url} onClick={()=> {setReview(review); changeToImageModal2()}}/>
                              <div className='square-box'>
                                <span>
                                {review.reviewImagesList.length}
                                </span>
                              </div>
                            </div>
                          </>
                        )
                      }
                      <div ref={observerElem}></div>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      <div className="real"></div>
    </Container>
    </>

  );
}

const Container = styled.div`
  & .modal-root {
    position: fixed;
    z-index: 1300;
    inset: 0px;
  }

  & .back-root {
    opacity: 1;
    transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    position: fixed;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    inset: 0px;
    background-color: rgba(0, 0, 0, 0.3);
    -webkit-tap-highlight-color: transparent;
    z-index: -1;
  }

  & .images {
    position: relative;
  }

  & .square-box {
    width: 20px;
    height: 20px;
    background-color: rgba(85, 85, 85, 0.5);
    position: absolute;
    top: 80%;
    left: 77%;
    z-index: 999;
    color: white;
    text-align: center;
    vertical-align: center;

    & span {
      line-height: 20px;
    }
  }

  & .boxsizing {
    box-sizing: border-box;
    margin: 0;
  }

  & .modal-container {
    opacity: 1;
    transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    height: 100%;
    outline: 0px;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
  }

  & .modal-box {
    display: flex;
    overflow: hidden;
    flex-direction: column;
    max-width: none;
    width: 954px;
    background: transparent;
    color: rgba(0, 0, 0, 0.87);
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    border-radius: 4px;
  }

  & .modal-box-line {
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

  & .modal-title {
    display: inline;
    padding: 0px;
    font-weight: 500;
    font-size: 24px;
    line-height: 30px;
    letter-spacing: -0.5px;
    color: rgb(51, 51, 51);
    vertical-align: baseline;
  }

  & .modal-button {
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
    position: relative;
  }

  & .grid-box {
    position: relative;
    display: grid;
    grid-template-columns: repeat(6, 121px);
    gap: 3px;
    max-height: 300px;
    margin-right: -10px;
    overflow: hidden auto;
  }
  



`;

