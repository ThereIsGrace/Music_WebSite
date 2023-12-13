import { useEffect, useState } from "react";
import DaumPostcodeEmbed from "react-daum-postcode"
import styled from "styled-components"
import { PostCodeModal } from "./PostCodeModal";
import { SERVER_URL } from "@/constants";
import axiosInstance from "@/axios_interceptor/axios_interceptor";
import kakaoPaymentButton from "@/assets/Logo/payment_icon_yellow_small.png"
import { Image } from "@/components";
import { RegisterModal } from "../Register";
import { useRecoilState } from "recoil";
import { modalTextAtom } from "../Register/atoms/checkInputValueAtom";
import { receiverAddressVisibleAtom, receiverMobileVisibleAtom, receiverNameAtom, receiverNameVisibleAtom } from "./cartAtoms";


export function Order({checkItems, result, cartList}){
    const [open, setOpen] = useState(false);
    const [inputAddressValue, setInputAddressValue] = useState('');
    const [inputZipCodeValue, setInputZipCodeValue] = useState('');
    const [user, setUser] = useState({});
    const [receiverName, setReceiverName] = useRecoilState(receiverNameAtom);
    const [address, setAddress] = useState('');
    const [modal, setModal] = useState(false);
    const [modalText, setModalText] = useRecoilState(modalTextAtom);
    const [nameWarning, setNameWarning] = useState('');
    const [nameVisible, setNameVisible] = useRecoilState(receiverNameVisibleAtom);
    const [mobile, setMobile] = useState('');
    const [mobileWarning, setMobileWarning] = useState('');
    const [mobileVisible, setMobileVisible] = useRecoilState(receiverMobileVisibleAtom);
    const [addressWarning, setAddressWarning] = useState('');
    const [addressVisible, setAddressVisible] = useRecoilState(receiverAddressVisibleAtom);
    const getUserInfo = () => {
        axiosInstance.get(SERVER_URL + 'user/userInfo')
        .then(res => {console.log(res); setUser(res.data.data)})
        .catch()
    }

    async function handleCheckReceiver() {
        switch (true) {
          case receiverName === "" :
            setModal(true);
            setModalText("수령인을 확인해주세요");
            setNameWarning('올바른 수령인이 아닙니다.');
            return;
          case mobile === "" :
            setModal(true);
            setModalText("연락처를 확인해주세요");
            return;
          case inputZipCodeValue === "" :
            setModal(true);
            setModalText("우편번호를 확인해주세요");
            return;
          case address === "" :
            setModal(true);
            setModalText("주소를 확인해주세요");
            return;
          default:
            setModal(false);
            await handlePayment();
            break;
        }
      }



      function nameValidation(receiverName) {
        const nameRegex = /^[가-힣]{2,5}$/;
        let warning = "";
        if(!nameRegex.test(receiverName)) {
          warning = "올바른 이름이 아닙니다";
          setNameWarning(warning);
          setNameVisible(true);
        } else {
          setNameVisible(false);
        }
      }

      function mobileValidation(mobile) {
        const mobileRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
        let warning = '';
        
        if(!mobileRegex.test(mobile)) {
          warning = '올바른 휴대폰 형식이 아닙니다';
          setMobileWarning(warning);
          setMobileVisible(true);
        } else {
          setMobileVisible(false);
        }
      }
    
      function handleMobileValidation(e) {
        const mobile = e.target.value;
        const numberOnly = /^[0-9]*$/;
        let warning = '';
    
        if(!numberOnly.test(mobile)) {
          e.target.value = mobile.slice(0, -1);
          warning = '숫자만 입력이 가능합니다';
          setMobileWarning(warning);
          setMobileVisible(true);
          return;
        }
    
        setMobile(mobile);
      }

      function addressValidation(address) {
        let warning = '';
        
        if(address === '') {
          warning = '상세주소를 입력해주세요';
          setAddressWarning(warning);
          setAddressVisible(true);
        } else {
          setAddressVisible(false);
        }
      }

      useEffect(()=>{nameValidation(receiverName)});
      useEffect(()=>{mobileValidation(mobile)});
      useEffect(()=>{addressValidation(address)});

    useEffect(()=>{getUserInfo()},[]);

    useEffect(()=>{},[user]);

    const onCompletePost = data => {
        setInputAddressValue(data.address);
        setInputZipCodeValue(data.zonecode);
        setOpen(false);
      }; 

    const toggle = () => {
        setOpen(!open);
        console.log(open, 'open');
    }

      const postCodeStyle = {
        width: '400px',
        height: '400px',
        // display: open? 'block' : 'none'
      };


    const checkCartName = () => {
        let name = '';
        var s= checkItems[0];
        for(let i = 0; i < cartList.length; i++){
            if (s === cartList[i].id){
                if (checkItems.length !== 1){
                    name = cartList[i].goods.pname + ' 외 ' + checkItems.length + '건';
                    break;
                }else {
                    name = cartList[i].goods.pname;
                    break;  
                }
            }
        }
        return name
    }

    const handlePayment = () => {
        const name = checkCartName();
        
        const data = {
            cartNumberList: checkItems,
            totalPrice: result,
            name: name,
            userId: user.id
        }
        axiosInstance.post(SERVER_URL + 'payment/ready', data)
        .then(response => {console.log(response); window.location.href = response.data.data;})
        .catch(err => console.error(err));
        
    }

    useEffect(()=>{
        if (mobile.length === 11) {
            setMobile(
                mobile.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
            );
          } else if (mobile.length === 13) {
            setMobile(
              mobile
              //하이픈이 입력되면 공백으로 변경되고 하이픈이 다시 생성됨
                .replace(/-/g, '')
                .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
            );
          }
    }, [mobile]);

    useEffect(()=>{
        
    },[open]);
    return(
        <>
            <Container>
                <Title>주문 정보 확인</Title>
                <div className='section'>
                <p>수령인
                    <sup>*</sup>
                </p>
                <input type='text' name='receiver' style={{width: '120px'}} onChange={e => {setReceiverName(e.target.value);}}></input>
                <span className={nameVisible === true ? "registerWarning showWarning" : "registerWarning"}>{nameWarning}</span>
                
                </div>
                
                <div className='section'>
                <p>연락처
                    <sup>*</sup>
                </p>
                <input type='text' name='phone' style={{width: '150px'}}  value={mobile} onChange={handleMobileValidation}></input>
                <span className={mobileVisible === true ? "registerWarning showWarning" : "registerWarning"}>{mobileWarning}</span>
                </div>

                <div className='section'>
                <p>주문 요청 사항</p>
                <input type='text' name='demand' placeholder={'주문 요청 사항을 입력해주세요'}></input>

                </div>

                <Content>
                    <p style={{marginBottom: '0'}}>주소</p>
                    <button onClick={toggle} className='postCodeButton' style={{cursor: 'pointer'}}>우편번호 찾기</button>
                    {open && <PostCodeModal setModalOpen={setOpen} title='test' content={<DaumPostcodeEmbed onComplete={onCompletePost}/>}></PostCodeModal>}
                </Content>
                <input value={inputZipCodeValue} readOnly name='postal-code' placeholder="우편번호" style={{width: '100px', marginBottom: '10px'}}/>
                <br/>
                <input value={inputAddressValue} readOnly name='address' placeholder="주소" style={{marginBottom: '10px'}}/>
                <br/>
                <input placeholder='상세주소' name='detail-address' type='text' style={{marginBottom: '10px'}} onChange={e => setAddress(e.target.value)}/>
                <span className={addressVisible === true ? "registerWarning showWarning" : "registerWarning"}>{addressWarning}</span>
                <div className='button-section'>
                    <button onClick={e => {handleCheckReceiver()}}>
                        <Image src={kakaoPaymentButton}/>
                    </button>
                </div>
                {modal && <RegisterModal onClick={()=>{setModal(false)}}>{modalText}</RegisterModal>}
            </Container>
        </>
    )
}

