import styled from "styled-components"


const Box = ({ className, children, props }) => (
    <div className={ className } {...props}>
      {children}
    </div>
  );
  

const Container = styled(Box)`
  background-color: ${props => props.color || "#3e2b85"};
  justify-content: center;
  align-items: center;
  width: ${props => props.width || "fit-content"};
  height: ${props => props.height || "fit-content"};
  padding: ${props => props.padding || "1em"};
  border-radius: ${props => props.bdradius || "1em"};
  position: relative;
  border: ${props => props.border};
  box-shadow: ${props => props.shadow};
  display: flex;
  flex-wrap: wrap;
  visibility: ${ props => props.visible || 'visible'};
  z-index: ${props => props.zindex};
`

const ContainerFluid = styled(Box)`
  background-color: ${props => props.color || "#ECD352"};
  justify-content: center;
  align-items: center;
  width: ${props => props.width || "100%"};
  height: ${props => props.height || "100%"};
  padding: ${props => props.padding || "1em"};
  border-radius: ${props => props.bdradius};
  position: absolute;
  top:0;
  left:0;
  border: ${props => props.border};
  box-shadow: ${props => props.shadow};
  display: flex;
  flex-wrap: wrap;
  visibility: ${ props => props.visible || 'visible'};
`

export { Container, Box, ContainerFluid }