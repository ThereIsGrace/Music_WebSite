import { Col, Form, InputGroup, Row } from "react-bootstrap";
import { useRecoilState } from "recoil";
import { pnameAtom, priceAtom, quantityAtom } from "./postAtoms";

export function PostText(){
    const [pname, setPname] = useRecoilState(pnameAtom);
    const [price, setPrice] = useRecoilState(priceAtom);
    const [quantity, setQuantity] = useRecoilState(quantityAtom);

    const onChangePname = (e) => {
        setPname(e.target.value);
    }

    const onChangePrice = (e) => {
        setPrice(e.target.value);
    }

    const onChangeQuantity = (e) => {
        setQuantity(e.target.value);
    }

    return(
        <>

            <InputGroup size="lg" className="mb-3" style={{padding:'10px'}}>
            <InputGroup.Text id="inputGroup-sizing-lg">상품명</InputGroup.Text>
                <Form.Control
            aria-label="Large"
            aria-describedby="inputGroup-sizing-lg"
            onChange={onChangePname}
                />
            </InputGroup>
            <div style={{display: 'flex'}}>
            <InputGroup size="lg" className="mb-3" style={{padding:'10px'}}>
            <InputGroup.Text id="inputGroup-sizing-lg">가격</InputGroup.Text>
                <Form.Control
            aria-label="Large"
            aria-describedby="inputGroup-sizing-lg"
            onChange={onChangePrice}
                />
            </InputGroup>

            <InputGroup size="lg" className="mb-3" style={{padding:'10px'}}>
            <InputGroup.Text id="inputGroup-sizing-lg">수량</InputGroup.Text>
                <Form.Control
            aria-label="Large"
            aria-describedby="inputGroup-sizing-lg"
            onChange={onChangeQuantity}
                />
            </InputGroup>
            </div>
        </>

    )
}