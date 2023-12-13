import { useRecoilState } from "recoil";
import styled from "styled-components"
import { typeAtom } from "./postAtoms";

export const GoodsType = () => {
    const [type, setType] = useRecoilState(typeAtom);
    const typeSet = (e) => {
        setType(e.target.value);
    }
    return(
        <>
            <Container>
                <h1 className="goods-type">상품 분류</h1>
                <select className="selection-type" onChange={typeSet}>
                    <option value="none">상품 분류</option>
                    <option value="앨범">앨범</option>
                    <option value="포토카드">포토카드</option>
                    <option value="응원봉">응원봉</option>
                    <option value="콘서트 티켓">콘서트 티켓</option>
                    <option value="의류">의류</option>
                    <option value="문구류">문구류</option>
                </select>
            </Container>
        </>
    )
}

const Container = styled.div`
    width: 1056px;
    margin: auto;


    & .goods-type {
        font-size: 22px;
        font-weight: 500;
        margin-bottom: 20px;
    }

    & .selection-type {
        width: 300px;
        height: 40px;
        outline: none;
        font-size: 22px;
        border-radius: 12px;
        background-color: gray;

        & option {
            text-align: center;
        }
    }
`