import { styled } from "styled-components";
import ImageDiv from "../common/ImageDiv";
import { optionList } from "@/app/util/optionList";
import CommonButton from "../common/CommonButton";

interface joinResultPropsI {
  result: string[];
}

function JoinResultComponent(props: joinResultPropsI) {
  const { result } = props;
  return (
    <StJoinResultComponent>
      <StResultTitle>넌지시- 테스트 결과</StResultTitle>
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
      <StInfoText>
        이제 정은님도 결과를 확인할 수 있어요. <br />
        설문을 마쳤다고 전해주세요.
      </StInfoText>
      <CommonButton
        text="전하러 가기"
        color="white"
        className="closeButton"
        handler={() => {
          window.close();
        }}
      />
    </StJoinResultComponent>
  );
}

export default JoinResultComponent;

const StJoinResultComponent = styled.div`
  .closeButton {
    position: absolute;
    bottom: 3rem;
  }
`;

const StResultTitle = styled.p`
  font-size: 3.2rem;
  color: white;
  font-weight: 700;
  margin: 10vh 0 2rem 0;
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
  position: absolute;
  width: 100%;
  left: 50%;
  transform: translateX(-50%);
  bottom: 9.7rem;
  text-align: center;
`;
