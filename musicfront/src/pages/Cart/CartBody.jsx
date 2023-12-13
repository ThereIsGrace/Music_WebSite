import axiosInstance from "@/axios_interceptor/axios_interceptor";
import { Image } from "@/components";
import { SERVER_URL } from "@/constants";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import styled from "styled-components"
import { Order } from "./Order";
import { CustomPaging } from "@/components/CustomPaging/CustomPaging";
import { cartPageNumAtom, cartTotalItemCountAtom } from "./cartAtoms";
import { useRecoilState } from "recoil";
import exclamationMark from "@/assets/Logo/exclamationmark.png"
import { CartNoSelectedModal } from "@/components/Modal/CartNoSelectedModal";

export default function CartBody(){
    const [cartList, setCartList] = useState([]);
    const [totalElements, setTotalElements] = useState(0);
    const [checkItems, setCheckItems] = useState([]);
    const [open, setOpen] = useState(false);
    const [cartPageNum, setCartPageNum] = useRecoilState(cartPageNumAtom);
    const [cartTotalItemCount, setCartTotalItemCount] = useRecoilState(cartTotalItemCountAtom);
    const [modalOpen, setModalOpen] = useState(false);

    const getCart = () => {
        axiosInstance.get(SERVER_URL + `cartlist?page=${cartPageNum}`)
        .then(res => {console.log(res); setCartList(res.data.content); setCartTotalItemCount(res.data.totalElements)})
        .catch();    
    }

    const checkCart = () => {
        if (checkItems.length === 0){
            setModalOpen(true);
        }else {
            setOpen(true);
        }
    }

    useEffect(()=>{
        setCartPageNum(0);
    },[]);

    useEffect(()=>{},[modalOpen]);

    useEffect(()=>{
        getCart();
    },[cartPageNum]);

    useEffect(()=>{},[cartTotalItemCount]);

    // 체크박스 단일 선택
    const handleSingleCheck = (checked, id) => {
        if (checked){
            // 단일 선택 시 체크된 아이템을 배열에 추가
            setCheckItems(prev => [...prev, id]);
        } else {
        // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
        setCheckItems(checkItems.filter((el) => el !== id));}

    }

    // 체크박스 전체 선택
    const handleAllCheck = (checked) => {
        if(checked) {
            // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 checkItems 상태 업데이트
            const idArray = [];
            cartList.forEach((el) => idArray.push(el.id));
            setCheckItems(idArray);

          }
          else {
            // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
            setCheckItems([]);
          }
    }

    const addTotal = () => {
        const result = cartList.filter((el) => checkItems.includes(el.id));
        let total = 0;
        result.forEach((el) => total += el.goods.price * el.quantity);
        return total;
    }

    const result = addTotal();

    useEffect(() => {
        getCart();
    }, []);

    const reset = (e) => {
        setCheckItems([]);
        setOpen(false);
    }

    const deleteCartItems = (e) => {
        const data = {
            cartList: checkItems
        }
        axiosInstance.post(SERVER_URL + 'cart/delete', data)
        .then(res => {console.log(res); getCart(); setCheckItems([]); setCartPageNum(0);})
        .catch()
    }

    useEffect(() => {
        addTotal();
    }, [checkItems])

    useEffect(() =>{},[cartList]);

    useEffect(() => {}, [open]);


    return(
        <>
            <MainBody>
                <div className="cartBody">
                    <h3 className="cartName">Cart</h3>
                    <table className="cartTable">
                        <tbody>
                            <tr className="mainTr">
                                <td>
                                    <input type="checkbox" value={'전체선택'} 
                                    onChange={(e) => handleAllCheck(e.target.checked)}
                                    // 데이터 개수와 체크된 아이템의 개수가 다를 경우 선택 해제 (하나라도 해제 시 선택 해제)
                                    checked={checkItems.length === cartList.length ? true : false}></input>
                                </td>
                                <td>
                                    <span>전체 선택 {checkItems.length}/{cartTotalItemCount}</span>
                                </td>
                                <td>
                                    <span>상품 정보</span>
                                </td>
                                <td>
                                    <span>수량</span>
                                </td>
                                <td>
                                    <span>상품 금액</span>
                                </td>
                          
                            </tr>
                            {cartList.map((cart, index) => 
                                
                                <tr className="mainTr">
                                    <td>
                                        <input type="checkbox" value={cart.goods.goodsNo} 
                                        onChange={(e) => handleSingleCheck(e.target.checked, cart.id)}
                                        // 체크된 아이템 배열에 해당 아이템이 있을 경우 선택 활성화, 아닐 시 해제
                                        checked={checkItems.includes(cart.id) ? true : false}
                                        ></input>
                                    </td>
                                    <td>
                                        <span>
                                            <Link to={`/productDetail/${cart.goods.goodsNo}`} >
                                                <Image src={cart.goods.imageUrl} />
                                            </Link>
                                        </span>
                                    </td>
                                    <td>
                                        <Link to={`/productDetail/${cart.goods.goodsNo}`} >
                                            <span>{cart.goods.pname}</span>
                                        </Link>
                                    </td>
                                    <td>
                                        <span>{cart.quantity}</span>
                                    </td>
                                    <td>
                                        <span>{cart.quantity * cart.goods.price}</span>
                                    </td>  
                          
                                </tr>
                            )}
                        </tbody>
                    </table>
                        {cartList.length === 0 && 
                                <Void>
          
                                    <Image src={exclamationMark} alt='댓글 없음 이미지' />
                                  
                                    <p>카트가 비었습니다. 새로운 상품을 추가해 보세요.</p>
                                </Void>
                        } 
                    <div className="total">
                        <div>
                            <span>전체 선택 {checkItems.length}/{cartTotalItemCount}</span>
                            <button className="cancelButton" onClick={reset} style={{cursor: 'pointer'}}>선택 취소</button>
                            <button className="orderButton" onClick={e => checkCart()} style={{cursor: 'pointer'}}>주문 하기</button>
                            <button className="deleteButton" onClick={deleteCartItems} style={{cursor: 'pointer'}}>카트 삭제</button>
                        </div>
                        <div className="totalCount">
                            <span>Total Price</span>
                            <span>Total {checkItems.length} (items)</span>
                            <span>{result}원</span>
                        </div>
                    </div>
                </div>
                <div className='page'>
                    {cartList.length !== 0 && <CustomPaging pageNumAtom={cartPageNumAtom} totalItemCountAtom={cartTotalItemCountAtom} limit={5}/>}

                </div>
                
                {open && <Order checkItems={checkItems} result={result} cartList={cartList}/>}
                {modalOpen && <CartNoSelectedModal setModalOpen={setModalOpen}></CartNoSelectedModal>}
            </MainBody>
        </>
    )
}

