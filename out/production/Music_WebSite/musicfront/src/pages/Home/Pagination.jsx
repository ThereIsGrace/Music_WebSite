import { useState } from "react";
import styled from "styled-components";

function Pagination({ total, limit, pageNum, setPageNum }){
    const numPages = Math.ceil(total / limit);  // 총 페이지 수 
    const [chapter, setChapter] = useState(1);
    const lastChapter = Math.ceil(numPages/5);  // 마지막 챕터수이자 총 챕터수(1부터 시작)
    const startNum = (chapter * 5) -4;          // 챕터 당 시작 번호
    const lastNum = Math.min((chapter *5), numPages);  // 챕터 당 마지막 번호
    
    
    
    setPageNum(pageNum);
    return (
        <Nav>
            <Button disabled={pageNum === 1} onClick={() => {setPageNum(1); setChapter(1);}}>
                &lt;&lt;
            </Button>
            <Button disabled={chapter === 1} onClick={() => {setPageNum((chapter-1)*5); setChapter(chapter-1);}}>
                &lt;
            </Button>
            {Array(numPages)
                .fill()
                .map((_,i) => (
                    <Button key={i+1}
                    onClick={() => {setPageNum(i+1);}}
                    aria-current={pageNum === i + 1 ? "page": undefined}
                    >
                        {i + 1}
                    </Button>
                )).slice(startNum-1, lastNum)
            }
            <Button disabled={chapter === lastChapter} onClick={() => { setPageNum((chapter+1)*5-4); setChapter(chapter+1);}}>
                &gt;
            </Button>
            <Button disabled={pageNum === numPages} onClick={() => {setPageNum(numPages); setChapter(lastChapter);}}>
                &gt;&gt;
            </Button>
        </Nav>
    )
}

const Nav = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    margin: 16px;
`;

const Button = styled.button`
    border: none;
    border-radius: 8px;
    padding: 8px;
    margin: 0;
    background: black;
    color: white;
    font-size: 1rem;

    &:hover {
        background: tomato;
        cursor: pointer;
        transform: translateY(-2px);
    }

    &[disabled]{
        background: grey;
        cursor: revert;
        transform: revert;
    }

    &[aria-current]{
        background: deeppink;
        font-weight: bold;
        cursor: rever;
        transform: revert;
    }
`


export default Pagination;
