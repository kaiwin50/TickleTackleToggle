import styled from "styled-components";

const inputFormula = ( props ) => (
    <input  { ...props }></input>
);
const StyledInput = styled(inputFormula)`
    width: ${ props => props.width || "20em" };
    height: ${ props => props.height || "3em" };
    border-radius: 1em;
    background-color: transparent;
    padding: 1em 1em;
    outline: none;
    border: 1.8px solid currentColor;
    box-sizing: border-box;
    position: relative;
    color: goldenrod;
    
    &~label::before, &~label::after{
        content: "";
        position: absolute;
        top: 0;
        width: 10px;
        height: 10px;
        border-left: 1.8px solid currentColor;
        border-bottom: 1.8px solid currentColor;
    }
    &~label::before{
        rotate: 45deg;
        left: 0;
    }
    &~label::after{
        rotate: -135deg;
        right: 0;
    }
    &:placeholder-shown, &:placeholder-shown~label{
        position: relative;
        color: #ffffff50;
    }
    &:placeholder-shown~label{
        position: absolute;
        top: .75em;
    }
    &:placeholder-shown~label::before{
        display: none;
        
    }
    &:placeholder-shown~label::after{
        position: absolute;
        display: none;
    }
    &:focus, &:focus~label, &~label{
        color: goldenrod;
    }
    &:focus~label, &~label{
        position: absolute;
        top: -.3em;
        left: .75em;
        transition: .5s;
        padding: 0 2em;
        border-radius: 20px;
        user-select: none;
        pointer-events: none;
        background-color: #3e2b85;
    }
    &:valid, &:valid~label{
        color: #63ef63;
    }
    &:focus~label::before, &:valid~label::before, &:focus~label::after, &:valid~label::after{
        display: block;
    }
`

export { StyledInput }