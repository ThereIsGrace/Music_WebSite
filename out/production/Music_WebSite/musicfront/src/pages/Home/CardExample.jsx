import { Button, Card } from "react-bootstrap";

import musicCatLogo from '@/assets/websiteLogo/music-website-cat-logo.png';
import styled from "styled-components";
import { Link } from "react-router-dom";
export function CardExample({goods}){
    return(
        <Container>
          <Card style={{  width: '200px', height: '300px', margin: '10px'}} className="cc">
            <Link to={`/productDetail/${goods.goodsNo}`}>
              <Card.Img variant="top" src={goods.imageUrl}  style={{ width: '200px', height: '200px', padding: '10px', objectFit: 'cover'}} className="test"/>
            </Link>
            <Card.Body className="text-all">
              <Card.Title>{goods.pname}</Card.Title>
              <Card.Text>
                {goods.price}
              </Card.Text>     
            </Card.Body>
          </Card>
        </Container>
    );
}

const Container = styled.div`
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 4px;
  margin-right: 10px;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 8px 8px;
  }
  & .test {
    object-fit: contain;
    cursor: pointer;

    & img {
      border-radius: 10px;
    }

    &:hover {
      transform: scale(1.1);
    }
  }



  & .text-all{
    text-align: center;

    
    &:hover {
      background: rgb(221, 221, 221);
      color: white;
      transition: 0.5s;
    }
    
  }
`;