import styled from "styled-components";
import qs from "qs";
import {BoardBtn} from "@/components";
import {useParams, useSearchParams} from "react-router-dom";
import {useRecoilState} from "recoil";

const buildLink = ({username, page}) => {
  const query = qs.stringify({page});
  return username ? `/@${username}?${query}` : `/?${query}`;
};

export const Pagination = () => {
  const [searchParams] = useSearchParams();
  const [board] = useRecoilState();

  const {username} = useParams();
  // page가 없으면 1을 기본값으로 사용
  const page = parseInt(searchParams.get("page"), 10) || 1;

  const {lastPage} = useSelector(({posts}) => ({
    lastPage: posts.lastPage,
  }));

  return (
    <PaginationBlock>
      <BoardBtn disabled={page === 1} to={page === 1 ? undefined : buildLink({username, page: page - 1})}>
        이전
      </BoardBtn>
      <PageNumber>{page}</PageNumber>
      <BoardBtn disabled={page === lastPage} to={page === lastPage ? undefined : buildLink({username, tag, page: page + 1})}>
        다음
      </BoardBtn>
    </PaginationBlock>
  );
};

const PaginationBlock = styled.div`
  width: 320px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
`;
const PageNumber = styled.div``;
