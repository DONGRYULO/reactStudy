import React, {Component, PureComponent} from 'react';

class Try extends PureComponent{

    constructor() {
        super();
        console.log('생성자 호출');
    }

    // PureComponent 상속시 렌더링 한 번 호출
    // Component 상속시 렌더링 여러 번 호출
    render(){
        const tryInfo = this.props.tryInfo;
        console.log(tryInfo);

        const {try : t, result: r} = this.props.tryInfo;
        return (
            <li>
                <div>{t}</div>
                <div>{r}</div>
            </li>
        );
    }
}

export default Try;