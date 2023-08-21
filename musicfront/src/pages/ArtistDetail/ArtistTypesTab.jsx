import {useState, useEffect} from "react";
import {atom, useRecoilState} from "recoil";
import styled from "styled-components";
import {Button} from "@/components";

const artistbuttonClassAtom = atom({
  key: "artistbuttonClass",
  default: "stateClass",
});

const typeList = ["곡", "앨범"];

export function ArtistTypesTab({onSelectType}) {
  const [isActive, setIsActive] = useState({
    곡: true,
    앨범: false,
  });
  const [, setArtistStateClass] = useRecoilState(artistbuttonClassAtom);

  useEffect(() => {
    const className = isActive ? "active" : "";
    setArtistStateClass(`stateClass ${className}`);
  }, [isActive, setArtistStateClass]);

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
