import { Footer, Header } from "@/components";
import { Helmet } from "react-helmet-async";
import { OrderBody } from "./OrderBody";

export default function OrderList(){
    return(
        <>
            <Helmet>
                <title>MusicCat 주문내역</title>
                <meta name="description" content="뮤직 커뮤니티 사이트" />
                <meta name="keywords" content="음악, 커뮤니티, DJ, TURN THE TABLE" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta property="og:site_name" content="MusicCat" />
                <meta property="og:locale" content="ko-KR" />
                <meta property="og:title" content="MusicCat! 주문내역" />
                <meta property="og:url" content="" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="" />
                <meta property="og:description" content="뮤직 커뮤니티 사이트" />
            </Helmet>
            <Header/>
            <OrderBody/>
            <Footer/>
        </>


    )
}