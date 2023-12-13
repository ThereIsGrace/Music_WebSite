import { useEffect, useState } from "react";
import { Write } from "./Write";
import { SERVER_URL } from "@/constants";
import axiosInstance from "@/axios_interceptor/axios_interceptor";

export function WriteSection() {
    const [board, setBoard] = useState({});
    const [boardExists, setBoardExists] = useState(false);
    const [title, setTitle] = useState('');

  
    return(
        <>
            <Write />
        </>
        
    )

}