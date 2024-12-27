import React, {Component, createRef} from 'react';
import result from "./WordReplayResult";

/*
     클래스 라이프사이클)
     생성자 -> render -> ref(render 내부에 ref설정이 있으면 실행) -> componentDidMount -> 초기 화면 출력
     -> setState or Props 바뀔 때 -> shouldComponentUpdate(true) -> re render -> componentDidUpdate 실행
     -> 부모 컴포넌트가 해당 자식 컴포넌트를 제거 했을 때, componentWillUnmount 실행

     Props가 바뀔 때, render가 되는게 이해가 안됨
*/

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

class RSP extends Component {
    constructor(props) {
        super();
    }

    state = {
        result: '',
        score: 0,
        imgCoord: rspCoords.바위
    };

    // Q. 가위바위보 별로 ref값을 따로 만들 수 밖에 없는가??
    // buttonRefs = {
    //     rockBtn: createRef(),
    //     siccrosBtn: createRef(),
    //     boBtn: createRef()
    // };

    interval;

    // 컴포넌트가 최초 렌더링 된 이후 -> 비동기 요청을 많이 사용
    // 클로져?
    componentDidMount() {
        // 컴포넌트가 제거 된다 하더라도 계속 실행되므로 사용하지 않으면 제거가 필요함
        this.interval = setInterval(this.changeHand, 100);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return true;
    }

    // 리렌더링 이후
    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    // 컴포넌트 제거되기 직전 -> 비동기 요청 정리를 많이 사용
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    changeHand = () => {
        const {imgCoord} = this.state;
        if(imgCoord === rspCoords.바위) {
            this.setState({
                imgCoord: rspCoords.가위
            });
        }else if(imgCoord == rspCoords.가위){
            this.setState({
                imgCoord: rspCoords.보
            });
        }else if(imgCoord == rspCoords.보){
            this.setState({
                imgCoord: rspCoords.바위
            });
        }
    };

    // *** 고차함수 사용법 이해 안됨 ***
    onClickBtn = (choice)  => (onClickValue)  => {
        console.log(onClickValue);
        clearInterval(this.interval); // 가위바위보 이미지 인터벌을 멈춤

        const myScore = scores[choice];
        // const myScore = scores.choice;
        const cpuScore = scores[computerChoice(this.state.imgCoord)];
        const diff = myScore - cpuScore;

        // 1.점수계산
        if(diff === 0){
            this.setState({
               result: '비겼습니다.',
            });
        }else if([-1, 2].includes(diff)){
            this.setState((prevState) => {
                return {
                    result: 'WIN',
                    score: prevState.score + 1
                };
            });
        } else {
            this.setState((prevState) => {
                return {
                    result: 'FAIL',
                    score: prevState.score - 1
                };
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
            this.interval = setInterval(this.changeHand, 100);
        }, 2000);
    };

    rockBtn = createRef();


    render() {
        const {result, score, imgCoord} = this.state;
        return(
            <>
                <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
                <div>
                    <button id="rock" className="btn" ref={this.rockBtn} onClick={this.onClickBtn('바위')}>바위</button>
                    <button id="scissor" className="btn" ref={(ref) => {this.scissroBtn=ref}} onClick={this.onClickBtn('가위')}>가위</button>
                    <button id="paper" className="btn" ref={(ref) => {this.paperBtn=ref}} onClick={this.onClickBtn('보')}>보</button>
                </div>
                <div>{result}</div>
                <div>현재 {score}점</div>
            </>
        );
    }
}

export default RSP;