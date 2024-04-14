"use client";

import { useState } from "react";
import { styled } from "styled-components";

export default function SurveyNew() {
  const [step, setStep] = useState(1);
  const enterKeyDown = (e: KeyboardEvent) => {
    console.log(e.key);
    if (e.key === "Enter") {
      setStep(step + 1);
    }
  };
  return (
    <StLayout>
      <StSurveyNewPage>
        {step === 1 && (
          <>
            <StQuestion>
              <StMainText>
                테스트를 보낼 때 사용할
                <br />
                본인의 이름을 입력해 <br />
                주세요
              </StMainText>
              <StSubText>
                꼭 본명이 아니어도 괜찮아요. <br />
                애칭이나 별명을 사용해도 문제 없어요!
              </StSubText>
            </StQuestion>
            <StAnswer
              placeholder="한 글자 이상 입력해주세요"
              onKeyDown={(e) => enterKeyDown(e)}
            ></StAnswer>
          </>
        )}
        {step === 2 && (
          <StMainText>
            어버이날 선물 후보에서
            <br />
            제외하고 싶은 항목은 <br />
            빼주세요
          </StMainText>
        )}
      </StSurveyNewPage>

      <StBackgroundDim />
    </StLayout>
  );
}
const StLayout = styled.div`
  display: flex;
  justify-content: center;
`;

const StSurveyNewPage = styled.main`
  padding: 3rem;
  z-index: 1;
  width: 39rem;
`;

const StBackgroundDim = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: black;
  opacity: 0.7;
  position: fixed;
`;

const StQuestion = styled.div`
  color: white;
`;

const StMainText = styled.p`
  font-size: 3.2rem;
  color: white;
  font-weight: 600;
  line-height: 137%;
  margin-bottom: 0.6rem;
`;

const StSubText = styled.p`
  font-size: 1.7rem;
  opacity: 0.8;
  line-height: 137%;
`;

const StAnswer = styled.input`
  width: 33rem;
  height: 5.3rem;
  -webkit-appearance: none;
  -moz-appearance: none;
  -o-appearance: none;
  appearance: none;

  margin-top: 4rem;
  border-radius: 0.6rem;
  box-shadow: none;
  background-color: transparent;
  border: 0.1rem solid white;
  padding: 1.5rem;

  font-size: 1.7rem;
  color: white;

  &::placeholder {
    color: white;
    opacity: 0.8;
  }

  &::-webkit-input-placeholder {
    color: white;
    opacity: 0.8;
  }

  &:focus {
    outline: none;
  }
`;
