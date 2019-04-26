import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  box-sizing: border-box;
  ${ props => props.inputForm && css`
    display: block;
    width: 80%;
    min-height: 0;
  `}

  ${ props => props.messagesMain && css`
    position: absolute;
    top: 50px;
    left: 0;
    width: 100%;
    align-items: flex-start;
    min-height: 0;
    flex-direction: column;
  `}
  ${ props => props.messages && css`
    display: block;
    padding: 50px 0;
    width: 100%;
    min-height: 0;
  `}
`;