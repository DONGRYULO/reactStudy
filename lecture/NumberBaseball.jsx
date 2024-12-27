import React, {Component, createRef} from 'react';
import Try from './Try';

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


class NumberBaseball extends Component {
    state = {
        result: '',
        value: '',
        answer: getNumbers(),
        tries: [] // 리액트에서 배열에 값을 넣을 때, push 사용 X
    };

    onSubmitForm = (e) => {
        e.preventDefault();
        if(this.state.value === this.state.answer.join('')){
            this.setState((prevState) =>{
                return{
                    result: 'homeRun',
                    // 기존 배열을 copy해서 new 데이터를 넣어줘야지 데이터 변경을 감지할 수 있음
                    // Q. React에서 과거의 상태를 기반으로 현재 상태를 업데이트 해야 할 때 **함수형 setState**를 사용하는 이유??
                    /*
                         this.setState -> 비동기적으로 동작함
                         상태의 업데이트 순서를 보장할 수 없기 때문에 처리되지 않은 값이 들어올 가능성이 존재
                         과거의 값(이전 상태)을 기반으로 현재의 상태를 계산해야 할 때는 함수형 setState가 필수적입니다!
                    */
                    tries : [...prevState.tries, {try: this.state.value, result: 'homerun'}],
                }
            });
            alert('축하합니다. 다시 시작!');
            this.setState({
                result: '',
                value: '',
                answer: getNumbers(),
                tries: [] // 리액트에서 배열에 값을 넣을 때, push 사용 X
            });
            // this.state.tries.push({try: this.state.value, result: 'homerun'}); X
        }else{
            const answerArray = this.state.value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if(this.state.tries.length >= 3){ // 0부터 9까지 시도
                this.setState({
                    result: `10번째 시도함 실패 답은 ${this.state.answer.join(',')} 였습니다.`
                });
                alert('실패... 다시 시작!');
                this.setState({
                    result: '',
                    value: '',
                    answer: getNumbers(),
                    tries: [] // 리액트에서 배열에 값을 넣을 때, push 사용 X
                });
                this.inputReference.current.focus();
            }else{ // 10번 이내 시도시
                for(let i = 0; i < 4;i++){
                    if(answerArray[i] === this.state.answer[i]){
                        strike++;
                    }else if(this.state.answer.includes(answerArray[i])){
                        ball++;
                    }
                }

                // 상태가 변경되면 렌더링이 다시 일어남
                this.setState(() => {
                    return{
                        tries:  [...this.state.tries, {try: this.state.value, result: `${strike} 스트라이크, ${ball} 볼입니다.` }],
                        value: ''
                }});
                console.log("총 결과");
                console.log(this.state.tries);
            }
        }
    };

    onChanageInput = (e) => {
        this.setState({
            value: e.target.value
        });
    };

    inputReference = createRef();
    inputRef = (e) => {
        // 함수로 Ref를 만들면 자유도가 더 커짐
        // Ref를 하기 전에 어떤 동작을 추가로 하는 방식으로 사용이 가능
        this.inputReference = e;
    }

    render(){
        console.log('렌더링');
        const {result, value, tries} = this.state;

        return (
            <>
                <h1>{result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input ref={this.inputReference} maxLength={4} value={value} onChange={this.onChanageInput}/>
                </form>
                <div>시도: {tries.length}</div>
                <ul>
                    {
                        // tries에 3개의 배열이 있는데 최근에 등록된 하나의 값만 나오는 이유는?
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
}

// export const hello1 = 'hello1'; // import { hello1 }
// export const hello2 = 'hello2'; // import { hello2 }
export default NumberBaseball;