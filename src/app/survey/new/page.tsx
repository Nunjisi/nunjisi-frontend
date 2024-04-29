"use client";

import { useEffect, useState } from "react";
import { styled } from "styled-components";
import CommonButton from "@/app/components/common/CommonButton";
import { optionList } from "@/app/util/optionList";
import Option from "@/app/components/common/Option";
import CreateComplete from "@/app/components/surveyNew/CreateComplete";
import axios from "axios";

export default function SurveyNew() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [isAllSelected, setIsAllSelected] = useState(true);
  const [selectedOptionList, setSelectedOptionList] = useState(
    optionList.map((item) => item.text)
  );
  const [isMinimumOptionSelected, setIsMinimumOptionSelected] = useState(
    selectedOptionList.length >= 4
  );
  const [createdLink, setCreatedLink] = useState("");

  const enterKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      setStep(step + 1);
    }
  };

  const handleSelectOption = (text: string) => {
    if (selectedOptionList.includes(text)) {
      setSelectedOptionList(selectedOptionList.filter((item) => item !== text));
    } else {
      setSelectedOptionList([...selectedOptionList, text]);
    }
  };

  const createTest = async () => {
    // todo : 테스트 만들기 성공시 step + 1
    await axios
      .post(process.env.NEXT_PUBLIC_API_BASE_URL + "/survey", {
        name: name,
        option: JSON.stringify(selectedOptionList),
      })
      .then((res) => {
        console.log(res.data.data.link);
        setCreatedLink(res.data.data.link);
        setStep(step + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    selectedOptionList.length < 2
      ? setIsMinimumOptionSelected(false)
      : setIsMinimumOptionSelected(true);
  }, [selectedOptionList]);

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
              onChange={(e) => setName(e.target.value)}
            ></StAnswer>
          </>
        )}
        {step === 2 && (
          <>
            <StMainText>
              어버이날 선물 후보에서
              <br />
              제외하고 싶은 항목은 <br />
              빼주세요
            </StMainText>
            {isAllSelected ? (
              <CommonButton
                text="모두 선택 해제하기"
                color="semi-black"
                className="allSelectToggleButton"
                handler={() => {
                  setIsAllSelected(false);
                  setSelectedOptionList([]);
                }}
              />
            ) : (
              <CommonButton
                text="모두 선택하기"
                color="semi-white"
                className="allSelectToggleButton"
                handler={() => {
                  setIsAllSelected(true);
                  setSelectedOptionList(optionList.map((item) => item.text));
                }}
              />
            )}

            {optionList.map((item, index) => {
              return (
                <div
                  key={item.text}
                  onClick={() => handleSelectOption(item.text)}
                >
                  <Option
                    text={item.text}
                    imgSrc={item.imgSrc}
                    state={isAllSelected}
                    isLastComponent={index === optionList.length - 1}
                  />
                </div>
              );
            })}
            {isMinimumOptionSelected ? (
              <CommonButton
                text="테스트 만들기"
                color="white"
                className="bottomButton"
                handler={createTest}
              />
            ) : (
              <CommonButton
                text="항목을 네 개 이상 선택해주세요"
                color="gray"
                className="disabled bottomButton"
              />
            )}
          </>
        )}
        {step === 3 && <CreateComplete name={name} link={createdLink} />}
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
  width: 100vw;
  max-width: 39rem;
  height: 100%;

  .allSelectToggleButton {
    margin: 4rem 0 2.4rem 0;
  }

  .bottomButton {
    margin: 2.4rem 0 7rem 0;
  }
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
