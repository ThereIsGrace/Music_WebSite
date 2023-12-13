 import styled from "styled-components";
 import { pageNumAtom, totalItemCountAtom } from "./boardAtom";
 import {useRecoilState} from "recoil";
 import {useNavigate} from "react-router-dom";

 import Pagination from "./Pagination";

 export const Paging = () => {
  const [pageNum, setPageNum] = useRecoilState(pageNumAtom);
  const [totalCount] = useRecoilState(totalItemCountAtom);


   return (
     <StyledPaginate>
       <Pagination  total={totalCount} limit={10} pageNum={pageNum} setPageNum={setPageNum} />
     </StyledPaginate>
   );
 };

 const StyledPaginate = styled.div`
   .pagination {
     width: 500px;
     margin: 0 auto;
     display: flex;
     justify-content: space-between;
     margin-bottom: 3rem;
   }

   ul {
     list-style: none;
     padding: 0;
   }

   ul.pagination li {
     display: inline-block;
     width: 30px;
     height: 30px;
     border: 0px solid #e2e2e2;
     display: flex;
     justify-content: center;
     align-items: center;
     font-size: 1rem;
   }
`;
