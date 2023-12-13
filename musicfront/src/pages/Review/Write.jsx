import { useEffect, useMemo, useRef } from "react";
import ReactQuill from "react-quill";
import { reviewContentAtom } from "./reviewAtoms";
import { useRecoilState } from "recoil";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/firebase/app";
import styled from "styled-components";





export function Write() {
  const quillRef = useRef(null);
  const [reviewContent, setReviewContent] = useRecoilState(reviewContentAtom);


  useEffect(()=>{
    console.log(reviewContent,'확인행!!!');
  },[reviewContent])

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: '1' }, { header: '2' }],
          [{ size: [] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }, { align: [] }],
        ],
      },
      clipboard: {
        matchVisual: false,
      },
    }),
    [],
  );

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'align',
    'image',
  ];

  return (
    <>
      <Container>


      <ReactQuill
        ref = {quillRef}
        modules={modules}
        formats={formats}
        placeholder={'자유롭게 글을 작성해주세요!'}
        theme="snow"
        style={{width: "1038px", height: "500px", margin: "auto"}}
        onChange={setReviewContent}
      />
      </Container>
    </>

  );
}

const Container = styled.div`
  width: 1024px;
  margin: 30px auto;
`
