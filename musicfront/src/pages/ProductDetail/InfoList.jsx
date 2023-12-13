import { Image } from "@/components";
import styled from "styled-components";
import { FaRegThumbsUp } from "react-icons/fa6";
import { FaThumbsUp } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { ImageModal2 } from "./ImageModal2";
import { Cookies } from "react-cookie";
import { LoginModal } from "@/components/Modal/LoginModal";
import { CustomPaging } from "@/components/CustomPaging/CustomPaging";
import { checkItemsAtom, productPageNumAtom, productTotalItemCountAtom, productUserAtom, thumbAtom } from "./productDetailAtoms";
import axios from "axios";
import { SERVER_URL } from "@/constants";
import axiosInstance from "@/axios_interceptor/axios_interceptor";
import { useRecoilState, useRecoilValue } from "recoil";

export const InfoList = ({reviewList, pname, setImageModalOpen, reviewListMain, reviewListMore}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [reviews, setReviews] = useState({});
    const [loginOpen, setLoginOpen] = useState(false);
    const [infoList, setInfoList] = useState([]);
    const [infoNumber, setInfoNumber] = useState(-1);
    const user = useRecoilValue(productUserAtom);
    const [userThumbs, setUserThumbs] = useRecoilState(thumbAtom);
    const [clicked, setClicked] = useState([]);

    
    const checkInfoNumber = (index) => {
        if (infoNumber === index){
            setInfoNumber(-1);
        }else {
            setInfoNumber(index)
        }
    }

    const getInfo = () => {
        axios.get(SERVER_URL + 'product/info')
        .then(res => setInfoList(res.data))
        .catch();
    }

    const thumbsPlus = (newId) => {
        let foundOne = reviewListMain.filter((el) => el.r_id === Number(newId));
        let theOne = foundOne[0];
        for(var i =0;i < 5; i++){
            if (reviewListMain[i] === theOne){
                break;
            }
        }
        let newThumbs = [...userThumbs];
        newThumbs[i] = newThumbs[i] + 1;
        setUserThumbs(newThumbs);
    }

    const thumbsMinus = (newId) => {
        let foundOne = reviewListMain.filter((el) => el.r_id === Number(newId));
        let theOne = foundOne[0];
        for(var i =0;i < 5; i++){
            if (reviewListMain[i] === theOne){
                break;
            }
        }
        let newThumbs = [...userThumbs];
        newThumbs[i] = newThumbs[i] - 1;
        setUserThumbs(newThumbs);
    }


    const getClick = () => {
        let mainLength = reviewListMain.length;
        let newClicked = [];
        for (var i =0; i < mainLength; i++){
            if (reviewListMain[i].userChecked !== 0){
                newClicked.push(reviewListMain[i].r_id);
            }
        }
        setClicked(newClicked);
    }

    useEffect(()=>{
        getInfo();
    },[])


    useEffect(()=>{
        getClick();
    },[reviewListMain]);

    const addClick = (e) => {
        const cookies = new Cookies();
        if(!cookies.get('ILOGIN')){
            setLoginOpen(true);
        }else {
            let newId= e.currentTarget.id;
            if (clicked.includes(Number(newId))){
                let filtered = clicked.filter((element) => element !== Number(newId));
                console.log(filtered, 'filtered');
                setClicked(filtered);
                thumbsMinus(newId);
                axiosInstance.get(SERVER_URL + 'heart/delete/' + newId + '?userId=' + user.id)
                .then()
                .catch()
            }else {
                let filtered = [...clicked];
                filtered.push(Number(newId));
                setClicked(filtered);
                thumbsPlus(newId);
                axiosInstance.get(SERVER_URL + 'heart/add/' + newId + '?userId=' + user.id)
                .then()
                .catch()
            }
        }
    }

    useEffect(()=>{
    }, [reviews, clicked, loginOpen, userThumbs, infoNumber]);

    return(
        <>
            <Container>
                <div className="infos">
                    {infoList.map((info, index)=> 
                        <>
                            <div className="info">
                                <span className="info-info">공지</span>
                                <button className="info-button" onClick={e => checkInfoNumber(index)}>{info.title}</button>
                            </div>
                            <p className="info-description" style={{display: index === infoNumber ? 'block': 'none'}}>
                                <div dangerouslySetInnerHTML={{__html: info.content}}></div>
                            </p>
                        </>
                    )}
                    {reviewListMain.map((review, index) => 
                                            <div className="review-section">
                                            <div className="user-section">
                                                <div className="user">
                                                    <span class="user-username">{review.user.username}</span>
                                                </div>
                                            </div>
                                            <article>
                                                <div>
                                                    <div className="review-article">
                                                        <h3>{pname}</h3>
                                                    </div>
                                                    <div className='description' dangerouslySetInnerHTML={{__html: review.content}}></div>
                                                    <div className="image-section">
                                                        
                                                        <span className="image">
                                                            {
                                                                review.reviewImagesList.map((image,index) => 
                                                                    <>
                                                                        <Image src={image.url} style={{cursor: 'pointer', marginRight: '10px'}} onClick={() => {setModalOpen(true); setReviews(review)}}></Image>
                                                                        
                                                                    </>
                                                                    
                                                                )
                                                            }
                                                            
                                                        </span>
                                                        
                                                    </div>
                                                
                                                    <footer className="footer-class">
                                                        <div>
                                                            <span className="date">{review.regidate}</span>
                                                        </div>
                                                        <button className="recommend">
                                                            <div className="thumbsup" >
                                                                {
                                                                    clicked.includes(review.r_id)? <FaThumbsUp id={review.r_id} onClick={addClick}></FaThumbsUp> :<FaRegThumbsUp id={review.r_id} onClick={addClick}/>
                                                                }
                                                            </div>
                                                            <span>도움돼요</span>
                                                            <span>{userThumbs[index]}</span>
                                                            {loginOpen && <LoginModal setModalOpen={setLoginOpen}/>}
                                                        </button>
                                                    </footer>
                                                </div>
                                            </article>
                                        </div>
                                        
                    )}
                    { modalOpen && <ImageModal2 setModalOpen={setModalOpen}  setReview={setReviews} reviewListMain={reviewListMain} reviewList={reviewListMore} setImageModalOpen = {setImageModalOpen} review={reviews} disable={true}/>}
                    {reviewListMain.length !== 0 && <CustomPaging pageNumAtom={productPageNumAtom} totalItemCountAtom={productTotalItemCountAtom} limit={5} />}
                </div>
            </Container>
        </>
    )
}

