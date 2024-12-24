const React = require('react');
const { useState, useRef } = React;

const Gugudan = () => {
    const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
    const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputRef = useRef(null);

    const onSubmitForm = (e) => {
        e.preventDefault();
        if(parseInt(value) === first * second) {
            // Q. State가 4번 변경됬으니까 렌더링도 4번 일어나는거 아닌가?
            setResult((preResult) => {
                return '정답: ' + preResult
            });
            // setResult('정답:' + value);
            setFirst(Math.ceil(Math.random() * 9));
            setSecond(Math.ceil(Math.random() * 9));
            setValue('');
        } else {
            setResult('땡');
            setValue('');
        }
        inputRef.current.focus();
    };

    const onChangeInput = (e) => {
        setValue(e.target.value);
    };

    console.log('react hooks의 경우 해당 함수가 통쨰로 실행됨');

    return(
        <React.Fragment>
            <div>{first} 곱하기 {second}는?</div>
            <form onSubmit={onSubmitForm}>
                <input ref={inputRef} onChange={onChangeInput} value={value} />
                <button id="button" className="dad">입력</button>
            </form>
            <div>{result}</div>
        </React.Fragment>
    );

}

module.exports = Gugudan;