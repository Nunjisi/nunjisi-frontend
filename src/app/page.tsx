"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import styled from "styled-components";

export default function Home() {
  const router = useRouter();

  const goNewPage = () => {
    router.push("/survey/new");
  };

  return (
    <main>
      <div>
        <StButton onClick={goNewPage}>30초만에 만들러 가기</StButton>
      </div>
    </main>
  );
}

const StButton = styled.button`
  font-size: 20px;
  color: black;
  background-color: white;
`;
