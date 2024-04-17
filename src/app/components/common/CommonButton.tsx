import styled from "styled-components";

interface CommonButtonI {
  text: string;
  color: "semi-black" | "semi-white" | "black" | "white" | "gray";
  handler?: () => void;
  className?: string;
}

function CommonButton(props: CommonButtonI) {
  const { text, handler, color, className } = props;

  return (
    <StButton onClick={handler} color={color} className={className}>
      <p>{text}</p>
    </StButton>
  );
}

const StButton = styled.div<{ color: string }>`
  font-size: 1.6rem;
  width: 33rem;
  height: 4.8rem;
  text-align: center;
  border-radius: 0.8rem;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${(props) =>
    props.color === "semi-black"
      ? "rgba(1, 1, 1, 0.3)"
      : props.color === "semi-white"
      ? "rgba(255, 255, 255, 0.3)"
      : props.color === "black"
      ? "#000000"
      : props.color === "white"
      ? "#ffffff"
      : props.color === "gray"
      ? "#686868"
      : ""};

  & > p {
    color: ${(props) =>
      props.color === "semi-black"
        ? "white"
        : props.color === "semi-white"
        ? "white"
        : props.color === "black"
        ? "white"
        : props.color === "white"
        ? "black"
        : props.color === "gray"
        ? "white"
        : ""};
  }
`;

export default CommonButton;
