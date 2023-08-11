import styled from 'styled-components';
import qs from 'qs';
import { PageBtn } from './PageBtn';

export const Page = ({ page, lastPage, username, tag }) => {
  return (
    <PaginationBlock>
      <PageBtn
        disabled={page === 1}
        to={
          page === 1 ? undefined : buildLink({ username, tag, page: page - 1 })
        }
      >
        이전
      </PageBtn>
      <PageNumber>{page}</PageNumber>
      <PageBtn
        disabled={page === lastPage}
        to={
          page === lastPage
            ? undefined
            : buildLink({ username, tag, page: page + 1 })
        }
      >
        다음
      </PageBtn>
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

const buildLink = ({ username, tag, page }) => {
  const query = qs.stringify({ tag, page });
  return username ? `/@${username}?${query}` : `/?${query}`;
};
