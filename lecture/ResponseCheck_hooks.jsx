import React, {useRef, useState} from 'react';

const ResponseCheck = () => {
    console.log('렌더링');

    const [state, setState] = useState('waiting');
    const [message, setMessage] = useState('클릭해서 시작하세요');
    const [result, setResult] = useState([]);

    let timeOut = useRef(null);
    let startTime = useRef(null);
    let endTime = useRef(null);

    const onClickScreen = () => {
        if(state === 'waiting') {
            setState('ready');
            setMessage('초록색이 되면 클릭하세요');

            timeOut.current = setTimeout(() =>{
                setState('now');
                setMessage('지금 클릭하세요');
                startTime.current = new Date();
            }, Math.floor(Math.random() * 1000) + 2000); // 2~3초 랜덤

        }else if(state === 'ready'){ // 부정 클릭
            clearTimeout(timeOut.current);
            setState('waiting');
            setMessage('성급하게 클릭하셨군요! 초록색이 된 후에 클릭하세요');
        }else if(state === 'now'){ // 반응속도 체크
            endTime.current = new Date();

            setState('waiting');
            setMessage('클릭해서 시작하세요');
            setResult((preState)=> {
                console.log(preState);
                return [...preState, endTime.current - startTime.current];
            });
        }
    };

    const reset = () => {
        setResult([]);
    };

    const renderAverage = () => {
        return result.length === 0
                ? null
                : <>
                    <div>평균 시간: {result.reduce((a, c) => a + c / result.length) }ms</div>
                    <button onClick={reset}>리셋</button>
                  </>
    };

    return(
      <>
        <div id="screen" className={state} onClick={onClickScreen}>
            {message}
        </div>

          {(() => {
            if(result.length === 0){
                return null;
            }else {
                return result.length === 0
                    ? null
                    : <>
                        <div>평균 시간: {result.reduce((a, c) => a + c / result.length) }ms</div>
                        <button onClick={reset}>리셋</button>
                    </>
            }
          })()}



          {/*{renderAverage()}*/}
      </>
    );

};

export default ResponseCheck;