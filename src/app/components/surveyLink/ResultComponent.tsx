"use client";

import { linkDataI } from "@/app/interface";
import { optionList } from "@/app/util/optionList";
import { styled } from "styled-components";
import ImageDiv from "../common/ImageDiv";

function ResultComponent(props: linkDataI) {
  const { status, name, data } = props.linkData;
  const result = JSON.parse(data);
  return (
    <>
      <StResultComponent>
        <StInfoText>넌지시- 물어봤어요</StInfoText>
        <StResultTitle>
          {name}님의 부모님께서 <br />
          가장 받고 싶은 선물
        </StResultTitle>
        <StResultContainer>
          {optionList.map((option) => {
            return (
              option.text == result[0] && (
                <>
                  <StImageWrapper className="first" key={option.text}>
                    <ImageDiv
                      src={option.imgSrc}
                      width={161.2}
                      height={161.2}
                      alt={option.text}
                      style={{ objectFit: "cover" }}
                    />
                  </StImageWrapper>

                  <StFirstPlace>
                    <p>1위</p>
                    <p>{option.text}</p>
                  </StFirstPlace>
                </>
              )
            );
          })}

          {optionList.map((option) => {
            return (
              <>
                {option.text == result[1] && (
                  <StOtherPlace>
                    <StImageWrapper className="other">
                      <ImageDiv
                        src={option.imgSrc}
                        width={82.5}
                        height={82.5}
                        alt={option.text}
                        style={{ objectFit: "cover" }}
                      />
                    </StImageWrapper>
                    <StOtherPlaceText>
                      <p>2위</p>
                      <p>{option.text}</p>
                    </StOtherPlaceText>
                  </StOtherPlace>
                )}
              </>
            );
          })}
          {optionList.map((option) => {
            return (
              <>
                {option.text == result[2] && (
                  <StOtherPlace>
                    <StImageWrapper className="other">
                      <ImageDiv
                        src={option.imgSrc}
                        width={82.5}
                        height={82.5}
                        alt={option.text}
                        style={{ objectFit: "cover" }}
                      />
                    </StImageWrapper>
                    <StOtherPlaceText>
                      <p>3위</p>
                      <p>{option.text}</p>
                    </StOtherPlaceText>
                  </StOtherPlace>
                )}
              </>
            );
          })}
        </StResultContainer>
      </StResultComponent>
      <StBackgroundDim />
    </>
  );
}

export default ResultComponent;

const StResultComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StResultTitle = styled.p`
  font-size: 3.2rem;
  color: white;
  font-weight: 700;
  margin: 0.7rem 0 2rem 0;
  text-align: center;
`;

const StResultContainer = styled.div`
  width: 34rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
`;

const StImageWrapper = styled.div`
  overflow: hidden;

  &.first {
    border-radius: 0.8rem;
    width: 16.12rem;
    height: 16.12rem;
  }

  &.other {
    border-radius: 0.8 0 0 0.8rem;
    width: 8.25rem;
    height: 8.25rem;
  }
`;

const StFirstPlace = styled.div`
  width: 16.12rem;
  height: 16.12rem;
  background-image: url("/firstPlaceBackground.svg");
  padding: 8.7rem 0 0 1.2rem;

  & > p:first-of-type {
    font-size: 1.8rem;
    margin-bottom: 0.6rem;
  }

  & > p:nth-of-type(2) {
    font-size: 2.5rem;
    font-weight: 700;
  }
`;

const StOtherPlace = styled.div`
  width: 33rem;
  height: 8.25rem;
  display: flex;
  background-color: #5b6639;
  border-radius: 0.8rem;
  overflow: hidden;
  color: #d5ff7b;
`;

const StOtherPlaceText = styled.div`
  padding: 1.5rem 0 0 1.2rem;

  & > p:first-of-type {
    font-size: 1.6rem;
    margin-bottom: 0.2rem;
  }

  & > p:nth-of-type(2) {
    font-size: 2.4rem;
    font-weight: 500;
  }
`;

const StInfoText = styled.p`
  opacity: 0.8;
  color: white;
  font-size: 1.7rem;
  margin-top: 10vh;
  text-align: center;
`;

const StBackgroundDim = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: black;
  opacity: 0.7;
  position: fixed;
  z-index: -1;
`;
