import styled from "styled-components";
import {useRecoilState} from "recoil";
import CustomPagination from "./CustomPagination";



export const CustomPaging = ({pageNumAtom, totalItemCountAtom, limit}) => {
 const [pageNum, setPageNum] = useRecoilState(pageNumAtom);
 const [totalCount] = useRecoilState(totalItemCountAtom);


  return (
    <StyledPaginate>
      <CustomPagination  total={totalCount} limit={limit} pageNum={pageNum} setPageNum={setPageNum} />
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
