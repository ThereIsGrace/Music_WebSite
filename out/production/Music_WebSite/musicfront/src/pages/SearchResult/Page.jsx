import styled from "styled-components";
import {PageBtn, pageAtom} from "@/pages/SearchResult";
import {useRecoilState} from "recoil";

export const Page = ({lastPage}) => {
  const [page] = useRecoilState(pageAtom);

  return (
    <PaginationBlock>
      <PageBtn disabled={page === 1} title={"prev"}>
        이전
      </PageBtn>
      <PageNumber>{page}</PageNumber>
      <PageBtn disabled={page === lastPage} title={"next"}>
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
