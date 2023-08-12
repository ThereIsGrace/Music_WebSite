import {Routes, Route} from "react-router-dom";
import {Home, Login, ProductDetail, Register, Mypage, Post, PopularProduct, Board} from "@/pages";

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
        <Route path="/popularProduct" element={<PopularProduct />} />
        <Route path="/board" element={<Board />} />
        {/* <Route path="/board/:id" element={} /> */}
      </Routes>
    </div>
  );
}

export default App;
