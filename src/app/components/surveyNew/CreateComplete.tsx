import styled from "styled-components";
import ImageDiv from "../common/ImageDiv";
import CommonButton from "../common/CommonButton";
interface CreateCompleteI {
  name: string;
  link: string;
}

function CreateComplete(props: CreateCompleteI) {
  const { name, link } = props;

  const doCopy = () => {
    const copyLink = process.env.NEXT_PUBLIC_URL + "/survey/" + link;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(copyLink);
      alert("링크를 복사했습니다.");
    } else {
      alert("복사하기를 지원하지 않는 브라우저입니다.");
    }
  };

  return (
    <CreateCompleteComponent>
      <div>
        <ImageDiv
          src="/create_complete_icon.svg"
          width={60}
          height={60}
          alt="테스트 생성 완료"
        />
        <MainText>
          {name}님의 고민을 도와줄 <br /> 맞춤형 테스트 완성!
        </MainText>
        <SubText>
          아래 링크를 부모님께 공유해주세요. <br />
          부모님 답변 완료 후, <br />
          다시 링크를 누르면 결과를 볼 수 있어요.
        </SubText>
      </div>
      <CommonButton
        text="테스트 링크 복사"
        color="white"
        className="linkCopyButton"
        handler={doCopy}
      />
    </CreateCompleteComponent>
  );
}

export default CreateComplete;

const CreateCompleteComponent = styled.div`
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

  .linkCopyButton {
    position: absolute;
    bottom: -7.8rem; /* 하단 버튼 고려 위치 조정 */
  }
`;

const MainText = styled.p`
  font-size: 2.8rem;
  font-weight: 600;
  margin: 2rem 0 1rem 0;
`;

const SubText = styled.p`
  font-size: 1.7rem;
  opacity: 0.8;
  line-height: 137%;
`;
