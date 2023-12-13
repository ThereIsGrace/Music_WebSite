import { useEffect, useState } from "react";
import styled from "styled-components"
import { Image } from "..";
import { Link, useNavigate } from "react-router-dom";


export function StoreButtonDetail({visible, setVisible, setOriginal, atList}){
    const navigate = useNavigate();
    const location = window.location;
    const removeAll = () => {
        const atlist = JSON.parse(localStorage.getItem('atlist'));
        if(atlist){
            localStorage.removeItem('atlist');
            window.location.reload();
        }
    }

    const removeSelect = (goodsNo) => {
        const atlist = JSON.parse(localStorage.getItem('atlist'));
        if (atlist){
              let newItem = [...atlist];
              let filteredItem = newItem.filter((el) => el.goodsNo !== goodsNo);
              localStorage.removeItem('atlist');
              if (Object.keys(filteredItem).length !== 0){
                localStorage.setItem('atlist', JSON.stringify(filteredItem));
              }
        }
        window.location.reload();
    }

    
    return(
        <>
            {visible && 
                    <Container>
                        <div className='title-section'>
                            <p>최근 본 상품</p>
                            <span onClick={() => {setVisible(false); setOriginal(true)}} style={{cursor: 'pointer'}}>X</span>
                        </div>
                        <div className='sub-title-section'>
                            <p>전체 {atList.length}개</p>
                            <p onClick={() => removeAll()} style={{cursor: 'pointer'}}>전체삭제</p>
                        </div>

                        <CardSection className="cardSection">
                        {
                            atList.map((at,index) => (
                             <CardItem>
                                <div className='image-section'>
                                    <Link to={`/productDetail/${at.goodsNo}`} >
                                        <Image src={at.imageUrl} key={index} alt='상품 이미지'/>
                                    </Link>
                                 </div>
                                 <TextSection>
                                    <div className="delete">
                                        <p style={{cursor: 'pointer'}} onClick={e => removeSelect(at.goodsNo)}>X</p>
                                    </div>
                                     <p className='pname' onClick={e => navigate(`/productDetail/${at.goodsNo}`)}>{at.pname}</p>
                                     <p className='price'>{at.price} 원</p>        
                                 </TextSection> 
                             </CardItem> 
                            ))
                        }
                        </CardSection>
                    </Container>
            }

        </>
    )
}

const Container = styled.div`
    background-color: white;
    height: calc(90vh - 100px) !important;
    margin-top: 30px;
    padding: 30px;
    overflow: hidden;

    width: 350px;
    border: 1px solid black;
    border-radius: 20px;
    z-index: 2;
    top: 100px;

    & .title-section {
        display: flex;
        justify-content: space-between;
        font-size: 22px;
        font-weight: 500;
        
    }

    & .sub-title-section {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        margin-bottom: 10px;
    }
`

const CardSection = styled.div`
    overflow: hidden scroll;
    height: 80%;

    & .cardSection::-webkit-scrollbar {
        width: 30px;  
    }
`

const CardItem = styled.div`
    border: 1px solid rgb(221, 221, 221);
    height: 120px;
    margin-top: 5px;
    border-radius: 10px;
    margin-right: 10px;
    display: flex;
    gap: 10px;
    padding: 10px;

    & .image-section {
        width: 100px;
        height: 100px;


        & img {
            width: 100px;
            height: 100px;
            border-radius: 10px;
            cursor: pointer;
        }
    }
`

const TextSection = styled.div`
    flex-grow: 1;
    padding-right: 10px;

    & p {
        padding-left: 10px;
        text-align: left;
    }
    & .pname {
        font-size: 18px;
        font-weight: 500;
        margin-bottom: 10px;
        cursor: pointer;

    }

    & .price {
        
    }

    & .delete{
        display: flex;
        justify-content: end;
        margin-bottom: 10px;
        cursor: pointer;
    }

`