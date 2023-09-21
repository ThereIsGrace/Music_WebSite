import {Routes, Route} from "react-router-dom";
import {Home, Login, ProductDetail, Register, Mypage, Post, PopularSong, Board, BoardDetail, SearchResult, SongDetail, RecentSong, AlbumDetail, ArtistDetail} from "@/pages";
import 'bootstrap/dist/css/bootstrap.min.css';
import Test from "./pages/test";
import WriteThing from "./pages/QuillEditor/WriteThing";
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
        <Route path="/albumDetail/:id" element={<AlbumDetail />} />
        <Route path="/artist/:id" element={<ArtistDetail />} />
        <Route path="/recent" element={<RecentSong />} />
        <Route path="/test" element={<Test></Test>}></Route>
        <Route path="/write" element={<WriteThing></WriteThing>}></Route>
      </Routes>
    </div>
  );
}

export default App;
