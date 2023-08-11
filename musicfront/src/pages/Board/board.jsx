import { Footer, Header } from "@/components";
import { PostList } from "@/pages/Board";
import { useEffect, useState } from "react";

export function Board(){
	const [board, setBoard] = useState([]);

	// Mock data용 useEffect
	useEffect(()=>{
		let arr = [];
		for (let i = 0; i < 10; i++) {
			const record= {
				b_id: i,
				title: "titletest"+i,
				writer: "test"+i,
				content: "contenttestcontenttestcontenttestcontenttestcontenttest"+i,
				updatedate: "2023-08-11"
			};
			arr.push(record);
		};
		setBoard(arr);
	}, [])

	


	return (
		<>
			<Header />
			<PostList board={board} />
			<Footer />
		</>
	)
}
