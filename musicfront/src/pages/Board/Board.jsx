import {Footer, Header} from "@/components";
import {PostList} from "@/pages/Board";
import {useEffect} from "react";
import {SERVER_URL} from "@/constants";
import {useRecoilState} from "recoil";
import {boardAtom} from "./boardAtom";

export function Board() {
  const [board, setBoard] = useRecoilState(boardAtom);

  const fetchlist = () => {
    fetch(SERVER_URL + "api/boards")
      .then((response) => response.json())
      .then((data) => setBoard(data._embedded.boards))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchlist();
  }, []);

  // Mock data용 useEffect
  // useEffect(()=>{
  // 	let arr = [];
  // 	for (let i = 0; i < 10; i++) {
  // 		const record= {
  // 			b_id: i,
  // 			title: "titletest"+i,
  // 			writer: "test"+i,
  // 			content: "contenttestcontenttestcontenttestcontenttestcontenttest"+i,
  // 			updatedate: "2023-08-11"
  // 		};
  // 		arr.push(record);
  // 	};
  // 	setBoard(arr);
  // 	fetchlist();
  // }, [])

  useEffect(() => {
    console.log(board);
  }, [board]);

  return (
    <>
      <Header />
      <PostList />
      <Footer />
    </>
  );
}