const Container = styled.div`
    max-width: 1024px;
    margin: 160px auto 0px;

    & .section {
        margin-bottom: 20px;
        font-size: 16px;
    }

    & .postCodeButton {
        cursor: pointer;
        all: unset;
        color: rgb(255, 255, 255);
        font-weight: bold;
        text-align: center;
        padding: 10px 20px;
        border-radius: 10px;
        background: rgb(34, 34, 34);
    }

    & p {
        margin-right: 5px;
        font-size: 17px;
        font-weight: bold;
        margin-bottom: 10px;
    }

    
    & sup {
            position: relative;
            bottom: 5px;
            left: 5px;
            color: red;
        }

    & input {
        border: none;
        border-bottom: 1px solid black;
        width: 500px;
        margin-bottom: 10px;

        &:focus {
            outline: none;
        }
    }

    & button {
        border: none;
        background-color: white;
    }

    & .button-section {
        display: flex;
        justify-content: center;
        margin-top: 70px;
    }

    & .registerWarning {
        display: none;
        /* position: absolute;  */
        left: 150px;
        top: 75px;
        color: red;
    }

    & .showWarning {
        display: block;
    }
`

const Modal = styled.div`
    width: 100px;
    height: 100px;
    border: 1px solid black;
`
const Title = styled.div`
    font-size: 2.5rem;
    font-weight: 500;
    margin: 0 auto 80px;
    text-align: center;


`

const Content = styled.div`
    display: flex;
    gap: 5px;
    align-items: center;
    margin-bottom: 20px;

`
