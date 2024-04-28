import axios from "axios";
import { useParams, usePathname } from "next/navigation";
import styled from "styled-components";
import { headers } from "next/headers";
import JoinComponent from "./JoinComponent";
import ResultComponent from "./ResultComponent";
import { linkDataI } from "@/app/interface";

const getLinkData = async () => {
  const headersList = headers();
  const link = headersList.get("link-pathname")?.split("/")[2];
  const result = await axios.get(
    process.env.NEXT_PUBLIC_API_BASE_URL + "/survey/" + link
  );
  return result.data.data;
};

export default async function JoinLink() {
  const linkData = await getLinkData();

  return (
    <>
      {linkData?.status == 1 ? (
        <JoinComponent linkData={linkData} />
      ) : (
        <ResultComponent linkData={linkData} />
      )}
    </>
  );
}
