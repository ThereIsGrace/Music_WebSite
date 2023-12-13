import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';

export function LoginFailureModal({setModalOpen}) {
    const modalConfirm = () => {
        setModalOpen(false);
        scrollAgain();
        enableScroll();
        window.location.href ='/register';
      }
      var keys = {37: 1, 38: 1, 39: 1, 40: 1};
     
      function preventDefault(e) {
        e.preventDefault();
      }
     
      function preventDefaultForScrollKeys(e) {
        if (keys[e.keyCode]) {
          preventDefault(e);
          return false;
        }
      }
      const scrollAgain = () => {
        document.body.style.overflow = "unset";
      }
    // modern Chrome requires { passive: false } when adding event
    var supportsPassive = false;
    try {
      window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
        get: function () { supportsPassive = true; }
      }));
    } catch(e) {}
     
    var wheelOpt = supportsPassive ? { passive: false } : false;
    var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
      function disableScroll() {
        window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
        window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
        window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
        window.addEventListener('keydown', preventDefaultForScrollKeys, false);
        document.body.style.overflow = "hidden";
      }
    
      function enableScroll() {
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
        window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
        window.removeEventListener('touchmove', preventDefault, wheelOpt);
        window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
      }
    
      useEffect(() => {
        disableScroll();
      })
    
      const modalDelete = () => {
        setModalOpen(false);
        scrollAgain();
        enableScroll();
      }


  return (
    <StyledContainer>
      <div
        className="modal show"
        style={{ display: 'block', position: 'initial' }}
      >
        <Modal.Dialog>
          <Modal.Header closeButton onClick={modalDelete}>
            <Modal.Title>로그인 실패</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p className='content'>ID와 PW를 다시 한번 확인해주세요. 혹시 계정이 없으시다면 회원가입을 진행해주세요</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" onClick={modalConfirm}>예</Button>
            <Button variant="secondary" onClick={modalDelete}>아니오</Button>
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