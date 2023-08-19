import {Routes, Route} from "react-router-dom";
import {Home, Login, ProductDetail, Register, Mypage, Post, PopularSong, Board, BoardDetail, SearchResult, SongDetail} from "@/pages";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/productDetail/:id" element={<ProductDetail />} />
        <Route path="/post" element={<Post />} />
        <Route path="/search" element={<SearchResult />} />
        <Route path="/popular" element={<PopularSong />} />
        <Route path="/board" element={<Board />} />
        <Route path="/board/:id" element={<BoardDetail />} />
        <Route path="/songDetail/:id" element={<SongDetail />} />
      </Routes>
    </div>
  );
}

export default App;
