import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import styled from 'styled-components'

const ARRAY = [0, 1, 2, 3, 4];

function Rating({count, setCount}){
    const [clicked, setClicked] = useState([false, false, false, false, false]);

    const handleStarClick = index => {
        let clickStates = [...clicked];
        for (let i = 0; i < 5; i++){
            clickStates[i] = i <= index ? true : false;
        }
        setClicked(clickStates);
    }

    const countStar = () => {
        let count = 0;
        for (let i = 0; i < 5; i++){
            if (clicked[i]){
                count = i + 1;
            }else {
                break;
            }
        }
        setCount(count);
    }

    const countText = () => {
        switch(count){
            case 0: return <span>1점에서 5점까지 별점을 선택해주세요! 😍</span>
            case 1: return <span>실망하신 점을 솔직하게 알려주세요! 😔</span>
            case 2: return <span>불편하셨던 점을 솔직하게 알려주세요! 😥</span>
            case 3: return <span>개선해야 할 점을 솔직하게 알려주세요! 🤔</span>
            case 4: return <span>마지막 부족했던 점까지 솔직하게 알려주세요! 😊</span>
            default: return <span>만족하신 점과 개선해야 할 점을 솔직하게 알려주세요! 😁</span>
        }
    }

    useEffect(() => {
        countStar();
    }, [clicked]);

    useEffect(() => {

    },[count]);

    return (
        <Wrap>
            <RatingText>평가하기</RatingText>
            <Stars>
                {ARRAY.map((el, idx) => {
                    return(
                        <FaStar
                        key={idx}
                        size="50"
                        onClick={() => handleStarClick(el)}
                        className={clicked[el] && 'yellowStar'} 
                        />
                    );
                })}
            </Stars>
            <div style={{marginTop: '10px'}}>{count}점을 선택하셨네요! {countText()}</div>
        </Wrap>
    )
}

export default Rating;

const Wrap = styled.div`
    margin-left: 30px;
    display: flex;
    flex-direction: column;
`;

const RatingText = styled.div`
    color: #787878;
    font-size: 12px;
    font-weight: 400;
`;

const Stars = styled.div`
    display: flex;
    padding-top: 5px;

    & svg {
        color: gray;
        cursor: pointer;
    }

    :hover svg {
        color: #fcc419;
    }

    & svg:hover ~ svg {
        color: gray;
    }

    .yellowStar {
        color: #fcc419;
    }
`;