const MainBody = styled.div`
    box-sizing: border-box;
    //height: 100vh;
    padding: 0px 40px;
    line-height: 1;
    margin-bottom: 50px;
    min-height: calc(63vh - 10rem);

    & .page {
        margin-top: 40px;
    }



    & .cartBody {
        max-width: 1024px;
        width: 100%;
        margin: 160px auto 0px;
        font-size: 0.85rem;
    }

    & .cartName {
        margin-bottom: 40px;
        font-size: 2.5rem;
        font-weight: 700;
        text-align: center;
    }

    & .cartTable {
        width: 100%;
        border-bottom: 1px solid rgb(34, 34, 34);
    }

    & .mainTr {
        height: 40px;
        font-size: 0.85rem;
        border-bottom: 1px solid rgb(34, 34, 34);
        padding-top: 10px;
        padding-bottom: 10px;
        margin-bottom: 10px;

        & img {
            width: 150px;
            height: 150px;
            border-radius: 10px;
            object-fit: cover;
            margin-top: 10px;
            margin-bottom: 10px;
        }

        & a {
            text-decoration: none;
        }
    }

    & .mainTr td {
        vertical-align: middle;
        text-align: center;
    }

    & span {
        font-size: 13px;
    }

    & .total {
        display: flex;
        -webkit-box-pack: justify;
        justify-content: space-between;
        margin-top: 30px;
    }
    & .cancelButton {
        cursor: pointer;
        all: unset;
        margin-left: 40px;
        color: rgb(255, 255, 255);
        font-weight: bold;
        text-align: center;
        padding: 12px 24px;
        border-radius: 10px;
        background: rgb(34, 34, 34);
    }

    & .orderButton {
        cursor: pointer;
        all: unset;
        margin-left: 10px;
        color: rgb(255, 255, 255);
        font-weight: bold;
        text-align: center;
        padding: 12px 24px;
        border-radius: 10px;
        background: rgb(129, 188, 24);
    }

    & .deleteButton {
        cursor: pointer;
        all: unset;
        margin-left: 10px;
        color: rgb(255, 255, 255);
        font-weight: bold;
        text-align: center;
        padding: 12px 24px;
        border-radius: 10px;
        background: red;
    }

    & .totalCount {
        display: flex;
        -webkit-box-pack: justify;
        justify-content: space-between;
        -webkit-box-align: center;
        align-items: center;
        width: 480px;
        border-bottom: 1px solid rgb(34, 34, 34);
    }
`
const Void = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;

  & img {
    width: 30px;
    height: 30px;
    margin: 0 auto;
    margin-top: 30px;
  }

  & p {
    margin: 0 auto;
    margin-bottom: 50px;
  }
`;