import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from '../store/slice/counterSlice';
import { RootState } from '../store';
import styled from 'styled-components';

const Home = () => {
    const count = useSelector((state: RootState) => state.counter.value);
    const dispatch = useDispatch();

    return (
    <Container>
        <h1>Counter: {count}</h1>
        <IncBtn onClick={() => dispatch(increment())}>Increase</IncBtn>
        <DecBtn onClick={() => dispatch(decrement())}>Decrease</DecBtn>
    </Container>
);
};

export default Home;

const Container = styled.div``
const IncBtn = styled.button``
const DecBtn = styled.button``