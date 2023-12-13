import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';

export function RegGoodsModal({setModalOpen}) {

  const modalConfirm = () => {
    setModalOpen(false);
    window.location.href ='/myPage';
  }

  const modalDelete = () => {
    setModalOpen(false);
  }
  return (
    <StyledContainer>
      <div
        className="modal show"
        style={{ display: 'block', position: 'initial' }}
      >
        <Modal.Dialog>
          <Modal.Header closeButton onClick={modalDelete}>
            <Modal.Title>상품 등록 성공</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p className='content'>상품이 등록되었습니다. 추가적으로 등록하시려면 취소를 누르세요</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" onClick={modalConfirm}>확인</Button>
            <Button variant="secondary" onClick={modalDelete}>취소</Button>
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
  width: 350px;
  position: fixed;
  top: 50%;
  left: 50%;
  
  /* 위아래 너비를 준 상태에서 가로 50%, 세로 50%를 이동시킬 수 있다 (= 한가운데 배치) */
  transform: translate(-50%, -50%);
  color: black;

  /* transform: translate(-50%, -50%); */

  & .content {
    font-size: 18px;
  }


`;