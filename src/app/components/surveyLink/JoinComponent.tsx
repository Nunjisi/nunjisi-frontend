"use client";

import CommonButton from "@/app/components/common/CommonButton";
import { linkDataI } from "@/app/interface";
import { css, styled } from "styled-components";
import { useEffect, useState } from "react";
import { optionList } from "@/app/util/optionList";
import ImageDiv from "../common/ImageDiv";
import JoinResultComponent from "./JoinResultComponent";

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
  const [isMoreRound, setIsMoreRound] = useState(false);

  useEffect(() => {
    if (isStarted) {
      setTimeout(() => {
        setIsSurveyStarted(true);
      }, 3200);
    }
  }, [isStarted]);

  const length = JSON.parse(data).length;
  const roundlength =
    (length - 1) % 4 == 0 || (length - 1) % 4 == 1 ? length - 1 : length;

  const select = (selectedIdx: number) => {
    // 추가 라운드
    if (isMoreRound) {
      setResult([result[0], result[1], dataArray[selectedIdx]]);
      setDataArray(dataArray.slice(2));
    }

    setSelectedArray((prev) => [...prev, dataArray[selectedIdx]]);
    setCurrentRound((prev) => prev + 1);

    if (currentRound == length - 2) {
      console.log("결승전");

      // 결승전

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

      if (isMoreRound) {
        // 3등 결정 전 한 번 더 추가.
        console.log("herere");
        setResult([
          dataArray[selectedIdx],
          dataArray[selectedIdx == 0 ? 1 : 0],
          "",
        ]);
        console.log("3등 결정전 추가");
        console.log(
          candidateArray.filter((v) => v !== dataArray[0] && v !== dataArray[1])
        );
        setDataArray(
          candidateArray.filter((v) => v !== dataArray[0] && v !== dataArray[1])
        );
        setIsMoreRound(true);
        return;
      }
    }

    // 3등 후보 결정
    if (dataArray.length == 3 && currentRound + 2 == length - 1) {
      setDataArray((prev) => [dataArray[selectedIdx], dataArray[2]]);
      setCandidateArray(dataArray);
    } else if (dataArray.length == 4 && currentRound + 3 == length - 1) {
      setCandidateArray(dataArray);
      setIsMoreRound(true);
    }

    // 부전승
    if (dataArray.length == 3 && currentRound < length - 2) {
      console.log("부전승 " + dataArray[2]);
      setDataArray([...selectedArray, dataArray[selectedIdx], dataArray[2]]);
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
    if (result[0] !== "" && result[1] !== "" && result[2] !== "") {
      console.log("최종 결과 " + result);
      setIsSurveyDone(true);
    }
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
              <StOptionContainer>
                {optionList.map((option) => {
                  return (
                    option.text == dataArray[0] && (
                      <StOption
                        key={option.text}
                        onClick={() => select(0)}
                        color={option.color}
                      >
                        <ImageDiv
                          src={option.imgSrc}
                          width={330}
                          height={190}
                          alt={option.text}
                        />
                        <p>{option.text}</p>
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
                        <ImageDiv
                          src={option.imgSrc}
                          width={330}
                          height={190}
                          alt={option.text}
                        />
                        <p>{option.text}</p>
                      </StOption>
                    )
                  );
                })}
              </StOptionContainer>

              <StProgressBar
                currentround={currentRound}
                roundlength={roundlength}
              >
                테스트 진행중
              </StProgressBar>
            </>
          ) : (
            <JoinResultComponent result={result} />
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

const StOptionContainer = styled.div`
  margin-top: 5.4rem;
`;

const StOption = styled.div<{ color: string }>`
  width: 33rem;
  height: 24rem;
  background-color: ${(props) => props.color};
  font-size: 2.2rem;
  color: white;
  margin-top: 2.4rem;
  border-radius: 0.8rem;
  overflow: hidden;
  font-weight: 500;

  & > p {
    margin: 0.5rem 0 0 1.6rem;
  }
`;

const StProgressBar = styled.div<{ currentround: number; roundlength: number }>`
  width: 33rem;
  height: 4.8rem;
  background-color: #686868;
  color: white;
  font-size: 1.5rem;
  border-radius: 0.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 3rem;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${(props) => (props.currentround / props.roundlength) * 100}%;
    background-color: black;
    border-radius: 0.8rem 0 0 0.8rem;
    transition: width 0.5s linear; /* Smooth transition */
    color: white;
  }

  &::after {
    /* 흰색 텍스트를 추가하는 가상 요소 */
    content: "테스트 진행중"; /* 텍스트 내용 */
    position: absolute;
    color: white; /* 텍스트 색상을 흰색으로 설정 */
  }

  color: white;
  font-size: 1.5rem;
`;
