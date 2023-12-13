import { Image } from "@/components";
import styled from "styled-components";
import test from "@/assets/Logo/rabbit.jpg"
import { InfoList } from "./InfoList";
import { ImageModal } from "./ImageModal";
import { useEffect, useState } from "react";
import { ImageModal2 } from "./ImageModal2";
export const Review = ({reviewListEight, pname, reviewListMain, userThumbs, getReviewListMain, setReviewListMain}) => {
    
    const [imageModalOpen, setImageModalOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [reviews, setReviews] = useState({});

    useEffect(() => {},[reviews]);

    const makeBox = () => {
        return(
            <>
                <div className="review-list">
                {
                    reviewListEight.map((review, i) => 
                        <>
                            {review.reviewImagesList && <Image key={i} src={review.reviewImagesList[0].url} className="review-picture" onClick={() => {setModalOpen(true); setReviews(review)}}></Image>}
                        </>
                    )
                }
                {
                    reviewListEight.length > 7 ?  <a className="to-more-picture" onClick = {() => setImageModalOpen(true)} >
                    <span className="to-more-picture-button" >+ 더보기</span>
                </a> : <></>
                }
 
                </div>
                {
                    modalOpen && <ImageModal2 review={reviews} reviewListEight={reviewListEight} setReviewListMain={setReviewListMain} setReview={setReviews} reviewListMain={reviewListMain} setImageModalOpen={setImageModalOpen} setModalOpen={setModalOpen} getReviewListMain={getReviewListMain}/>
                }
                {
                    imageModalOpen && <ImageModal setImageModalOpen={setImageModalOpen} setReview={setReviews} setModalOpen={setModalOpen}></ImageModal>
                }

            </>

            

        )
    }
    
    return(
        <>
            <Container>
            <h1>상품후기</h1>
            <div className="picture-list">
                {
                    makeBox()
                }
            </div>
            <div className="review-number">
                총 {reviewListMain.length}개
            </div>
            <InfoList reviewListMain={reviewListMain} reviewListEight={reviewListEight} pname={pname} setImageModalOpen={setImageModalOpen} setReviewListMain={setReviewListMain} userThumbs={userThumbs}></InfoList>
            </Container>
        </>

    );
}

const Container = styled.div`

    & .picture-list {
        margin-top: 10px;
        display: flex;
        align-items: center;
        justify-content: start;
        width: 100%;
        position: relative;
        
    }


    & .review-list {
        display: flex;

        & img:nth-child(1){
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
        }

        & img:nth-child(8){
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
        }
    }

    & h1 {
        display: block;
        font-size: 25px;
    }

    & img {
        margin: 1px;
        width: 112px;
        height: 112px;
        margin-right: 10px;
        object-fit: cover;
        cursor: pointer;
    }

    & .review-number {
        margin-top: 10px;
        margin-bottom: 10px;
        font-weight: 500;
    }

    & .to-more-picture {
        position: absolute;
        margin-top: 10px;
        margin-right: 10px;
        -webkit-box-pack: center;
        width: 112px;
        height: 112px;
        background-color: rgba(0, 0, 0, 0.5);
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        right: 12px;
        top: -9px;
    }

    & .to-more-picture-button {
        font-weight: 500;
        font-size: 16px;
        line-height: 19px;
        color: rgba(255, 255,255);
    }

`;