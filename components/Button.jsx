import styled from "styled-components";

const Btn = ({className, children, onClick}) => (
  <button className={ className } onClick={onClick}>
  {children}
  </button>
);

const Button = styled(Btn)`
  position: ${props => props.pos || "relative"};
  background-color : ${props => props.color || "goldenrod"};
  padding: .5em 1em;
  border-radius: ${props => props.bdradius || ".5em"};
  filter: drop-shadow(0 5px rgba(0, 0, 0, 0.25));
  border: ${props => props.border || "none"};
  cursor: pointer;
  font-size: ${props => props.fontsize || "1em"};
  color : ${props => props.fontcolor || "black"};
  top: ${props => props.top };
  bottom: ${props => props.bottom };
  left: ${props => props.left };
  right: ${props => props.right };
  margin-left: ${props => props.margin};
  &:hover{
    background-color : ${props => props.hovercolor || "#c1972d"};
    translate: 0 2px;
    filter: drop-shadow(0 3px rgba(0, 0, 0, 0.25));
  }
`
const LoginBtn = styled(Btn)`
position: relative;
background-color : #ECC94B;
padding: 1em;
border-radius: 1em;
filter: drop-shadow(0 5px #8b6912);
border: none;
cursor: pointer;
font-size: 2em;
&:hover{
  background-color : #e8c305;
  top: 2px;
  filter: drop-shadow(0 3px #8b6912);
}

`

const SignUpBtn = styled(Btn)`
position: relative;
background-color : #FF6839;
padding: 1em;
border-radius: 1em;
filter: drop-shadow(0 5px #133453);
border: none;
cursor: pointer;
font-size: 2em;
&:hover{
  background-color : #de3500;
  top: 2px;
  filter: drop-shadow(0 3px #133453);
}

`
const CloseBtn = styled(Btn)`
  background-color : ${props => props.color ||"#F76363"};
  width : 1.5em;
  height : 1.5em;
  border-radius: 50%;
  border: 3px solid #000000;
  cursor: pointer;
  font-size: ${props => props.fontsize || "2em"};
  color : ${props => props.fontcolor || "black"};
  position : absolute;
  top : -.5em;
  right: ${props => props.right};
  &:hover{
    background-color : #de3500;
  }
  
`
export { Button, LoginBtn, SignUpBtn, CloseBtn }