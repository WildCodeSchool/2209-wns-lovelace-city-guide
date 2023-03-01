import { SquareBtn } from "./SquareBtn.styled";

type ButtonProps = {
  children: React.ReactNode; //👈 children prop typr
};

const SquareButton = (props: ButtonProps) => {
  return <SquareBtn>{props.children} </SquareBtn>;
};

export default SquareButton;
