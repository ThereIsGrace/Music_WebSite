import { useEffect, useRef, useState } from "react";
import { FcNext } from "react-icons/fc";
import { FcPrevious } from "react-icons/fc";
import { CardExample } from "./CardExample";
import styled from "styled-components";
import { Header } from '@/components';
import { useRecoilState } from "recoil";
import { hoverAtom } from "./homeAtoms";

function useInterval(callback, delay){
    const savedCallback = useRef();  // 최근에 들어온 callback을 저장할 ref를 하나 만든다.  

    
    useEffect(() => {
        savedCallback.current = callback;  // callback이 바뀔 때마다 ref를 업데이트 해준다.
    }, [callback]);

    useEffect(() => {
        function tick(){
            savedCallback.current();  // tick이 실행되면 callback 함수를 실행시킨다. 
        }
        if (delay !== null){  // 만약 delay가 null이 아니라면 
            let id = setInterval(tick, delay);  // delay에 맞추어 interval을 새로 실행시킨다. 
            return () => clearInterval(id);  // unmount될 때 clearInterval을 해준다.
        }
    },[delay]);  // delay가 바뀔 때마다 새로 실행된다. 
}
export const CustomSlide = ({goodsList}) => {
    const [slidePx, setSlidePx] = useState(100);
    const [isHover, setIsHover] = useRecoilState(hoverAtom);
    const toPrev = () => {
        slidePx <= -400  && setSlidePx(slidePx => slidePx + 500);
    };

    const toNext = () => {
        slidePx >= -400  && setSlidePx(slidePx => slidePx - 500);
        return slidePx;
    };

    useInterval(() => {
        if (isHover){

        }else{
            const val = toNext();
            if (val === -900){
                setSlidePx(100);
            }
        }
    },2000);

    const test = () => {
        setIsHover(true);
        return isHover;
    }
    
    return(
        <>
            <MainContainer>
                <div className="relative">
                    <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 flex w-full justify-between">
                        <button className="group pointer-events-auto relative my-auto ml-5 h-10 w-10 rounded-full bg-white p-1 pr-2 text-shadow button-made" onClick={toPrev}>
                            <FcPrevious/>
                        </button>
                        <button className="group pointer-events-auto relative my-auto ml-5 h-10 w-10 rounded-full bg-white p-1 pr-2 text-shadow button-made" onClick={toNext}>
                            <FcNext/>
                        </button>
                    </div>
                    <ul className="relative flex h-fit w-fit select-none items-stretch transition-all duration-500 list2" onMouseEnter={test} onMouseLeave={() => setIsHover(false)}style={{ transform: `translateX(${slidePx}px)`}}>
                        {goodsList.map(goods => (
                            <CardExample goods={goods}></CardExample>
                        ))}
                    </ul>
                </div>

            </MainContainer>
        </>
    );
}
const MainContainer = styled.div`
    padding-bottom: 10px;

    & .button-made {
        cursor: pointer;
        margin-left: 10px;
    }
    & .relative{
        position: relative;
    }

    & .pointer-events-auto {
        pointer-events: auto;
    }

    & .pointer-events-none {
        pointer-events: none;
    } 

    & .absolute {
        position: absolute;
    }

    & .top-0 {
        top: 0;
    }

    & .bottom-0 {
        bottom: 0;
    }

    & .left-0 {
        left: 0;
    }

    & .z-10{
        z-index: 10;
    }

    & .flex {
        display: flex;
    }

    & .w-full {
        width: 100%;
    }

    & .justify-between {
        justify-content: space-between;
    }

    & .my-auto {
        margin-top: auto;
        margin-bottom: auto;
    }

    & .w-10{
        width: 30px;
    }

    & .rounded-full {
        border-radius: 9999px;
    }

    & .h-fit {
        height: fit-content;
    }

    & .w-fit {
        width: fit-content;
    }

    & .items-stretch {
        align-items: stretch;
    }

    & .duration-500 {
        transition-duration: 0.5s;
    }

    & .transition-all {
        transition-property: all;
        transition-timing-function: cubic-bezier(0.4,0,0.2,1);
    }

    & .fc-previous {
        stroke-linecap: round;
    }

    & .p-1 {
        padding: 5px;
    }

    & .pr-2 {
        padding-right: 10px;
    }
`;

