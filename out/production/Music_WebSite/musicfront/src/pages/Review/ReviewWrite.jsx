import { Image } from "@/components";
import { storage } from "@/firebase/app";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components"
import { v4 } from 'uuid';
import { Write } from "./Write";
import Rating from "./Rating";
import axiosInstance from "@/axios_interceptor/axios_interceptor";
import { SERVER_URL } from "@/constants";
import { CautionModal } from "./CautionModal";
import { reviewContentAtom } from "./reviewAtoms";
import { useRecoilValue } from "recoil";
import { ReviewModal } from "@/components/Modal/ReviewModal";

export function ReviewWrite(){
    const [fileList, setFileList] = useState([]);
    const [goods, setGoods] = useState({});
    const fileInput = useRef();
    const pathname = window.location.pathname;
    const goodsId = pathname.replace('/review/','');
    const goodsNo = goodsId.split("/")[1];
    const orderListNumber = goodsId.split("/")[0];
    const [modalOpen, setModalOpen] = useState(false);
    const [reviewModalOpen, setReviewModalOpen] = useState(false);
    const [count, setCount] = useState(0);
    const content = useRecoilValue(reviewContentAtom);
    const getGoodsInfo = () => {
        axiosInstance.get(SERVER_URL + 'product/detail/' + goodsNo)
        .then(res => setGoods(res.data))
        .catch()
    }

    const reviewSubmit = () => {
        const data = {
            fileList: fileList,
            content: content,
            count: count
        }

        axiosInstance.post(SERVER_URL + `review/${orderListNumber}/${goodsNo}`, data)
        .then(res => setReviewModalOpen(true))
        .catch();
    }

    const deleteFile = (e) => {
        let filtered = fileList.filter((element) => element !== e.target.id);
        setFileList(filtered);
    }

    useEffect(()=>{
        getGoodsInfo();
    }, []);

    useEffect(() => {},[reviewModalOpen]);

    const selectFile = (e) => {
        if(fileList.length === 5){
            setModalOpen(true);
            return;
        }
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
        
        const span = document.querySelector(".PreviewImage span");
        const imageRef = ref(storage, `post/${v4() + newImageFile.name}`);
        uploadBytes(imageRef, newImageFile.file).then((snaphsot) => {
          getDownloadURL(snaphsot.ref).then((url) => {
            console.log(url, 'URL');
            let newFileList = [...fileList];
            newFileList.push(url);
            setFileList(newFileList);
          });
        });
      }

    useEffect(() => {
    }, [fileList]);

    useEffect(() => {}, [modalOpen]);

    return(
        <>
            <Container>
                <p className='title'>이 상품에 대해 평가해주세요</p>
                <div className='goods'>
                    <div className='goods-middle'>
                        <Image src={goods.imageUrl} />
                        <div className='price-pname'>
                            <span style={{marginTop: '30px'}}>{goods.pname}</span>
                            <span>{goods.price}</span>
                        </div>
                    </div>
                    <Rating count={count} setCount={setCount}/>
                </div>

                <PostImageSection>
                    <div className='upload-section'>
                        <div className='middle'>
                            <label for='file'>
                                <div class="btn-upload">파일 업로드</div>
                            </label>
                            <input id='file' ref={fileInput} type='file' accept=".jpg,.jpeg,.png,.gif,.bmp" onChange={selectFile} className='file-choose' style={{display: 'none'}}></input>
                        </div>
                    </div>
                    <div className='picture-section'>
                        <p style={{margin: 'auto', display: fileList.length === 0? 'block': 'none'}}>파일을 5개까지 업로드 할 수 있어요</p>
                        {fileList.map((file, index) => 
                            <div className='image-article'>
                                <Image src={file} style={{width: '100px'}}></Image>
                                <div className='x-button' style={{cursor: 'pointer'}} id={file} onClick={deleteFile}>x</div>
                            </div>
                        )}
                    </div>
                    {modalOpen && <CautionModal setModalOpen={setModalOpen}></CautionModal>}
                </PostImageSection>
                <Write></Write>

                <div className="UploadBtnBox">
                    <button className="CancleBtn" >
                        취소
                    </button>
                    <button className="SubmitBtn" style={{backgroundColor: 'skyblue'}}onClick={reviewSubmit} >
                        등록
                    </button>
                </div>
                {reviewModalOpen && <ReviewModal setModalOpen={setReviewModalOpen}/>}
            </Container>
        </>
    )
}

const Container = styled.div`
    width: 1024px;
    margin: 100px auto;

    & .title {
        text-align: center;
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 30px;
    }

    & .goods {
        height: 150px;
        display: flex;
        justify-content: start;
        gap: 50px;

        & img {
            width: 100px;
            height: 100px;
        }

        & .price-pname {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
    }

    & .goods-middle {
        display: flex;
        gap: 20px;
        margin-left: 30px;
    }

    & .UploadBtnBox {
        width: 1024px;
        text-align: center;
        margin-top: 70px;
        display: flex;
        justify-content: center;
        gap: 10px;

        & button {
            background-color: rgb(85, 85, 85);
            color: white;
            padding: 10px;
            border: none;
            border-radius: 10px;
        }
    }
`

const PostImageSection = styled.div`
    display: flex;
    height: 120px;
    justify-content: space-between;

    & .upload-section {
        display: flex;
        justify-content: space-between;
    }

    & .middle {
        width: 150px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    & .picture-section {
        width: 900px;
        height: 120px;
        border: 1px solid black;
        border-radius: 10px;
    }

    & .btn-upload {
        background-color: rgb(85, 85, 85);
        color: white;
        font-size: 20px;
        padding: 10px;
        border-radius: 10px;
    }

    & img {
        border-radius: 10px;
        width: 100px;
        height: 100px;
        object-fit: cover;
    }

    & .x-button {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: pink;
        color: white;
        text-align: center;
        vertical-align: middle;
        position: absolute;
        top: 10px;
        left: 10px;
    }

    & .image-article {
        margin-top: 10px;
        position: relative;
    }

    & .picture-section {
        display: flex;
        justify-content: center;
        gap: 30px;
    }

    & .file-choose {
        border: none;
    }
    
`