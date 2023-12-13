import { useState } from "react";

export default function Slide(){
    // 이동되는 px을 state로 관리해야 한다. 
    const [slidePx, setSlidePx] = useState(0);


    return(
        <ul className="goodsList">
        </ul>
    );
}