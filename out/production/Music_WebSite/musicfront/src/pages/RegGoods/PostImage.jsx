import {useEffect, useRef, useState} from "react";
import {ReactComponent as CameraIcon} from "@/assets/Post/camera-fill.svg";
import styled from "styled-components/macro";
import {storage} from "./../../firebase/app";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {v4} from "uuid";
import {useRecoilState} from "recoil";
import {imagesAtom, imageListAtom, mainImageAtom, subImageAtom, mainImageUrlAtom, subImageUrlAtom} from "./postAtoms";
import { Button, Image } from "@/components";
import { useFileName } from "babel-plugin-styled-components/lib/utils/options";
import { BsCameraFill } from "react-icons/bs";
import { GoodsType } from "./GoodsType";

export function PostImage() {
  const fileInput = useRef(null);
  const fileSubInput = useRef(null);
  const [mainImageUrl, setMainImageUrl] = useRecoilState(mainImageUrlAtom);
  const [imageLength, setImageLength] = useState(0);
  const [mainImageName, setMainImageName] = useState("");
  const [subImageUrl, setSubImageUrl] = useRecoilState(subImageUrlAtom);
  const [subImageLength, setSubImageLength] = useState(0);
  const [subImageName, setSubImageName] = useState("");

  useEffect(() => {
    console.log(imageLength, 'length');
    console.log(subImageLength, 'length');
    console.log(subImageUrl, 'url');
    console.log(mainImageUrl, 'main url');
  })
  const makeOne = () => {
    setImageLength(prevImageLength => prevImageLength + 1);
  }

  const makeSubOne = () => {
    setSubImageLength(prevImageLength => prevImageLength + 1);
  }

  const selectFile = (e) => {
    const file = e.target.files[0];
    if (file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/gif" || file.type === "image/bmp"){
      
    }else {
      return;
    }
    const newFile = (file) => {
      return ({
        name: file.name,
        file: file,
        url: URL.createObjectURL(file)
      });
    }
    const newImageFile = newFile(file);
    setMainImageName(file.name);
    makeOne();
    console.log(imageLength, '숫자');
    const span = document.querySelector(".PreviewImage span");
    const imageRef = ref(storage, `post/${v4() + newImageFile.name}`);
    uploadBytes(imageRef, newImageFile.file).then((snaphsot) => {
      getDownloadURL(snaphsot.ref).then((url) => {
        console.log(url, 'URL');
        setMainImageUrl(url);
      });
    });
  }

  const selectSubFile = (e) => {
    console.log('sub실행');
    const file = e.target.files[0];
    console.log(file, 'meme');
    if (file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/gif" || file.type === "image/bmp"){
      
    }else {
      return;
    }
    const newFile = (file) => {
      return ({
        name: file.name,
        file: file,
        url: URL.createObjectURL(file)
      });
    }
    const newImageFile = newFile(file);
    setSubImageName(file.name);
    makeSubOne();
    console.log(subImageLength, '숫자');
    const span = document.querySelector(".PreviewImage-sub span");
    console.log('나 되나????');
    const imageRef = ref(storage, `post/${v4() + newImageFile.name}`);
    uploadBytes(imageRef, newImageFile.file).then((snaphsot) => {
      getDownloadURL(snaphsot.ref).then((url) => {
        console.log(url, 'URL');
        setSubImageUrl(url);
      });
    });
  }



  function handleDrop(e) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    console.log('file명', file);
    if (file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/gif" || file.type === "image/bmp"){
      
    }else {
      return;
    }
    const newFile = (file) => {
      return ({
        name: file.name,
        file: file,
        url: URL.createObjectURL(file)
      });
    }
    const newImageFile = newFile(file);
    makeOne();
    const imageRef = ref(storage, `post/${v4() + newImageFile.name}`);
    uploadBytes(imageRef, newImageFile.file).then((snaphsot) => {
      getDownloadURL(snaphsot.ref).then((url) => {
        console.log(url, 'URL');
        setMainImageUrl(url);
      });
    });
  }


  function handleSubDrop(e) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    console.log('file명', file);
    if (file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/gif" || file.type === "image/bmp"){
      
    }else {
      return;
    }
    const newFile = (file) => {
      return ({
        name: file.name,
        file: file,
        url: URL.createObjectURL(file)
      });
    }
    const newImageFile = newFile(file);
    makeSubOne();
    const imageRef = ref(storage, `post/${v4() + newImageFile.name}`);
    uploadBytes(imageRef, newImageFile.file).then((snaphsot) => {
      getDownloadURL(snaphsot.ref).then((url) => {
        console.log(url, 'URL');
        setSubImageUrl(url);
      });
    });
  }

  const handleImageDelete = () => {
    setMainImageName((prevMainImageName) => "");
    setImageLength((prevImageLength) => prevImageLength - 1);
    setMainImageUrl(null);
  };

  const handleSubImageDelete = () => {
    setSubImageName((prevSubImageName) => "");
    setSubImageLength((prevSubImageLength) => prevSubImageLength - 1);
    setSubImageUrl(null);
  }

  return (
    <PostImageSection>
      <div className="type">
        <GoodsType/>
      </div>
      <div className="caution">
        <div className="description-text">주의사항</div>
        <div className="text-section">
          <span>상품 이미지를 등록해주세요. jpg, jpeg, png, gif, bmp 파일을 등록할 수 있습니다.</span>
          <br/>
          <span>상품 이미지를 드래그해서 추가할 수도 있습니다.</span>
        </div>

      </div>
      <div className="image-register-box">
      <div className="main-image-register">
        <h1 className="image-title">메인이미지</h1>
        <div className="image-section">
        <div className="image-register-box">
          <div>
            <label htmlFor="file" className="input-file-button">
              이미지 업로드
            </label>
            <input ref={fileInput} type="file" name="file" id="file" accept=".jpg,.jpeg,.png,.gif,.bmp" required onChange={selectFile}></input>
          </div>
          <div className="PreviewImage" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
            {imageLength === 0 ? 
              <span><p><BsCameraFill></BsCameraFill></p>
              </span> : <></>}
            {
              mainImageUrl && <div key={mainImageUrl + '1'} className="PreviewImageItem">
                <img src={mainImageUrl} key={mainImageUrl} alt='main-image'/>
                <Button onClick={() => handleImageDelete()}>X</Button>
              </div>
            }
            
          </div>
          <p>{mainImageName}</p>
        </div>
        </div>

      </div>
      <div className="image-section">
      <div className="sub-image-register">
        <h1 className="image-title">서브이미지</h1>
        <div className="image-register-box">
          <div>
            <label htmlFor="sub-file" className="input-file-button">
              서브 이미지 업로드
            </label>
            <input ref={fileSubInput} type="file" name="sub-file" id="sub-file" accept=".jpg,.jpeg,.png,.gif,.bmp" required onChange={selectSubFile} className="meme"></input>
          </div>
          <div className="PreviewImage-sub" onDrop={handleSubDrop} onDragOver={(e) => e.preventDefault()}>
            {subImageLength === 0 ? 
              <span><p><BsCameraFill></BsCameraFill></p>
              </span> : <></>}
            {
              subImageUrl && <div key={subImageUrl + '1'} className="PreviewImageItem">
                <img src={subImageUrl} key={subImageUrl} alt='sub-image'/>
                <Button onClick={() => handleSubImageDelete()}>X</Button>
              </div>
            }
          </div>
          <p>{subImageName}</p>
        </div>
      </div>
      </div>

      </div>
    </PostImageSection>
  );
}

