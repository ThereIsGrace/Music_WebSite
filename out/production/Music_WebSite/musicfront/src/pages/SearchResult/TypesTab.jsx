import {useState, useEffect} from "react";
import {atom, useRecoilState} from "recoil";
import styled from "styled-components";
import {Button} from "@/components";

const sbuttonClassAtom = atom({
  key: "buttonClassAtom",
  default: "stateClass",
});

const typeList = ["전체", "곡", "앨범", "아티스트", "가사"];

export function TypesTab({onSelectType}) {
  const [isActive, setIsActive] = useState({
    전체: true, // 첫 마운트 시 "전체" 버튼 활성화
    곡: false,
    앨범: false,
    아티스트: false,
    가사: false,
  });
  const [, setStateClass] = useRecoilState(sbuttonClassAtom);

  useEffect(() => {
    const className = isActive ? "active" : "";
    setStateClass(`stateClass ${className}`);
  }, [isActive, setStateClass]);

  const handleClick = (type) => {
    const updatedIsActive = {};
    for (const key in isActive) {
      updatedIsActive[key] = false;
    }
    setIsActive({...updatedIsActive, [type]: true});
    onSelectType(type);
  };

  return (
    <StyledStoreButtons>
      {typeList.map((type, i) => (
        <Button key={i} className={isActive[type] ? "active" : ""} onClick={() => handleClick(type)}>
          {type}
        </Button>
      ))}
    </StyledStoreButtons>
  );
}

const StyledStoreButtons = styled.div`
  display: flex;
  margin-top: 40px;
  gap: 8px;
  justify-content: center;

  & button {
    padding: 8px 18px 10px;
    background-color: white;
    height: 38px;
    border: 1px solid #eaebee;
    border-radius: 100px;
  }

  & button.active {
    color: white;
    background: #4d5159;
    border: 1px solid #4d5159;
  }
`;
