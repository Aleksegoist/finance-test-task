import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { counterSelector, getTickets } from './redux/state';
import { io } from 'socket.io-client';
import styled from 'styled-components';

const Container = styled.div`
    display: flex; 
`;

const Block = styled.div`
    display: flex;
    flex-direction: column;
    height: 280px;
    border: solid black 1px;
    border-radius: 7px;
    margin: 10px;
    cursor: pointer;
    &:hover {
    background-color: #f8f4f4;
  }
`;

const NameShort = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 7px;
    border: 1px solid black;
    background: blue;
    color: white;
    width: 70px;
    font-size: 14px;
    margin: 10px;
`;

const Title = styled.h1`
    font-weight: 600;
    margin: 10px;
`;

const List = styled.h1`
    font-size: 19px;
    margin: 10px;
    font-weight: 500;
`;

const localhost = io('http://localhost:4000');

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    localhost.emit('start');
    localhost.on('ticker', (data) => {
      dispatch(getTickets(data));
    });
  }, [dispatch]);

  const result = (ticker) => {
    switch (ticker) {
      case 'AAPL':
        return 'Apple';
      case 'GOOGL':
        return 'Google';
      case 'MSFT':
        return 'Microsoft';
      case 'AMZN':
        return 'Amazon';
      case 'FB':
        return 'Facebook';
      case 'TSLA':
        return 'Tesla';
      default:
        return '';
    }
  };

  const tickers = useSelector(counterSelector.getTickers);
  return (
    <Container>
      {tickers.map((props) => {
        return (
          <Block>
            <NameShort>{props.ticker} </NameShort>
            <Title> {result(props.ticker)} </Title>
            <List>Price: {props.price} $</List>
            <List>Change %: {props.change_percent}</List>
            <List>Dividend: {props.dividend}</List>
            <List>Date and time: {props.last_trade_time}</List>
          </Block>
        );
      })}
    </Container>
  );
};

export default App;
