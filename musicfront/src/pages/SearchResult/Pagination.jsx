import React from "react";
import {Page} from "@/pages/SearchResult";

export function Pagination(props) {
  // 포스트 데이터가 없거나 로딩 중이면 아무것도 보여주지 않음
  if (!props.lyrics) return null;

  return <Page lastPage={props.lyrics.totalPage} />;
}
