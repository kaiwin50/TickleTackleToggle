import styled from "styled-components"


const Image = ({ className, children, props, src }) => (
    <img src={src} className={ className } {...props}>
      {children}
    </img>
  );
  

const Background = styled(Image)`
  position : absolute;
  width: 100%;
  height: 100%;

`
  /* visibility: ${ props => props.visible || 'visible'}; */
const Picture = styled(Image)`
  width: ${props => props.width || "fit-content"};
  height: ${props => props.height || "fit-content"};
  position: absolute;
  top : ${props => props.top};
  bottom : ${props => props.bottom};
  left : ${props => props.left};
  right : ${props => props.right};
  transform : ${props => props.transform};
  visibility: ${ props => props.visible || 'visible'};
`
export { Image, Background, Picture }