import styled, { css } from 'styled-components';

const Caixa = styled.div`
  width: 600px;
  border: 1px solid black;
  box-shadow: 2px 2px 2px #lightgrey;
`;

const Header = styled.div`
  font-size: 18px;
  font-weight: bold;
  padding: 10px 10px 5px 10px;
  display: flex;
  justify-content: space-between;
  background-color: lightgrey;
`;

const Button = styled.div`
  cursor: pointer;
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const Dia = styled.div`
  width: 14.2%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  ${(props) =>
    props.esAvui &&
    css`
      border: 1px solid black;
    `}

  ${(props) =>
    props.estaSeleccionat &&
    css`
      background-color: lightgrey;
    `}
`;

export { Caixa, Header, Button, Body, Dia }