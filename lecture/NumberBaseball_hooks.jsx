import React, {Component} from 'react';
import Try from './Try';
const {useState, useRef} = React;

// 숫자 4개를 겹치지 않게 랜덤으로 뽑기
function getNumbers(){
    const candidates = [1, 2, 3, 4, 5, 6,7,8,9];
    const array = [];
    for (let i=0;i<4;i++){
        const chosen = candidates.splice(Math.floor(Math.random() * (candidates.length-i)), 1)[0];
        array.push(chosen);
    }
    return array;
}

// 함수 컴포넌트 특성상 리렌더링 되면 다시 해당 함수가 호출됨
const NumberBaseball = () => {

    const [result, setResult] = useState('');
    const [value, setValue] = useState('');
    const [answer, setAnswer] = useState(getNumbers);
    const [tires, setTires] = useState([]);

    const onSubmitForm = (e) => {
        e.preventDefault();
        if(value === answer.join('')){
            setResult('homeRun');
            setTires((preTries) => {
                return [...preTries, {try: value, result: 'homerun'}]
            });
            alert('축하합니다. 다시 시작!');
            setResult('');
            setValue('');
            setAnswer(getNumbers());
            setTires([]);
        }else{
            const answerArray = value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if(tries.length >= 9){ // 0부터 9까지 시도
                setResult(`10번째 시도함 실패 답은 ${answer.join(',')} 였습니다.`);
                alert('실패... 다시 시작!');
                setResult('');
                setValue('');
                setAnswer(getNumbers());
                setTires([]);
            }else{ // 10번 이내 시도시
                for(let i = 0; i < 4;i++){
                    if(answerArray[i] === answer[i]){
                        strike++;
                    }else if(answer.includes(answerArray[i])){
                        ball++;
                    }
                }
                setTires((prevState) => {
                   return  [...prevState, {try: value, result: `${strike} 스트라이크, ${ball} 볼입니다.` }]
                });
                setValue('');
            }
        }
    };

    const onChanageInput = (e) => {
        setValue(e.target.value);
    };

    return (
        <>
            <h1>{result}</h1>
            <form onSubmit={onSubmitForm}>
                <input maxLength={4} value={value} onChange={onChanageInput}/>
            </form>
            <div>시도: {tries.length}</div>
            <ul>
                {
                    tries.map((v, i) => {
                        return(
                            <Try key={`${i + 1}차 시도 :`} tryInfo={v}/>
                        );
                    })
                }
            </ul>
        </>
    );

}

export default NumberBaseball;