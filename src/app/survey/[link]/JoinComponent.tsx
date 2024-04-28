"use client";

import CommonButton from "@/app/components/common/CommonButton";
import { linkDataI } from "@/app/interface";
import { styled } from "styled-components";
import { useEffect, useState } from "react";

function JoinComponent(props: linkDataI) {
  const { status, name, data } = props.linkData;
  const [isStarted, setIsStarted] = useState(true);
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [dataArray, setDataArray] = useState(JSON.parse(data));
  const [selectedArray, setSelectedArray] = useState<string[]>([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [result, setResult] = useState<string[]>(["", "", ""]);
  const [candidateArray, setCandidateArray] = useState<string[]>([]);

  const roundNum =
    JSON.parse(data).length % 2 === 0
      ? JSON.parse(data).length / 2
      : Math.floor(JSON.parse(data).length / 2) - 1;

  useEffect(() => {
    if (isStarted) {
      setTimeout(() => {
        setIsTestStarted(true);
      }, 3200);
    }
  }, [isStarted]);

  const select = (selectedIdx: number) => {
    setSelectedArray([...selectedArray, dataArray[selectedIdx]]);

    if (dataArray.length > 1) {
      // dataArray에서 선택된 요소를 제외한 나머지 요소로 업데이트
      setDataArray(dataArray.slice(2));
    }

    if (currentRound > roundNum) {
      //번외 라운드면
      setResult([result[0], result[1], dataArray[selectedIdx]]);
    }
  };

  useEffect(() => {
    console.log("==========");
    console.log(currentRound + "/" + roundNum);

    // 준결승전
    if (currentRound === roundNum - 1 && candidateArray.length === 0) {
      // 3등 될 수 있는 요소들이 이제 정해졌따
      setCandidateArray(dataArray);
    }

    // 결승전
    if (
      dataArray.length === 2 &&
      currentRound === roundNum &&
      selectedArray.length === 0
    ) {
      setResult([dataArray[0], dataArray[1], ""]);
    } else if (currentRound == roundNum && selectedArray.length == 1) {
      // 1등, 2등 정해짐
      setCurrentRound(currentRound + 1); //번외 라운드 시작
      if (selectedArray[0] != result[0]) {
        const tmp = result[0];
        setResult([selectedArray[0], tmp, ""]);
      }

      // 3등 정하기 시작
      const updatedCandidateArray = candidateArray.filter(
        (item: string) => item !== result[0] && item !== result[1]
      );
      console.log("필터 완료 " + updatedCandidateArray);
      setCandidateArray(updatedCandidateArray);
      if (candidateArray.length === 1) {
        // 홀수
        setResult([result[0], result[1], updatedCandidateArray[0]]);
      } else {
        // 2개면 한 번 더 선택해야 함
        setDataArray(updatedCandidateArray);
      }
    } else {
      if (dataArray.length === 1) {
        // dataArray에 요소가 홀수라 하나만 남았을 때 가장 마지막 꺼는 부전승
        console.log("부전승");
        // 선택된 요소를 selectedArray에 추가
        setSelectedArray([...selectedArray, dataArray[0]]);
        // dataArray에서 선택된 요소를 제거
        setDataArray([]);
      }

      if (dataArray.length == 0) {
        // n 번째 라운드의 마지막 선택이면.
        // TODO : dataArray 랜덤하게 섞기
        setCurrentRound(currentRound + 1);
        setDataArray([...selectedArray]);
        setSelectedArray([]);
      }
    }
  }, [dataArray, candidateArray]);

  useEffect(() => {
    if (result[0] != "" && result[1] != "" && result[2] != "") {
      console.log("최종 " + result); //최종 최종~~
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
          {!isTestStarted ? (
            <IntroText>
              두 가지 물건 중 <br /> 더 받고 싶은 선물을 <br />
              선택해주세요!
            </IntroText>
          ) : (
            <>
              <StOption onClick={() => select(0)}>{dataArray[0]}</StOption>
              <StOption onClick={() => select(1)}>{dataArray[1]}</StOption>
            </>
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

const StOption = styled.div`
  width: 33rem;
  height: 24rem;
  background-color: white;
  font-size: 2.4rem;
  margin-top: 2.4rem;
`;
