import AddCircleIcon from '@mui/icons-material/AddCircle';
import styled from 'styled-components';
export default function QuantityInput({ stock, quantity, onClick }){
    return(

        <>
            <Container>
            <button
                type="button"
                aria-label="수량 내리기"
                onClick={() => onClick(-1)}>
                    <AddCircleIcon />
                </button>
                <label>
                    <span className="ally-hidden">상품 주문 수량 입력란</span>
                    <input 
                    type="number"
                    min={1}
                    value={quantity}
                    max={stock}
                    readOnly />
                </label>
                <button 
                type="button"
                aria-label="수량 올리기"
                onClick={() => onClick(1)}
                >
                    <AddCircleIcon />
                </button>

            </Container>

        </>


    )
}

const Container = styled.div`
    display: flex;
    align-items: center;
    gap: 0;

    & button {
        width: 300px;
    }
    
`;