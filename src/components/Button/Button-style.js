import styled, { css } from 'styled-components';


export const Button = styled.button`
  background: none;
  border: 0;
  cursor: pointer;
  padding: 12px 20px;
  background: #3f63bc;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  outline: 0;
  ${ props => props.back && css`
    position: relative;
    top: 8px;
    left: 10px;
    font-size: 12px;
    padding: 10px 14px;
  `}
  ${ props => props.main && css`
    height: 50px;
    border: 0;
    background: blue;
    color: #fff;
  `}
`;