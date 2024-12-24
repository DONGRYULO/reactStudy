import React, {PureComponent} from 'react';

class Test extends PureComponent {
    state = {
        counter: 0,
        // PureComponent 있으면 배열이나 객체 같은 상태값을 확인하기 힘들어짐
        object: {},
        array: []
    }

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     console.log('렌더링 체크');
    //     if(this.state.counter !== nextState.counter) {
    //         return true; // 렌더링 호출
    //     }
    //     return false;
    // }

    onClick = () => {
        this.setState({
            array: [...this.state.array, 1]
        });
    }

    render() {
        // Q. 클릭버튼을 눌렀을 때, 다시 렌더링이 될까? -> X(counter 값이 변경이 안됬으니까 안바뀌지 않을까?)
        console.log('렌더링', this.state);
        return(
            <div>
                <button onClick={this.onClick}>클릭</button>
            </div>
        )
    }
}

export default Test;