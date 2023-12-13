import ReactQuill, { Quill } from "react-quill";
import { ImageDrop } from "quill-image-drop-module";
import { useEffect, useMemo, useRef, useState } from "react";
import { storage } from "@/firebase/app";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRecoilState, useRecoilValue } from "recoil";
import { boardUpdateAtom, postContentAtom, titleAtom } from "./boardAtom";
import styled from "styled-components";
import axiosInstance from "@/axios_interceptor/axios_interceptor";
import { SERVER_URL } from "@/constants";


Quill.register("modules/imageDrop", ImageDrop);

export function Write() {
  const quillRef = useRef(null);
  const [postContent, setPostContent] = useRecoilState(postContentAtom);
  const [title, setTitle] = useRecoilState(titleAtom);

  const imageHandler = function(){
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    

    input.addEventListener('change', async () => {
      const editor = quillRef.current.getEditor();
      const file = input.files[0];
      const range = editor.getSelection(true);

      try{
        // 파일명을 "image/Date.now()"로 저장
        const storageRef = ref(
          storage,
          `board/middle/${Date.now()}`
        );
        // Firebase Method: uploadBytes, getDownloadURL
        await uploadBytes(storageRef, file).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url)=>{
            // 이미지 URL 에디터에 삽입
            editor.insertEmbed(range.index, "image", url);
            // URL 삽입 후 커서를 이미지 뒷 칸으로 이동
            editor.setSelection(range.index + 1);
          });
        });
      } catch(error) {
        console.log(error);
      };
    });

  }
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: '1' }, { header: '2' }],
          [{ size: [] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }, { align: [] }],
          ['image'],
        ],
        handlers: { image: imageHandler },
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
        <HeaderSection>
          <label for="title-section">게시글 제목</label>
          <input type="text" name="title" id="title-section" placeholder="제목을 입력해주세요" onChange={e => {setTitle(e.target.value); console.log(e.target.value)}}></input> 
        </HeaderSection>

      <ReactQuill
        ref = {quillRef}
        modules={modules}
        formats={formats}
        placeholder={'자유롭게 글을 작성해주세요! 사진도 올릴 수 있습니다.'}
        theme="snow"
        style={{width: "1038px", height: "500px", margin: "auto"}}
        onChange={setPostContent}
      />
      </Container>
    </>

  );
}

const Container = styled.div`
  width: 1056px;
  margin: auto;


`

const HeaderSection = styled.div`
  padding-left: 9px;
  margin-bottom: 50px;
  & label {
    font-size: 22px;
    margin-bottom: 20px;
    font-weight: 500;
  }
  & input {
    width: 1038px;
    margin: auto;
    border: none;
    border-bottom: 1px solid black;

    &:focus{
      outline: none;
    }
  }

`

