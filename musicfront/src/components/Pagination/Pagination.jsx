import React from "react";
import { Page } from "./Page";
import {useParams, useSearchParams} from "react-router-dom";

export function Pagination(props) {
  const [searchParams] = useSearchParams();

  const {username} = useParams();
  const tag = searchParams.get("tag");
  // page가 없으면 1을 기본값으로 사용
  const page = parseInt(searchParams.get("page"), 10) || 1;

  const columns=[
    {
      lastPage: props.posts.lastPage,
      posts: props.posts.posts,
    }
  ]

  // 포스트 데이터가 없거나 로딩 중이면 아무것도 보여주지 않음
  if (!props.posts) return null;

  return <Page tag={tag} username={username} page={parseInt(page, 10)} lastPage={props.posts.lastPage} />;
}
