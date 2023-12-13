import axiosInstance from "@/axios_interceptor/axios_interceptor";
import { Image } from "@/components";
import { CustomPaging } from "@/components/CustomPaging/CustomPaging";
import { SERVER_URL } from "@/constants"
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components"
import { orderPageNumAtom, orderTotalItemCountAtom } from "./orderListAtoms";
import { useRecoilState } from "recoil";

export function OrderBody(){
    const [orderList, setOrderList] = useState([]);
    const [orderPageNum, setOrderPageNum] = useRecoilState(orderPageNumAtom);
    const [orderTotalItemCount, setOrderTotalItemCount] = useRecoilState(orderTotalItemCountAtom);

    useEffect(()=>{
        setOrderPageNum(0);
    },[])

    useEffect(()=>{
        getOrderList();
    },[orderPageNum]);
    const getOrderList = () => {
        axiosInstance.get(SERVER_URL + `order?page=${orderPageNum}`)
        .then(res => { console.log(res.data.content, '이게 뭔지'); setOrderList(res.data.content); setOrderTotalItemCount(res.data.totalElements)})
        .catch()
    }
    const navigate = useNavigate();


    useEffect(()=>{
        getOrderList();
    }, []);

    const makeDate = (date) => {
        const day = date.substr(0, 10);
        const time = date.substr(11, 5);
        return day + ' ' + time;
    } 

    useEffect(()=>{
        
    },[orderList]);

    return(
        <>
            <MainBody>
                <div className="orderBody">
                    <h3 className="orderName">Order</h3>
                    <div className='total'>총 주문건수 {orderTotalItemCount}</div>
                    {orderList.map((order, index) => 
                                <>
                                    <div className='main'>
                                        <span style={{fontWeight: 'bold'}}>주문번호 {order.orderNumber}</span>
                                        <span>{makeDate(order.regDate)}</span>
                                    </div>
                                    <table className="cartTable">
                                        <tbody>
                                            {order.orderLists.map((orderList, index) => 
                                                <tr className='subTr'>
                                                    <td style={{width: '10%'}}>{orderList.id}</td>
                                                    <td style={{width: '30%'}}>
                                                        <Link to={`/productDetail/${orderList.goods.goodsNo}`}>
                                                            <Image src={orderList.goods.imageUrl}/>
                                                        </Link>
                                                    </td>
                                                    <td style={{width: '20%'}}>{orderList.goods.pname}</td>
                                                    <td style={{width: '10%'}}>{orderList.quantity}</td>
                                                    <td style={{width: '10%'}}>{orderList.goods.price}</td>
                                                    <td style={{width: '20%'}}>
                                                        {!orderList.reviewWritten && <button className='review-write' style={{backgroundColor: 'skyblue'}} onClick={e => {navigate(`/review/${orderList.id}/${orderList.goods.goodsNo}`)}}>리뷰 쓰기</button>}
                                                        {orderList.reviewWritten && <button className='review-write' disabled >리뷰 작성 완료</button>}
                                                    </td>
                                                </tr>
                                            )}

                                        </tbody>
                                    </table>
                                </>
                    )}
                <CustomPaging pageNumAtom={orderPageNumAtom} totalItemCountAtom={orderTotalItemCountAtom} limit={2} />
                </div>
 
            </MainBody>
        </>
    )
}

const MainBody = styled.div`
    padding: 0px 40px;
    line-height: 1;
    margin-bottom: 50px;

    & .orderBody {
        max-width: 1024px;
        width: 100%;
        margin: 160px auto 0px;
        font-size: 0.85rem;
    }

    & .orderName {
        margin-bottom: 40px;
        font-size: 2.5rem;
        font-weight: 700;
        text-align: center;
    }

    & table {
        width: 100%;
        margin-bottom: 30px;
    }



    & .main {
        width: 1024px;
        font-size: 16px;
        border-top: 1px solid black;
        border-bottom: 1px solid black;
        padding: 20px;
        display: flex;
        justify-content: space-between;
    }

    & .total {
        font-size: 18px;
    }

    & td {
        text-align: center;
        vertical-align: middle;
    }

    & img {
        margin-top: 10px;
        width: 100px;
        height: 100px;
        border-radius: 10px;
        margin-bottom: 10px;
    }

    & tr {
        border-bottom: 1px solid black;
    }

    & .review-write {
        font-size: 12px;
        padding: 10px;
        border: none;
        background-color: rgb(85, 85, 85);
        border-radius: 10px;
        color: white;
    }
    
`