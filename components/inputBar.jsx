import styled from "styled-components";

const inputFormula = ( props ) => (
    <input  { ...props }></input>
);
const StyledInput = styled(inputFormula)`
    width: ${ props => props.width || "22.5vw" };
    height: ${ props => props.height || "3em" };
    border-radius: 1em;
    background-color: white;
    padding: 1em 1em;
    outline: none;
    border: 1.8px solid currentColor;
    box-sizing: border-box;
    position: relative;
    color: black;
    
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
        color: #6967DA;
    }
    &:placeholder-shown~label{
        position: absolute;
        top: .5em;
    }
    &:placeholder-shown~label::before{
        display: none;
        
    }
    &:placeholder-shown~label::after{
        position: absolute;
        display: none;
    }
    &:focus, &:focus~label, &~label{
        color: black;
    }
    &:focus~label, &~label{
        position: absolute;
        top: -1.2em;
        left: .75em;
        transition: .5s;
        padding: 0 2em;
        border-radius: 20px;
        user-select: none;
        pointer-events: none;
        background-color: transparent;
    }
    &:valid, &:valid~label{
        color: #039c2a;
    }
    &:focus~label::before, &:valid~label::before, &:focus~label::after, &:valid~label::after{
        display: block;
    }
`

export { StyledInput }