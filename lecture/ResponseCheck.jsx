import React, {Component} from 'react';
import ReSet from './Reset';

class ResponseCheck extends Component {
    state = {
        state: 'waiting',
        message: '클릭해서 시작하세요',
        result: []
    };

    timeout;
    startTime;
    endTime;

    onClickScreen = () => {
        const {state, message, result} = this.state;
        if(state === 'waiting') {
            this.setState({
                state: 'ready',
                message: '초록색이 되면 클릭하세요',
            });
            this.timeout = setTimeout(() =>{
               this.setState({
                   state: 'now',
                   message: '지금 클릭하세요',
               });
               this.startTime = new Date();
            }, Math.floor(Math.random() * 1000) + 2000); // 2~3초 랜덤
        }else if(state === 'ready'){ // 부정 클릭
            clearTimeout(this.timeout);
            this.setState({
                state: 'waiting',
                message: '성급하게 클릭하셨군요! 초록색이 된 후에 클릭하세요',
            });
        }else if(state === 'now'){ // 반응속도 체크
            this.endTime = new Date();
            this.setState((prevState) => {
                return {
                    state: 'waiting',
                    message: '클릭해서 시작하세요!',
                    result: [...prevState.result, this.endTime - this.startTime]
                };
            });
        }
    };

    reset = () => {
        this.setState({
            result: [],
        });
    };

    renderAverage = () => {
        return this.state.result.length === 0
                ? null
                : <>
                    <div>평균 시간: {this.state.result.reduce((a, c) => a + c / this.state.result.length) }ms</div>
                    <button onClick={this.reset}>리셋</button>
                  </>
    };

    render() {
        console.log('렌더링');
        const {state, message} = this.state;
        return(
          <>
            <div id="screen" className={state} onClick={this.onClickScreen}>
                {message}
            </div>
              {this.renderAverage()}
          </>
        );
    }
}

export default ResponseCheck;