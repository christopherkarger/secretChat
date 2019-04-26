import styled, { css } from 'styled-components';


export const Form = styled.form`
  width: 100%;
  display: flex;
  ${ props => props.main && css`
    position: fixed;
    bottom: 0;
    left: 0;
  `}
`;