const Container = styled.div`
    border-top: 1px solid rgb(51, 51, 51);

    & article {
        flex: 1 1 0%;
        overflow: hidden;
    }

    & .thumbsup {
        margin-right: 5px;
    }

    & .info-description {
        background-color: rgb(250,250,250);
        padding: 25px 20px 20px;
        border-bottom: 1px solid rgb(238, 238, 238);
    }

    & .image-button {
        display: flex;
        flex-wrap: no-wrap;
        gap: 3px;
        overflow: auto hidden;
        padding: 0px;
        border-radius: 5px;
        
    }

    & .recommend {
        display: flex;
        -webkit-box-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        align-items: center;
        min-width: 88px;
        height: 32px;
        padding: 0px 13px 0px 11px;
        border: 1px solid rgb(226,226,226);
        border-radius: 20px;
        font-size: 12px;
        line-height: 20px;
        color: rgb(153, 153,153);
    }

    & .date {
        color: rgb(153, 153, 153);
    }

    & footer {
        display: flex;
        -webkit-box-pack: justify;
        justify-content: space-between;
        -webkit-box-align: center;
        align-items: center;
        width: 100%;
        padding-top: 19px;
        padding-right: 20px;
    }



    & .image {
        display: inline-block;
        overflow: hidden;
        width: initial;
        height: initial;
        object-fit: contain;
        background: none;
        opacity: 1;
        border: 0px;
        margin: 0px;
        padding: 0px;
        position: relative;
        max-width: 100%;
        border-radius: 6px;
        margin-top: 20px;

        & img:nth-child(1) {
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
        }

        & img:nth-last-child(1) {
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
        }
    }

    & .review-article {
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        gap: 5px;
        height: 19px;
        padding-right: 20px;
    }

    & .description {
        padding-top: 12px;
        padding-right: 20px;
        word-break: break-word;
        white-space: pre-wrap;
        font-weight: 400;
        font-size: 14px;
        line-height: 19px;
        color: rgb(51,51,51);
    }
    & .info {
        padding: 21px 20px 20px;
        border-bottom: 1px solid rgb(238,238,238);
        display: flex;
        gap: 10px;
    }

    & .user-section {
        flex: 0 0 225px;
    }

    & .user {
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        margin: -1px 0px 7px;
    }

    & .user-username {
        font-weight: 500;
    }

    & button {
        border: none;
    }

    & .info-button {
        background-color: white;
        margin-left: 9px;
        font-size: 16px;
        font-weight: 400;
        line-height: 22px;
        text-align: center;
        color: rgb(51, 51, 51);
    }

    & .info-info {
        display: inline-block;
        height: 22px;
        width: 42px;
        border-radius: 4px;
        background-color: rgb(244,244,244);
        font-size: 12px;
        font-weight: 500;
        line-height: 22px;
        text-align: center;
        color: rgb(102,102,102);
        vertical-align: center;
    }

    & .review-section {
        display: flex;
        padding: 30px 0px 19px 20px;
        border-bottom: 1px solid rgb(244, 244, 244);
        font-size: 14px;
        font-weight: 400;
        line-height: 19px;
    }
`;