import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';

export function MyModal({setModalOpen}) {

  return (
    <StyledContainer>
      <div
        className="modal show"
        style={{ display: 'block', position: 'initial' }}
      >
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>상품 등록 성공</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>상품 등록에 성공했습니다.</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary">확인</Button>
            <Button variant="primary">Save changes</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>

    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  /* 최상단 위치 */
  z-index: 999;

  /* 중앙 배치 */
  width: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  
  /* 위아래 너비를 준 상태에서 가로 50%, 세로 50%를 이동시킬 수 있다 (= 한가운데 배치) */
  transform: translate(-50%, -50%)

  /* transform: translate(-50%, -50%); */
`;



