import styled from "styled-components"


const Box = ({ className, children, props }) => (
    <div className={ className } {...props}>
      {children}
    </div>
  );
  

const Container = styled(Box)`
  background-color: ${props => props.color || "#3e2b85"};;
  justify-content: center;
  align-items: center;
  width: ${props => props.width || "fit-content"};
  height: ${props => props.height || "fit-content"};
  padding: 1em;
  border-radius: 1em;
  position: relative;
`

export { Container, Box }