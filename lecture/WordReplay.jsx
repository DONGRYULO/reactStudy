const React = require('react');
const { useState, useRef } = React;
import ReplayResult from './WordReplayResult';

const WordReplay = () => {
    console.log('렌더링');

    const [word, setWord] = useState('제시어');
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputRef = useRef(null);

    const onSubmitForm = (e) => {
        e.preventDefault();

        if(word[word.length - 1] === value[0]) {
            setWord(value);
            setResult('Correct');
        }else{
            setResult('InCorrect');
        }
        inputRef.current.focus();

    };

    const onChangeInput = (e) => {
        setValue(e.target.value);
    };

    return(
        <>
            <h1>{word}</h1>
            <form onSubmit={onSubmitForm}>
                <input id="word" className="wordInput" ref={inputRef} value={value} onChange={onChangeInput} />
                <button>입력</button>
            </form>
            <ReplayResult result={result} />
        </>
    );

}

export default WordReplay; // 해당 컴포넌트를 외부에서도 사용할 수 있게 처리