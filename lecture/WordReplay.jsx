const React = require('react');
const { useState, useRef } = React;

const WordReplay = () => {
    const [word, setWord] = useState('제시어');
    const [value, setValue] = useState('');
    //let value = 22;
    const [result, setResult] = useState('');
    const inputRef = useRef(null);

    const onSubmitForm = (e) => {
        e.preventDefault();

        if(word[word.length - 1] === value[0]) {
            setWord(value);
            setResult('Correct');
            // setValue('');
        }else{
            setResult('InCorrect');
            // setValue('');
        }
        inputRef.current.focus();

    };

    const onChangeInput = (e) => {
        // setValue(e.target.value);
        console.log(e.target.value);
        setValue(e.target.value);
    };

    onRefInput = (e) => {
        inputRef.current = e;
    };

    console.log('렌더링');
    return(
        <>
            <h1>{word}</h1>
            <form onSubmit={onSubmitForm}>
                <input id="word" className="wordInput" ref={inputRef} value={value} onChange={onChangeInput} />
                <button>입력</button>
            </form>
            <div>{result}</div>
        </>
    );

}

module.exports = WordReplay; // 해당 컴포넌트를 외부에서도 사용할 수 있게 처리