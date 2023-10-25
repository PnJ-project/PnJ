import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from '../store/slice/counterSlice';
import { updateString } from '../store/slice/stringSlice';
import { addItem, removeItem } from '../store/slice/listSlice';
import { RootState } from './store';

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
        <>
            <h1>Counter: {count}</h1>
            <button onClick={() => dispatch(increment())}>Increase</button>
            <button onClick={() => dispatch(decrement())}>Decrease</button>

            <h1>String: {stringValue}</h1>
            <input
                type="text"
                value={stringValue}
                onChange={(e) => dispatch(updateString(e.target.value))}
            />

        <h1>List:</h1>
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <button onClick={handleAddItem}>아이템 추가</button>
        <ul>
            {listItems.map((item, index) => (
            <li key={index}>
                {item} <button onClick={() => dispatch(removeItem(index))}>삭제</button>
            </li>
            ))}
        </ul>
        </>
    );
};

export default Home;

