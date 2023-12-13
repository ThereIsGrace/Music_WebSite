import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';

export function MyModal({setModalOpen, title, content, address, button1text, button2text}) {

  const modalConfirm = () => {
    setModalOpen(false);
    window.location.href = address;
  }

  const modalDelete = () => {
    setModalOpen(false);
    window.location.reload();
  }
  return (
    <StyledContainer>
      <div
        className="modal show"
        style={{ display: 'block', position: 'initial' }}
      >
        <Modal.Dialog>
          <Modal.Header closeButton onClick={() => { console.log('눌렀음'); modalConfirm()}}>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>{content}</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={modalDelete}>{button1text}</Button>
            <Button variant="primary" onClick={modalConfirm}>{button2text}</Button>
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
  position: fixed;
  top: 50%;
  left: 50%;
  
  /* 위아래 너비를 준 상태에서 가로 50%, 세로 50%를 이동시킬 수 있다 (= 한가운데 배치) */
  transform: translate(-50%, -50%);

  /* transform: translate(-50%, -50%); */


`;



