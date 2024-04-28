import { linkDataI } from "@/app/interface";

function ResultComponent(props: linkDataI) {
  const { status, name, data } = props.linkData;
  return <div>result component</div>;
}

export default ResultComponent;
