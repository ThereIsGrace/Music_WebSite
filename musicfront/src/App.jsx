import {Routes, Route} from "react-router-dom";
import {Home, Login, ProductDetail, Register, Mypage, Post, PopularSong, Board, BoardDetail, SearchResult, SongDetail, RecentSong, AlbumDetail, ArtistDetail} from "@/pages";
import 'bootstrap/dist/css/bootstrap.min.css';
import Test from "./pages/test";
import ShopMain from "./pages/Shop/ShopMain";
import { RegGoods } from "./pages/RegGoods";
import { BoardWrite } from "./pages/BoardWrite/BoardWrite";
import { ProductHome } from "./pages/ProductHome/ProductHome";
import SocialLogin from "./pages/SocialLogin/SocialLogin";
import Rating from "./pages/Star/Rating";
import Cart from "./pages/Cart/Cart";
import { BoardUpdate } from "./pages/BoardUpdate/BoardUpdate";
import OrderList from "./pages/OrderList/OrderList";
import { Review } from "./pages/Review/Review";
import { InfoWrite } from "./pages/InfoWrite/InfoWrite";
import { QueryClient,QueryClientProvider } from "@tanstack/react-query";
function App() {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/productDetail/:id" element={<ProductDetail />} exact/>
          <Route path="/post" element={<Post />} />
          <Route path="/search" element={<SearchResult />} />
          <Route path="/popular" element={<PopularSong />} />
          <Route path="/board" element={<Board />} />
          <Route path="/board/:id" element={<BoardDetail />} />
          <Route path="/songDetail/:id" element={<SongDetail />} />
          <Route path="/albumDetail/:id" element={<AlbumDetail />} />
          <Route path="/artist/:id" element={<ArtistDetail />} />
          <Route path="/recent" element={<RecentSong />} />
          <Route path="/register/goods" element={<RegGoods></RegGoods>}/>
          <Route path="/board/write" element={<BoardWrite></BoardWrite>} />
          <Route path="/board/update/:id" element={<BoardUpdate></BoardUpdate>} />
          <Route path="/goods/shop" element={<ProductHome></ProductHome>} />
          <Route path="/album" element={<ProductHome></ProductHome>} />
          <Route path="/lightStick" element={<ProductHome></ProductHome>} />
          <Route path="/photoCard" element={<ProductHome></ProductHome>} />
          <Route path="/ticket" element={<ProductHome></ProductHome>} />
          <Route path="/garment" element={<ProductHome></ProductHome>} />
          <Route path="/stationery" element={<ProductHome></ProductHome>} />
          <Route path="/socaillogin" element={<SocialLogin></SocialLogin>} />
          <Route path="/rating" element={<Rating></Rating>} />
          <Route path="/cart" element={<Cart></Cart>} />
          <Route path="/orderList" element={<OrderList></OrderList>} />
          <Route path="/review/:id/:id" element={<Review></Review>} />
          <Route path="/info/write" element={<InfoWrite></InfoWrite>} />
        </Routes>
      </div>
    </QueryClientProvider>
  );
}

export default App;
