import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from '../store/slice/counterSlice';
import { updateString } from '../store/slice/stringSlice';
import { addItem, removeItem } from '../store/slice/listSlice';
import { RootState } from './store';
import styled from 'styled-components';

const Home = () => {
    const count = useSelector((state: RootState) => state.counter.value);
    const stringValue = useSelector((state: RootState) => state.string.value);
    const listItems = useSelector((state: RootState) => state.list.items); // 리스트 상태 가져오기
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleAddItem = () => {
        if (inputValue.trim() !== '') {
            dispatch(addItem(inputValue));
            setInputValue('');
        }
    };
    return (
        <Container>
            <h1>Counter: {count}</h1>
            <IncBtn onClick={() => dispatch(increment())}>Increase</IncBtn>
            <DecBtn onClick={() => dispatch(decrement())}>Decrease</DecBtn>

            <h1>String: {stringValue}</h1>
            <TextInput
                type="text"
                value={stringValue}
                onChange={(e) => dispatch(updateString(e.target.value))}
            />

        <h1>List:</h1>
        <ListInput type="text" value={inputValue} onChange={handleInputChange} />
        <AddBtn onClick={handleAddItem}>아이템 추가</AddBtn>
        <Ul>
            {listItems.map((item, index) => (
            <Li key={index}>
                {item} <RemoveBtn onClick={() => dispatch(removeItem(index))}>삭제</RemoveBtn>
            </Li>
            ))}
        </Ul>
        </Container>
    );
};

export default Home;

const Container = styled.div``
const IncBtn = styled.button``
const DecBtn = styled.button``
const TextInput = styled.input``
const ListInput = styled.input``
const AddBtn = styled.button``
const Ul = styled.ul``
const Li = styled.li``
const RemoveBtn = styled.button``