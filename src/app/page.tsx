"use client";

import Image from "next/image";
import styled from "styled-components";

export default function Home() {
  return (
    <main>
      <div>
        <Test>Main Page</Test>
      </div>
    </main>
  );
}

const Test = styled.div`
  font-size: 20px;
  color: blue;
`;
