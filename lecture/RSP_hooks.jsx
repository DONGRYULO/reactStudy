import React, {useState, createRef, useRef, useEffect} from 'react';

const rspCoords = {
    바위: '0',
    가위: '-142px',
    보: '-284px'
};

const scores = {
    가위: 1,
    바위: 0,
    보: -1
};

const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find(function(v){
        return v[1] === imgCoord;
    })[0];
};

const RSP = () => {

    const [result, setResult] = useState('');
    const [score, setScore] = useState(0);
    const [imgCoord, setImgCoord] = useState(rspCoords.바위);
    let interval = useRef(null);
    // let interval; 왜? ref로 해야되지??

    useEffect(() => { 
        // componentDidMount, componentDidUpdate 역할을 수행(1대1 대응X)
        console.log('렌더링 이후 실행');
        interval.current = setInterval(changeHand, 1000);
        return () => { // componentWillUnmount
            clearInterval(interval.current);
        }
    }, [imgCoord]);

    const changeHand = () => {
        if(imgCoord === rspCoords.바위) {
            setImgCoord(rspCoords.가위);
        }else if(imgCoord === rspCoords.가위){
            setImgCoord(rspCoords.보);
        }else if(imgCoord === rspCoords.보){
            setImgCoord(rspCoords.바위);
        }
    };

    const onClickBtn = (choice)  => (onClickValue)  => {
        clearInterval(interval.current); // 가위바위보 이미지 인터벌을 멈춤

        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;

        // 1.점수계산
        if(diff === 0){
            setResult('비겼습니다');
        }else if([-1, 2].includes(diff)){
            setResult('WIN');
            setScore((prevScore) => prevScore.score + 1);
        } else {
            setResult('FAIL');
            setScore((prevScore) => {
                return prevScore.score - 1
            });
        }

        // 2.클릭한 가위바위보 버튼 색깔로 표시
        if(choice === "바위"){
            this.rockBtn.current.style.background = 'red';
        }else if(choice === "가위"){
            this.scissroBtn.style.background = 'blue';
        }else if(choice === "보"){
            this.paperBtn.style.background = 'yellow';
        }

        setTimeout(() => {
            if(choice === "바위"){
                this.rockBtn.current.style.background = null;
            }else if(choice === "가위"){
                this.scissroBtn.style.background = null;
            }else if(choice === "보"){
                this.paperBtn.style.background = null;
            }
            interval.current = setInterval(changeHand, 100);
        }, 2000);
    };

    let rockBtn = createRef();

    return(
        <>
            <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
            <div>
                <button id="rock" className="btn" ref={rockBtn} onClick={onClickBtn('바위')}>바위</button>
                <button id="scissor" className="btn" onClick={onClickBtn('가위')}>가위</button>
                <button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
            </div>
            <div>{result}</div>
            <div>현재 {score}점</div>
        </>
    );

}

export default RSP;