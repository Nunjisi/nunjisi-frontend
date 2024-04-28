"use client";

import CommonButton from "@/app/components/common/CommonButton";
import { linkDataI } from "@/app/interface";
import { styled } from "styled-components";
import { useEffect, useState } from "react";
import { optionList } from "@/app/util/optionList";

function JoinComponent(props: linkDataI) {
  const { status, name, data } = props.linkData;
  const [isStarted, setIsStarted] = useState(true);
  const [isSurveyStarted, setIsSurveyStarted] = useState(false);
  const [isSurveyDone, setIsSurveyDone] = useState(false);

  const [dataArray, setDataArray] = useState<string[]>(JSON.parse(data));
  const [selectedArray, setSelectedArray] = useState<string[]>([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [result, setResult] = useState<string[]>(["", "", ""]);
  const [candidateArray, setCandidateArray] = useState<string[]>([]);
  const [isGroupA, setIsGroupA] = useState(true);

  useEffect(() => {
    if (isStarted) {
      setTimeout(() => {
        setIsSurveyStarted(true);
      }, 3200);
    }
  }, [isStarted]);

  const length = JSON.parse(data).length;

  useEffect(() => {
    (length - 1) % 4 == 0 || (length - 1) % 4 == 1
      ? setIsGroupA(true) //A 면 추가라운드 필요 x, B 면 추가 라운드 필요 o
      : setIsGroupA(false);
  }, [length]);

  const select = (selectedIdx: number) => {
    setSelectedArray((prev) => [...prev, dataArray[selectedIdx]]);
    setCurrentRound((prev) => prev + 1);

    if (isGroupA && currentRound == length - 2) {
      // 결승전
      console.log("결승전");
      const thirdPlace = candidateArray.filter(
        (v) =>
          v !== dataArray[selectedIdx] &&
          v !== dataArray[selectedIdx == 0 ? 1 : 0]
      )[0];
      setResult([
        dataArray[selectedIdx],
        dataArray[selectedIdx == 0 ? 1 : 0],
        thirdPlace,
      ]); // 1등, 2등, 3등 결정
    }

    if (dataArray.length == 3) {
      console.log("부전승");
      //부전승 올리고 다음 라운드 시작
      if (isGroupA) {
        setCandidateArray(dataArray); // 3등 후보 결정
      }

      setDataArray((prev) => [dataArray[selectedIdx], dataArray[2]]);
      setSelectedArray([]);
    } else if (dataArray.length > 1) {
      setDataArray(dataArray.slice(2));
    }
  };

  useEffect(() => {
    console.log("=======================");
    console.log(dataArray);
    console.log(selectedArray);
    console.log(candidateArray);
    console.log(result);
    console.log(currentRound);

    if (selectedArray.length !== 1 && dataArray.length == 0) {
      //한 라운드가 끝났다면, 다음 라운드 시작
      setDataArray(selectedArray);
      setSelectedArray([]);
    }
  }, [dataArray]);

  useEffect(() => {
    console.log("result " + result);
  }, [result]);

  return (
    <>
      {!isStarted ? (
        <StLayout>
          <Text>
            {name}님이 <br />
            부모님을 위해 만든 <br />
            <span className="underline">온라인 테스트</span>예요.
          </Text>
          <CommonButton
            text="시작하기"
            color="black"
            className="startSurveyButton"
            handler={() => setIsStarted(true)}
          >
            <MiniText>10분이면 끝!</MiniText>
          </CommonButton>
        </StLayout>
      ) : (
        <StLayoutDim>
          {!isSurveyStarted ? (
            <IntroText>
              두 가지 물건 중 <br /> 더 받고 싶은 선물을 <br />
              선택해주세요!
            </IntroText>
          ) : !isSurveyDone ? (
            <>
              {optionList.map((option) => {
                return (
                  option.text == dataArray[0] && (
                    <StOption
                      key={option.text}
                      onClick={() => select(0)}
                      color={option.color}
                    >
                      {option.text}
                    </StOption>
                  )
                );
              })}
              {optionList.map((option) => {
                return (
                  option.text == dataArray[1] && (
                    <StOption
                      key={option.text}
                      onClick={() => select(1)}
                      color={option.color}
                    >
                      {option.text}
                    </StOption>
                  )
                );
              })}
            </>
          ) : (
            <>넌지시- 테스트 결과</>
          )}

          <StBackgroundDim />
        </StLayoutDim>
      )}
    </>
  );
}

export default JoinComponent;

const StLayout = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -10.8rem; /* 하단 버튼 고려 위치 조정 */
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: white;

  .startSurveyButton {
    position: absolute;
    bottom: -7.8rem;
  }
`;

const Text = styled.p`
  text-align: center;
  font-size: 3.2rem;
  font-weight: 700;
  line-height: 137%;
  color: #1f6200;

  .underline {
    text-decoration: underline;
    text-underline-offset: 0.5rem;
  }
`;

const MiniText = styled.div`
  width: 8.7rem;
  height: 2.45rem;
  position: absolute;
  right: 2rem;
  top: -1rem;
  color: black;
  background-color: #1aee16;
  border-radius: 2.4rem;
  font-size: 1.4rem;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IntroText = styled.p`
  text-align: center;
  font-size: 3.2rem;
  font-weight: 700;
  color: white;
  position: absolute;
  top: 40%;
  line-height: 137%;

  opacity: 0;
  animation: fadeInOut 3.2s linear forwards;

  @keyframes fadeInOut {
    0% {
      opacity: 0;
    }
    30% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

const StLayoutDim = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StBackgroundDim = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: black;
  opacity: 0.7;
  position: fixed;
  z-index: -1;
`;

const StOption = styled.div<{ color: string }>`
  width: 33rem;
  height: 24rem;
  background-color: ${(props) => props.color};
  font-size: 2.4rem;
  margin-top: 2.4rem;
`;
