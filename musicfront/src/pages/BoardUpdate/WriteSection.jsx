import { useEffect, useState } from "react";
import { Write } from "./Write";
import { SERVER_URL } from "@/constants";
import axiosInstance from "@/axios_interceptor/axios_interceptor";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { updatedContentAtom, updatedTitleAtom } from "./boardUpdateAtoms";

export function WriteSection() {
    const [board, setBoard] = useState({});
    const [boardExists, setBoardExists] = useState(false);
    const [postContent, setPostContent] = useRecoilState(updatedContentAtom);
    const [title, setTitle] = useRecoilState(updatedTitleAtom);
    const b_id = window.location.pathname.replace('/board/update/', '');
  
    useEffect(() => {
      updateBoard();
    }, []);

    const updateBoard = () => {
        
        console.log('board update 모드');
        axiosInstance.get(SERVER_URL + 'board/updateTrial?b_id=' + b_id)
        .then(res => {console.log(res); setBoard(res.data); setBoardExists(true); setTitle(res.data.title); setPostContent(res.data.content)})
        .catch();
        
    }

    useEffect(() => {}, [title, postContent]);

    return(
        <>
            {boardExists && <Write board={board}/>}
        </>
        
    )

}