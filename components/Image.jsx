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
  border-radius: ${ props => props.bdradius || '1em'};
`
const PictureFlex = styled(Image)`
  width: ${props => props.width || "fit-content"};
  height: ${props => props.height || "fit-content"};
  transform : ${props => props.transform};
  visibility: ${ props => props.visible || 'visible'};
  margin-bottom: ${props => props.mbottom};
`
export { Image, Background, Picture, PictureFlex }