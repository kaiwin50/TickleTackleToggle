import styled from "styled-components";

const Btn = ({className, children, onClick}) => (
  <button className={ className } onClick={onClick}>
  {children}
  </button>
);

const Button = styled(Btn)`
  position: relative;
  background-color : goldenrod;
  padding: 1em;
  border-radius: .5em;
  filter: drop-shadow(0 5px #8b6912);
  border: none;
  cursor: pointer;
  &:hover{
    background-color : #c1972d;
    top: 2px;
    filter: drop-shadow(0 3px #8b6912);
  }
  
`

export { Button }