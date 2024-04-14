import Image, { ImageProps } from "next/image";
import styled from "styled-components";

interface BottomButtonI {
  text: string;
  handler?: () => void;
  className?: string;
}

function BottomButton(props: BottomButtonI) {
  const { text, handler, className } = props;

  return (
    <StButton onClick={handler} className={className}>
      {text}
    </StButton>
  );
}

const StButton = styled.div`
  font-size: 16px;
  width: 8rem;
  height: 2rem;
  text-align: center;
  margin: 2.2rem auto 0 auto;
  position: absolute;
  bottom: 10rem;
  left: 50%; /* 가운데 정렬 */
  transform: translateX(-50%); /* 좌우 위치 조절 */
`;

export default BottomButton;
