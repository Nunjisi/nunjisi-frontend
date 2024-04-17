import styled from "styled-components";
import ImageDiv from "./ImageDiv";
import { useEffect, useState } from "react";

interface OptionI {
  text: string;
  imgSrc: string;
  state: boolean;
  isLastComponent: boolean;
}

function Option(props: OptionI) {
  const { text, imgSrc, state, isLastComponent } = props;
  const [currentState, setCurrentState] = useState(state);

  useEffect(() => {
    setCurrentState(state);
  }, [state]);

  return (
    <div>
      <OptionComponent
        onClick={() => {
          setCurrentState((prev) => !prev);
        }}
      >
        <StInfo>
          <ImageDiv
            src={imgSrc}
            alt={text}
            className="image"
            width={60}
            height={60}
          />
          <p>{text}</p>
        </StInfo>

        {currentState ? (
          <ImageDiv
            src="/selected_icon.svg"
            alt="선택함"
            width={30}
            height={30}
          />
        ) : (
          <ImageDiv
            src="/not_selected_icon.svg"
            alt="선택안함"
            width={30}
            height={30}
          />
        )}
      </OptionComponent>
      {!isLastComponent && <StBorderLine />}
    </div>
  );
}

const OptionComponent = styled.div`
  width: 32.6rem;
  height: 6rem;
  margin: 1.6rem 0 1.6rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .image {
    border-radius: 80%;
    overflow: hidden;
  }
`;

const StInfo = styled.div`
  display: flex;
  align-items: center;

  p {
    font-size: 1.6rem;
    color: white;
    margin-left: 2rem;
  }
`;

const StBorderLine = styled.div`
  width: 100%;
  height: 0.05rem;
  background-color: white;
  opacity: 50%;
`;

export default Option;