const PostImageSection = styled.div`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  button {
    background-color: #eca997;
    color: #fff;
    border: none;
    border-radius: 10px;
    margin: -20px 0 0 -30px;
    padding: 5px 10px;
    position: absolute;
    top: 20px;
    right: 0;
  }

  & .meme {
    display: none;
  }

  & .caution {
    display: flex;
    align-items: flex-start;
    gap: 20px;
    margin-top: 50px;
    margin-bottom: 50px;
  }

  & .image-section {
    width: 528px;
  }

  & .image-register-box {
    display: flex;
    
  }

  & .description {
    width: 420px;
  }
  & .description-text {
    font-size: 13px;
    color: rgb(255,255,255);
    background-color: #A3C6C4;
    width: fit-content;
    padding: 5px;
    vertical-align: middle;
    border-radius: 10px;
    
  }


  & .input-file-button {
    width: fit-content;
    background-color: rgb(85, 85, 85);
    padding: 10px;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    text-align: center;
  }
  & .PostImageIcon {
    width: 160px;
    height: 160px;
    border: 2px solid #a5b2a6;
    border-radius: 12px;
    fill: #dcdee3;
    align-items: center;
    justify-content: center;
    padding: 40px;
    margin-right: 24px;
    cursor: pointer;

    &:hover {
      fill: #f8e1db;
    }
  }

  & .image-register-box {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  & .image-title {
    font-weight: 500;
    font-size: 22px;
    margin-bottom: 20px;
  }

  #file {
    display: none;
  }


  .PreviewImage {
    border: 2px solid rgb(85, 85, 85);
    border-radius: 12px;
    width: 160px;
    height: 160px;
    display: flex;
    align-items: center;
    padding: 12px;
    justify-content: center;

    & span {
      color: #868b94;
    }
  }

  .PreviewImage-sub {
    border: 2px solid rgb(85, 85, 85);
    border-radius: 12px;
    width: 160px;
    height: 160px;
    display: flex;
    align-items: center;
    padding: 12px;
    justify-content: center;

    & span {
      color: #868b94;
    }

    & img {
    width: 100px;
    height: 100px;
    border-radius: 12px;
    object-fit: cover;
    }
  }

  .PreviewImage img {
    width: 100px;
    height: 100px;
    border-radius: 12px;
    object-fit: cover;

  }

  .PreviewImageItem {
    margin: auto;
    position: relative;
  }

  .main-image {
    font-weight: 500;
  }

  .images {
    width: 300px;
    height: 300px;
  }
`;