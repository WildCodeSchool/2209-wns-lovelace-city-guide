import { useEffect } from "react";

const PageTitle = (props: {title: string; children: JSX.Element}) => {
  useEffect(() => {
    document.title = `${props.title} | Pin Me` || "Pin Me";
  }, [props.title]);
  return props.children;
};

export default PageTitle;