import Pagination from "react-js-pagination";
import styled from "styled-components";
import { pageNumAtom, totalItemCountAtom } from "./boardAtom";
import {useRecoilState} from "recoil";
import {useNavigate} from "react-router-dom";

export const Paging = () => {
  const [pageNum, setPageNum] = useRecoilState(pageNumAtom);
  const [totalCount] = useRecoilState(totalItemCountAtom);
  const navigate = useNavigate();

  const handlePageChange = (pageNum) => {
    setPageNum(pageNum);
    navigate("/board?page=" + pageNum);
  };

  return (
    <StyledPaginate>
      <Pagination activePage={pageNum} itemsCountPerPage={10} totalItemsCount={totalCount} pageRangeDisplayed={10} prevPageText={"‹"} nextPageText={"›"} onChange={handlePageChange} />
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

  ul.pagination li:first-child {
    border-radius: 5px 0 0 5px;
  }

  ul.pagination li:last-child {
    border-radius: 0 5px 5px 0;
  }

  ul.pagination li a {
    text-decoration: none;
    color: #868e96;
    font-size: 1rem;
  }

  ul.pagination li.active a {
    color: white;
  }

  ul.pagination li.active {
    background-color: #337ab7;
  }

  ul.pagination li a:hover,
  ul.pagination li a.active {
    color: #0000ff;
  }

  .page-selection {
    width: 48px;
    height: 30px;
    color: #337ab7;
  }
`;
